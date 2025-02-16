// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  // While authentication status is loading, show a loader
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is authenticated, render child routes; otherwise, redirect to login
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
