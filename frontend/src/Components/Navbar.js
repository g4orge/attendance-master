// src/Components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import dandelion from '../Assets/dandelion.png';
import useApiCall from '../Components/ApiCall';
import './Navbar.css';

const Navbar = () => {
  const {
    isSignedIn,
    handleAuthClick,
    handleSignOutClick,
  } = useApiCall();

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={dandelion} alt="App Logo" className="app-logo" />
        <Link to="/" className="app-name">Home</Link>
      </div>
      <div className="navbar-center">
        <Link to="/calendar" className="nav-link">Calendar</Link>
        <Link to="/admin" className="nav-link">Admin</Link>
      </div>
      <div className="navbar-right">
      {!isSignedIn ? (
        <button onClick={handleAuthClick}>Sign in</button>
      ) : (
        <button onClick={handleSignOutClick} className="logout-button">Logout</button>
      )}
      </div>
    </div>
  );
};

export default Navbar;
