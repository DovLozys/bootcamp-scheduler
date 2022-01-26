import React, {useState, useEffect} from 'react';

function DateAndTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => { setDateTime(new Date()); }, 1000);
    return () => { clearInterval(timer); };
  }, []);

  return <h4>{dateTime.toUTCString()}</h4>;
}

export {DateAndTime};
