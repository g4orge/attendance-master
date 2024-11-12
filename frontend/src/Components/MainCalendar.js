// MainCalendar.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApiCall from './ApiCall';
import { listEvents } from './CalendarService';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MainCalendar.css';

const MainCalendar = () => {
  const {
    isSignedIn,
    error,
    handleAuthClick,
    handleSignOutClick,
    events,
    setEvents,
  } = useApiCall();

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Load all events on component mount if the user is signed in
  useEffect(() => {
    if (isSignedIn) {
      listEvents().then(fetchedEvents => setEvents(fetchedEvents));
    }
  }, [isSignedIn, setEvents]);

  // Filter events based on the selected date
  useEffect(() => {
    const selectedDateEvents = events.filter(event => {
      const eventDate = new Date(event.start.dateTime || event.start.date).toDateString();
      return eventDate === selectedDate.toDateString();
    });
    setFilteredEvents(selectedDateEvents);
  }, [selectedDate, events]);

  // Handle date selection on calendar
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container">
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!isSignedIn ? (
        <button onClick={handleAuthClick}>Sign in with Google</button>
      ) : (
        <>
          <button onClick={handleSignOutClick}>Sign out</button>

          {/* Calendar for selecting dates */}
          <div className="calendar-container">
            <Calendar
              onChange={handleDateClick}
              value={selectedDate}
            />

            {/* Display events for the selected date */}
            <div className="event-list">
              <h3>Events on {selectedDate.toDateString()}</h3>
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <div key={event.id}>
                    <p><strong>{event.summary}</strong></p>
                    <p>{event.description}</p>
                    <p>Location: {event.location}</p>
                    <p>Start: {new Date(event.start.dateTime).toLocaleTimeString()}</p>
                    <p>End: {new Date(event.end.dateTime).toLocaleTimeString()}</p>
                  </div>
                ))
              ) : (
                <p>No events for this date.</p>
              )}
            </div>

            {/* Button to navigate to the Create Event page */}
            <button
              className="create-event-btn"
              onClick={() => navigate('/create-event')}
            >
              Create Event
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MainCalendar;
