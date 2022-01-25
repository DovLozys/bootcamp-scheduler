const url = '';

function updateDescription(id, description) {
    fetch("http://localhost:5500/api/v1/events/" + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({event_description: description}),
    });
}

export default updateDescription;
