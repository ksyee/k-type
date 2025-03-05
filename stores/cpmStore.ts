import { create } from 'zustand';
import { disassembleHangul } from 'es-hangul';

type TypingTime = number | null;

interface CpmStore {
  // inputValue: string;
  // setInputValue: (inputValue: string) => void;
  cpm: number;
  setCpm: (cpm: number) => void;
  typingTime: {
    startTime: TypingTime;
    endTime: TypingTime;
  };
  keyCount: number;
  increaseKeyCount: () => void;
  decreaseKeyCount: () => void;
  setTime: (typingTime: { startTime: TypingTime; endTime: TypingTime }) => void;
  calculateCpm: () => number;
}

export const useCpmStore = create<CpmStore>((set, get) => ({
  // inputValue: '',
  // setInputValue: (inputValue) => set({ inputValue }),
  cpm: 0,
  setCpm: (cpm) => set({ cpm }),
  typingTime: {
    startTime: null,
    endTime: null,
  },
  setTime: (typingTime) => set({ typingTime }),
  keyCount: 0,
  increaseKeyCount: () => set((state) => ({ keyCount: state.keyCount + 1 })),
  decreaseKeyCount: () => set((state) => ({ keyCount: state.keyCount - 1 })),
  // CPM 계산 함수
  calculateCpm: () => {
    const { typingTime, keyCount } = get();
    const { startTime, endTime } = typingTime;

    if (startTime === null) {
      return 0;
    }

    const timeDiff = Date.now() - startTime;

    if (timeDiff > 0) {
      return Math.floor((keyCount / timeDiff) * 60000);
    }

    return 0;
  },

  // calculateCpm: () => {
  //   const { typingTime, inputValue } = get();
  //   const { startTime } = typingTime;
  //
  //   if (startTime === null) {
  //     return 0;
  //   }
  //
  //   const timeDiff = Date.now() - startTime; // 입력 시간 계산
  //   const inputLength = disassembleHangul(inputValue).length; // 자모 분리 후 길이 계산
  //
  //   if (timeDiff > 0) {
  //     return Math.floor((inputLength / timeDiff) * 60000); // 분당 글자수 계산
  //   }
  //
  //   return 0;
  // },
}));
