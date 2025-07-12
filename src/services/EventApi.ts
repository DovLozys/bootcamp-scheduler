import { apiEndpoints } from '../config/env';

async function deleteEvent(id: string): Promise<void> {
    await fetch(`${apiEndpoints.events}/${id}`, {
        method: 'DELETE',
    });
}

async function updateEventDescription(id: string, description: string): Promise<void> {
    await fetch(`${apiEndpoints.events}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event_description: description }),
    });
}

export { updateEventDescription, deleteEvent };
