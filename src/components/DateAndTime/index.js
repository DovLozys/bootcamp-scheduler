import React, { useState } from "react";

export default function DateAndTime() {
  const [dateTime, setDateTime] = useState({});

  setInterval(() => {
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTimeObj = { date: date, time: time };

    setDateTime(dateTimeObj);
  }, 1000);

  return (
    <section>
      <h4>
        {dateTime.date}
        <br />
        {dateTime.time}
      </h4>
    </section>
  );
}
