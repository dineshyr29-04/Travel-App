/**
 * Custom Redux Hooks
 * Type-safe hooks for using Redux
 */

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Selector hooks for easy access
export const useAuthSelector = () =>
  useAppSelector((state) => state.auth);

export const useAppStateSelector = () =>
  useAppSelector((state) => state.app);

export const useTripsSelector = () =>
  useAppSelector((state) => state.trips);

export const useUser = () =>
  useAppSelector((state) => state.auth.user);

export const useIsAuthenticated = () =>
  useAppSelector((state) => state.auth.isAuthenticated);

export const useIsLoading = () =>
  useAppSelector((state) => state.auth.isLoading);

export const useTheme = () =>
  useAppSelector((state) => state.app.theme);

export const useLanguage = () =>
  useAppSelector((state) => state.app.language);
