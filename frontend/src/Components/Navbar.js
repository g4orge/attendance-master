import React from 'react';
import { Link } from 'react-router-dom';
import dandelion from '../Assets/dandelion.png';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <img src={dandelion} alt="App Logo" className="app-logo" />
                {isAuthenticated && <Link to="/home" className="app-name">Home</Link>}
            </div>
            <div className="navbar-center">
                {isAuthenticated && (
                    <>
                        <Link to="/calendar" className="nav-link">Calendar</Link>
                        <Link to="/admin" className="nav-link">Admin</Link>
                        <Link to="/attendance" className="nav-link">Attendance</Link>
                    </>
                )}
            </div>
            <div className="navbar-right">
                {isAuthenticated ? (
                    <button onClick={onLogout} className="logout-button">Logout</button>
                ) : (
                    <Link to="/" className="nav-link">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
