// src/Components/Attendance.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { attendanceData } from './Router';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState();

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users');
      setAttendanceData(response.data);
      console.log(`my name os helga : ${response.data}`);
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
              <td>{student.name}</td>
              <td>{student.status}</td>
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