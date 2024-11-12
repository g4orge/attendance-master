import { useEffect, useState } from 'react';
import {gapi} from 'gapi-script';
import Calendar from 'react-calendar'; // Import the Calendar component
import 'react-calendar/dist/Calendar.css';

const CLIENT_ID = '231611256375-ccl0ua5knonls2t7rpmiafvj0j83ttsv.apps.googleusercontent.com';
const API_KEY = 'AIzaSyATYJVwz2TTj6igNjZFP4t4har1XiAH0uI';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

const GoogleCalendar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    summary: '',
    location: '',
    description: '',
    start: '',
    end: '',
    FirstName: '',
    LastName: '',
  });
    const [isCreatingEvent, setIsCreatingEvent] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showEvents, setShowEvents] = useState(false);

    const handleDateClick = (value) => {
        setDate(value);
        const selectedDate = new Date(value);
        const startDateTime = new Date(selectedDate.setHours(9, 0)); // Set default start time
        const endDateTime = new Date(selectedDate.setHours(10, 0)); // Set default end time
    
        setEventDetails({
          ...eventDetails,
          start: startDateTime.toISOString().slice(0, 16),
          end: endDateTime.toISOString().slice(0, 16),
        });
    
        setIsCreatingEvent(true);
      };

  useEffect(() => {
    const initClient = () => {
      if (window.gapi && window.gapi.client) {
        window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        }).then(() => {
          const authInstance = window.gapi.auth2.getAuthInstance();
          authInstance.isSignedIn.listen(setIsSignedIn);
          setIsSignedIn(authInstance.isSignedIn.get());
        }).catch(err => {
          console.error('Error initializing Google API client', err);
          setError('Failed to initialize Google API client. Please check your configuration.');
        });
      } else {
        setError('Google API client library not available.');
      }
    };

    // Load the client after the script is loaded
    const loadGapi = () => {
      window.gapi.load('client:auth2', initClient);
    };

    // Check if gapi is already available, if not load the client
    if (window.gapi) {
      loadGapi();
    } else {
      setError('Google API script not loaded.');
    }
  }, []);

  const handleAuthClick = () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (authInstance) {
      authInstance.signIn().catch(err => {
        console.error('Error during sign-in', err);
        setError('Sign-in failed. Please check your configurations and try again.');
      });
    } else {
      setError('Google API client not initialized yet.');
    }
  };

  const handleSignOutClick = () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    if (authInstance) {
      authInstance.signOut();
      setIsSignedIn(false);
      setEvents([]);
    }
  };

  const handleCreateEventClick = () => {
    setIsCreatingEvent(true);
  };
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    const { summary, location, description, start, end } = eventDetails;

    const event = {
      firstname: eventDetails.FirstName, // Ensure it's set correctly
      lastname: eventDetails.LastName, // Ensure it's set correctly
      summary: `${eventDetails.FirstName} ${eventDetails.LastName}`, // Correct // Ensure it's set correctly
      location: eventDetails.location, // Ensure it's set correctly
      description: eventDetails.description, // Optional
      start: {
        dateTime: new Date(eventDetails.start).toISOString(), // Ensure it's formatted correctly
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: new Date(eventDetails.end).toISOString(), // Ensure it's formatted correctly
        timeZone: 'America/New_York',
      },
    };
    const handleEditEvent = (eventId) => {
      const event = events.find(event => event.id === eventId);
      if (event) {
        setEventDetails({
          summary: event.summary,
          location: event.location,
          description: event.description,
          start: event.start.dateTime,
          end: event.end.dateTime,
        });
        setIsCreatingEvent(true);
      }
    };

    const handleDeleteEvent = (eventId) => {
      window.gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId,
      }).then(() => {
        alert('Event deleted successfully!');
        setEvents(events.filter(event => event.id !== eventId));
      }).catch(err => {
        console.error('Error deleting event', err);
        setError('Failed to delete event');
      });
    };

    // Create event in Google Calendar
    window.gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    }).then(response => {
      console.log('Event created: ', response);
      setEventDetails({ summary: '', location: '', description: '', start: '', end: '' });
      setIsCreatingEvent(false);
      alert('Event created successfully!');
    }).catch(err => {
      console.error('Error creating event', err);
      setError('Failed to create event');
    });
  };


  const loadTestEvents = async () => {
    try {
      const response = await fetch('/event-test.json');
      const data = await response.json();
      console.log('Test Events:', data);
  
      // Loop through events and create them (simulate API call)
      for (const event of data) {
        setEventDetails({
          summary: event.summary,
          location: event.location,
          description: event.description,
          start: event.start.dateTime,
          end: event.end.dateTime,
          childFirstName: 'Test', // Add a default name if needed
          childLastName: 'User',   // Add a default name if needed
        });
  
        // Simulate form submission
        await handleEventSubmit({ preventDefault: () => {} });
      }
    } catch (error) {
      console.error('Error loading test events:', error);
    }
  };
  
  
  const handleCreateEvent = (event) => {
    // Logic to handle creating an event
    setEventDetails(event); // Set the event details you need
    handleEventSubmit({ preventDefault: () => {} }); // Call submit handler
  };
  const handleDeleteEvent = (eventId) => {
    // Logic to handle deleting an event
    window.gapi.client.calendar.events.delete({
      calendarId: 'primary',
      eventId,
    }).then(() => {
      alert('Event deleted successfully!');
    }).catch(err => {
      console.error('Error deleting event', err);
      setError('Failed to delete event');
    });
  };  
  
  

  return (
    <div className="container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="left-column">
        {!isSignedIn ? (
          <div className="center">
            <button onClick={handleAuthClick}>Sign in with Google</button>
          </div>
        ) : (
          <>
            <div className="center">
              <button onClick={handleSignOutClick}>Sign out</button>
              <button onClick={handleCreateEventClick}>Create Event</button>
              <button onClick={listUpcomingEvents}>List Upcoming Events</button>
            </div>

            {isCreatingEvent && (
              <form onSubmit={handleEventSubmit}>
                <h3>Create Event</h3>

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
                <select
                  name="location"
                  value={eventDetails.location}
                  onChange={handleEventChange}
                  required
                >
                  <option value="">Select Location</option>
                  <option value="Location 1">Location 1</option>
                  <option value="Location 2">Location 2</option>
                  <option value="Location 3">Location 3</option>
                  <option value="Location 4">Location 4</option>
                  <option value="Location 5">Location 5</option>
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
                <button type="button" onClick={() => setIsCreatingEvent(false)}>Cancel</button>
              </form>
            )}
          </>
        )}
      </div>

      <div className="right-column">
        <h3>Upcoming Events</h3>
        <ul className="event-list">
          {events.map(event => (
            <li key={event.id}>
              {event.summary} ({event.start.dateTime || event.start.date})
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
        }

        .left-column {
          width: 60%;
          padding: 20px;
        }

        .right-column {
          width: 35%;
          padding: 20px;
          background-color: #f9f9f9;
          border-left: 1px solid #ccc;
        }

        .event-list {
          list-style-type: none;
          padding-left: 0;
        }

        .event-list li {
          margin-bottom: 5px;
          padding: 10px;
          background-color: #e7f1ff;
          border-radius: 4px;
        }

        .center {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        button {
          margin: 10px;
        }

        form {
          max-width: 500px;
          width: 100%;
          margin: auto;
        }

        input, textarea, select {
          display: block;
          margin: 10px 0;
          padding: 8px;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default GoogleCalendar;