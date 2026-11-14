import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function money(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(n) || 0);
}

function pdfSafe(t) {
  return String(t ?? '').replace(/₹/g, 'Rs. ').replace(/[–—−]/g, '-').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[^\x20-\x7E]/g, '');
}

function makePdfAsync(r) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      try {
        const pages = [[]]; let y = 800; const L = 48, R = 547;
        const page = () => pages[pages.length - 1];
        const need = h => { if (y - h < 50) { pages.push([]); y = 800; } };
        const esc = t => pdfSafe(t).replace(/([\\()])/g, '\\$1');
        const text = (t, x, size = 10, bold = false, gray = 0.1) => page().push(`${gray} g BT /F${bold ? 2 : 1} ${size} Tf ${x} ${y} Td (${esc(t)}) Tj ET`);
        const textR = (t, xr, size = 10, bold = false) => { const w = pdfSafe(t).length * size * (bold ? 0.56 : 0.5); text(t, Math.max(L, xr - w), size, bold); };
        const line = (g = 0.8) => page().push(`${g} G 0.6 w ${L} ${y} m ${R} ${y} l S`);
        const money_ = n => pdfSafe(money(n));

        text('AARIKA', L, 26, true, 0.08); y -= 16; text('Since 2026', L, 9, false, 0.4);
        textR('PAYMENT RECEIPT', R, 14, true); y -= 16; textR('Order ID: ' + r.orderId, R, 10); y -= 13;
        textR('Date: ' + r.date.toLocaleString('en-IN'), R, 9); y -= 12; line(); y -= 22;

        text('STATUS', L, 8, true, 0.45); y -= 14; text(r.status, L, 11, true, 0.55); y -= 15;
        text('No payment has been charged. A payment gateway is not connected yet.', L, 9, false, 0.4); y -= 24;
        const section = t => { need(40); text(t.toUpperCase(), L, 10, true, 0.1); y -= 6; line(0.55); y -= 16; };
        const kv = (k, v) => { need(16); text(k, L, 9.5, false, 0.4); text(v || '-', L + 150, 9.5, true, 0.1); y -= 15; };

        section('Customer details');
        kv('Name', r.user.name); if (r.user.phone) kv('Mobile', r.user.phone); if (r.user.email) kv('Email', r.user.email);
        need(16); text('Shipping address', L, 9.5, false, 0.4); r.user.shipping.forEach(l => { need(15); text(l, L + 150, 9.5, true, 0.1); y -= 15; });
        need(16); text('Billing address', L, 9.5, false, 0.4);
        if (r.user.billing) r.user.billing.forEach(l => { need(15); text(l, L + 150, 9.5, true, 0.1); y -= 15; }); else { text('Same as shipping address', L + 150, 9.5, true, 0.1); y -= 15; }
        y -= 10;

        section('Items ordered');
        need(18); text('Item', L, 9, true, 0.4); text('Qty', 360, 9, true, 0.4); text('Unit price', 405, 9, true, 0.4); textR('Amount', R, 9, true); y -= 14;
        r.summary.items.forEach(p => {
          const nm = pdfSafe(p.name || p.title || 'Product'), sz = p.size || '', col = p.color || '';
          const d = [sz ? 'Size: ' + sz : '', col ? 'Color: ' + col : ''].filter(Boolean).join(' | ');
          const pPrice = typeof p.price === 'number' ? p.price : parseFloat(String(p.price).replace(/[^0-9.]/g, '')) || 0;
          need(32); text(nm.slice(0, 52), L, 10, true, 0.1); text(String(p.qty || 1), 364, 10); text(money_(pPrice), 405, 10); textR(money_(pPrice * (p.qty || 1)), R, 10); y -= 13;
          if (d) { text(d, L, 8.5, false, 0.45); y -= 12; } y -= 4;
        });
        line(); y -= 18;

        section('Order summary');
        const sum = (k, v, b) => { need(18); text(k, L, b ? 12 : 10, b, 0.2); textR(v, R, b ? 12 : 10, b); y -= b ? 18 : 15; };
        sum('Subtotal', money_(r.summary.subtotal));
        sum('Shipping', r.summary.shipping ? money_(r.summary.shipping) : 'Free');
        sum('Discount', '- ' + money_(r.summary.discount));
        line(); y -= 16; sum('Total', money_(r.summary.total), true); y -= 8;

        section('Payment details');
        r.payment.forEach(([k, v]) => kv(k, v === null ? money_(r.summary.total) : v));
        kv('Amount', money_(r.summary.total)); kv('Payment status', r.status);
        y -= 14; need(40); line(0.85); y -= 14;
        text('For your security, card CVV, banking passwords/PINs/OTPs are never collected or printed, and account/card numbers are masked.', L, 8, false, 0.45); y -= 12;
        text('This is a computer-generated receipt and does not confirm a successful payment.', L, 8, false, 0.45);

        const objs = []; const add = s => { objs.push(s); return objs.length; };
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
        objs.forEach((o, i) => { offs.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
        const xref = out.length;
        out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offs.map(o => String(o).padStart(10, '0') + ' 00000 n \n').join('') + `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
        const bytes = new Uint8Array(out.length); for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 255;
        resolve(new Blob([bytes], { type: 'application/pdf' }));
      } catch (err) {
        reject(err);
      }
    }, 0);
  });
}

export default function Payment() {
  const { cart, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [currentMethod, setCurrentMethod] = useState('card');
  const [sameAddress, setSameAddress] = useState(true);
  const [lastReceipt, setLastReceipt] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Snapshot cart items on entry so after clearCart() they are preserved for receipt and summary display
  const [checkoutItems] = useState(() => {
    if (cart && cart.length > 0) return [...cart];
    try {
      const email = localStorage.getItem('aarika_current_user');
      const key = email ? 'aarika_cart_' + email : 'aarika_cart_guest';
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      if (Array.isArray(saved) && saved.length > 0) return saved;
    } catch {}
    return [];
  });

  // Form inputs
  const [card, setCard] = useState({ number: '', exp: '', cvv: '', name: '' });
  const [upi, setUpi] = useState({ id: '', app: '' });
  const [wallet, setWallet] = useState({ provider: '', phone: currentUser?.phone || '' });
  const [netbank, setNetbank] = useState({ bank: '', user: '' });
  const [cod, setCod] = useState({ phone: currentUser?.phone || '' });

  const [bill, setBill] = useState({
    name: currentUser?.username || '',
    address: currentUser?.address || '',
    city: '',
    pin: '',
    state: ''
  });

  const subtotal = checkoutItems.reduce((s, i) => {
    const p = typeof i.price === 'number' ? i.price : parseFloat(String(i.price).replace(/[^0-9.]/g, '')) || 0;
    return s + p * (i.qty || 1);
  }, 0);
  const discount = subtotal > 3000 ? 500 : 0;
  const shipping = 0;
  const total = Math.max(0, subtotal - discount + shipping);

  // Only guard on initial mount. NEVER redirect if an order was placed or after cart was cleared on submit!
  useEffect(() => {
    const isAllowed = sessionStorage.getItem('aarika_checkout_allowed') === 'true';
    if (!isAllowed && checkoutItems.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, []); // Run once on initial mount only!

  function validate() {
    if (currentMethod === 'card') {
      const cleanNum = card.number.replace(/\D/g, '');
      if (cleanNum.length < 12 || cleanNum.length > 19) return 'Please enter a valid card number.';
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.exp)) return 'Enter expiry date as MM/YY.';
      if (!/^\d{3,4}$/.test(card.cvv)) return 'Enter a valid 3 or 4 digit CVV.';
      if (card.name.trim().length < 2) return 'Enter the name printed on your card.';
    }
    if (currentMethod === 'upi') {
      if (!/^[\w.-]{2,}@[A-Za-z][\w.-]{1,}$/.test(upi.id.trim())) return 'Enter a valid UPI ID (e.g. name@bank).';
      if (!upi.app) return 'Choose your UPI app.';
    }
    if (currentMethod === 'wallet') {
      if (!wallet.provider) return 'Choose a wallet provider.';
      if (!/^\d{10}$/.test(wallet.phone.replace(/\D/g, ''))) return 'Enter a valid 10-digit mobile number.';
    }
    if (currentMethod === 'netbanking') {
      if (!netbank.bank) return 'Choose your bank.';
    }
    if (currentMethod === 'cod') {
      if (!/^\d{10}$/.test(cod.phone.replace(/\D/g, ''))) return 'Enter a valid 10-digit contact number for delivery.';
    }
    if (!sameAddress) {
      if (!bill.name.trim() || !bill.address.trim() || !bill.city.trim() || !/^\d{6}$/.test(bill.pin.trim()) || !bill.state.trim()) {
        return 'Please complete all billing address fields and enter a 6-digit PIN code.';
      }
    }
    return '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg('');

    const summary = {
      items: checkoutItems,
      subtotal,
      shipping,
      discount,
      total
    };

    const receipt = {
      orderId: 'AAR' + Date.now().toString(36).toUpperCase(),
      date: new Date(),
      status: 'Payment pending - gateway not attached',
      user: {
        name: currentUser?.username || 'Valued Customer',
        phone: currentUser?.phone || card.name || '',
        email: currentUser?.email || '',
        shipping: [currentUser?.address || 'Your Shipping Address', 'India'],
        billing: sameAddress ? null : [bill.name, bill.address, bill.city + ', ' + bill.pin, bill.state]
      },
      payment: [
        ['Payment method', currentMethod.toUpperCase()],
        ['Amount', money(total)]
      ],
      summary
    };

    setLastReceipt(receipt);
    setOrderPlaced(true);
    clearCart();
    sessionStorage.removeItem('aarika_checkout_allowed');
  }

  async function downloadReceipt() {
    if (!lastReceipt) return;
    setDownloading(true);
    try {
      const blob = await makePdfAsync(lastReceipt);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AARIKA-Receipt-${lastReceipt.orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch {
      alert('Could not generate the PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="payment-page-wrapper">
      <main className="page">
        <Link className="back-link" to="/cart" id="backToCart">
          <svg className="ic" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5m6-6-6 6 6 6" />
          </svg> Back to Cart
        </Link>

        <div className="page-heading">
          <h1>Payment</h1>
          <p>Choose your preferred payment method and complete your order.</p>
        </div>

        <div className="checkout-grid">
          <section className="panel payment-panel">
            <form id="checkoutForm" onSubmit={handleSubmit} noValidate>
              {/* STEP 1: METHOD */}
              <section className="form-section">
                <h2><span className="step">1</span> Choose Payment Method</h2>
                <div className="method-grid" role="radiogroup" aria-label="Choose payment method">
                  <button
                    type="button"
                    className={`method ${currentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setCurrentMethod('card')}
                  >
                    <span className="radio-dot"></span>
                    <span className="method-icon">
                      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
                        <path d="M2.5 10h19M6 15h4" />
                      </svg>
                    </span>
                    <b>Credit / Debit<br />Card</b>
                  </button>

                  <button
                    type="button"
                    className={`method ${currentMethod === 'upi' ? 'active' : ''}`}
                    onClick={() => setCurrentMethod('upi')}
                  >
                    <span className="radio-dot"></span>
                    <span className="method-icon">
                      <svg className="ic upi" viewBox="0 0 48 24">
                        <text x="1" y="17" fontFamily="Arial,sans-serif" fontWeight="700" fontStyle="italic" fontSize="15" fill="#42545b">UPI</text>
                        <path d="M34 5l6 7-6 7z" fill="#f2a73c" />
                        <path d="M38 5l6 7-6 7z" fill="#1f8a4c" />
                      </svg>
                    </span>
                    <b>UPI</b>
                  </button>

                  <button
                    type="button"
                    className={`method ${currentMethod === 'wallet' ? 'active' : ''}`}
                    onClick={() => setCurrentMethod('wallet')}
                  >
                    <span className="radio-dot"></span>
                    <span className="method-icon">
                      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a1.5 1.5 0 0 1 1.5 1.5V8" />
                        <rect x="3" y="7.5" width="18" height="12" rx="2.5" />
                        <circle cx="16.5" cy="13.5" r="1.1" fill="currentColor" />
                      </svg>
                    </span>
                    <b>Wallets</b>
                  </button>

                  <button
                    type="button"
                    className={`method ${currentMethod === 'netbanking' ? 'active' : ''}`}
                    onClick={() => setCurrentMethod('netbanking')}
                  >
                    <span className="radio-dot"></span>
                    <span className="method-icon">
                      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9.5 12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M3 9.5h18" />
                      </svg>
                    </span>
                    <b>Net Banking</b>
                  </button>

                  <button
                    type="button"
                    className={`method ${currentMethod === 'cod' ? 'active' : ''}`}
                    onClick={() => setCurrentMethod('cod')}
                  >
                    <span className="radio-dot"></span>
                    <span className="method-icon">
                      <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2.5" y="6" width="19" height="12" rx="2" />
                        <circle cx="12" cy="12" r="2.6" />
                        <path d="M6 9v.01M18 15v.01" />
                      </svg>
                    </span>
                    <b>Cash on Delivery<br />(COD)</b>
                  </button>
                </div>
              </section>

              {/* STEP 2: DETAILS */}
              <section className="form-section" id="methodDetails">
                <h2>
                  <span className="step">2</span>{' '}
                  {currentMethod === 'card' && 'Card Details'}
                  {currentMethod === 'upi' && 'UPI Details'}
                  {currentMethod === 'wallet' && 'Wallet Details'}
                  {currentMethod === 'netbanking' && 'Net Banking Details'}
                  {currentMethod === 'cod' && 'Cash on Delivery'}
                </h2>

                <div id="dynamicFields">
                  {currentMethod === 'card' && (
                    <>
                      <div className="field">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                          id="cardNumber"
                          inputMode="numeric"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          value={card.number}
                          onChange={e => {
                            const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                            setCard(c => ({ ...c, number: v.replace(/(.{4})/g, '$1 ').trim() }));
                          }}
                          required
                        />
                      </div>
                      <div className="two-cols">
                        <div className="field">
                          <label htmlFor="expiry">Expiry Date</label>
                          <input
                            id="expiry"
                            inputMode="numeric"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={card.exp}
                            onChange={e => {
                              let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                              if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
                              setCard(c => ({ ...c, exp: v }));
                            }}
                            required
                          />
                        </div>
                        <div className="field">
                          <label htmlFor="cvv">CVV</label>
                          <input
                            id="cvv"
                            inputMode="numeric"
                            placeholder="123"
                            maxLength={4}
                            value={card.cvv}
                            onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                            required
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="cardName">Name on Card</label>
                        <input
                          id="cardName"
                          placeholder="Enter name as on card"
                          value={card.name}
                          onChange={e => setCard(c => ({ ...c, name: e.target.value }))}
                          required
                        />
                      </div>
                    </>
                  )}

                  {currentMethod === 'upi' && (
                    <>
                      <div className="field">
                        <label htmlFor="upiId">UPI ID</label>
                        <input
                          id="upiId"
                          placeholder="yourname@bank"
                          value={upi.id}
                          onChange={e => setUpi(u => ({ ...u, id: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="upiApp">Preferred UPI app</label>
                        <select id="upiApp" value={upi.app} onChange={e => setUpi(u => ({ ...u, app: e.target.value }))} required>
                          <option value="">Choose UPI app</option>
                          <option>Google Pay</option>
                          <option>PhonePe</option>
                          <option>Paytm</option>
                          <option>BHIM</option>
                          <option>Other UPI app</option>
                        </select>
                      </div>
                      <p className="field-hint">Demo only: no payment will be collected.</p>
                    </>
                  )}

                  {currentMethod === 'wallet' && (
                    <>
                      <div className="field">
                        <label htmlFor="walletProvider">Choose wallet</label>
                        <select id="walletProvider" value={wallet.provider} onChange={e => setWallet(w => ({ ...w, provider: e.target.value }))} required>
                          <option value="">Select a wallet</option>
                          <option>Paytm Wallet</option>
                          <option>Amazon Pay</option>
                          <option>Mobikwik</option>
                          <option>Freecharge</option>
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor="walletPhone">Registered mobile number</label>
                        <input
                          id="walletPhone"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="10-digit mobile number"
                          value={wallet.phone}
                          onChange={e => setWallet(w => ({ ...w, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                          required
                        />
                      </div>
                    </>
                  )}

                  {currentMethod === 'netbanking' && (
                    <div className="field">
                      <label htmlFor="bank">Select your bank</label>
                      <select id="bank" value={netbank.bank} onChange={e => setNetbank(n => ({ ...n, bank: e.target.value }))} required>
                        <option value="">Choose bank</option>
                        <option>State Bank of India</option>
                        <option>HDFC Bank</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  {currentMethod === 'cod' && (
                    <>
                      <div className="address-card">
                        <div>
                          <strong>Cash on Delivery selected</strong>
                          <span>Pay the order amount to the delivery partner when your parcel arrives.</span>
                        </div>
                      </div>
                      <div className="field" style={{ marginTop: '12px' }}>
                        <label htmlFor="codPhone">Contact mobile number</label>
                        <input
                          id="codPhone"
                          inputMode="numeric"
                          maxLength={10}
                          placeholder="10-digit mobile number"
                          value={cod.phone}
                          onChange={e => setCod(c => ({ ...c, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                          required
                        />
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* STEP 3: BILLING */}
              <section className="form-section billing-section">
                <h2><span className="step">3</span> Billing Address</h2>
                <label className="same-address">
                  <input
                    type="checkbox"
                    id="sameAddress"
                    checked={sameAddress}
                    onChange={e => setSameAddress(e.target.checked)}
                  />
                  <span>Same as shipping address</span>
                </label>

                {sameAddress ? (
                  <div id="shippingAddress" className="address-card">
                    <div>
                      <strong id="addressName">{currentUser?.username || 'Your Name'}</strong>
                      <span id="addressLines">{currentUser?.address || 'Your shipping address'}<br />India</span>
                    </div>
                    <button type="button" className="edit-link" onClick={() => setSameAddress(false)}>
                      <svg className="ic" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m4 20 4-1 10.5-10.5a2 2 0 0 0-3-3L5 16l-1 4Z" />
                        <path d="m14 7 3 3" />
                      </svg> Edit
                    </button>
                  </div>
                ) : (
                  <div id="billingFields" className="billing-fields">
                    <div className="field">
                      <label htmlFor="billName">Full name</label>
                      <input id="billName" value={bill.name} onChange={e => setBill(b => ({ ...b, name: e.target.value }))} placeholder="Full name" />
                    </div>
                    <div className="field">
                      <label htmlFor="billAddress">Address</label>
                      <input id="billAddress" value={bill.address} onChange={e => setBill(b => ({ ...b, address: e.target.value }))} placeholder="House no., street, area" />
                    </div>
                    <div className="two-cols">
                      <div className="field">
                        <label htmlFor="billCity">City</label>
                        <input id="billCity" value={bill.city} onChange={e => setBill(b => ({ ...b, city: e.target.value }))} placeholder="City" />
                      </div>
                      <div className="field">
                        <label htmlFor="billPin">PIN code</label>
                        <input id="billPin" value={bill.pin} onChange={e => setBill(b => ({ ...b, pin: e.target.value.replace(/\D/g, '').slice(0, 6) }))} placeholder="6-digit PIN" />
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="billState">State</label>
                      <input id="billState" value={bill.state} onChange={e => setBill(b => ({ ...b, state: e.target.value }))} placeholder="State" />
                    </div>
                  </div>
                )}
              </section>

              <button type="submit" className="pay-button" id="payButton" disabled={orderPlaced}>
                <span>
                  <svg className="ic" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="10.5" width="14" height="10" rx="2.2" />
                    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5" />
                  </svg>
                </span>{' '}
                {orderPlaced ? 'Order Placed ✓' : `Pay Now · ${money(total)}`}
              </button>

              <p className="demo-note" id="demoNote">
                Payment gateway not connected yet — no real payment will be collected.
              </p>

              {errorMsg && (
                <div className="form-message error">{errorMsg}</div>
              )}

              {orderPlaced && (
                <div className="form-message success" style={{ display: 'block' }}>
                  <strong>Payment gateway is not attached yet.</strong><br />
                  Your payment of {money(total)} could not be processed and no money was charged. You can download your receipt with your order, payment and customer details below.<br />
                  <button
                    type="button"
                    className="receipt-btn"
                    id="downloadReceipt"
                    onClick={downloadReceipt}
                    disabled={downloading}
                    style={{ marginTop: '0.8rem' }}
                  >
                    <svg className="ic" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4v11m-4.5-4.5L12 15l4.5-4.5M5 19.5h14" />
                    </svg>{' '}
                    {downloading ? 'Generating PDF…' : 'Download Receipt (PDF)'}
                  </button>
                </div>
              )}
            </form>
          </section>

          {/* ASIDE SUMMARY */}
          <aside className="panel summary-panel">
            <h2>Order Summary</h2>
            <div id="orderItems" className="order-items">
              {checkoutItems.map((p, idx) => {
                let pPrice = typeof p.price === 'number' ? p.price : parseFloat(String(p.price).replace(/[^0-9.]/g, '')) || 0;
                let imgSrc = p.image || '';
                if (imgSrc.startsWith('./photos/')) imgSrc = '/photos/' + imgSrc.replace('./photos/', '');
                else if (imgSrc.startsWith('../photos/')) imgSrc = '/photos/' + imgSrc.replace('../photos/', '');
                else if (imgSrc.startsWith('photos/')) imgSrc = '/photos/' + imgSrc.replace('photos/', '');
                else if (!imgSrc.startsWith('/')) imgSrc = '/' + imgSrc;

                return (
                  <article className="order-item" key={p.id || idx}>
                    <div className="product-thumb">
                      <img src={imgSrc} alt={p.name} onError={e => { e.target.style.display = 'none'; }} />
                    </div>
                    <div className="product-info">
                      <strong>{p.name}</strong>
                      <small>Size: {p.size || 'M'} | Qty: {p.qty || 1}</small>
                    </div>
                    <div className="item-price">{money(pPrice * (p.qty || 1))}</div>
                  </article>
                );
              })}
            </div>

            <div className="summary-lines">
              <div><span>Subtotal</span><strong id="subtotal">{money(subtotal)}</strong></div>
              <div><span>Shipping</span><strong id="shipping">Free</strong></div>
              <div><span>Discount</span><strong id="discount">− {money(discount)}</strong></div>
            </div>
            <div className="total-line"><span>Total</span><strong id="total">{money(total)}</strong></div>

            <div className="secure-box">
              <span className="shield">
                <svg className="ic" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3 4.5 6v5.5c0 4.5 3.1 8 7.5 9.5 4.4-1.5 7.5-5 7.5-9.5V6L12 3Z" />
                  <path d="m8.8 12 2.3 2.3 4.2-4.6" />
                </svg>
              </span>
              <div>
                <strong>Your payment is 100% secure</strong>
                <p>We use secure checkout practices to help protect your information.</p>
              </div>
            </div>

            <Link className="continue-link" to="/">
              <svg className="ic" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5m6-6-6 6 6 6" />
              </svg> Continue Shopping
            </Link>
          </aside>
        </div>
      </main>

      <footer className="benefits">
        <div><span><svg className="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3v3.5h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg></span><p><strong>Free Shipping</strong><small>On orders above ₹999</small></p></div>
        <div><span><svg className="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4.5 6v5.5c0 4.5 3.1 8 7.5 9.5 4.4-1.5 7.5-5 7.5-9.5V6L12 3Z" /><path d="m8.8 12 2.3 2.3 4.2-4.6" /></svg></span><p><strong>Secure Payments</strong><small>Safe checkout experience</small></p></div>
        <div><span><svg className="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9h11a5 5 0 0 1 0 10H8" /><path d="m7.5 5.5-3.5 3.5 3.5 3.5" /></svg></span><p><strong>Easy Returns</strong><small>Hassle-free process</small></p></div>
        <div><span><svg className="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 14v-2.5a7.5 7.5 0 0 1 15 0V14" /><rect x="3" y="13.5" width="3.8" height="5.5" rx="1.5" /><rect x="17.2" y="13.5" width="3.8" height="5.5" rx="1.5" /><path d="M19 19c0 1.4-1.8 2.2-4.5 2.2" /></svg></span><p><strong>Dedicated Support</strong><small>We're here to help</small></p></div>
      </footer>
    </div>
  );
}

