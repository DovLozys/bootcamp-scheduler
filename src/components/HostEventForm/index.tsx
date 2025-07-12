import React, { useState, FormEvent, ChangeEvent } from 'react';
import { EventFormData, FormErrors } from '../../types';
import { apiEndpoints } from '../../config/env';
import './hostEventForm.css';

const HostEventForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<EventFormData>({
    event_name: '',
    event_description: '',
    event_date: '',
    event_start: '',
    event_end: '',
    event_category: '',
    event_location: '',
    event_capacity: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const totalSteps: number = 3;

  function diff(eventStartTime: string, eventEndTime: string): string {
    const startParts = eventStartTime.split(':');
    const endParts = eventEndTime.split(':');
    var eventStartTimeDate = new Date(0, 0, 0, parseInt(startParts[0]), parseInt(startParts[1]), 0);
    var endDate = new Date(0, 0, 0, parseInt(endParts[0]), parseInt(endParts[1]), 0);
    var diff = endDate.getTime() - eventStartTimeDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    if (hours < 0) hours = hours + 24;
    return (
      (hours <= 9 ? '0' : '') + hours + ':' + (minutes <= 9 ? '0' : '') + minutes
    );
  }

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.event_name.trim()) {
        newErrors.event_name = 'Event title is required';
      }
      if (!formData.event_description.trim()) {
        newErrors.event_description = 'Event description is required';
      }
      if (!formData.event_category) {
        newErrors.event_category = 'Please select a category';
      }
    }

    if (step === 2) {
      if (!formData.event_date) {
        newErrors.event_date = 'Event date is required';
      } else {
        const selectedDate = new Date(formData.event_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
          newErrors.event_date = 'Event date cannot be in the past';
        }
      }
      if (!formData.event_start) {
        newErrors.event_start = 'Start time is required';
      }
      if (!formData.event_end) {
        newErrors.event_end = 'End time is required';
      }
      if (formData.event_start && formData.event_end && formData.event_start >= formData.event_end) {
        newErrors.event_end = 'End time must be after start time';
      }
    }

    if (step === 3) {
      if (!formData.event_location.trim()) {
        newErrors.event_location = 'Event location is required';
      }
      if (!formData.event_capacity || parseInt(formData.event_capacity) < 1) {
        newErrors.event_capacity = 'Please enter a valid capacity';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof EventFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const nextStep = (): void => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = (): void => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      const newEvent = {
        event_name: formData.event_name,
        event_description: formData.event_description,
        event_date: formData.event_date,
        event_start: formData.event_start,
        event_duration: diff(formData.event_start, formData.event_end),
        event_category: formData.event_category,
        event_location: formData.event_location,
        event_capacity: parseInt(formData.event_capacity)
      };

      fetch(apiEndpoints.hostEvent, {
        method: 'POST',
        body: JSON.stringify(newEvent),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log('Event created successfully:', data);
          // Reset form or redirect
          setFormData({
            event_name: '',
            event_description: '',
            event_date: '',
            event_start: '',
            event_end: '',
            event_category: '',
            event_location: '',
            event_capacity: ''
          });
          setCurrentStep(1);
        })
        .catch(error => {
          console.error('Error creating event:', error);
        });
    }
  };

  const renderStepContent = (): React.ReactElement | null => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="form-group">
              <label htmlFor="event-title">Event Title *</label>
              <input
                id="event-title"
                type="text"
                placeholder="Enter a compelling event title..."
                value={formData.event_name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('event_name', e.target.value)}
                className={errors.event_name ? 'error' : ''}
              />
              {errors.event_name && <span className="error-message">{errors.event_name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="event-desc">Description *</label>
              <textarea
                id="event-desc"
                placeholder="Describe your event in detail..."
                rows={4}
                value={formData.event_description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleInputChange('event_description', e.target.value)}
                className={errors.event_description ? 'error' : ''}
              />
              {errors.event_description && <span className="error-message">{errors.event_description}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="event-category">Category *</label>
              <select
                id="event-category"
                value={formData.event_category}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange('event_category', e.target.value)}
                className={errors.event_category ? 'error' : ''}
              >
                <option value="">Select a category</option>
                <option value="Class Schedule">Class Schedule</option>
                <option value="Guest Speaker">Guest Speaker</option>
                <option value="Feedback">Feedback</option>
                <option value="Project">Project</option>
              </select>
              {errors.event_category && <span className="error-message">{errors.event_category}</span>}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="form-group">
              <label htmlFor="event-date">Date *</label>
              <input
                id="event-date"
                type="date"
                value={formData.event_date}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('event_date', e.target.value)}
                className={errors.event_date ? 'error' : ''}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.event_date && <span className="error-message">{errors.event_date}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="start-time">Start Time *</label>
                <input
                  id="start-time"
                  type="time"
                  value={formData.event_start}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('event_start', e.target.value)}
                  className={errors.event_start ? 'error' : ''}
                />
                {errors.event_start && <span className="error-message">{errors.event_start}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="end-time">End Time *</label>
                <input
                  id="end-time"
                  type="time"
                  value={formData.event_end}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('event_end', e.target.value)}
                  className={errors.event_end ? 'error' : ''}
                />
                {errors.event_end && <span className="error-message">{errors.event_end}</span>}
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="form-group">
              <label htmlFor="event-location">Location *</label>
              <input
                id="event-location"
                type="text"
                placeholder="Enter event location or address..."
                value={formData.event_location}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('event_location', e.target.value)}
                className={errors.event_location ? 'error' : ''}
              />
              {errors.event_location && <span className="error-message">{errors.event_location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="event-capacity">Maximum Capacity *</label>
              <input
                id="event-capacity"
                type="number"
                placeholder="How many people can attend?"
                min={1}
                value={formData.event_capacity}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('event_capacity', e.target.value)}
                className={errors.event_capacity ? 'error' : ''}
              />
              {errors.event_capacity && <span className="error-message">{errors.event_capacity}</span>}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getStepTitle = (): string => {
    switch (currentStep) {
      case 1: return 'Basic Information';
      case 2: return 'Date & Time';
      case 3: return 'Location & Details';
      default: return '';
    }
  };

  return (
    <section className="form-card">
      <div className="progress-bar">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`progress-step ${i + 1 <= currentStep ? 'active' : ''}`}
          >
            <div className="step-number">{i + 1}</div>
            <div className="step-title">
              {i === 0 && 'Basic Info'}
              {i === 1 && 'Schedule'}
              {i === 2 && 'Details'}
            </div>
          </div>
        ))}
      </div>

      <form className="event-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create a New Event</h2>
        <h3 className="step-title">{getStepTitle()}</h3>

        {renderStepContent()}

        <div className="form-navigation">
          {currentStep > 1 && (
            <button type="button" className="btn btn-secondary" onClick={prevStep}>
              Previous
            </button>
          )}
          {currentStep < totalSteps ? (
            <button type="button" className="btn btn-primary" onClick={nextStep}>
              Next
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Create Event
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default HostEventForm;
