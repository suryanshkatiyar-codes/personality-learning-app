import axios from 'axios';

// Create an axios instance with base URL
// So we don't have to type http://localhost:5000 every time
const API = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // This sends cookies with every request automatically
});

// Interceptor - runs BEFORE every request is sent
// This is where we attach the token to every request
API.interceptors.request.use((config) => {
  
  // Get token from localStorage
  const token = localStorage.getItem('token');

  // If token exists, attach it to the request headers
  // This is how protected routes know who you are
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;