/**
 * Redux Store Configuration
 * Central store setup for the entire app
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import appReducer from './slices/appSlice';
import tripReducer from './slices/tripSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    trips: tripReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore certain actions/paths if needed
        ignoredActions: ['auth/setUser'],
        ignoredPaths: ['auth.user.createdAt'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
