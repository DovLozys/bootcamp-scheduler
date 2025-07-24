import { env } from '../config/env';

interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  timestamp: string;
  userAgent: string;
  userId?: string;
}

class ErrorReporter {
  private static instance: ErrorReporter;
  private errorQueue: ErrorReport[] = [];
  private isOnline = navigator.onLine;

  private constructor() {
    this.setupGlobalErrorHandlers();
    this.setupNetworkListeners();
  }

  static getInstance(): ErrorReporter {
    if (!ErrorReporter.instance) {
      ErrorReporter.instance = new ErrorReporter();
    }
    return ErrorReporter.instance;
  }

  private setupGlobalErrorHandlers(): void {
    // Handle JavaScript errors
    window.addEventListener('error', event => {
      this.reportError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename || window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', event => {
      this.reportError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      });
    });
  }

  private setupNetworkListeners(): void {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushErrorQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  reportError(error: Partial<ErrorReport>): void {
    const errorReport: ErrorReport = {
      message: error.message || 'Unknown error',
      stack: error.stack,
      url: error.url || window.location.href,
      timestamp: error.timestamp || new Date().toISOString(),
      userAgent: error.userAgent || navigator.userAgent,
      userId: error.userId,
    };

    if (env.IS_DEVELOPMENT) {
      console.error('Error reported:', errorReport);
    }

    if (this.isOnline) {
      this.sendErrorReport(errorReport);
    } else {
      this.errorQueue.push(errorReport);
    }
  }

  private async sendErrorReport(error: ErrorReport): Promise<void> {
    try {
      // In a real application, send this to your error reporting service
      // For example: Sentry, LogRocket, Bugsnag, etc.

      if (env.IS_DEVELOPMENT) {
        console.log('Would send error report:', error);
        return;
      }

      // Example implementation for a custom error reporting endpoint
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(error),
      });
    } catch (reportingError) {
      // If error reporting fails, store in queue for retry
      this.errorQueue.push(error);
      console.warn('Failed to report error:', reportingError);
    }
  }

  private flushErrorQueue(): void {
    while (this.errorQueue.length > 0) {
      const error = this.errorQueue.shift();
      if (error) {
        this.sendErrorReport(error);
      }
    }
  }

  // Method to manually report errors from try-catch blocks
  captureException(error: Error, context?: Record<string, unknown>): void {
    this.reportError({
      message: error.message,
      stack: error.stack,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ...context,
    });
  }
}

export const errorReporter = ErrorReporter.getInstance();

// Helper function for easy error reporting
export const reportError = (
  error: Error,
  context?: Record<string, unknown>
): void => {
  errorReporter.captureException(error, context);
};
