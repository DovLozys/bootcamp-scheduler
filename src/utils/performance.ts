import { env } from '../config/env';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  url: string;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetric[] = [];

  private constructor() {
    this.setupPerformanceObserver();
    this.trackWebVitals();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private setupPerformanceObserver(): void {
    if ('PerformanceObserver' in window) {
      // Track navigation timing
      const navObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.recordMetric(
              'page_load_time',
              navEntry.loadEventEnd - navEntry.fetchStart
            );
            this.recordMetric(
              'dom_content_loaded',
              navEntry.domContentLoadedEventEnd - navEntry.fetchStart
            );
            this.recordMetric(
              'first_byte',
              navEntry.responseStart - navEntry.fetchStart
            );
          }
        }
      });

      try {
        navObserver.observe({ entryTypes: ['navigation'] });
      } catch {
        console.warn('Navigation timing not supported');
      }

      // Track resource timing
      const resourceObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            if (
              resourceEntry.name.includes('.js') ||
              resourceEntry.name.includes('.css')
            ) {
              this.recordMetric(
                `resource_load_${this.getResourceType(resourceEntry.name)}`,
                resourceEntry.responseEnd - resourceEntry.fetchStart
              );
            }
          }
        }
      });

      try {
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch {
        console.warn('Resource timing not supported');
      }
    }
  }

  private trackWebVitals(): void {
    // Track Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('largest_contentful_paint', lastEntry.startTime);
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch {
        console.warn('LCP not supported');
      }

      // Track First Input Delay (FID)
      const fidObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          this.recordMetric(
            'first_input_delay',
            entry.processingStart - entry.startTime
          );
        }
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch {
        console.warn('FID not supported');
      }

      // Track Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.recordMetric('cumulative_layout_shift', clsValue);
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch {
        console.warn('CLS not supported');
      }
    }
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'javascript';
    if (url.includes('.css')) return 'stylesheet';
    if (url.includes('.png') || url.includes('.jpg') || url.includes('.svg'))
      return 'image';
    return 'other';
  }

  private recordMetric(name: string, value: number): void {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      url: window.location.href,
    };

    this.metrics.push(metric);

    if (env.IS_DEVELOPMENT) {
      console.log(`Performance metric: ${name} = ${value.toFixed(2)}ms`);
    }

    // Send to analytics service
    this.sendMetric(metric);
  }

  private async sendMetric(metric: PerformanceMetric): Promise<void> {
    try {
      if (env.IS_DEVELOPMENT) {
        return; // Don't send in development
      }

      // In a real application, send to your analytics service
      await fetch('/api/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      });
    } catch (error) {
      console.warn('Failed to send performance metric:', error);
    }
  }

  // Public method to track custom metrics
  trackCustomMetric(name: string, value: number): void {
    this.recordMetric(name, value);
  }

  // Method to track API call performance
  trackApiCall(endpoint: string, duration: number, success: boolean): void {
    this.recordMetric(
      `api_${success ? 'success' : 'error'}_${endpoint.replace(/[^a-zA-Z0-9]/g, '_')}`,
      duration
    );
  }

  // Get current metrics (for debugging)
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

// Helper function to measure function execution time
export const measurePerformance = async <T>(
  name: string,
  fn: () => Promise<T> | T
): Promise<T> => {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - start;
    performanceMonitor.trackCustomMetric(name, duration);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    performanceMonitor.trackCustomMetric(`${name}_error`, duration);
    throw error;
  }
};
