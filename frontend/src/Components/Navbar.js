// src/Components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="hamburger-menu">☰</button>
        <Link to="/" className="app-name">Home</Link>
      </div>
      <div className="navbar-center">
        <Link to="/calendar" className="nav-link">Calendar</Link>
        <Link to="/admin" className="nav-link">Admin</Link>
      </div>
      <div className="navbar-right">
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
