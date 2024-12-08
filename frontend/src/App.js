import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import MainCalendar from './Pages/MainCalendar';
import Admin from './Pages/Admin';
import CreateEvent from './Components/CreateEvent';
import Attendance from './Pages/Attendance';
import Login from './Pages/Login';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout isAuthenticated={isAuthenticated} />}>
                    <Route
                        index
                        element={
                            isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={() => setIsAuthenticated(true)} />
                        }
                    />
                    <Route
                        path="home"
                        element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
                    />
                    <Route
                        path="calendar"
                        element={isAuthenticated ? <MainCalendar /> : <Navigate to="/" />}
                    />
                    <Route
                        path="create-event"
                        element={isAuthenticated ? <CreateEvent /> : <Navigate to="/" />}
                    />
                    <Route
                        path="admin"
                        element={isAuthenticated ? <Admin /> : <Navigate to="/" />}
                    />
                    <Route
                        path="attendance"
                        element={isAuthenticated ? <Attendance /> : <Navigate to="/" />}
                    />
                    {/* Add Forgot Password Route */}
                    <Route
 />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
