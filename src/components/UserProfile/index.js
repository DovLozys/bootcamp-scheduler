import { useState, useEffect } from 'react';
import EventCard from '../EventCard';
import './UserProfile.css';

export default function UserProfile({ name = "User" }) {
  const [profile, setProfile] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: name,
    email: '',
    bio: '',
    location: '',
    joinDate: '2024-01-01'
  });
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...userInfo });

  useEffect(() => {
    fetchProfile(name);
    // TODO: Fetch user information from API
  }, [name]);

  async function fetchProfile(name) {
    try {
      let data = await fetch(
        'http://localhost:5500/api/v1/events/profile/' + name
      );
      let res = await data.json();
      setProfile(res);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile([]);
    }
  }

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditData({ ...userInfo });
  };

  const handleSaveProfile = () => {
    setUserInfo({ ...editData });
    setIsEditing(false);
    // TODO: Save to API
    console.log('Saving profile:', editData);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({ ...userInfo });
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const getFilteredEvents = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (activeTab) {
      case 'upcoming':
        return profile.filter(event => new Date(event.event_date) >= today);
      case 'past':
        return profile.filter(event => new Date(event.event_date) < today);
      case 'hosted':
        // TODO: Filter events hosted by the user
        return profile.filter(event => event.host_id === userInfo.id);
      default:
        return profile;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {userInfo.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="profile-info">
          {!isEditing ? (
            <>
              <h1 className="profile-name">{userInfo.name}</h1>
              <p className="profile-email">{userInfo.email || 'email@example.com'}</p>
              <p className="profile-bio">{userInfo.bio || 'No bio added yet.'}</p>
              <p className="profile-location">
                {userInfo.location && (
                  <>
                    <svg className="location-icon" viewBox="0 0 24 24" width="16" height="16">
                      <path fill="currentColor" d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2Z" />
                    </svg>
                    {userInfo.location}
                  </>
                )}
              </p>
              <p className="profile-join-date">Member since {formatDate(userInfo.joinDate)}</p>
              <button className="edit-profile-btn" onClick={handleEditProfile}>
                Edit Profile
              </button>
            </>
          ) : (
            <div className="edit-form">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Bio:</label>
                <textarea
                  value={editData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Location:</label>
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                />
              </div>
              <div className="edit-actions">
                <button className="save-btn" onClick={handleSaveProfile}>
                  Save Changes
                </button>
                <button className="cancel-btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="profile-content">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Events ({getFilteredEvents().length})
          </button>
          <button
            className={`tab ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Events
          </button>
          <button
            className={`tab ${activeTab === 'hosted' ? 'active' : ''}`}
            onClick={() => setActiveTab('hosted')}
          >
            Hosted Events
          </button>
        </div>

        <div className="events-section">
          {getFilteredEvents().length > 0 ? (
            <div className="events-grid">
              {getFilteredEvents().map((event) => (
                <EventCard
                  key={event.id || event.event_name + event.event_date}
                  event={event}
                  onViewDetails={(event) => console.log('View details:', event)}
                  onBookNow={(event) => console.log('Book event:', event)}
                />
              ))}
            </div>
          ) : (
            <div className="no-events">
              <p>No {activeTab} events found.</p>
              {activeTab === 'upcoming' && (
                <p>
                  <a href="/events">Browse available events</a> to get started!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
