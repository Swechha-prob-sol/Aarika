import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { currentUser, showLoginModal, loginModalOpen } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      showLoginModal(true);
    }
  }, [currentUser, showLoginModal]);

  if (!currentUser) {
    if (!loginModalOpen) {
      return <Navigate to="/" replace />;
    }
    return null;
  }

  return children;
}
