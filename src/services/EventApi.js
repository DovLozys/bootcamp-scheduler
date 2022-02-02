const url = 'http://localhost:5500/api/v1/events/';

async function deleteEvent(id) {
    await fetch(url + id, {
        method: 'DELETE',
    });
}

async function updateEventDescription(id, description) {
    await fetch(url + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({event_description: description}),
    });
}

export {updateEventDescription, deleteEvent};
