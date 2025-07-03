import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DisplayAllEvents from './index';

// Mock fetch for API calls
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ payload: [
        {
          id: 1,
          event_name: 'Test Event',
          event_date: '2025-07-03',
          event_start: '10:00',
          event_duration: '01:00',
          event_category: 'Test',
          event_description: 'A test event.'
        },
        {
          id: 2,
          event_name: 'Second Event',
          event_date: '2025-07-04',
          event_start: '11:00',
          event_duration: '02:00',
          event_category: 'Workshop',
          event_description: 'Another event.'
        }
      ] })
    })
  );
});
afterEach(() => {
  jest.resetAllMocks();
});

test('renders event cards from API', async () => {
  render(
    <MemoryRouter>
      <DisplayAllEvents />
    </MemoryRouter>
  );
  await waitFor(() => {
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('A test event.')).toBeInTheDocument();
  });
});

test('renders multiple events', async () => {
  render(
    <MemoryRouter>
      <DisplayAllEvents />
    </MemoryRouter>
  );
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
  await waitFor(() => {
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('2025-07-03, 10:00 (01:00)')).toBeInTheDocument();
  });
});

// Example interaction test for DeleteEventButton (mocking deleteEvent)
jest.mock('../DeleteEventButton', () => (props) => (
  <button onClick={props.onDelete || (() => {})} data-testid={`delete-btn-${props.event_id}`}>Delete event</button>
));

test('delete button is rendered for each event', async () => {
  render(
    <MemoryRouter>
      <DisplayAllEvents />
    </MemoryRouter>
  );
  await waitFor(() => {
    expect(screen.getByTestId('delete-btn-1')).toBeInTheDocument();
    expect(screen.getByTestId('delete-btn-2')).toBeInTheDocument();
  });
});
