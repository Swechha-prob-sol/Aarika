# Aarika — Timeless Fashion & Effortless Elegance

Aarika is a modern, responsive luxury fashion e-commerce web platform designed for seamless shopping across collections including Women, Men, Kids, New Arrivals, and Sale.

🔗 **Live Demo:** [https://aarika-chi.vercel.app/](https://aarika-chi.vercel.app/)

---

## ✨ Features

- **Dynamic Shopping Cart**
  - Add items to cart with size selection across any collection page.
  - Real-time order summary calculation (subtotal, automated discount tiers, estimated taxes, and grand total).
  - Quantity controls (`+` / `−`), single-item removal, and interactive "Select All" toggling.
  - Live cart count badge dynamically synchronized across all top and bottom navigation bars.
  - Persistent state across sessions and page reloads via `localStorage`.

- **Persistent Wishlist**
  - One-click heart toggle (`♡` / `♥`) on product cards across collection pages.
  - Saved item counter and dynamic rendering purely from client storage.
  - Direct "Add to Cart" capability from saved wishlist items.
  - Permanent item removal that prevents restored items on page revisit.
  - Clean empty state with quick links to explore the collection.

- **Fast & Responsive Search**
  - **Global Search Overlay Modal**: Accessible from the top navbar on every page with instant autocomplete results.
  - **Dedicated Catalog Search Page**: Built with React 18 for high-performance faceted filtering by category, price ranges, and sorting (price low-to-high, high-to-low, newest).

- **Modern & Responsive UI/UX**
  - Elegant typography, smooth micro-interactions, gold-accented styling, and custom animations.
  - Responsive layout optimized for both desktop and mobile devices.
  - Desktop top navigation bar with quick category links and action icons.
  - Mobile bottom navigation bar for intuitive handheld browsing.
  - Floating toast notifications for real-time user feedback.

---

## 🛠️ Tech Stack

- **Markup & Structure:** HTML5
- **Styling:** Vanilla CSS3 (Flexbox, CSS Grid, CSS Variables, Glassmorphism & Keyframe Animations)
- **Client Logic:** Vanilla JavaScript (ES6+)
- **Catalog Search UI:** React 18 (UMD) & Babel
- **Storage:** Web Storage API (`localStorage`)

---

## 📁 Project Structure

```text
Aarika/
├── index.html              # Homepage
├── README.md               # Project documentation
├── html/                   # Page templates
│   ├── women.html          # Women's Collection
│   ├── men.html            # Men's Collection
│   ├── kids.html           # Kids' Collection
│   ├── NewArrivals.html    # New Arrivals
│   ├── sales.html          # Sale & Promotional Items
│   ├── cart.html           # Shopping Cart & Checkout Summary
│   ├── Wishlist.html       # Saved Items / Wishlist
│   ├── search.html         # React-powered Product Catalog Search
│   ├── Contact.html        # Help & Contact Us
│   ├── MyAccount.html      # User Account Settings
│   ├── Menu.html           # Mobile Category Menu Modal
│   ├── Login.html          # User Login
│   └── SignUp.html         # User Registration
├── css/                    # Stylesheets
│   ├── styles.css          # Main stylesheet & global tokens
│   ├── cart.css            # Shopping cart styles
│   ├── Wishlist.css        # Wishlist grid & card styles
│   ├── navbar_search.css   # Global search overlay & badges
│   ├── search.css          # Catalog search page styles
│   ├── auth.css            # Login & Signup styles
│   └── my_account.css      # User Account styles
├── js/                     # Client Scripts
│   ├── store.js            # Unified Cart & Wishlist localStorage store
│   ├── products.js         # Centralized product catalog metadata
│   ├── navbar_search.js    # Global navbar search modal controller
│   └── search_app.js       # React catalog search & filter component
└── photos/                 # Product photography, banners & assets
```

---

## 🚀 Getting Started

No build step or external package installation is required.

### 1. Clone the repository:
```bash
git clone https://github.com/Swechha-prob-sol/Aarika.git
cd Aarika
```

### 2. Run locally:
You can open `index.html` directly in your browser, or serve it using any local static server:

Using VS Code:
- Right-click `index.html` and select **"Open with Live Server"**.

Using Python:
```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

Using Node.js (`npx serve`):
```bash
npx serve .
```

---

## 📄 License

This project is licensed under the MIT License.
