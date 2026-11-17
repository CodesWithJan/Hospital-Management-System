
import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <div className="navbar">
            <h3>Hospital Management System</h3>

            <div className="navbar-profile">
                <span>Admin</span>
                <span className="profile-icon">👤</span>
            </div>
        </div>
    );
}

export default Navbar;
