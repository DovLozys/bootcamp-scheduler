import React, {useState} from 'react';
import './DeleteEventButton.css';
import {deleteEvent} from '../../services/EventApi.js';

function DeleteEventButton(props) {
    const [id] = useState(props.event_id);

    function handleClick() {
        deleteEvent(id);
    }

    return <button onClick={handleClick} className='delete-data-button'>Delete event</button>;
}

export {DeleteEventButton};
