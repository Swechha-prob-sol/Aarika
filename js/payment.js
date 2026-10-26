// AARIKA responsive checkout demo. No real payments are collected.
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const money = n => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(n) || 0);
let currentMethod = 'card', orderData = null;
function safeParse(v) { try { return JSON.parse(v) } catch { return null } }
function getCartKey() {
  if (window.AarikaAuth && typeof window.AarikaAuth.cartKey === 'function') {
    return window.AarikaAuth.cartKey();
  }
  const email = localStorage.getItem('aarika_current_user');
  return email ? 'aarika_cart_' + email : 'aarika_cart_guest';
}
function readCart() {
  const key = getCartKey();
  let raw = safeParse(localStorage.getItem(key));
  if (Array.isArray(raw) && raw.length) return { items: raw, sourceKey: key, meta: {} };
  raw = safeParse(localStorage.getItem('aarika_cart_guest')) || safeParse(localStorage.getItem('aarika_cart'));
  if (Array.isArray(raw) && raw.length) return { items: raw, sourceKey: 'aarika_cart_guest', meta: {} };
  return { items: [], sourceKey: key, meta: {} };
}
function guardCheckoutAccess() {
  const isAllowed = sessionStorage.getItem('aarika_checkout_allowed') === 'true';
  const cart = readCart();
  if (!isAllowed || !cart.items || cart.items.length === 0) {
    sessionStorage.removeItem('aarika_checkout_allowed');
    window.location.replace('cart.html');
    return false;
  }
  return true;
}
function getName(p) { return p.name || p.title || p.productName || p.product_name || 'Product' }
function toNum(v) { if (typeof v === 'number') return v; const n = parseFloat(String(v ?? '').replace(/[^0-9.]/g, '')); return isNaN(n) ? 0 : n }
function getPrice(p) { return toNum(p.price ?? p.salePrice ?? p.discountedPrice ?? p.amount ?? p.unitPrice ?? 0) }
function getQty(p) { return Math.max(1, Number(p.quantity ?? p.qty ?? p.count ?? 1) || 1) }
function getImage(p) {
  let img = p.image || p.imageUrl || p.image_url || p.thumbnail || p.photo || '';
  if (img.startsWith('./photos/')) {
    img = '../photos/' + img.slice(9);
  } else if (img.startsWith('photos/')) {
    img = '../photos/' + img.slice(7);
  }
  return img;
}
function getDiscount(meta, subtotal) { const d = Number(meta.discountAmount ?? meta.discount ?? meta.couponDiscount ?? 0) || 0; return Math.min(subtotal, Math.max(0, d)) }
function summarize(cart) {
  const items = cart.items;
  const subtotal = items.reduce((s, p) => s + getPrice(p) * getQty(p), 0);
  // Same rule as the cart page: ₹500 off when subtotal is above ₹3000
  const discount = subtotal > 3000 ? 500 : 0;
  const shipping = Number(cart.meta?.shippingCharge ?? cart.meta?.shipping ?? 0) || 0;
  const total = Math.max(0, subtotal + shipping - discount);
  return { items, subtotal, shipping, discount, total };
}
function renderSummary() {
  orderData = readCart();
  const { items, subtotal, shipping, discount, total } = summarize(orderData);
  if (!items.length) { $('#orderItems').innerHTML = '<div class="empty-cart">Your cart is empty. Please add items to your cart first.</div>' }
  else $('#orderItems').innerHTML = items.map(p => {
    const image = getImage(p), size = p.size || p.selectedSize || '', color = p.color || p.selectedColor || '';
    const details = [size ? `Size: ${escapeHtml(String(size))}` : '', color ? `Color: ${escapeHtml(String(color))}` : '', `Qty: ${getQty(p)}`].filter(Boolean).join(' | ');
    return `<article class="order-item"><div class="product-thumb">${image ? `<img src="${escapeAttr(image)}" alt="${escapeAttr(getName(p))}">` : `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>`}</div><div class="product-info"><strong>${escapeHtml(getName(p))}</strong><small>${details}</small></div><div class="item-price">${money(getPrice(p) * getQty(p))}</div></article>`;
  }).join('');
  $('#subtotal').textContent = money(subtotal); $('#shipping').textContent = shipping ? money(shipping) : 'Free';
  $('#discount').textContent = '− ' + money(discount); $('#total').textContent = money(total); $('#payAmount').textContent = money(total);
  return { items, subtotal, shipping, discount, total };
}
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])) }
function escapeAttr(s) { return escapeHtml(s) }
const templates = {
  card: { title: 'Card Details', html: `<div class="field"><label for="cardNumber">Card Number</label><input id="cardNumber" inputmode="numeric" autocomplete="cc-number" maxlength="23" placeholder="1234 5678 9012 3456" required></div><div class="two-cols"><div class="field"><label for="expiry">Expiry Date</label><input id="expiry" inputmode="numeric" autocomplete="cc-exp" maxlength="5" placeholder="MM/YY" required></div><div class="field"><label for="cvv">CVV</label><input id="cvv" inputmode="numeric" autocomplete="cc-csc" maxlength="4" placeholder="123" required></div></div><div class="field"><label for="cardName">Name on Card</label><input id="cardName" autocomplete="cc-name" placeholder="Enter name as on card" required></div>` },
  upi: { title: 'UPI Details', html: `<div class="field"><label for="upiId">UPI ID</label><input id="upiId" placeholder="yourname@bank" autocomplete="off" required></div><div class="field"><label for="upiApp">Preferred UPI app</label><select id="upiApp" required><option value="">Choose UPI app</option><option>Google Pay</option><option>PhonePe</option><option>Paytm</option><option>BHIM</option><option>Other UPI app</option></select></div><p class="field-hint">Demo only: this form does not open a UPI app or send a collect request.</p>` },
  wallet: { title: 'Wallet Details', html: `<div class="field"><label for="walletProvider">Choose wallet</label><select id="walletProvider" required><option value="">Select a wallet</option><option>Paytm Wallet</option><option>Amazon Pay</option><option>Mobikwik</option><option>Freecharge</option><option>Other wallet</option></select></div><div class="field"><label for="walletPhone">Registered mobile number</label><input id="walletPhone" inputmode="numeric" maxlength="10" autocomplete="tel" placeholder="10-digit mobile number" required></div><p class="field-hint">Demo only: no wallet account will be accessed or charged.</p>` },
  netbanking: { title: 'Net Banking', html: `<div class="field"><label for="bank">Select your bank</label><select id="bank" required><option value="">Choose bank</option><option>State Bank of India</option><option>HDFC Bank</option><option>ICICI Bank</option><option>Axis Bank</option><option>Kotak Mahindra Bank</option><option>Punjab National Bank</option><option>Bank of Baroda</option><option value="other">Other bank</option></select></div><div id="bankExtra"></div><p class="field-hint">Never enter your banking password, PIN or OTP into this demo page.</p>` },
  cod: { title: 'Cash on Delivery', html: `<div class="address-card"><div><strong>Cash on Delivery selected</strong><span>Pay the order amount to the delivery partner when your parcel arrives.</span></div></div><div class="field" style="margin-top:12px"><label for="codPhone">Contact mobile number</label><input id="codPhone" inputmode="numeric" maxlength="10" autocomplete="tel" placeholder="10-digit mobile number" required></div>` }
};
function setMethod(method) {
  currentMethod = method;
  $$('.method').forEach(b => { const active = b.dataset.method === method; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)) });
  $('#detailsHeading').textContent = templates[method].title; $('#dynamicFields').innerHTML = templates[method].html;
  $('#formMessage').textContent = ''; $('#formMessage').className = 'form-message';
  if (method === 'card') {
    $('#cardNumber').addEventListener('input', e => { let v = e.target.value.replace(/\D/g, '').slice(0, 19); e.target.value = v.replace(/(.{4})/g, '$1 ').trim() });
    $('#expiry').addEventListener('input', e => { let v = e.target.value.replace(/\D/g, '').slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2); e.target.value = v });
    $('#cvv').addEventListener('input', e => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4));
  }
  if (method === 'netbanking') {
    $('#bank').addEventListener('change', e => renderBankExtra(e.target.value));
    renderBankExtra('');
  }
  const u = (window.AarikaAuth && typeof window.AarikaAuth.getCurrentUser === 'function')
    ? window.AarikaAuth.getCurrentUser()
    : null;
  const userPhone = u?.phone ? String(u.phone).replace(/\D/g, '').slice(0, 10) : '';

  ['walletPhone', 'codPhone'].forEach(id => {
    const el = $('#' + id);
    if (el) {
      if (!el.value && userPhone) el.value = userPhone;
      el.addEventListener('input', e => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10));
    }
  });
}
function renderBankExtra(bank) {
  const box = $('#bankExtra');
  if (!bank) { box.innerHTML = ''; return }
  if (bank !== 'other') {
    box.innerHTML = '<div class="field"><label for="bankUser">Customer ID / User ID</label><input id="bankUser" autocomplete="off" placeholder="Enter customer or user ID" required></div>';
    return;
  }
  box.innerHTML = `<div class="field"><label for="otherBankName">Bank name</label><input id="otherBankName" autocomplete="off" placeholder="Enter your bank name" required></div>
  <div class="field"><label for="otherBranch">Branch name</label><input id="otherBranch" autocomplete="off" placeholder="Enter branch name" required></div>
  <div class="field"><label for="otherHolder">Account holder name</label><input id="otherHolder" autocomplete="off" placeholder="Name as per bank account" required></div>
  <div class="two-cols"><div class="field"><label for="otherAcc">Account number</label><input id="otherAcc" inputmode="numeric" autocomplete="off" maxlength="18" placeholder="Account number" required></div><div class="field"><label for="otherAccConfirm">Confirm account number</label><input id="otherAccConfirm" inputmode="numeric" autocomplete="off" maxlength="18" placeholder="Re-enter account number" required></div></div>
  <div class="two-cols"><div class="field"><label for="otherIfsc">IFSC code</label><input id="otherIfsc" autocomplete="off" maxlength="11" placeholder="e.g. SBIN0001234" required style="text-transform:uppercase"></div><div class="field"><label for="otherBankType">Account type</label><select id="otherBankType" required><option value="">Select account type</option><option>Savings</option><option>Current</option></select></div></div>
  <div class="field"><label for="bankUser">Customer ID / User ID <small>(optional)</small></label><input id="bankUser" autocomplete="off" placeholder="Net banking customer ID, if any"></div>`;
  ['otherAcc', 'otherAccConfirm'].forEach(id => $('#' + id).addEventListener('input', e => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 18)));
  $('#otherIfsc').addEventListener('input', e => e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11));
}
function loadAddress() {
  const u = (window.AarikaAuth && typeof window.AarikaAuth.getCurrentUser === 'function')
    ? window.AarikaAuth.getCurrentUser()
    : null;
  const a = safeParse(localStorage.getItem('shippingAddress')) || safeParse(localStorage.getItem('aarikaShippingAddress')) || {};
  const name = a.name || a.fullName || a.full_name || (u && u.username) || 'Your Name';
  const address = a.address || a.street || (u && u.address) || 'Your shipping address';
  let city = a.city || ''; let pin = a.pin || a.pinCode || a.pincode || ''; let state = a.state || '';
  if (!pin && address) {
    const pinMatch = address.match(/\b\d{6}\b/);
    if (pinMatch) pin = pinMatch[0];
  }
  $('#addressName').textContent = name;
  if (address && address !== 'Your shipping address') {
    const parts = address.split(/,\s*/);
    $('#addressLines').innerHTML = parts.length > 1 ? parts.map(escapeHtml).join('<br>') : escapeHtml(address);
  } else {
    $('#addressLines').innerHTML = 'Your shipping address<br>City, PIN Code<br>India';
  }
  $('#billName').value = name === 'Your Name' ? '' : name; $('#billAddress').value = address === 'Your shipping address' ? '' : address;
  $('#billCity').value = city; $('#billPin').value = pin; $('#billState').value = state;
}
function showError(message) { $('#formMessage').textContent = message; $('#formMessage').className = 'form-message error' }
function validateMethod() {
  const val = id => ($('#' + id)?.value || '').trim();
  if (currentMethod === 'card') {
    const number = val('cardNumber').replace(/\D/g, '');
    if (number.length < 12 || number.length > 19) return 'Please enter a valid card number.';
    const exp = val('expiry'); if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) return 'Enter expiry date as MM/YY.';
    const [mm, yy] = exp.split('/').map(Number); const now = new Date(); if (2000 + yy < now.getFullYear() || (2000 + yy === now.getFullYear() && mm < now.getMonth() + 1)) return 'This card appears to be expired.';
    if (!/^\d{3,4}$/.test(val('cvv'))) return 'Enter a valid 3 or 4 digit CVV.';
    if (val('cardName').length < 2) return 'Enter the name printed on your card.';
  }
  if (currentMethod === 'upi') { if (!/^[\w.-]{2,}@[A-Za-z][\w.-]{1,}$/.test(val('upiId'))) return 'Enter a valid UPI ID, for example name@bank.'; if (!val('upiApp')) return 'Choose your UPI app.' }
  if (currentMethod === 'wallet') { if (!val('walletProvider')) return 'Choose a wallet provider.'; if (!/^\d{10}$/.test(val('walletPhone'))) return 'Enter a valid 10-digit mobile number.' }
  if (currentMethod === 'netbanking') {
    if (!val('bank')) return 'Choose your bank.';
    if (val('bank') === 'other') {
      if (val('otherBankName').length < 2) return 'Enter your bank name.';
      if (val('otherBranch').length < 2) return 'Enter your branch name.';
      if (val('otherHolder').length < 2) return 'Enter the account holder name.';
      if (!/^\d{9,18}$/.test(val('otherAcc'))) return 'Enter a valid account number (9-18 digits).';
      if (val('otherAcc') !== val('otherAccConfirm')) return 'Account numbers do not match.';
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(val('otherIfsc'))) return 'Enter a valid 11-character IFSC code (e.g. SBIN0001234).';
      if (!val('otherBankType')) return 'Select your account type.';
    } else if (val('bankUser').length < 2) return 'Enter your customer ID or user ID.';
  }
  if (currentMethod === 'cod' && !/^\d{10}$/.test(val('codPhone'))) return 'Enter a valid 10-digit contact number for delivery.';
  if (!$('#sameAddress').checked) {
    if (!val('billName') || !val('billAddress') || !val('billCity') || !/^\d{6}$/.test(val('billPin')) || !val('billState')) return 'Please complete all billing address fields and enter a 6-digit PIN code.';
  }
  return '';
}

