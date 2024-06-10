import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import "../styles/Form.css"
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import {  toast } from 'react-toastify';


const LoginForm = ({ toggleForm }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const { handleLogin } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/token/', formData);
            toast.success("Zalogowano pomyślnie")
            handleLogin(response.data.access, response.data.refresh);
            navigate('/'); 
        } catch (error) {
            toast.error("Błąd logowania")
            setError('Nie udało się zalogować');
        }
    };

    return (
        <div className="conatainer">
            
            <form onSubmit={handleSubmit} className="form-container">
            {error && <p className="error-message">{error}</p>}
                <h1>Zaloguj się</h1>
                <input
                    className="form-input"
                    name='username'
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Login"
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
                <button className="form-button" type="submit">
                    Zaloguj się
                </button>
                Nie masz konta? <Link onClick={toggleForm} className="link-button">Zarejestruj się</Link>
            </form>
        </div>
    );
};

export default LoginForm;
