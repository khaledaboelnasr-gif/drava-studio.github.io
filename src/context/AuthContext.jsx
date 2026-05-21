// ─────────────────────────────────────────────────────────────────────────────
// FILE: frontend/src/context/AuthContext.jsx
// PURPOSE: Global authentication state using React Context API.
//
// WHAT IS REACT CONTEXT?
//   It creates a "global state" that any component in the tree can access
//   directly, without passing props manually through every level ("prop drilling").
//
// HOW TO USE IN A COMPONENT:
//   import { useAuth } from '../context/AuthContext';
//   const { user, logout, isAuthenticated } = useAuth();
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useState, useContext } from 'react';

// createContext() creates a Context object with a default value of null.
const AuthContext = createContext(null);

// AuthProvider wraps the entire app (in App.js) so all children can access auth state.
export const AuthProvider = ({ children }) => {

  // Initialize state from localStorage so the user stays logged in after a page refresh.
  // The function inside useState (lazy initialization) only runs once on mount.
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('dravaUser');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null; // If parsing fails (corrupt data), start fresh
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('dravaToken') || null);

  // ── login(): Call this after a successful POST /api/auth/login response ──
  // userData: { _id, name, email, role } | authToken: The JWT string
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    // Persist to localStorage so auth survives page refreshes
    localStorage.setItem('dravaUser', JSON.stringify(userData));
    localStorage.setItem('dravaToken', authToken);
  };

  // ── logout(): Clears all auth state ──────────────────────────────────────
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('dravaUser');
    localStorage.removeItem('dravaToken');
  };

  // !! converts to boolean: null → false, object → true
  const isAuthenticated = !!user;

  // The "value" prop is what components receive when they call useAuth()
  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// ── useAuth(): Custom hook — shortcut so components don't need to import ──
// both useContext and AuthContext separately.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an <AuthProvider>. Check your App.js.');
  }
  return context;
};

export default AuthContext;
