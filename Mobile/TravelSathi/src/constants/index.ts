/**
 * Global Constants for TravelSathi
 */

// API Configuration
export const API_TIMEOUT = 30000; // 30 seconds
export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000; // 1 second

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@travelsathi_auth_token',
  USER_DATA: '@travelsathi_user_data',
  TRIPS: '@travelsathi_trips',
  PREFERENCES: '@travelsathi_preferences',
  ONBOARDED: '@travelsathi_onboarded',
};

// UI Constants
export const SCREEN_PADDING = 16;
export const BORDER_RADIUS = 12;
export const ANIMATION_DURATION = 300;

// Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\d\s\-\+\(\)]{10,}$/,
  PASSWORD_MIN_LENGTH: 8,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  API: 'YYYY-MM-DD',
  DATETIME: 'MMM DD, YYYY HH:mm',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  WEAK_PASSWORD: 'Password must be at least 8 characters.',
  USER_NOT_FOUND: 'User not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  LOGOUT: 'Logged out successfully.',
  TRIP_CREATED: 'Trip created successfully!',
  TRIP_UPDATED: 'Trip updated successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
};
