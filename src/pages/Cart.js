import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

export default function Cart() {
  const { cart, removeFromCart, changeCartQty, showToast } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');

  const subtotal = cart.reduce((s, i) => {
    let p = 0;
    if (typeof i.price === 'number') {
      p = i.price;
    } else if (typeof i.price === 'string') {
      p = parseFloat(i.price.replace(/[^0-9.]/g, '')) || 0;
    }
    return s + p * (i.qty || 1);
  }, 0);

  const discount = subtotal > 3000 ? 500 : 0;
  const total = Math.max(0, subtotal - discount);
  const totalItems = cart.reduce((s, i) => s + (i.qty || 1), 0);

  function handleBuyAll() {
    if (cart.length === 0) {
      showToast('Your cart is empty!');
      return;
    }
    sessionStorage.setItem('aarika_checkout_allowed', 'true');
    navigate('/payment');
  }

  function handleApplyCoupon() {
    if (couponCode.trim()) {
      showToast('Coupon applied! 🎉');
      setCouponCode('');
    }
  }

  const recommendations = [
    {
      name: 'Bloom Floral Dress',
      category: 'Dresses',
      price: 2699,
      badge: 'Popular',
      image: 'photos/product6.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Floral Aariaki',
      category: 'Dresses',
      price: 2899,
      badge: 'Trending',
      image: 'photos/trend1.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Embroidered Kurta',
      category: 'Kurta Sets',
      price: 2199,
      badge: 'Best Seller',
      image: 'photos/trend2.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Pastel Printed Set',
      category: 'Co-ord Sets',
      price: 2499,
      badge: 'New',
      image: 'photos/trend3.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    }
  ];

  return (
    <main className="page">
      <div className="breadcrumb">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link> &nbsp; / &nbsp; Shopping Cart
      </div>

      <h1 className="page-title">YOUR SHOPPING BAG</h1>
      <p className="subtitle" id="cart-subtitle">
        {totalItems === 0
          ? 'Your cart is currently empty.'
          : `You have ${totalItems} item${totalItems === 1 ? '' : 's'} in your cart.`}
      </p>

      <div className="cart-layout">
        {/* LEFT CART */}
        <section className="cart-box">
          <div className="cart-header">
            <h2 id="cart-items-heading">Cart Items ({totalItems})</h2>
          </div>

          <div id="dynamic-cart-items">
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#8a8a8a' }}>
                <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛒</p>
                <p style={{ fontSize: '1.15rem', fontWeight: 600, color: '#112c1b', marginBottom: '0.5rem' }}>
                  Your Cart is Empty
                </p>
                <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                  to="/"
                  style={{
                    display: 'inline-block',
                    padding: '0.75rem 1.8rem',
                    background: '#112c1b',
                    color: '#fff',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  Continue Shopping &rarr;
                </Link>
              </div>
            ) : (
              cart.map((item, idx) => {
                let imgSrc = item.image || '';
                if (imgSrc.startsWith('./photos/')) {
                  imgSrc = '/photos/' + imgSrc.replace('./photos/', '');
                } else if (imgSrc.startsWith('../photos/')) {
                  imgSrc = '/photos/' + imgSrc.replace('../photos/', '');
                } else if (imgSrc.startsWith('photos/')) {
                  imgSrc = '/photos/' + imgSrc.replace('photos/', '');
                } else if (!imgSrc.startsWith('/')) {
                  imgSrc = '/' + imgSrc;
                }

                return (
                  <div className="cart-item" key={item.id || idx}>
                    <img
                      className="product-image"
                      src={imgSrc}
                      alt={item.name}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <div className="item-info">
                      <h3>{item.name}</h3>
                      <p className="item-code">Aarika · {item.category || 'Collection'}</p>
                      <div className="item-meta">
                        <label>Size: <strong>{item.size || 'M'}</strong></label>
                      </div>
                      <div className="item-actions">
                        <button className="remove" onClick={() => removeFromCart(item.id)}>
                          🗑 Remove
                        </button>
                      </div>
                    </div>
                    <div className="item-price-area">
                      <p className="item-price">
                        {typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}` : item.price}
                      </p>
                      <div className="quantity">
                        <button onClick={() => changeCartQty(item.id, -1)}>−</button>
                        <span>{item.qty || 1}</span>
                        <button onClick={() => changeCartQty(item.id, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* SUMMARY */}
        <aside>
          <div className="summary-box">
            <h2>ORDER SUMMARY</h2>

            <div className="summary-row">
              <span id="summary-items-count">Items ({totalItems})</span>
              <strong id="summary-subtotal">₹{subtotal.toLocaleString('en-IN')}</strong>
            </div>

            <div className="summary-row">
              <span>Discount</span>
              <strong className="discount" id="summary-discount">
                {discount > 0 ? `− ₹${discount.toLocaleString('en-IN')}` : '− ₹0'}
              </strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <strong className="free" id="summary-delivery">FREE</strong>
            </div>

            <div className="summary-row">
              <span>Estimated Tax</span>
              <strong id="summary-tax">₹0</strong>
            </div>

            <div className="total-row">
              <span>Total</span>
              <span id="summary-total">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <p className="tax-note">Inclusive of applicable taxes</p>

            <button className="buy-all" onClick={handleBuyAll}>
              BUY ALL ITEMS &nbsp; &rarr;
            </button>

            <button className="continue-shopping" onClick={() => navigate('/')}>
              CONTINUE SHOPPING
            </button>

            <div className="secure">
              <i className="fa-solid fa-shield-halved"></i>
              <span>
                Safe &amp; Secure Checkout<br />
                Your payment and personal details are protected.
              </span>
            </div>
          </div>

          {/* COUPON */}
          <div className="coupon-box">
            <h4>Have a Coupon?</h4>
            <div className="coupon-form">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
              />
              <button onClick={handleApplyCoupon}>APPLY</button>
            </div>
          </div>
        </aside>
      </div>

      {/* RECOMMENDED */}
      <section className="recommendations">
        <h2 className="section-title">YOU MAY ALSO LIKE</h2>
        <div className="leaf-line">Handpicked for You</div>
        <div className="recommend-grid">
          {recommendations.map(p => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}

