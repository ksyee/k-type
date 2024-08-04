'use client';

import { useCpmStore } from '@/store/cpmStore';

export function CPM() {
  const { cpm } = useCpmStore();
  return <span>{cpm}</span>;
}
