import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DisplayAllEvents from './Events/DisplayAllEvents';
import MainContent from './Layout/MainContent';
import Navbar from './Layout/Navbar';
import HostEventForm from './Events/HostEventForm';
import UserProfile from './Profile/UserProfile';
import LoginForm from './Auth/LoginForm';
import RegisterForm from './Auth/RegisterForm';
import ProtectedRoute from './Auth/ProtectedRoute';

import styles from './Events/HostEventPage.module.css';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path='/login' element={<LoginForm />} />
      <Route path='/register' element={<RegisterForm />} />

      {/* Public home page */}
      <Route
        path='/'
        element={
          <>
            <Navbar />
            <MainContent />
          </>
        }
      />

      {/* Public events viewing */}
      <Route path='/all-events' element={<DisplayAllEvents />} />
      <Route path='/events' element={<DisplayAllEvents />} />

      {/* Protected routes - require authentication */}
      <Route
        path='/host-event'
        element={
          <ProtectedRoute>
            <div className={styles.pageBody}>
              <Navbar />
              <div className={styles.hostEventHeader}>
                <h1>Host an Event</h1>
                <p className={styles.hostEventSubtitle}>
                  Fill out the form below to create a new event for your
                  bootcamp community.
                </p>
              </div>
              <HostEventForm />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <section className='profile-page-section'>
              <UserProfile name='loyal_bob' />
            </section>
          </ProtectedRoute>
        }
      />

      <Route
        path='/my-events'
        element={
          <ProtectedRoute>
            <div>
              <Navbar />
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>My Events</h1>
                <p>Your hosted and attended events will appear here.</p>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route
        path='*'
        element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
