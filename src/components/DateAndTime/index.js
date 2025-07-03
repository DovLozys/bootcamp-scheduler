import { useState, useEffect } from "react";

export default function DateAndTime() {
  const getDateTimeString = () => {
    const now = new Date();
    return now.toLocaleDateString() + " " + now.toLocaleTimeString();
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

  return <h4>{dateTimeString}</h4>;
}
