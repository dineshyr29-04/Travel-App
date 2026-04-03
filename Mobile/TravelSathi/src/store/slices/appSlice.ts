/**
 * App Slice
 * Redux slice for general app state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../types';

const initialState: AppState = {
  isOnboarded: false,
  theme: 'light',
  language: 'en',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Set onboarding status
    setOnboarded: (state, action: PayloadAction<boolean>) => {
      state.isOnboarded = action.payload;
    },

    // Set theme
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },

    // Set language
    setLanguage: (state, action: PayloadAction<'en' | 'es' | 'fr'>) => {
      state.language = action.payload;
    },

    // Toggle theme
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setOnboarded, setTheme, setLanguage, toggleTheme } =
  appSlice.actions;

export default appSlice.reducer;
