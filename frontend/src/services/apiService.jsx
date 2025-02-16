// src/services/apiService.js
import axios from 'axios';

// Create an Axios instance with common configuration
const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true, // to send cookies in requests
  timeout: 15000, // 15 seconds timeout
});

// Request interceptor (for example, adding auth tokens)
apiService.interceptors.request.use(
  (config) => {
    // Optionally attach headers, e.g., Authorization if you store a token
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (to handle responses globally)
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can add global error handling here.
    // For instance, log out user on 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Optionally clear tokens and redirect to login.
      localStorage.removeItem('userType');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiService;
