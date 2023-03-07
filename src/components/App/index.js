import { Routes, Route } from 'react-router-dom';

import DisplayAllEvents from '../DisplayAllEvents';
import HomePage from '../HomePage';
import HostEventPage from '../HostEventPage';
import ProfilePage from '../ProfilePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/host-event" element={<HostEventPage />} />
      <Route path="/all-events" element={<DisplayAllEvents />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}
