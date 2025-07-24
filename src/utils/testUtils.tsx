import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock user for testing
export const mockUser = {
  id: 'test-user-id',
  name: 'Test User',
  email: 'test@example.com',
  role: 'user' as const,
};

// Mock events for testing
export const mockEvents = [
  {
    id: 'event-1',
    event_name: 'React Workshop',
    event_description: 'Learn React fundamentals',
    event_date: '2024-03-15',
    event_start: '14:00',
    event_duration: '02:00',
    event_category: 'Class Schedule',
    event_location: 'Room 101',
    event_capacity: 30,
    host_id: 'test-user-id',
  },
];

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  user?: typeof mockUser | null;
}

const AllTheProviders: React.FC<{
  children: React.ReactNode;
  user?: typeof mockUser | null;
}> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const { user, ...renderOptions } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders user={user}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
};

// Mock API responses
export const mockApiResponses = {
  events: {
    success: true,
    payload: mockEvents,
  },
  upcomingEvents: {
    success: true,
    payload: {
      rows: mockEvents.slice(0, 3),
    },
  },
};

// Setup function for common mocks
export const setupTestMocks = () => {
  // Mock fetch for testing
  global.fetch = (() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockApiResponses.events),
      headers: new Headers(),
    })) as unknown as typeof fetch;
};

// Cleanup function
export const cleanupTestMocks = () => {
  // Reset test state
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { customRender as render };
export { default as userEvent } from '@testing-library/user-event';
