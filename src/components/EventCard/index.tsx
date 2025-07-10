import React from 'react';
import { Event } from '../../types';
import './EventCard.css';

interface EventCardProps {
  event: Event;
  onViewDetails?: (event: Event) => void;
  onBookNow?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails, onBookNow }) => {
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (timeString: string): string => {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    return (
        <div className="event-card">
            <div className="event-card-header">
                <div className="event-category-badge">
                    {event.event_category}
                </div>
                <div className="event-date">
                    {formatDate(event.event_date)}
                </div>
            </div>

            <div className="event-card-body">
                <h3 className="event-title">{event.event_name}</h3>
                <p className="event-description">{event.event_description}</p>

                <div className="event-details">
                    <div className="event-time">
                        <svg className="icon" viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
                        </svg>
                        <span>{formatTime(event.event_start)} ({event.event_duration})</span>
                    </div>
                </div>
            </div>

            <div className="event-card-footer">
                <button
                    className="btn btn-secondary"
                    onClick={() => onViewDetails && onViewDetails(event)}
                >
                    View Details
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => onBookNow && onBookNow(event)}
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default EventCard;
