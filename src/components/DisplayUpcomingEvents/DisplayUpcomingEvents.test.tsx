import { render, screen, waitFor } from '@testing-library/react';
import DisplayUpcomingEvents from './index';

beforeEach(() => {
  (global.fetch as any) = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        payload: {
          rows: [
            {
              id: 1,
              event_name: 'Upcoming Event',
              event_date: '2025-07-05',
              event_start: '12:00',
              event_duration: '01:30',
              event_category: 'Talk',
              event_description: 'An upcoming event.'
            }
          ]
        }
      })
    })
  );
});

test('renders upcoming event from API', async () => {
  render(<DisplayUpcomingEvents count="1" />);
  await waitFor(() => {
    expect(screen.getByText('Upcoming Event')).toBeInTheDocument();
    expect(screen.getByText('An upcoming event.')).toBeInTheDocument();
    expect(screen.getByText('Talk')).toBeInTheDocument();
    expect(screen.getByText('2025-07-05, 12:00 (01:30)')).toBeInTheDocument();
  });
});
