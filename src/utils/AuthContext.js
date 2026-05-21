// ============================================================
// FILE: frontend/src/utils/AuthContext.js
// PURPOSE: React Context for global authentication state.
//
// WHAT IS CONTEXT?
//   Normally in React, data flows down from parent to child via "props".
//   Context lets you share data across the ENTIRE component tree
//   without passing props through every level ("prop drilling").
//
//   AuthContext stores: the logged-in client's data + login/logout functions.
//   Any component that needs to know "is the user logged in?" can just use:
//   const { client, login, logout } = useAuth();
//
// HOW IT WORKS:
//   1. AuthProvider wraps the entire app in App.js
//   2. It holds auth state and provides it to all children
//   3. Components call useAuth() to access that state
// ============================================================

import React, { createContext, useState, useContext, useEffect } from "react";

// ---------------------------------------------------------------
// Create the Context
// ---------------------------------------------------------------
// createContext() creates a Context object.
// The value passed here is the default (used if no Provider wraps the component — rare).
const AuthContext = createContext(null);

// ---------------------------------------------------------------
// AuthProvider Component
// ---------------------------------------------------------------
// This component wraps your app and makes auth state available everywhere.
// "children" = everything nested inside <AuthProvider> in App.js
export const AuthProvider = ({ children }) => {
  // "client" holds the logged-in user's data (name, email, role, token)
  // OR null if not logged in
  const [client, setClient] = useState(null);

  // "isLoading" is true while we check localStorage on first load
  // This prevents a flash of "logged out" UI before we've checked
  const [isLoading, setIsLoading] = useState(true);

  // ---------------------------------------------------------------
  // CHECK FOR STORED SESSION ON MOUNT
  // ---------------------------------------------------------------
  // useEffect with [] runs ONCE when the component first mounts.
  // We check if the user was already logged in from a previous visit
  // by looking for their data in localStorage.
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("drava_token");
      const storedClient = localStorage.getItem("drava_client");

      if (storedToken && storedClient) {
        // Parse the stored JSON string back into an object
        setClient(JSON.parse(storedClient));
      }
    } catch (error) {
      // localStorage data was corrupted — clear it
      localStorage.removeItem("drava_token");
      localStorage.removeItem("drava_client");
    } finally {
      // Whether or not we found a session, we're done loading
      setIsLoading(false);
    }
  }, []); // Empty dependency array = run once on mount

  // ---------------------------------------------------------------
  // LOGIN FUNCTION
  // ---------------------------------------------------------------
  // Called by the Login component after a successful API response.
  // Receives the full response data from POST /api/auth/login.
  // Stores the token + client info in localStorage for persistence.
  const login = (responseData) => {
    const { token, ...clientData } = responseData; // Destructure token out separately

    // Store token separately (used by axios interceptor in api.js)
    localStorage.setItem("drava_token", token);

    // Store client info (name, email, role, etc.) — NOT the password
    localStorage.setItem("drava_client", JSON.stringify(clientData));

    // Update React state — this triggers re-renders in subscribed components
    setClient(clientData);
  };

  // ---------------------------------------------------------------
  // LOGOUT FUNCTION
  // ---------------------------------------------------------------
  // Clears stored data and resets state — user is now logged out.
  const logout = () => {
    localStorage.removeItem("drava_token");
    localStorage.removeItem("drava_client");
    setClient(null); // Triggers re-renders — UI will show logged-out state
  };

  // ---------------------------------------------------------------
  // Provide the auth state and functions to all children
  // ---------------------------------------------------------------
  // AuthContext.Provider wraps the children and injects the "value" prop
  // into the context — any component calling useAuth() gets this value.
  return (
    <AuthContext.Provider value={{ client, login, logout, isLoading }}>
      {/* Don't render children until we know the auth state (prevents flash) */}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// ---------------------------------------------------------------
// Custom Hook: useAuth
// ---------------------------------------------------------------
// A convenience wrapper so components can write:
//   const { client } = useAuth();
// instead of:
//   const { client } = useContext(AuthContext);
//
// Also adds a safety check — if used outside AuthProvider, throws a clear error.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
