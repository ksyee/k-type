'use client';
import { useCpmStore } from '@/stores/cpmStore';

export function RealTimeCPM() {
  const { cpm } = useCpmStore();
  return <span className="ml-8pxr text-18pxr">{cpm}</span>;
}
