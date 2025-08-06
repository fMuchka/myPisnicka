import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RefinedSong } from '../../utils/rawSongRefiner';
import fileLoader from '../../utils/fileLoader';
import rawSongRefiner from '../../utils/rawSongRefiner';

export interface SongState {
  songs: RefinedSong[] | null;
  selectedSong: RefinedSong | null;
}

const initialState: SongState = {
  selectedSong: null,
  songs: null,
};

const songSlice = createSlice({
  name: 'Songs',
  initialState,
  reducers: {
    setSongs: (state, action: PayloadAction<RefinedSong[]>) => {
      state.songs = action.payload;
    },

    setSelectedSong: (state, action: PayloadAction<RefinedSong>) => {
      state.selectedSong = action.payload;
    },
  },
});

export const { setSelectedSong, setSongs } = songSlice.actions;

export const loadSongs = async (
  dispatch: (arg0: {
    payload: RefinedSong | RefinedSong[];
    type: 'Songs/setSelectedSong' | 'Songs/setSongs';
  }) => void
) => {
  const refinedSongs: RefinedSong[] = [];

  const songsRaw = await fileLoader.loadFiles();
  songsRaw.forEach((rawSong) => {
    refinedSongs.push(rawSongRefiner.refine(rawSong));
  });

  dispatch(setSongs(refinedSongs));
  dispatch(setSelectedSong(refinedSongs[0]));
};

export default songSlice.reducer;
