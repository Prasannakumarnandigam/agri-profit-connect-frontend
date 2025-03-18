import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import AgencyDashboard from './pages/AgencyDashboard';
import './styles/App.css';

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <div className="App">
                <Navbar user={user} setUser={setUser} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/farmer-dashboard" element={<FarmerDashboard user={user} />} />
                    <Route path="/agency-dashboard" element={<AgencyDashboard user={user} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;