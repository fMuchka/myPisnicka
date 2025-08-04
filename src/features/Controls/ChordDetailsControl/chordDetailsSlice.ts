import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ChordVisibility, HSystem } from './enums';

export interface ChordDetailsState {
  chordVisibility: ChordVisibility;
  transposition: number;
  hSystem: HSystem;
  firstChord: {
    suffix: string;
    root: string;
  };
  currentChords: {
    suffix: string;
    root: string;
  }[];
}

const initialState: ChordDetailsState = {
  chordVisibility: ChordVisibility.UNSET,
  transposition: 0,
  hSystem: HSystem.CZECH,
  firstChord: {
    root: '',
    suffix: '',
  },
  currentChords: [],
};

const chordDetailsSlice = createSlice({
  name: 'chordDetails',
  initialState,
  reducers: {
    setChordVisibility: (state, action: PayloadAction<ChordVisibility>) => {
      state.chordVisibility = action.payload;
    },

    setTransposition: (state, action: PayloadAction<number>) => {
      state.transposition = action.payload;
    },

    setHSystem: (state, action: PayloadAction<HSystem>) => {
      state.hSystem = action.payload;
    },

    setFirstChord: (
      state,
      action: PayloadAction<{
        suffix: string;
        root: string;
      }>
    ) => {
      state.firstChord = action.payload;
    },

    setCurrentChords: (
      state,
      action: PayloadAction<
        {
          suffix: string;
          root: string;
        }[]
      >
    ) => {
      state.firstChord = action.payload[0];
      state.currentChords = action.payload;
    },

    resetCurrentChords: (state) => {
      state.currentChords = [];
    },
  },
});

export const {
  setTransposition,
  setHSystem,
  setChordVisibility,
  setFirstChord,
  setCurrentChords,
  resetCurrentChords,
} = chordDetailsSlice.actions;

export default chordDetailsSlice.reducer;
