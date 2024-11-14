// src/Components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ onLogout }) => {
  return (
    <div>
      <Navbar onLogout={onLogout} />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;