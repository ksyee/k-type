import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { RootLayoutProps } from '@/types/globalTypes';
import { Navbar } from '@/components/molecules';

import './globals.css';

const pretendard = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'K-TYPE',
  description: '타이핑만 하세요',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko-KR">
      <body className={`${pretendard.className} h-screen w-screen bg-zinc-700`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
