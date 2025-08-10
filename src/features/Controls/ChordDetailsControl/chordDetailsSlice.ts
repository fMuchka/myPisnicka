import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ChordVisibility, HSystem, Notes } from './enums';
import type { RootState } from '../../../app/store';

export interface ChordDetailsState {
  chordVisibility: ChordVisibility;
  transpositionMap: { [key: string]: Notes };
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
  transpositionMap: {},
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

    setTransposition: (state, action: PayloadAction<[string, Notes]>) => {
      state.transpositionMap[action.payload[0]] = action.payload[1];
    },

    setHSystem: (state, action: PayloadAction<HSystem>) => {
      state.hSystem = action.payload;
    },

    setFirstChordRoot: (state, action: PayloadAction<string>) => {
      state.firstChord.root = action.payload;
    },

    setFirstChordSuffix: (state, action: PayloadAction<string>) => {
      state.firstChord.suffix = action.payload;
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

export const transpositionMap = (state: RootState) =>
  state.chordDetailsReducer.transpositionMap;

export const {
  setTransposition,
  setHSystem,
  setChordVisibility,
  setFirstChordRoot,
  setFirstChordSuffix,
  setCurrentChords,
  resetCurrentChords,
} = chordDetailsSlice.actions;

export default chordDetailsSlice.reducer;
