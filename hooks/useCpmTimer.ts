import { useEffect } from 'react';

// useCpmTimer의 타입
type UseCpmTimer = (
  calculateCpm: () => number,
  setCpm: (cpm: number) => void
) => void;

// CPM 계산을 위한 interval 설정
export const useCpmTimer: UseCpmTimer = (calculateCpm, setCpm) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentCpm = calculateCpm();
      setCpm(currentCpm);
    }, 100);

    return () => clearInterval(intervalId);
  }, [calculateCpm, setCpm]);
};
