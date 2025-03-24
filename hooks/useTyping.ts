import { useState, useEffect, useCallback } from 'react';
import { useCpmStore } from '@/stores/cpmStore';
import { useReportStore } from '@/stores/reportStore';
import { useSentenceStore } from '@/stores/sentenceStore';
import { calculateAccuracy } from '@/utils/accuracyUtil';
import { calculateCharColors } from '@/utils/colorUtil';
import type { Report } from '@/types/typing';

interface UseTypingReturn {
  inputValue: string;
  currentAccuracy: number;
  displayWord: string;
  charColors: string[];
  textareaLines: number;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  resetInput: () => void;
}

export const useTyping = (): UseTypingReturn => {
  const { setCpm, setTime, typingTime, calculateCpm, setInputValue } =
    useCpmStore();
  const { startTime } = typingTime;
  const { report, setReport } = useReportStore();
  const { currentSentence, getRandomSentence } = useSentenceStore();

  const [inputValue, setLocalInputValue] = useState<string>('');
  const [currentAccuracy, setCurrentAccuracy] = useState<number>(100);
  const [displayWord, setDisplayWord] = useState<string>(currentSentence.text);
  const [charColors, setCharColors] = useState<string[]>(
    Array(displayWord.length).fill('white')
  );
  const [textareaLines, setTextareaLines] = useState<number>(1);

  // 0.1초 간격으로 CPM 업데이트
  useEffect(() => {
    if (startTime === null) return;

    const intervalId = setInterval(() => {
      const newCpm = calculateCpm();
      setCpm(newCpm);
    }, 100);

    return () => clearInterval(intervalId);
  }, [startTime, calculateCpm, setCpm]);

  // 입력값이 변경될 때마다 색상과 정확도 업데이트
  useEffect(() => {
    const { newCharColors, newDisplayWord } = calculateCharColors(
      currentSentence.text,
      inputValue
    );

    setCharColors(newCharColors);
    setDisplayWord(newDisplayWord);
  }, [inputValue, currentSentence]);

  const updateAccuracy = useCallback(
    (newValue: string) => {
      if (newValue.length === 0) {
        setCurrentAccuracy(100);
        return;
      }
      const accuracy = calculateAccuracy(newValue, currentSentence.text);
      setCurrentAccuracy(accuracy);
      setReport((prev: Report) => ({
        ...prev,
        accuracy,
      }));
    },
    [currentSentence.text, setReport]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setLocalInputValue(newValue);
      setInputValue(newValue);

      if (startTime === null) {
        setTime({ startTime: Date.now(), endTime: null });
      }

      if (newValue.length === 0) {
        setCpm(0);
        setCurrentAccuracy(100);
        setTime({ startTime: null, endTime: null });
      } else {
        updateAccuracy(newValue);
      }

      const lines = newValue.split('\n').length;
      setTextareaLines(lines);
    },
    [setInputValue, setTime, setCpm, startTime, updateAccuracy]
  );

  const resetInput = useCallback(() => {
    setLocalInputValue('');
    setInputValue('');
    setCurrentAccuracy(100);
    setReport((prev: Report) => ({
      ...prev,
      accuracy: 100,
    }));
  }, [setInputValue, setReport]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        resetInput();
        setTime({ startTime: null, endTime: null });
        setCpm(0);
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();

        if (inputValue.length >= currentSentence.text.length) {
          const currentCpm = calculateCpm();
          setReport({
            cpm: currentCpm,
            accuracy: currentAccuracy,
            count: report.count + 1,
          });

          resetInput();
          setTime({ startTime: null, endTime: null });
          setCpm(0);
          getRandomSentence();
        }
      }
    },
    [
      inputValue,
      currentSentence.text,
      calculateCpm,
      currentAccuracy,
      report.count,
      setReport,
      resetInput,
      setTime,
      setCpm,
      getRandomSentence,
    ]
  );

  return {
    inputValue,
    currentAccuracy,
    displayWord,
    charColors,
    textareaLines,
    handleInputChange,
    handleKeyDown,
    resetInput,
  };
};
