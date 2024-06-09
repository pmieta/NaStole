import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const LoginForm = ({ toggleForm }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/token/', formData);
            localStorage.setItem('ACCESS_TOKEN', response.data.access);
            localStorage.setItem('REFRESH_TOKEN', response.data.refresh);
            navigate('/'); // Redirect to homepage or dashboard
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p className="toggle-text">
                Don't have an account? <button onClick={toggleForm} className="link-button">Register</button>
            </p>
        </div>
    );
};

export default LoginForm;
