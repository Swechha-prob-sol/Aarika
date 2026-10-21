/* =============================================================
   Aarika Store — Cart & Wishlist (localStorage)
   Works on every page. No external deps needed.
   ============================================================= */

(function () {
  'use strict';

  /* ── helpers ─────────────────────────────────────────── */
  /* Use per-user keys if AarikaAuth is available, else fall back to guest keys */
  function _cartKey()     { return (window.AarikaAuth && window.AarikaAuth.cartKey)     ? window.AarikaAuth.cartKey()     : 'aarika_cart_guest'; }
  function _wishlistKey() { return (window.AarikaAuth && window.AarikaAuth.wishlistKey) ? window.AarikaAuth.wishlistKey() : 'aarika_wishlist_guest'; }

  function getCart()     { try { return JSON.parse(localStorage.getItem(_cartKey())     || '[]'); } catch(e) { return []; } }
  function getWishlist() { try { return JSON.parse(localStorage.getItem(_wishlistKey()) || '[]'); } catch(e) { return []; } }
  function saveCart(arr)     { localStorage.setItem(_cartKey(),     JSON.stringify(arr)); }
  function saveWishlist(arr) { localStorage.setItem(_wishlistKey(), JSON.stringify(arr)); }

  /* Build a product object from any .product-card element */
  function cardToProduct(card) {
    const img      = card.querySelector('.card-image, img');
    const title    = card.querySelector('.card-title, h3');
    const price    = card.querySelector('.card-price');
    const category = card.querySelector('.card-category-tag, .product-category');
    const selected = card.querySelector('.size-pill.selected') || card.querySelector('.size-pill');
    return {
      id:       (title ? title.textContent.trim() : '') + '_' + Date.now(),
      name:     title    ? title.textContent.trim()    : 'Product',
      price:    price    ? price.textContent.trim()    : '',
      category: category ? category.textContent.trim() : '',
      size:     selected ? selected.textContent.trim() : 'M',
      image:    img      ? img.getAttribute('src')     : '',
    };
  }

  /* ── toast notification ───────────────────────────────── */
  var toastTimer = null;
  function showToast(msg, color) {
    var toast = document.querySelector('.aarika-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'aarika-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    if (color) {
      toast.style.borderColor = color;
    } else {
      toast.style.borderColor = '#c59b5f';
    }
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      if (toast) {
        toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(15px)';
        setTimeout(function () {
          if (toast && toast.parentNode) {
            toast.parentNode.removeChild(toast);
          }
        }, 320);
      }
    }, 2400);
  }

  /* ── ADD TO CART ─────────────────────────────────────── */
  function bindAddToCart() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.card-add-cart-btn');
      if (!btn || btn.disabled) return;
      var card = btn.closest('.product-card');
      if (!card) return;

      var product = cardToProduct(card);
      // Use name+size as unique key so duplicates increment qty
      var cart = getCart();
      var existing = cart.find(function (i) {
        return i.name === product.name && i.size === product.size;
      });
      if (existing) {
        existing.qty = (existing.qty || 1) + 1;
      } else {
        product.qty = 1;
        product.id  = product.name + '_' + product.size;
        cart.push(product);
      }
      saveCart(cart);
      updateCartBadge();

      /* Button feedback */
      var orig = btn.textContent;
      btn.textContent = '✓ Added to Cart';
      btn.style.background = '#2e7d32';
      setTimeout(function () {
        btn.textContent = orig;
        btn.style.background = '';
      }, 1400);

      showToast('Added ' + product.name + ' (Size: ' + product.size + ') to Cart! 🛒');
    });
  }

  /* Update heart state for a specific card based on its currently selected size */
  function updateCardWishlistState(card) {
    if (!card) return;
    var title = card.querySelector('.card-title, h3');
    var btn   = card.querySelector('.wishlist-toggle-btn');
    if (!btn || !title) return;
    var name = title.textContent.trim();
    var selected = card.querySelector('.size-pill.selected') || card.querySelector('.size-pill');
    var size = selected ? selected.textContent.trim() : 'M';
    var wishlist = getWishlist();
    var isWishlisted = wishlist.some(function (i) {
      return i.name === name && (i.size ? i.size === size : true);
    });
    if (isWishlisted) {
      btn.textContent = '♥';
      btn.classList.add('active');
    } else {
      btn.textContent = '♡';
      btn.classList.remove('active');
    }
  }

  /* ── ADD TO WISHLIST (heart toggle) ──────────────────── */
  function bindWishlistToggle() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.wishlist-toggle-btn');
      if (!btn) return;
      var card = btn.closest('.product-card');
      if (!card) return;

      var product = cardToProduct(card);
      var wishlist = getWishlist();
      var idx = wishlist.findIndex(function (i) {
        return i.name === product.name && (i.size ? i.size === product.size : true);
      });

      if (idx > -1) {
        /* already in wishlist — remove */
        wishlist.splice(idx, 1);
        saveWishlist(wishlist);
        btn.textContent = '♡';
        btn.classList.remove('active');
        showToast('Removed "' + product.name + '" (Size: ' + product.size + ') from Wishlist ♡', '#8b6c3b');
      } else {
        /* add */
        product.id = product.name + '_' + product.size;
        wishlist.push(product);
        saveWishlist(wishlist);
        btn.textContent = '♥';
        btn.classList.add('active');
        showToast('Added "' + product.name + '" (Size: ' + product.size + ') to Wishlist ♥', '#c59b5f');
      }
    });
  }

  /* Restore heart state on page load */
  function restoreWishlistButtons() {
    document.querySelectorAll('.product-card').forEach(function (card) {
      updateCardWishlistState(card);
    });
  }

  /* ── CART BADGE (count on cart icon) ─────────────────── */
  function updateCartBadge() {
    var cart  = getCart();
    var total = cart.reduce(function (s, i) { return s + (i.qty || 1); }, 0);
    document.querySelectorAll('.cart-count-badge').forEach(function (el) {
      el.textContent = total;
      el.style.display = total ? 'inline-block' : 'none';
    });
  }

  /* ── SIZE PILL SELECTION ─────────────────────────────── */
  function bindSizePills() {
    document.addEventListener('click', function (e) {
      var pill = e.target.closest('.size-pill');
      if (!pill) return;
      var row = pill.closest('.card-sizes-row');
      if (!row) return;
      row.querySelectorAll('.size-pill').forEach(function (p) {
        p.classList.remove('selected');
      });
      pill.classList.add('selected');

      var card = pill.closest('.product-card');
      if (card) {
        updateCardWishlistState(card);
      }
    });
  }

  /* ── CART PAGE ────────────────────────────────────────── */
  function isCartPage() {
    return document.querySelector('.cart-box') !== null;
  }

  function renderDynamicCart() {
    var cart = getCart();
    var dynamicBox = document.getElementById('dynamic-cart-items');
    var subtitleEl = document.getElementById('cart-subtitle');
    var headingEl = document.getElementById('cart-items-heading');

    var totalItems = cart.reduce(function (s, i) { return s + (i.qty || 1); }, 0);

    if (headingEl) {
      headingEl.textContent = 'Cart Items (' + totalItems + ')';
    }
    if (subtitleEl) {
      subtitleEl.textContent = totalItems === 0
        ? 'Your cart is currently empty.'
        : 'You have ' + totalItems + ' item' + (totalItems === 1 ? '' : 's') + ' in your cart.';
    }

    if (!dynamicBox) return;

    if (cart.length === 0) {
      dynamicBox.innerHTML = '<div style="text-align:center;padding:3rem 1rem;color:#8a8a8a;">' +
        '<p style="font-size:2.5rem;margin-bottom:0.5rem;">🛒</p>' +
        '<p style="font-size:1.15rem;font-weight:600;color:#112c1b;margin-bottom:0.5rem;">Your Cart is Empty</p>' +
        '<p style="margin-bottom:1.5rem;color:#666;">Looks like you haven\'t added anything to your cart yet.</p>' +
        '<a href="../index.html" style="display:inline-block;padding:0.75rem 1.8rem;background:#112c1b;color:#fff;border-radius:30px;text-decoration:none;font-weight:600;">Continue Shopping →</a>' +
        '</div>';
      updateCartSummary();
      return;
    }

    var html = '';
    cart.forEach(function (item, idx) {
      var imgSrc = item.image || '';
      if (imgSrc.startsWith('./photos/')) {
        imgSrc = '../photos/' + imgSrc.replace('./photos/', '');
      }

      html += '<div class="cart-item" id="dyn-item-' + idx + '">' +
        '<img class="product-image" src="' + imgSrc + '" alt="' + escHtml(item.name) + '" onerror="this.style.display=\'none\'">' +
        '<div class="item-info">' +
          '<h3>' + escHtml(item.name) + '</h3>' +
          '<p class="item-code">Aarika · ' + escHtml(item.category || 'Collection') + '</p>' +
          '<div class="item-meta"><label>Size: <strong>' + escHtml(item.size || 'M') + '</strong></label></div>' +
          '<div class="item-actions">' +
            '<button class="remove" onclick="AarikaStore.removeFromCart(' + idx + ')">🗑 Remove</button>' +
          '</div>' +
        '</div>' +
        '<div class="item-price-area">' +
          '<p class="item-price">' + escHtml(item.price) + '</p>' +
          '<div class="quantity">' +
            '<button onclick="AarikaStore.changeCartQty(' + idx + ', -1)">−</button>' +
            '<span>' + (item.qty || 1) + '</span>' +
            '<button onclick="AarikaStore.changeCartQty(' + idx + ', 1)">+</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    });

    dynamicBox.innerHTML = html;
    updateCartSummary();
  }

  function updateCartSummary() {
    var cart = getCart();
    var subtotal = cart.reduce(function (s, i) {
      var price = parseFloat((i.price || '0').replace(/[^0-9.]/g, '')) || 0;
      return s + price * (i.qty || 1);
    }, 0);
    var totalItems = cart.reduce(function (s, i) { return s + (i.qty || 1); }, 0);

    var countRowEl = document.getElementById('summary-items-count');
    if (countRowEl) countRowEl.textContent = 'Items (' + totalItems + ')';

    var subtotalEl = document.getElementById('summary-subtotal');
    if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN');

    var discountEl = document.getElementById('summary-discount');
    var discount = subtotal > 0 ? (subtotal > 3000 ? 500 : 0) : 0;
    if (discountEl) discountEl.textContent = discount > 0 ? '− ₹' + discount.toLocaleString('en-IN') : '− ₹0';

    var total = Math.max(0, subtotal - discount);
    var totalEl = document.getElementById('summary-total');
    if (totalEl) totalEl.textContent = '₹' + total.toLocaleString('en-IN');
  }

  /* ── WISHLIST PAGE ────────────────────────────────────── */
  function isWishlistPage() {
    return document.querySelector('.wishlist-products, .wishlist-grid') !== null;
  }

  function renderDynamicWishlist() {
    var wishlist = getWishlist();
    var grid = document.querySelector('.wishlist-grid');
    if (!grid) return;

    var countEl = document.querySelector('.section-subtitle, #wl-count');
    if (countEl) {
      countEl.textContent = wishlist.length + ' ' + (wishlist.length === 1 ? 'ITEM SAVED' : 'ITEMS SAVED');
    }

    if (wishlist.length === 0) {
      grid.innerHTML = '<div style="text-align:center;padding:4rem 1rem;color:#8a8a8a;grid-column:1/-1;">' +
        '<p style="font-size:2.5rem;margin-bottom:0.8rem;">♡</p>' +
        '<p style="font-size:1.2rem;font-weight:600;color:#112c1b;margin-bottom:0.5rem;">Your Wishlist is Empty</p>' +
        '<p style="margin-bottom:1.5rem;color:#666;">Explore our collection and click the heart icon to save your favorite styles.</p>' +
        '<a href="../index.html" style="display:inline-block;padding:0.75rem 1.8rem;background:#112c1b;color:#fff;border-radius:30px;text-decoration:none;font-weight:600;">Explore Now →</a>' +
        '</div>';
      return;
    }

    var html = '';
    wishlist.forEach(function (item, idx) {
      var imgSrc = item.image || '';
      if (imgSrc.startsWith('./photos/')) {
        imgSrc = '../photos/' + imgSrc.replace('./photos/', '');
      }

      html += '<div class="product-card" id="wl-item-' + idx + '">' +
        '<div class="card-image-box">' +
          '<button class="wishlist-remove-btn" title="Remove from Wishlist" onclick="AarikaStore.removeFromWishlist(' + idx + ')">✕</button>' +
          '<img src="' + imgSrc + '" alt="' + escHtml(item.name) + '" class="card-image" onerror="this.style.display=\'none\'">' +
        '</div>' +
        '<div class="card-details">' +
          '<p class="card-category-tag">' + escHtml(item.category || 'Collection') + '</p>' +
          '<h3 class="card-title">' + escHtml(item.name) + '</h3>' +
          '<div class="card-price-row"><span class="card-price">' + escHtml(item.price) + '</span></div>' +
          '<p class="card-sizes-label">Select Size:</p>' +
          '<div class="card-sizes-row">' +
            '<span class="size-pill selected">' + escHtml(item.size || 'M') + '</span>' +
          '</div>' +
          '<button class="card-add-cart-btn" onclick="AarikaStore.addWishlistItemToCart(' + idx + ')">Add to Cart</button>' +
        '</div>' +
      '</div>';
    });

    grid.innerHTML = html;
  }

  /* ── REMOVE FUNCTIONS (called from inline onclick) ──── */
  function clearCart() {
    saveCart([]);
    updateCartBadge();
    if (isCartPage()) renderDynamicCart();
  }

  function removeFromCart(idx) {
    var cart = getCart();
    cart.splice(idx, 1);
    saveCart(cart);
    updateCartBadge();
    renderDynamicCart();
    showToast('Item removed from cart', '#8b6c3b');
  }

  function removeFromWishlist(idx) {
    var wishlist = getWishlist();
    var item = wishlist[idx];
    wishlist.splice(idx, 1);
    saveWishlist(wishlist);
    renderDynamicWishlist();
    restoreWishlistButtons();
    showToast('Removed ' + (item && item.name ? '"' + item.name + '" (Size: ' + (item.size || 'M') + ')' : 'Item') + ' from Wishlist ♡', '#8b6c3b');
  }

  function changeCartQty(idx, delta) {
    var cart = getCart();
    if (!cart[idx]) return;
    cart[idx].qty = Math.max(1, (cart[idx].qty || 1) + delta);
    saveCart(cart);
    renderDynamicCart();
  }

  function addWishlistItemToCart(idx) {
    var wishlist = getWishlist();
    var item = wishlist[idx];
    if (!item) return;

    var cart = getCart();
    var existing = cart.find(function (i) {
      return i.name === item.name && i.size === item.size;
    });
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      var product = Object.assign({}, item);
      product.qty = 1;
      product.id = product.name + '_' + (product.size || 'M');
      cart.push(product);
    }
    saveCart(cart);
    updateCartBadge();
    showToast('Added ' + item.name + ' (Size: ' + (item.size || 'M') + ') to Cart! 🛒');
  }

  /* ── EXISTING CART.HTML removeItem ───────────────────── */
  window.removeItem = window.removeItem || function (btn) {
    var item = btn.closest('.cart-item');
    if (item) {
      item.style.transition = 'opacity 0.3s ease';
      item.style.opacity    = '0';
      setTimeout(function () { item.remove(); }, 300);
    }
  };

  window.changeQty = window.changeQty || function (btn, delta) {
    var qtySpan = btn.parentElement.querySelector('span');
    if (!qtySpan) return;
    var current = parseInt(qtySpan.textContent, 10) || 1;
    qtySpan.textContent = Math.max(1, current + delta);
  };

  window.saveLater = window.saveLater || function (btn) {
    showToast('Saved for later ✓', '#c59b5f');
  };

  window.buyNow = window.buyNow || function (name) {
    var cart = getCart();
    if (cart.length === 0) {
      showToast('Your cart is empty!', '#8b6c3b');
      return;
    }
    if (window.AarikaAuth && !window.AarikaAuth.isLoggedIn()) {
      window.AarikaAuth.showLoginModal(false);
      return;
    }
    sessionStorage.setItem('aarika_checkout_allowed', 'true');
    window.location.href = 'payment.html';
  };

  window.buyAll = window.buyAll || function () {
    var cart = getCart();
    if (cart.length === 0) {
      showToast('Your cart is empty!', '#8b6c3b');
      return;
    }
    if (window.AarikaAuth && !window.AarikaAuth.isLoggedIn()) {
      window.AarikaAuth.showLoginModal(false);
      return;
    }
    sessionStorage.setItem('aarika_checkout_allowed', 'true');
    window.location.href = 'payment.html';
  };

  window.applyCoupon = window.applyCoupon || function () {
    showToast('Coupon applied! 🎉', '#2e7d32');
  };

  /* ── ESCAPE HTML ─────────────────────────────────────── */
  function escHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── PUBLIC API ──────────────────────────────────────── */
  window.AarikaStore = {
    removeFromCart:        removeFromCart,
    removeFromWishlist:    removeFromWishlist,
    changeCartQty:         changeCartQty,
    addWishlistItemToCart: addWishlistItemToCart,
    clearCart:             clearCart,
    showToast:             showToast,
    updateCardWishlistState: updateCardWishlistState,
    getCart:               getCart,
    getWishlist:           getWishlist,
  };
  window.showToast = showToast;
  window.showAarikaToast = showToast;

  /* ── INIT ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    bindAddToCart();
    bindWishlistToggle();
    bindSizePills();
    restoreWishlistButtons();
    updateCartBadge();

    if (isCartPage())     renderDynamicCart();
    if (isWishlistPage()) renderDynamicWishlist();
  });

})();
