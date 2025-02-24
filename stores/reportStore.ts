import { create } from 'zustand';

interface ReportStore {
  report: {
    cpm: number;
    accuracy: number;
    count: number;
  };
  setReport: (report: { cpm: number; accuracy: number; count: number }) => void;
  resetReport: () => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  report: {
    cpm: 0,
    accuracy: 0,
    count: 0,
  },
  setReport: (report) => set({ report }),
  resetReport: () => set({ report: { cpm: 0, accuracy: 0, count: 0 } }),
}));
