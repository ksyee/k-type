'use client';
import { useEffect, useState } from 'react';
import { disassembleHangulToGroups } from 'es-hangul';

const word = '타이핑 테스트입니다.';

export function TypingSection() {
  const [typing, setTyping] = useState('');

  const arrayToTargetWord = word.split('');

  // 타겟 단어를 초성, 중성, 종성으로 분해
  const disassembleTargetWord = disassembleHangulToGroups(word);

  const isCorrect = (targetWord: string[][], inputWord: string): boolean => {
    let result = false;
    const disassembleInputWord = disassembleHangulToGroups(inputWord);

    // if (disassembleInputWord.length > targetWord.length && word === typing) {
    //   return true;
    // }

    disassembleInputWord.forEach((input, index) => {
      if (targetWord[index] === undefined) {
        word === typing ? (result = true) : (result = false);
        return result;
      }

      const jamoLength = targetWord[index].length;

      for (let i = 0; i < jamoLength; i++) {
        if (input[i] === targetWord[index][i]) {
          result = true;
        } else {
          result = false;
        }
      }
    });

    return result;
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTyping(input);
  };

  useEffect(() => {
    console.log(isCorrect(disassembleTargetWord, typing));
  }, [typing]);

  return (
    <section className="text-zinc-300">
      <h2 className="sr-only">Typing Section</h2>
      <p id="target-text">
        {arrayToTargetWord.map((word, index) => {
          return (
            <span key={index} className={''}>
              {word}
            </span>
          );
        })}
      </p>
      <input
        type="text"
        name="typing-text"
        id="typing-text"
        value={typing}
        onChange={handleTyping}
        className="bg-transparent text-zinc-100 outline-none"
        autoComplete="off"
      />
    </section>
  );
}
