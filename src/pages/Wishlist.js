import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, addWishlistItemToCart } = useCart();

  return (
    <div className="wishlist-page">
      {/* Hero Section */}
      <section className="wishlist-hero">
        <div className="wishlist-hero-content">
          <p className="eyebrow">SAVED FOR LATER</p>
          <h1>MY WISHLIST</h1>
          <div className="gold-underline"></div>
          <p className="subtitle">Your favorite styles, ready when you are.</p>
        </div>
      </section>

      {/* Section Header */}
      <div className="section-header">
        <p className="section-subtitle" id="wl-count">
          {wishlist.length} {wishlist.length === 1 ? 'ITEM SAVED' : 'ITEMS SAVED'}
        </p>
        <div className="separator">
          <span></span>
          <div className="diamond"></div>
          <span></span>
        </div>
      </div>

      {/* Product Grid */}
      <section className="wishlist-products">
        <div className="wishlist-grid" id="wishlist-grid">
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#8a8a8a', gridColumn: '1 / -1' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>♡</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#112c1b', marginBottom: '0.5rem' }}>
                Your Wishlist is Empty
              </p>
              <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                Explore our collection and click the heart icon to save your favorite styles.
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
                Explore Now &rarr;
              </Link>
            </div>
          ) : (
            wishlist.map(item => {
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
                <div className="product-card" key={item.id}>
                  <div className="card-image-box">
                    <button
                      className="wishlist-remove-btn"
                      title="Remove from Wishlist"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      ✕
                    </button>
                    <img
                      src={imgSrc}
                      alt={item.name}
                      className="card-image"
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="card-details">
                    <p className="card-category-tag">{item.category || 'Collection'}</p>
                    <h3 className="card-title">{item.name}</h3>
                    <div className="card-price-row">
                      <span className="card-price">
                        {typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}` : item.price}
                      </span>
                    </div>
                    <p className="card-sizes-label">Select Size:</p>
                    <div className="card-sizes-row">
                      <span className="size-pill selected">{item.size || 'M'}</span>
                    </div>
                    <button className="card-add-cart-btn" onClick={() => addWishlistItemToCart(item)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}

