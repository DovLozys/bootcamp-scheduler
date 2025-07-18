import React, { useEffect, useState, useCallback } from 'react';
import { Event, SortOption } from '../../types';
import { apiEndpoints } from '../../config/env';
import { api, withRetry } from '../../utils/apiClient';
import { getUserFriendlyMessage } from '../../types/errors';
import { useToast } from '../../hooks/useToast';

import Navbar from '../Layout/Navbar';
import EventCard from './EventCard';

const DisplayAllEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { showError } = useToast();

  const getAllEvents = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await withRetry(() => api.get(apiEndpoints.events));
      setEvents(response.payload || []);
    } catch (error) {
      const errorMessage = getUserFriendlyMessage(error as Error);
      setError(errorMessage);
      showError(`Failed to load events: ${errorMessage}`);
      console.error('Error fetching events:', error);
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  const filterAndSortEvents = useCallback((): void => {
    let filtered = [...events];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (event: Event) =>
          event.event_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.event_description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (event: Event) => event.event_category === selectedCategory
      );
    }

    // Sort events
    filtered.sort((a: Event, b: Event) => {
      switch (sortBy) {
        case 'date':
          return (
            new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
          );
        case 'name':
          return a.event_name.localeCompare(b.event_name);
        case 'category':
          return a.event_category.localeCompare(b.event_category);
        default:
          return 0;
      }
    });

    setFilteredEvents(filtered);
  }, [events, searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  useEffect(() => {
    filterAndSortEvents();
  }, [filterAndSortEvents]);

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };

  const handleViewDetails = (event: Event): void => {
    // TODO: Navigate to event details page
    console.log('View details for event:', event.id);
  };

  const handleBookNow = (event: Event): void => {
    // TODO: Handle event booking
    console.log('Book event:', event.id);
  };

  const categories: string[] = Array.from(
    new Set(events.map(event => event.event_category))
  );

  // Loading state
  if (isLoading) {
    return (
      <div className='all-events-body'>
        <Navbar onSearch={handleSearch} />
        <div className='events-container'>
          <div className='loading-state'>
            <div className='loading-spinner'></div>
            <p>Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='all-events-body'>
        <Navbar onSearch={handleSearch} />
        <div className='events-container'>
          <div className='error-state'>
            <h2>Unable to Load Events</h2>
            <p>{error}</p>
            <button onClick={() => getAllEvents()} className='retry-button'>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='all-events-body'>
      <Navbar onSearch={handleSearch} />
      <div className='events-container'>
        <div className='events-header'>
          <h1 className='page-title'>All Events</h1>
          <p className='events-count'>
            {filteredEvents.length}{' '}
            {filteredEvents.length === 1 ? 'event' : 'events'} found
          </p>
        </div>

        <div className='events-filters'>
          <div className='filter-group'>
            <label htmlFor='category-filter'>Category:</label>
            <select
              id='category-filter'
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className='filter-select'
            >
              <option value=''>All Categories</option>
              {categories.map((category: string) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className='filter-group'>
            <label htmlFor='sort-select'>Sort by:</label>
            <select
              id='sort-select'
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className='filter-select'
            >
              <option value='date'>Date</option>
              <option value='name'>Name</option>
              <option value='category'>Category</option>
            </select>
          </div>
        </div>

        <div className='events-grid'>
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={handleViewDetails}
              onBookNow={handleBookNow}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className='no-events'>
            <p>No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayAllEvents;
