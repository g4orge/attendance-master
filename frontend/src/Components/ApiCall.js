import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '231611256375-ccl0ua5knonls2t7rpmiafvj0j83ttsv.apps.googleusercontent.com';
const API_KEY = 'AIzaSyATYJVwz2TTj6igNjZFP4t4har1XiAH0uI';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

const useApiCall = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const adminEmail = 'admin@example.com';

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance) {
          authInstance.isSignedIn.listen(setIsSignedIn);
          setIsSignedIn(authInstance.isSignedIn.get());

          if (authInstance.isSignedIn.get()) {
            const userProfile = authInstance.currentUser.get().getBasicProfile();
            setUser({
              id: userProfile.getId(),
              email: userProfile.getEmail(),
              name: userProfile.getName(),
            });
          }
        } else {
          setError('Failed to initialize Google API client.');
        }
      }).catch(err => {
        setError('Error initializing Google API client');
        console.error(err);
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  const handleAuthClick = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signIn().then(() => {
      const userProfile = authInstance.currentUser.get().getBasicProfile();
      setUser({
        id: userProfile.getId(),
        email: userProfile.getEmail(),
        name: userProfile.getName(),
      });
    }).catch(err => {
      setError('Sign-in failed.');
      console.error('Error during sign-in', err);
    });
  };

  const handleSignOutClick = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signOut().then(() => {
      setIsSignedIn(false);
      setUser(null);
      setEvents([]);
    }).catch(err => {
      setError('Sign-out failed.');
      console.error('Error during sign-out', err);
    });
  };

  const listEvents = async () => {
    if (!isSignedIn) {
      console.warn("User not signed in. Cannot list events.");
      return [];
    }
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      });
      setEvents(response.result.items || []);
    } catch (err) {
      setError('Failed to retrieve events');
      console.error('Error listing events', err);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId,
      });
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      alert('Event deleted successfully!');
    } catch (err) {
      setError('Failed to delete event');
      console.error('Error deleting event', err);
    }
  };

  const insertEvent = async (event) => {
    if (!user) {
      setError('User not signed in.');
      return;
    }

    const eventWithCreator = {
      ...event,
      creator: { email: user.email, id: user.id, displayName: user.name }
    };

    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: eventWithCreator,
      });
      setEvents(prevEvents => [...prevEvents, response.result]);
      alert('Event created successfully!');
    } catch (err) {
      setError('Failed to create event');
      console.error('Error creating event', err);
    }
  };

  // New updateEvent function
  const updateEvent = async (eventId, updatedEvent) => {
    try {
      const response = await gapi.client.calendar.events.update({
        calendarId: 'primary',
        eventId,
        resource: updatedEvent,
      });
      setEvents(prevEvents => prevEvents.map(event => (event.id === eventId ? response.result : event)));
      alert('Event updated successfully!');
    } catch (error) {
      setError('Failed to update event');
      console.error("Error updating event:", error);
    }
  };

  const isAdmin = user && user.email === adminEmail;

  return {
    isSignedIn,
    error,
    events,
    user,
    isAdmin,
    handleAuthClick,
    handleSignOutClick,
    listEvents,
    deleteEvent,
    insertEvent,
    updateEvent, // Add updateEvent to the returned functions
    setEvents,
  };
};

export default useApiCall;
