'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useCpmStore } from '@/store/cpmStore';
import { useReportStore } from '@/store/reportStore';
import { Report } from '@/components/molecules';

import { fetchSentence } from '@/services/api';
import { calculateCharColors } from '@/utils/colorUtils';
import {
  handleInput,
  handleEnter,
  keyPressEscape,
} from '@/handlers/inputHandlers';

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

  const [sentence, setSentence] = useState<{ speaker: string; text: string }>({
    speaker: 'Loading...',
    text: '문장을 불러오는 중입니다...',
  });
  const [displayWord, setDisplayWord] = useState<string>(sentence.text);
  const [charColors, setCharColors] = useState<string[]>(
    Array(displayWord.length).fill('white')
  );
  const [textareaLines, setTextareaLines] = useState<number>(1);

  const usedSentencesRef = useRef<Set<string>>(new Set());
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // CPM 계산을 위한 interval 설정
  const startCpmInterval = useCallback(() => {
    const intervalId = setInterval(() => {
      const currentCpm = calculateCpm();
      setCpm(currentCpm);
    }, 100);

    return () => clearInterval(intervalId);
  }, [calculateCpm, setCpm]);

  // 화면 클릭 시 input에 포커스
  const handleScreenClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
      fetchSentence();
    }
  };

  // 데이터 베이스에서 랜덤한 문장을 가져와서 화면에 표시
  useEffect(() => {
    fetchSentence();
    console.log('fetchSentence');
  }, []);

  // 입력한 글자와 문장을 비교하여 색상을 변경
  useEffect(() => {
    const { newCharColors, newDisplayWord } = calculateCharColors(
      sentence.text,
      inputValue
    );

    setCharColors(newCharColors);
    setDisplayWord(newDisplayWord);
  }, [inputValue, sentence]);

  return (
    <section className="relative h-screen w-screen" onClick={handleScreenClick}>
      <h2 className="sr-only">타이핑 섹션</h2>
      <div className="absolute left-1/2 top-1/3 w-[80%] min-w-[800px] max-w-[900px] -translate-x-1/2">
        <Report />
        <div className="overflow-hidden rounded-lg bg-zinc-700 px-48pxr py-48pxr text-zinc-50">
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
            className="w-full resize-none overflow-hidden border-b-4 border-zinc-400 bg-transparent text-20pxr text-zinc-50 outline-none"
            onChange={(e) =>
              handleInput(
                e,
                startTime,
                setTime,
                setInputValue,
                startCpmInterval,
                setCpm,
                inputValue,
                setTextareaLines
              )
            }
            onKeyDown={(e) => {
              keyPressEscape(e, setInputValue, setCpm, setTime);
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
