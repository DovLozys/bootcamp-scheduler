// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock fetch globally for all tests
global.fetch = vi.fn() as any;

// Reset all mocks before each test
beforeEach(() => {
  vi.resetAllMocks();
});
