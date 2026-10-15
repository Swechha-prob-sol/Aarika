// Aarika Product Metadata Catalog
// Contains metadata for all store products with categories, tags, prices, sizes, and images

const AARIKA_PRODUCTS = [
    // --- TUNICS ---
    {
        id: "tunic-1",
        title: "Embroidered Floral Tunic",
        category: "Tunics",
        price: 1899,
        originalPrice: 2499,
        badge: "Trending",
        image: "photos/tunics.jpg",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["tunic", "tunics", "short kurti", "floral", "embroidered", "cotton", "casual", "ethnic", "women", "top"],
        description: "Soft breathable cotton tunic featuring delicate floral thread embroidery with a relaxed, modern silhouette."
    },
    {
        id: "tunic-2",
        title: "Bohemian Printed Cotton Tunic",
        category: "Tunics",
        price: 1699,
        originalPrice: 2199,
        badge: "New",
        image: "photos/na4.jpg",
        sizes: ["S", "M", "L", "XL"],
        tags: ["tunic", "tunics", "printed", "boho", "cotton", "casual", "women", "short kurti"],
        description: "Artisanal block-print inspired tunic styled with 3/4 sleeves and comfortable side slits."
    },
    {
        id: "tunic-3",
        title: "Rustic Linen Buttoned Tunic",
        category: "Tunics",
        price: 2199,
        originalPrice: 2799,
        badge: "Best Seller",
        image: "photos/wishlist2.jpg",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["tunic", "tunics", "linen", "buttoned", "workwear", "minimal", "women"],
        description: "Sophisticated everyday linen tunic designed for effortless comfort and timeless style."
    },

    // --- TOPS ---
    {
        id: "top-1",
        title: "Leaf Print Top",
        category: "Tops",
        price: 1799,
        originalPrice: 2299,
        badge: "Best Seller",
        image: "photos/product4.jpg",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["top", "tops", "leaf print", "blouse", "casual", "summer", "women", "printed"],
        description: "Chic botanical print top crafted from soft rayon with a flattering gathered neckline."
    },
    {
        id: "top-2",
        title: "Cascading Linen Peplum Top",
        category: "Tops",
        price: 1599,
        originalPrice: 1999,
        badge: "Popular",
        image: "photos/tops.jpg",
        sizes: ["XS", "S", "M", "L"],
        tags: ["top", "tops", "peplum", "linen", "sleeveless", "casual", "women", "summer"],
        description: "Lightweight, breathable linen top with an elegant peplum flare and subtle mother-of-pearl buttons."
    },
    {
        id: "top-3",
        title: "Artisan Embroidered Blouse Top",
        category: "Tops",
        price: 1899,
        originalPrice: 2399,
        badge: "New",
        image: "photos/na7.jpg",
        sizes: ["S", "M", "L", "XL"],
        tags: ["top", "tops", "blouse", "embroidered", "artisan", "women", "workwear"],
        description: "Handcrafted detailing elevates this relaxed-fit everyday blouse, perfect for work or casual weekends."
    },

    // --- KURTA SETS ---
    {
        id: "kurta-set-1",
        title: "Ivy Kurta Set",
        category: "Kurta Sets",
        price: 2399,
        originalPrice: 3199,
        badge: "Best Seller",
        image: "photos/kurtis.jpg",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["kurta set", "kurta sets", "kurtaset", "kurtasets", "suit", "ethnic", "festive", "kurta", "women", "ivy"],
        description: "Complete 3-piece emerald green kurta ensemble featuring straight pants and an organza dupatta with gold lace."
    },
    {
        id: "kurta-set-2",
        title: "Pastel Printed Kurta Set",
        category: "Kurta Sets",
        price: 2499,
        originalPrice: 3299,
        badge: "Trending",
        image: "photos/trend3.jpg",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["kurta set", "kurta sets", "kurtaset", "kurtasets", "pastel", "printed", "ethnic", "women", "suit"],
        description: "Soothing pastel floral kurta paired with tailored trousers and a lightweight sheer dupatta."
    },
    {
        id: "kurta-set-3",
        title: "Festive Embroidered Silk Kurta Set",
        category: "Kurta Sets",
        price: 3499,
        originalPrice: 4599,
        badge: "Exclusive",
        image: "photos/kurta_set.jpg",
        sizes: ["S", "M", "L", "XL"],
        tags: ["kurta set", "kurta sets", "kurtaset", "kurtasets", "silk", "festive", "zari", "wedding", "women"],
        description: "Luxurious chanderi silk kurta set adorned with detailed zari embroidery, crafted for grand occasions."
    },
    {
        id: "kurta-set-4",
        title: "Embroidered Kurta Set on Sale",
        category: "Kurta Sets",
        price: 1499,
        originalPrice: 2999,
        badge: "50% OFF",
        image: "photos/sales2.jpg",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["kurta set", "kurta sets", "kurtaset", "kurtasets", "sale", "discount", "ethnic", "women"],
        description: "Special seasonal discount on our best-selling earth-toned embroidered kurta set."
    },

    // --- KURTIS ---
    {
        id: "kurti-1",
        title: "Olive Green Kurti",
        category: "Kurtis",
        price: 1999,
        originalPrice: 2499,
        badge: "Best Seller",
        image: "photos/product5.jpg",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["kurti", "kurtis", "kurta", "olive green", "cotton", "daily wear", "ethnic", "women"],
        description: "Graceful straight cut olive kurti crafted with pure organic cotton and subtle metallic yoke accents."
    },
    {
        id: "kurti-2",
        title: "Cotton Floral Kurti",
        category: "Kurtis",
        price: 1699,
        originalPrice: 2199,
        badge: "Popular",
        image: "photos/trend5.jpg",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["kurti", "kurtis", "cotton", "floral", "printed", "summer", "women", "kurta"],
        description: "Vibrant all-over floral print kurti in pure breathable cambric cotton, ideal for everyday grace."
    },
    {
        id: "kurti-3",
        title: "Embroidered Straight Kurti",
        category: "Kurtis",
        price: 2199,
        originalPrice: 2799,
        badge: "Trending",
        image: "photos/trend2.jpg",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["kurti", "kurtis", "embroidered", "straight kurti", "ethnic", "women", "kurta"],
        description: "Intricately detailed neck embroidery on premium slub cotton fabric with side pockets."
    },
    {
        id: "kurti-4",
        title: "Artisanal A-Line Kurti",
        category: "Kurtis",
        price: 1849,
        originalPrice: 2399,
        badge: "New",
        image: "photos/na5.jpg",
        sizes: ["S", "M", "L", "XL"],
        tags: ["kurti", "kurtis", "a-line", "kurta", "indigo", "ethnic", "women"],
        description: "Flattering A-line flair with handcrafted buttons and classic wooden print motifs."
    },

    // --- DRESSES ---
    {
        id: "dress-1",
        title: "Meadow Maxi Dress",
        category: "Dresses",
        price: 2799,
        originalPrice: 3499,
        badge: "Best Seller",
        image: "photos/product1.jpg",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["dress", "dresses", "maxi dress", "floral", "vacation", "meadow", "women"],
        description: "Tiered full-length maxi dress adorned with serene wild meadow florals and tie-up shoulder straps."
    },
    {
        id: "dress-2",
        title: "Sage Tier Dress",
        category: "Dresses",
        price: 2599,
        originalPrice: 3199,
        badge: "Popular",
        image: "photos/product3.png",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["dress", "dresses", "tier dress", "sage", "green", "cotton", "women"],
        description: "Flawless sage green silhouette with layered tiers, breathable natural fibers, and gentle drape."
    },
    {
        id: "dress-3",
        title: "Bloom Floral Dress",
        category: "Dresses",
        price: 2699,
        originalPrice: 3299,
        badge: "Trending",
        image: "photos/product6.jpg",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["dress", "dresses", "bloom", "floral", "midi dress", "party", "women"],
        description: "Radiant blossom print midi dress featuring a cinched waistline and flutter sleeves."
    },
    {
        id: "dress-4",
        title: "Floral Print Maxi Dress (Sale)",
        category: "Dresses",
        price: 1399,
        originalPrice: 3499,
        badge: "60% OFF",
        image: "photos/sales1.jpg",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["dress", "dresses", "sale", "maxi", "floral", "discount", "women"],
        description: "Flowy, dramatic summer maxi dress on a limited-time 60% promotional clearance."
    },
    {
        id: "dress-5",
        title: "Polka Dot Wrap Dress",
        category: "Dresses",
        price: 1499,
        originalPrice: 2499,
        badge: "40% OFF",
        image: "photos/sales3.jpg",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["dress", "dresses", "wrap dress", "polka dot", "sale", "retro", "women"],
        description: "Timeless vintage-inspired wrap dress with adjustable tie belt and flutter hem."
    },
    {
        id: "dress-6",
        title: "Green Printed Midi Dress",
        category: "Dresses",
        price: 2299,
        originalPrice: 2899,
        badge: "New",
        image: "photos/trend4.jpg",
        sizes: ["XS", "S", "M", "L", "XL"],
        tags: ["dress", "dresses", "green", "printed", "midi", "women", "casual"],
        description: "Deep emerald foliage print on lightweight modal cotton with front button placket."
    },

    // --- SAREES ---
    {
        id: "saree-1",
        title: "Banarasi Silk Saree",
        category: "Sarees",
        price: 4999,
        originalPrice: 6999,
        badge: "Festive",
        image: "photos/sarees.jpg",
        sizes: ["Free Size"],
        tags: ["saree", "sarees", "sari", "saris", "banarasi", "silk", "zari", "wedding", "women"],
        description: "Lustrous heritage Banarasi silk woven with pure zari pallu and matching unstitched blouse piece."
    },
    {
        id: "saree-2",
        title: "Handloom Chanderi Saree",
        category: "Sarees",
        price: 3799,
        originalPrice: 4899,
        badge: "Artisan",
        image: "photos/na3.jpg",
        sizes: ["Free Size"],
        tags: ["saree", "sarees", "sari", "saris", "chanderi", "handloom", "ethnic", "women"],
        description: "Light-as-air handwoven Chanderi cotton-silk saree featuring traditional buti motifs."
    },

    // --- MEN'S COLLECTION ---
    {
        id: "men-1",
        title: "Men's Classic Linen Shirt",
        category: "Men",
        price: 2299,
        originalPrice: 2899,
        badge: "Best Seller",
        image: "photos/shirts.jpg",
        sizes: ["S", "M", "L", "XL", "XXL"],
        tags: ["men", "mens", "shirt", "shirts", "linen", "casual", "workwear", "white shirt"],
        description: "Crisp 100% French flax linen shirt with spread collar and tailored modern fit."
    },
    {
        id: "men-2",
        title: "Men's Festive Kurta Set",
        category: "Men",
        price: 2999,
        originalPrice: 3999,
        badge: "Festive",
        image: "photos/kurta_setmen.jpg",
        sizes: ["S", "M", "L", "XL"],
        tags: ["men", "mens", "kurta", "kurta set", "kurta sets", "ethnic", "festive", "churidar"],
        description: "Regal silk-blend men's kurta with subtle thread detailing and matching white churidar."
    },
    {
        id: "men-3",
        title: "Premium Pique Polo T-Shirt",
        category: "Men",
        price: 1499,
        originalPrice: 1999,
        badge: "Popular",
        image: "photos/polos.jpg",
        sizes: ["S", "M", "L", "XL", "XXL"],
        tags: ["men", "mens", "polo", "polos", "tshirt", "tshirts", "casual"],
        description: "100% combed cotton pique knit polo shirt featuring ribbed collar and contrast tipping."
    },
    {
        id: "men-4",
        title: "Tailored Stretch Chinos",
        category: "Men",
        price: 2199,
        originalPrice: 2799,
        badge: "Essential",
        image: "photos/pants.jpg",
        sizes: ["30", "32", "34", "36", "38"],
        tags: ["men", "mens", "pants", "chinos", "trousers", "bottoms", "cotton"],
        description: "Versatile four-way stretch cotton chinos engineered for all-day comfort and sharp styling."
    },

    // --- KIDS COLLECTION ---
    {
        id: "kids-1",
        title: "Kids Festive Kurta Set",
        category: "Kids",
        price: 1599,
        originalPrice: 2199,
        badge: "Festive",
        image: "photos/kidskurtas.jpg",
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
        tags: ["kids", "kid", "child", "boys", "kurta", "kurta set", "ethnic", "festive"],
        description: "Soft skin-friendly cotton kurta and pajama set for boys with joyful festive prints."
    },
    {
        id: "kids-2",
        title: "Girls Floral Party Frock",
        category: "Kids",
        price: 1499,
        originalPrice: 1999,
        badge: "New",
        image: "photos/kidsdresses.jpg",
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
        tags: ["kids", "kid", "girls", "dress", "frock", "party", "floral"],
        description: "Charming twirl-worthy floral dress with comfortable inner cotton lining."
    },
    {
        id: "kids-3",
        title: "Kids Cotton Printed T-Shirt",
        category: "Kids",
        price: 699,
        originalPrice: 999,
        badge: "Daily",
        image: "photos/kidstshirt.jpg",
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
        tags: ["kids", "kid", "tshirt", "tshirts", "tee", "cotton", "casual"],
        description: "Super-soft combed cotton crewneck tee featuring fun animal prints."
    },
    {
        id: "kids-4",
        title: "Cozy Fleece Hooded Sweatshirt",
        category: "Kids",
        price: 1199,
        originalPrice: 1699,
        badge: "Winter",
        image: "photos/Hooded_Sweatshirt_kids.webp",
        sizes: ["4-5Y", "6-7Y", "8-9Y", "10-12Y"],
        tags: ["kids", "kid", "hoodie", "sweatshirt", "winter", "jacket"],
        description: "Plush organic cotton fleece hoodie with kangaroo pocket to keep little hands warm."
    }
];

