import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    age: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numeric = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, phone: numeric }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const err = signup({
      username: formData.username.trim(),
      age: formData.age.trim(),
      email: formData.email.trim(),
      password: formData.password,
      address: formData.address.trim(),
      phone: formData.phone.trim()
    });
    if (err) {
      setError(err);
    } else {
      navigate('/');
    }
  }

  return (
    <div className="auth-page">
      <main className="authentication-page">
        <section className="authentication-card authentication-card--wide">
          <img
            src="/photos/logo_my_account.png"
            alt="AARIKA"
            className="auth-logo"
          />

          <h1 className="auth-heading">Create your account</h1>
          <p className="auth-subtext">Sign up to get started with Aarika.</p>

          <form id="signup-form" className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row form-row--two">
              <div className="form-group">
                <label htmlFor="signup-username">Username</label>
                <div className="input-wrapper">
                  <span className="input-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="6.5" r="3.2" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M3.5 17c0-3.5 3-5.8 6.5-5.8s6.5 2.3 6.5 5.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="signup-username"
                    name="username"
                    placeholder="Enter your username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signup-age">Age</label>
                <div className="input-wrapper">
                  <span className="input-icon" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2.5" y="4" width="15" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M2.5 8H17.5" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M6 2.5V5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      <path d="M14 2.5V5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                  <input
                    type="number"
                    id="signup-age"
                    name="age"
                    placeholder="Enter your age"
                    min="0"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="signup-email">Email</label>
              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M3 5.5L10 11L17 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <div className="input-wrapper has-toggle">
                <span className="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="9" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="signup-password"
                  name="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  id="signup-password-toggle"
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

            <div className="form-group">
              <label htmlFor="signup-address">Address</label>
              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 18C10 18 15.5 12.6 15.5 8.3C15.5 5.1 13 2.5 10 2.5C7 2.5 4.5 5.1 4.5 8.3C4.5 12.6 10 18 10 18Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                    <circle cx="10" cy="8.2" r="2.1" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="signup-address"
                  name="address"
                  required
                  placeholder="Enter your address"
                  autoComplete="street-address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="signup-phone">Phone Number</label>
              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 3.5H7L8.5 7L6.5 8.5C7.3 10.3 8.7 11.7 10.5 12.5L12 10.5L15.5 12V15C15.5 15.8 14.8 16.5 14 16.4C8.3 16 3.5 11.2 3.6 5.5C3.6 4.7 4 3.5 4 3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                </span>
                <input
                  type="tel"
                  id="signup-phone"
                  name="phone"
                  required
                  placeholder="Enter 10-digit phone number"
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <div id="form-error" className="form-error" role="alert" style={{ display: 'block' }}>
                {error}
              </div>
            )}

            <button type="submit" className="auth-button" id="signup-button">Sign Up</button>
          </form>

          <p className="account-switch">Already have an account? <Link to="/login">Log in</Link></p>
        </section>
      </main>
    </div>
  );
}

