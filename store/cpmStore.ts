import { create } from 'zustand';
import { disassembleHangul } from 'es-hangul';

interface CpmStore {
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  cpm: number;
  setCpm: (cpm: number) => void;
  typingStartTime: number | null;
  typingEndTime: number | null;
  setTime: (
    typingStartTime: number | null,
    typingEndTime: number | null
  ) => void;
  calculateCpm: () => number;
}

export const useCpmStore = create<CpmStore>((set, get) => ({
  inputValue: '',
  setInputValue: (inputValue) => set({ inputValue }),
  cpm: 0,
  setCpm: (cpm) => set({ cpm }),
  typingStartTime: null,
  typingEndTime: null,
  setTime: (typingStartTime, typingEndTime) =>
    set({ typingStartTime, typingEndTime }),
  calculateCpm: () => {
    const { typingStartTime, inputValue } = get();

    if (typingStartTime === null) {
      return 0;
    }

    const timeDiff = Date.now() - typingStartTime; // 입력 시간 계산
    const inputLength = disassembleHangul(inputValue).length; // 자모 분리 후 길이 계산

    if (timeDiff > 0) {
      return Math.floor((inputLength / timeDiff) * 60000); // 분당 글자수 계산
    }

    return 0;
  },
}));
