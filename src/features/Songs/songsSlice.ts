import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RefinedSong } from '../../utils/rawSongRefiner';
import fileLoader from '../../utils/fileLoader';
import rawSongRefiner from '../../utils/rawSongRefiner';
import type { RootState } from '../../app/store';

export enum SongTags {
  CESKE = 'České',
  PLOUZAK = 'Ploužák',
  TABOROVA = 'Táborová',
  POHADKY = 'Pohádky',
  MODERNI = 'Moderní',
  LIDOVKA = 'Lidovka',
}

export interface SongState {
  songs: RefinedSong[] | null;
  selectedSong: RefinedSong | null;
  tagFilters: SongTags[];
  textFilter: string;
  shouldIncludeAllFilters: boolean;
}

const initialState: SongState = {
  selectedSong: null,
  songs: null,
  tagFilters: [],
  textFilter: '',
  shouldIncludeAllFilters: true,
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

    setSelectedSongFirstChord: (state, action: PayloadAction<string>) => {
      if (state.selectedSong !== null)
        state.selectedSong.firstChord = action.payload;
    },

    setSelectedSongNumberOfLines: (state, action: PayloadAction<number>) => {
      if (state.selectedSong !== null)
        state.selectedSong.numberOfLines = action.payload;
    },

    setTagFilters: (state, action: PayloadAction<SongTags[]>) => {
      state.tagFilters = action.payload;
    },

    setTextFilter: (state, action: PayloadAction<string>) => {
      state.textFilter = action.payload;
    },

    toggleInclusionFilterType: (state) => {
      state.shouldIncludeAllFilters = !state.shouldIncludeAllFilters;
    },
  },
});

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

  refinedSongs.sort((a, b) => (a.id > b.id ? 1 : a.id === b.id ? 0 : -1));

  refinedSongs.forEach((e, idx) => (e.id = `${idx + 1}) ${e.id}`));

  dispatch(setSongs(refinedSongs));
  dispatch(setSelectedSong(refinedSongs[0]));
};

export const {
  setSelectedSong,
  setSongs,
  setSelectedSongFirstChord,
  setSelectedSongNumberOfLines,
  setTagFilters,
  setTextFilter,
  toggleInclusionFilterType,
} = songSlice.actions;

export const selectedSong = (state: RootState) =>
  state.songReducer.selectedSong;

export default songSlice.reducer;
