import React from 'react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();
  if (!toast) return null;
  return (
    <div className="aarika-toast" style={{ opacity: 1, transform: 'translateY(0)' }}>
      {toast}
    </div>
  );
}

