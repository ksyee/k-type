// handlers/inputHandlers.ts
import React from 'react';
import { useCpmStore } from '@/stores/cpmStore';
import { useSentenceStore } from '@/stores/sentenceStore';

// 화면 클릭 시 input에 포커스
export const handleScreenClick = (
  inputRef: React.RefObject<HTMLTextAreaElement>
) => {
  inputRef.current?.focus();
};

export const handleInput = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  startTime: number | null,
  setTime: (time: { startTime: number | null; endTime: number | null }) => void,
  setInputValue: (value: string) => void,
  setCpm: (cpm: number) => void,
  inputValue: string,
  setTextareaLines: (lines: number) => void
): void => {
  const { calculateCpm } = useCpmStore.getState();
  const newValue: string = e.target.value;

  if (startTime === null) {
    setTime({ startTime: Date.now(), endTime: null });
  }

  if (inputValue.length === 0) {
    setCpm(0);
    setTime({ startTime: null, endTime: null });
  }

  setInputValue(newValue); // 상태 업데이트

  setTimeout(() => {
    setCpm(calculateCpm()); // 다음 이벤트 루프에서 최신 값 반영
  }, 0);

  const lines = newValue.split('\n').length;
  setTextareaLines(lines);
};

export const handleEnter = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  inputValue: string,
  setInputValue: (value: string) => void,
  calculateCpm: () => number,
  setReport: (report: { cpm: number; accuracy: number; count: number }) => void,
  report: { cpm: number; accuracy: number; count: number }
) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    // getState()를 통해 store의 상태를 가져옴
    const { currentSentence, getRandomSentence } = useSentenceStore.getState();

    // 결과 저장
    const currentCpm = calculateCpm();
    const accuracy = 100;
    const count = report.count;

    if (
      inputValue.length >= currentSentence.text.length &&
      (e.key === 'Enter' || e.key === ' ')
    ) {
      setReport({ cpm: currentCpm, accuracy, count: count + 1 });
      setInputValue('');
      getRandomSentence();
    }
  }
};

export const keyPressEscape = (
  e: React.KeyboardEvent<HTMLElement>,
  setInputValue: (value: string) => void,
  setCpm: (cpm: number) => void,
  setTime: (time: { startTime: number | null; endTime: number | null }) => void,
  inputRef: React.RefObject<HTMLTextAreaElement>
) => {
  if (e.key === 'Escape') {
    setTimeout(() => {
      setInputValue('');
      setCpm(0);
      setTime({ startTime: null, endTime: null });

      inputRef.current?.focus();
    }, 100);
  }
};
