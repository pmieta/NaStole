import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import { isTokenExpired } from './authUtils';

const apiUrl = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || apiUrl,
});

api.interceptors.request.use(
  async (config) => {
    // Check if the request should include the token
    if (config.headers['x-include-token']) {
      let token = localStorage.getItem(ACCESS_TOKEN);

      if (isTokenExpired(token)) {
        token = await refreshToken();
        if (token) {
          localStorage.setItem(ACCESS_TOKEN, token);
        } else {
          console.error("Token refresh failed. Redirecting to login.");
          localStorage.clear();
          window.location.href = '/login';
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Remove custom header before sending the request
      delete config.headers['x-include-token'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export default api;
