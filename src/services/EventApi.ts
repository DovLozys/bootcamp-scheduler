const url: string = 'http://localhost:5500/api/v1/events/';

async function deleteEvent(id: string): Promise<void> {
    await fetch(url + id, {
        method: 'DELETE',
    });
}

async function updateEventDescription(id: string, description: string): Promise<void> {
    await fetch(url + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({event_description: description}),
    });
}

export { updateEventDescription, deleteEvent };
