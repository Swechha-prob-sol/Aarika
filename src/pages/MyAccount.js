import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MyAccount() {
  const { currentUser, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [editField, setEditField] = useState(null);
  const [val, setVal] = useState('');
  const [pwd, setPwd] = useState({ cur: '', new: '', cfm: '' });
  const [err, setErr] = useState('');
  const [toast, setToast] = useState('');

  if (!currentUser) return null;

  function showToastMsg(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  }

  function startEditing(field, currentVal) {
    setEditField(field);
    setErr('');
    if (field === 'password') {
      setPwd({ cur: '', new: '', cfm: '' });
    } else {
      setVal(currentVal || '');
    }
  }

  function handleSave() {
    setErr('');
    if (editField === 'password') {
      if (pwd.cur !== currentUser.password) {
        setErr('Current password is incorrect.');
        return;
      }
      if (pwd.new.length < 6) {
        setErr('New password must be at least 6 characters.');
        return;
      }
      if (pwd.new !== pwd.cfm) {
        setErr('Passwords do not match.');
        return;
      }
      updateUser('password', pwd.new);
      setEditField(null);
      showToastMsg('Password updated ✓');
    } else {
      if (editField === 'username' && !val.trim()) return;
      if (editField === 'phone') {
        const cleaned = val.replace(/\D/g, '');
        if (cleaned.length !== 10) {
          showToastMsg('Phone number must be exactly 10 digits');
          return;
        }
        updateUser('phone', cleaned);
      } else {
        updateUser(editField, val.trim());
      }
      setEditField(null);
      showToastMsg('Saved ✓');
    }
  }

  function handleSignOut() {
    logout();
    navigate('/login');
  }

  return (
    <div className="account-page-wrapper">
      {/* Icon sprite */}
      <svg style={{ display: 'none' }} aria-hidden="true">
        <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></symbol>
        <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" /></symbol>
        <symbol id="i-user-fill" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="8" r="4.2" /><path d="M4 20.5c0-4.7 3.6-7.3 8-7.3s8 2.6 8 7.3v.5H4v-.5Z" /></symbol>
        <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></symbol>
        <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5.5 4h3l1.4 3.8-2.1 1.4a11.5 11.5 0 0 0 5 5l1.4-2.1L18 12.5v3a2 2 0 0 1-2 2C9.9 17.5 4.5 12.1 4.5 6a2 2 0 0 1 1-2Z" /></symbol>
        <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.3" /></symbol>
        <symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></symbol>
        <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-9.5-9.3C1.2 7 3.4 4 6.7 4 9 4 10.7 5.3 12 7c1.3-1.7 3-3 5.3-3 3.3 0 5.5 3 4.2 6.7C19.5 15.4 12 20 12 20Z" /></symbol>
        <symbol id="i-box" viewBox="0 0 24 24"><path d="M3 8 12 4l9 4-9 4-9-4Z" /><path d="M3 8v9l9 4 9-4V8" /><path d="M12 12v9" /></symbol>
        <symbol id="i-chevron" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></symbol>
        <symbol id="i-pencil" viewBox="0 0 24 24"><path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z" /><path d="M14 6.5l3 3" /></symbol>
        <symbol id="i-signout" viewBox="0 0 24 24"><path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" /><path d="M15 16l4-4-4-4" /><path d="M19 12H9" /></symbol>
      </svg>

      <main className="account-page">
        <div className="account-card">
          <header className="account-header">
            <img className="brand-logo" src="/photos/logo_my_account.png" alt="Aarika — since 2026" />
            <h1>My Account</h1>
            <p className="subtitle">Manage your account information and preferences.</p>
          </header>

          <section className="profile-summary" aria-label="Profile">
            <div className="avatar"><svg className="icon avatar-icon"><use href="#i-user-fill" /></svg></div>
            <h2 className="profile-name">{currentUser.username || 'Aarika User'}</h2>
            <p className="profile-email" style={{ fontSize: '0.85rem', color: '#6f7569', margin: '2px 0 4px', fontWeight: 500 }}>
              {currentUser.email}
            </p>
            <p className="member-since">Member since {currentUser.memberSince || 'May 2024'}</p>
          </section>

          <section className="field-group" aria-label="Account details">
            {/* Username */}
            <div className="field-row">
              <svg className="icon field-icon"><use href="#i-user" /></svg>
              <div className="field-text">
                <span className="field-label">Username</span>
                {editField === 'username' ? (
                  <div className="field-edit-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, marginTop: '0.25rem' }}>
                    <input
                      type="text"
                      value={val}
                      onChange={e => setVal(e.target.value)}
                      style={{ width: '100%', padding: '0.45rem 0.7rem', border: '1.5px solid #c8b98a', borderRadius: '8px', fontSize: '0.9rem', color: '#1a2e1d', background: '#fffdf9', outline: 'none' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <button onClick={handleSave} style={{ padding: '0.38rem 1rem', background: '#112c1b', color: '#fff', border: 'none', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Save</button>
                      <button onClick={() => setEditField(null)} style={{ padding: '0.38rem 0.9rem', background: 'transparent', color: '#6b6453', border: '1.5px solid #c8b98a', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <span className="field-value">{currentUser.username}</span>
                )}
              </div>
              {editField !== 'username' && (
                <>
                  <button className="field-action field-action--chevron" type="button" onClick={() => startEditing('username', currentUser.username)} aria-label="Open username">
                    <svg className="icon icon-sm"><use href="#i-chevron" /></svg>
                  </button>
                  <button className="field-action field-action--edit" type="button" onClick={() => startEditing('username', currentUser.username)}>
                    <svg className="icon icon-sm"><use href="#i-pencil" /></svg><span>Edit</span>
                  </button>
                </>
              )}
            </div>

            {/* Age */}
            <div className="field-row">
              <svg className="icon field-icon"><use href="#i-calendar" /></svg>
              <div className="field-text">
                <span className="field-label">Age</span>
                {editField === 'age' ? (
                  <div className="field-edit-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, marginTop: '0.25rem' }}>
                    <input
                      type="number"
                      value={val}
                      onChange={e => setVal(e.target.value)}
                      style={{ width: '100%', padding: '0.45rem 0.7rem', border: '1.5px solid #c8b98a', borderRadius: '8px', fontSize: '0.9rem', color: '#1a2e1d', background: '#fffdf9', outline: 'none' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <button onClick={handleSave} style={{ padding: '0.38rem 1rem', background: '#112c1b', color: '#fff', border: 'none', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Save</button>
                      <button onClick={() => setEditField(null)} style={{ padding: '0.38rem 0.9rem', background: 'transparent', color: '#6b6453', border: '1.5px solid #c8b98a', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <span className="field-value">{currentUser.age || '—'}</span>
                )}
              </div>
              {editField !== 'age' && (
                <>
                  <button className="field-action field-action--chevron" type="button" onClick={() => startEditing('age', currentUser.age)} aria-label="Open age">
                    <svg className="icon icon-sm"><use href="#i-chevron" /></svg>
                  </button>
                  <button className="field-action field-action--edit" type="button" onClick={() => startEditing('age', currentUser.age)}>
                    <svg className="icon icon-sm"><use href="#i-pencil" /></svg><span>Edit</span>
                  </button>
                </>
              )}
            </div>

            {/* Phone */}
            <div className="field-row">
              <svg className="icon field-icon"><use href="#i-phone" /></svg>
              <div className="field-text">
                <span className="field-label">Phone Number</span>
                {editField === 'phone' ? (
                  <div className="field-edit-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, marginTop: '0.25rem' }}>
                    <input
                      type="tel"
                      value={val}
                      maxLength={10}
                      onChange={e => setVal(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      style={{ width: '100%', padding: '0.45rem 0.7rem', border: '1.5px solid #c8b98a', borderRadius: '8px', fontSize: '0.9rem', color: '#1a2e1d', background: '#fffdf9', outline: 'none' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <button onClick={handleSave} style={{ padding: '0.38rem 1rem', background: '#112c1b', color: '#fff', border: 'none', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Save</button>
                      <button onClick={() => setEditField(null)} style={{ padding: '0.38rem 0.9rem', background: 'transparent', color: '#6b6453', border: '1.5px solid #c8b98a', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <span className="field-value">{currentUser.phone || '—'}</span>
                )}
              </div>
              {editField !== 'phone' && (
                <>
                  <button className="field-action field-action--chevron" type="button" onClick={() => startEditing('phone', currentUser.phone)} aria-label="Open phone number">
                    <svg className="icon icon-sm"><use href="#i-chevron" /></svg>
                  </button>
                  <button className="field-action field-action--edit" type="button" onClick={() => startEditing('phone', currentUser.phone)}>
                    <svg className="icon icon-sm"><use href="#i-pencil" /></svg><span>Edit</span>
                  </button>
                </>
              )}
            </div>

            {/* Address */}
            <div className="field-row">
              <svg className="icon field-icon"><use href="#i-pin" /></svg>
              <div className="field-text">
                <span className="field-label">Address</span>
                {editField === 'address' ? (
                  <div className="field-edit-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, marginTop: '0.25rem' }}>
                    <input
                      type="text"
                      value={val}
                      onChange={e => setVal(e.target.value)}
                      style={{ width: '100%', padding: '0.45rem 0.7rem', border: '1.5px solid #c8b98a', borderRadius: '8px', fontSize: '0.9rem', color: '#1a2e1d', background: '#fffdf9', outline: 'none' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <button onClick={handleSave} style={{ padding: '0.38rem 1rem', background: '#112c1b', color: '#fff', border: 'none', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Save</button>
                      <button onClick={() => setEditField(null)} style={{ padding: '0.38rem 0.9rem', background: 'transparent', color: '#6b6453', border: '1.5px solid #c8b98a', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <span className="field-value">{currentUser.address || '—'}</span>
                )}
              </div>
              {editField !== 'address' && (
                <>
                  <button className="field-action field-action--chevron" type="button" onClick={() => startEditing('address', currentUser.address)} aria-label="Open address">
                    <svg className="icon icon-sm"><use href="#i-chevron" /></svg>
                  </button>
                  <button className="field-action field-action--edit" type="button" onClick={() => startEditing('address', currentUser.address)}>
                    <svg className="icon icon-sm"><use href="#i-pencil" /></svg><span>Edit</span>
                  </button>
                </>
              )}
            </div>

            {/* Password */}
            <div className="field-row">
              <svg className="icon field-icon"><use href="#i-lock" /></svg>
              <div className="field-text">
                <span className="field-label">Password</span>
                {editField === 'password' ? (
                  <div className="field-edit-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, marginTop: '0.25rem' }}>
                    <input
                      type="password"
                      placeholder="Current password"
                      value={pwd.cur}
                      onChange={e => setPwd({ ...pwd, cur: e.target.value })}
                      style={{ width: '100%', padding: '0.45rem 0.7rem', border: '1.5px solid #c8b98a', borderRadius: '8px', fontSize: '0.9rem', color: '#1a2e1d', background: '#fffdf9', outline: 'none' }}
                    />
                    <input
                      type="password"
                      placeholder="New password (min 6 chars)"
                      value={pwd.new}
                      onChange={e => setPwd({ ...pwd, new: e.target.value })}
                      style={{ width: '100%', padding: '0.45rem 0.7rem', border: '1.5px solid #c8b98a', borderRadius: '8px', fontSize: '0.9rem', color: '#1a2e1d', background: '#fffdf9', outline: 'none' }}
                    />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={pwd.cfm}
                      onChange={e => setPwd({ ...pwd, cfm: e.target.value })}
                      style={{ width: '100%', padding: '0.45rem 0.7rem', border: '1.5px solid #c8b98a', borderRadius: '8px', fontSize: '0.9rem', color: '#1a2e1d', background: '#fffdf9', outline: 'none' }}
                    />
                    {err && <span style={{ color: '#b03030', fontSize: '0.76rem' }}>{err}</span>}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <button onClick={handleSave} style={{ padding: '0.38rem 1rem', background: '#112c1b', color: '#fff', border: 'none', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Save</button>
                      <button onClick={() => setEditField(null)} style={{ padding: '0.38rem 0.9rem', background: 'transparent', color: '#6b6453', border: '1.5px solid #c8b98a', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer' }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <span className="field-value">••••••••</span>
                )}
              </div>
              {editField !== 'password' && (
                <>
                  <button className="field-action field-action--chevron" type="button" onClick={() => startEditing('password')} aria-label="Open password">
                    <svg className="icon icon-sm"><use href="#i-chevron" /></svg>
                  </button>
                  <button className="field-action field-action--edit" type="button" onClick={() => startEditing('password')}>
                    <svg className="icon icon-sm"><use href="#i-pencil" /></svg><span>Edit</span>
                  </button>
                </>
              )}
            </div>
          </section>

          <nav className="link-group" aria-label="Account links">
            <Link to="/" className="link-row" style={{ textDecoration: 'none' }}>
              <svg className="icon field-icon"><use href="#i-home" /></svg>
              <span className="link-label">Back to Home</span>
              <svg className="icon icon-sm"><use href="#i-chevron" /></svg>
            </Link>

            <Link to="/wishlist" className="link-row" style={{ textDecoration: 'none' }}>
              <svg className="icon field-icon"><use href="#i-heart" /></svg>
              <span className="link-label">Wishlist</span>
              <svg className="icon icon-sm"><use href="#i-chevron" /></svg>
            </Link>

            <Link to="/cart" id="myOrdersLink" className="link-row" style={{ textDecoration: 'none' }}>
              <svg className="icon field-icon"><use href="#i-box" /></svg>
              <span className="link-label">My Orders</span>
              <svg className="icon icon-sm"><use href="#i-chevron" /></svg>
            </Link>
          </nav>

          <button className="signout-btn" type="button" onClick={handleSignOut}>
            <svg className="icon icon-sm"><use href="#i-signout" /></svg>
            <span>Log Out</span>
          </button>

          <p className="help-text">Need help? <Link to="/contact">Contact us</Link></p>
        </div>
      </main>

      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#112c1b',
          color: '#fff',
          padding: '0.6rem 1.4rem',
          borderRadius: '30px',
          fontSize: '0.87rem',
          fontWeight: 600,
          border: '1px solid #c59b5f',
          boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
          zIndex: 999999,
          whiteSpace: 'nowrap'
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}

