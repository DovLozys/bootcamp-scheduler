import { env } from '../config/env';
import { APIError, NetworkError, parseAPIError } from '../types/errors';

export interface RequestConfig extends RequestInit {
  timeout?: number;
}

/**
 * Enhanced fetch wrapper with error handling, timeout, and retry logic
 */
export async function apiRequest<T = any>(
  url: string,
  config: RequestConfig = {}
): Promise<T> {
  const { timeout = env.API_TIMEOUT, ...fetchConfig } = config;

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchConfig,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchConfig.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw await parseAPIError(response);
    }

    // Handle empty responses (like DELETE requests)
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return null as T;
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new APIError('Request timeout', 408, 'TIMEOUT');
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new NetworkError();
    }

    // Re-throw API errors as-is
    if (error instanceof APIError) {
      throw error;
    }

    // Wrap unknown errors
    throw new APIError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      500,
      'UNKNOWN_ERROR'
    );
  }
}

/**
 * Convenience methods for different HTTP verbs
 */
export const api = {
  get: <T = any>(url: string, config?: RequestConfig): Promise<T> =>
    apiRequest<T>(url, { ...config, method: 'GET' }),

  post: <T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> =>
    apiRequest<T>(url, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> =>
    apiRequest<T>(url, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> =>
    apiRequest<T>(url, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T = any>(url: string, config?: RequestConfig): Promise<T> =>
    apiRequest<T>(url, { ...config, method: 'DELETE' }),
};

/**
 * Retry wrapper for API calls
 */
export async function withRetry<T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 2,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error as Error;

      // Don't retry on client errors (4xx) except 408 (timeout)
      if (error instanceof APIError && error.status) {
        if (error.status >= 400 && error.status < 500 && error.status !== 408) {
          throw error;
        }
      }

      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        break;
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)));
    }
  }

  throw lastError!;
}
