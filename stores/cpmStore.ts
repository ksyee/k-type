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
  setTime: (typingTime: { startTime: TypingTime; endTime: TypingTime }) => void;
  calculateCpm: () => number;
}

export const useCpmStore = create<CpmStore>((set, get) => ({
  inputValue: '',
  setInputValue: (inputValue) => set({ inputValue }),
  cpm: 0,
  setCpm: (cpm) => set({ cpm }),
  typingTime: {
    startTime: null,
    endTime: null,
  },
  setTime: (typingTime) => set({ typingTime }),
  keyCount: 0,
  // CPM 계산 함수
  // calculateCpm: () => {
  //   const { typingTime, keyCount } = get();
  //   const { startTime, endTime } = typingTime;
  //
  //   if (startTime === null) {
  //     return 0;
  //   }
  //
  //   const timeDiff = Date.now() - startTime;
  //
  //   if (timeDiff > 0) {
  //     return Math.floor((keyCount / timeDiff) * 60000);
  //   }
  //
  //   return 0;
  // },

  calculateCpm: () => {
    const { typingTime, inputValue, setCpm } = get();
    const { startTime } = typingTime;

    if (startTime === null) return 0;

    const timeDiff = Date.now() - startTime;
    if (timeDiff <= 0) return 0;

    const inputLength = disassembleHangul(inputValue).length;

    const cpm = Math.floor((inputLength / timeDiff) * 60000);
    setCpm(cpm); // 최신 상태 업데이트

    return cpm;
  },
}));
