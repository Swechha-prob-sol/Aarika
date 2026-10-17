// Aarika React Search Application
// Powered by React 18 without build step for maximum speed & compatibility

(function () {
    const { useState, useEffect, useMemo } = React;
    const e = React.createElement;

    function SearchApp() {
        // Read URL query parameters (?q=...&category=...)
        const getUrlParams = () => {
            const params = new URLSearchParams(window.location.search);
            return {
                q: params.get("q") || "",
                cat: params.get("category") || "All"
            };
        };

        const initialParams = getUrlParams();
        const [query, setQuery] = useState(initialParams.q);
        const [activeCategory, setActiveCategory] = useState(initialParams.cat);
        const [sortBy, setSortBy] = useState("featured");
        const [selectedSizes, setSelectedSizes] = useState({});
        const [wishlist, setWishlist] = useState({});
        const [addedToCart, setAddedToCart] = useState({});
        const [toastMessage, setToastMessage] = useState(null);

        // Available categories for filter pills
        const categories = ["All", "Tunics", "Tops", "Kurta Sets", "Kurtis", "Dresses", "Sarees", "Men", "Kids"];

        // Update URL when search or category changes without reloading page
        useEffect(() => {
            const params = new URLSearchParams();
            if (query.trim()) params.set("q", query.trim());
            if (activeCategory && activeCategory !== "All") params.set("category", activeCategory);

            const newUrl = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
            window.history.replaceState({}, "", newUrl);
        }, [query, activeCategory]);

        // Filter and sort products
        const filteredProducts = useMemo(() => {
            if (typeof window.searchProducts !== "function") return [];
            let list = window.searchProducts(query, activeCategory);

            // Sorting logic
            if (sortBy === "price-asc") {
                list = [...list].sort((a, b) => a.price - b.price);
            } else if (sortBy === "price-desc") {
                list = [...list].sort((a, b) => b.price - a.price);
            } else if (sortBy === "name-asc") {
                list = [...list].sort((a, b) => a.title.localeCompare(b.title));
            }
            return list;
        }, [query, activeCategory, sortBy]);

        // Show temporary toast message
        const showToast = (msg) => {
            setToastMessage(msg);
            setTimeout(() => {
                setToastMessage(null);
            }, 2600);
        };

        // Handle size select
        const handleSizeSelect = (productId, size) => {
            setSelectedSizes(prev => ({ ...prev, [productId]: size }));
        };

        // Handle wishlist toggle
        const toggleWishlist = (product) => {
            setWishlist(prev => {
                const updated = !prev[product.id];
                showToast(updated ? `Added "${product.title}" to Wishlist ♡` : `Removed from Wishlist`);
                return { ...prev, [product.id]: updated };
            });
        };

        // Handle add to cart
        const handleAddToCart = (product) => {
            const chosenSize = selectedSizes[product.id] || product.sizes[0];
            setAddedToCart(prev => ({ ...prev, [product.id]: true }));
            showToast(`Added ${product.title} (Size: ${chosenSize}) to Cart! 🛒`);

            setTimeout(() => {
                setAddedToCart(prev => ({ ...prev, [product.id]: false }));
            }, 1800);
        };

        // Image path resolver (checks if running inside html/ or root)
        const resolveImgSrc = (imgSrc) => {
            if (!imgSrc) return "";
            if (imgSrc.startsWith("http") || imgSrc.startsWith("/")) return imgSrc;
            // Check if current page is in html/ folder
            const inHtmlFolder = window.location.pathname.includes("/html/");
            return inHtmlFolder ? "../" + imgSrc : imgSrc;
        };

        return e("div", { className: "search-page-wrapper" },
            // Hero / Search Input Header
            e("section", { className: "search-header-hero" },
                e("p", { className: "search-hero-eyebrow" }, "Aarika Discovery Collection"),
                e("h1", { className: "search-hero-title" }, "Find Your Perfect Style"),
                e("div", { className: "search-gold-divider" }),

                // Search Bar Form
                e("div", { className: "search-bar-container" },
                    e("div", { className: "search-input-wrap" },
                        e("span", { className: "search-input-icon" }, "🔍"),
                        e("input", {
                            type: "text",
                            className: "main-search-input",
                            placeholder: "Search for tunics, tops, kurta sets, kurtis, dresses, sarees...",
                            value: query,
                            onChange: (evt) => setQuery(evt.target.value),
                            autoFocus: true
                        }),
                        query && e("button", {
                            className: "clear-search-btn",
                            onClick: () => setQuery(""),
                            title: "Clear search"
                        }, "✕"),
                        e("button", {
                            className: "search-submit-btn",
                            onClick: () => { }
                        }, "Search")
                    )
                ),

                // Category Chips
                e("div", { className: "search-categories-bar" },
                    categories.map(cat =>
                        e("button", {
                            key: cat,
                            className: `category-chip ${activeCategory === cat ? "active" : ""}`,
                            onClick: () => setActiveCategory(cat)
                        }, cat)
                    )
                )
            ),

            // Results summary bar & Sort
            e("div", { className: "results-info-container" },
                e("div", { className: "results-count-text" },
                    query.trim()
                        ? e("span", null,
                            "Showing ",
                            e("strong", null, filteredProducts.length),
                            " results for ",
                            e("strong", null, `"${query}"`),
                            activeCategory !== "All" ? ` in ${activeCategory}` : ""
                        )
                        : e("span", null,
                            "Showing ",
                            e("strong", null, filteredProducts.length),
                            activeCategory !== "All" ? ` products in ${activeCategory}` : " products"
                        )
                ),

                // Sort Dropdown
                e("div", { className: "sort-container" },
                    e("span", { className: "sort-label" }, "Sort by:"),
                    e("select", {
                        className: "sort-select",
                        value: sortBy,
                        onChange: (e) => setSortBy(e.target.value)
                    },
                        e("option", { value: "featured" }, "Featured"),
                        e("option", { value: "price-asc" }, "Price: Low to High"),
                        e("option", { value: "price-desc" }, "Price: High to Low"),
                        e("option", { value: "name-asc" }, "Name: A to Z")
                    )
                )
            ),

            // Products Grid or Empty State
            filteredProducts.length > 0
                ? e("div", { className: "products-grid" },
                    filteredProducts.map(product => {
                        const isWishlisted = !!wishlist[product.id];
                        const isAdded = !!addedToCart[product.id];
                        const currentSize = selectedSizes[product.id] || product.sizes[0];
                        const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

                        return e("div", { key: product.id, className: "product-card" },
                            // Image Box
                            e("div", { className: "card-image-box" },
                                product.badge && e("span", { className: "card-badge" }, product.badge),
                                e("button", {
                                    className: `wishlist-toggle-btn ${isWishlisted ? "active" : ""}`,
                                    onClick: () => toggleWishlist(product),
                                    title: isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                                }, isWishlisted ? "♥" : "♡"),
                                e("img", {
                                    src: resolveImgSrc(product.image),
                                    alt: product.title,
                                    className: "card-image",
                                    loading: "lazy"
                                })
                            ),

                            // Details
                            e("div", { className: "card-details" },
                                e("span", { className: "card-category-tag" }, product.category),
                                e("h3", { className: "card-title", title: product.title }, product.title),

                                // Price Row
                                e("div", { className: "card-price-row" },
                                    e("span", { className: "card-price" }, `₹${product.price.toLocaleString("en-IN")}`),
                                    product.originalPrice && e("span", { className: "card-original-price" }, `₹${product.originalPrice.toLocaleString("en-IN")}`),
                                    discountPercent > 0 && e("span", { className: "card-discount" }, `${discountPercent}% OFF`)
                                ),

                                // Sizes
                                product.sizes && product.sizes.length > 1 && e("div", null,
                                    e("div", { className: "card-sizes-label" }, "Select Size:"),
                                    e("div", { className: "card-sizes-row" },
                                        product.sizes.map(size =>
                                            e("button", {
                                                key: size,
                                                className: `size-pill ${currentSize === size ? "selected" : ""}`,
                                                onClick: () => handleSizeSelect(product.id, size)
                                            }, size)
                                        )
                                    )
                                ),

                                // Add to cart
                                e("button", {
                                    className: `card-add-cart-btn ${isAdded ? "added" : ""}`,
                                    onClick: () => handleAddToCart(product)
                                }, isAdded ? "✓ Added to Cart" : "Add to Cart")
                            )
                        );
                    })
                )
                // Empty State
                : e("div", { className: "search-empty-state" },
                    e("div", { className: "empty-icon" }, "🔍"),
                    e("h2", { className: "empty-title" }, "No Styles Found"),
                    e("p", { className: "empty-subtitle" },
                        `We couldn't find any products matching "${query}". Try adjusting your keywords or browse popular categories below.`
                    ),
                    e("div", { className: "empty-suggestions-label" }, "Popular Searches"),
                    e("div", { className: "empty-suggestions" },
                        ["Tunics", "Tops", "Kurta Sets", "Kurtis", "Dresses", "Sarees"].map(item =>
                            e("button", {
                                key: item,
                                className: "suggestion-pill",
                                onClick: () => {
                                    setQuery(item.toLowerCase());
                                    setActiveCategory("All");
                                }
                            }, item)
                        )
                    )
                ),

            // Toast Alert
            toastMessage && e("div", { className: "aarika-toast" }, toastMessage)
        );
    }

    // Mount to DOM
    window.addEventListener("DOMContentLoaded", () => {
        const mountPoint = document.getElementById("react-search-root");
        if (mountPoint && window.ReactDOM) {
            const root = ReactDOM.createRoot(mountPoint);
            root.render(e(SearchApp));
        }
    });
})();
