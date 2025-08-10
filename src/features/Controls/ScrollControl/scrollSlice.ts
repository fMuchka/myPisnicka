import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ScrollState {
  scrollSpeed: number;
  isScrolling: boolean;
  scrollIntervalId: NodeJS.Timeout | null;
  scrollStartDelay: number;
}

const initialState: ScrollState = {
  scrollSpeed: 1,
  isScrolling: false,
  scrollIntervalId: null,
  scrollStartDelay: 3,
};

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setScrollStatus: (state, action: PayloadAction<boolean>) => {
      state.isScrolling = action.payload;
    },
    incrementScrollSpeed: (state) => {
      state.scrollSpeed++;
    },

    decrementScrollSpeed: (state) => {
      state.scrollSpeed--;
    },

    resetScrollSpeed: (state) => {
      state.scrollSpeed = initialState.scrollSpeed;
    },

    setScrollSpeed: (state, action: PayloadAction<number>) => {
      state.scrollSpeed = action.payload;
    },

    incrementScrollStartDelay: (state) => {
      state.scrollStartDelay += 0.5;
    },

    decrementScrollStartDelay: (state) => {
      if (state.scrollStartDelay > 0) state.scrollStartDelay -= 0.5;
    },

    resetScrollStartDelay: (state) => {
      state.scrollStartDelay = initialState.scrollStartDelay;
    },
  },
});

export const {
  setScrollStatus,
  decrementScrollSpeed,
  incrementScrollSpeed,
  incrementScrollStartDelay,
  decrementScrollStartDelay,
  resetScrollSpeed,
  resetScrollStartDelay,
  setScrollSpeed,
  // startScroll,
  // stopScroll,
} = scrollSlice.actions;
export default scrollSlice.reducer;
