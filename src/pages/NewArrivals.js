import React from 'react';
import ProductCard from '../components/ProductCard';

export default function NewArrivals() {
  const products = [
    {
      name: 'Pastel Bloom Maxi',
      category: 'Dresses',
      price: 1599,
      badge: 'New',
      image: 'photos/na1.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Ivory Embroidered Kurta',
      category: 'Kurta Sets',
      price: 1699,
      badge: 'Best Seller',
      image: 'photos/na2.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Sage Green Wrap Dress',
      category: 'Dresses',
      price: 1499,
      badge: 'Trending',
      image: 'photos/na3.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Navy Belted Jumpsuit',
      category: 'Jumpsuits',
      price: 1799,
      badge: 'Popular',
      image: 'photos/na4.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Peach Ruffle Midi',
      category: 'Dresses',
      price: 1399,
      badge: 'New',
      image: 'photos/na5.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Beige Linen Pants',
      category: 'Bottoms',
      price: 1299,
      badge: 'Trending',
      image: 'photos/na6.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Lilac Tiered Dress',
      category: 'Dresses',
      price: 1499,
      badge: 'New',
      image: 'photos/na7.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Mustard Printed Kurta',
      category: 'Ethnic Wear',
      price: 1299,
      badge: 'Popular',
      image: 'photos/na8.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Olive Shirt Dress',
      category: 'Dresses',
      price: 1599,
      badge: 'New',
      image: 'photos/na9.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Black Co-ord Set',
      category: 'Co-ord Sets',
      price: 1899,
      badge: 'Best Seller',
      image: 'photos/na10.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Floral A-Line Dress',
      category: 'Dresses',
      price: 1399,
      badge: 'Trending',
      image: 'photos/na11.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Mint Sleeveless Blazer',
      category: 'Blazers',
      price: 1299,
      badge: 'New',
      image: 'photos/na12.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    }
  ];

  return (
    <div className="new-arrivals-page">
      {/* Hero Section */}
      <section className="arrivals-hero">
        <div className="hero-left">
          <p className="eyebrow">FRESH STYLES</p>
          <h1>NEW</h1>
          <h2>ARRIVALS</h2>
          <p className="subtitle">Fresh styles. First looks. Yours now.</p>
          <a href="#arrivals-grid" className="shop-now-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            SHOP NOW <span>&rarr;</span>
          </a>
        </div>

        <div className="hero-center">
          <p className="cursive-text">New Season</p>
          <p className="cursive-text-white">Same You, But Better</p>
          <div className="gold-underline"></div>
        </div>

        <div className="hero-right">
          <div className="arch-box">
            <div className="arch-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c59b5f" strokeWidth="1.5">
                <path d="M12 2L15 8L22 9L17 14L18 21L12 17.5L6 21L7 14L2 9L9 8L12 2Z" fill="#c59b5f" />
              </svg>
            </div>
            <p>TRENDING<br />STYLES</p>
            <p>EXCLUSIVE<br />COLLECTIONS</p>
            <p>LIMITED STOCK</p>
          </div>
        </div>
      </section>

      {/* Section Header */}
      <div className="section-header" id="arrivals-grid">
        <p className="section-subtitle">LATEST FROM AARIKA</p>
        <h2 className="section-title">NEW ARRIVALS</h2>
        <div className="separator">
          <span></span>
          <div className="diamond"></div>
          <span></span>
        </div>
        <p className="section-desc">Be the first to wear what's next.</p>
      </div>

      {/* Product Grid */}
      <section className="arrivals-products">
        <div className="arrivals-grid">
          {products.map(p => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

