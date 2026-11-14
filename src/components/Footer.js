import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <footer className="footer-main">
        <div className="footer-container">
          <div className="footer-column brand-column">
            <div className="footer-logo">
              <img src="/photos/logo.png" alt="Aarika Logo" className="brand-logo-img" />
            </div>
            <p className="brand-desc">Timeless Fashion.<br />Effortless Elegance.</p>
            <div className="social-icons">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/women">Women</Link></li>
              <li><Link to="/men">Men</Link></li>
              <li><Link to="/kids">Kids</Link></li>
              <li><Link to="/new-arrivals">New Arrivals</Link></li>
              <li><Link to="/sales">Sale</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Customer Support</h4>
            <ul>
              <li><Link to="/my-account">My Account</Link></li>
              <li><a href="#orders">Orders &amp; Returns</a></li>
              <li><a href="#return-policy">Return Policy</a></li>
              <li><a href="#terms">Terms &amp; Conditions</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Help &amp; Contact</h4>
            <p><strong>Phone:</strong> +91 86390 86245</p>
            <p><strong>Email:</strong> support@aarika.com</p>
            <p><strong>Address:</strong> 123 Fashion Street,<br />New Delhi, India - 110001</p>
            <h4 className="we-accept">We accept</h4>
            <div className="payment-methods">
              <span className="pay-badge" style={{ color: '#007BFF' }}>UPI</span>
            </div>
          </div>

          <div className="footer-column newsletter-col">
            <h4>Newsletter</h4>
            <p>Subscribe to get updates on new arrivals and exclusive offers.</p>
            <form className="mini-newsletter-form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">→</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom-bar">
          <p>&copy; 2026 Aarika. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

