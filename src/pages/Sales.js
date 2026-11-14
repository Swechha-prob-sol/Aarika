import React from 'react';
import ProductCard from '../components/ProductCard';

export default function Sales() {
  const saleProducts = [
    {
      name: 'Floral Print Maxi Dress',
      category: 'Dresses',
      price: 1399,
      originalPrice: 3499,
      badge: '60% OFF',
      image: 'photos/sales1.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Embroidered Kurta Set',
      category: 'Kurta Sets',
      price: 1499,
      originalPrice: 2999,
      badge: '50% OFF',
      image: 'photos/sales2.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Polka Dot Wrap Dress',
      category: 'Dresses',
      price: 1499,
      originalPrice: 2499,
      badge: '40% OFF',
      image: 'photos/sales3.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Linen Shirt Dress',
      category: 'Dresses',
      price: 1399,
      originalPrice: 1999,
      badge: '30% OFF',
      image: 'photos/sales4.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Pleated Midi Dress',
      category: 'Dresses',
      price: 1399,
      originalPrice: 2799,
      badge: '50% OFF',
      image: 'photos/sales5.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Cotton Co-ord Set',
      category: 'Co-ord Sets',
      price: 1199,
      originalPrice: 2199,
      badge: '45% OFF',
      image: 'photos/sales6.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Chikankari Kurta',
      category: 'Ethnic Wear',
      price: 1299,
      originalPrice: 1999,
      badge: '35% OFF',
      image: 'photos/sales7.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Printed A-line Dress',
      category: 'Dresses',
      price: 1199,
      originalPrice: 2399,
      badge: '50% OFF',
      image: 'photos/sales8.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Strappy Summer Dress',
      category: 'Dresses',
      price: 999,
      originalPrice: 2499,
      badge: '60% OFF',
      image: 'photos/sales9.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Ruffled Top',
      category: 'Tops',
      price: 899,
      originalPrice: 1499,
      badge: '40% OFF',
      image: 'photos/sales10.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'High Waist Pants',
      category: 'Bottoms',
      price: 1259,
      originalPrice: 1799,
      badge: '30% OFF',
      image: 'photos/sales11.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Boho Maxi Dress',
      category: 'Dresses',
      price: 1499,
      originalPrice: 2999,
      badge: '50% OFF',
      image: 'photos/sales12.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Mint Green Kurta Set',
      category: 'Kurta Sets',
      price: 1259,
      originalPrice: 2299,
      badge: '45% OFF',
      image: 'photos/sales13.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Tiered Maxi Skirt',
      category: 'Skirts',
      price: 899,
      originalPrice: 2199,
      badge: '60% OFF',
      image: 'photos/sales14.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
      name: 'Sleeveless Blazer',
      category: 'Blazers',
      price: 1299,
      originalPrice: 1999,
      badge: '35% OFF',
      image: 'photos/sales15.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL']
    }
  ];

  return (
    <div className="sales-page">
      {/* Hero Section */}
      <section className="sale-hero">
        <div className="sale-hero-content">
          <p className="eyebrow">LIMITED TIME OFFER</p>
          <h1>SALE</h1>
          <h2>UP TO 60% OFF</h2>
          <p>Grab your favorites before they're gone!</p>
          <a href="#sales-grid" className="shop-now-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
            SHOP NOW
          </a>
        </div>
        <div className="sale-hero-box">
          <p className="limited-time">LIMITED TIME ONLY</p>
          <h3>SPECIAL OFFERS</h3>
          <p className="dont-miss">Don't Miss Out!</p>
        </div>
      </section>

      {/* Results count */}
      <div className="results-info" id="sales-grid">
        <p>Showing 15 results</p>
        <div className="separator">
          <span></span>
          <div className="diamond"></div>
          <span></span>
        </div>
      </div>

      {/* Product Grid */}
      <section className="sales-products">
        <div className="sales-grid">
          {saleProducts.map(p => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

