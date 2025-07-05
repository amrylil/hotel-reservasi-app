import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the context
const AuthContext = createContext(null);

/**
 * 2. Create the AuthProvider component
 * This component will wrap your application and provide authentication state
 * to all children components.
 */
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Check for an authentication token in localStorage when the app loads
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you might want to verify the token with your backend here
      setIsLoggedIn(true);
    }
    setLoading(false); // Finished checking
  }, []);

  const login = (token) => {
    // Save token to localStorage and update state
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Remove token from localStorage and update state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // The value provided to consuming components
  const value = {
    isLoggedIn,
    loading, // Provide loading state to consumers
    login,
    logout,
  };

  // We don't render the rest of the app until the initial auth check is complete
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

/**
 * 3. Create a custom hook for easy access to the context
 * This hook will be used by components to get the authentication state and functions.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
