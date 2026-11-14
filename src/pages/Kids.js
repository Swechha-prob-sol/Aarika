import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Kids() {
  const bestSellers = [
    {
      name: 'Meadow Floral Dress',
      category: 'Dresses',
      price: 1499,
      badge: 'Popular',
      image: 'photos/kidsproduct1.jpg',
      sizes: ['2Y', '4Y', '6Y', '8Y', '10Y']
    },
    {
      name: 'Happy Days T-Shirt',
      category: 'T-Shirts',
      price: 899,
      badge: 'New',
      image: 'photos/kidsproduct2.jpg',
      sizes: ['2Y', '4Y', '6Y', '8Y', '10Y']
    },
    {
      name: 'Little Explorer Set',
      category: 'Co-ord Sets',
      price: 1299,
      badge: 'Trending',
      image: 'photos/kidsproduct3.jpg',
      sizes: ['2Y', '4Y', '6Y', '8Y', '10Y']
    },
    {
      name: 'Little Prince Kurta',
      category: 'Ethnic Wear',
      price: 1599,
      badge: 'Best Seller',
      image: 'photos/kidsproduct4.jpg',
      sizes: ['2Y', '4Y', '6Y', '8Y', '10Y']
    },
    {
      name: 'Easy Cotton Pants',
      category: 'Bottoms',
      price: 999,
      badge: 'New',
      image: 'photos/kidsproduct5.jpg',
      sizes: ['2Y', '4Y', '6Y', '8Y', '10Y']
    },
    {
      name: 'Little Adventure Jacket',
      category: 'Jackets',
      price: 1799,
      badge: 'Trending',
      image: 'photos/kidsproduct6.jpg',
      sizes: ['2Y', '4Y', '6Y', '8Y', '10Y']
    }
  ];

  const trendingStyles = [
    {
      name: 'Garden Party Dress',
      category: 'Dresses',
      price: 1399,
      badge: 'Popular',
      image: 'photos/kidstrend1.jpg',
      sizes: ['2Y', '4Y', '6Y', '8Y', '10Y']
    },
    {
      name: 'Mini Explorer Tee',
      category: 'T-Shirts',
      price: 799,
      badge: 'New',
      image: 'photos/kidstrend2.jpg',
      sizes: ['2Y', '4Y', '6Y', '8Y', '10Y']
    },
    {
      name: 'Sunny Day Co-ord',
      category: 'Co-ord Sets',
      price: 1199,
      badge: 'Trending',
      image: 'photos/kidstrend3.jpg',
      sizes: ['2Y', '4Y', '6Y', '8Y', '10Y']
    },
    {
      name: 'Festive Little Star',
      category: 'Ethnic Wear',
      price: 1699,
      badge: 'Best Seller',
      image: 'photos/kidstrend4.jpg',
      sizes: ['2Y', '4Y', '6Y', '8Y', '10Y']
    },
    {
      name: 'Little Day-Out Set',
      category: 'Co-ord Sets',
      price: 1299,
      badge: 'Popular',
      image: 'photos/kidstrend5.jpg',
      sizes: ['2Y', '4Y', '6Y', '8Y', '10Y']
    }
  ];

  return (
    <div className="kids-page">
      {/* HERO */}
      <div className="hero1">
        <img src="/photos/kidsherosection.png" alt="Kids Natural Fashion" />
        <div className="hero-content">
          <h1>PLAYFUL</h1>
          <h2>Looks Beautiful</h2>
          <h1>ON THEM</h1>
          <p>
            Comfy styles, made with love<br />
            for every little adventure.
          </p>
          <a href="#categories" className="hero-btn">SHOP COLLECTION</a>
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="section" id="categories">
        <h2 className="section-title">SHOP BY CATEGORY</h2>
        <div className="leaf-line"></div>
        <div className="categories">
          <Link to="/search?q=dresses" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/kidsdresses.jpg" alt="Dresses" />
            <h4>DRESSES</h4>
          </Link>
          <Link to="/search?q=t-shirts" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/kidstshirt.jpg" alt="T-Shirts" />
            <h4>T-SHIRTS</h4>
          </Link>
          <Link to="/search?q=co-ord" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/kidssets.jpg" alt="Co-ord Sets" />
            <h4>CO-ORD SETS</h4>
          </Link>
          <Link to="/search?q=ethnic" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/kidskurtas.jpg" alt="Ethnic Wear" />
            <h4>ETHNIC WEAR</h4>
          </Link>
          <Link to="/search?q=bottoms" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/kidsbottoms.jpg" alt="Bottoms" />
            <h4>BOTTOMS</h4>
          </Link>
          <Link to="/search?q=jackets" className="category" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src="/photos/kidsjackets.jpg" alt="Jackets" />
            <h4>JACKETS</h4>
          </Link>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="section products-section">
        <h2 className="section-title">BEST SELLERS</h2>
        <div className="leaf-line"></div>
        <div className="products">
          {bestSellers.map(p => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="section">
        <h2 className="section-title">SHOP BY OCCASION</h2>
        <div className="leaf-line"></div>
        <div className="occasions">
          <div className="occasion">
            <img src="/photos/kidseveryday.jpg" alt="Everyday" />
            <div>
              <h3>EVERYDAY<br />PLAY</h3>
              <p>Comfy looks for little adventures.</p>
              <span>SHOP NOW &rarr;</span>
            </div>
          </div>
          <div className="occasion">
            <img src="/photos/kidsouting.jpg" alt="Outing" />
            <div>
              <h3>OUTING<br />READY</h3>
              <p>Easy styles for fun family days.</p>
              <span>SHOP NOW &rarr;</span>
            </div>
          </div>
          <div className="occasion">
            <img src="/photos/kidsfestive.jpg" alt="Festive" />
            <div>
              <h3>FESTIVE<br />SPARKLE</h3>
              <p>Special outfits for special moments.</p>
              <span>SHOP NOW &rarr;</span>
            </div>
          </div>
          <div className="occasion">
            <img src="/photos/kidsweekend.jpg" alt="Weekend" />
            <div>
              <h3>WEEKEND<br />FUN</h3>
              <p>Playful looks made for weekends.</p>
              <span>SHOP NOW &rarr;</span>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="collection">
        <img src="/photos/collection.png" alt="Kids Collection" />
        <div className="collection-text">
          <small>NEW COLLECTION</small>
          <h2>MADE FOR LITTLE<br />ADVENTURES</h2>
          <p>
            Soft fabrics, playful prints and<br />
            comfortable styles for every day.
          </p>
          <Link to="/sales">
            <button>EXPLORE COLLECTION</button>
          </Link>
        </div>
      </section>

      {/* TRENDING */}
      <section className="section">
        <h2 className="section-title">TRENDING STYLES</h2>
        <div className="leaf-line">Little Favorites</div>
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
            <img src="/photos/kidsstyle1.jpg" alt="Playful Prints" />
            <h3>Playful<br />Prints</h3>
          </div>
          <div>
            <img src="/photos/kidsstyle2.jpg" alt="Little Explorer" />
            <h3>Little<br />Explorer</h3>
          </div>
          <div>
            <img src="/photos/kidsstyle3.jpg" alt="Festive Joy" />
            <h3>Festive<br />Joy</h3>
          </div>
          <div>
            <img src="/photos/kidsstyle4.jpg" alt="Everyday Comfort" />
            <h3>Everyday<br />Comfort</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

