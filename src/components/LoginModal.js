import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginModal() {
  const { loginModalOpen, isModalGate, hideLoginModal } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginModalOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [loginModalOpen, isModalGate]);

  if (!loginModalOpen) return null;

  function handleDismiss() {
    hideLoginModal();
    if (isModalGate) {
      navigate('/', { replace: true });
    }
  }

  function handleLogin() {
    hideLoginModal();
    navigate('/login');
  }

  function handleSignup() {
    hideLoginModal();
    navigate('/signup');
  }

  return (
    <div
      id="aarika-login-wall"
      role="dialog"
      aria-modal="true"
      aria-label="Login required"
      onClick={(e) => {
        if (e.target.id === 'aarika-login-wall') {
          handleDismiss();
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10, 22, 14, 0.74)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        opacity: 1,
        visibility: 'visible',
        transition: 'opacity 0.25s ease, visibility 0.25s ease',
      }}
    >
      <div
        style={{
          background: '#f4f1e8',
          border: '1px solid #c8b98a',
          borderRadius: '18px',
          padding: '2.4rem 2rem 2rem',
          maxWidth: '380px',
          width: '90%',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(15, 30, 18, 0.32)',
          fontFamily: "'Poppins', Inter, -apple-system, sans-serif",
        }}
      >
        <button
          id="aarika-login-wall-close"
          aria-label="Close"
          onClick={handleDismiss}
          style={{
            position: 'absolute',
            top: '0.85rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.35rem',
            color: '#7a7060',
            lineHeight: 1,
            padding: '4px',
          }}
        >
          ✕
        </button>

        <div style={{ fontSize: '2.2rem', marginBottom: '0.65rem' }}>
          🔒
        </div>

        <h2
          style={{
            margin: '0 0 0.45rem',
            fontSize: '1.3rem',
            fontFamily: "'Playfair Display', Georgia, serif",
            color: '#1a2e1d',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          Login Required
        </h2>

        <p
          style={{
            margin: '0 0 1.6rem',
            fontSize: '0.88rem',
            color: '#6b6453',
            lineHeight: 1.5,
          }}
        >
          Please log in with an existing account to continue. Don’t have an account? Sign up to get started.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            onClick={handleLogin}
            style={{
              flex: 1,
              maxWidth: '130px',
              padding: '0.7rem 1rem',
              background: '#112c1b',
              color: '#fff',
              border: 'none',
              borderRadius: '30px',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
              display: 'inline-block',
              boxSizing: 'border-box',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Log In
          </button>

          <button
            type="button"
            onClick={handleSignup}
            style={{
              flex: 1,
              maxWidth: '130px',
              padding: '0.7rem 1rem',
              background: 'transparent',
              color: '#112c1b',
              border: '1.5px solid #c8b98a',
              borderRadius: '30px',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
              display: 'inline-block',
              boxSizing: 'border-box',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

