
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">🏥 MediCare</h2>

            <nav>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/doctors">Doctors</Link>
                <Link to="/patients">Patients</Link>
                <Link to="/appointments">Appointments</Link>
                <Link to="/prescriptions">Prescriptions</Link>
                <Link to="/departments">Departments</Link>
                <Link to="/billing">Billing</Link>
            </nav>
        </div>
    );
}

export default Sidebar;
