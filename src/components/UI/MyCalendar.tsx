import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import styles from './MyCalendar.module.css';

const MyCalendar: React.FC = () => {
  const [value, onChange] = useState<Date>(new Date());

  return (
    <section className={styles.calendarSection}>
      <div className={styles.calendarCard}>
        <h2 className={styles.calendarTitle}>Event Calendar</h2>
        <Link to='host-event' className={styles.calendarLink}>
          <Calendar
            className={styles.calendar}
            onChange={value => onChange(value as Date)}
            value={value}
          />
        </Link>
        <p className={styles.calendarTip}>Click a date to host a new event!</p>
      </div>
    </section>
  );
};

export default MyCalendar;
