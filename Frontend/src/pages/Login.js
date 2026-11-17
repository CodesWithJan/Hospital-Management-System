
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            alert('Please enter email and password');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-icon">🏥</div>

                <h2>Hospital Management</h2>
                <p className="login-subtitle">
                    Welcome Back! Please Login
                </p>

                <form onSubmit={handleLogin}>
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>
                </form>

                <p className="login-footer">
                    © 2026 Hospital Management System
                </p>
            </div>
        </div>
    );
}

export default Login;
