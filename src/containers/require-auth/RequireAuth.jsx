import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RequireAuth = () => {
  const userState = useSelector(state => state.user);
  const location = useLocation();

  return (
    userState?.token === null
      ? 
      location.pathname === '/' ? 
        <Navigate to="/login" state={{ from: location }} replace /> 
        : 
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      : <Outlet />
  );
};