import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'aarika_users';
const SESSION_KEY = 'aarika_current_user';

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUsers(arr) {
  localStorage.setItem(USERS_KEY, JSON.stringify(arr));
}

function getCurrentEmail() {
  return localStorage.getItem(SESSION_KEY) || null;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const email = getCurrentEmail();
    if (!email) return null;
    return getUsers().find(u => u.email === email) || null;
  });

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isModalGate, setIsModalGate] = useState(false);

  function showLoginModal(isGate = false) {
    setIsModalGate(!!isGate);
    setLoginModalOpen(true);
  }

  function hideLoginModal() {
    setLoginModalOpen(false);
  }

  function cartKey() {
    const email = getCurrentEmail();
    return email ? 'aarika_cart_' + email : 'aarika_cart_guest';
  }

  function wishlistKey() {
    const email = getCurrentEmail();
    return email ? 'aarika_wishlist_' + email : 'aarika_wishlist_guest';
  }

  function login(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return 'Incorrect email or password. Please try again.';
    localStorage.setItem(SESSION_KEY, email);
    setCurrentUser(user);
    return null; // null means success
  }

  function signup(data) {
    if (!data.username) return 'Please enter a username.';
    if (!data.email || !data.email.includes('@')) return 'Please enter a valid email address.';
    if (!data.password || data.password.length < 6) return 'Password must be at least 6 characters.';
    if (!data.address) return 'Please enter your address.';
    if (!data.phone) return 'Please enter your phone number.';
    if (data.phone.replace(/\D/g, '').length !== 10) return 'Phone number must be exactly 10 digits.';

    const users = getUsers();
    if (users.find(u => u.email === data.email.toLowerCase())) {
      return 'An account with this email already exists.';
    }

    const newUser = {
      ...data,
      email: data.email.toLowerCase(),
      phone: data.phone.replace(/\D/g, ''),
      memberSince: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
    };
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, newUser.email);
    setCurrentUser(newUser);
    return null;
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
  }

  function updateUser(key, value) {
    const users = getUsers();
    const email = getCurrentEmail();
    const idx = users.findIndex(u => u.email === email);
    if (idx === -1) return;
    users[idx][key] = value;
    saveUsers(users);
    setCurrentUser({ ...users[idx] });
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      signup,
      logout,
      updateUser,
      cartKey,
      wishlistKey,
      loginModalOpen,
      isModalGate,
      showLoginModal,
      hideLoginModal
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

