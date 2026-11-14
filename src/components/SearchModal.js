import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { searchProducts } from '../data/products';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);

      function handleKeyDown(e) {
        if (e.key === 'Escape') onClose();
      }
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }
    const matches = searchProducts(trimmed).slice(0, 5);
    setResults(matches);
  }, [query]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    onClose();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/search');
    }
  }

  function handleBackdropClick(e) {
    if (e.target.classList.contains('nav-search-overlay')) {
      onClose();
    }
  }

  return (
    <div className="nav-search-overlay active" onClick={handleBackdropClick}>
      <button className="nav-search-close" onClick={onClose} title="Close search">&times;</button>
      <div className="nav-search-box">
        <form onSubmit={handleSubmit} className="search-input-wrap" style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.7)', background: 'rgba(18, 33, 22, 0.96)' }}>
          <span className="search-input-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="main-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={window.innerWidth <= 600 ? 'Search styles...' : 'Search for tunics, tops, kurta sets, kurtis, dresses...'}
            autoComplete="off"
          />
          <button type="submit" className="search-submit-btn">Search</button>
        </form>

        {query.trim().length > 0 && (
          <div className="nav-search-dropdown" style={{ display: 'block' }}>
            {results.length === 0 ? (
              <div style={{ padding: '1.2rem', textAlign: 'center', color: '#a6b5a9', fontSize: '0.9rem' }}>
                No direct matches found. Press <strong style={{ color: '#c59b5f' }}>Enter</strong> to search all styles.
              </div>
            ) : (
              <>
                {results.map((p, idx) => {
                  let imgSrc = p.image || '';
                  if (!imgSrc.startsWith('/')) imgSrc = '/' + imgSrc;
                  return (
                    <Link
                      key={idx}
                      to={`/search?q=${encodeURIComponent(p.title)}`}
                      className="dropdown-item"
                      onClick={onClose}
                    >
                      <img
                        src={imgSrc}
                        alt={p.title}
                        className="dropdown-thumb"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div>
                        <div className="dropdown-title">{p.title}</div>
                        <div className="dropdown-price">
                          ₹{p.price.toLocaleString('en-IN')}{' '}
                          <span style={{ fontSize: '0.75rem', color: '#c59b5f', marginLeft: '0.4rem' }}>
                            ({p.category})
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
                <div style={{ padding: '0.75rem', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
                  <Link
                    to={`/search?q=${encodeURIComponent(query.trim())}`}
                    style={{ color: '#c59b5f', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}
                    onClick={onClose}
                  >
                    View all results for "{query.trim()}" &rarr;
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

