'use client';
import { useReportStore } from '@/stores/reportStore';
import { RealTimeCPM } from '@/components/atoms';

export function Report() {
  const { report } = useReportStore();

  return (
    <ul className="mb-8pxr flex gap-4pxr text-white">
      <li className="flex flex-1 items-center rounded-lg bg-zinc-700 px-8pxr py-12pxr">
        <span>PREV SPEED</span>
        <span className="ml-8pxr text-18pxr">{report.cpm}</span>
      </li>
      <li className="flex flex-1 items-center rounded-lg bg-zinc-700 px-8pxr py-12pxr">
        <span>SPEED</span>
        <RealTimeCPM />
      </li>
      <li className="flex flex-1 items-center rounded-lg bg-zinc-700 px-8pxr py-12pxr">
        <span>ACC</span>
        <span className="ml-8pxr text-18pxr">{report.accuracy}</span>
      </li>
      <li className="flex flex-1 items-center rounded-lg bg-zinc-700 px-8pxr py-12pxr">
        <span>CNT</span>
        <span className="ml-8pxr text-18pxr">{report.count}</span>
      </li>
    </ul>
  );
}
