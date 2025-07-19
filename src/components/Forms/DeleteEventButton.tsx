import React, { useState } from 'react';

import { deleteEvent } from '../../services/eventApi';

interface DeleteEventButtonProps {
  event_id: string;
}

const DeleteEventButton: React.FC<DeleteEventButtonProps> = ({ event_id }) => {
  const [id] = useState<string>(event_id);

  const handleClick = (): void => {
    deleteEvent(id);
  };

  return (
    <button onClick={handleClick} className='delete-data-button'>
      Delete event
    </button>
  );
};

export default DeleteEventButton;
