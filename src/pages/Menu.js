import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: '#fcf5ee',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: '80vh',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div className="menu-modal" style={{
        background: '#ffffff',
        width: '100%',
        maxWidth: '400px',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e0e0e0'
      }}>
        <div className="menu-header" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          borderBottom: '1px solid #eeeeee'
        }}>
          <button
            type="button"
            className="menu-icon-btn"
            style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#333', padding: '0.5rem' }}
            onClick={() => navigate(-1)}
          >
            ←
          </button>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: '#333' }}>Categories</h2>
          <Link to="/search" style={{ textDecoration: 'none', color: '#333', fontSize: '1.2rem', padding: '0.5rem' }}>🔍</Link>
        </div>

        <ul className="category-list" style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '70vh', overflowY: 'auto' }}>
          <Link to="/search" className="category-item" style={{ background: 'rgba(197, 155, 95, 0.08)', display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f5', textDecoration: 'none', color: '#333' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#c59b5f', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1rem', fontSize: '1.2rem' }}>🔍</div>
            <span style={{ flex: 1, fontWeight: 600, color: '#8b6c3b', fontSize: '0.95rem' }}>Search Styles</span>
            <span style={{ color: '#aaa', fontSize: '1rem' }}>&gt;</span>
          </Link>

          <Link to="/" className="category-item" style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f5', textDecoration: 'none', color: '#333' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1rem', fontSize: '1.2rem' }}>🏠</div>
            <span style={{ flex: 1, fontWeight: 500, fontSize: '0.95rem' }}>Home</span>
            <span style={{ color: '#aaa', fontSize: '1rem' }}>&gt;</span>
          </Link>

          <Link to="/men" className="category-item" style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f5', textDecoration: 'none', color: '#333' }}>
            <img src="/photos/category_men.jpeg" alt="Men" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', marginRight: '1rem' }} />
            <span style={{ flex: 1, fontWeight: 500, fontSize: '0.95rem' }}>Men</span>
            <span style={{ color: '#aaa', fontSize: '1rem' }}>&gt;</span>
          </Link>

          <Link to="/women" className="category-item" style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f5', textDecoration: 'none', color: '#333' }}>
            <img src="/photos/category_women.jpeg" alt="Women" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', marginRight: '1rem' }} />
            <span style={{ flex: 1, fontWeight: 500, fontSize: '0.95rem' }}>Women</span>
            <span style={{ color: '#aaa', fontSize: '1rem' }}>&gt;</span>
          </Link>

          <Link to="/kids" className="category-item" style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f5', textDecoration: 'none', color: '#333' }}>
            <img src="/photos/category_kids.jpeg" alt="Kids" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', marginRight: '1rem' }} />
            <span style={{ flex: 1, fontWeight: 500, fontSize: '0.95rem' }}>Kids</span>
            <span style={{ color: '#aaa', fontSize: '1rem' }}>&gt;</span>
          </Link>

          <Link to="/new-arrivals" className="category-item" style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f5', textDecoration: 'none', color: '#333' }}>
            <img src="/photos/trending_women.jpg" alt="New Arrivals" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', marginRight: '1rem' }} />
            <span style={{ flex: 1, fontWeight: 500, fontSize: '0.95rem' }}>New Arrivals</span>
            <span style={{ color: '#aaa', fontSize: '1rem' }}>&gt;</span>
          </Link>

          <Link to="/wishlist" className="category-item" style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f5', textDecoration: 'none', color: '#333' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1rem', fontSize: '1.2rem' }}>❤️</div>
            <span style={{ flex: 1, fontWeight: 500, fontSize: '0.95rem' }}>Wishlist</span>
            <span style={{ color: '#aaa', fontSize: '1rem' }}>&gt;</span>
          </Link>

          <Link to="/sales" className="category-item" style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f5', textDecoration: 'none', color: '#333' }}>
            <img src="/photos/promo.png" alt="Sale" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', marginRight: '1rem' }} />
            <span style={{ flex: 1, fontWeight: 500, fontSize: '0.95rem' }}>Sale</span>
            <span style={{ color: '#aaa', fontSize: '1rem' }}>&gt;</span>
          </Link>

          <Link to="/cart" className="category-item" style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f5', textDecoration: 'none', color: '#333' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1rem', fontSize: '1.2rem' }}>🛒</div>
            <span style={{ flex: 1, fontWeight: 500, fontSize: '0.95rem' }}>Cart</span>
            <span style={{ color: '#aaa', fontSize: '1rem' }}>&gt;</span>
          </Link>

          <Link to="/my-account" className="category-item" style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', borderBottom: '1px solid #f5f5f5', textDecoration: 'none', color: '#333' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1rem', fontSize: '1.2rem' }}>👤</div>
            <span style={{ flex: 1, fontWeight: 500, fontSize: '0.95rem' }}>My Account</span>
            <span style={{ color: '#aaa', fontSize: '1rem' }}>&gt;</span>
          </Link>

          <Link to="/contact" className="category-item" style={{ display: 'flex', alignItems: 'center', padding: '0.8rem 1rem', textDecoration: 'none', color: '#333' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '1rem', fontSize: '1.2rem' }}>📞</div>
            <span style={{ flex: 1, fontWeight: 500, fontSize: '0.95rem' }}>Contact</span>
            <span style={{ color: '#aaa', fontSize: '1rem' }}>&gt;</span>
          </Link>
        </ul>
      </div>
    </div>
  );
}

