import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const RegisterForm = ({ toggleForm }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/user/register/', formData);
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
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
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p className="toggle-text">
                Already have an account? <button onClick={toggleForm} className="link-button">Login</button>
            </p>
        </div>
    );
};

export default RegisterForm;
