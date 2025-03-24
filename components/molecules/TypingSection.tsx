'use client';
import React, { useCallback, useRef, useEffect } from 'react';
import { useSentenceStore } from '@/stores/sentenceStore';
import { Report } from '@/components/molecules';
import { supabase } from '@/lib/supabase';
import { handleScreenClick } from '@/handlers/inputHandlers';
import { useTyping } from '@/hooks/useTyping';
import type { Sentence } from '@/types/typing';

export function TypingSection() {
  const { setSentences, currentSentence, getRandomSentence } =
    useSentenceStore();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {
    inputValue,
    displayWord,
    charColors,
    textareaLines,
    handleInputChange,
    handleKeyDown,
  } = useTyping();

  // Supabase에서 문장 데이터 로드
  const loadSentences = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('typing_sentences')
        .select('speaker, text');

      if (error) throw error;

      if (data) {
        setSentences(data as Sentence[]);
        getRandomSentence();
      }
    } catch (error) {
      console.error('Error fetching sentences:', error);
    }
  }, [getRandomSentence, setSentences]);

  // 초기 문장 로드
  useEffect(() => {
    void loadSentences();
  }, [loadSentences]);

  return (
    <section
      className="relative h-screen w-screen"
      onClick={() => handleScreenClick(inputRef)}
    >
      <h2 className="sr-only">타이핑 섹션</h2>
      <div className="absolute left-1/2 top-1/3 w-[80%] min-w-[800px] max-w-[900px] -translate-x-1/2">
        <Report />
        <div className="overflow-hidden rounded-lg bg-zinc-700 px-48pxr py-48pxr text-zinc-50">
          <span>-{currentSentence.speaker}-</span>
          <p className="mb-8pxr mt-8pxr text-20pxr">
            {displayWord.split('').map((char, index) => (
              <span key={index} style={{ color: charColors[index] }}>
                {char}
              </span>
            ))}
          </p>
          <textarea
            ref={inputRef}
            id="typing-input"
            className="w-full resize-none overflow-hidden border-b-4 border-zinc-400 bg-transparent text-20pxr text-zinc-50 outline-none"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={inputValue}
            placeholder="문장을 입력하세요"
            autoFocus
            spellCheck={false}
            autoComplete="off"
            maxLength={displayWord.length}
            rows={textareaLines}
          />
        </div>
      </div>
    </section>
  );
}
