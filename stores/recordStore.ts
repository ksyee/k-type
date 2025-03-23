import { create } from 'zustand';

interface RecordStore {
  record: {
    cpm: number;
    accuracy: number;
    count: number;
  }[];
  setRecord: (
    record: { cpm: number; accuracy: number; count: number }[]
  ) => void;
}

export const useRecordStore = create<RecordStore>((set) => ({
  record: [],
  setRecord: (record) => set({ record }),
}));
