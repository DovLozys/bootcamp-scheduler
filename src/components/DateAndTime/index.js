import { useState, useEffect } from "react";

export default function DateAndTime() {
  const getTimeString = () => new Date().toLocaleTimeString();

  const [timeString, setTimeString] = useState(getTimeString());

  useEffect(() => {
    let timerId;

    const tick = () => {
      const newTime = getTimeString();
      setTimeString((prev) => {
        if (prev !== newTime) {
          return newTime;
        }
        return prev;
      });
      timerId = setTimeout(tick, 1000 - (Date.now() % 1000));
    };

    tick();

    return () => clearTimeout(timerId);
  }, []);

  return <h4>{timeString}</h4>;
}
