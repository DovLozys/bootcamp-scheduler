/**
 * Environment configuration
 * Centralizes all environment variables and provides type safety
 */

interface EnvironmentConfig {
  // API Configuration
  API_BASE_URL: string;
  API_TIMEOUT: number;

  // App Configuration
  APP_NAME: string;
  APP_VERSION: string;

  // Feature Flags
  ENABLE_DEBUG: boolean;
  ENABLE_ANALYTICS: boolean;

  // Environment Info
  NODE_ENV: string;
  IS_DEVELOPMENT: boolean;
  IS_PRODUCTION: boolean;
  IS_TEST: boolean;
}

/**
 * Get environment variable with fallback
 */
function getEnvVar(key: string, fallback: string = ''): string {
  return import.meta.env[key] || fallback;
}

/**
 * Get boolean environment variable
 */
function getBooleanEnvVar(key: string, fallback: boolean = false): boolean {
  const value = getEnvVar(key);
  if (value === '') return fallback;
  return value.toLowerCase() === 'true';
}

/**
 * Get number environment variable
 */
function getNumberEnvVar(key: string, fallback: number = 0): number {
  const value = getEnvVar(key);
  if (value === '') return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Environment configuration object
 */
export const env: EnvironmentConfig = {
  // API Configuration
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:5500/api/v1'),
  API_TIMEOUT: getNumberEnvVar('VITE_API_TIMEOUT', 10000),

  // App Configuration
  APP_NAME: getEnvVar('VITE_APP_NAME', 'Bootcamp Scheduler'),
  APP_VERSION: getEnvVar('VITE_APP_VERSION', '0.1.0'),

  // Feature Flags
  ENABLE_DEBUG: getBooleanEnvVar('VITE_ENABLE_DEBUG', true),
  ENABLE_ANALYTICS: getBooleanEnvVar('VITE_ENABLE_ANALYTICS', false),

  // Environment Info
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
  IS_DEVELOPMENT: getEnvVar('NODE_ENV', 'development') === 'development',
  IS_PRODUCTION: getEnvVar('NODE_ENV', 'development') === 'production',
  IS_TEST: getEnvVar('NODE_ENV', 'development') === 'test',
};

/**
 * API endpoints configuration
 */
export const apiEndpoints = {
  // Events
  events: `${env.API_BASE_URL}/events`,
  hostEvent: `${env.API_BASE_URL}/events/host-event`,
  upcomingEvents: (count: string) =>
    `${env.API_BASE_URL}/events/upcomingevents/${count}`,

  // Users (for future use)
  users: `${env.API_BASE_URL}/users`,
  profile: `${env.API_BASE_URL}/profile`,

  // Auth (for future use)
  login: `${env.API_BASE_URL}/auth/login`,
  register: `${env.API_BASE_URL}/auth/register`,
  logout: `${env.API_BASE_URL}/auth/logout`,
};

/**
 * Validate required environment variables
 */
export function validateEnvironment(): void {
  const requiredVars = ['VITE_API_BASE_URL'];

  const missing = requiredVars.filter(varName => !getEnvVar(varName));

  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    if (env.IS_PRODUCTION) {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}`
      );
    }
  }
}

// Validate environment on module load
validateEnvironment();

export default env;
