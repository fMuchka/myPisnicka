import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RefinedSong } from '../../utils/rawSongRefiner';

export interface QueueState {
  queue: RefinedSong[];
  currentSongIndex: number;
}

const initialState: QueueState = {
  queue: [],
  currentSongIndex: 0,
};

const queueSlice = createSlice({
  name: 'Queue',
  initialState,
  reducers: {
    addSongToQueue: (state, action: PayloadAction<RefinedSong>) => {
      state.queue.push(action.payload);
    },

    setQueue: (state, action: PayloadAction<RefinedSong[]>) => {
      state.queue = action.payload;
      state.currentSongIndex = 0;
    },
    removeSongFromQueue: (state, action: PayloadAction<RefinedSong>) => {
      const songIndex = state.queue.findIndex(
        (song) => song.id === action.payload.id
      );

      if (songIndex !== -1) {
        const copy = [...state.queue];
        copy.splice(songIndex, 1);

        state.queue = copy;
      }
    },

    clearQueue: (state) => {
      state.queue = [];
      state.currentSongIndex = 0;
    },

    setCurrentSongIndex: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.queue.length) {
        state.currentSongIndex = action.payload;
      }
    },
  },
});

export const {
  addSongToQueue,
  removeSongFromQueue,
  clearQueue,
  setCurrentSongIndex,
  setQueue,
} = queueSlice.actions;

export default queueSlice.reducer;
