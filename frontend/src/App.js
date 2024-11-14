// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Components/HomePage';
import MainCalendar from './Components/MainCalendar';
import Admin from './Components/Admin';
import CreateEvent from './Components/CreateEvent';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>

        {/* Protected routes with Layout (Navbar) */}
        <Route
          path="/"
          element={isLoggedIn ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" />}
        >
          <Route index element={<HomePage />} />
          <Route path="calendar" element={<MainCalendar />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
