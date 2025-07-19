import React from 'react';
import { Link } from 'react-router-dom';
import DateAndTime from '../UI/DateAndTime';
import DisplayUpcomingEvents from '../Events/DisplayUpcomingEvents';
import MyCalendar from '../UI/MyCalendar';

import styles from './MainContent.module.css';

const MainContent: React.FC = () => {
  return (
    <section className={styles.mainDisplay}>
      <h2>Clan Optimist's upcoming...</h2>
      <div id='upcoming-event'>
        <Link to='all-events'>
          <DisplayUpcomingEvents count='1' />
        </Link>
      </div>

      <DateAndTime />
      <section className={styles.calendarPlacement}>
        <MyCalendar />
      </section>
      {/* <p>
        Bootcamp is no walk in the park. So let’s make it a little easier for
        you. Want to create an event to get together with your fellow
        bootcampers? Forgot when code club is? Let's help you!
      </p> */}
      <p>
        Optimist's Flexible, Social and Professional event manager. Never worry
        about missing a deadline.
      </p>
    </section>
  );
};

export default MainContent;
