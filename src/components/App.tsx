import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DisplayAllEvents from './Events/DisplayAllEvents';
import MainContent from './Layout/MainContent';
import Navbar from './Layout/Navbar';
import HostEventForm from './Events/HostEventForm';
import UserProfile from './Profile/UserProfile';

import styles from './Events/HostEventPage.module.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <Navbar />
            <MainContent />
          </>
        }
      />
      <Route
        path='/host-event'
        element={
          <div className={styles.pageBody}>
            <Navbar />
            <div className={styles.hostEventHeader}>
              <h1>Host an Event</h1>
              <p className={styles.hostEventSubtitle}>
                Fill out the form below to create a new event for your bootcamp
                community.
              </p>
            </div>
            <HostEventForm />
          </div>
        }
      />
      <Route path='/all-events' element={<DisplayAllEvents />} />
      <Route
        path='/profile'
        element={
          <section className='profile-page-section'>
            <UserProfile name='loyal_bob' />
          </section>
        }
      />
    </Routes>
  );
};

export default App;
