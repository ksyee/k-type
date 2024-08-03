'use client';
import { useState, useEffect, useCallback } from 'react';
import { CPM } from '@/components/atoms';

const initialSentence = '당신이 잘 하는 일이라면 무엇이나 행복에 도움이 된다.';

export function TypingSection() {
  const [sentence, setSentence] = useState<string>(initialSentence);

  const [displayWord, setDisplayWord] = useState<string>(sentence);
  const [inputValue, setInputValue] = useState<string>('');
  const [charColors, setCharColors] = useState<string[]>(
    Array(displayWord.length).fill('white')
  );

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3000/api/sentence', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());

      const randomIndex = Math.floor(Math.random() * response.length);

      setSentence(response[randomIndex].text);
    })();
  }, []);

  useEffect(() => {
    const newCharColors = [];
    const newDisplayWord = [];

    for (let i = 0; i < sentence.length; i++) {
      if (i >= inputValue.length) {
        newCharColors.push('white');
        newDisplayWord.push(sentence[i]);
        continue;
      }

      const inputChar = inputValue[i];
      const targetChar = sentence[i];

      if (inputChar === targetChar) {
        newCharColors.push('gray');
        newDisplayWord.push(sentence[i]);
      } else {
        if (sentence[i] === ' ') {
          newCharColors.push('red');
          newDisplayWord.push('_');
        } else {
          newCharColors.push('red');
          newDisplayWord.push(sentence[i]);
        }
      }
    }

    setCharColors(newCharColors);
    setDisplayWord(newDisplayWord.join(''));
  }, [inputValue, sentence]);

  return (
    <section className="absolute left-1/2 top-1/3 w-[80%] max-w-[900px] -translate-x-1/2 overflow-hidden rounded-lg bg-zinc-600 text-zinc-50">
      <h2 className="sr-only">타이핑 섹션</h2>
      <CPM />
      <p className="text-18pxr">
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
        className="w-full border-b-2 border-green-700 bg-transparent text-18pxr text-white outline-none"
        onChange={handleInput}
        value={inputValue}
        placeholder="문장을 입력하세요"
        autoFocus
        maxLength={displayWord.length}
      />
    </section>
  );
}
