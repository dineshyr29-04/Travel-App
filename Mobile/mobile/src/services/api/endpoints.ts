/**
 * API Endpoints
 * Centralized API endpoint definitions
 */

import apiClient from './client';
import { Trip, ApiResponse } from '../../types';

/**
 * Auth Endpoints
 */
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  signup: (email: string, password: string, displayName: string) =>
    apiClient.post('/auth/signup', { email, password, displayName }),
  logout: () => apiClient.post('/auth/logout'),
  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, newPassword: string) =>
    apiClient.post('/auth/reset-password', { token, newPassword }),
  getProfile: () => apiClient.get('/auth/profile'),
  updateProfile: (data: any) => apiClient.put('/auth/profile', data),
};

/**
 * Trips Endpoints
 */
export const tripsAPI = {
  // Get all trips
  getAllTrips: (page = 1, limit = 10) =>
    apiClient.get<ApiResponse<Trip[]>>(
      `/trips?page=${page}&limit=${limit}`
    ),

  // Get single trip
  getTrip: (tripId: string) =>
    apiClient.get<ApiResponse<Trip>>(`/trips/${tripId}`),

  // Create trip
  createTrip: (trip: Omit<Trip, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) =>
    apiClient.post<ApiResponse<Trip>>('/trips', trip),

  // Update trip
  updateTrip: (tripId: string, trip: Partial<Trip>) =>
    apiClient.put<ApiResponse<Trip>>(`/trips/${tripId}`, trip),

  // Delete trip
  deleteTrip: (tripId: string) =>
    apiClient.delete<ApiResponse<{ id: string }>>(`/trips/${tripId}`),

  // Search trips
  searchTrips: (query: string, page = 1, limit = 10) =>
    apiClient.get<ApiResponse<Trip[]>>(
      `/trips/search?q=${query}&page=${page}&limit=${limit}`
    ),
};

/**
 * User Endpoints
 */
export const userAPI = {
  getUser: (userId: string) =>
    apiClient.get(`/users/${userId}`),
  updateUser: (userId: string, data: any) =>
    apiClient.put(`/users/${userId}`, data),
  deleteUser: (userId: string) =>
    apiClient.delete(`/users/${userId}`),
};

export default {
  auth: authAPI,
  trips: tripsAPI,
  user: userAPI,
};
