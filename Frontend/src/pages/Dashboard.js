
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard-container">

            <aside className="dashboard-sidebar">
                <h2>🏥 MediCare</h2>

                <nav>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/doctors">Doctors</Link>
                    <Link to="/patients">Patients</Link>
                    <Link to="/departments">Departments</Link>
                    <Link to="/appointments">Appointments</Link>
                    <Link to="/prescriptions">Prescriptions</Link>
                    <Link to="/billing">Billing</Link>
                </nav>
            </aside>

            <main className="dashboard-main">

                <header className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome to Hospital Management System</p>
                    </div>
                    <span className="admin-profile">Admin 👤</span>
                </header>

                <div className="dashboard-cards">

                    <div className="dashboard-card">
                        <h3>👨‍⚕️ Doctors</h3>
                        <h1>10</h1>
                        <Link to="/doctors">View Doctors →</Link>
                    </div>

                    <div className="dashboard-card">
                        <h3>🧑 Patients</h3>
                        <h1>25</h1>
                        <Link to="/patients">View Patients →</Link>
                    </div>

                    <div className="dashboard-card">
                        <h3>📅 Appointments</h3>
                        <h1>15</h1>
                        <Link to="/appointments">View Appointments →</Link>
                    </div>

                    <div className="dashboard-card">
                        <h3>🏢 Departments</h3>
                        <h1>8</h1>
                        <Link to="/departments">View Departments →</Link>
                    </div>

                </div>

                <div className="dashboard-welcome">
                    <h2>Welcome to MediCare Hospital</h2>
                    <p>
                        Manage doctors, patients, appointments,
                        prescriptions and billing in one place.
                    </p>
                </div>

            </main>
        </div>
    );
}

export default Dashboard;
