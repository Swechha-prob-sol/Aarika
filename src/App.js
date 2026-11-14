import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import LoginModal from './components/LoginModal';

import Home from './pages/Home';
import Women from './pages/Women';
import Men from './pages/Men';
import Kids from './pages/Kids';
import NewArrivals from './pages/NewArrivals';
import Sales from './pages/Sales';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyAccount from './pages/MyAccount';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Payment from './pages/Payment';
import Search from './pages/Search';
import Menu from './pages/Menu';
import LoadingPage from './pages/LoadingPage';

// Import ALL original CSS files
import './css/styles.css';
import './css/navbar_search.css';
import './css/cart.css';
import './css/Contact.css';
import './css/my_account.css';
import './css/NewArrivals.css';
import './css/payment.css';
import './css/sales.css';
import './css/search.css';
import './css/Wishlist.css';
import './css/auth.css';
import './css/basic_style.css';

function AppLayout() {
  const location = useLocation();
  const hideChrome = ['/login', '/signup', '/loading'].includes(location.pathname);

  React.useEffect(() => {
    document.body.classList.toggle('no-navbar', hideChrome);
    return () => {
      document.body.classList.remove('no-navbar');
    };
  }, [hideChrome]);

  return (
    <>
      {!hideChrome && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/cart" element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />
        <Route path="/wishlist" element={
          <ProtectedRoute><Wishlist /></ProtectedRoute>
        } />
        <Route path="/my-account" element={
          <ProtectedRoute><MyAccount /></ProtectedRoute>
        } />
        <Route path="/payment" element={
          <ProtectedRoute><Payment /></ProtectedRoute>
        } />
      </Routes>
      {!hideChrome && <Footer />}
      {!hideChrome && <BottomNav />}
      <Toast />
      <LoginModal />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppLayout />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
