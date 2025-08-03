import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CookieAcceptState } from './enums';

export interface CookieState {
  cookieAcceptState: CookieAcceptState;
}

const initialState: CookieState = {
  cookieAcceptState: CookieAcceptState.NONE,
};

const cookieSlice = createSlice({
  name: 'cookie',
  initialState,
  reducers: {
    updateCookieAcceptState: (
      state,
      action: PayloadAction<CookieAcceptState>
    ) => {
      state.cookieAcceptState = action.payload;
    },
  },
});

export const { updateCookieAcceptState } = cookieSlice.actions;

export default cookieSlice.reducer;
