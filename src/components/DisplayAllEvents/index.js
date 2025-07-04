import { useEffect, useState } from 'react';

import DeleteEventButton from '../DeleteEventButton';
import FormEditDescription from '../FormEditDescription';
import Navbar from '../Navbar';
import EventCard from '../EventCard';

import './DisplayAllEvents.css';

export default function DisplayAllEvents() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    getAllEvents();
  }, []);

  useEffect(() => {
    filterAndSortEvents();
  }, [events, searchQuery, selectedCategory, sortBy]);

  // TODO: move function declaration into useEffect?
  async function getAllEvents() {
    const res = await fetch('http://localhost:5500/api/v1/events/');
    const response = await res.json();

    setEvents(response.payload);
  }

  const filterAndSortEvents = () => {
    let filtered = [...events];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.event_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.event_description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(event => event.event_category === selectedCategory);
    }

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.event_date) - new Date(b.event_date);
        case 'name':
          return a.event_name.localeCompare(b.event_name);
        case 'category':
          return a.event_category.localeCompare(b.event_category);
        default:
          return 0;
      }
    });

    setFilteredEvents(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleViewDetails = (event) => {
    // TODO: Navigate to event details page
    console.log('View details for event:', event.id);
  };

  const handleBookNow = (event) => {
    // TODO: Handle event booking
    console.log('Book event:', event.id);
  };

  const categories = [...new Set(events.map(event => event.event_category))];

  return (
    <div className="all-events-body">
      <Navbar onSearch={handleSearch} />
      <div className="events-container">
        <div className="events-header">
          <h1 className="page-title">All Events</h1>
          <p className="events-count">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
          </p>
        </div>

        <div className="events-filters">
          <div className="filter-group">
            <label htmlFor="category-filter">Category:</label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>

        <div className="events-grid">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onViewDetails={handleViewDetails}
              onBookNow={handleBookNow}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="no-events">
            <p>No events found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
