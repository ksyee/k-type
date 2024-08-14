// handlers/inputHandlers.ts
import React from 'react';

export function handleInput(
  e: React.ChangeEvent<HTMLTextAreaElement>,
  startTime: number | null,
  setTime: (time: { startTime: number | null; endTime: number | null }) => void,
  setInputValue: (value: string) => void,
  startCpmInterval: () => void,
  setCpm: (cpm: number) => void,
  inputValue: string,
  setTextareaLines: (lines: number) => void
) {
  if (startTime === null) {
    setTime({ startTime: Date.now(), endTime: null });
    startCpmInterval();
  }

  if (inputValue.length === 0) {
    setCpm(0);
    setTime({ startTime: null, endTime: null });
  }

  setInputValue(e.target.value);

  const textarea = e.target;
  const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);
  const lines = Math.floor(textarea.scrollHeight / lineHeight);

  setTextareaLines(lines);
}

export function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
}

export function clearInput(
  setInputValue: (value: string) => void,
  setCpm: (cpm: number) => void,
  setTime: (time: { startTime: number | null; endTime: number | null }) => void,
  setTextareaLines: (lines: number) => void
) {
  setInputValue('');
  setCpm(0);
  setTime({ startTime: null, endTime: null });
  setTextareaLines(1);
}
