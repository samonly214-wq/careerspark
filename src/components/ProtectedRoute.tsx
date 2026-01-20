import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Simple wrapper to protect routes. If `role` is provided, require that role on the profile.
export function ProtectedRoute({ children, role }: { children: React.ReactElement; role?: string }) {
  const { user, profile, loading } = useAuth();

  if (loading) return null; // or a spinner

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && profile?.role !== role) {
    // if role doesn't match, redirect to home or unauthorized page
    return <Navigate to="/" replace />;
  }

  return children;
}
