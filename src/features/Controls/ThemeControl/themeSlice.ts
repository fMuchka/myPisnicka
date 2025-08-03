import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PrimaryLightThemeColor, PrimaryDarkThemeColor } from './theme/enums';
import { ColorScheme } from './theme/enums';

export interface ThemeState {
  primaryColor: PrimaryLightThemeColor | PrimaryDarkThemeColor;
  colorScheme: ColorScheme;
}

const initialState: ThemeState = {
  colorScheme: ColorScheme.DARK,
  primaryColor: PrimaryDarkThemeColor.GREEN,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColorScheme: (state, action: PayloadAction<ColorScheme>) => {
      state.colorScheme = action.payload;
    },
    setPrimaryColor: (
      state,
      action: PayloadAction<PrimaryLightThemeColor | PrimaryDarkThemeColor>
    ) => {
      state.primaryColor = action.payload;
    },
  },
});

export const { setColorScheme, setPrimaryColor } = themeSlice.actions;
export default themeSlice.reducer;
