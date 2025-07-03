import { useEffect, useState } from 'react';

import DeleteEventButton from '../DeleteEventButton';
import FormEditDescription from '../FormEditDescription';
import Navbar from '../Navbar';

import './DisplayAllEvents.css';

export default function DisplayAllEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents();
  }, []);

  // TODO: move function declaration into useEffect?
  async function getAllEvents() {
    const res = await fetch('http://localhost:5500/api/v1/events/');
    const response = await res.json();

    setEvents(response.payload);
  }

  return (
    <div className="all-events-body">
      <Navbar />
      <h1 className="page-title">All Events</h1>
      <div className="flex-container">
        {events.map((event) => {
          return (
            <div className="card event-card" key={event.id}>
              <h2 className="event-title">{event.event_name}</h2>
              <p className="time-text event-time">
                {event.event_date}, {event.event_start}{' '}
                <span className="event-duration">({event.event_duration})</span>
              </p>
              <p className="category-text event-category">{event.event_category}</p>
              <p className="event-description">{event.event_description}</p>
              <span className="span-span event-actions">
                <DeleteEventButton event_id={event.id} />
                <FormEditDescription
                  event_id={event.id}
                  event_description={event.event_description}
                />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
