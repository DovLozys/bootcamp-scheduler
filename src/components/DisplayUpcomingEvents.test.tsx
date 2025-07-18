import { render, screen, waitFor } from '@testing-library/react';
import DisplayUpcomingEvents from './DisplayUpcomingEvents';

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
  }),
}));

import { api } from '../utils/apiClient';

const mockApiGet = api.get as any;

beforeEach(() => {
  vi.clearAllMocks();

  // Default successful response
  mockApiGet.mockResolvedValue({
    payload: {
      rows: [
        {
          id: 1,
          event_name: 'Upcoming Event',
          event_date: '2025-07-05',
          event_start: '12:00',
          event_duration: '01:30',
          event_category: 'Talk',
          event_description: 'An upcoming event.',
        },
      ],
    },
  });
});

test('renders upcoming event from API', async () => {
  render(<DisplayUpcomingEvents count='1' />);

  // Initially shows loading state
  expect(screen.getByText('Loading upcoming events...')).toBeInTheDocument();

  // Wait for events to load
  await waitFor(() => {
    expect(screen.getByText('Upcoming Event')).toBeInTheDocument();
    expect(screen.getByText('An upcoming event.')).toBeInTheDocument();
    expect(screen.getByText('Talk')).toBeInTheDocument();
    // Use regex to match text that might be split across elements
    expect(screen.getByText(/2025-07-05/)).toBeInTheDocument();
    expect(screen.getByText(/12:00/)).toBeInTheDocument();
    expect(screen.getByText(/\(01:30\)/)).toBeInTheDocument();
  });

  // Loading state should be gone
  expect(
    screen.queryByText('Loading upcoming events...')
  ).not.toBeInTheDocument();
});
