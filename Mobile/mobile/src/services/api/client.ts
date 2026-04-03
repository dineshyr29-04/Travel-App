/**
 * API Service with Axios
 * Centralized HTTP client for all API requests
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';
import envConfig from '../../config/env';
import logger from '../../utils/logger';
import { API_TIMEOUT, MAX_RETRIES, RETRY_DELAY } from '../../constants';
import { ApiResponse, ApiError } from '../../types';

/**
 * API Client class
 * Handles all HTTP requests with retry logic and error handling
 */
class ApiClient {
  private client: AxiosInstance;
  private retryCount: Map<string, number> = new Map();

  constructor() {
    this.client = axios.create({
      baseURL: envConfig.API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        logger.debug('API Request', {
          method: config.method,
          url: config.url,
        });
        return config;
      },
      (error) => {
        logger.error('Request interceptor error', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        logger.debug('API Response', {
          status: response.status,
          url: response.config.url,
        });
        return response;
      },
      async (error) => {
        const config = error.config as AxiosRequestConfig & { url: string };

        // Handle specific error codes
        if (error.response?.status === 401) {
          // Unauthorized - clear auth and redirect to login
          // You can dispatch a Redux action here to handle logout
          logger.warn('Unauthorized - please login again');
        }

        // Retry logic for specific errors
        if (this.shouldRetry(error)) {
          const requestUrl = config.url || '';
          const retries = this.retryCount.get(requestUrl) || 0;

          if (retries < MAX_RETRIES) {
            this.retryCount.set(requestUrl, retries + 1);

            await this.delay(RETRY_DELAY * (retries + 1));
            return this.client(config);
          }
          this.retryCount.delete(requestUrl);
        }

        logger.error('API Error', error);
        return Promise.reject(this.parseError(error));
      }
    );
  }

  /**
   * Determine if request should be retried
   */
  private shouldRetry(error: AxiosError): boolean {
    if (!error.response) {
      // Network error
      return true;
    }

    // Retry on 5xx errors and 429 (rate limit)
    const status = error.response.status;
    return status >= 500 || status === 429;
  }

  /**
   * Parse error response
   */
  private parseError(error: any): ApiError {
    if (error.response?.data) {
      return {
        code: error.response.data.code || 'UNKNOWN_ERROR',
        message: error.response.data.message || error.message,
        status: error.response.status,
      };
    }

    if (error.message === 'Network Error') {
      return {
        code: 'NETWORK_ERROR',
        message: 'Network error. Please check your connection.',
        status: 0,
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: error.message || 'An unknown error occurred',
      status: 0,
    };
  }

  /**
   * Utility delay function
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get auth token from storage
   * Replace with actual implementation based on your auth solution
   */
  private getAuthToken(): string | null {
    // TODO: Implement token retrieval from secure storage
    return null;
  }

  /**
   * GET request
   */
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.client.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * POST request
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * PUT request
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.client.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.client.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * DELETE request
   */
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.client.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Set auth token
   */
  setAuthToken(token: string): void {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Clear auth token
   */
  clearAuthToken(): void {
    delete this.client.defaults.headers.common['Authorization'];
  }
}

export default new ApiClient();
