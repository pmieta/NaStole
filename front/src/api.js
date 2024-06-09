import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import { isTokenExpired } from './authUtils';

const apiUrl = "http://127.0.0.1:8000"; // Base URL for the API

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || apiUrl, // Use environment variable or default
});

// Function to handle token refresh
const refreshToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!refreshToken) return null;

  try {
    const response = await axios.post(`${apiUrl}/api/token/refresh/`, { refresh: refreshToken });
    return response.data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

// Request interceptor to handle token inclusion and refresh
api.interceptors.request.use(
  async (config) => {
    // Check if token should be included in the request
    if (config.headers['x-include-token']) {
      let token = localStorage.getItem(ACCESS_TOKEN);

      if (isTokenExpired(token)) {
        token = await refreshToken();
        if (token) {
          localStorage.setItem(ACCESS_TOKEN, token);
        } else {
          console.error("Token refresh failed. Redirecting to login.");
          // localStorage.clear();
          localStorage.removeItem(ACCESS_TOKEN)
          localStorage.removeItem(REFRESH_TOKEN)
          window.location.href = '/login';
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Remove the custom header to avoid issues with the API
      delete config.headers['x-include-token'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
