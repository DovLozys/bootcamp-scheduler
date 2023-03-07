import { useState, useEffect } from 'react';

export default function DateAndTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <h4>{dateTime.toUTCString()}</h4>;
}
