'use client';
import { useState, useEffect, useRef, useCallback, use } from 'react';
import { useCpmTimer } from '@/hooks/useCpmTimer';
import { useIsDarkMode } from '@/hooks/useIsDarkMode';
import { useCpmStore } from '@/store/cpmStore';
import { useReportStore } from '@/store/reportStore';
import { useAccuracyStore } from '@/store/accuracyStore';
import { Report } from '@/components/molecules';

import { fetchSentence } from '@/services/api';
import { shuffleArray } from '@/utils/shuffleArray';
import { calculateCharColors } from '@/utils/colorUtils';
import { handleInput, handleEnter, clearInput } from '@/handlers/inputHandlers';

export function TypingSection() {
  const {
    setCpm,
    setTime,
    typingTime,
    calculateCpm,
    inputValue,
    setInputValue,
  } = useCpmStore();
  const { startTime } = typingTime;

  const { report, setReport } = useReportStore();
  const { accuracy, setAccuracy } = useAccuracyStore();

  const [sentences, setSentences] = useState<
    { speaker: string; text: string }[]
  >([]);
  const [sentence, setSentence] = useState<{ speaker: string; text: string }>({
    speaker: 'Loading...',
    text: '문장을 불러오는 중입니다...',
  });
  const [usedSentences, setUsedSentences] = useState<string[]>([]);
  const [displayWord, setDisplayWord] = useState<string>(sentence.text);

  const isDarkMode = useIsDarkMode();
  // 다크모드 여부에 따라 초기 글자 색상 설정
  const initialCharColors = isDarkMode
    ? Array(sentence.text.length).fill('white')
    : Array(sentence.text.length).fill('#999999');
  const [charColors, setCharColors] = useState<string[]>(initialCharColors);

  const [textareaLines, setTextareaLines] = useState<number>(1);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useCpmTimer(calculateCpm, setCpm);

  // 화면 클릭 시 input에 포커스
  const handleScreenClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 사용한 문장을 저장하고 새로운 문장을 가져옴
  const fetchNewSentence = async () => {
    if (sentences.length === 0) return;

    let sentenceCount = 1;
    let newSentence;

    do {
      newSentence = sentences[sentenceCount];
      sentenceCount++;
    } while (usedSentences.includes(newSentence.text));

    setUsedSentences((prev) => [...prev, newSentence.text]);
    setSentence(newSentence);
  };

  // 결과 저장
  const saveReport = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const currentCpm = calculateCpm();
    const accuracy = 100;
    const count = report.count;

    if (
      inputValue.length >= sentence.text.length &&
      (e.key === 'Enter' || e.key === ' ')
    ) {
      setReport({ cpm: currentCpm, accuracy, count: count + 1 });
      fetchNewSentence();
      clearInput(setInputValue, setCpm, setTime, setTextareaLines);
    }
  };

  // 최초 렌더링 시 문장 데이터를 가져와 저장 후 배열을 랜덤으로 섞음
  useEffect(() => {
    (async () => {
      try {
        const fetchSentencesData = await fetchSentence();
        setSentences(shuffleArray(fetchSentencesData));

        // 데이터를 받아온 후 랜덤으로 문장을 선택하여 초기화
        const initialSentence = fetchSentencesData[0];
        setSentence(initialSentence);
      } catch (error) {
        console.error('Error fetching sentence:', error);
      }
    })();
  }, []);

  // 입력한 글자와 문장을 비교하여 색상을 변경
  useEffect(() => {
    const { newCharColors, newDisplayWord } = calculateCharColors(
      sentence.text,
      inputValue,
      isDarkMode
    );

    setCharColors(newCharColors);
    setDisplayWord(newDisplayWord);
  }, [inputValue, sentence, isDarkMode]);

  // 입력한 글자 처리
  const handleInputCallback = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleInput(
        e,
        startTime,
        setTime,
        setInputValue,
        () => {},
        setCpm,
        inputValue,
        setTextareaLines
      );
    },
    [startTime, setTime, setInputValue, setCpm, inputValue, setTextareaLines]
  );

  return (
    <section className="relative h-screen w-screen" onClick={handleScreenClick}>
      <h2 className="sr-only">타이핑 섹션</h2>
      <div className="absolute left-1/2 top-1/3 w-[80%] min-w-[800px] max-w-[900px] -translate-x-1/2 space-y-4pxr">
        <Report />
        <div className="overflow-hidden rounded bg-zinc-50 px-48pxr py-48pxr text-zinc-800 shadow-md dark:bg-zinc-700 dark:text-zinc-50">
          <span>-{sentence.speaker}-</span>
          <p className="mb-8pxr mt-8pxr text-20pxr">
            {displayWord.split('').map((char, index) => {
              return (
                <span key={index} style={{ color: charColors[index] }}>
                  {char}
                </span>
              );
            })}
          </p>
          <textarea
            ref={inputRef}
            id="typing-input"
            className="w-full resize-none overflow-hidden border-b-4 border-yellow-300 bg-transparent text-20pxr text-zinc-800 outline-none dark:border-zinc-400 dark:text-zinc-50"
            onChange={handleInputCallback}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                clearInput(setInputValue, setCpm, setTime, setTextareaLines);
              }
              saveReport(e);
              handleEnter(e);
            }}
            value={inputValue}
            placeholder="문장을 입력하세요"
            autoFocus
            spellCheck="false"
            autoComplete="off"
            maxLength={displayWord.length}
            rows={textareaLines}
          />
        </div>
      </div>
    </section>
  );
}
