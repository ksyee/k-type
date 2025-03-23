'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useCpmStore } from '@/stores/cpmStore';
import { useReportStore } from '@/stores/reportStore';
import { Report } from '@/components/molecules';
import { useSentenceStore } from '@/stores/sentenceStore';

import { fetchSentence } from '@/services/api';
import { calculateCharColors } from '@/utils/colorUtil';
import {
  handleScreenClick,
  handleInput,
  handleEnter,
  keyPressEscape,
} from '@/handlers/inputHandlers';

interface Sentence {
  speaker: string;
  text: string;
}

export function TypingSection() {
  const { setCpm, setTime, typingTime, calculateCpm } = useCpmStore();
  const { startTime } = typingTime;

  const { report, setReport } = useReportStore();
  const { setSentences, currentSentence, getRandomSentence } =
    useSentenceStore();

  const [inputValue, setInputValue] = useState<string>('');

  const [displayWord, setDisplayWord] = useState<string>(currentSentence.text);
  const [charColors, setCharColors] = useState<string[]>(
    Array(displayWord.length).fill('white')
  );
  const [textareaLines, setTextareaLines] = useState<number>(1);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 문장 배열을 가져오는 함수
  const loadSentences = useCallback(async () => {
    try {
      const response: Sentence[] = await fetchSentence();
      console.log(response);
      setSentences(response);
      getRandomSentence();
    } catch (error) {
      console.error('Error fetching sentence:', error);
      throw error;
    }
  }, [getRandomSentence, setSentences]);

  useEffect(() => {
    console.log('최신 inputValue:', inputValue);
    const updatedCpm = calculateCpm();
    setCpm(updatedCpm);
    console.log('최신 cpm:', updatedCpm);
  }, [calculateCpm, inputValue, setCpm]); // inputValue가 변경될 때만 실행

  // 데이터 베이스에서 랜덤한 문장을 가져와서 화면에 표시
  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadSentences();
      } catch (error) {
        console.error('Failed to load sentences: ', error);
      }
    };

    void fetchData();
  }, [loadSentences]);

  // 입력한 글자와 문장을 비교하여 색상을 변경
  useEffect(() => {
    const { newCharColors, newDisplayWord } = calculateCharColors(
      currentSentence.text,
      inputValue
    );

    setCharColors(newCharColors);
    setDisplayWord(newDisplayWord);
  }, [inputValue, currentSentence]);

  return (
    <section
      className="relative h-screen w-screen"
      onClick={() => {
        handleScreenClick(inputRef);
      }}
    >
      <h2 className="sr-only">타이핑 섹션</h2>
      <div className="absolute left-1/2 top-1/3 w-[80%] min-w-[800px] max-w-[900px] -translate-x-1/2">
        <Report />
        <div className="overflow-hidden rounded-lg bg-zinc-700 px-48pxr py-48pxr text-zinc-50">
          <span>-{currentSentence.speaker}-</span>
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
                setCpm,
                inputValue,
                setTextareaLines
              )
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              keyPressEscape(e, setInputValue, setCpm, setTime, inputRef);
              handleEnter(
                e,
                inputValue,
                setInputValue,
                calculateCpm,
                setReport,
                report
              );
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
