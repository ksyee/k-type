import { create } from 'zustand';

interface Sentence {
  speaker: string;
  text: string;
}

interface SentenceStore {
  sentences: Sentence[];
  setSentences: (sentences: Sentence[]) => void;
  usedSentences: Set<Sentence>; // Set<{ speaker: string; text: string }> 대신 문자열 저장
  currentSentence: Sentence;
  getRandomSentence: () => void;
}

export const useSentenceStore = create<SentenceStore>((set, get) => ({
  sentences: [
    { speaker: 'Alice', text: 'Hello there!' },
    { speaker: 'Bob', text: 'How are you?' },
    { speaker: 'Charlie', text: 'Good morning!' },
  ],
  setSentences: (sentences) => set({ sentences }),
  usedSentences: new Set(),
  currentSentence: {
    speaker: '로딩중...',
    text: '로딩중...',
  },

  // 랜덤 문장 가져오기 (중복 제거)
  getRandomSentence: () => {
    const { sentences, usedSentences } = get();

    // 사용되지 않은 문장 필터링
    const availableSentences = sentences.filter(
      (sentence) =>
        !Array.from(usedSentences).some(
          (used) =>
            used.speaker === sentence.speaker && used.text === sentence.text
        )
    );

    if (availableSentences.length === 0) {
      console.log('모든 문장을 사용했습니다. 초기화가 필요합니다.');
      return;
    }

    // 랜덤 선택
    const randomIndex = Math.floor(Math.random() * availableSentences.length);
    const newSentence = availableSentences[randomIndex];

    // 상태 업데이트
    set((state) => ({
      currentSentence: newSentence,
      usedSentences: new Set(state.usedSentences).add(newSentence), // 객체 그대로 저장
    }));
  },
}));
