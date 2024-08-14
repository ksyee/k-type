import { create } from 'zustand';

interface AccuracyStore {
  accuracy: number;
  setAccuracy: (accuracy: number) => void;
  resetAccuracy: () => void;
}

export const useAccuracyStore = create<AccuracyStore>((set) => ({
  accuracy: 0,
  setAccuracy: (accuracy) => set({ accuracy }),
  resetAccuracy: () => set({ accuracy: 0 }),
}));
