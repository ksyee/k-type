'use client';
import { useState, useEffect, useMemo } from 'react';
import { disassembleHangulToGroups, hangulIncludes } from 'es-hangul';
import { cssNumber } from 'jquery';

const targetSentence = '당신이 잘 하는 일이라면 무엇이나 행복에 도움이 된다.';

export function TypingSection() {
  const [inputValue, setInputValue] = useState('');
  const [charColors, setCharColors] = useState<string[]>(
    Array(targetSentence.length).fill('white')
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const getCharColors = useMemo(() => {
    const targetSentenceArr = targetSentence.split('');
    const inputValueArr = inputValue.split('');
    const newColors = Array(targetSentence.length).fill('white');

    inputValueArr.forEach((char, index) => {
      const disassembleChar = disassembleHangulToGroups(char);
      const disassembleTargetChar = disassembleHangulToGroups(
        targetSentenceArr[index]
      );

      console.log(disassembleChar);
      console.log(disassembleTargetChar);

      const isMatched = true;

      newColors[index] = isMatched ? 'gray' : 'red';
    });

    return newColors;
  }, [inputValue]);

  useEffect(() => {
    setCharColors(getCharColors);
  }, [getCharColors]);

  return (
    <div className="text-zinc-50">
      <h1>문장 비교기</h1>
      <p>
        {targetSentence.split('').map((char, index) => {
          return (
            <span key={index} style={{ color: charColors[index] }}>
              {char}
            </span>
          );
        })}
      </p>
      <input
        type="text"
        className="w-screen text-black"
        onChange={handleInput}
        placeholder="문장을 입력하세요"
      />
    </div>
  );
}
