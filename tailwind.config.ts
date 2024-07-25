import range from 'lodash/range';

const pxToRem = (px: number, base: number = 16) => `${px / base}rem`;

const pxToRemFunc = (start: number, end: number): { [key: string]: string } => {
  return range(start, end).reduce(
    (acc, px) => {
      acc[`${px}pxr`] = pxToRem(px);
      return acc;
    },
    {} as { [key: string]: string }
  );
};

/** @type {import('tailwindcss').Config} */
const tailwindConfig: import('tailwindcss').Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        ...pxToRemFunc(1, 500),
      },
      inset: {
        ...pxToRemFunc(1, 500),
      },
      fontSize: {
        ...pxToRemFunc(1, 500),
      },
      lineHeight: {
        ...pxToRemFunc(1, 500),
      },
      screens: {
        mobile: '360px',
        tablet: '768px',
        desktop: '1280px',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      keyframes: {
        typingBlock: {
          '0%': {
            opacity: '1',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
      animation: {
        typingBlock: 'typingBlock 1s infinite',
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
