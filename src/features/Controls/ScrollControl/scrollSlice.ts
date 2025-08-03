import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ScrollState {
  scrollSpeed: number;
  isScrolling: boolean;
  scrollIntervalId: NodeJS.Timeout | null;
}

const initialState: ScrollState = {
  scrollSpeed: 1,
  isScrolling: false,
  scrollIntervalId: null,
};

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    startScroll: (state) => {
      if (state.isScrolling || state.scrollSpeed === 0) return;

      state.isScrolling = true;

      const scrollSpeed = state.scrollSpeed;

      state.scrollIntervalId = setInterval(() => {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;

        const scrollStep = 0.5 * scrollSpeed;
        if (scrollTop + clientHeight >= scrollHeight - 1) {
          state.isScrolling = false;
          return;
        }
        window.scrollBy({ top: scrollStep, behavior: 'smooth' });
      }, 62);
    },

    stopScroll: (state) => {
      if (state.scrollIntervalId) {
        clearInterval(state.scrollIntervalId);
        state.scrollIntervalId = null;
      }

      state.isScrolling = false;
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
  },
});

export const {
  decrementScrollSpeed,
  incrementScrollSpeed,
  resetScrollSpeed,
  setScrollSpeed,
  startScroll,
  stopScroll,
} = scrollSlice.actions;
export default scrollSlice.reducer;
