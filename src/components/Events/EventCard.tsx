import React from 'react';
import { Event } from '../../types';
import styles from './EventCard.module.css';

interface EventCardProps {
  event: Event;
  onViewDetails?: (event: Event) => void;
  onBookNow?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onViewDetails,
  onBookNow,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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
    <div className={styles.eventCard}>
      <div className={styles.eventCardHeader}>
        <div className={styles.eventCategoryBadge}>{event.event_category}</div>
        <div className={styles.eventDate}>{formatDate(event.event_date)}</div>
      </div>

      <div className={styles.eventCardBody}>
        <h3 className={styles.eventTitle}>{event.event_name}</h3>
        <p className={styles.eventDescription}>{event.event_description}</p>

        <div className={styles.eventDetails}>
          <div className={styles.eventTime}>
            <svg
              className={styles.icon}
              viewBox='0 0 24 24'
              width='16'
              height='16'
            >
              <path
                fill='currentColor'
                d='M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z'
              />
            </svg>
            <span>
              {formatTime(event.event_start)} ({event.event_duration})
            </span>
          </div>
        </div>
      </div>

      <div className={styles.eventCardFooter}>
        <button
          className={`${styles.btn} ${styles.btnSecondary}`}
          onClick={() => onViewDetails && onViewDetails(event)}
        >
          View Details
        </button>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => onBookNow && onBookNow(event)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;
