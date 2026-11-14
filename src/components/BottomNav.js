import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function BottomNav() {
  const { currentUser, showLoginModal } = useAuth();
  const navigate = useNavigate();

  function handleProtected(e, path) {
    if (!currentUser) {
      e.preventDefault();
      showLoginModal(false);
    } else {
      navigate(path);
    }
  }

  return (
    <nav className="bottom-nav">
      <Link to="/" className="bottom-nav-item">
        <span className="icon">🏠</span>
        <span className="text">Home</span>
      </Link>
      <Link
        to="/my-account"
        className="bottom-nav-item"
        onClick={(e) => handleProtected(e, '/my-account')}
      >
        <span className="icon">👤</span>
        <span className="text">You</span>
      </Link>
      <Link to="/menu" className="bottom-nav-item">
        <span className="icon">☰</span>
        <span className="text">Menu</span>
      </Link>
      <Link
        to="/cart"
        className="bottom-nav-item"
        onClick={(e) => handleProtected(e, '/cart')}
      >
        <span className="icon">🛒</span>
        <span className="text">Cart</span>
      </Link>
    </nav>
  );
}
