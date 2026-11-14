import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const err = login(email.trim().toLowerCase(), password);
    if (err) {
      setError(err);
    } else {
      navigate('/');
    }
  }

  return (
    <div className="auth-page">
      <main className="authentication-page">
        <section className="authentication-card">
          <img
            src="/photos/logo_my_account.png"
            alt="AARIKA"
            className="auth-logo"
          />

          <h1 className="auth-heading">Welcome back</h1>
          <p className="auth-subtext">Log in to your account</p>

          <form id="login-form" className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M3 5.5L10 11L17 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <div className="input-wrapper has-toggle">
                <span className="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="9" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  id="login-password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg viewBox="0 0 20 20" fill="none" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 10C1.5 10 4.5 4.5 10 4.5C15.5 4.5 18.5 10 18.5 10C18.5 10 15.5 15.5 10 15.5C4.5 15.5 1.5 10 1.5 10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
              </div>
            </div>

            {error && (
              <div id="form-error" className="form-error" role="alert" style={{ display: 'block' }}>
                {error}
              </div>
            )}

            <button type="submit" className="auth-button" id="login-button">Log In</button>
          </form>

          <p className="account-switch">Don’t have an account? <Link to="/signup">Sign up</Link></p>
        </section>
      </main>
    </div>
  );
}

