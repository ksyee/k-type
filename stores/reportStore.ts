import { create } from 'zustand';

interface Report {
  cpm: number;
  accuracy: number;
  count: number;
}

interface ReportStore {
  report: Report;
  setReport: (report: Report | ((prev: Report) => Report)) => void;
  resetReport: () => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  report: {
    cpm: 0,
    accuracy: 100,
    count: 0,
  },
  setReport: (reportOrUpdater) =>
    set((state) => ({
      report:
        typeof reportOrUpdater === 'function'
          ? reportOrUpdater(state.report)
          : reportOrUpdater,
    })),
  resetReport: () => set({ report: { cpm: 0, accuracy: 100, count: 0 } }),
}));
