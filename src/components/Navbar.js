import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SearchModal from './SearchModal';

export default function Navbar() {
  const { cartCount, wishlistCount } = useCart();
  const { currentUser, showLoginModal } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  function handleSearchClick(e) {
    e.preventDefault();
    setSearchOpen(true);
  }

  function handleProtectedClick(e, path) {
    if (!currentUser) {
      e.preventDefault();
      showLoginModal(false);
    } else if (path) {
      navigate(path);
    }
  }

  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        <p>Free Shipping on all orders above ₹999 | Easy 7 Days Returns</p>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <Link to="/"><img src="/photos/logo.png" alt="Aarika Logo" className="logo-img" /></Link>
          </div>

          <div className="nav-center">
            <div className={`menu-icon ${menuOpen ? 'open' : ''}`}>
              <span className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</span>
              <ul className="nav-menu">
                <li><Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><Link to="/women" className="nav-link" onClick={() => setMenuOpen(false)}>Women</Link></li>
                <li><Link to="/men" className="nav-link" onClick={() => setMenuOpen(false)}>Men</Link></li>
                <li><Link to="/kids" className="nav-link" onClick={() => setMenuOpen(false)}>Kids</Link></li>
                <li><Link to="/new-arrivals" className="nav-link" onClick={() => setMenuOpen(false)}>New Arrival</Link></li>
                <li><Link to="/sales" className="nav-link" onClick={() => setMenuOpen(false)}>Sale</Link></li>
                <li><Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</Link></li>
                {!currentUser && <li><Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</Link></li>}
                {!currentUser && <li><Link to="/signup" className="nav-link" onClick={() => setMenuOpen(false)}>Signup</Link></li>}
                {currentUser && <li><Link to="/my-account" className="nav-link" onClick={() => setMenuOpen(false)}>My Account</Link></li>}
              </ul>
            </div>
          </div>

          <div className="nav-icons">
            <button
              type="button"
              className="icon-link search-icon-btn"
              title="Search"
              onClick={handleSearchClick}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', color: 'inherit' }}
            >
              🔍
            </button>

            <Link
              to="/wishlist"
              className="icon-link"
              title="Wishlist"
              onClick={(e) => handleProtectedClick(e, '/wishlist')}
            >
              ♡
              {wishlistCount > 0 && <span className="wishlist-count-badge" style={{ display: 'inline-block' }}>{wishlistCount}</span>}
            </Link>

            <Link
              to="/cart"
              className="icon-link"
              title="Cart"
              onClick={(e) => handleProtectedClick(e, '/cart')}
            >
              🛒
              {cartCount > 0 && <span className="cart-count-badge" style={{ display: 'inline-block' }}>{cartCount}</span>}
            </Link>

            <div className="account-container">
              <span className="account-label">My Account</span>
              <Link
                to="/my-account"
                className="icon-link account-icon-btn"
                title="My Account"
                onClick={(e) => handleProtectedClick(e, '/my-account')}
              >
                👤
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Instant Search Overlay */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
