import React, {useEffect, useState} from 'react';
import './DisplayAllEvents.css';
import Navbar from '../Navbar';
import {DeleteEventButton} from '../DeleteEventButton';
import {FormEditDescription} from '../FormEditDescription';

function DisplayAllEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getAllEvents();
    }, []);

    async function getAllEvents() {
        const res = await fetch('http://localhost:5500/api/v1/events/');
        const response = await res.json();

        setEvents(response.payload.rows);
    }

    return (
        <div className='all-events-body'>
            <Navbar />
            <h1>All Events</h1>
            <div className='flex-container'>
                {events.map((event) => {
                    return (
                        <div className='card' key={event.id}>
                            <h2>{event.event_name}</h2>
                            <p className='time-text'>{event.event_date}, {event.event_start} ({event.event_duration})</p>
                            <p className='category-text'>{event.event_category}</p>
                            <p>{event.event_description}</p>
                            <span className='span-span'>
                                <DeleteEventButton event_id={event.id} />
                                <FormEditDescription event_id={event.id} event_description={event.event_description}/>
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export {DisplayAllEvents};