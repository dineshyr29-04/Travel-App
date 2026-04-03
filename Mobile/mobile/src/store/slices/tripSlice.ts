/**
 * Trip Slice
 * Redux slice for trips state management
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TripState, Trip } from '../../types';

const initialState: TripState = {
  trips: [],
  selectedTrip: null,
  isLoading: false,
  error: null,
};

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set trips list
    setTrips: (state, action: PayloadAction<Trip[]>) => {
      state.trips = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    // Add single trip
    addTrip: (state, action: PayloadAction<Trip>) => {
      state.trips.push(action.payload);
    },

    // Update trip
    updateTrip: (state, action: PayloadAction<Trip>) => {
      const index = state.trips.findIndex((trip) => trip.id === action.payload.id);
      if (index !== -1) {
        state.trips[index] = action.payload;
      }
      if (state.selectedTrip?.id === action.payload.id) {
        state.selectedTrip = action.payload;
      }
    },

    // Delete trip
    deleteTrip: (state, action: PayloadAction<string>) => {
      state.trips = state.trips.filter((trip) => trip.id !== action.payload);
      if (state.selectedTrip?.id === action.payload) {
        state.selectedTrip = null;
      }
    },

    // Select trip
    selectTrip: (state, action: PayloadAction<Trip | null>) => {
      state.selectedTrip = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Clear trips
    clearTrips: (state) => {
      state.trips = [];
      state.selectedTrip = null;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setTrips,
  addTrip,
  updateTrip,
  deleteTrip,
  selectTrip,
  setError,
  clearTrips,
} = tripSlice.actions;

export default tripSlice.reducer;
