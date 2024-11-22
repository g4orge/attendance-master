import React, { useState, useEffect } from 'react';
import { deleteEvent, createEvent, listEvents, updateEvent } from '../Components/CalendarService';
import useApiCall from '../Components/ApiCall';
import './Admin.css';

const Admin = () => {
  const { isSignedIn, error, handleAuthClick, handleSignOutClick, events, setEvents } = useApiCall();
  const [filteredLocation, setFilteredLocation] = useState('All');
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [deletedEvents, setDeletedEvents] = useState([]);
  const [confirmText, setConfirmText] = useState('');
  const [eventDetails, setEventDetails] = useState({
    summary: '',
    location: 'Rideau',
    description: '',
    start: '',
    end: '',
    FirstName: '',
    LastName: '',
  });

  const locations = ['All', 'Rideau', 'Varnier', 'uOttawa', 'Summerset', 'Gatineau'];

  useEffect(() => {
    if (isSignedIn) {
      listEvents().then(allEvents => setEvents(allEvents));
    }
  }, [isSignedIn, setEvents]);

  const filteredEvents = filteredLocation === 'All' ? events : events.filter(event => event.location === filteredLocation);

  // Update event details for editing or creating
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  // Submit new event details
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const newEvent = {
      ...eventDetails,
      summary: `${eventDetails.FirstName} ${eventDetails.LastName}`,
      start: { dateTime: new Date(eventDetails.start).toISOString(), timeZone: 'America/New_York' },
      end: { dateTime: new Date(eventDetails.end).toISOString(), timeZone: 'America/New_York' },
    };
    const createdEvent = await createEvent(newEvent);
    if (createdEvent) {
      setEvents([...events, createdEvent]);
      setEventDetails({ summary: '', location: 'Rideau', description: '', start: '', end: '', FirstName: '', LastName: '' });
      setIsCreating(false);
      alert('Event created successfully!');
    }
  };

  // Submit edited event details
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedEventData = {
      ...selectedEvent,
      ...eventDetails,
      start: { dateTime: new Date(eventDetails.start).toISOString(), timeZone: 'America/New_York' },
      end: { dateTime: new Date(eventDetails.end).toISOString(), timeZone: 'America/New_York' }
    };
    const updatedEvent = await updateEvent(updatedEventData);
    if (updatedEvent) {
      setEvents(events.map(event => (event.id === selectedEvent.id ? updatedEvent : event)));
      setSelectedEvent(null);
      setIsEditing(false);
      alert('Event updated successfully!');
    }
  };

  // Delete event with confirmation
  const handleDeleteEvent = () => {
    if (confirmText === 'DELETE') {
      deleteEvent(selectedEvent.id).then(() => {
        setEvents(events.filter(event => event.id !== selectedEvent.id));
        setDeletedEvents([...deletedEvents, selectedEvent]);
        setSelectedEvent(null);
        setConfirmText('');
        alert('Event deleted successfully.');
      });
    } else {
      alert('Please type "DELETE" to confirm deletion.');
    }
  };


  // Select event for editing or deletion
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEventDetails({
      summary: event.summary,
      location: event.location,
      description: event.description,
      start: event.start.dateTime,
      end: event.end.dateTime,
      FirstName: event.FirstName || '',
      LastName: event.LastName || '',
    });
  };

  return (
    <div className="admin-container">
      {error && <p className="error-message">{error}</p>}
      {!isSignedIn ? (
        <button onClick={handleAuthClick}>Sign in as Admin</button>
      ) : (
        <>
          <button onClick={handleSignOutClick}>Sign out</button>
          <h2>Admin Panel</h2>
          
          {/* Event Filter */}
          <div className="filter-section">
            <label>Filter by Location: </label>
            <select value={filteredLocation} onChange={(e) => setFilteredLocation(e.target.value)}>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Create New Event Button */}
          <button onClick={() => setIsCreating(true)} className="create-event-btn">
            Create New Event
          </button>

          {/* Event List */}
          <div className="event-list">
            <h3>Events</h3>
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className="event-item"
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
                onClick={() => handleSelectEvent(event)}
              >
                <p>{event.summary}</p>
                {hoveredEvent && hoveredEvent.id === event.id && (
                  <div className="hover-details">
                    <p>{event.description}</p>
                    <p>{event.location}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Selected Event Options */}
          {selectedEvent && (
            <div className="event-options">
              <h4>Event: {selectedEvent.summary}</h4>
              <button onClick={() => setIsEditing(true)}>Edit Event</button>
              <button onClick={handleDeleteEvent}>Delete Event</button>
              <input
                type="text"
                placeholder="Type DELETE to confirm"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          )}

          {/* Edit Event Form */}
          {isEditing && (
            <form onSubmit={handleEditSubmit} className="edit-form">
              <h3>Edit Event</h3>
              <input type="text" name="FirstName" placeholder="First Name" value={eventDetails.FirstName} onChange={handleEventChange} />
              <input type="text" name="LastName" placeholder="Last Name" value={eventDetails.LastName} onChange={handleEventChange} />
              <select name="location" value={eventDetails.location} onChange={handleEventChange}>
                {locations.slice(1).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <textarea name="description" placeholder="Description" value={eventDetails.description} onChange={handleEventChange} />
              <input type="datetime-local" name="start" value={eventDetails.start} onChange={handleEventChange} />
              <input type="datetime-local" name="end" value={eventDetails.end} onChange={handleEventChange} />
              <button type="submit">Save Changes</button>
            </form>
          )}

          {/* Create Event Form */}
          {isCreating && (
            <form onSubmit={handleCreateSubmit} className="create-form">
              <h3>Create New Event</h3>
              <input type="text" name="FirstName" placeholder="First Name" value={eventDetails.FirstName} onChange={handleEventChange} required />
              <input type="text" name="LastName" placeholder="Last Name" value={eventDetails.LastName} onChange={handleEventChange} required />
              <input type="text" name="summary" placeholder="Event Summary" value={eventDetails.summary} onChange={handleEventChange} required />
              <select name="location" value={eventDetails.location} onChange={handleEventChange} required>
                {locations.slice(1).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <textarea name="description" placeholder="Description" value={eventDetails.description} onChange={handleEventChange} />
              <input type="datetime-local" name="start" value={eventDetails.start} onChange={handleEventChange} required />
              <input type="datetime-local" name="end" value={eventDetails.end} onChange={handleEventChange} required />
              <button type="submit">Create Event</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default Admin;