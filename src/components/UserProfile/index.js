import { useState, useEffect } from 'react';
import './UserProfile.css';

export default function UserProfile({ name }) {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetchProfile(name);
  }, [name]);

  async function fetchProfile(name) {
    let data = await fetch(
      'http://localhost:5500/api/v1/events/profile/' + name
    );
    let res = await data.json();
    setProfile(res);
  }

  return (
    <div className="profile-list-container">
      <h2 className="profile-title">Your Events</h2>
      <ul className="profile-list">
        {profile.map((el) => {
          return (
            <li className="profile-list-item" key={el.event_name + el.event_date}>
              <span className="profile-event-name">{el.event_name}</span>
              <span className="profile-event-date">{el.event_date}</span>
              <span className="profile-event-time">{el.event_start}</span>
              <span className="profile-event-desc">{el.profile_name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
