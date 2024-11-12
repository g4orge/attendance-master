// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Components/HomePage';
import MainCalendar from './Components/MainCalendar'; // Main calendar view
import Admin from './Components/Admin'; // Admin panel
import CreateEvent from './Components/CreateEvent';
{/*import AdminDashboard from './Components/AdminDashboard';*/}

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout with Navbar as the main container */}
        <Route path="/" element={<Layout />}>
          
          <Route index element={<HomePage />} /> 
          <Route path="calendar" element={<MainCalendar />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="admin" element={<Admin />} />
          {/*<Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
