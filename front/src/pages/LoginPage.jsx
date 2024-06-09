import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div>
            {isRegistering ? (
                <RegisterForm toggleForm={toggleForm} />
            ) : (
                <LoginForm toggleForm={toggleForm} />
            )}
        </div>
    );
};

export default LoginPage;
