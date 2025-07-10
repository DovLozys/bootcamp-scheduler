import React, { useState, useEffect } from 'react';
import { Event } from '../../types';

import './displayUpcomingEvents.css';

interface DisplayUpcomingEventsProps {
  count: string;
}

const DisplayUpcomingEvents: React.FC<DisplayUpcomingEventsProps> = ({ count }) => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    getUpcomingEvents(count);
  }, [count]);

  async function getUpcomingEvents(count: string): Promise<void> {
    let res = await fetch(
      'http://localhost:5500/api/v1/events/upcomingevents/' + count
    );
    let response = await res.json();
    setUpcomingEvents(response.payload.rows);
  }

  return (
    <div className="upcoming-flex-container">
      {upcomingEvents.map((event) => {
        return (
          <div className="upcoming-card" key={event.id}>
            <h2 className="upcoming-title">{event.event_name}</h2>
            <p className="upcoming-time">
              {event.event_date}, {event.event_start}{' '}
              <span className="upcoming-duration">({event.event_duration})</span>
            </p>
            <p className="upcoming-category">{event.event_category}</p>
            <p className="upcoming-description">{event.event_description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayUpcomingEvents;
