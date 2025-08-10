import { configureStore, createSelector } from '@reduxjs/toolkit';
import themeReducer from '../features/Controls/ThemeControl/themeSlice';
import scrollReducer from '../features/Controls/ScrollControl/scrollSlice';
import fontSizeReducer from '../features/Controls/FontSizeControl/fontSizeSlice';
import chordDetailsReducer, {
  transpositionMap,
} from '../features/Controls/ChordDetailsControl/chordDetailsSlice';
import cookieReducer from '../features/Cookies/cookieSlice';
import songReducer, { selectedSong } from '../features/Songs/songsSlice';

export const store = configureStore({
  reducer: {
    themeReducer,
    scrollReducer,
    fontSizeReducer,
    chordDetailsReducer,
    cookieReducer,
    songReducer,
  },
});

export const currentSongTransposition = createSelector(
  [transpositionMap, selectedSong],
  (map, song) => {
    const songId = song?.id as string;

    if (map[songId] == null) return;

    return map[songId];
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
