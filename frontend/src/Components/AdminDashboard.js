// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { deleteEvent, createEvent, listEvents, updateEvent } from './CalendarService';
import useApiCall from './ApiCall';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { isSignedIn, handleAuthClick, handleSignOutClick, events, setEvents } = useApiCall();
  const [filteredLocation, setFilteredLocation] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const locations = ['All', 'Rideau', 'Varnier', 'uOttawa', 'Summerset', 'Gatineau'];

  useEffect(() => {
    if (isSignedIn) {
      listEvents().then(allEvents => setEvents(allEvents));
    }
  }, [isSignedIn, setEvents]);

  const filteredEvents = filteredLocation === 'All' ? events : events.filter(event => event.location === filteredLocation);

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent({ ...selectedEvent, [name]: value });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const newEvent = {
      ...selectedEvent,
      start: { dateTime: new Date(selectedEvent.start).toISOString(), timeZone: 'America/New_York' },
      end: { dateTime: new Date(selectedEvent.end).toISOString(), timeZone: 'America/New_York' },
    };
    const createdEvent = await createEvent(newEvent);
    if (createdEvent) {
      setEvents([...events, createdEvent]);
      setIsCreating(false);
      alert('Event created successfully!');
    }
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    const updatedEvent = {
      ...selectedEvent,
      start: { dateTime: new Date(selectedEvent.start).toISOString(), timeZone: 'America/New_York' },
      end: { dateTime: new Date(selectedEvent.end).toISOString(), timeZone: 'America/New_York' },
    };
    const result = await updateEvent(updatedEvent);
    if (result) {
      setEvents(events.map(event => (event.id === selectedEvent.id ? result : event)));
      setIsEditing(false);
      alert('Event updated successfully!');
    }
  };

  const handleDeleteEvent = () => {
    if (confirmText === 'DELETE') {
      deleteEvent(selectedEvent.id).then(() => {
        setEvents(events.filter(event => event.id !== selectedEvent.id));
        setSelectedEvent(null);
        setConfirmText('');
        alert('Event deleted successfully.');
      });
    } else {
      alert('Please type "DELETE" to confirm deletion.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {!isSignedIn ? (
        <button onClick={handleAuthClick}>Sign in as Admin</button>
      ) : (
        <>
          <button onClick={handleSignOutClick}>Sign out</button>

          {/* Location Filter */}
          <div className="filter-section">
            <label>Filter by Location: </label>
            <select value={filteredLocation} onChange={(e) => setFilteredLocation(e.target.value)}>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Event List */}
          <div className="event-list">
            <h3>Events</h3>
            {filteredEvents.map(event => (
              <div key={event.id} onClick={() => setSelectedEvent(event)}>
                <p>{event.summary} - {event.location}</p>
              </div>
            ))}
          </div>

          {/* Selected Event Options */}
          {selectedEvent && (
            <div className="event-details">
              <h4>Selected Event: {selectedEvent.summary}</h4>
              <button onClick={() => setIsEditing(true)}>Edit Event</button>
              <button onClick={() => setIsCreating(true)}>Create New Event</button>
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
            <form onSubmit={handleEditEvent} className="edit-form">
              <h3>Edit Event</h3>
              <input type="text" name="summary" placeholder="Event Summary" value={selectedEvent.summary} onChange={handleEventChange} required />
              <select name="location" value={selectedEvent.location} onChange={handleEventChange} required>
                {locations.slice(1).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <textarea name="description" placeholder="Description" value={selectedEvent.description} onChange={handleEventChange} />
              <input type="datetime-local" name="start" value={selectedEvent.start} onChange={handleEventChange} required />
              <input type="datetime-local" name="end" value={selectedEvent.end} onChange={handleEventChange} required />
              <button type="submit">Save Changes</button>
            </form>
          )}

          {/* Create Event Form */}
          {isCreating && (
            <form onSubmit={handleCreateEvent} className="create-form">
              <h3>Create New Event</h3>
              <input type="text" name="summary" placeholder="Event Summary" value={selectedEvent?.summary || ''} onChange={handleEventChange} required />
              <select name="location" value={selectedEvent?.location || 'Rideau'} onChange={handleEventChange} required>
                {locations.slice(1).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <textarea name="description" placeholder="Description" value={selectedEvent?.description || ''} onChange={handleEventChange} />
              <input type="datetime-local" name="start" value={selectedEvent?.start || ''} onChange={handleEventChange} required />
              <input type="datetime-local" name="end" value={selectedEvent?.end || ''} onChange={handleEventChange} required />
              <button type="submit">Create Event</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
