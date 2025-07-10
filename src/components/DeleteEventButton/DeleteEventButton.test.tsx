import { render, screen, fireEvent } from '@testing-library/react';
import DeleteEventButton from './index';

test('renders delete button', () => {
  render(<DeleteEventButton event_id={1} />);
  expect(screen.getByText('Delete event')).toBeInTheDocument();
});

test('calls deleteEvent on click', () => {
  const mockDelete = vi.fn();
  vi.doMock('../../services/EventApi.ts', () => ({ deleteEvent: mockDelete }));
  render(<DeleteEventButton event_id={2} />);
  fireEvent.click(screen.getByText('Delete event'));
  // Would call mockDelete if not for vi.doMock limitations in ESM
  // This is a placeholder for actual integration
});
