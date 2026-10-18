// Aarika Global Navbar Search Integration
// Injects search overlay and links all search buttons to search.html

(function () {
    // Determine path prefix based on whether current page is in /html/ subfolder or root
    const isInHtmlFolder = window.location.pathname.includes("/html/");
    const searchPageUrl = isInHtmlFolder ? "search.html" : "html/search.html";
    const imgPrefix = isInHtmlFolder ? "../" : "";

    // Build the global search overlay modal HTML
    function createSearchOverlay() {
        if (document.getElementById("aarika-search-overlay")) return;

        const overlay = document.createElement("div");
        overlay.id = "aarika-search-overlay";
        overlay.className = "nav-search-overlay";
        overlay.innerHTML = `
            <button class="nav-search-close" id="aarika-search-close" title="Close search">&times;</button>
            <div class="nav-search-box">
                <div class="search-input-wrap" style="box-shadow: 0 10px 40px rgba(0,0,0,0.7); background: rgba(18, 33, 22, 0.96);">
                    <span class="search-input-icon">🔍</span>
                    <input 
                        type="text" 
                        id="aarika-nav-search-input" 
                        class="main-search-input" 
                        placeholder="${window.innerWidth <= 600 ? 'Search styles...' : 'Search for tunics, tops, kurta sets, kurtis, dresses...'}" 
                        autocomplete="off"
                    />
                    <button class="search-submit-btn" id="aarika-nav-search-submit">Search</button>
                </div>
                <div id="aarika-nav-search-results" class="nav-search-dropdown" style="display: none;"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        const closeBtn = document.getElementById("aarika-search-close");
        const searchInput = document.getElementById("aarika-nav-search-input");
        const resultsBox = document.getElementById("aarika-nav-search-results");
        const submitBtn = document.getElementById("aarika-nav-search-submit");

        // Close on clicking backdrop or close button
        closeBtn.addEventListener("click", closeSearchOverlay);
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) closeSearchOverlay();
        });

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && overlay.classList.contains("active")) {
                closeSearchOverlay();
            }
        });

        // Submit search
        function performSearch() {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `${searchPageUrl}?q=${encodeURIComponent(query)}`;
            } else {
                window.location.href = searchPageUrl;
            }
        }

        submitBtn.addEventListener("click", performSearch);
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                performSearch();
            }
        });

        // Live instant autocomplete preview as user types
        searchInput.addEventListener("input", () => {
            const val = searchInput.value.trim();
            if (!val || typeof window.searchProducts !== "function") {
                resultsBox.style.display = "none";
                resultsBox.innerHTML = "";
                return;
            }

            const matches = window.searchProducts(val).slice(0, 5);
            if (matches.length === 0) {
                resultsBox.innerHTML = `
                    <div style="padding: 1.2rem; text-align: center; color: #a6b5a9; font-size: 0.9rem;">
                        No direct matches found. Press <strong style="color: #c59b5f;">Enter</strong> to search all styles.
                    </div>
                `;
                resultsBox.style.display = "block";
                return;
            }

            resultsBox.innerHTML = matches.map(p => `
                <a href="${searchPageUrl}?q=${encodeURIComponent(p.title)}" class="dropdown-item">
                    <img src="${imgPrefix}${p.image}" alt="${p.title}" class="dropdown-thumb" onerror="this.style.display='none'">
                    <div>
                        <div class="dropdown-title">${p.title}</div>
                        <div class="dropdown-price">₹${p.price.toLocaleString("en-IN")} <span style="font-size: 0.75rem; color: #c59b5f; margin-left: 0.4rem;">(${p.category})</span></div>
                    </div>
                </a>
            `).join("") + `
                <div style="padding: 0.75rem; text-align: center; background: rgba(0,0,0,0.2);">
                    <a href="${searchPageUrl}?q=${encodeURIComponent(val)}" style="color: #c59b5f; text-decoration: none; font-size: 0.85rem; font-weight: 600;">
                        View all results for "${val}" &rarr;
                    </a>
                </div>
            `;
            resultsBox.style.display = "block";
        });
    }

    function openSearchOverlay() {
        createSearchOverlay();
        const overlay = document.getElementById("aarika-search-overlay");
        const searchInput = document.getElementById("aarika-nav-search-input");
        if (overlay) {
            overlay.classList.add("active");
            setTimeout(() => {
                if (searchInput) searchInput.focus();
            }, 100);
        }
    }

    function closeSearchOverlay() {
        const overlay = document.getElementById("aarika-search-overlay");
        if (overlay) {
            overlay.classList.remove("active");
        }
    }

    // Bind all search icons / buttons across the current page
    function initSearchButtons() {
        const searchButtons = document.querySelectorAll(".search-icon-btn, a[aria-label='Search'], a[title='Search']");
        searchButtons.forEach(btn => {
            // Update href to search.html as fallback, and intercept click for instant modal
            btn.setAttribute("href", searchPageUrl);
            btn.addEventListener("click", (e) => {
                // If already on search page, focus input
                const mainInput = document.querySelector(".main-search-input");
                if (mainInput && window.location.pathname.includes("search.html")) {
                    mainInput.focus();
                    mainInput.scrollIntoView({ behavior: "smooth" });
                    return;
                }
                e.preventDefault();
                openSearchOverlay();
            });
        });
    }

    // Toast Notification System (Matches search.html)
    let toastTimer = null;
    function showToast(message) {
        let toast = document.querySelector(".aarika-toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.className = "aarika-toast";
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";

        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            if (toast) {
                toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                toast.style.opacity = "0";
                toast.style.transform = "translateY(15px)";
                setTimeout(() => {
                    if (toast && toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 320);
            }
        }, 2600);
    }
    window.showToast = showToast;
    window.showAarikaToast = showToast;
    window.addToCart = function (title, size) {
        showToast(`Added ${title || "Item"}${size ? " (Size: " + size + ")" : ""} to Cart! 🛒`);
    };

    // Global Product Card Interactions (Size Selection, Wishlist Heart Toggle, Wishlist Remove, Add to Cart Feedback)
    function initCardInteractions() {
        // Extract card metadata helper
        function getCardInfo(element) {
            const card = element.closest(".product-card") || element.closest(".cart-item") || element.parentElement;
            if (!card) return { card: null, title: "Item", size: "M" };
            const titleEl = card.querySelector(".card-title") || card.querySelector("h3") || card.querySelector(".product-title");
            const title = titleEl ? titleEl.textContent.trim() : "Item";
            const selectedPill = card.querySelector(".size-pill.selected") || card.querySelector(".size-pill");
            const size = selectedPill ? selectedPill.textContent.trim() : "M";
            return { card, title, size };
        }

        // Set default selected size for all cards on the page if not already selected
        function applyDefaultSizes() {
            if (window.location.pathname.includes("search.html")) return;
            document.querySelectorAll(".card-sizes-row").forEach(row => {
                if (!row.querySelector(".size-pill.selected")) {
                    const firstPill = row.querySelector(".size-pill");
                    if (firstPill) firstPill.classList.add("selected");
                }
            });
        }
        applyDefaultSizes();

        // 1. Size pill click selection
        document.addEventListener("click", (e) => {
            const pill = e.target.closest(".size-pill");
            if (pill) {
                if (window.location.pathname.includes("search.html")) return;
                const row = pill.closest(".card-sizes-row");
                if (row) {
                    row.querySelectorAll(".size-pill").forEach(p => p.classList.remove("selected"));
                    pill.classList.add("selected");
                }
            }
        });

        // 2. Wishlist heart toggle click (♡ <-> ♥)
        document.addEventListener("click", (e) => {
            const heartBtn = e.target.closest(".wishlist-toggle-btn");
            if (heartBtn) {
                if (window.location.pathname.includes("search.html")) return;
                e.preventDefault();
                e.stopPropagation();
                heartBtn.classList.toggle("active");
                const info = getCardInfo(heartBtn);
                if (heartBtn.classList.contains("active")) {
                    heartBtn.textContent = "♥";
                    showToast(`Added "${info.title}" to Wishlist ♡`);
                } else {
                    heartBtn.textContent = "♡";
                    showToast("Removed from Wishlist");
                }
            }
        });

        // 3. Wishlist remove button click (for Wishlist page)
        document.addEventListener("click", (e) => {
            const removeBtn = e.target.closest(".wishlist-remove-btn");
            if (removeBtn) {
                e.preventDefault();
                e.stopPropagation();
                const info = getCardInfo(removeBtn);
                const card = info.card;
                if (card) {
                    card.style.transition = "all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)";
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.85)";
                    setTimeout(() => {
                        card.remove();
                    }, 350);
                }
                showToast(`Removed "${info.title}" from Wishlist`);
            }
        });

        // 4. Add to Cart button visual feedback + toast notification
        document.addEventListener("click", (e) => {
            const cartBtn = e.target.closest(".card-add-cart-btn");
            if (cartBtn && !cartBtn.hasAttribute("disabled") && !cartBtn.classList.contains("added")) {
                if (window.location.pathname.includes("search.html")) return;
                const originalText = cartBtn.textContent;
                cartBtn.classList.add("added");
                cartBtn.textContent = "✓ Added to Cart";
                
                const info = getCardInfo(cartBtn);
                showToast(`Added ${info.title} (Size: ${info.size}) to Cart! 🛒`);

                setTimeout(() => {
                    cartBtn.classList.remove("added");
                    cartBtn.textContent = originalText;
                }, 1600);
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            initSearchButtons();
            initCardInteractions();
        });
    } else {
        initSearchButtons();
        initCardInteractions();
    }
})();
