import { useState } from 'react';

import { deleteEvent } from '../../services/EventApi.js';

import './DeleteEventButton.css';

export default function DeleteEventButton(props) {
  const [id] = useState(props.event_id);

  function handleClick() {
    deleteEvent(id);
  }

  return (
    <button onClick={handleClick} className="delete-data-button">
      Delete event
    </button>
  );
}
