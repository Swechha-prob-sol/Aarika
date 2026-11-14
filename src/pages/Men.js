import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Men() {
  const bestSellers = [
    {
      name: 'Linen Shirt',
      category: 'Shirts',
      price: 2299,
      badge: 'Best Seller',
      image: 'photos/menproduct1.jpg',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      name: 'Textured Polo',
      category: 'T-Shirts',
      price: 1799,
      badge: 'Popular',
      image: 'photos/menproduct2.jpg',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      name: 'Cotton Kurta Set',
      category: 'Kurta Sets',
      price: 2499,
      badge: 'Best Seller',
      image: 'photos/menproduct3.jpg',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      name: 'Slim Fit Chinos',
      category: 'Bottoms',
      price: 1899,
      badge: 'New',
      image: 'photos/menproduct4.jpg',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      name: 'Classic Linen Shirt',
      category: 'Shirts',
      price: 2299,
      badge: 'Popular',
      image: 'photos/menproduct5.jpg',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      name: 'Utility Jacket',
      category: 'Jackets',
      price: 2999,
      badge: 'Trending',
      image: 'photos/menproduct6.jpg',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    }
  ];

  const trendingStyles = [
    {
      name: 'Olive Casual Shirt',
      category: 'Shirts',
      price: 2199,
      badge: 'Trending',
      image: 'photos/mentrend1.jpg',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      name: 'Classic Beige Tee',
      category: 'T-Shirts',
      price: 1499,
      badge: 'New',
      image: 'photos/mentrend2.jpg',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      name: 'Natural Stripe Shirt',
      category: 'Shirts',
      price: 2399,
      badge: 'Best Seller',
      image: 'photos/mentrend3.jpg',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      name: 'Forest Green Shirt',
      category: 'Shirts',
      price: 2199,
      badge: 'Popular',
      image: 'photos/mentrend4.jpg',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      name: 'Ivory Cotton Kurta',
      category: 'Kurta Sets',
      price: 2299,
      badge: 'Trending',
      image: 'photos/mentrend5.jpg',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    }
  ];

  return (
    <div className="men-page">
      {/* HERO */}
      <div className="hero1">
        <img src="/photos/hero_section_men.png" alt="Men Natural Fashion" />
        <div className="hero-content" style={{ left: '30%' }}>
          <h1>NATURAL</h1>
          <h2>Looks Good</h2>
          <h1>ON YOU</h1>
          <p>
            Timeless styles, naturally crafted<br />
            made for every you.
          </p>
          <a href="#categories" className="hero-btn">SHOP COLLECTION</a>
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="section" id="categories">
        <h2 className="section-title">SHOP BY CATEGORY</h2>
        <div className="categories">
          <Link to="/search?q=shirts" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/shirts.jpg" alt="Shirts" />
            <h4>SHIRTS</h4>
          </Link>
          <Link to="/search?q=t-shirts" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/tshirts.jpg" alt="T-Shirts" />
            <h4>T-SHIRTS</h4>
          </Link>
          <Link to="/search?q=kurta%20sets" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/kurta_setmen.jpg" alt="Kurta Sets" />
            <h4>KURTA SETS</h4>
          </Link>
          <Link to="/search?q=polos" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/polos.jpg" alt="Polos" />
            <h4>POLOS</h4>
          </Link>
          <Link to="/search?q=pants" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/pants.jpg" alt="Pants" />
            <h4>PANTS</h4>
          </Link>
          <Link to="/search?q=jackets" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/jackets.jpg" alt="Jackets" />
            <h4>JACKETS</h4>
          </Link>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="section products-section">
        <h2 className="section-title">BEST SELLERS</h2>
        <div className="products">
          {bestSellers.map(p => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="section">
        <h2 className="section-title">SHOP BY OCCASION</h2>
        <div className="occasions">
          <div className="occasion">
            <img src="/photos/meneveryday.jpg" alt="Everyday" />
            <div>
              <h3>EVERYDAY<br />ESSENTIALS</h3>
              <p>Easy styles for every moment.</p>
            </div>
          </div>
          <div className="occasion">
            <img src="/photos/menworkwear.jpg" alt="Workwear" />
            <div>
              <h3>WORKWEAR<br />SMART</h3>
              <p>Sharp and effortless everyday looks.</p>
              <span>SHOP NOW &rarr;</span>
            </div>
          </div>
          <div className="occasion">
            <img src="/photos/menfestive.jpg" alt="Festive" />
            <div>
              <h3>FESTIVE<br />ELEGANCE</h3>
              <p>Celebrate in timeless style.</p>
              <span>SHOP NOW &rarr;</span>
            </div>
          </div>
          <div className="occasion">
            <img src="/photos/menweekend.jpg" alt="Weekend" />
            <div>
              <h3>WEEKEND<br />GETAWAY</h3>
              <p>Light layers for relaxed days.</p>
              <span>SHOP NOW &rarr;</span>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="collection">
        <img src="/photos/collection.png" alt="Men Collection" />
        <div className="collection-text">
          <small>NEW COLLECTION</small>
          <h2>ROOTED IN NATURE,<br />MADE FOR YOU</h2>
          <p>
            Breathable fabrics, earthy tones and<br />
            timeless silhouettes.
          </p>
          <Link to="/sales">
            <button>EXPLORE COLLECTION</button>
          </Link>
        </div>
      </section>

      {/* TRENDING */}
      <section className="section">
        <h2 className="section-title">TRENDING STYLES</h2>
        <div className="leaf-line">Handpicked for You</div>
        <div className="trending">
          {trendingStyles.map(p => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>

      {/* STYLE INSPIRATION */}
      <section className="section inspiration-section">
        <h2 className="section-title">STYLE INSPIRATION</h2>
        <div className="inspiration">
          <div>
            <img src="/photos/menstyle1.jpg" alt="Natural Textures" />
            <h3>Natural<br />Textures</h3>
            <Link to="/search?q=textures" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span>SHOP THE LOOK &rarr;</span>
            </Link>
          </div>
          <div>
            <img src="/photos/menstyle2.jpg" alt="Minimal Essentials" />
            <h3>Minimal<br />Essentials</h3>
            <Link to="/search?q=minimal" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span>SHOP THE LOOK &rarr;</span>
            </Link>
          </div>
          <div>
            <img src="/photos/menstyle3.jpg" alt="Earthy Tones" />
            <h3>Earthy<br />Tones</h3>
            <Link to="/search?q=earthy" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span>SHOP THE LOOK &rarr;</span>
            </Link>
          </div>
          <div>
            <img src="/photos/menstyle4.jpg" alt="Timeless Layers" />
            <h3>Timeless<br />Layers</h3>
            <Link to="/search?q=layers" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span>SHOP THE LOOK &rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

