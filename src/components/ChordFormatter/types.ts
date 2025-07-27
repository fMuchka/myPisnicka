import type { RefinedSong } from '../../utils/rawSongRefiner';
import type { HSystem } from '../ChordDetailsToggle/enums';

export type ChordFormatterProps = {
  song: RefinedSong | null;
  transposition: number;
  hSystem: HSystem;
};
