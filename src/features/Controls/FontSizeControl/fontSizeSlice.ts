import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FontState {
  fontSize: number;
}

export const initialState: FontState = {
  fontSize: 16,
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

    setFontSize: (state, payload: PayloadAction<number>) => {
      state.fontSize = payload.payload;
    },

    resetFontSize: (state) => {
      state.fontSize = initialState.fontSize;
    },
  },
});

export const {
  incrementFontSize,
  decrementFontSize,
  setFontSize,
  resetFontSize,
} = fontSizeSlice.actions;

export default fontSizeSlice.reducer;
