// src/Components/Attendance.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { attendanceData } from './Router';

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
  nombreEnfants: 0,
  nomPremierEnfant: '',
  age: 0,
  besoinsSpec: '',
}

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users');
      const data = response.data.map(item => ({
        ...Student,
        ...item,
      }));
      setAttendanceData(data);
      console.log(`my name os helga : ${JSON.stringify(data)}`);
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

  return (
    <div>
      <h1>Attendance Sheet</h1>
      <table>
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
              <td>{null}</td>
              <td>
                <button onClick={() => markAttendance(student.id, 'Present')}>Present</button>
                <button onClick={() => markAttendance(student.id, 'Absent')}>Absent</button>
              </td>
            </tr>
          ))}
        </tbody>
        )}
      </table>
    </div>
  );
};

export default Attendance;