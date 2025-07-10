import { useState, useEffect } from "react";
import './DateAndTime.css';

export default function DateAndTime() {
  const getDateTimeString = () => {
    const now = new Date();
    return now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) +
      " | " +
      now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const [dateTimeString, setDateTimeString] = useState(getDateTimeString());

  useEffect(() => {
    let timerId;
    const tick = () => {
      const newDateTime = getDateTimeString();
      setDateTimeString((prev) => {
        if (prev !== newDateTime) {
          return newDateTime;
        }
        return prev;
      });
      timerId = setTimeout(tick, 1000 - (Date.now() % 1000));
    };
    tick();
    return () => clearTimeout(timerId);
  }, []);

  return <div className="date-time-container"><span className="date-time-text">{dateTimeString}</span></div>;
}
