import { useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import { useCallback } from 'react';
import { HSystem, Notes } from '../features/Controls/ChordDetailsControl/enums';

const useTranspositionMarks = () => {
  const { hSystem } = useSelector(
    (state: RootState) => state.chordDetailsReducer
  );

  const marks = useCallback(() => {
    const notes = [
      { value: Notes.C, label: Notes.C },
      { value: Notes.C_SHARP, label: Notes.C_SHARP },
      { value: Notes.D, label: Notes.D },
      { value: Notes.D_SHARP, label: Notes.D_SHARP },
      { value: Notes.E, label: Notes.E },
      { value: Notes.F, label: Notes.F },
      { value: Notes.F_SHARP, label: Notes.F_SHARP },
      { value: Notes.G, label: Notes.G },
      { value: Notes.G_SHARP, label: Notes.G_SHARP },
      { value: Notes.A, label: Notes.A },
      {
        value: hSystem === HSystem.CZECH ? Notes.B : Notes.A_SHARP,
        label: hSystem === HSystem.CZECH ? Notes.B : Notes.A_SHARP,
      },
      {
        value: hSystem === HSystem.CZECH ? 'H' : Notes.B,
        label: hSystem === HSystem.CZECH ? 'H' : Notes.B,
      },
    ];

    return notes;
  }, [hSystem]);

  return marks();
};

export default useTranspositionMarks;
