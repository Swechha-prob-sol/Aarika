import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Women() {
  const bestSellers = [
    {
      name: 'Meadow Maxi Dress',
      category: 'Dresses',
      price: 2799,
      badge: 'Popular',
      image: 'photos/product1.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Ivy Kurta Set',
      category: 'Kurta Sets',
      price: 2399,
      badge: 'Best Seller',
      image: 'photos/kurtis.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Sage Tier Dress',
      category: 'Dresses',
      price: 2599,
      badge: 'Trending',
      image: 'photos/product3.png',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Leaf Print Top',
      category: 'Tops',
      price: 1799,
      badge: 'New',
      image: 'photos/product4.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Olive Green Kurti',
      category: 'Tops',
      price: 1999,
      badge: 'Popular',
      image: 'photos/product5.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Bloom Floral Dress',
      category: 'Dresses',
      price: 2699,
      badge: 'Trending',
      image: 'photos/product6.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    }
  ];

  const trendingStyles = [
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
    },
    {
      name: 'Green Printed Dress',
      category: 'Dresses',
      price: 2299,
      badge: 'Popular',
      image: 'photos/trend4.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Cotton Floral Kurti',
      category: 'Tops',
      price: 1699,
      badge: 'Trending',
      image: 'photos/trend5.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    }
  ];

  return (
    <div className="women-page">
      {/* HERO */}
      <div className="hero1">
        <img src="/photos/womenherosection1.png" alt="Natural Fashion" />
        <div className="hero-content">
          <br />
          <h1>NATURAL</h1>
          <h2>Looks Beautiful</h2>
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
          <Link to="/search?q=dresses" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/dresses1.webp" alt="Dresses" />
            <h4>DRESSES</h4>
          </Link>
          <Link to="/search?q=kurta%20sets" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/kurta_set.jpg" alt="Kurta Sets" />
            <h4>KURTA SETS</h4>
          </Link>
          <Link to="/search?q=tunics" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/tunics.jpg" alt="Tunics" />
            <h4>TUNICS</h4>
          </Link>
          <Link to="/search?q=tops" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/tops.jpg" alt="Tops" />
            <h4>TOPS</h4>
          </Link>
          <Link to="/search?q=kurtis" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/kurtis.jpg" alt="Kurtis" />
            <h4>KURTIS</h4>
          </Link>
          <Link to="/search?q=sarees" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/sarees.jpg" alt="Sarees" />
            <h4>SAREES</h4>
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
            <img src="/photos/everyday.jpg" alt="Everyday Elegance" />
            <div>
              <h3>EVERYDAY<br />ELEGANCE</h3>
            </div>
          </div>
          <div className="occasion">
            <img src="/photos/workwear.png" alt="Workwear Chic" />
            <div>
              <h3>WORKWEAR<br />CHIC</h3>
            </div>
          </div>
          <div className="occasion">
            <img src="/photos/festive.jpg" alt="Festive Radiance" />
            <div>
              <h3>FESTIVE<br />RADIANCE</h3>
            </div>
          </div>
          <div className="occasion">
            <img src="/photos/weekend.jpg" alt="Weekend Getaway" />
            <div>
              <h3>WEEKEND<br />GETAWAY</h3>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="collection">
        <img src="/photos/collection.png" alt="New Collection" />
        <div className="collection-text">
          <small>NEW COLLECTION</small>
          <h2>ROOTED IN NATURE,<br />MADE FOR YOU</h2>
          <p>
            Breathe in the beauty of nature and<br />
            embrace effortless style.
          </p>
          <Link to="/sales">
            <button>EXPLORE COLLECTION</button>
          </Link>
        </div>
      </section>

      {/* TRENDING */}
      <section className="section">
        <h2 className="section-title">TRENDING STYLES</h2>
        <div className="leaf-line">Loved by You</div>
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
            <img src="/photos/style1.jpg" alt="Floral & Feminine" />
            <h3>Floral<br />&amp; Feminine</h3>
            <Link to="/search?q=floral" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span>SHOP THE LOOK &rarr;</span>
            </Link>
          </div>
          <div>
            <img src="/photos/style2.jpg" alt="Minimal & Graceful" />
            <h3>Minimal<br />&amp; Graceful</h3>
            <Link to="/search?q=minimal" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span>SHOP THE LOOK &rarr;</span>
            </Link>
          </div>
          <div>
            <img src="/photos/style3.jpg" alt="Ethnic & Elegant" />
            <h3>Ethnic<br />&amp; Elegant</h3>
            <Link to="/search?q=ethnic" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span>SHOP THE LOOK &rarr;</span>
            </Link>
          </div>
          <div>
            <img src="/photos/style4.jpg" alt="Classic & Timeless" />
            <h3>Classic<br />&amp; Timeless</h3>
            <Link to="/search?q=classic" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span>SHOP THE LOOK &rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

