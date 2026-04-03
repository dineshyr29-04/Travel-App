/**
 * Global Type Definitions for TravelSathi
 * Centralized location for all TypeScript types and interfaces
 */

// Auth Types
export interface AuthUser {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Trip Types
export interface Trip {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  destination: string;
  budget: number;
  currency: string;
  imageUrl?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TripState {
  trips: Trip[];
  selectedTrip: Trip | null;
  isLoading: boolean;
  error: string | null;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Home: undefined;
  TripDetails: { tripId: string };
  CreateTrip: undefined;
  Profile: undefined;
};

// App State
export interface AppState {
  isOnboarded: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'es' | 'fr';
}
