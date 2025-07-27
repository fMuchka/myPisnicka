import type { HSystem } from './enums';

export type ChordDetailsToggleProps = {
  transposition: number;
  setTransposition: React.Dispatch<React.SetStateAction<number>>;
  hSystem: HSystem;
  setHSystem: React.Dispatch<React.SetStateAction<HSystem>>;
};
