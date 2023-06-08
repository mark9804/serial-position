export type ExperimentType = 'memorize' | 'calculate' | 'recall';

export interface Params {
  experimentType: ExperimentType;
  session: SessionString;
}

export type Session = 1 | 2 | 3 | 4 | 5 | 6;

export type SessionString = '1' | '2' | '3' | '4' | '5' | '6';

export interface WordSet {
  group: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  words: string[];
}
