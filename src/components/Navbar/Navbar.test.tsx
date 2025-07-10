import { render, screen } from '@testing-library/react';
import Navbar from './index';
import { MemoryRouter } from 'react-router-dom';

test('renders Navbar with links', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  expect(screen.getByAltText('menu-icon')).toBeInTheDocument();
  expect(screen.getByAltText('final-logo')).toBeInTheDocument();
  expect(screen.getByAltText('user-profile')).toBeInTheDocument();
});
