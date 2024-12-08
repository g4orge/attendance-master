import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ isAuthenticated, onLogout }) => {
    return (
        <div>
            <Navbar isAuthenticated={isAuthenticated} onLogout={onLogout} />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
