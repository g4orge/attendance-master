import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Student = {
  id: null,
  prenom: '',
  nom: '',
  courriel: '',
  telephone: '',
  telephoneUrgence: '',
  adresse: '',
  numeroSuite: '',
  ville: '',
  province: '',
  codePostal: '',
  nombreEnfants: 1,
  nomPremierEnfant: '',
  age: null,
  besoinsSpec: '',
  status: '', // To track attendance status
};

const Attendance = () => {
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([]); // State for attendance data
  const [eventDetails, setEventDetails] = useState({
    summary: '',
    location: 'Rideau',
    description: '',
    start: '',
    end: '',
    FirstName: '',
    LastName: '',
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

  // Fetch attendance data on component load
  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users'); // Replace with your backend URL
      const data = response.data
        .map(item => ({
          ...Student,
          ...item,
        }))
        .sort((a, b) => a.nom.toLowerCase().localeCompare(b.nom.toLowerCase())); // Sort alphabetically by last name
      setAttendanceData(data);
    } catch (err) {
      console.error('Error fetching attendance data:', err);
    }
  };

  const markAttendance = (studentId, status) => {
    setAttendanceData(prevData =>
      prevData.map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

<<<<<<< HEAD
  const toggleAllAttendance = () => {
    const allPresent = attendanceData.every(student => student.status === 'Present');
    setAttendanceData(prevData =>
      prevData.map(student => ({ ...student, status: allPresent ? 'Absent' : 'Present' }))
    );
=======
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      emergencyContact: { ...prevDetails.emergencyContact, [name]: value },
    }));
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    if (!eventDetails.start || !eventDetails.end || !eventDetails.FirstName || !eventDetails.LastName) {
      alert('Please fill in all required fields.');
      return;
    }

    const eventData = {
      summary: `${eventDetails.FirstName} ${eventDetails.LastName}`,
      location: eventDetails.location,
      description: eventDetails.description,
      start: { dateTime: new Date(eventDetails.start).toISOString(), timeZone: 'America/New_York' },
      end: { dateTime: new Date(eventDetails.end).toISOString(), timeZone: 'America/New_York' },
      hasAllergies: eventDetails.hasAllergies,
      allergyDetails: eventDetails.allergyDetails,
      allergySolution: eventDetails.allergySolution,
      emergencyContact: eventDetails.emergencyContact,
    };

    try {
      const response = await axios.post('http://localhost:4000/events', eventData); // Replace with your backend events endpoint
      if (response.status === 201) {
        alert('Event created successfully!');
        setEventDetails({
          summary: '',
          location: 'Rideau',
          description: '',
          start: '',
          end: '',
          FirstName: '',
          LastName: '',
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
        fetchAttendanceData(); // Refresh the data
      }
    } catch (err) {
      console.error('Error creating event:', err);
      alert('An error occurred while creating the event.');
    }
>>>>>>> 0c5c37cb0a6a9453ac7e50164dec28fe0fe57b01
  };

  return (
    <div>
      <h1>Attendance Sheet</h1>
<<<<<<< HEAD
      <table>
        <colgroup>
          <col />
          <col className="status-col" />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        {attendanceData && (
          <tbody>
            {attendanceData.map(student => (
              <tr key={student.id}>
                <td>{student.nom}, {student.prenom}</td>
                <td>{student.status}</td>
                <td>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      className="checkbox"
                      id={`toggle-${student.id}`}
                      checked={student.status === 'Present'}
                      onChange={() => toggleAttendance(student.id)}
                    />
                    <label className="label" htmlFor={`toggle-${student.id}`}>
                      <span className="inner" />
                      <span className="switch" />
                    </label>
                  </div>
=======

      {/* Attendance Table */}
      <div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map(student => (
              <tr key={student.id}>
                <td>{`${student.nom}, ${student.prenom}`}</td>
                <td>{student.status || 'Not Marked'}</td>
                <td>
                  <button onClick={() => markAttendance(student.id, 'Present')}>Present</button>
                  <button onClick={() => markAttendance(student.id, 'Absent')}>Absent</button>
>>>>>>> 0c5c37cb0a6a9453ac7e50164dec28fe0fe57b01
                </td>
              </tr>
            ))}
          </tbody>
<<<<<<< HEAD
        )}
      </table>
      <div className="attendance-actions">
        <button onClick={() => toggleAllAttendance()}>
          {attendanceData.every(student => student.status === 'Present') ? 'Mark All Absent' : 'Mark All Present'}
        </button>
        <button>Submit</button>
=======
        </table>
      </div>

      {/* Event Creation Form */}
      <div>
        
>>>>>>> 0c5c37cb0a6a9453ac7e50164dec28fe0fe57b01
      </div>
    </div>
  );
};

export default Attendance;
