import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DisplayAllEvents from './DisplayAllEvents';

// Mock the API client
vi.mock('../../utils/apiClient', () => ({
  api: {
    get: vi.fn(),
  },
  withRetry: vi.fn(fn => fn()),
}));

// Mock the toast hook
vi.mock('../../hooks/useToast', () => ({
  useToast: () => ({
    showError: vi.fn(),
    showSuccess: vi.fn(),
  }),
}));

import { api } from '../utils/apiClient';

const mockApiGet = api.get as any;

beforeEach(() => {
  vi.clearAllMocks();

  // Default successful response
  mockApiGet.mockResolvedValue({
    payload: [
      {
        id: 1,
        event_name: 'Test Event',
        event_date: '2025-07-03',
        event_start: '10:00',
        event_duration: '01:00',
        event_category: 'Test',
        event_description: 'A test event.',
      },
      {
        id: 2,
        event_name: 'Second Event',
        event_date: '2025-07-04',
        event_start: '11:00',
        event_duration: '02:00',
        event_category: 'Workshop',
        event_description: 'Another event.',
      },
    ],
  });
});

test('renders event cards from API', async () => {
  render(
    <MemoryRouter>
      <DisplayAllEvents />
    </MemoryRouter>
  );

  // Initially shows loading state
  expect(screen.getByText('Loading events...')).toBeInTheDocument();

  // Wait for events to load
  await waitFor(() => {
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('A test event.')).toBeInTheDocument();
  });

  // Loading state should be gone
  expect(screen.queryByText('Loading events...')).not.toBeInTheDocument();
});

test('renders multiple events', async () => {
  render(
    <MemoryRouter>
      <DisplayAllEvents />
    </MemoryRouter>
  );

  // Wait for events to load
  await waitFor(() => {
    expect(screen.getByText('Second Event')).toBeInTheDocument();
    expect(screen.getByText('Another event.')).toBeInTheDocument();
  });
});

test('renders event category and time', async () => {
  render(
    <MemoryRouter>
      <DisplayAllEvents />
    </MemoryRouter>
  );

  // Wait for events to load
  await waitFor(() => {
    // Look for the category badge specifically, not the dropdown option
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    // Use regex to match text that might be split across elements
    expect(screen.getByText(/10:00 AM/)).toBeInTheDocument();
    expect(screen.getByText(/\(01:00\)/)).toBeInTheDocument();
  });
});

test('shows error state when API fails', async () => {
  // Mock API to reject
  mockApiGet.mockRejectedValue(new Error('Network error'));

  render(
    <MemoryRouter>
      <DisplayAllEvents />
    </MemoryRouter>
  );

  // Initially shows loading state
  expect(screen.getByText('Loading events...')).toBeInTheDocument();

  // Wait for error state
  await waitFor(() => {
    expect(screen.getByText('Unable to Load Events')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  // Loading state should be gone
  expect(screen.queryByText('Loading events...')).not.toBeInTheDocument();
});
