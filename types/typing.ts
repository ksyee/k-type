export interface Sentence {
  speaker: string;
  text: string;
}

export interface Report {
  cpm: number;
  accuracy: number;
  count: number;
}

export interface TypingTime {
  startTime: number | null;
  endTime: number | null;
}
