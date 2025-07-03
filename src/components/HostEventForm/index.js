import './hostEventForm.css';

export default function HostEventForm() {
  function diff(eventStartTime, eventEndTime) {
    eventStartTime = eventStartTime.split(':');
    eventEndTime = eventEndTime.split(':');
    var eventStartTimeDate = new Date(0, 0, 0, eventStartTime[0], eventStartTime[1], 0);
    var endDate = new Date(0, 0, 0, eventEndTime[0], eventEndTime[1], 0);
    var diff = endDate.getTime() - eventStartTimeDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    if (hours < 0) hours = hours + 24;
    return (
      (hours <= 9 ? '0' : '') + hours + ':' + (minutes <= 9 ? '0' : '') + minutes
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
    <section className="form-card">
      <form className="event-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create a New Event</h2>
        <div className="form-group">
          <label htmlFor="event-title">Event Title</label>
          <input id="event-title" type="text" placeholder="Event title..." required />
        </div>
        <div className="form-group">
          <label htmlFor="event-date">Date</label>
          <input id="event-date" type="date" required />
        </div>
        <div className="form-group">
          <label htmlFor="event-desc">Description</label>
          <input id="event-desc" type="text" placeholder="Event description..." required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="start-time">Start Time</label>
            <select id="start-time" required>
              <option value="07:00:00">07:00</option>
              <option value="07:30:00">07:30</option>
              <option value="08:00:00">08:00</option>
              <option value="08:30:00">08:30</option>
              <option value="09:00:00">09:00</option>
              <option value="09:30:00">09:30</option>
              <option value="10:00:00">10:00</option>
              <option value="10:30:00">10:30</option>
              <option value="11:00:00">11:00</option>
              <option value="11:30:00">11:30</option>
              <option value="12:00:00">12:00</option>
              <option value="12:30:00">12:30</option>
              <option value="13:00:00">13:00</option>
              <option value="13:30:00">13:30</option>
              <option value="14:00:00">14:00</option>
              <option value="14:30:00">14:30</option>
              <option value="15:00:00">15:00</option>
              <option value="15:30:00">15:30</option>
              <option value="16:00:00">16:00</option>
              <option value="16:30:00">16:30</option>
              <option value="17:00:00">17:00</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="end-time">End Time</label>
            <select id="end-time" required>
              <option value="07:00:00">07:00</option>
              <option value="07:30:00">07:30</option>
              <option value="08:00:00">08:00</option>
              <option value="08:30:00">08:30</option>
              <option value="09:00:00">09:00</option>
              <option value="09:30:00">09:30</option>
              <option value="10:00:00">10:00</option>
              <option value="10:30:00">10:30</option>
              <option value="11:00:00">11:00</option>
              <option value="11:30:00">11:30</option>
              <option value="12:00:00">12:00</option>
              <option value="12:30:00">12:30</option>
              <option value="13:00:00">13:00</option>
              <option value="13:30:00">13:30</option>
              <option value="14:00:00">14:00</option>
              <option value="14:30:00">14:30</option>
              <option value="15:00:00">15:00</option>
              <option value="15:30:00">15:30</option>
              <option value="16:00:00">16:00</option>
              <option value="16:30:00">16:30</option>
              <option value="17:00:00">17:00</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="event-category">Category</label>
          <select id="event-category" required>
            <option value="Class Schedule">Class Schedule</option>
            <option value="Guest Speaker">Guest Speaker</option>
            <option value="Feedback">Feedback</option>
            <option value="Project">Project</option>
          </select>
        </div>
        <button type="submit" className="form-submit-btn">Create Event</button>
      </form>
    </section>
  );
}
