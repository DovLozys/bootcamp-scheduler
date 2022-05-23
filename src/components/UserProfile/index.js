import React, { useState, useEffect } from 'react';

export default function UserProfile({ name }) {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetchProfile(name);
  }, [name]);
  
  // TODO: move function declaration into useEffect?
  async function fetchProfile(name) {
    let data = await fetch(
      'http://localhost:5500/api/v1/events/profile/' + name
    );
    let res = await data.json();
    setProfile(res);
  }

  return (
    <div>
      <ul>
        {profile.map((el) => {
          return (
            <li>
              {el.profile_name} {el.event_name} {el.event_start} {el.event_date}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
