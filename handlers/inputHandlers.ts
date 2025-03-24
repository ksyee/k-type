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

  // 첫 입력 시 시작 시간 설정
  if (startTime === null) {
    setTime({ startTime: Date.now(), endTime: null });
  }

  // 입력값이 비어있을 때 초기화
  if (newValue.length === 0) {
    setCpm(0);
    setTime({ startTime: null, endTime: null });
  }

  setInputValue(newValue);

  // CPM 계산 및 업데이트
  const newCpm = calculateCpm();
  setCpm(newCpm);

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
    const { setTime } = useCpmStore.getState();

    // 결과 저장
    const currentCpm = calculateCpm();
    const accuracy = 100;
    const count = report.count;

    // 입력한 텍스트가 현재 문장의 길이와 같거나 더 길 때만 처리
    if (inputValue.length >= currentSentence.text.length) {
      setReport({ cpm: currentCpm, accuracy, count: count + 1 });
      setInputValue('');
      setTime({ startTime: null, endTime: null }); // 시간 초기화
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
