import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const trendingProducts = [
    {
      name: 'Embroidered Ethnic Dress',
      category: 'Women',
      price: 2998,
      originalPrice: 4999,
      badge: 'New',
      image: 'photos/trending_women.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Linen Casual Shirt',
      category: 'Men',
      price: 1799,
      originalPrice: 2999,
      badge: 'Trending',
      image: 'photos/Trending_men.jpg',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      name: 'Floral Print Kurta Set',
      category: 'Women',
      price: 2499,
      originalPrice: 3899,
      badge: 'Popular',
      image: 'photos/trending_floral.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Cotton Printed T-Shirt',
      category: 'Kids',
      price: 699,
      originalPrice: 1199,
      badge: 'Trending',
      image: 'photos/trending_kids.jpg',
      sizes: ['2Y', '4Y', '6Y', '8Y', '10Y']
    }
  ];

  const featuredProducts = [
    {
      name: 'Elegant Floral Dress',
      category: 'Women',
      price: 2799,
      originalPrice: 4599,
      badge: 'Best Seller',
      image: 'photos/featured_floral.jpeg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Slim Fit Formal Shirt',
      category: 'Men',
      price: 1999,
      originalPrice: 2999,
      badge: 'Popular',
      image: 'photos/featured_shirt.jpeg',
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    {
      name: 'Knitted Winter Sweater',
      category: 'Women',
      price: 1899,
      originalPrice: 2799,
      badge: 'Best Seller',
      image: 'photos/feature_sweater.jpeg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Hooded Sweatshirt',
      category: 'Kids',
      price: 1299,
      originalPrice: 1999,
      badge: 'New',
      image: 'photos/Hooded_Sweatshirt_kids.webp',
      sizes: ['2Y', '4Y', '6Y', '8Y', '10Y']
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero"
        id="home"
        style={{
          backgroundImage: "linear-gradient(rgba(11, 28, 17, 0.45), rgba(11, 28, 17, 0.45)), url('/photos/img1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 15%',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          color: '#ffffff',
          position: 'relative',
          padding: '4rem 5%',
          boxSizing: 'border-box'
        }}
      >
        <div className="hero-content" style={{ position: 'relative', top: 'auto', left: 'auto', color: '#ffffff', maxWidth: '650px', zIndex: 2 }}>
          <p className="hero-label" style={{ color: '#e0e0e0', letterSpacing: '0.15em', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            NEW COLLECTION 2026
          </p>
          <h1 style={{ color: '#ffffff', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 1rem' }}>
            Luxury Fashion for Every Occasion
          </h1>
          <p className="hero-subtitle" style={{ color: '#f0f0f0', fontSize: '1.1rem', margin: '0 0 2rem' }}>
            Timeless styles crafted for the modern you.
          </p>
          <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/new-arrivals" className="cta-button primary-btn" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
              Shop Now
            </Link>
            <Link to="/sales" className="cta-button secondary-btn" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories" id="shop" style={{ display: 'block' }}>
        <header className="section-head" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p className="section-eyebrow">Shop By Category</p>
          <h2>Find Your Style</h2>
        </header>

        <div className="category-grid">
          <article className="category-card">
            <img src="/photos/category_women.jpeg" alt="Woman wearing an embroidered ethnic kurta" />
            <div className="category-body">
              <h3>Women</h3>
              <Link to="/women" className="category-link">Discover Now</Link>
            </div>
          </article>

          <article className="category-card">
            <img src="/photos/category_men.jpeg" alt="Man wearing a dark green casual shirt" />
            <div className="category-body">
              <h3>Men</h3>
              <Link to="/men" className="category-link">Explore Now</Link>
            </div>
          </article>

          <article className="category-card">
            <img src="/photos/category_kids.jpeg" alt="Child wearing a bright cotton t-shirt" />
            <div className="category-body">
              <h3>Kids</h3>
              <Link to="/kids" className="category-link">Shop Now</Link>
            </div>
          </article>
        </div>
      </section>

      {/* Trending Products */}
      <section className="trending-products">
        <header className="section-head">
          <p className="section-eyebrow">Trending Now</p>
          <h2>Trending Products</h2>
        </header>

        <div className="products-grid">
          {trendingProducts.map(p => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <img src="/photos/promo.png" alt="Models wearing the latest StyleHub clothing collection" />
        <div className="promo-content">
          <h2>Up To 50% Off</h2>
          <p className="promo-text">Limited time offer on the season's freshest clothing.</p>
          <Link to="/sales" className="promo-btn">Shop Collection</Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <header className="section-head">
          <p className="section-eyebrow">Best Sellers</p>
          <h2>Featured Products</h2>
        </header>

        <div className="products-grid">
          {featuredProducts.map(p => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="why-shop">
        <div className="why-grid">
          <article className="why-card">
            <h3>Free Shipping</h3>
            <p>On all orders above &#8377;999</p>
          </article>
          <article className="why-card">
            <h3>Easy Returns</h3>
            <p>Within 7 days of purchase</p>
          </article>
          <article className="why-card">
            <h3>Premium Fabrics</h3>
            <p>Quality you can feel</p>
          </article>
          <article className="why-card">
            <h3>Secure Payment</h3>
            <p>100% safe checkout</p>
          </article>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <h4 className="testimonials-subtitle">WHAT OUR CUSTOMERS SAY</h4>
        <h2 className="testimonials-title">Customer Testimonials</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar">👤</div>
              <div className="testimonial-info">
                <h3>Priya Sharma</h3>
                <div className="stars">★★★★★</div>
              </div>
            </div>
            <p>The quality and fit are amazing. Aarika is my new favorite brand!</p>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar">👤</div>
              <div className="testimonial-info">
                <h3>Ananya Verma</h3>
                <div className="stars">★★★★★</div>
              </div>
            </div>
            <p>Absolutely love the collection. Elegant and premium.</p>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar">👤</div>
              <div className="testimonial-info">
                <h3>Rohan Mehta</h3>
                <div className="stars">★★★★★</div>
              </div>
            </div>
            <p>Stylish, comfortable and worth every penny!</p>
          </div>
        </div>
      </section>
    </div>
  );
}

