import { render, screen } from '@testing-library/react';
import DateAndTime from './index';

test('renders date and time in professional format', () => {
  render(<DateAndTime />);
  const el = screen.getByText((content) => {
    // Accept both "3 July 2025" and "July 3, 2025" formats
    return (
      typeof content === 'string' &&
      /\|/.test(content) &&
      /(\d{1,2} \w+ \d{4}|\w+ \d{1,2}, \d{4})/.test(content)
    );
  });
  expect(el).toBeInTheDocument();
  expect(el).toHaveClass('date-time-text');
});
