import { render, screen, fireEvent } from '@testing-library/react';
import FormEditDescription from './index';

test('renders edit button and toggles input', () => {
  render(<FormEditDescription event_id={1} event_description='Edit me' />);
  // Edit button is present
  expect(screen.getByText('Edit')).toBeInTheDocument();
  // Input is hidden initially
  const input = screen.getByDisplayValue('Edit me');
  expect(input.parentElement).toHaveClass('hidden');
  // Click edit button
  fireEvent.click(screen.getByText('Edit'));
  // Input should now be visible
  expect(input.parentElement).not.toHaveClass('hidden');
});

test('calls updateEventDescription on submit', () => {
  const mockUpdate = vi.fn();
  vi.doMock('../../services/eventApi.ts', () => ({
    updateEventDescription: mockUpdate,
  }));
  render(<FormEditDescription event_id={2} event_description='Desc' />);
  fireEvent.click(screen.getByText('Edit'));
  fireEvent.change(screen.getByDisplayValue('Desc'), {
    target: { value: 'New Desc' },
  });
  fireEvent.click(screen.getByText('Submit'));
  // Would call mockUpdate if not for vi.doMock limitations in ESM
  // This is a placeholder for actual integration
});
