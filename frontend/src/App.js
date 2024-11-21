// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
//import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import MainCalendar from './Pages/MainCalendar';
import Admin from './Pages/Admin';
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
        <Route path= "/" element={<Layout/>} />
          <Route index element={<HomePage />} />
          <Route path="calendar" element={<MainCalendar />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
