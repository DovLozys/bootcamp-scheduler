const url = '';

async function deleteEvent(id) {
    await fetch('http://localhost:5500/api/v1/events/' + id, {
        method: 'DELETE',
    });
}

async function updateEventDescription(id, description) {
    await fetch('http://localhost:5500/api/v1/events/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({event_description: description}),
    });
}

export {updateEventDescription, deleteEvent};
