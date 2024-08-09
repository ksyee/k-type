// handlers/inputHandlers.ts
import React from 'react';

export function handleInput(
  e: React.ChangeEvent<HTMLTextAreaElement>,
  startTime: number | null,
  setTime: (time: { startTime: number | null; endTime: number | null }) => void,
  setInputValue: (value: string) => void,
  startCpmInterval: () => () => void,
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

  const lines = e.target.value.split('\n').length;
  setTextareaLines(lines);
}

export function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
}

export function keyPressEscape(
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  setInputValue: (value: string) => void,
  setCpm: (cpm: number) => void,
  setTime: (time: { startTime: number | null; endTime: number | null }) => void
) {
  if (e.key === 'Escape') {
    setInputValue('');
    setCpm(0);
    setTime({ startTime: null, endTime: null });
  }
}