// Helper: search products with smart stemming & plural handling
function searchProducts(query, categoryFilter = "All") {
    if (!query) query = "";
    
    // Normalize query
    const cleaned = query.trim().toLowerCase();
    
    // Handle stemming: e.g. "tunics" -> "tunic", "kurtis" -> "kurti", "tops" -> "top", "sets" -> "set"
    const terms = cleaned.split(/\s+/).filter(Boolean);

    return AARIKA_PRODUCTS.filter(product => {
        // Category filter check
        if (categoryFilter && categoryFilter !== "All") {
            if (product.category.toLowerCase() !== categoryFilter.toLowerCase()) {
                return false;
            }
        }

        // If no search query, return all in category
        if (terms.length === 0) return true;

        // Searchable text corpus
        const titleText = product.title.toLowerCase();
        const catText = product.category.toLowerCase();
        const descText = (product.description || "").toLowerCase();
        const tags = (product.tags || []).map(t => t.toLowerCase());

        return terms.every(term => {
            // Base term and variants (strip plural s/es/ies)
            const variants = [term];
            if (term.endsWith("ies")) variants.push(term.slice(0, -3) + "y", term.slice(0, -3) + "i");
            if (term.endsWith("es")) variants.push(term.slice(0, -2));
            if (term.endsWith("s")) variants.push(term.slice(0, -1));
            if (term.endsWith("'s")) variants.push(term.slice(0, -2));

            // Helper to match string with word boundary for short tokens like 'men'
            const matchesText = (target, v) => {
                if (!target) return false;
                if (v === "men" || v === "man") {
                    return new RegExp(`\\b${v}(?:'s|s)?\\b`, "i").test(target);
                }
                return target.includes(v);
            };

            // Check if any variant matches
            return variants.some(v => {
                if (matchesText(titleText, v)) return true;
                if (matchesText(catText, v)) return true;
                if (matchesText(descText, v)) return true;
                if (tags.some(tag => {
                    if (v === "men" || v === "man") return tag === "men" || tag === "mens";
                    return tag.includes(v) || v.includes(tag);
                })) return true;
                return false;
            });
        });
    });
}

// Make globally accessible
if (typeof window !== "undefined") {
    window.AARIKA_PRODUCTS = AARIKA_PRODUCTS;
    window.searchProducts = searchProducts;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = { AARIKA_PRODUCTS, searchProducts };
}
