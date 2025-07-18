import React, { useState, useEffect } from 'react';
import { Event } from '../../types';
import { apiEndpoints } from '../../config/env';
import { api, withRetry } from '../../utils/apiClient';
import { getUserFriendlyMessage } from '../../types/errors';
import { useToast } from '../../hooks/useToast';

import './displayUpcomingEvents.css';

interface DisplayUpcomingEventsProps {
  count: string;
}

const DisplayUpcomingEvents: React.FC<DisplayUpcomingEventsProps> = ({
  count,
}) => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { showError } = useToast();

  useEffect(() => {
    getUpcomingEvents(count);
  }, [count]);

  async function getUpcomingEvents(count: string): Promise<void> {
    try {
      setIsLoading(true);
      setError(null);

      const response = await withRetry(() =>
        api.get(apiEndpoints.upcomingEvents(count))
      );
      setUpcomingEvents(response.payload?.rows || []);
    } catch (error) {
      const errorMessage = getUserFriendlyMessage(error as Error);
      setError(errorMessage);
      showError(`Failed to load upcoming events: ${errorMessage}`);
      console.error('Error fetching upcoming events:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className='upcoming-flex-container'>
        <div className='upcoming-loading'>
          <div className='loading-spinner'></div>
          <p>Loading upcoming events...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='upcoming-flex-container'>
        <div className='upcoming-error'>
          <p>Unable to load upcoming events</p>
          <button
            onClick={() => getUpcomingEvents(count)}
            className='retry-button-small'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No events state
  if (upcomingEvents.length === 0) {
    return (
      <div className='upcoming-flex-container'>
        <div className='upcoming-empty'>
          <p>No upcoming events found</p>
        </div>
      </div>
    );
  }

  return (
    <div className='upcoming-flex-container'>
      {upcomingEvents.map(event => {
        return (
          <div className='upcoming-card' key={event.id}>
            <h2 className='upcoming-title'>{event.event_name}</h2>
            <p className='upcoming-time'>
              {event.event_date}, {event.event_start}{' '}
              <span className='upcoming-duration'>
                ({event.event_duration})
              </span>
            </p>
            <p className='upcoming-category'>{event.event_category}</p>
            <p className='upcoming-description'>{event.event_description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayUpcomingEvents;
