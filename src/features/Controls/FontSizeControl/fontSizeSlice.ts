import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FontState {
  fontSize: number;
  chordSize: number;
  chordPosition: 'above' | 'inline';
}

export const initialState: FontState = {
  fontSize: 16,
  chordPosition: 'above',
  chordSize: 20,
};

const fontSizeSlice = createSlice({
  name: 'fontSize',
  initialState,
  reducers: {
    incrementFontSize: (state) => {
      state.fontSize++;
    },

    decrementFontSize: (state) => {
      state.fontSize--;
    },

    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },

    resetFontSize: (state) => {
      state.fontSize = initialState.fontSize;
    },

    incrementChordSize: (state) => {
      state.chordSize++;
    },

    decrementChordSize: (state) => {
      state.chordSize--;
    },

    setChordSize: (state, action: PayloadAction<number>) => {
      state.chordSize = action.payload;
    },

    resetChordSize: (state) => {
      state.chordSize = initialState.chordSize;
    },

    setChordPosition: (
      state,
      action: PayloadAction<typeof initialState.chordPosition>
    ) => {
      state.chordPosition = action.payload;
    },
  },
});

export const {
  incrementFontSize,
  decrementFontSize,
  setFontSize,
  resetFontSize,
  decrementChordSize,
  incrementChordSize,
  resetChordSize,
  setChordSize,
  setChordPosition,
} = fontSizeSlice.actions;

export default fontSizeSlice.reducer;
