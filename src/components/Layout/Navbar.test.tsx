import { render, screen } from '../../utils/testUtils';
import Navbar from './Navbar';

test('renders Navbar with links', () => {
  render(<Navbar />);
  expect(screen.getByAltText('menu-icon')).toBeInTheDocument();
  expect(screen.getByAltText('final-logo')).toBeInTheDocument();
  expect(screen.getByAltText('user-profile')).toBeInTheDocument();
});
