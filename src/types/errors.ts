/**
 * Error types and utilities for the application
 */

export interface AppError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export class APIError extends Error implements AppError {
  code?: string;
  status?: number;
  details?: any;

  constructor(message: string, status?: number, code?: string, details?: any) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class NetworkError extends Error implements AppError {
  code?: string;
  status?: number;
  details?: any;

  constructor(message: string = 'Network connection failed') {
    super(message);
    this.name = 'NetworkError';
    this.code = 'NETWORK_ERROR';
  }
}

export class ValidationError extends Error implements AppError {
  code?: string;
  status?: number;
  details?: any;

  constructor(message: string, details?: any) {
    super(message);
    this.name = 'ValidationError';
    this.code = 'VALIDATION_ERROR';
    this.details = details;
  }
}

/**
 * Error message mappings for user-friendly messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
  SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access to this resource is forbidden.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  TIMEOUT: 'The request took too long. Please try again.',
  UNKNOWN: 'An unexpected error occurred. Please try again.',
} as const;

/**
 * Get user-friendly error message
 */
export function getUserFriendlyMessage(error: Error | AppError): string {
  if (error instanceof NetworkError) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }
  
  if (error instanceof APIError) {
    switch (error.status) {
      case 400:
        return ERROR_MESSAGES.VALIDATION_ERROR;
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 403:
        return ERROR_MESSAGES.FORBIDDEN;
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 408:
        return ERROR_MESSAGES.TIMEOUT;
      case 500:
      case 502:
      case 503:
      case 504:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        return error.message || ERROR_MESSAGES.UNKNOWN;
    }
  }
  
  if (error instanceof ValidationError) {
    return error.message || ERROR_MESSAGES.VALIDATION_ERROR;
  }
  
  return error.message || ERROR_MESSAGES.UNKNOWN;
}

/**
 * Parse API error response
 */
export async function parseAPIError(response: Response): Promise<APIError> {
  let errorMessage = `HTTP ${response.status}`;
  let errorDetails = null;
  
  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorData.error || errorMessage;
    errorDetails = errorData;
  } catch {
    // If we can't parse the error response, use the status text
    errorMessage = response.statusText || errorMessage;
  }
  
  return new APIError(errorMessage, response.status, response.status.toString(), errorDetails);
}
