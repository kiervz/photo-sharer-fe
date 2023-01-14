import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RequireAuth = () => {
  const userState = useSelector(state => state.user);
  const location = useLocation();

  return (
    userState?.token != ''
      ? <Outlet />
      : <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};