import React from "react";
import "./mainContent.css";
import { Link } from "react-router-dom";
import { DateAndTime } from "../DateAndTime";
import DisplayUpcomingEvents from "../DisplayUpcomingEvents";
import MyCalendar from "../MyCalendar";

export default function MainContent() {
  return (
    <section className="main-display">
      <h2>Clan Optimist's upcoming...</h2>
      <div id="upcoming-event">
        <Link to="all-events">
          <DisplayUpcomingEvents count="1" />
        </Link>
      </div>

      <DateAndTime />
      <section className="calendar-placement">
        <MyCalendar />
      </section>
      {/* <p>
        Bootcamp is no walk in the park. So let’s make it a little easier for
        you. Want to create an event to get together with your fellow
        bootcampers? Forgot when code club is? Let's help you!
      </p> */}
      <p>
        Optimist's Flexible, Social and Professional event manager. Never worry
        about missing a deadline.{" "}
      </p>
    </section>
  );
}
