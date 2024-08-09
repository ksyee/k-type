'use client';
import { useCpmStore } from '@/store/cpmStore';

export function RealTimeCPM() {
  const { cpm } = useCpmStore();
  return <span>{cpm}</span>;
}
