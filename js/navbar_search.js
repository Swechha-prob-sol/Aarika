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
                        placeholder="Search for tunics, tops, kurta sets, kurtis, dresses..." 
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
        const searchButtons = document.querySelectorAll(".search-icon-btn, .nav-icon-emoji, .mobile-nav-icon");
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

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            initSearchButtons();
        });
    } else {
        initSearchButtons();
    }
})();
