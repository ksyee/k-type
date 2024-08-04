'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { CPM } from '@/components/atoms';
import { useCpmStore } from '@/store/cpmStore';

const initialSentence = '당신이 잘 하는 일이라면 무엇이나 행복에 도움이 된다.';

export function TypingSection() {
  const {
    setCpm,
    setTime,
    typingStartTime,
    calculateCpm,
    inputValue,
    setInputValue,
  } = useCpmStore();

  const [sentence, setSentence] = useState<string>(initialSentence);
  const [displayWord, setDisplayWord] = useState<string>(sentence);
  const [charColors, setCharColors] = useState<string[]>(
    Array(displayWord.length).fill('white')
  );

  const inputRef = useRef<HTMLInputElement>(null);

  // CPM 계산을 위한 interval 설정
  const startCpmInterval = useCallback(() => {
    const intervalId = setInterval(() => {
      const currentCpm = calculateCpm();
      setCpm(currentCpm);
    }, 100);

    return () => clearInterval(intervalId);
  }, [calculateCpm, setCpm]);

  // Input 이벤트 핸들러
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (typingStartTime === null) {
        setTime(Date.now(), null);
        startCpmInterval();
      }

      if (inputValue.length === 0) {
        setCpm(0);
        setTime(null, null);
      }

      setInputValue(e.target.value);
    },
    [
      typingStartTime,
      setTime,
      setInputValue,
      startCpmInterval,
      setCpm,
      inputValue.length,
    ]
  );

  const handleScreenClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const keyPressEscape = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setInputValue('');
      setCpm(0);
      setTime(null, null);
    }
  };

  // 데이터 베이스에서 랜덤한 문장을 가져와서 화면에 표시
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sentence', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        setSentence(data[randomIndex].text);
      } catch (error) {
        console.error('Error fetching sentence:', error);
      }
    })();
  }, []);

  // 입력한 글자와 문장을 비교하여 색상을 변경
  useEffect(() => {
    const newCharColors = Array(sentence.length).fill('white');
    const newDisplayWord = sentence.split('');

    for (let i = 0; i < sentence.length; i++) {
      const inputChar = inputValue[i];
      const targetChar = sentence[i];

      if (inputChar === targetChar) {
        newCharColors[i] = 'gray';
      }

      if (i < inputValue.length - 1) {
        if (inputChar === targetChar) {
          newCharColors[i] = 'gray';
        } else if (targetChar === ' ' && inputChar !== targetChar) {
          newCharColors[i] = 'red';
          newDisplayWord[i] = '_';
        } else {
          newCharColors[i] = 'red';
        }
      }
    }

    setCharColors(newCharColors);
    setDisplayWord(newDisplayWord.join(''));
  }, [inputValue, sentence]);

  return (
    <section className="relative h-screen w-screen" onClick={handleScreenClick}>
      <h2 className="sr-only">타이핑 섹션</h2>
      <div className="absolute left-1/2 top-1/3 w-[80%] min-w-[680px] max-w-[900px] -translate-x-1/2 overflow-hidden rounded-lg bg-zinc-600 px-24pxr py-32pxr text-zinc-50">
        <CPM />
        <p className="mb-8pxr text-20pxr">
          {displayWord.split('').map((char, index) => {
            return (
              <span key={index} style={{ color: charColors[index] }}>
                {char}
              </span>
            );
          })}
        </p>
        <input
          type="text"
          ref={inputRef}
          id="typing-input"
          className="w-full border-b-2 border-green-700 bg-transparent text-20pxr text-white outline-none"
          onChange={handleInput}
          onKeyDown={(e) => keyPressEscape(e)}
          value={inputValue}
          placeholder="문장을 입력하세요"
          autoFocus
          spellCheck="false"
          autoComplete="off"
          maxLength={displayWord.length}
        />
      </div>
    </section>
  );
}
