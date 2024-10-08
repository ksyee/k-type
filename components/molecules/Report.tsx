'use client';
import { useReportStore } from '@/store/reportStore';
import { RealTimeCPM } from '@/components/atoms';

export function Report() {
  const { report } = useReportStore();

  return (
    <ul className="text-white">
      <li>
        <span>CPM</span>
        <span>{report.cpm}</span>
      </li>
      <li>
        <span>Speed</span>
        <RealTimeCPM />
      </li>
      <li>
        <span>ACC</span>
        <span>{report.accuracy}</span>
      </li>
      <li>
        <span>CNT</span>
        <span>{report.count}</span>
      </li>
    </ul>
  );
}
