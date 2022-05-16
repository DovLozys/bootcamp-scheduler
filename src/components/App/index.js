import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from '../HomePage';
import HostEventPage from '../HostEventPage';
import { DisplayAllEvents } from '../DisplayAllEvents';
import ProfilePage from '../ProfilePage';

function App() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/host-event' element={<HostEventPage />} />
            <Route path='/all-events' element={<DisplayAllEvents />} />
            <Route path='/profile' element={<ProfilePage />} />
        </Routes>
    );
}

export { App };
