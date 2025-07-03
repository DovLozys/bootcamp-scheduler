import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './index';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        {
          profile_name: 'loyal_bob',
          event_name: 'Profile Event',
          event_start: '09:00',
          event_date: '2025-07-06'
        }
      ])
    })
  );
});
afterEach(() => {
  jest.resetAllMocks();
});

test('renders user profile events', async () => {
  render(<UserProfile name="loyal_bob" />);
  await waitFor(() => {
    expect(screen.getByText(/loyal_bob/)).toBeInTheDocument();
    expect(screen.getByText(/Profile Event/)).toBeInTheDocument();
    expect(screen.getByText(/09:00/)).toBeInTheDocument();
    expect(screen.getByText(/2025-07-06/)).toBeInTheDocument();
  });
});
