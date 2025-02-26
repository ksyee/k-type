// handlers/inputHandlers.ts
import React from 'react';

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
  inputValue: string,
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

    // if (inputValue.length >= sentence.text.length)
    //   setSentence(sentence[1]);
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
    }, 10);
  }
};
