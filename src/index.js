// ─────────────────────────────────────────────────────────────────────────────
// FILE: frontend/src/index.js
// PURPOSE: The entry point of the React application.
//
// WHAT HAPPENS HERE:
//   React renders your entire component tree into a single <div id="root">
//   element in public/index.html. This is how a React "Single Page Application"
//   works — the server sends one HTML file, and React handles all navigation
//   and UI updates in the browser using JavaScript.
//
// YOU RARELY EDIT THIS FILE after initial setup.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import ReactDOM from 'react-dom/client';

// Global CSS — imported here so it applies to the entire app
import './index.css';

// The root App component — contains all routing and providers
import App from './App';

// ReactDOM.createRoot() is React 18's way of mounting the application.
// It targets the <div id="root"> in public/index.html.
const root = ReactDOM.createRoot(document.getElementById('root'));

// StrictMode is a development tool that highlights potential problems.
// It renders components twice in development to detect side effects.
// It has NO effect in production builds.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
