// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// import { setupTestMocks, cleanupTestMocks } from './utils/testUtils';

// Setup global mocks
// setupTestMocks();

// Mock environment variables for tests
vi.mock('./config/env', () => ({
  env: {
    API_BASE_URL: 'http://localhost:5500/api/v1',
    API_TIMEOUT: 10000,
    APP_NAME: 'Bootcamp Scheduler',
    APP_VERSION: '0.1.0',
    ENABLE_DEBUG: true,
    ENABLE_ANALYTICS: false,
    NODE_ENV: 'test',
    IS_DEVELOPMENT: false,
    IS_PRODUCTION: false,
    IS_TEST: true,
  },
  apiEndpoints: {
    events: 'http://localhost:5500/api/v1/events',
    hostEvent: 'http://localhost:5500/api/v1/events/host-event',
    upcomingEvents: (count: string) =>
      `http://localhost:5500/api/v1/events/upcomingevents/${count}`,
    users: 'http://localhost:5500/api/v1/users',
    profile: 'http://localhost:5500/api/v1/profile',
    login: 'http://localhost:5500/api/v1/auth/login',
    register: 'http://localhost:5500/api/v1/auth/register',
    logout: 'http://localhost:5500/api/v1/auth/logout',
  },
}));

// Mock react-router-dom for tests that don't need full routing
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
  };
});

// Mock console methods to reduce noise in tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  console.error = vi.fn();
  console.warn = vi.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

// Cleanup after each test
// afterEach(() => {
//   cleanupTestMocks();
// });

// Global test timeout
vi.setConfig({ testTimeout: 10000 });
