// ─────────────────────────────────────────────────────────────────────────────
// FILE: frontend/src/utils/api.js
// PURPOSE: Centralized Axios HTTP client with automatic auth header injection.
//
// WHY USE AN AXIOS INSTANCE?
//   Instead of writing the full URL every time (http://localhost:5000/api/...),
//   we create a pre-configured instance with:
//   1. baseURL  — All requests prepend this (so you just write '/projects')
//   2. Interceptors — Auto-attach JWT token to every request's headers
//
// USAGE EXAMPLE:
//   import api from '../utils/api';
//   const { data } = await api.get('/projects');           // GET /api/projects
//   const { data } = await api.post('/contact', formData); // POST /api/contact
// ─────────────────────────────────────────────────────────────────────────────

import axios from 'axios';

// ─────────────────────────────────────────────────────────────────────────────
// CREATE THE AXIOS INSTANCE
// axios.create() returns a new Axios instance with default configuration.
// ─────────────────────────────────────────────────────────────────────────────
const api = axios.create({
  // process.env.REACT_APP_API_URL reads from the frontend .env file.
  // In development: http://localhost:5000/api
  // In production:  https://your-backend-url.railway.app/api
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',

  // Default headers sent with every request
  headers: {
    'Content-Type': 'application/json',
  },

  // Timeout in milliseconds — if server doesn't respond in 10s, reject the request
  timeout: 10000,
});

// ─────────────────────────────────────────────────────────────────────────────
// REQUEST INTERCEPTOR
// PURPOSE: Runs BEFORE every request — a perfect place to attach the JWT token.
//
// HOW INTERCEPTORS WORK:
//   axios.interceptors.request.use(onFulfilled, onRejected)
//   - onFulfilled: receives the request config object; we modify and return it
//   - onRejected: handles errors in the request setup phase
// ─────────────────────────────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // Retrieve the JWT token stored in localStorage after login.
    // localStorage persists data across browser sessions.
    const token = localStorage.getItem('dravaToken');

    if (token) {
      // Attach the token in the Authorization header in Bearer format.
      // Our authMiddleware.js on the backend looks for exactly this.
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // IMPORTANT: always return config, or the request won't proceed
  },
  (error) => {
    // Something went wrong SETTING UP the request (rare)
    return Promise.reject(error);
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSE INTERCEPTOR
// PURPOSE: Runs AFTER every response — handle global error cases here.
// ─────────────────────────────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => {
    // If the response is successful (2xx), just pass it through unchanged
    return response;
  },
  (error) => {
    // If we get a 401 (Unauthorized), the token has expired or is invalid.
    // Clear the stored token and redirect to login.
    if (error.response?.status === 401) {
      localStorage.removeItem('dravaToken');
      localStorage.removeItem('dravaUser');
      // Redirect to home — user needs to log in again
      // We use window.location instead of React Router here because this
      // interceptor lives outside any React component.
      if (window.location.pathname !== '/login') {
        window.location.href = '/';
      }
    }

    // For all other errors, reject the promise so the calling code can catch it
    return Promise.reject(error);
  }
);

export default api;
