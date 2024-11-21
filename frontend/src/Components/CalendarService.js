

//import Calendar from 'react-calendar';
import useApiCall from './ApiCall';

// Initialize apicall hook for Google API
export const useGoogleClient = useApiCall;

// Function to delete an event
export const deleteEvent = async (eventId) => {
  try {
    await window.gapi.client.calendar.events.delete({
      calendarId: 'primary',
      eventId,
    });
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    return false;
  }
};

export const updateEvent = async (eventId, updatedEvent) => {
  try {
    const response = await window.gapi.client.calendar.events.update({
      calendarId: 'primary',
      eventId,
      resource: updatedEvent,
    });
    return response.result;
  } catch (error) {
    console.error("Error updating event:", error);
    return null;
  }
};

// Function to create or update an event
export const createEvent = async (event) => {
  try {
    const response = await window.gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    return response.result;
  } catch (error) {
    console.error("Error creating event:", error);
    return null;
  }
};

// Function to list events
export const listEvents = async () => {
  try {
    const response = await window.gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    });
    return response.result.items || [];
  } catch (error) {
    console.error("Error listing events:", error);
    return [];
  }
};

