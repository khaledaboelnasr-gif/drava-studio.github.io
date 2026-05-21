// ─────────────────────────────────────────────────────────────────────────────
// FILE: frontend/src/App.js
// PURPOSE: Root component — sets up React Router and wraps the app in providers.
//
// REACT ROUTER v6 CONCEPTS:
//   BrowserRouter: Uses the browser's URL history API for navigation.
//                  Wraps everything that needs routing.
//   Routes:        Container for all <Route> definitions.
//   Route:         Maps a URL path to a component.
//                  path="/"       → render <HomePage />
//                  path="/portfolio" → render <PortfolioPage />
//
// WHY WRAP IN <AuthProvider>?
//   Any component inside <AuthProvider> can call useAuth().
//   Since we wrap the whole app, every component has auth access.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';

// React Router v6 imports — these handle URL-based navigation without page reloads
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Global authentication state provider
import { AuthProvider } from './context/AuthContext';

// Page components (each represents a full "page" at a specific URL)
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';

// Navbar and Footer appear on ALL pages, so they're outside <Routes>
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// ─────────────────────────────────────────────────────────────────────────────
// ROOT COMPONENT: App
// This is the top-level component rendered by index.js.
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  return (
    // AuthProvider gives ALL components access to auth state via useAuth()
    <AuthProvider>
      {/* BrowserRouter enables URL-based navigation via React Router */}
      <BrowserRouter>
        {/* Navbar renders on every page (outside Routes) */}
        <Navbar />

        {/* Routes = a switch statement for URLs.
            Only the FIRST matching <Route> renders its component. */}
        <Routes>
          {/* "/" = the homepage (scroll SPA with Hero, About, Services, Contact) */}
          <Route path="/" element={<HomePage />} />

          {/* "/portfolio" = the dedicated portfolio gallery page */}
          <Route path="/portfolio" element={<PortfolioPage />} />

          {/* Catch-all 404 route — matches anything not matched above */}
          {/* TODO: Create a NotFoundPage component */}
          <Route path="*" element={
            <div style={{
              minHeight: '60vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Orbitron, monospace',
              color: '#00f5ff',
            }}>
              <h1 style={{ fontSize: '6rem', margin: 0 }}>404</h1>
              <p style={{ color: '#8888aa' }}>This page doesn't exist in our universe.</p>
            </div>
          } />
        </Routes>

        {/* Footer renders on every page */}
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
