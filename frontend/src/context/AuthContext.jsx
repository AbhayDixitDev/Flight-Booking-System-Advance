// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import apiService from '../services/apiService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Memoize loadUser so it doesn't change on every render
  const loadUser = useCallback(async () => {
    try {
      const response = await apiService.get('/user/profile');
      setUser(response.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only attempt to load user if there's an indicator (e.g., localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Login function remains the same
  const login = async (credentials) => {
    try {
      const response = await apiService.post('/user/login', credentials);
      setUser(response.data.data);
      localStorage.setItem('user', JSON.stringify(response.data.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await apiService.get('/user/logout');
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ user, loading, login, logout, loadUser }), [
    user,
    loading,
    login,
    logout,
    loadUser,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
