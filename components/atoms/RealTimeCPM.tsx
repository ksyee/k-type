'use client';
import { useCpmStore } from '@/stores/cpmStore';

export function RealTimeCPM() {
  const { cpm } = useCpmStore();
  return <span>{cpm}</span>;
}
