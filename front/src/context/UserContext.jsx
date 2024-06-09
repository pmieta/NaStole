import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { isTokenExpired } from '../authUtils';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from local storage on initial load
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token && !isTokenExpired(token)) {
      loadUser();
    } else {
      handleLogout();
    }
  }, []);

  const loadUser = async () => {
    try {
      const response = await api.get('/api/user/', {
        headers: {
          'x-include-token': true
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error loading user:', error);
      handleLogout();
    }
  };

  const handleLogin = (token, refreshToken) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    console.log("handling login")
    loadUser();
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setUser(null);
    navigate('/login');
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
