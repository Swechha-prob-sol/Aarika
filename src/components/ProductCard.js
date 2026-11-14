import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { currentUser, showLoginModal } = useAuth();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M'
  );
  const [added, setAdded] = useState(false);

  const name = product.name || product.title || 'Product';
  
  // Format price
  let numPrice = 0;
  if (typeof product.price === 'number') {
    numPrice = product.price;
  } else if (typeof product.price === 'string') {
    numPrice = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
  }

  let numOrigPrice = 0;
  if (typeof product.originalPrice === 'number') {
    numOrigPrice = product.originalPrice;
  } else if (typeof product.originalPrice === 'string') {
    numOrigPrice = parseFloat(product.originalPrice.replace(/[^0-9.]/g, '')) || 0;
  }

  const priceStr = '₹' + numPrice.toLocaleString('en-IN');
  const originalPriceStr = numOrigPrice > 0 ? '₹' + numOrigPrice.toLocaleString('en-IN') : null;
  const discountPercent = numOrigPrice > numPrice
    ? Math.round(((numOrigPrice - numPrice) / numOrigPrice) * 100)
    : (product.discount || null);

  const inWishlist = isInWishlist(name, selectedSize);

  // Normalize image src
  let imgSrc = product.image || '';
  if (imgSrc.startsWith('./photos/')) {
    imgSrc = '/photos/' + imgSrc.replace('./photos/', '');
  } else if (imgSrc.startsWith('../photos/')) {
    imgSrc = '/photos/' + imgSrc.replace('../photos/', '');
  } else if (imgSrc.startsWith('photos/')) {
    imgSrc = '/photos/' + imgSrc.replace('photos/', '');
  } else if (!imgSrc.startsWith('/')) {
    imgSrc = '/' + imgSrc;
  }

  function handleAddToCart() {
    if (!currentUser) {
      showLoginModal(false);
      return;
    }
    addToCart({
      name,
      price: priceStr,
      category: product.category,
      image: imgSrc,
    }, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  function handleWishlist() {
    if (!currentUser) {
      showLoginModal(false);
      return;
    }
    toggleWishlist({
      name,
      price: priceStr,
      category: product.category,
      image: imgSrc,
    }, selectedSize);
  }

  return (
    <div className="product-card">
      <div className="card-image-box">
        {product.badge && <span className="card-badge">{product.badge}</span>}
        <button
          className={`wishlist-toggle-btn${inWishlist ? ' active' : ''}`}
          onClick={handleWishlist}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          {inWishlist ? '♥' : '♡'}
        </button>
        <img
          src={imgSrc || '/photos/logo.png'}
          alt={name}
          className="card-image"
          loading="lazy"
          onError={e => { e.target.style.display = 'none'; }}
        />
      </div>
      <div className="card-details">
        <p className="card-category-tag">{product.category || 'Collection'}</p>
        <h3 className="card-title">{name}</h3>
        <div className="card-price-row">
          <span className="card-price">{priceStr}</span>
          {originalPriceStr && <span className="card-original-price">{originalPriceStr}</span>}
          {discountPercent && <span className="card-discount">{typeof discountPercent === 'number' ? `${discountPercent}% OFF` : discountPercent}</span>}
        </div>
        {product.sizes && product.sizes.length > 1 && (
          <>
            <p className="card-sizes-label">Select Size:</p>
            <div className="card-sizes-row">
              {product.sizes.map(size => (
                <span
                  key={size}
                  className={`size-pill${selectedSize === size ? ' selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </span>
              ))}
            </div>
          </>
        )}
        <button
          className="card-add-cart-btn"
          onClick={handleAddToCart}
          style={added ? { background: '#2e7d32' } : {}}
        >
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

