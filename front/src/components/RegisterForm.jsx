import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import "../styles/Form.css"
import { Link } from 'react-router-dom';
import {  toast } from 'react-toastify';

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

    const validateEmail = (email) => {
        // Simple regex for email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            toast.warning('Nieprawidłowy format adresu e-mail');
            return;
        }
        try {
            await api.post('/api/user/register/', formData);  
            toast.success("Pomyślnie utworzono konto")         
            window.location.replace('/login'); 
        } catch (error) {
            setError('Nie udało się zarejestrować');
            toast.error("Nie udało się zarejestrować")
        }
    };

    return (
        <div className="form-container">
            <h2>Zarejestruj się</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    className="form-input"
                    name='username'
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nazwa użytkownika"
                    requred
                />
                <input
                    className="form-input"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Hasło"
                    name='password'
                    required
                />
                <input
                    className="form-input"
                    name='email'
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    requred
                />
                <input
                    className="form-input"
                    name='first_name'
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Imię"
                    requred
                />
                <input
                    className="form-input"
                    name='last_name'
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Nazwisko"
                    requred
                />
                <button type="submit" className="form-button">Zarejestru się</button>
                Masz już konto? <Link onClick={toggleForm} className="link-button">Zaloguj się</Link>
            </form>           
        </div>
    );
};

export default RegisterForm;
