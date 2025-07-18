import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './calendar.css';

const MyCalendar: React.FC = () => {
  const [value, onChange] = useState<Date>(new Date());

  return (
    <section className='calendar-section'>
      <div className='calendar-card'>
        <h2 className='calendar-title'>Event Calendar</h2>
        <Link to='host-event' className='calendar-link'>
          <Calendar
            className='calendar'
            onChange={value => onChange(value as Date)}
            value={value}
          />
        </Link>
        <p className='calendar-tip'>Click a date to host a new event!</p>
      </div>
    </section>
  );
};

export default MyCalendar;
