import { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './calendar.css';

export default function MyCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <section className="calendar-section">
      <div className="calendar-card">
        <h2 className="calendar-title">Event Calendar</h2>
        <Link to="host-event" className="calendar-link">
          <Calendar className="calendar" onChange={onChange} value={value} />
        </Link>
        <p className="calendar-tip">Click a date to host a new event!</p>
      </div>
    </section>
  );
}
