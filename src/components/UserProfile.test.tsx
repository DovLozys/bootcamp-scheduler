import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';

beforeEach(() => {
  (global.fetch as any) = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            profile_name: 'loyal_bob',
            event_name: 'Profile Event',
            event_start: '09:00',
            event_date: '2025-07-06',
          },
        ]),
    })
  );
});

test('renders user profile with name', async () => {
  render(<UserProfile name='loyal_bob' />);

  // The component should render the user name
  await waitFor(() => {
    expect(screen.getByText(/loyal_bob/)).toBeInTheDocument();
  });

  // Should show the profile structure
  expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  expect(screen.getByText(/Upcoming Events/)).toBeInTheDocument();
});
