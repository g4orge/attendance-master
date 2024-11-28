// src/App.js
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Pages/HomePage';
import MainCalendar from './Pages/MainCalendar';
import Admin from './Pages/Admin';
import CreateEvent from './Components/CreateEvent';
import Attendance from './Pages/Attendance';
//import useApiCall from './Components/ApiCall';


 function App() {
  return (
    <Router>
      <Routes>
        {/* Layout will always render as a wrapper for child routes */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes */}
          <Route index element={<HomePage />} />
          <Route path="calendar" element={<MainCalendar />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="admin" element={<Admin />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;