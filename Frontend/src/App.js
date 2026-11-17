
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Patient from './pages/Patients';
import Appointment from './pages/Appointment';
import Prescription from './pages/Prescription';
import Department from './pages/Department';
import Billing from './pages/Billing';

import './App.css';

function Layout({ children }) {
    return (
        <div className="app-layout">
            <Sidebar />

            <div className="main-section">
                <Navbar />

                <div className="page-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login */}
                <Route path="/" element={<Login />} />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={<Layout><Dashboard /></Layout>}
                />

                {/* Doctors */}
                <Route
                    path="/doctors"
                    element={<Layout><Doctors /></Layout>}
                />

                {/* Patients */}
                <Route
                    path="/patients"
                    element={<Layout><Patient /></Layout>}
                />

                {/* Appointments */}
                <Route
                    path="/appointments"
                    element={<Layout><Appointment /></Layout>}
                />

                {/* Prescriptions */}
                <Route
                    path="/prescriptions"
                    element={<Layout><Prescription /></Layout>}
                />

                {/* Departments */}
                <Route
                    path="/departments"
                    element={<Layout><Department /></Layout>}
                />

                {/* Billing */}
                <Route
                    path="/billing"
                    element={<Layout><Billing /></Layout>}
                />

                {/* Unknown URL */}
                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
