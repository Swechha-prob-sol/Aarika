import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <main id="contact">
      {/* PAGE HERO */}
      <section className="contact-hero">
        <div className="eyebrow">CONTACT US</div>
        <h1>We'd Love to<br className="mobile-only" /> Hear From You</h1>
        <div className="ornament" aria-hidden="true">
          <span></span>
          <i>◆</i>
          <span></span>
        </div>
        <p>Have a question, feedback, or just want to say hello?</p>
        <p>We're here and happy to help.</p>
      </section>

      {/* CONTACT INFORMATION + FORM */}
      <section className="contact-grid">
        <div className="contact-details">
          <article className="detail-item">
            <div className="detail-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="5" width="18" height="14" rx="1.5"></rect>
                <path d="M4 7l8 6 8-6"></path>
              </svg>
            </div>
            <div>
              <h2>Email Us</h2>
              <a href="mailto:hello@aarika.com">hello@aarika.com</a>
              <p>We'll get back to you within 24 hours.</p>
            </div>
          </article>

          <article className="detail-item">
            <div className="detail-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7.4 3.5l3 2.8-2 3.1c1.1 2.1 2.1 3.1 4.2 4.2l3.1-2 2.8 3c.7.7.7 1.8.1 2.5l-1.7 1.8c-.7.7-1.7 1-2.6.6-3.2-1.2-5.7-3-7.8-5.1s-3.9-4.6-5.1-7.8c-.4-.9-.1-1.9.6-2.6l1.8-1.7c.7-.6 1.8-.6 2.5.1z"></path>
              </svg>
            </div>
            <div>
              <h2>Call Us</h2>
              <a href="tel:+919876543210">+91 98765 43210</a>
              <p>Mon – Sat | 10:00 AM – 6:00 PM</p>
            </div>
          </article>

          <article className="detail-item">
            <div className="detail-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"></path>
                <circle cx="12" cy="9" r="2.2"></circle>
              </svg>
            </div>
            <div>
              <h2>Visit Us</h2>
              <p>Aarika Studio, 12 MG Road,<br />Bangalore, Karnataka 560001</p>
            </div>
          </article>

          <article className="detail-item">
            <div className="detail-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="8.5"></circle>
                <path d="M12 7v5l3.5 2"></path>
              </svg>
            </div>
            <div>
              <h2>Business Hours</h2>
              <p>Monday – Saturday<br />10:00 AM – 6:00 PM</p>
            </div>
          </article>
        </div>

        <div className="contact-form-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            {submitted && (
              <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: 600 }}>
                Thank you! Your message has been sent successfully.
              </div>
            )}
            <div className="form-row">
              <label>
                <span className="sr-only">Your Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                <span className="sr-only">Email Address</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <label>
              <span className="sr-only">Subject</span>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span className="sr-only">Message</span>
              <textarea
                name="message"
                rows="7"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </label>

            <button type="submit" className="submit-button">SEND MESSAGE</button>

            <p className="privacy-note">We respect your privacy. Your information is safe with us.</p>
          </form>
        </div>
      </section>

      {/* VALUE / SUPPORT STRIP */}
      <section className="promise-strip" aria-label="Aarika contact benefits">
        <article className="promise-card">
          <div className="promise-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 18h9"></path>
              <path d="M7 13h5"></path>
              <path d="M5 6h10a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4H9l-4 3v-3H5a4 4 0 0 1 0-11z"></path>
              <circle cx="9" cy="11" r="0.6"></circle>
              <circle cx="12" cy="11" r="0.6"></circle>
              <circle cx="15" cy="11" r="0.6"></circle>
            </svg>
          </div>
          <h3>Quick Response</h3>
          <p>We reply to all inquiries within 24 hours.</p>
        </article>

        <article className="promise-card">
          <div className="promise-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 8.5c0 5.2-8 10-8 10s-8-4.8-8-10A4.5 4.5 0 0 1 8.5 4c1.5 0 2.8.7 3.5 1.9C12.7 4.7 14 4 15.5 4A4.5 4.5 0 0 1 20 8.5z"></path>
            </svg>
          </div>
          <h3>We Care</h3>
          <p>Your satisfaction means everything to us.</p>
        </article>

        <article className="promise-card">
          <div className="promise-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="4" y="9" width="16" height="11" rx="1.5"></rect>
              <path d="M8 9V7a4 4 0 0 1 8 0v2"></path>
              <path d="M12 13v3"></path>
            </svg>
          </div>
          <h3>Privacy First</h3>
          <p>Your information is always secure.</p>
        </article>

        <article className="promise-card">
          <div className="promise-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 7l8-4 8 4-8 4-8-4z"></path>
              <path d="M4 7v10l8 4 8-4V7"></path>
              <path d="M12 11v10"></path>
              <path d="M8 5l8 4"></path>
            </svg>
          </div>
          <h3>Happy to Help</h3>
          <p>Our team is here to assist you with anything.</p>
        </article>
      </section>
    </main>
  );
}

