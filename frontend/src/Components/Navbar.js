// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a CSS file for styling

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="hamburger-menu">☰</button>
        <Link to="/" className="app-name">Home</Link>
      </div>
      <div className="navbar-center">
        <Link to="/calendar" className="nav-link">Calendar</Link>
        <Link to="/admin" className="nav-link">Admin</Link>
       {/* <Link to="/admin-dashboard" className="nav-link">Admin Dashboard</Link>   */}
      </div>
      <div className="navbar-right">
      </div>
    </div>
  );
};

export default Navbar;
