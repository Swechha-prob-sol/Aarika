import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { cartKey, wishlistKey } = useAuth();

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(cartKey()) || '[]');
    } catch {
      return [];
    }
  }

  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(wishlistKey()) || '[]');
    } catch {
      return [];
    }
  }

  function saveCart(arr) {
    localStorage.setItem(cartKey(), JSON.stringify(arr));
  }

  function saveWishlist(arr) {
    localStorage.setItem(wishlistKey(), JSON.stringify(arr));
  }

  const [cart, setCart] = useState(getCart);
  const [wishlist, setWishlist] = useState(getWishlist);
  const [toast, setToast] = useState(null);

  // Re-read from localStorage whenever cartKey/wishlistKey might change (login/logout)
  useEffect(() => {
    setCart(getCart());
    setWishlist(getWishlist());
    // eslint-disable-next-line
  }, [cartKey(), wishlistKey()]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  function addToCart(product, selectedSize) {
    const size = selectedSize || product.size || 'M';
    const name = product.name || product.title;
    const item = {
      id: name + '_' + size,
      name: name,
      price: product.price,
      category: product.category,
      size: size,
      image: product.image,
      qty: 1,
    };
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      let updated;
      if (existing) {
        updated = prev.map(i => i.id === item.id ? { ...i, qty: (i.qty || 1) + 1 } : i);
      } else {
        updated = [...prev, item];
      }
      saveCart(updated);
      return updated;
    });
    showToast(`Added ${item.name} (Size: ${item.size}) to Cart! 🛒`);
  }

  function removeFromCart(id) {
    setCart(prev => {
      const updated = prev.filter(i => i.id !== id);
      saveCart(updated);
      return updated;
    });
    showToast('Item removed from cart', '#8b6c3b');
  }

  function changeCartQty(id, delta) {
    setCart(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, qty: Math.max(1, (i.qty || 1) + delta) } : i);
      saveCart(updated);
      return updated;
    });
  }

  function clearCart() {
    setCart([]);
    saveCart([]);
  }

  function toggleWishlist(product, selectedSize) {
    const size = selectedSize || product.size || 'M';
    const name = product.name || product.title;
    const item = {
      id: name + '_' + size,
      name: name,
      price: product.price,
      category: product.category,
      size: size,
      image: product.image,
    };
    setWishlist(prev => {
      const idx = prev.findIndex(i => i.id === item.id);
      let updated;
      if (idx > -1) {
        updated = prev.filter((_, i) => i !== idx);
        showToast(`Removed "${item.name}" from Wishlist ♡`);
      } else {
        updated = [...prev, item];
        showToast(`Added "${item.name}" to Wishlist ♥`);
      }
      saveWishlist(updated);
      return updated;
    });
  }

  function removeFromWishlist(id) {
    setWishlist(prev => {
      const updated = prev.filter(i => i.id !== id);
      saveWishlist(updated);
      return updated;
    });
    showToast('Removed item from Wishlist ♡');
  }

  function isInWishlist(productName, size) {
    return wishlist.some(i => i.name === productName && (!size || i.size === size));
  }

  function addWishlistItemToCart(item) {
    addToCart(item, item.size);
  }

  const cartCount = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider value={{
      cart,
      wishlist,
      toast,
      cartCount,
      wishlistCount,
      addToCart,
      removeFromCart,
      changeCartQty,
      clearCart,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
      addWishlistItemToCart,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

