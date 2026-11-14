import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'url("/photos/loadingbackimg1.png") center/cover no-repeat',
      overflow: 'hidden'
    }}>
      <div style={{ textAlign: 'center', marginTop: '220px' }}>
        <h1 style={{
          font: '600 72px "Cormorant Garamond", serif',
          letterSpacing: '8px',
          color: '#f7f5ef'
        }}>
          AARIKA
        </h1>
        <h2 style={{
          font: '300 18px Montserrat, sans-serif',
          letterSpacing: '10px',
          color: '#c9a85b',
          margin: '8px 0 25px'
        }}>
          SINCE 2026
        </h2>
        <div style={{
          width: '180px',
          height: '1px',
          background: '#c9a85b',
          margin: '0 auto 30px'
        }}></div>
        <div style={{
          font: '400 20px Montserrat, sans-serif',
          letterSpacing: '6px',
          color: '#d8bf77',
          marginBottom: '18px'
        }}>
          LOADING...
        </div>
        <div style={{
          width: '500px',
          maxWidth: '85vw',
          height: '10px',
          border: '2px solid #c9a85b',
          overflow: 'hidden',
          margin: '0 auto'
        }}>
          <div style={{ height: '100%', width: '100%', background: '#d7bb71' }}></div>
        </div>
        <div style={{
          marginTop: '18px',
          font: '300 14px Montserrat, sans-serif',
          letterSpacing: '4px',
          color: '#c9a85b'
        }}>
          CRAFTED WITH CARE, INSPIRED BY NATURE
        </div>
      </div>
    </div>
  );
}

