import React, { useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import "./calendar.css";

export default function MyCalendar() {
  const [value, onChange] = useState(new Date());

  return (
    <section className="calendar-section">
      <Link to="host-event">
        <Calendar className="calendar" onChange={onChange} value={value} />
      </Link>
    </section>
  );
}
