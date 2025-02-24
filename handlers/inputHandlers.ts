// handlers/inputHandlers.ts
import React from 'react';

export const handleInput = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  startTime: number | null,
  setTime: (time: { startTime: number | null; endTime: number | null }) => void,
  setInputValue: (value: string) => void,
  startCpmInterval: () => () => void,
  setCpm: (cpm: number) => void,
  inputValue: string,
  setTextareaLines: (lines: number) => void
) => {
  if (startTime === null) {
    setTime({ startTime: Date.now(), endTime: null });
    startCpmInterval();
  }

  if (inputValue.length === 0) {
    setCpm(0);
    setTime({ startTime: null, endTime: null });
  }

  setInputValue(e.target.value);

  const lines = e.target.value.split('\n').length;
  setTextareaLines(lines);
};

export const handleEnter = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  sentence: {
    speaker: string;
    text: string;
  },
  setSentence: React.Dispatch<
    React.SetStateAction<{
      speaker: string;
      text: string;
    }>
  >
) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    setSentence((prev) => ({
      ...prev,
      speaker: 'Loading...',
      text: '문장을 불러오는 중입니다...',
    }));
  }
};

export const keyPressEscape = (
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  setInputValue: (value: string) => void,
  setCpm: (cpm: number) => void,
  setTime: (time: { startTime: number | null; endTime: number | null }) => void
) => {
  if (e.key === 'Escape') {
    setInputValue('');
    setCpm(0);
    setTime({ startTime: null, endTime: null });
  }
};
