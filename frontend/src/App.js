// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import MainCalendar from './Pages/MainCalendar';
import Admin from './Pages/Admin';
import CreateEvent from './Components/CreateEvent';
import Attendance from './Pages/Attendance';
import useApiCall from './Components/ApiCall';


function App() {
  const { isSignedIn, handleSignOutClick, handleAuthClick } = useApiCall();

  useEffect(() => { console.log(isSignedIn)}, [isSignedIn]);

  const handleLogin = () => {
    handleAuthClick();
  };

  const handleLogout = () => {
    handleSignOutClick();
  };

  return (
    <Router>
      <Routes>

        {/* Protected routes with Layout (Navbar) */}
        <Route path= "/" element={isSignedIn ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route index element={<HomePage />} />
          <Route path="calendar" element={<MainCalendar />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="admin" element={<Admin />} />
          <Route path="attendance" element={<Attendance />} />
      </Routes>
    </Router>
  );
}

export default App;