// ---------- Receipt (PDF, generated in the browser, no library needed) ----------
let lastReceipt = null;
const mask = (v, keep = 4) => { v = String(v || '').replace(/\s/g, ''); return v.length <= keep ? v : 'X'.repeat(v.length - keep) + v.slice(-keep) };
function collectPaymentDetails() {
  const v = id => ($('#' + id)?.value || '').trim();
  switch (currentMethod) {
    case 'card': { const n = v('cardNumber').replace(/\D/g, ''); return [['Payment method', 'Credit / Debit Card'], ['Card number', mask(n).replace(/(.{4})/g, '$1 ').trim()], ['Name on card', v('cardName')], ['Expiry', v('expiry')]] }
    case 'upi': return [['Payment method', 'UPI'], ['UPI ID', v('upiId')], ['UPI app', v('upiApp')]];
    case 'wallet': return [['Payment method', 'Wallet'], ['Wallet', v('walletProvider')], ['Registered mobile', v('walletPhone')]];
    case 'netbanking':
      if (v('bank') === 'other') return [['Payment method', 'Net Banking / Bank transfer (Other bank)'], ['Bank name', v('otherBankName')], ['Branch name', v('otherBranch')], ['Account holder', v('otherHolder')], ['Account number', mask(v('otherAcc'))], ['IFSC code', v('otherIfsc')], ['Account type', v('otherBankType')]].concat(v('bankUser') ? [['Customer ID', mask(v('bankUser'), 3)]] : []);
      return [['Payment method', 'Net Banking'], ['Bank', v('bank')], ['Customer ID', mask(v('bankUser'), 3)]];
    case 'cod': return [['Payment method', 'Cash on Delivery (COD)'], ['Contact mobile', v('codPhone')], ['Amount to pay on delivery', null]];
  }
  return [];
}
function collectUser() {
  const u = (window.AarikaAuth && typeof window.AarikaAuth.getCurrentUser === 'function')
    ? window.AarikaAuth.getCurrentUser()
    : null;
  const a = safeParse(localStorage.getItem('shippingAddress')) || safeParse(localStorage.getItem('aarikaShippingAddress')) || {};
  const same = $('#sameAddress').checked;
  const ship = [$('#addressName').textContent, ...$('#addressLines').innerHTML.split('<br>').map(x => x.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'"))];
  const bill = same ? null : [$('#billName').value.trim(), $('#billAddress').value.trim(), $('#billCity').value.trim() + ', ' + $('#billPin').value.trim(), $('#billState').value.trim()];
  const typedPhone = ($('#walletPhone')?.value || $('#codPhone')?.value || '').trim();
  const phone = typedPhone || a.phone || (u && u.phone) || '';
  return { name: ship[0], phone, email: (u && u.email) || a.email || '', shipping: ship.slice(1), billing: bill };
}
function buildReceipt(summary) {
  return {
    orderId: 'AAR' + Date.now().toString(36).toUpperCase(),
    date: new Date(),
    status: 'Payment pending - gateway not attached',
    user: collectUser(),
    payment: collectPaymentDetails(),
    summary
  };
}
function pdfSafe(t) { return String(t ?? '').replace(/₹/g, 'Rs. ').replace(/[–—−]/g, '-').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[^\x20-\x7E]/g, '') }
// Returns a Promise that resolves with a PDF Blob.
// The heavy PDF-building work is deferred via setTimeout so the browser
// can repaint first (e.g. show a loading state on the button).
function makePdfAsync(r) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      try {
        const pages = [[]]; let y = 800; const L = 48, R = 547;
        const page = () => pages[pages.length - 1];
        const need = h => { if (y - h < 50) { pages.push([]); y = 800 } };
        const esc = t => pdfSafe(t).replace(/([\\()])/g, '\\$1');
        const text = (t, x, size = 10, bold = false, gray = 0.1) => page().push(`${gray} g BT /F${bold ? 2 : 1} ${size} Tf ${x} ${y} Td (${esc(t)}) Tj ET`);
        const textR = (t, xr, size = 10, bold = false) => { const w = pdfSafe(t).length * size * (bold ? 0.56 : 0.5); text(t, Math.max(L, xr - w), size, bold) };
        const line = (g = 0.8) => page().push(`${g} G 0.6 w ${L} ${y} m ${R} ${y} l S`);
        const money_ = n => pdfSafe(money(n));
        // Header
        text('AARIKA', L, 26, true, 0.08); y -= 16; text('Since 2026', L, 9, false, 0.4);
        textR('PAYMENT RECEIPT', R, 14, true); y -= 16; textR('Order ID: ' + r.orderId, R, 10); y -= 13;
        textR('Date: ' + r.date.toLocaleString('en-IN'), R, 9); y -= 12; line(); y -= 22;
        // Status box
        text('STATUS', L, 8, true, 0.45); y -= 14; text(r.status, L, 11, true, 0.55); y -= 15;
        text('No payment has been charged. A payment gateway is not connected yet.', L, 9, false, 0.4); y -= 24;
        const section = t => { need(40); text(t.toUpperCase(), L, 10, true, 0.1); y -= 6; line(0.55); y -= 16 };
        const kv = (k, v) => { need(16); text(k, L, 9.5, false, 0.4); text(v || '-', L + 150, 9.5, true, 0.1); y -= 15 };
        // Customer
        section('Customer details');
        kv('Name', r.user.name); if (r.user.phone) kv('Mobile', r.user.phone); if (r.user.email) kv('Email', r.user.email);
        need(16); text('Shipping address', L, 9.5, false, 0.4); r.user.shipping.forEach((l, i) => { need(15); text(l, L + 150, 9.5, true, 0.1); y -= 15 });
        need(16); text('Billing address', L, 9.5, false, 0.4);
        if (r.user.billing) r.user.billing.forEach(l => { need(15); text(l, L + 150, 9.5, true, 0.1); y -= 15 }); else { text('Same as shipping address', L + 150, 9.5, true, 0.1); y -= 15 }
        y -= 10;
        // Items
        section('Items ordered');
        need(18); text('Item', L, 9, true, 0.4); text('Qty', 360, 9, true, 0.4); text('Unit price', 405, 9, true, 0.4); textR('Amount', R, 9, true); y -= 14;
        r.summary.items.forEach(p => {
          const nm = pdfSafe(getName(p)), sz = p.size || p.selectedSize || '', col = p.color || p.selectedColor || '';
          const d = [sz ? 'Size: ' + sz : '', col ? 'Color: ' + col : ''].filter(Boolean).join(' | ');
          need(32); text(nm.slice(0, 52), L, 10, true, 0.1); text(String(getQty(p)), 364, 10); text(money_(getPrice(p)), 405, 10); textR(money_(getPrice(p) * getQty(p)), R, 10); y -= 13;
          if (d) { text(d, L, 8.5, false, 0.45); y -= 12 } y -= 4;
        });
        line(); y -= 18;
        // Summary
        section('Order summary');
        const sum = (k, v, b) => { need(18); text(k, L, b ? 12 : 10, b, 0.2); textR(v, R, b ? 12 : 10, b); y -= b ? 18 : 15 };
        sum('Subtotal', money_(r.summary.subtotal));
        sum('Shipping', r.summary.shipping ? money_(r.summary.shipping) : 'Free');
        sum('Discount', '- ' + money_(r.summary.discount));
        line(); y -= 16; sum('Total', money_(r.summary.total), true); y -= 8;
        // Payment
        section('Payment details');
        r.payment.forEach(([k, v]) => kv(k, v === null ? money_(r.summary.total) : v));
        kv('Amount', money_(r.summary.total)); kv('Payment status', r.status);
        y -= 14; need(40); line(0.85); y -= 14;
        text('For your security, card CVV, banking passwords/PINs/OTPs are never collected or printed, and account/card numbers are masked.', L, 8, false, 0.45); y -= 12;
        text('This is a computer-generated receipt and does not confirm a successful payment.', L, 8, false, 0.45);
        // Assemble PDF
        const objs = []; const add = s => { objs.push(s); return objs.length };
        add('<< /Type /Catalog /Pages 2 0 R >>');
        add('PLACEHOLDER');
        const f1 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
        const f2 = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
        const kids = [];
        pages.forEach((ops, i) => {
          const body = ops.join('\n') + `\n0.5 g BT /F1 8 Tf ${R - 60} 28 Td (Page ${i + 1} of ${pages.length}) Tj ET`;
          const c = add(`<< /Length ${body.length} >>\nstream\n${body}\nendstream`);
          kids.push(add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${f1} 0 R /F2 ${f2} 0 R >> >> /Contents ${c} 0 R >>`));
        });
        objs[1] = `<< /Type /Pages /Count ${kids.length} /Kids [${kids.map(k => k + ' 0 R').join(' ')}] >>`;
        let out = '%PDF-1.4\n'; const offs = [];
        objs.forEach((o, i) => { offs.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n` });
        const xref = out.length;
        out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offs.map(o => String(o).padStart(10, '0') + ' 00000 n \n').join('') + `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
        const bytes = new Uint8Array(out.length); for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 255;
        resolve(new Blob([bytes], { type: 'application/pdf' }));
      } catch (err) {
        reject(err);
      }
    }, 0); // defer to next event loop tick so the browser can repaint first
  });
}
// downloadReceipt is async: it awaits the PDF Promise and shows a
// loading state on the button while the receipt is being generated.
async function downloadReceipt() {
  if (!lastReceipt) return;
  const btn = $('#downloadReceipt');
  const originalHTML = btn ? btn.innerHTML : '';
  // Show loading state while Promise is pending
  if (btn) { btn.disabled = true; btn.textContent = 'Generating PDF…'; }
  try {
    const blob = await makePdfAsync(lastReceipt); // wait for Promise to resolve
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AARIKA-Receipt-${lastReceipt.orderId}.pdf`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (err) {
    console.error('PDF generation failed:', err);
    alert('Could not generate the PDF. Please try again.');
  } finally {
    // Always restore the button — success or failure
    if (btn) { btn.disabled = false; btn.innerHTML = originalHTML; }
  }
}
function handleSubmit(e) {
  e.preventDefault(); const error = validateMethod(); if (error) { showError(error); return }
  const summary = renderSummary(); if (!summary.items.length || summary.total <= 0) { showError('Your cart is empty. Please return to the cart and add an item.'); return }
  const paymentDetails = { method: currentMethod, methodLabel: templates[currentMethod].title, selectedAt: new Date().toISOString() };
  // Never store card number, CVV, UPI ID, banking credentials or other sensitive payment data.
  const order = { items: summary.items, subtotal: summary.subtotal, shipping: summary.shipping, discount: summary.discount, total: summary.total, currency: 'INR', payment: paymentDetails, status: 'Payment pending - gateway not attached', billingAddress: $('#sameAddress').checked ? 'same as shipping' : { name: $('#billName').value.trim(), address: $('#billAddress').value.trim(), city: $('#billCity').value.trim(), pin: $('#billPin').value.trim(), state: $('#billState').value.trim() }, createdAt: new Date().toISOString(), demo: true };
  localStorage.setItem('aarikaLastOrder', JSON.stringify(order)); localStorage.setItem('lastOrder', JSON.stringify(order)); localStorage.setItem('paymentStatus', order.status);

  // Clear the active cart in localStorage so order is placed
  const key = getCartKey();
  localStorage.setItem(key, '[]');
  localStorage.removeItem('aarika_cart');
  localStorage.setItem('aarika_cart_guest', '[]');
  if (orderData?.sourceKey) {
    localStorage.setItem(orderData.sourceKey, '[]');
  }
  // Clear checkout session flag
  sessionStorage.removeItem('aarika_checkout_allowed');

  lastReceipt = buildReceipt(summary);
  $('#formMessage').className = 'form-message success';
  $('#formMessage').innerHTML = `<strong>Payment gateway is not attached yet.</strong><br>Your payment of ${money(summary.total)} could not be processed and no money was charged. You can download your receipt with your order, payment and customer details below.<br><button type="button" class="receipt-btn" id="downloadReceipt"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11m-4.5-4.5L12 15l4.5-4.5M5 19.5h14"/></svg> Download Receipt (PDF)</button>`;
  $('#downloadReceipt').addEventListener('click', downloadReceipt);
  $('#demoNote').textContent = 'Payment gateway not connected - no payment was processed.';
  const payBtn = $('#payButton');
  if (payBtn) {
    payBtn.disabled = true;
    payBtn.textContent = 'Order Placed ✓';
  }
}
$$('.method').forEach(b => b.addEventListener('click', () => setMethod(b.dataset.method)));
$('#sameAddress').addEventListener('change', e => { $('#billingFields').classList.toggle('hidden', e.target.checked); $('#shippingAddress').classList.toggle('hidden', !e.target.checked) });
$('#editAddress').addEventListener('click', () => { $('#sameAddress').checked = false; $('#billingFields').classList.remove('hidden'); $('#shippingAddress').classList.add('hidden'); $('#billName').focus() });
$('#checkoutForm').addEventListener('submit', handleSubmit);
const backLink = $('#backToCart');
if (backLink) {
  backLink.addEventListener('click', () => {
    sessionStorage.removeItem('aarika_checkout_allowed');
  });
}
if (guardCheckoutAccess()) {
  setMethod('card');
  loadAddress();
  renderSummary();
}