// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1>Welcome</h1>
      <p>Your tool for managing and tracking events and campers with Google Calendar.</p>

      <div className="homepage-links">
        <div className="homepage-section">
          <h2>Calendar</h2>
          <p>Access and manage your calendar events, view upcoming events, and create new ones.</p>
          <Link to="/calendar" className="homepage-button">Go to Calendar</Link>
        </div>

        <div className="homepage-section">
          <h2>Admin</h2>
          <p>Admin interface for managing events, including editing, deleting, and restoring events.</p>
          <Link to="/admin" className="homepage-button">Go to Admin</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
