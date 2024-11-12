// CreateEvent.js
import React, { useState } from 'react';
import { createEvent } from './CalendarService';
import { useNavigate } from 'react-router-dom';
import useApiCall from './ApiCall';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { isSignedIn, user, handleAuthClick } = useApiCall();
  const [eventDetails, setEventDetails] = useState({
    summary: '',
    location: 'Rideau', // Default location
    description: '',
    start: '',
    end: '',
    FirstName: '',
    LastName: '',
  });

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      summary: `${eventDetails.FirstName} ${eventDetails.LastName}`,
      location: eventDetails.location,
      description: eventDetails.description,
      start: { dateTime: new Date(eventDetails.start).toISOString(), timeZone: 'America/New_York' },
      end: { dateTime: new Date(eventDetails.end).toISOString(), timeZone: 'America/New_York' },
      creator: { id: user.id, email: user.email, displayName: `${eventDetails.FirstName} ${eventDetails.LastName}` }
    };

    const createdEvent = await createEvent(eventData);
    if (createdEvent) {
      alert('Event created successfully!');
      navigate('/calendar'); // Navigate back to calendar page after creation
    }
  };

  return (
    <div className="container form-container">
      <h2>Create Event</h2>
      <form onSubmit={handleEventSubmit}>
        <input
          type="text"
          name="FirstName"
          placeholder="First Name"
          value={eventDetails.FirstName}
          onChange={handleEventChange}
          required
        />
        <input
          type="text"
          name="LastName"
          placeholder="Last Name"
          value={eventDetails.LastName}
          onChange={handleEventChange}
          required
        />

        <label htmlFor="location">Location</label>
        <select
          name="location"
          value={eventDetails.location}
          onChange={handleEventChange}
          required
        >
          <option value="Rideau">Rideau</option>
          <option value="Varnier">Varnier</option>
          <option value="uOttawa">uOttawa</option>
          <option value="Summerset">Summerset</option>
          <option value="Gatineau">Gatineau</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={eventDetails.description}
          onChange={handleEventChange}
        />
        <input
          type="datetime-local"
          name="start"
          value={eventDetails.start}
          onChange={handleEventChange}
          required
        />
        <input
          type="datetime-local"
          name="end"
          value={eventDetails.end}
          onChange={handleEventChange}
          required
        />
        <button type="submit">Create Event</button>
        <button type="button" onClick={() => navigate('/calendar')}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateEvent;
