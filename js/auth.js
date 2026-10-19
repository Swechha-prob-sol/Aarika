/* =============================================================
   Aarika Auth — Login, Signup & Session Management
   Runs on every page. No external dependencies.
   ============================================================= */

(function () {
  'use strict';

  /* ── Storage Keys ─────────────────────────────────────────── */
  var USERS_KEY   = 'aarika_users';
  var SESSION_KEY = 'aarika_current_user';

  /* ── Helpers ──────────────────────────────────────────────── */
  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch (e) { return []; }
  }
  function saveUsers(arr) {
    localStorage.setItem(USERS_KEY, JSON.stringify(arr));
  }

  function getCurrentEmail() {
    return localStorage.getItem(SESSION_KEY) || null;
  }
  function setCurrentEmail(email) {
    if (email) localStorage.setItem(SESSION_KEY, email);
    else localStorage.removeItem(SESSION_KEY);
  }

  function getCurrentUser() {
    var email = getCurrentEmail();
    if (!email) return null;
    var users = getUsers();
    return users.find(function (u) { return u.email === email; }) || null;
  }

  function isLoggedIn() {
    return getCurrentUser() !== null;
  }

  /* Per-user cart / wishlist storage key helpers */
  function cartKey() {
    var email = getCurrentEmail();
    return email ? 'aarika_cart_' + email : 'aarika_cart_guest';
  }
  function wishlistKey() {
    var email = getCurrentEmail();
    return email ? 'aarika_wishlist_' + email : 'aarika_wishlist_guest';
  }

  /* Current page slug */
  function pageName() {
    var cleanPath = window.location.pathname.replace(/\\/g, '/');
    var parts = cleanPath.split('/');
    return (parts[parts.length - 1] || '').toLowerCase();
  }

  /* Path helper — detect if we are inside /html/ subfolder */
  var pathNorm = window.location.pathname.replace(/\\/g, '/').toLowerCase();
  var pName = pageName();
  var isInHtmlFolder = pathNorm.indexOf('/html/') !== -1 || (pName !== 'index.html' && pName !== '');
  var loginUrl  = isInHtmlFolder ? 'Login.html'    : 'html/Login.html';
  var signupUrl = isInHtmlFolder ? 'SignUp.html'   : 'html/SignUp.html';
  var homeUrl   = isInHtmlFolder ? '../index.html' : 'index.html';

  /* ── Page Gate ────────────────────────────────────────────── */
  var PROTECTED_PAGES = ['wishlist.html', 'cart.html', 'myaccount.html', 'payment.html'];
  var isCurrentModalGate = false;

  function runPageGate() {
    var page = pageName();
    if (PROTECTED_PAGES.indexOf(page) !== -1 && !isLoggedIn()) {
      showLoginModal(true);
    }
  }

  /* ── Login-Wall Modal ─────────────────────────────────────── */
  function createLoginModal() {
    if (document.getElementById('aarika-login-wall')) return;

    var overlay = document.createElement('div');
    overlay.id = 'aarika-login-wall';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Login required');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:1000000;display:flex;align-items:center;justify-content:center;background:rgba(10,22,14,0.74);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);opacity:0;visibility:hidden;transition:opacity 0.25s ease,visibility 0.25s ease;';

    var card = document.createElement('div');
    card.style.cssText = 'background:#f4f1e8;border:1px solid #c8b98a;border-radius:18px;padding:2.4rem 2rem 2rem;max-width:380px;width:90%;text-align:center;position:relative;box-shadow:0 24px 60px rgba(15,30,18,0.32);font-family:Poppins,Inter,-apple-system,sans-serif;';

    var closeBtn = document.createElement('button');
    closeBtn.id = 'aarika-login-wall-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = 'position:absolute;top:0.85rem;right:1rem;background:none;border:none;cursor:pointer;font-size:1.35rem;color:#7a7060;line-height:1;padding:4px;';

    var icon = document.createElement('div');
    icon.textContent = '🔒';
    icon.style.cssText = 'font-size:2.2rem;margin-bottom:0.65rem;';

    var heading = document.createElement('h2');
    heading.textContent = 'Login Required';
    heading.style.cssText = 'margin:0 0 0.45rem;font-size:1.3rem;font-family:"Playfair Display",Georgia,serif;color:#1a2e1d;font-weight:700;letter-spacing:0.02em;';

    var body = document.createElement('p');
    body.textContent = 'Please log in with an existing account to continue. Don’t have an account? Sign up to get started.';
    body.style.cssText = 'margin:0 0 1.6rem;font-size:0.88rem;color:#6b6453;line-height:1.5;';

    var btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:0.75rem;justify-content:center;';

    var loginAnchor = document.createElement('a');
    loginAnchor.href = loginUrl;
    loginAnchor.textContent = 'Log In';
    loginAnchor.style.cssText = 'flex:1;max-width:130px;padding:0.7rem 1rem;background:#112c1b;color:#fff;border-radius:30px;text-decoration:none;font-size:0.88rem;font-weight:600;letter-spacing:0.03em;display:inline-block;box-sizing:border-box;transition:background 0.2s;';

    var signupAnchor = document.createElement('a');
    signupAnchor.href = signupUrl;
    signupAnchor.textContent = 'Sign Up';
    signupAnchor.style.cssText = 'flex:1;max-width:130px;padding:0.7rem 1rem;background:transparent;color:#112c1b;border:1.5px solid #c8b98a;border-radius:30px;text-decoration:none;font-size:0.88rem;font-weight:600;letter-spacing:0.03em;display:inline-block;box-sizing:border-box;transition:all 0.2s;';

    btnRow.appendChild(loginAnchor);
    btnRow.appendChild(signupAnchor);
    card.appendChild(closeBtn);
    card.appendChild(icon);
    card.appendChild(heading);
    card.appendChild(body);
    card.appendChild(btnRow);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    closeBtn.addEventListener('click', hideLoginModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) hideLoginModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hideLoginModal();
    });
  }

  function showLoginModal(isGate) {
    isCurrentModalGate = !!isGate;
    createLoginModal();
    var overlay = document.getElementById('aarika-login-wall');
    if (!overlay) return;

    if (isCurrentModalGate) {
      document.body.style.overflow = 'hidden';
    }

    overlay.style.visibility = 'visible';
    requestAnimationFrame(function () { overlay.style.opacity = '1'; });
  }

  function hideLoginModal() {
    var overlay = document.getElementById('aarika-login-wall');
    if (!overlay) return;
    overlay.style.opacity = '0';
    setTimeout(function () {
      overlay.style.visibility = 'hidden';
      document.body.style.overflow = '';
      if (isCurrentModalGate) {
        window.location.replace(homeUrl);
      }
    }, 250);
  }

  /* ── Guest Action Intercept ───────────────────────────────── */
  function bindGuestIntercept() {
    document.addEventListener('click', function (e) {
      if (isLoggedIn()) return;

      var isCart     = e.target.closest('.card-add-cart-btn');
      var isWishlist = e.target.closest('.wishlist-toggle-btn');
      var anchor     = e.target.closest('a');
      var isProtectedLink = false;

      if (anchor) {
        var href = (anchor.getAttribute('href') || '').toLowerCase();
        if (href && (href.indexOf('cart.html') !== -1 || href.indexOf('wishlist.html') !== -1 || href.indexOf('myaccount.html') !== -1 || href.indexOf('payment.html') !== -1)) {
          isProtectedLink = true;
        }
      }

      if (isCart || isWishlist || isProtectedLink) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        showLoginModal(false);
      }
    }, true);
  }

  /* ── Sign Up ──────────────────────────────────────────────── */
  function handleSignUp(e) {
    e.preventDefault();
    var errorEl = document.getElementById('form-error');
    function showError(msg) {
      if (errorEl) {
        errorEl.textContent = msg;
        errorEl.removeAttribute('hidden');
        errorEl.style.display = 'block';
      }
    }
    function clearError() {
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.setAttribute('hidden', '');
        errorEl.style.display = 'none';
      }
    }
    clearError();

    var username = ((document.getElementById('signup-username') || {}).value || '').trim();
    var age      = ((document.getElementById('signup-age')      || {}).value || '').trim();
    var email    = ((document.getElementById('signup-email')    || {}).value || '').trim().toLowerCase();
    var password = ((document.getElementById('signup-password') || {}).value || '');
    var address  = ((document.getElementById('signup-address')  || {}).value || '').trim();
    var phone    = ((document.getElementById('signup-phone')    || {}).value || '').trim().replace(/\D/g, '');

    if (!username)                        return showError('Please enter a username.');
    if (!email || email.indexOf('@') < 0) return showError('Please enter a valid email address.');
    if (!password || password.length < 6) return showError('Password must be at least 6 characters.');
    if (!address)                         return showError('Please enter your address.');
    if (!phone)                           return showError('Please enter your phone number.');
    if (phone.length !== 10)              return showError('Phone number must be exactly 10 digits.');

    var users = getUsers();
    if (users.find(function (u) { return u.email === email; })) {
      return showError('An account with this email already exists. Please log in.');
    }

    var newUser = {
      email:       email,
      password:    password,
      username:    username,
      age:         age,
      address:     address,
      phone:       phone,
      memberSince: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
    };
    users.push(newUser);
    saveUsers(users);
    setCurrentEmail(email);
    window.location.href = homeUrl;
  }

  /* ── Log In ───────────────────────────────────────────────── */
  function handleLogIn(e) {
    e.preventDefault();
    var errorEl = document.getElementById('form-error');
    function showError(msg) {
      if (errorEl) {
        errorEl.textContent = msg;
        errorEl.removeAttribute('hidden');
        errorEl.style.display = 'block';
      }
    }
    function clearError() {
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.setAttribute('hidden', '');
        errorEl.style.display = 'none';
      }
    }
    clearError();

    var email    = ((document.getElementById('login-email')    || {}).value || '').trim().toLowerCase();
    var password = ((document.getElementById('login-password') || {}).value || '');

    if (!email || !password) return showError('Please enter your email and password.');

    var user = getUsers().find(function (u) { return u.email === email && u.password === password; });
    if (!user) return showError('Incorrect email or password. Please try again.');

    setCurrentEmail(email);
    window.location.href = homeUrl;
  }

  /* ── Log Out ──────────────────────────────────────────────── */
  function logOut() {
    setCurrentEmail(null);
    window.location.href = loginUrl;
  }

  /* ── Password Toggle (show/hide) ─────────────────────────── */
  function bindPasswordToggles() {
    document.querySelectorAll('.password-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var wrapper = btn.closest('.input-wrapper') || btn.closest('.field-edit-wrap');
        var input   = wrapper ? (wrapper.querySelector('input[type="password"]') || wrapper.querySelector('input[type="text"]')) : null;
        if (!input) return;
        input.type = (input.type === 'password') ? 'text' : 'password';
        btn.setAttribute('aria-label', input.type === 'password' ? 'Show password' : 'Hide password');
      });
    });
  }

  /* ── MyAccount Page Logic ─────────────────────────────────── */
  function initMyAccount() {
    if (!isLoggedIn()) {
      showLoginModal(true);
      return;
    }

    function renderAccountFields() {
      var u = getCurrentUser();
      if (!u) return;

      var profileName  = document.querySelector('.profile-name');
      var profileEmail = document.querySelector('.profile-email');
      var memberSince  = document.querySelector('.member-since');

      if (profileName)  profileName.textContent  = u.username || 'Aarika User';
      if (profileEmail) profileEmail.textContent = u.email || '';
      if (memberSince)  memberSince.textContent  = 'Member since ' + (u.memberSince || '—');

      var fieldMap = {
        'edit-username': u.username || '',
        'edit-age':      u.age      || '',
        'edit-phone':    u.phone    || '',
        'edit-address':  u.address  || '',
        'edit-password': '••••••••',
      };

      document.querySelectorAll('.field-action--edit').forEach(function (btn) {
        var action  = btn.getAttribute('data-action');
        if (!fieldMap.hasOwnProperty(action)) return;
        var row     = btn.closest('.field-row');
        var valueEl = row ? row.querySelector('.field-value') : null;
        if (valueEl) valueEl.textContent = fieldMap[action];
      });
    }

    renderAccountFields();

    /* Clicking chevron triggers the edit button in that row */
    document.querySelectorAll('.field-action--chevron').forEach(function (chevronBtn) {
      chevronBtn.addEventListener('click', function () {
        var row = chevronBtn.closest('.field-row');
        var editBtn = row ? row.querySelector('.field-action--edit') : null;
        if (editBtn) editBtn.click();
      });
    });

    /* Inline edit for each field */
    document.querySelectorAll('.field-action--edit').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var action = btn.getAttribute('data-action');
        var row    = btn.closest('.field-row');
        if (!row || row.querySelector('.field-edit-wrap')) return;

        var valueEl   = row.querySelector('.field-value');
        var fieldText = row.querySelector('.field-text');
        var actions   = row.querySelectorAll('.field-action');
        var u         = getCurrentUser();

        /* Temporarily hide action buttons while editing */
        actions.forEach(function (a) { a.style.display = 'none'; });

        var wrap = document.createElement('div');
        wrap.className = 'field-edit-wrap';
        wrap.style.cssText = 'display:flex;flex-direction:column;gap:0.45rem;flex:1;margin-top:0.25rem;';

        if (action === 'edit-password') {
          wrap.innerHTML = '<input type="password" placeholder="Current password" id="fld-pwd-cur" style="' + editInputStyle() + '">'
            + '<input type="password" placeholder="New password (min 6 chars)" id="fld-pwd-new" style="' + editInputStyle() + '">'
            + '<input type="password" placeholder="Confirm new password" id="fld-pwd-cfm" style="' + editInputStyle() + '">'
            + '<span class="fld-err" style="color:#b03030;font-size:0.76rem;display:none;"></span>'
            + '<div style="display:flex;gap:0.5rem;margin-top:0.2rem;">'
            + '<button class="fld-save" style="' + saveBtnStyle() + '">Save</button>'
            + '<button class="fld-cancel" style="' + cancelBtnStyle() + '">Cancel</button>'
            + '</div>';

          if (valueEl) valueEl.style.display = 'none';
          fieldText.appendChild(wrap);

          wrap.querySelector('.fld-save').addEventListener('click', function () {
            var cur = document.getElementById('fld-pwd-cur').value;
            var nw  = document.getElementById('fld-pwd-new').value;
            var cfm = document.getElementById('fld-pwd-cfm').value;
            var err = wrap.querySelector('.fld-err');
            err.style.display = 'none';
            if (cur !== u.password)  { err.textContent = 'Current password is incorrect.';          err.style.display = 'block'; return; }
            if (nw.length < 6)       { err.textContent = 'New password must be at least 6 chars.'; err.style.display = 'block'; return; }
            if (nw !== cfm)          { err.textContent = 'Passwords do not match.';                 err.style.display = 'block'; return; }
            updateUserField('password', nw);
            closeEditor(valueEl, wrap, actions);
            renderAccountFields();
            showAccountToast('Password updated ✓');
          });
          wrap.querySelector('.fld-cancel').addEventListener('click', function () {
            closeEditor(valueEl, wrap, actions);
          });

        } else {
          var fieldKey = { 'edit-username':'username', 'edit-age':'age', 'edit-phone':'phone', 'edit-address':'address' }[action];
          var curVal   = (u[fieldKey] || '');
          var inputType = (action === 'edit-age') ? 'number' : (action === 'edit-phone' ? 'tel' : 'text');
          var inputExtra = (action === 'edit-phone') ? ' inputmode="numeric" maxlength="10" placeholder="10-digit mobile number"' : '';

          wrap.innerHTML = '<input type="' + inputType + '" value="' + escHtml(curVal) + '"' + inputExtra + ' style="' + editInputStyle() + '">'
            + '<div style="display:flex;gap:0.5rem;margin-top:0.2rem;">'
            + '<button class="fld-save" style="' + saveBtnStyle() + '">Save</button>'
            + '<button class="fld-cancel" style="' + cancelBtnStyle() + '">Cancel</button>'
            + '</div>';

          if (valueEl) valueEl.style.display = 'none';
          fieldText.appendChild(wrap);

          var inp = wrap.querySelector('input');
          inp.focus();
          inp.select();

          if (action === 'edit-phone') {
            inp.addEventListener('input', function (e) {
              e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
            });
          }

          wrap.querySelector('.fld-save').addEventListener('click', function () {
            var val = inp.value.trim();
            if (action === 'edit-username' && !val) return;
            if (action === 'edit-phone') {
              val = val.replace(/\D/g, '');
              if (val.length !== 10) {
                showAccountToast('Phone number must be exactly 10 digits');
                return;
              }
            }
            updateUserField(fieldKey, val);
            closeEditor(valueEl, wrap, actions);
            renderAccountFields();
            showAccountToast('Saved ✓');
          });
          wrap.querySelector('.fld-cancel').addEventListener('click', function () {
            closeEditor(valueEl, wrap, actions);
          });
          inp.addEventListener('keydown', function (e) {
            if (e.key === 'Enter')  wrap.querySelector('.fld-save').click();
            if (e.key === 'Escape') wrap.querySelector('.fld-cancel').click();
          });
        }
      });
    });

    /* Logout button */
    var signOutBtn = document.querySelector('[data-action="sign-out"]');
    if (signOutBtn) signOutBtn.addEventListener('click', logOut);
  }

  function closeEditor(valueEl, wrap, actions) {
    if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
    if (valueEl) valueEl.style.display = '';
    if (actions) actions.forEach(function (a) { a.style.display = ''; });
  }

  function updateUserField(key, value) {
    var users = getUsers();
    var email = getCurrentEmail();
    var idx   = users.findIndex(function (u) { return u.email === email; });
    if (idx === -1) return;
    users[idx][key] = value;
    saveUsers(users);
  }

  function showAccountToast(msg) {
    var t = document.createElement('div');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#112c1b;color:#fff;padding:0.6rem 1.4rem;border-radius:30px;font-size:0.87rem;font-weight:600;border:1px solid #c59b5f;box-shadow:0 6px 20px rgba(0,0,0,0.18);z-index:999999;opacity:0;transition:opacity 0.2s ease;white-space:nowrap;font-family:Poppins,Inter,-apple-system,sans-serif;';
    document.body.appendChild(t);
    requestAnimationFrame(function () {
      t.style.opacity = '1';
      setTimeout(function () {
        t.style.opacity = '0';
        setTimeout(function () { t.remove(); }, 230);
      }, 2100);
    });
  }

  /* ── Inline-edit style helpers ────────────────────────────── */
  function editInputStyle() {
    return 'width:100%;padding:0.45rem 0.7rem;border:1.5px solid #c8b98a;border-radius:8px;font-size:0.9rem;font-family:inherit;color:#1a2e1d;background:#fffdf9;outline:none;box-sizing:border-box;';
  }
  function saveBtnStyle() {
    return 'padding:0.38rem 1rem;background:#112c1b;color:#fff;border:none;border-radius:20px;font-size:0.8rem;font-weight:600;cursor:pointer;font-family:inherit;';
  }
  function cancelBtnStyle() {
    return 'padding:0.38rem 0.9rem;background:transparent;color:#6b6453;border:1px solid #c8b98a;border-radius:20px;font-size:0.8rem;cursor:pointer;font-family:inherit;';
  }

  /* ── HTML escape helper ───────────────────────────────────── */
  function escHtml(str) {
    return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ── Public API ───────────────────────────────────────────── */
  window.AarikaAuth = {
    isLoggedIn:     isLoggedIn,
    getCurrentUser: getCurrentUser,
    logOut:         logOut,
    cartKey:        cartKey,
    wishlistKey:    wishlistKey,
    showLoginModal: showLoginModal,
  };

  /* ── Init ─────────────────────────────────────────────────── */
  function init() {
    var page = pageName();

    runPageGate();

    var signupForm = document.getElementById('signup-form');
    if (signupForm) signupForm.addEventListener('submit', handleSignUp);

    var loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLogIn);

    var signupPhoneInput = document.getElementById('signup-phone');
    if (signupPhoneInput) {
      signupPhoneInput.addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
      });
    }

    bindPasswordToggles();

    var noIntercept = ['login.html', 'signup.html'];
    if (noIntercept.indexOf(page) === -1) {
      bindGuestIntercept();
    }

    if (page === 'myaccount.html') {
      initMyAccount();
    }

    if ((page === 'login.html' || page === 'signup.html') && isLoggedIn()) {
      window.location.replace(homeUrl);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
