import React, { useState } from 'react';
import { createEvent } from './CalendarService';
import { useNavigate } from 'react-router-dom';
import useApiCall from './ApiCall';
import './CreateEvent.css';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useApiCall();
  const [eventDetails, setEventDetails] = useState({
    summary: '',
    location: '', // Default location
    description: '',
    start: '',
    end: '',
    counsellorName: '',
    comment: '',
    // hasAllergies: false,
    // allergyDetails: '',
    // allergySolution: '',
    // emergencyContact: {
    //   name: '',
    //   email: '',
    //   phone: '',
    //   address: '',
    // },
  });

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  // const handleEmergencyContactChange = (e) => {
  //   const { name, value } = e.target;
  //   setEventDetails((prevDetails) => ({
  //     ...prevDetails,
  //     emergencyContact: { ...prevDetails.emergencyContact, [name]: value },
  //   }));
  // };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      comment: { ...prevDetails.comment, [name]: value },
    }));
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!eventDetails.start || !eventDetails.end || !eventDetails.counsellorName) {
      alert('Please fill in all required fields.');
      return;
    }

    const eventData = {
      summary: `${eventDetails.counsellorName}`,
      location: eventDetails.location,
      description: eventDetails.description,
      start: { dateTime: new Date(eventDetails.start).toISOString(), timeZone: 'America/New_York' },
      end: { dateTime: new Date(eventDetails.end).toISOString(), timeZone: 'America/New_York' },
      hasAllergies: eventDetails.hasAllergies,
      allergyDetails: eventDetails.allergyDetails,
      allergySolution: eventDetails.allergySolution,
      emergencyContact: eventDetails.emergencyContact,
      creator: {
        id: user.id,
        email: user.email,
        displayName: `${eventDetails.counsellorName}`,
      },
    };

    try {
      console.log('Submitting event:', eventData);
      const createdEvent = await createEvent(eventData);

      if (createdEvent) {
        alert('Event created successfully!');
        setEventDetails({
          summary: '',
          location: '',
          description: '',
          start: '',
          end: '',
          counsellorName: '',
          hasAllergies: false,
          allergyDetails: '',
          allergySolution: '',
          emergencyContact: {
            name: '',
            email: '',
            phone: '',
            address: '',
          },
        });
        navigate('/calendar');
      } else {
        alert('Failed to create event. Please try again.');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('An error occurred while creating the event. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Create Event</h2>
      <form onSubmit={handleEventSubmit}>
        <table className="excel-style-form">
          <tbody>
            <tr>
              <td>Counsellor</td>
              <td>
                <input
                  type="text"
                  name="counsellorName"
                  value={eventDetails.counsellorName}
                  onChange={handleEventChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Location</td>
              <td>
                <select
                  name="location"
                  value={eventDetails.location}
                  onChange={handleEventChange}
                  required
                >
                  <option disabled value="">Select location</option>
                  <option value="Rideau">Rideau</option>
                  <option value="Varnier">Varnier</option>
                  <option value="uOttawa">uOttawa</option>
                  <option value="Summerset">Summerset</option>
                  <option value="Gatineau">Gatineau</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Description</td>
              <td>
                <textarea
                  name="description"
                  value={eventDetails.description}
                  onChange={handleEventChange}
                />
              </td>
            </tr>
            <tr>
              <td>Start Time</td>
              <td>
                <input
                  type="datetime-local"
                  name="start"
                  value={eventDetails.start}
                  onChange={handleEventChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>End Time</td>
              <td>
                <input
                  type="datetime-local"
                  name="end"
                  value={eventDetails.end}
                  onChange={handleEventChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Comments</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={eventDetails.comment.name}
                  onChange={handleCommentChange}
                />
                </td>
            </tr>
            {/* <tr>
              <td>Do you have any allergies?</td>
              <td>
                <button
                  type="button"
                  style={{
                    backgroundColor: eventDetails.hasAllergies ? 'green' : 'white',
                    border: '1px solid green',
                    color: eventDetails.hasAllergies ? 'white' : 'green',
                    marginRight: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    setEventDetails((prev) => ({ ...prev, hasAllergies: true }))
                  }
                >
                  Yes
                </button>
                <button
                  type="button"
                  style={{
                    backgroundColor: !eventDetails.hasAllergies ? 'red' : 'white',
                    border: '1px solid red',
                    color: !eventDetails.hasAllergies ? 'white' : 'red',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    setEventDetails((prev) => ({
                      ...prev,
                      hasAllergies: false,
                      allergyDetails: '',
                      allergySolution: '',
                    }))
                  }
                >
                  No
                </button>
              </td>
            </tr>
            {eventDetails.hasAllergies && (
              <>
                <tr>
                  <td>Allergy Details</td>
                  <td>
                    <textarea
                      name="allergyDetails"
                      placeholder="Please specify the allergies"
                      value={eventDetails.allergyDetails}
                      onChange={handleEventChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Allergy Solution</td>
                  <td>
                    <textarea
                      name="allergySolution"
                      placeholder="What is the solution for these allergies?"
                      value={eventDetails.allergySolution}
                      onChange={handleEventChange}
                      required
                    />
                  </td>
                </tr>
              </>
            )} */}
            {/* <tr>
              <td>Emergency Contact Name</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={eventDetails.emergencyContact.name}
                  onChange={handleEmergencyContactChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Emergency Contact Email</td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={eventDetails.emergencyContact.email}
                  onChange={handleEmergencyContactChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Emergency Contact Phone</td>
              <td>
                <input
                  type="tel"
                  name="phone"
                  value={eventDetails.emergencyContact.phone}
                  onChange={handleEmergencyContactChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Emergency Contact Address</td>
              <td>
                <textarea
                  name="address"
                  value={eventDetails.emergencyContact.address}
                  onChange={handleEmergencyContactChange}
                  required
                />
              </td>
            </tr> */}
          </tbody>
        </table>

        <div className="form-actions">
          <button type="submit">Create Event</button>
          <button type="button" onClick={() => navigate('/calendar')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
