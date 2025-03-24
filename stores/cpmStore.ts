import { create } from 'zustand';
import { disassembleHangul } from 'es-hangul';

type TypingTime = number | null;

interface CpmStore {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  cpm: number;
  setCpm: (cpm: number) => void;
  typingTime: {
    startTime: TypingTime;
    endTime: TypingTime;
  };
  keyCount: number;
  setKeyCount: (count: number) => void;
  setTime: (typingTime: { startTime: TypingTime; endTime: TypingTime }) => void;
  calculateCpm: () => number;
}

export const useCpmStore = create<CpmStore>((set, get) => ({
  inputValue: '',
  setInputValue: (inputValue) => {
    set({ inputValue });
    // 입력값이 변경될 때마다 자모 수를 계산하여 keyCount 업데이트
    const jamoCount = disassembleHangul(inputValue).length;
    set({ keyCount: jamoCount });
  },
  cpm: 0,
  setCpm: (cpm) => set({ cpm }),
  typingTime: {
    startTime: null,
    endTime: null,
  },
  setTime: (typingTime) => set({ typingTime }),
  keyCount: 0,
  setKeyCount: (count) => set({ keyCount: count }),
  calculateCpm: () => {
    const { typingTime, keyCount } = get();
    const { startTime } = typingTime;

    if (startTime === null || keyCount === 0) {
      return 0;
    }

    const timeDiff = (Date.now() - startTime) / 1000; // 초 단위로 변환
    if (timeDiff <= 0) return 0;

    // 분당 타자수 계산 (자모 단위)
    const cpm = Math.floor((keyCount / timeDiff) * 60);

    return cpm;
  },
}));
