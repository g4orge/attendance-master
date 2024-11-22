// src/Components/Attendance.js
import React, { useState } from 'react';
//import { attendanceData } from './Router';

const Attendance = () => {
  const [data, setData] = useState();

  const markAttendance = (studentId, status) => {
    setData(prevData =>
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
        <tbody>
          {data.map(student => (
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
      </table>
    </div>
  );
};

export default Attendance;