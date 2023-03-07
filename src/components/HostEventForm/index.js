import './hostEventForm.css';

export default function HostEventForm() {
  function diff(eventStartTime, eventEndTime) {
    eventStartTime = eventStartTime.split(':');
    eventEndTime = eventEndTime.split(':');
    var eventStartTimeDate = new Date(
      0,
      0,
      0,
      eventStartTime[0],
      eventStartTime[1],
      0
    );
    var endDate = new Date(0, 0, 0, eventEndTime[0], eventEndTime[1], 0);
    var diff = endDate.getTime() - eventStartTimeDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    if (hours < 0) hours = hours + 24;
    return (
      (hours <= 9 ? '0' : '') +
      hours +
      ':' +
      (minutes <= 9 ? '0' : '') +
      minutes
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newEvent = {
      event_name: e.target[0].value,
      event_description: e.target[2].value,
      event_date: e.target[1].value,
      event_start: e.target[3].value,
      event_duration: diff(e.target[3].value, e.target[4].value),
      event_category: e.target[5].value,
    };

    fetch('http://localhost:5500/api/v1/events/host-event', {
      method: 'POST',
      body: JSON.stringify(newEvent),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return (
    <section className="form-container">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <span id="span-span">
          <input id="event-title" type="text" placeholder="event title..." />
          <input id="event-date" type="date" />
        </span>

        <br />
        <input
          id="event-desc"
          type="text"
          placeholder="event description... "
        />
        <br />
        <label class="select" for="slct">
          <select
            id="slct"
            required="required"
            name="start-time"
            type="list"
            label="start-time"
            description="start-time"
            className="input-medium validate-time"
          >
            <option value="07:00:00">07:00 Start</option>
            <option value="07:30:00">07:30 Start</option>
            <option value="08:00:00">08:00 Start</option>
            <option value="08:30:00">08:30 Start</option>
            <option value="09:00:00">09:00 Start</option>
            <option value="09:30:00">09:30 Start</option>
            <option value="10:00:00">10:00 Start</option>
            <option value="10:30:00">10:30 Start</option>
            <option value="11:00:00">11:00 Start</option>
            <option value="11:30:00">11:30 Start</option>
            <option value="12:00:00">12:00 Start</option>
            <option value="12:30:00">12:30 Start</option>
            <option value="13:00:00">13:00 Start</option>
            <option value="13:30:00">13:30 Start</option>
            <option value="14:00:00">14:00 Start</option>
            <option value="14:30:00">14:30 Start</option>
            <option value="15:00:00">15:00 Start</option>
            <option value="15:30:00">15:30 Start</option>
            <option value="16:00:00">16:00 Start</option>
            <option value="16:30:00">16:30 Start</option>
            <option value="17:00:00">17:00 Start</option>
          </select>
        </label>

        <svg class="sprites">
          <symbol id="select-arrow-down" viewbox="0 0 10 6">
            <polyline points="1 1 5 5 9 1"></polyline>
          </symbol>
        </svg>
        <label class="select" for="slct">
          <select
            id="slct"
            required="required"
            name="end-time"
            type="list"
            label="end-time"
            description="end-time"
            className="input-medium validate-time"
          >
            <option value="07:00:00">07:00 End</option>
            <option value="07:30:00">07:30 End</option>
            <option value="08:00:00">08:00 End</option>
            <option value="08:30:00">08:30 End</option>
            <option value="09:00:00">09:00 End</option>
            <option value="09:30:00">09:30 End</option>
            <option value="10:00:00">10:00 End</option>
            <option value="10:30:00">10:30 End</option>
            <option value="11:00:00">11:00 End</option>
            <option value="11:30:00">11:30 End</option>
            <option value="12:00:00">12:00 End</option>
            <option value="12:30:00">12:30 End</option>
            <option value="13:00:00">13:00 End</option>
            <option value="13:30:00">13:30 End</option>
            <option value="14:00:00">14:00 End</option>
            <option value="14:30:00">14:30 End</option>
            <option value="15:00:00">15:00 End</option>
            <option value="15:30:00">15:30 End</option>
            <option value="16:00:00">16:00 End</option>
            <option value="16:30:00">16:30 End</option>
            <option value="17:00:00">17:00 End</option>
          </select>
        </label>

        <svg class="sprites">
          <symbol id="select-arrow-down" viewbox="0 0 10 6">
            <polyline points="1 1 5 5 9 1"></polyline>
          </symbol>
        </svg>
        <br />
        <select id="event-category">
          <option value="Class Schedule">Class Schedule</option>
          <option value="Guest Speaker">Guest Speaker</option>
          <option value="Feedback">Feedback</option>
          <option value="Project">Project</option>
        </select>
        <br />
        <button type="submit" className="data-button">
          Create Event
        </button>
      </form>
    </section>
  );
}
