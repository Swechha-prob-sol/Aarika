import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProducts } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const initialQuery = searchParams.get('q') || '';
  const initialCat = searchParams.get('category') || 'All';

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedMap, setAddedMap] = useState({});

  const categories = ["All", "Tunics", "Tops", "Kurta Sets", "Kurtis", "Dresses", "Sarees", "Men", "Kids"];

  // Sync state to URL search params
  useEffect(() => {
    const params = {};
    if (query.trim()) params.q = query.trim();
    if (activeCategory && activeCategory !== 'All') params.category = activeCategory;
    setSearchParams(params, { replace: true });
  }, [query, activeCategory, setSearchParams]);

  const filteredProducts = useMemo(() => {
    let list = searchProducts(query, activeCategory);
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [query, activeCategory, sortBy]);

  function handleSizeSelect(productId, size) {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  }

  function handleAddToCart(product) {
    const chosenSize = selectedSizes[product.id] || (product.sizes ? product.sizes[0] : 'M');
    addToCart({
      name: product.title,
      price: product.price,
      category: product.category,
      image: product.image,
    }, chosenSize);

    setAddedMap(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  }

  function handleWishlistToggle(product) {
    const chosenSize = selectedSizes[product.id] || (product.sizes ? product.sizes[0] : 'M');
    toggleWishlist({
      name: product.title,
      price: product.price,
      category: product.category,
      image: product.image,
    }, chosenSize);
  }

  return (
    <div className="search-page-wrapper">
      {/* Search Header Hero */}
      <section className="search-header-hero">
        <p className="search-hero-eyebrow">Aarika Discovery Collection</p>
        <h1 className="search-hero-title">Find Your Perfect Style</h1>
        <div className="search-gold-divider"></div>

        {/* Search Bar Form */}
        <div className="search-bar-container">
          <div className="search-input-wrap">
            <span className="search-input-icon">🔍</span>
            <input
              type="text"
              className="main-search-input"
              placeholder="Search for tunics, tops, kurta sets, kurtis, dresses, sarees..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="clear-search-btn"
                onClick={() => setQuery('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
            <button className="search-submit-btn" type="button">Search</button>
          </div>
        </div>

        {/* Category Chips */}
        <div className="search-categories-bar">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Results summary bar & Sort */}
      <div className="results-info-container">
        <div className="results-count-text">
          {query.trim() ? (
            <span>
              Showing <strong>{filteredProducts.length}</strong> results for <strong>"{query}"</strong>
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            </span>
          ) : (
            <span>
              Showing <strong>{filteredProducts.length}</strong> products
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            </span>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="sort-container">
          <span className="sort-label">Sort by:</span>
          <select
            className="sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Products Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => {
            const currentSize = selectedSizes[product.id] || (product.sizes ? product.sizes[0] : 'M');
            const isWishlisted = isInWishlist(product.title, currentSize);
            const isAdded = !!addedMap[product.id];
            const discountPercent = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;

            let imgSrc = product.image || '';
            if (imgSrc.startsWith('./photos/')) imgSrc = '/photos/' + imgSrc.replace('./photos/', '');
            else if (imgSrc.startsWith('../photos/')) imgSrc = '/photos/' + imgSrc.replace('../photos/', '');
            else if (imgSrc.startsWith('photos/')) imgSrc = '/photos/' + imgSrc.replace('photos/', '');
            else if (!imgSrc.startsWith('/')) imgSrc = '/' + imgSrc;

            return (
              <div key={product.id} className="product-card">
                <div className="card-image-box">
                  {product.badge && <span className="card-badge">{product.badge}</span>}
                  <button
                    className={`wishlist-toggle-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={() => handleWishlistToggle(product)}
                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    {isWishlisted ? '♥' : '♡'}
                  </button>
                  <img
                    src={imgSrc}
                    alt={product.title}
                    className="card-image"
                    loading="lazy"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                </div>

                <div className="card-details">
                  <span className="card-category-tag">{product.category}</span>
                  <h3 className="card-title" title={product.title}>{product.title}</h3>

                  <div className="card-price-row">
                    <span className="card-price">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span className="card-original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                    {discountPercent > 0 && (
                      <span className="card-discount">{discountPercent}% OFF</span>
                    )}
                  </div>

                  {product.sizes && product.sizes.length > 1 && (
                    <div>
                      <div className="card-sizes-label">Select Size:</div>
                      <div className="card-sizes-row">
                        {product.sizes.map(size => (
                          <button
                            key={size}
                            type="button"
                            className={`size-pill ${currentSize === size ? 'selected' : ''}`}
                            onClick={() => handleSizeSelect(product.id, size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    className={`card-add-cart-btn ${isAdded ? 'added' : ''}`}
                    onClick={() => handleAddToCart(product)}
                    style={isAdded ? { background: '#2e7d32' } : {}}
                  >
                    {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="search-empty-state">
          <div className="empty-icon">🔍</div>
          <h2 className="empty-title">No Styles Found</h2>
          <p className="empty-subtitle">
            We couldn't find any products matching "{query}". Try adjusting your keywords or browse popular categories below.
          </p>
          <div className="empty-suggestions-label">Popular Searches</div>
          <div className="empty-suggestions">
            {["Tunics", "Tops", "Kurta Sets", "Kurtis", "Dresses", "Sarees"].map(item => (
              <button
                key={item}
                className="suggestion-pill"
                onClick={() => {
                  setQuery(item.toLowerCase());
                  setActiveCategory('All');
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

