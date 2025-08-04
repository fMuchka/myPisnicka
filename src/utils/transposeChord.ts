import { HSystem, Notes } from '../features/Controls/ChordDetailsControl/enums';

export const transposeChord = (
  chord: string,
  hSystem: HSystem,
  semitones: number,
  uniqueChords?: Map<string, boolean>
): {
  root: string;
  suffix: string;
  useRichDisplay: boolean;
} => {
  // mapping flats → sharps for lookup
  const enharmonicMap: { [key: string]: string } = {
    Db: Notes.C_SHARP,
    Eb: Notes.D_SHARP,
    Gb: Notes.F_SHARP,
    Ab: Notes.G_SHARP,
    Bb: Notes.A_SHARP,
  };

  // Czech input → internal sharp names
  const inputMap: { [key: string]: string } = {
    H: Notes.B,
    [Notes.B]: Notes.A_SHARP,
  };

  // internal → Czech output names
  const outputMap: { [key: string]: string } = {
    [Notes.A_SHARP]: Notes.B,
    [Notes.B]: 'H',
  };

  // canonical sharp-based chromatic scale
  const notes = [
    Notes.C,
    Notes.C_SHARP,
    Notes.D,
    Notes.D_SHARP,
    Notes.E,
    Notes.F,
    Notes.F_SHARP,
    Notes.G,
    Notes.G_SHARP,
    Notes.A,
    Notes.A_SHARP,
    Notes.B,
  ];

  // split root (e.g. "Eb", "F#") from the rest ("m7", "maj")
  const match = chord.match(/^([A-H][b#]?)(.*)$/);
  if (!match) {
    // return <Chord key={renderKey} chord={chord} useRichDisplay={false} />;
    return { root: chord, suffix: '', useRichDisplay: false };
  }
  // eslint-disable-next-line prefer-const
  let [, root, suffix] = match;

  if (inputMap[root]) root = inputMap[root];
  else if (enharmonicMap[root]) root = enharmonicMap[root];

  const oldIndex = notes.indexOf(root as Notes);
  if (oldIndex === -1) {
    return { root: chord, suffix: '', useRichDisplay: false };
  }

  // shift and wrap within 0–11
  const newIndex = (oldIndex + semitones + 12) % 12;
  let newRoot = notes[newIndex];

  // convert back to Czech B/H if needed
  if (outputMap[newRoot] && hSystem === HSystem.CZECH)
    newRoot = outputMap[newRoot] as Notes;

  if (uniqueChords) uniqueChords.set(newRoot + '_' + suffix, true);

  return { root: newRoot, suffix: suffix, useRichDisplay: true };
};
