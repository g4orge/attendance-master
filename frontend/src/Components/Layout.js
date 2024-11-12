// Layout.js
import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Outlet /> {/* Renders the matched child route */}
      </div>
    </div>
  );
};

export default Layout;
