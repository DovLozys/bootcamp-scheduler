import { render, screen } from '@testing-library/react';
import DateAndTime from './index';

test('renders current time', () => {
  render(<DateAndTime />);
  // The time string will be dynamic, so just check for an h4 element
  expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
});
