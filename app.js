/**
 * Mitti Ky Bartan - Main Application Script
 * Implements LocalStorage database, SPA Hash Router, State Management,
 * Interactive UI components, Payment Flows, and Admin Dashboard.
 */

// --- DATABASE & STATE MANAGEMENT ---
const DB_VERSION = "1.0.1";

const DEFAULT_CATEGORIES = [
  { id: "all", name: "All Products" },
  { id: "plates", name: "Plates" },
  { id: "bowls", name: "Bowls" },
  { id: "handi", name: "Cooking Pots / Handi" },
  { id: "jugs", name: "Jugs & Pitchers" },
  { id: "serving", name: "Serving Ware" },
  { id: "decor", name: "Decorative Pottery" },
  { id: "new-arrivals", name: "New Arrivals" },
  { id: "best-sellers", name: "Best Sellers" }
];

const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    name: "Traditional Terracotta Cooking Handi",
    category: "handi",
    pricePKR: 2450,
    priceUSD: 18,
    originalPricePKR: 3200,
    originalPriceUSD: 24,
    rating: 4.8,
    stock: 12,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80"
    ],
    tag: "Sale",
    featured: true,
    isBestSeller: true,
    isNewArrival: false,
    description: "Our signature earthenware cooking pot (Handi) is handcrafted by local artisans. It is completely unglazed, preserving the organic alkaline nature of the clay which neutralizes the pH balance of foods cooked inside. Ideal for slow cooking curries, lentils, and meat dishes.",
    material: "100% Organic Terracotta Clay, naturally seasoned",
    care: "Season before first use: soak in water for 12 hours, dry completely, rub interior with oil, and heat on low for 10 mins. Handwash with warm water only — no synthetic soaps."
  },
  {
    id: "prod-2",
    name: "Terracotta Dinner Plates (Set of 4)",
    category: "plates",
    pricePKR: 3800,
    priceUSD: 28,
    originalPricePKR: 3800,
    originalPriceUSD: 28,
    rating: 4.7,
    stock: 8,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576016770956-debb63d90029?w=600&auto=format&fit=crop&q=80"
    ],
    tag: "Popular",
    featured: true,
    isBestSeller: true,
    isNewArrival: false,
    description: "A set of four rustic terracotta dining plates. Their soft, smooth texture and earthy reddish-brown hue bring a rustic charm to your dining table. Food-safe, durable, and naturally heat-retentive.",
    material: "High-fire natural clay",
    care: "Wash with mild eco-friendly dish wash and soft sponge. Do not soak plates for extended periods."
  },
  {
    id: "prod-3",
    name: "Rustic Clay Serving Bowls (Set of 2)",
    category: "bowls",
    pricePKR: 1200,
    priceUSD: 9,
    originalPricePKR: 1500,
    originalPriceUSD: 11,
    rating: 4.6,
    stock: 3,
    image: "https://images.unsplash.com/photo-1576016770956-debb63d90029?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1576016770956-debb63d90029?w=600&auto=format&fit=crop&q=80"
    ],
    tag: "Low Stock",
    featured: false,
    isBestSeller: false,
    isNewArrival: true,
    description: "Deep earthen bowls perfect for serving traditional gravies, raita, and desserts like Kheer or Firni. Keeps cold foods cool and hot foods hot for longer duration.",
    material: "Hand-spun natural red clay",
    care: "Microwave safe. Do not use abrasive steel scrubbers when cleaning."
  },
  {
    id: "prod-4",
    name: "Earthen Water Pitcher (Cooling Jug)",
    category: "jugs",
    pricePKR: 1600,
    priceUSD: 12,
    originalPricePKR: 1600,
    originalPriceUSD: 12,
    rating: 4.9,
    stock: 15,
    image: "https://images.unsplash.com/photo-1595166034177-3e1b78b5e28a?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1595166034177-3e1b78b5e28a?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&auto=format&fit=crop&q=80"
    ],
    tag: "Best Seller",
    featured: true,
    isBestSeller: true,
    isNewArrival: false,
    description: "This traditional clay water pitcher naturally cools water through evaporation. Water stored in clay is loaded with natural minerals and is alkaline, which helps maintain a healthy digestion and metabolism.",
    material: "Porous natural river clay",
    care: "Wash with warm water. Fill with drinking water and let it sit. Water will seep slightly on the outer walls, which is normal and indicates evaporation cooling is working."
  },
  {
    id: "prod-5",
    name: "Hand-Painted Clay Chai Cups (Set of 6)",
    category: "serving",
    pricePKR: 1850,
    priceUSD: 14,
    originalPricePKR: 2200,
    originalPriceUSD: 17,
    rating: 4.9,
    stock: 20,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80"
    ],
    tag: "Sale",
    featured: true,
    isBestSeller: false,
    isNewArrival: true,
    description: "Enjoy your morning chai or evening Kahwa in these rustic clay cups (Matka Cups). Decorated with elegant, hand-painted cream-colored motifs, reflecting heritage pottery styles.",
    material: "Kiln-fired fine clay, lead-free organic colors",
    care: "Rinse with hot water before first use. Handle with care as they are delicate."
  },
  {
    id: "prod-6",
    name: "Heritage Glazed Clay Biryani Pot",
    category: "handi",
    pricePKR: 2900,
    priceUSD: 22,
    originalPricePKR: 2900,
    originalPriceUSD: 22,
    rating: 4.8,
    stock: 6,
    image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80"
    ],
    tag: "New",
    featured: false,
    isBestSeller: false,
    isNewArrival: true,
    description: "Designed specifically for cooking biryani. This pot features an eco-glazed interior which prevents sticking and allows easy cleaning, while retaining the benefits of traditional clay cookware.",
    material: "Food-grade glazed clay interior, raw clay exterior",
    care: "Season exterior raw surface. Safe for stove-top flame and oven cooking. Do not place empty pot on high heat."
  },
  {
    id: "prod-7",
    name: "Terracotta Leaf-Motif Platter",
    category: "serving",
    pricePKR: 2100,
    priceUSD: 16,
    originalPricePKR: 2100,
    originalPriceUSD: 16,
    rating: 4.5,
    stock: 0,
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&auto=format&fit=crop&q=80"
    ],
    tag: "Out of Stock",
    featured: false,
    isBestSeller: false,
    isNewArrival: false,
    description: "An elegant serving platter carved with a subtle leaf pattern. Excellent for serving snacks, bread, or traditional flatbreads. Adds an artistic handcrafted element to table setups.",
    material: "Terracotta clay, hand-engraved",
    care: "Wash with water, wipe with dry cloth, do not soak in water."
  },
  {
    id: "prod-8",
    name: "Decorative Clay Pot Diffuser",
    category: "decor",
    pricePKR: 950,
    priceUSD: 7,
    originalPricePKR: 1100,
    originalPriceUSD: 9,
    rating: 4.4,
    stock: 14,
    image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80"
    ],
    tag: "Sale",
    featured: false,
    isBestSeller: false,
    isNewArrival: false,
    description: "A rustic terracotta oil burner/diffuser. Hollow center allows a tea-light candle, spreading beautiful patterns of light through hand-carved pinholes while vaporizing essential oils on top.",
    material: "Traditional kiln-fired terracotta",
    care: "Wait for the diffuser to cool down completely before washing or refilling the water."
  },
  {
    id: "prod-9",
    name: "Organic Clay Yogurt Pot",
    category: "handi",
    pricePKR: 1400,
    priceUSD: 10,
    originalPricePKR: 1400,
    originalPriceUSD: 10,
    rating: 4.7,
    stock: 10,
    image: "https://images.unsplash.com/photo-1576016770956-debb63d90029?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1576016770956-debb63d90029?w=600&auto=format&fit=crop&q=80"
    ],
    tag: "Popular",
    featured: false,
    isBestSeller: true,
    isNewArrival: false,
    description: "Setting milk in clay yogurt pots naturally absorbs excess water, resulting in thick, sweet, and rich curd (yogurt). Keeps yogurt naturally cool without refrigeration.",
    material: "Semi-porous organic red clay",
    care: "Rinse with hot water before using. Dry thoroughly between uses to prevent moisture buildup."
  },
  {
    id: "prod-10",
    name: "Large Clay Water Dispenser with Tap",
    category: "jugs",
    pricePKR: 4500,
    priceUSD: 34,
    originalPricePKR: 5200,
    originalPriceUSD: 39,
    rating: 4.9,
    stock: 2,
    image: "https://images.unsplash.com/photo-1595166034177-3e1b78b5e28a?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1595166034177-3e1b78b5e28a?w=600&auto=format&fit=crop&q=80"
    ],
    tag: "Low Stock",
    featured: true,
    isBestSeller: true,
    isNewArrival: true,
    description: "A heritage 10-liter clay water dispenser equipped with a premium brass tap. Naturally cools water, filters out impurities, and balances acidity, making it the perfect organic cooling station for your home.",
    material: "Thick-walled porous earthen clay, brass tap",
    care: "Ensure placement on a sturdy stand. Clean exterior surface regularly to maintain cooling performance."
  }
];

const DEFAULT_REVIEWS = {
  "prod-1": [
    { name: "Ayesha Khan", date: "2026-06-15", rating: 5, comment: "Absolutely love cooking curries in this. The flavor is noticeably richer and earthy. High quality handi!", approved: true, images: [] },
    { name: "Imran Ahmed", date: "2026-07-02", rating: 4, comment: "Very good handi. Took some time to season but cooks beautifully now. Mild clay aroma is pleasant.", approved: true, images: [] }
  ],
  "prod-4": [
    { name: "Rajesh Kumar", date: "2026-05-20", rating: 5, comment: "Brings back childhood memories of drinking cool water from a matka. Incredible natural cooling!", approved: true, images: [] }
  ]
};

const DEFAULT_ORDERS = [
  {
    id: "ORD-98231",
    userId: "cust-1",
    date: "2026-07-10",
    items: [
      { id: "prod-1", name: "Traditional Terracotta Cooking Handi", qty: 1, price: 2450 }
    ],
    subtotal: 2450,
    shipping: 250,
    total: 2700,
    currency: "PKR",
    status: "delivered", // processing, shipped, delivered
    address: "House 24B, Street 3, F-8/2, Islamabad",
    paymentMethod: "JazzCash",
    trackingSteps: [
      { step: "Order Placed", date: "2026-07-10 10:30 AM", done: true },
      { step: "Processing", date: "2026-07-10 02:15 PM", done: true },
      { step: "Shipped", date: "2026-07-11 09:00 AM", done: true },
      { step: "Delivered", date: "2026-07-13 04:30 PM", done: true }
    ]
  },
  {
    id: "ORD-12344",
    userId: "cust-1",
    date: "2026-07-16",
    items: [
      { id: "prod-3", name: "Rustic Clay Serving Bowls (Set of 2)", qty: 2, price: 1200 },
      { id: "prod-5", name: "Hand-Painted Clay Chai Cups (Set of 6)", qty: 1, price: 1850 }
    ],
    subtotal: 4250,
    shipping: 300,
    total: 4550,
    currency: "PKR",
    status: "processing",
    address: "Apartment 402, Block D, DHA Phase 6, Lahore",
    paymentMethod: "Cash on Delivery",
    trackingSteps: [
      { step: "Order Placed", date: "2026-07-16 09:12 AM", done: true },
      { step: "Processing", date: "2026-07-16 11:30 AM", done: true },
      { step: "Shipped", date: "", done: false },
      { step: "Delivered", date: "", done: false }
    ]
  }
];

const DEFAULT_USERS = [
  { id: "cust-1", email: "customer@gmail.com", name: "Sara Malik", password: "password123", role: "customer", phone: "+92 321 9876543", address: "DHA Phase 6, Lahore" },
  { id: "admin-1", email: "admin@mittikybartan.com", name: "Admin Mitti", password: "admin123", role: "admin" }
];

const DEFAULT_TESTIMONIALS = [
  { text: "Cooking in clay pots from Mitti Ky Bartan has completely changed our family's meals. Even a simple Daal tastes extraordinarily rich!", author: "Zainab R.", initials: "ZR" },
  { text: "The water dispenser is amazing. Water stays chilled during the hot summer and tastes extremely pure, unlike plastic bottles.", author: "Kamran Shah", initials: "KS" },
  { text: "Beautiful craft. The hand-painted chai cups are a hit with my guests. Excellent customer support for seasoning instructions.", author: "Priya V.", initials: "PV" }
];

const DEFAULT_ANALYTICS = {
  dailySales: [
    { date: "July 12", revenue: 4500, orders: 2 },
    { date: "July 13", revenue: 6200, orders: 3 },
    { date: "July 14", revenue: 2100, orders: 1 },
    { date: "July 15", revenue: 8900, orders: 4 },
    { date: "July 16", revenue: 4550, orders: 1 },
    { date: "July 17", revenue: 10400, orders: 5 },
    { date: "July 18", revenue: 0, orders: 0 } // Today
  ],
  productViews: {
    "prod-1": 142, "prod-2": 95, "prod-3": 64, "prod-4": 180, "prod-5": 110,
    "prod-6": 55, "prod-7": 32, "prod-8": 40, "prod-9": 75, "prod-10": 98
  },
  productCartClicks: {
    "prod-1": 34, "prod-2": 18, "prod-3": 12, "prod-4": 45, "prod-5": 22,
    "prod-6": 10, "prod-7": 2, "prod-8": 6, "prod-9": 14, "prod-10": 19
  },
  cartAbandons: 42,
  checkoutCompletions: 16
};

// Database local storage adapter
const db = {
  get(key) {
    try {
      const data = localStorage.getItem(`mkb_${key}`);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error reading localStorage key: " + key, e);
      return null;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem(`mkb_${key}`, JSON.stringify(val));
    } catch (e) {
      console.error("Error writing localStorage key: " + key, e);
    }
  }
};

// Initial database seeding if empty or outdated
function initDatabase() {
  const seededVersion = db.get("db_version");
  if (seededVersion !== DB_VERSION) {
    db.set("db_version", DB_VERSION);
    db.set("categories", DEFAULT_CATEGORIES);
    db.set("products", DEFAULT_PRODUCTS);
    db.set("reviews", DEFAULT_REVIEWS);
    db.set("orders", DEFAULT_ORDERS);
    db.set("users", DEFAULT_USERS);
    db.set("testimonials", DEFAULT_TESTIMONIALS);
    db.set("analytics", DEFAULT_ANALYTICS);
    
    // Setup initial session state if empty
    if (!db.get("cart")) db.set("cart", []);
    if (!db.get("wishlist")) db.set("wishlist", []);
    if (!db.get("currency")) db.set("currency", "PKR");
    if (!db.get("recently_viewed")) db.set("recently_viewed", []);
  }
}

// Initialize database
initDatabase();

// --- STATE VARIABLES ---
let cart = db.get("cart") || [];
let wishlist = db.get("wishlist") || [];
let currentCurrency = db.get("currency") || "PKR";
let currentUser = db.get("current_user") || null; // { id, name, email, role... }
let recentlyViewed = db.get("recently_viewed") || [];
let selectedCategory = "all";
let maxPriceFilter = 8000;
let searchQuery = "";
let sortOption = "popularity";

// Exchange rate mock: 1 USD = 280 PKR
const EXCHANGE_RATE = 280;

// Expose state mutators and actions globally to ensure robust inline trigger execution
window.selectCategoryAndNavigate = function(catId) {
  selectedCategory = catId;
  updateSidebarCategories();
  if (window.location.hash !== "#/products") {
    window.location.hash = "#/products";
  } else {
    renderProducts();
  }
};

window.clearAllFiltersAndRender = function() {
  selectedCategory = "all";
  searchQuery = "";
  document.getElementById("navbar-search").value = "";
  maxPriceFilter = 8000;
  document.getElementById("price-filter").value = 8000;
  document.getElementById("price-max-label").innerText = formatPrice(8000);
  sortOption = "popularity";
  document.getElementById("sort-filter").value = "popularity";
  updateSidebarCategories();
  if (window.location.hash === "#/products") {
    renderProducts();
  } else {
    window.location.hash = "#/products";
  }
  showToast("Filters cleared!", "success");
};

// Bind hoisted functions to global window object
window.addToCart = addToCart;
window.toggleWishlist = toggleWishlist;
window.updateSidebarCategories = updateSidebarCategories;
window.renderProducts = renderProducts;

// --- EXTRA PREMIUM TRADITIONAL HELPERS & EVENT BINDINGS ---
function getTraditionalDivider() {
  return `
    <div class="decorative-separator">
      <div class="separator-line"></div>
      <svg class="separator-icon" viewBox="0 0 64 64">
        <path d="M32,4 C22,4 16,8 16,14 C16,16 18,17 20,18 C16,22 14,28 14,36 C14,48 22,58 32,58 C42,58 50,48 50,36 C50,28 48,22 44,18 C46,17 48,16 48,14 C48,8 42,4 32,4 Z M32,54 C24.2,54 18,46 18,36 C18,34.8 18.1,33.5 18.3,32.2 C21.6,35 26.6,36.8 32,36.8 C37.4,36.8 42.4,35 45.7,32.2 C45.9,33.5 46,34.8 46,36 C46,46 39.8,54 32,54 Z"/>
      </svg>
      <div class="separator-line"></div>
    </div>
  `;
}

function triggerScrollReveal() {
  const reveals = document.querySelectorAll(".scroll-reveal");
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("visible");
    }
  });
}

// Add scroll listener for viewport reveals
window.addEventListener("scroll", triggerScrollReveal);



// --- ROUTER SYSTEM ---
const routes = {
  "#/": renderHome,
  "#/products": renderProducts,
  "#/product/:id": renderProductDetail,
  "#/cart": renderCart,
  "#/checkout": renderCheckout,
  "#/login": renderLogin,
  "#/profile": renderProfile,
  "#/wishlist": renderWishlist,
  "#/admin": renderAdmin,
  "#/faq": renderFAQ,
  "#/shipping": renderShipping,
  "#/returns": renderReturns,
  "#/contact": renderContact
};

function router() {
  const loader = document.getElementById("loading-overlay");
  if (loader) {
    loader.style.display = "flex";
    loader.style.opacity = "1";
  }

  const hash = window.location.hash || "#/";
  
  // Hide details-specific breadcrumb by default
  document.getElementById("detail-breadcrumb").style.display = "none";
  
  // Scroll to top on route change
  window.scrollTo(0, 0);

  // Close hamburger filters or sidebar overlay if mobile
  document.getElementById("app-sidebar").classList.remove("mobile-visible");

  // Track page views in analytics
  trackPageView(hash);

  // Perform routing action
  let matched = false;
  for (let path in routes) {
    if (path.includes("/:id")) {
      const routePrefix = path.split("/:id")[0];
      if (hash.startsWith(routePrefix + "/")) {
        const id = hash.substring(routePrefix.length + 1);
        routes[path](id);
        matched = true;
        break;
      }
    }
  }

  if (!matched) {
    if (routes[hash]) {
      routes[hash]();
    } else {
      // 404 Fallback
      document.getElementById("app-view").innerHTML = `
        <div style="text-align:center; padding: 100px 20px;">
          <h2 style="font-size:36px; margin-bottom:20px;">Clay Pot Shattered! (404)</h2>
          <p>The page you are looking for has returned to clay.</p>
          <a href="#/" class="btn-primary" style="margin-top:20px; display:inline-block;">Return Home</a>
        </div>
      `;
    }
  }

  // Dismiss loader with a slight delay for smooth visual transition
  setTimeout(() => {
    if (loader) {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }
    // Bind scroll reveal class checks
    triggerScrollReveal();
  }, 450);
}

// Listen to hash changes and initial page load
window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", () => {
  setupGlobalListeners();
  updateNavbarState();
  updateSidebarCategories();
  router();
});

// --- GLOBAL EVENT LISTENERS & UI ACTIONS ---
function setupGlobalListeners() {
  // Navbar Search Input
  const searchInput = document.getElementById("navbar-search");
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    if (window.location.hash !== "#/products") {
      window.location.hash = "#/products";
    } else {
      renderProducts();
    }
  });

  // Currency Switcher
  const currencySwitcher = document.getElementById("currency-switcher");
  currencySwitcher.value = currentCurrency;
  currencySwitcher.addEventListener("change", (e) => {
    currentCurrency = e.target.value;
    db.set("currency", currentCurrency);
    updateNavbarState();
    // Re-render active page to reflect price changes
    router();
  });

  // Price Slider filter
  const priceSlider = document.getElementById("price-filter");
  priceSlider.addEventListener("input", (e) => {
    maxPriceFilter = parseInt(e.target.value);
    document.getElementById("price-max-label").innerText = formatPrice(maxPriceFilter);
    if (window.location.hash !== "#/products") {
      window.location.hash = "#/products";
    } else {
      renderProducts();
    }
  });

  // Sort Filter
  const sortFilter = document.getElementById("sort-filter");
  sortFilter.addEventListener("change", (e) => {
    sortOption = e.target.value;
    if (window.location.hash !== "#/products") {
      window.location.hash = "#/products";
    } else {
      renderProducts();
    }
  });

  // Clear filters
  const clearFiltersBtn = document.getElementById("clear-filters-btn");
  clearFiltersBtn.addEventListener("click", () => {
    selectedCategory = "all";
    searchQuery = "";
    document.getElementById("navbar-search").value = "";
    maxPriceFilter = 8000;
    priceSlider.value = 8000;
    document.getElementById("price-max-label").innerText = formatPrice(8000);
    sortOption = "popularity";
    sortFilter.value = "popularity";
    updateSidebarCategories();
    if (window.location.hash === "#/products") {
      renderProducts();
    } else {
      window.location.hash = "#/products";
    }
    showToast("Filters cleared!", "success");
  });

  // Sticky add to cart scroll listener
  window.addEventListener("scroll", handleStickyCartBarScroll);

  // Mobile Sticky Bar CTA bindings
  document.getElementById("sticky-add-btn").addEventListener("click", () => {
    const hash = window.location.hash;
    if (hash.startsWith("#/product/")) {
      const prodId = hash.substring("#/product/".length);
      addToCart(prodId, 1);
    }
  });

  document.getElementById("sticky-buy-btn").addEventListener("click", () => {
    const hash = window.location.hash;
    if (hash.startsWith("#/product/")) {
      const prodId = hash.substring("#/product/".length);
      addToCart(prodId, 1);
      window.location.hash = "#/checkout";
    }
  });

  // Newsletter Footer Submit
  document.getElementById("footer-newsletter-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("footer-newsletter-email").value;
    showToast(`Thank you! ${email} has been subscribed to clay guides.`, "success");
    document.getElementById("footer-newsletter-email").value = "";
  });
}

// Sticky mobile cart visibility control
function handleStickyCartBarScroll() {
  const stickyBar = document.getElementById("sticky-mobile-cart-bar");
  const hash = window.location.hash;
  if (!hash.startsWith("#/product/")) {
    stickyBar.classList.remove("visible");
    return;
  }
  
  // Show only on scroll below product detail main section CTA
  const detailCta = document.querySelector(".detail-actions");
  if (detailCta) {
    const triggerOffset = detailCta.getBoundingClientRect().bottom + window.scrollY;
    if (window.scrollY > triggerOffset) {
      stickyBar.classList.add("visible");
    } else {
      stickyBar.classList.remove("visible");
    }
  } else {
    stickyBar.classList.remove("visible");
  }
}

// Format Price relative to currency
function formatPrice(valInPKR) {
  if (currentCurrency === "USD") {
    const usd = Math.round(valInPKR / EXCHANGE_RATE);
    return `$${usd}`;
  }
  return `₨${valInPKR.toLocaleString()}`;
}

// Format single values that were pre-defined in USD/PKR
function formatProductPrice(product) {
  if (currentCurrency === "USD") {
    return `$${product.priceUSD}`;
  }
  return `₨${product.pricePKR.toLocaleString()}`;
}

function formatProductOriginalPrice(product) {
  if (currentCurrency === "USD") {
    return `$${product.originalPriceUSD}`;
  }
  return `₨${product.originalPricePKR.toLocaleString()}`;
}

function updateNavbarState() {
  // Update cart count
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cart-count");
  badge.innerText = cartCount;
  
  // Animate badge
  badge.style.transform = "scale(1.3)";
  setTimeout(() => { badge.style.transform = "scale(1)"; }, 200);

  // Update wishlist count
  const wishlistCount = wishlist.length;
  const wishBadge = document.getElementById("wishlist-count");
  if (wishlistCount > 0) {
    wishBadge.innerText = wishlistCount;
    wishBadge.style.display = "flex";
  } else {
    wishBadge.style.display = "none";
  }

  // Update user auth state in navbar
  const authText = document.getElementById("nav-auth-text");
  const authBtn = document.getElementById("nav-auth-btn");
  if (currentUser) {
    authText.innerText = currentUser.name.split(" ")[0];
    authBtn.href = "#/profile";
  } else {
    authText.innerText = "Sign In";
    authBtn.href = "#/login";
  }
}

function updateSidebarCategories() {
  const sidebar = document.getElementById("sidebar-categories");
  const footerLinks = document.getElementById("footer-categories-links");
  const products = db.get("products") || [];
  
  // Calculate counts for categories
  const categoryCounts = {};
  categoryCounts["all"] = products.length;
  categoryCounts["new-arrivals"] = products.filter(p => p.isNewArrival).length;
  categoryCounts["best-sellers"] = products.filter(p => p.isBestSeller).length;

  DEFAULT_CATEGORIES.forEach(c => {
    if (c.id !== "all" && c.id !== "new-arrivals" && c.id !== "best-sellers") {
      categoryCounts[c.id] = products.filter(p => p.category === c.id).length;
    }
  });

  let html = "";
  let footerHtml = "";
  DEFAULT_CATEGORIES.forEach(cat => {
    const isActive = cat.id === selectedCategory ? "active" : "";
    html += `
      <li class="category-item">
        <a class="category-link ${isActive}" data-id="${cat.id}">
          <span>${cat.name}</span>
          <span class="count">${categoryCounts[cat.id] || 0}</span>
        </a>
      </li>
    `;
    
    // Add first 4 to footer
    if (cat.id !== "all" && cat.id !== "new-arrivals" && cat.id !== "best-sellers") {
      footerHtml += `<li><a href="#/products" onclick="selectCategoryAndNavigate('${cat.id}')">${cat.name}</a></li>`;
    }
  });
  
  sidebar.innerHTML = html;
  footerLinks.innerHTML = footerHtml;

  // Add click listeners to sidebar category selectors
  const links = sidebar.querySelectorAll(".category-link");
  links.forEach(l => {
    l.addEventListener("click", (e) => {
      e.preventDefault();
      selectedCategory = l.getAttribute("data-id");
      updateSidebarCategories();
      if (window.location.hash !== "#/products") {
        window.location.hash = "#/products";
      } else {
        renderProducts();
      }
    });
  });
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;
  container.appendChild(toast);
  
  // Slide out after 3 seconds
  setTimeout(() => {
    toast.style.animation = "toastSlide 0.3s reverse forwards";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// --- STATE MODIFIERS ---
function addToCart(productId, qty = 1) {
  const products = db.get("products") || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (product.stock === 0) {
    showToast("This masterpiece is currently out of stock!", "error");
    return;
  }

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    if (existing.qty + qty > product.stock) {
      showToast(`Cannot add more. Only ${product.stock} items are in stock.`, "error");
      return;
    }
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty, price: product.pricePKR });
  }

  db.set("cart", cart);
  updateNavbarState();
  showToast(`Added ${product.name} to your cart!`, "success");
  trackCartClick(productId);

  // Shake cart button animation
  const cartBtn = document.querySelector('a[href="#/cart"]');
  if (cartBtn) {
    cartBtn.classList.add('cart-shake');
    setTimeout(() => { cartBtn.classList.remove('cart-shake'); }, 400);
  }
}

function toggleWishlist(productId) {
  const idx = wishlist.indexOf(productId);
  const products = db.get("products") || [];
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast(`Removed ${product.name} from wishlist.`, "success");
  } else {
    wishlist.push(productId);
    showToast(`Added ${product.name} to wishlist!`, "success");
  }
  db.set("wishlist", wishlist);
  updateNavbarState();

  // Re-render product detail or wishlist if active
  if (window.location.hash.startsWith("#/product/")) {
    const currentId = window.location.hash.substring("#/product/".length);
    if (currentId === productId) renderProductDetail(productId);
  } else if (window.location.hash === "#/wishlist") {
    renderWishlist();
  } else if (window.location.hash === "#/products" || window.location.hash === "#/") {
    // Quick re-renders
    router();
  }
}

// --- ANALYTICS EVENTS ---
function trackPageView(hash) {
  const analytics = db.get("analytics") || DEFAULT_ANALYTICS;
  // If product page, track specific product view
  if (hash.startsWith("#/product/")) {
    const prodId = hash.substring("#/product/".length);
    analytics.productViews[prodId] = (analytics.productViews[prodId] || 0) + 1;
  }
  db.set("analytics", analytics);
}

function trackCartClick(prodId) {
  const analytics = db.get("analytics") || DEFAULT_ANALYTICS;
  analytics.productCartClicks[prodId] = (analytics.productCartClicks[prodId] || 0) + 1;
  db.set("analytics", analytics);
}

// --- RENDERING VIEWS ---

// VIEW: HOME PAGE
function renderHome() {
  const products = db.get("products") || [];
  const testimonials = db.get("testimonials") || [];
  
  // Get featured products
  const featured = products.filter(p => p.featured).slice(0, 4);

  let viewHtml = `
    <!-- Rotating Hero Slider -->
    <div class="hero-slider">
      <div class="hero-slide active" id="slide-0">
        <div class="hero-text">
          <span class="hero-tagline">Seasoned Earthenware</span>
          <h2 class="hero-title">Experience Organic Cooking</h2>
          <p class="hero-desc">Clay pots release natural minerals into your meals, balancing acidity and locks in moisture for premium flavor.</p>
          <a href="#/products" class="btn-primary">Browse Cookware</a>
        </div>
        <div class="hero-image-wrapper">
          <img src="banner_handi.jpg" alt="Clay Cookware Pot" class="hero-image">
        </div>
      </div>
      <div class="hero-slide" id="slide-1">
        <div class="hero-text">
          <span class="hero-tagline">100% Handcrafted</span>
          <h2 class="hero-title">Traditional Heritage Art</h2>
          <p class="hero-desc">Molded by generations of master potters, kiln-fired in rural villages, and finished with delicate hand-painted motifs.</p>
          <a href="#/products" class="btn-primary">Discover Decor</a>
        </div>
        <div class="hero-image-wrapper">
          <img src="banner_plates.jpg" alt="Traditional Painted Plates" class="hero-image">
        </div>
      </div>
      <div class="hero-slide" id="slide-2">
        <div class="hero-text">
          <span class="hero-tagline">Naturally Minerals</span>
          <h2 class="hero-title">Earthen Water Dispensers</h2>
          <p class="hero-desc">Naturally cool and alkaline drinking water, loaded with minerals. The natural refrigeration for warm summer days.</p>
          <a href="#/products" class="btn-primary">Shop Water Pitchers</a>
        </div>
        <div class="hero-image-wrapper">
          <img src="banner_cups.jpg" alt="Traditional Cups & Jugs" class="hero-image">
        </div>
      </div>

      <div class="slider-dots">
        <span class="slider-dot active" onclick="setSlide(0)"></span>
        <span class="slider-dot" onclick="setSlide(1)"></span>
        <span class="slider-dot" onclick="setSlide(2)"></span>
      </div>
    </div>

    <!-- Featured Products section -->
    <section class="scroll-reveal">
      <div class="section-header">
        <div>
          <h2 class="section-title">Best Sellers</h2>
          <p style="font-size:13px; color:rgba(92,58,33,0.6); margin-top:5px;">Handmade with organic clay, perfect for your kitchen & dining</p>
        </div>
        <a href="#/products" class="view-all-link">
          <span>View All Products</span>
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
        </a>
      </div>

      <div class="products-grid">
        ${featured.map(p => renderProductCard(p)).join("")}
      </div>
    </section>

    ${getTraditionalDivider()}

    <!-- Our Story Section -->
    <section class="our-story-section scroll-reveal">
      <div class="story-text">
        <span style="font-weight:700; color:var(--primary-color); text-transform:uppercase; font-size:12px; letter-spacing:1px;">Heritage & Legacy</span>
        <h3 style="margin-top:10px;">The Soul of Terracotta</h3>
        <p>At Mitti Ky Bartan, we are preserving the 5,000-year-old art of clay pottery. Each vessel is handmade on the potter's wheel using mud sourced from clean river basins, dry-sunned, and fired in traditional brick kilns.</p>
        <p>Unlike modern non-stick and aluminum cookware which leach toxic metals on heat, clayware is inert, porous, and neutralizes the acid level in food. It enhances food's natural flavors through gentle heat-circulation, restoring nutritional values.</p>
        <a href="#/faq" class="btn-primary" style="margin-top:10px;">Learn Clay Cookware Care</a>
      </div>
      <div class="story-image-container">
        <!-- SVG pottery spinner design for art feeling -->
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--primary-color)" stroke-width="0.8" stroke-dasharray="2 2" />
          <path d="M50 20 C 35 20, 25 35, 25 50 C 25 65, 35 80, 50 80 C 65 80, 75 65, 75 50 C 75 35, 65 20, 50 20 Z" fill="none" stroke="var(--primary-color)" stroke-width="1.5" />
          <path d="M50 30 C 40 30, 35 40, 35 50 C 35 60, 40 70, 50 70 C 60 70, 65 60, 65 50 C 65 40, 60 30, 50 30 Z" fill="var(--secondary-color)" opacity="0.6" stroke="var(--primary-color)" stroke-width="1" />
          <path d="M50 40 A 10 10 0 1 0 50 60 A 10 10 0 1 0 50 40 Z" fill="var(--primary-color)" />
        </svg>
      </div>
    </section>

    ${getTraditionalDivider()}

    <!-- Testimonial Section -->
    <section class="testimonials-section scroll-reveal">
      <h2 class="section-title" style="text-align:center; margin:0 auto 40px auto;">Earthen Hearts</h2>
      <div class="testimonials-grid">
        ${testimonials.map(t => `
          <div class="testimonial-card">
            <p class="testimonial-quote">"${t.text}"</p>
            <div class="testimonial-author">
              <div class="author-initials">${t.initials}</div>
              <div class="author-name">${t.author}</div>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;

  document.getElementById("app-view").innerHTML = viewHtml;

  // Start slider rotation
  initHeroSlider();
}

// Hero slider controller
let heroInterval;
let activeSlide = 0;
function initHeroSlider() {
  if (heroInterval) clearInterval(heroInterval);
  activeSlide = 0;
  heroInterval = setInterval(() => {
    setSlide((activeSlide + 1) % 3);
  }, 5000);
}

window.setSlide = function(index) {
  activeSlide = index;
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slider-dot");
  
  slides.forEach((s, idx) => {
    if (idx === index) s.classList.add("active");
    else s.classList.remove("active");
  });

  dots.forEach((d, idx) => {
    if (idx === index) d.classList.add("active");
    else d.classList.remove("active");
  });
};

// Generates individual product card template
function renderProductCard(product) {
  const isWishlisted = wishlist.includes(product.id) ? "active" : "";
  const savingPercent = product.originalPricePKR > product.pricePKR ? Math.round(((product.originalPricePKR - product.pricePKR) / product.originalPricePKR) * 100) : 0;
  
  // Format stock badge
  let stockBadge = "";
  if (product.stock === 0) stockBadge = `<span class="badge-status out-of-stock">Out of Stock</span>`;
  else if (product.stock <= 3) stockBadge = `<span class="badge-status low-stock">Only ${product.stock} left</span>`;
  else stockBadge = `<span class="badge-status" style="background-color:#27AE60;">In Stock</span>`;

  return `
    <div class="product-card pot-wobble">
      ${savingPercent > 0 ? `<span class="badge-discount">Save ${savingPercent}%</span>` : ""}
      ${stockBadge}
      
      <button class="wishlist-toggle ${isWishlisted}" onclick="toggleWishlist('${product.id}')" title="Add to Wishlist">
        <svg viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>

      <a href="#/product/${product.id}" class="card-img-container">
        <img src="${product.image}" class="card-img" alt="${product.name}">
      </a>

      <div class="card-info">
        <span class="card-category">${product.category}</span>
        <a href="#/product/${product.id}" class="card-name">${product.name}</a>
        
        <div class="rating-container">
          <span class="star-rating">★ ★ ★ ★ ★</span>
          <span>(${product.rating})</span>
        </div>

        <div class="card-pricing">
          <span class="price-current">${formatProductPrice(product)}</span>
          ${savingPercent > 0 ? `<span class="price-original">${formatProductOriginalPrice(product)}</span>` : ""}
        </div>

        <div class="card-actions">
          <a href="#/product/${product.id}" class="btn-card-view">Details</a>
          <button class="btn-card-cart" onclick="addToCart('${product.id}', 1)">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

// VIEW: PRODUCT LISTING PAGE (with instant filtering)
function renderProducts() {
  const products = db.get("products") || [];
  
  // Filter products
  let filtered = products;

  // Filter by category
  if (selectedCategory !== "all") {
    if (selectedCategory === "new-arrivals") {
      filtered = filtered.filter(p => p.isNewArrival);
    } else if (selectedCategory === "best-sellers") {
      filtered = filtered.filter(p => p.isBestSeller);
    } else {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
  }

  // Filter by price (converting maximum filter value to respect currency type if USD selected)
  filtered = filtered.filter(p => p.pricePKR <= maxPriceFilter);

  // Filter by search query
  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }

  // Sort
  if (sortOption === "price-low") {
    filtered.sort((a, b) => a.pricePKR - b.pricePKR);
  } else if (sortOption === "price-high") {
    filtered.sort((a, b) => b.pricePKR - a.pricePKR);
  } else if (sortOption === "newest") {
    filtered.sort((a, b) => b.isNewArrival - a.isNewArrival);
  } else {
    // default/popularity (stars rating)
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Render view
  let title = "Handcrafted Pottery Products";
  if (selectedCategory !== "all") {
    const catObj = DEFAULT_CATEGORIES.find(c => c.id === selectedCategory);
    if (catObj) title = catObj.name;
  }

  let html = `
    <div class="section-header">
      <div>
        <h2 class="section-title">${title}</h2>
        <p style="font-size:13px; color:rgba(92,58,33,0.6); margin-top:5px;">Showing ${filtered.length} organic clay items</p>
      </div>
    </div>

    ${filtered.length === 0 ? `
      <div style="text-align:center; padding:60px 20px; border:1px dashed var(--border-color); border-radius:12px;">
        <p>No pottery found matching your filters.</p>
        <button onclick="clearAllFiltersAndRender()" class="btn-primary" style="margin-top:15px;">Clear Filters</button>
      </div>
    ` : `
      <div class="products-grid">
        ${filtered.map(p => renderProductCard(p)).join("")}
      </div>
    `}
  `;

  document.getElementById("app-view").innerHTML = html;
}

// VIEW: PRODUCT DETAIL PAGE (with zoom, reviews, seasoning tips, and related items)
function renderProductDetail(id) {
  const products = db.get("products") || [];
  const product = products.find(p => p.id === id);
  if (!product) {
    window.location.hash = "#/";
    return;
  }

  // Update Recently Viewed (max 4 items)
  if (!recentlyViewed.includes(id)) {
    recentlyViewed.unshift(id);
    if (recentlyViewed.length > 4) recentlyViewed.pop();
    db.set("recently_viewed", recentlyViewed);
  }

  // Update breadcrumb
  const breadcrumb = document.getElementById("detail-breadcrumb");
  breadcrumb.style.display = "flex";
  breadcrumb.innerHTML = `
    <a href="#/">Home</a>
    <span>&gt;</span>
    <a href="#/products" onclick="selectCategoryAndNavigate('${product.category}')">${product.category}</a>
    <span>&gt;</span>
    <span style="color:var(--primary-color); font-weight:600;">${product.name}</span>
  `;

  // Get active reviews
  const reviewsDb = db.get("reviews") || {};
  const productReviews = reviewsDb[id] || [];

  // Related products (same category)
  const related = products.filter(p => p.category === product.category && p.id !== id).slice(0, 4);

  // Get savings percent badge
  const savingPercent = product.originalPricePKR > product.pricePKR ? Math.round(((product.originalPricePKR - product.pricePKR) / product.originalPricePKR) * 100) : 0;

  let detailHtml = `
    <div class="product-detail-container">
      
      <!-- Gallery Column -->
      <div class="gallery-container">
        <div class="gallery-thumbnails">
          ${product.images.map((img, idx) => `
            <div class="gallery-thumb ${idx === 0 ? "active" : ""}" onclick="changeDetailImage(this, '${img}')">
              <img src="${img}" alt="thumbnail">
            </div>
          `).join("")}
        </div>
        <div class="main-image-viewport" id="zoom-viewport" onmousemove="zoomImage(event)" onmouseleave="resetZoomImage()">
          <img src="${product.image}" id="main-detail-img" alt="${product.name}">
        </div>
      </div>

      <!-- Info Column -->
      <div class="detail-info">
        <span class="detail-category">${product.category}</span>
        <h2 class="detail-title">${product.name}</h2>
        
        <div class="detail-rating">
          <span class="star-rating" style="font-size: 18px;">★ ★ ★ ★ ★</span>
          <span style="font-weight:600;">${product.rating}</span>
          <span style="color:rgba(92,58,33,0.5);">(${product.stock > 0 ? "In Stock" : "Out of Stock"})</span>
        </div>

        <div class="detail-price-box">
          <span class="detail-price">${formatProductPrice(product)}</span>
          ${savingPercent > 0 ? `
            <span class="detail-price-original">${formatProductOriginalPrice(product)}</span>
            <span class="detail-savings">Save ${savingPercent}%</span>
          ` : ""}
        </div>

        <p class="detail-description">${product.description}</p>

        <ul class="detail-meta-list">
          <li><strong>Material:</strong> <span>${product.material}</span></li>
          <li><strong>Dimensions:</strong> <span>Standard Artisanal Mold</span></li>
          <li><strong>Lead-free:</strong> <span>Yes, certified organic clay</span></li>
          <li><strong>Stove-top safe:</strong> <span>Yes, on low/medium flame</span></li>
        </ul>

        <div class="detail-actions">
          <div class="qty-selector">
            <button class="qty-btn" onclick="adjustDetailQty(-1)">-</button>
            <span class="qty-val" id="detail-qty-label">1</span>
            <button class="qty-btn" onclick="adjustDetailQty(1)">+</button>
          </div>
          <button class="btn-detail-cart" onclick="addDetailToCart('${product.id}')">Add to Cart</button>
          <button class="btn-detail-buy" onclick="buyDetailNow('${product.id}')">Buy Now</button>
        </div>

        <!-- Trust Badges -->
        <div class="trust-badges">
          <div class="badge-item">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            <span>100% Organic Clay</span>
          </div>
          <div class="badge-item">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99z M13 16h-2v2h2v-2zm0-6h-2v4h2v-4z"/></svg>
            <span>Artisanal Crafted</span>
          </div>
          <div class="badge-item">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Tabs -->
    <div class="tabs-container">
      <div class="tabs-nav">
        <span class="tab-nav-item active" id="tab-nav-care" onclick="switchDetailTab('care')">Clay Seasoning & Care</span>
        <span class="tab-nav-item" id="tab-nav-reviews" onclick="switchDetailTab('reviews')">Reviews (${productReviews.length})</span>
      </div>

      <div class="tab-pane active" id="tab-care">
        <h4 style="font-size:16px; margin-bottom:12px;">How to Season Terracotta Pottery Before Cooking</h4>
        <ol class="seasoning-list">
          <li><strong>Step 1 (Soak):</strong> Completely submerge the clay pot in clean water for at least 8 to 12 hours. This saturates the porous clay structure.</li>
          <li><strong>Step 2 (Dry):</strong> Remove the pot and allow it to dry completely in the sun or dry room for 4-5 hours.</li>
          <li><strong>Step 3 (Oil Rub):</strong> Rub the inside and bottom of the pot with a thin coating of any edible oil (cooking oil/olive oil).</li>
          <li><strong>Step 4 (Low Heat):</strong> Fill the pot 3/4 with water and heat it on low flame for 15-20 minutes, then discard the water. Your pot is now naturally sealed and ready for cooking!</li>
        </ol>
        <div style="background-color:rgba(193, 89, 44, 0.1); border-left:4px solid var(--primary-color); padding:15px; border-radius:4px; font-size:13px; line-height:1.5;">
          <strong>Pro Tip:</strong> Earthen pots retain heat and continue cooking food even after the gas stove is switched off. Do not subject clay pots to drastic temperature changes (e.g., placing a hot pot on a cold granite surface).
        </div>
      </div>

      <div class="tab-pane" id="tab-reviews">
        <!-- Review Summary Grid -->
        <div class="reviews-summary">
          <div class="rating-score-box">
            <span class="score-num">${product.rating}</span>
            <div class="star-rating" style="margin: 10px 0;">★ ★ ★ ★ ★</div>
            <div style="font-size:12px; color:rgba(92,58,33,0.5);">Out of 5 stars</div>
          </div>
          <div class="rating-histogram">
            <div class="histogram-row">
              <span>5 Star</span>
              <div class="histogram-bar"><div class="histogram-fill" style="width: 85%;"></div></div>
              <span>85%</span>
            </div>
            <div class="histogram-row">
              <span>4 Star</span>
              <div class="histogram-bar"><div class="histogram-fill" style="width: 15%;"></div></div>
              <span>15%</span>
            </div>
            <div class="histogram-row">
              <span>3 Star</span>
              <div class="histogram-bar"><div class="histogram-fill" style="width: 0%;"></div></div>
              <span>0%</span>
            </div>
          </div>
        </div>

        <!-- Render Reviews List -->
        <div class="review-list">
          ${productReviews.length === 0 ? `<p>No reviews yet. Be the first to review this pottery!</p>` : productReviews.map(r => `
            <div class="review-item">
              <div class="review-header">
                <div class="review-meta">
                  <span class="star-rating">★ ★ ★ ★ ★</span>
                  <strong style="font-size:13px;">${r.name}</strong>
                  <span style="font-size:11px; background:#27AE60; color:white; padding:2px 6px; border-radius:10px;">Verified Purchaser</span>
                </div>
                <span class="review-date">${r.date}</span>
              </div>
              <p class="review-text">${r.comment}</p>
              ${r.images && r.images.length > 0 ? `
                <div class="review-images">
                  ${r.images.map(img => `<img src="${img}" class="review-img" onclick="openImageModal('${img}')">`).join("")}
                </div>
              ` : ""}
            </div>
          `).join("")}
        </div>

        <!-- Write a Review Form -->
        <div class="review-form">
          <h4>Share Your Experience</h4>
          <form id="add-review-form" onsubmit="handleReviewSubmit(event, '${product.id}')">
            <div class="form-grid">
              <div class="form-group">
                <label>Your Name</label>
                <input type="text" id="review-name" class="form-control" placeholder="Sarah M." required>
              </div>
              <div class="form-group">
                <label>Rating</label>
                <div class="rating-select" id="review-star-selector">
                  <span class="rating-star-btn selected" data-val="1">★</span>
                  <span class="rating-star-btn selected" data-val="2">★</span>
                  <span class="rating-star-btn selected" data-val="3">★</span>
                  <span class="rating-star-btn selected" data-val="4">★</span>
                  <span class="rating-star-btn selected" data-val="5">★</span>
                </div>
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label>Review details</label>
              <textarea id="review-comment" rows="4" class="form-control" placeholder="How did this product improve your kitchen/table?" required></textarea>
            </div>
            <div class="form-group" style="margin-bottom:20px;">
              <label>Upload Photo (Optional)</label>
              <div class="file-upload-btn" onclick="document.getElementById('review-file').click()">
                📷 Click to select or drop pottery photos
              </div>
              <input type="file" id="review-file" accept="image/*" style="display:none;" onchange="previewUploadedReviewImage(this)">
              <div id="review-file-preview" style="margin-top:10px; display:none;">
                <img src="" style="width:60px; height:60px; object-fit:cover; border-radius:8px; border:1.5px solid var(--primary-color);">
              </div>
            </div>
            <button type="submit" class="btn-primary">Post Review</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    ${related.length > 0 ? `
      <section style="margin-top: 80px;">
        <h2 class="section-title">You May Also Like</h2>
        <div class="products-grid" style="margin-top: 30px;">
          ${related.map(p => renderProductCard(p)).join("")}
        </div>
      </section>
    ` : ""}

    <!-- Recently Viewed Products -->
    ${renderRecentlyViewedSection(id)}
  `;

  document.getElementById("app-view").innerHTML = detailHtml;

  // Initialize Zoom and reviews listeners
  setupReviewFormStarActions();
  setupStickyAddToCartBar(product);
}

// Recently Viewed renderer
function renderRecentlyViewedSection(currentId) {
  const products = db.get("products") || [];
  const list = recentlyViewed.filter(id => id !== currentId).slice(0, 4);
  if (list.length === 0) return "";
  
  const matches = list.map(id => products.find(p => p.id === id)).filter(Boolean);
  if (matches.length === 0) return "";

  return `
    <section style="margin-top: 60px;">
      <h2 class="section-title">Recently Viewed</h2>
      <div class="products-grid" style="margin-top: 30px;">
        ${matches.map(p => renderProductCard(p)).join("")}
      </div>
    </section>
  `;
}

// Product detail actions
let activeDetailQty = 1;
window.adjustDetailQty = function(val) {
  activeDetailQty += val;
  if (activeDetailQty < 1) activeDetailQty = 1;
  document.getElementById("detail-qty-label").innerText = activeDetailQty;
};

window.addDetailToCart = function(id) {
  addToCart(id, activeDetailQty);
};

window.buyDetailNow = function(id) {
  addToCart(id, activeDetailQty);
  window.location.hash = "#/checkout";
};

window.changeDetailImage = function(el, src) {
  document.querySelectorAll(".gallery-thumb").forEach(t => t.classList.remove("active"));
  el.classList.add("active");
  document.getElementById("main-detail-img").src = src;
};

// Zoom image detail animation
window.zoomImage = function(event) {
  const img = document.getElementById("main-detail-img");
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  img.style.transformOrigin = `${x}% ${y}%`;
  img.style.transform = "scale(1.8)";
};

window.resetZoomImage = function() {
  const img = document.getElementById("main-detail-img");
  img.style.transform = "scale(1)";
};

// Tabs navigation switcher inside Detail Page
window.switchDetailTab = function(tabName) {
  document.querySelectorAll(".tab-nav-item").forEach(item => item.classList.remove("active"));
  document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));

  if (tabName === "care") {
    document.getElementById("tab-nav-care").classList.add("active");
    document.getElementById("tab-care").classList.add("active");
  } else {
    document.getElementById("tab-nav-reviews").classList.add("active");
    document.getElementById("tab-reviews").classList.add("active");
  }
};

// Dynamic stars rating selection in review form
let formReviewRating = 5;
function setupReviewFormStarActions() {
  const stars = document.querySelectorAll(".rating-star-btn");
  stars.forEach(s => {
    s.addEventListener("click", () => {
      formReviewRating = parseInt(s.getAttribute("data-val"));
      stars.forEach((other, idx) => {
        if (idx < formReviewRating) other.classList.add("selected");
        else other.classList.remove("selected");
      });
    });
  });
}

// Preview uploaded photo mock
let reviewUploadedBase64Image = "";
window.previewUploadedReviewImage = function(input) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      reviewUploadedBase64Image = e.target.result;
      const preview = document.getElementById("review-file-preview");
      preview.querySelector("img").src = reviewUploadedBase64Image;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
};

// Handle review submit
window.handleReviewSubmit = function(e, productId) {
  e.preventDefault();
  const name = document.getElementById("review-name").value;
  const comment = document.getElementById("review-comment").value;
  
  const reviewsDb = db.get("reviews") || {};
  if (!reviewsDb[productId]) reviewsDb[productId] = [];
  
  const newReview = {
    name: name,
    date: new Date().toISOString().split("T")[0],
    rating: formReviewRating,
    comment: comment,
    images: reviewUploadedBase64Image ? [reviewUploadedBase64Image] : [],
    approved: false // Needs Admin Approval
  };

  // Prepend to database
  reviewsDb[productId].unshift(newReview);
  db.set("reviews", reviewsDb);

  // Clear inputs
  document.getElementById("review-name").value = "";
  document.getElementById("review-comment").value = "";
  reviewUploadedBase64Image = "";
  document.getElementById("review-file-preview").style.display = "none";

  showToast("Your review has been submitted and is awaiting approval by admin!", "success");
};

// Setup mobile sticky bar values
function setupStickyAddToCartBar(product) {
  document.getElementById("sticky-product-name").innerText = product.name;
  document.getElementById("sticky-product-price").innerText = formatProductPrice(product);
}

// VIEW: WISHLIST / FAVORITES PAGE
function renderWishlist() {
  const products = db.get("products") || [];
  const filtered = products.filter(p => wishlist.includes(p.id));

  let html = `
    <div class="section-header">
      <h2 class="section-title">My Wishlist</h2>
    </div>

    ${filtered.length === 0 ? `
      <div style="text-align:center; padding:80px 20px;">
        <svg viewBox="0 0 24 24" style="width:64px; fill:rgba(92,58,33,0.15); margin-bottom:20px;">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <p>No favorites saved yet. Browse items and heart them!</p>
        <a href="#/products" class="btn-primary" style="margin-top:20px; display:inline-block;">Explore Traditional Pottery</a>
      </div>
    ` : `
      <div class="products-grid">
        ${filtered.map(p => renderProductCard(p)).join("")}
      </div>
    `}
  `;

  document.getElementById("app-view").innerHTML = html;
}

// VIEW: CART PAGE
function renderCart() {
  const products = db.get("products") || [];
  
  if (cart.length === 0) {
    document.getElementById("app-view").innerHTML = `
      <div style="text-align:center; padding:100px 20px;">
        <svg viewBox="0 0 24 24" style="width:64px; fill:rgba(92,58,33,0.15); margin-bottom:20px;">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.9 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
        <h2 style="font-size:24px; margin-bottom:15px;">Your Cart is Empty</h2>
        <p>No pottery found inside your shopping basket.</p>
        <a href="#/products" class="btn-primary" style="margin-top:20px; display:inline-block;">Shop Traditional Pottery</a>
      </div>
    `;
    return;
  }

  // Map cart items to full products
  const cartItems = cart.map(item => {
    const prod = products.find(p => p.id === item.id);
    return { ...prod, qty: item.qty };
  }).filter(item => item !== undefined);

  // Totals calculations in PKR
  const subtotalPKR = cartItems.reduce((sum, item) => sum + (item.pricePKR * item.qty), 0);
  const shippingPKR = subtotalPKR > 4000 ? 0 : 250; // free shipping over 4000
  const promoDiscountPKR = db.get("active_discount") || 0; // percentage or fixed
  const discountValPKR = Math.round(subtotalPKR * (promoDiscountPKR / 100));
  const totalPKR = subtotalPKR + shippingPKR - discountValPKR;

  let html = `
    <div class="section-header">
      <h2 class="section-title">My Pottery Basket</h2>
    </div>

    <div class="cart-layout">
      <!-- Item Table -->
      <div class="cart-table-container">
        <table class="cart-table">
          <thead>
            <tr>
              <th>Artisanal Vessel</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${cartItems.map(item => `
              <tr>
                <td>
                  <div class="cart-item-info">
                    <div class="cart-item-img">
                      <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-meta">
                      <h5>${item.name}</h5>
                      <span>${item.category}</span>
                    </div>
                  </div>
                </td>
                <td>${formatPrice(item.pricePKR)}</td>
                <td>
                  <div class="cart-qty">
                    <button class="qty-btn" onclick="adjustCartQty('${item.id}', -1)">-</button>
                    <span class="qty-val">${item.qty}</span>
                    <button class="qty-btn" onclick="adjustCartQty('${item.id}', 1)">+</button>
                  </div>
                </td>
                <td>${formatPrice(item.pricePKR * item.qty)}</td>
                <td>
                  <button class="btn-remove-item" onclick="removeCartItem('${item.id}')">
                    <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                  </button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- Checkout Summary Column -->
      <div>
        <div class="checkout-summary-box">
          <h3>Summary</h3>
          
          <div class="summary-row">
            <span>Subtotal</span>
            <strong>${formatPrice(subtotalPKR)}</strong>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <strong>${shippingPKR === 0 ? "Free" : formatPrice(shippingPKR)}</strong>
          </div>
          ${discountValPKR > 0 ? `
            <div class="summary-row" style="color:#27AE60;">
              <span>Promo Discount (${promoDiscountPKR}%)</span>
              <strong>-${formatPrice(discountValPKR)}</strong>
            </div>
          ` : ""}

          <div class="promo-container">
            <input type="text" id="promo-code" class="form-control" style="font-size:12px; padding:8px 12px;" placeholder="CLAY10">
            <button class="btn-primary" onclick="applyPromoCode()" style="padding: 8px 15px; font-size:12px; border-radius: var(--border-radius-sm);">Apply</button>
          </div>

          <div class="summary-row total">
            <span>Total</span>
            <strong>${formatPrice(totalPKR)}</strong>
          </div>

          <a href="#/checkout" class="btn-primary checkout-btn">Proceed to Checkout</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById("app-view").innerHTML = html;
}

window.adjustCartQty = function(id, val) {
  const products = db.get("products") || [];
  const prod = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  
  if (existing && prod) {
    if (existing.qty + val > prod.stock) {
      showToast(`We only have ${prod.stock} items in stock.`, "error");
      return;
    }
    existing.qty += val;
    if (existing.qty < 1) existing.qty = 1;
    
    db.set("cart", cart);
    updateNavbarState();
    renderCart();
  }
};

window.removeCartItem = function(id) {
  cart = cart.filter(item => item.id !== id);
  db.set("cart", cart);
  updateNavbarState();
  renderCart();
  showToast("Removed item from cart.", "success");
};

window.applyPromoCode = function() {
  const code = document.getElementById("promo-code").value.trim().toUpperCase();
  if (code === "CLAY10") {
    db.set("active_discount", 10); // 10% off
    showToast("Promo Code CLAY10 Applied! 10% off your clay pottery.", "success");
    renderCart();
  } else {
    showToast("Invalid Promo Code. Try CLAY10", "error");
  }
};

// VIEW: CHECKOUT PAGE
function renderCheckout() {
  if (cart.length === 0) {
    window.location.hash = "#/cart";
    return;
  }

  const products = db.get("products") || [];
  const cartItems = cart.map(item => {
    const prod = products.find(p => p.id === item.id);
    return { ...prod, qty: item.qty };
  });

  const subtotalPKR = cartItems.reduce((sum, item) => sum + (item.pricePKR * item.qty), 0);
  const shippingPKR = subtotalPKR > 4000 ? 0 : 250;
  const promoDiscount = db.get("active_discount") || 0;
  const discountValPKR = Math.round(subtotalPKR * (promoDiscount / 100));
  const totalPKR = subtotalPKR + shippingPKR - discountValPKR;

  // Selected payment method state
  let selectedPayment = "JazzCash"; // default local
  if (currentCurrency === "USD") selectedPayment = "Card (Stripe)";

  let html = `
    <div class="section-header">
      <h2 class="section-title">Pottery Checkout</h2>
    </div>

    <div class="checkout-grid">
      <!-- Checkout Billing & Shipping Form -->
      <div>
        <form id="checkout-main-form" onsubmit="handlePlaceOrder(event, ${totalPKR}, '${selectedPayment}')">
          <h3 class="checkout-step-title">1. Shipping Address</h3>
          
          <div class="form-grid">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" class="form-control" value="${currentUser ? currentUser.name : ''}" required>
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input type="text" class="form-control" value="${currentUser ? currentUser.phone || '' : ''}" placeholder="+92 300 1234567" required>
            </div>
          </div>

          <div class="form-group" style="position:relative; margin-bottom:20px;">
            <label>Shipping Address</label>
            <input type="text" id="checkout-address" class="form-control" value="${currentUser ? currentUser.address || '' : ''}" placeholder="Street address, apartment, locality" oninput="autocompleteAddress(this)" required>
            <div id="address-suggestions" class="autocomplete-suggestions" style="display:none;"></div>
          </div>

          <div class="form-grid" style="margin-bottom:30px;">
            <div class="form-group">
              <label>City</label>
              <input type="text" class="form-control" placeholder="Lahore / Islamabad / Karachi" required>
            </div>
            <div class="form-group">
              <label>Postal Code</label>
              <input type="text" class="form-control" required>
            </div>
          </div>

          <h3 class="checkout-step-title">2. Payment Method</h3>
          <div class="payment-method-selector">
            ${currentCurrency === "PKR" ? `
              <div class="payment-method-btn active" data-method="JazzCash" onclick="setCheckoutPayment('JazzCash')">
                <svg viewBox="0 0 24 24"><rect width="18" height="12" x="3" y="6" rx="2"/><path d="M7 10h10M7 14h5"/></svg>
                <span class="payment-method-title">JazzCash</span>
              </div>
              <div class="payment-method-btn" data-method="Easypaisa" onclick="setCheckoutPayment('Easypaisa')">
                <svg viewBox="0 0 24 24"><rect width="18" height="12" x="3" y="6" rx="2"/><circle cx="12" cy="12" r="2"/></svg>
                <span class="payment-method-title">Easypaisa</span>
              </div>
              <div class="payment-method-btn" data-method="Cash on Delivery" onclick="setCheckoutPayment('Cash on Delivery')">
                <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2zm0-4h-2V7h2z"/></svg>
                <span class="payment-method-title">Cash on Delivery (COD)</span>
              </div>
              <div class="payment-method-btn" data-method="Stripe / Card" onclick="setCheckoutPayment('Stripe / Card')">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                <span class="payment-method-title">Credit Card / GPay</span>
              </div>
            ` : `
              <div class="payment-method-btn active" data-method="Stripe (Card)" onclick="setCheckoutPayment('Stripe (Card)')">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                <span class="payment-method-title">Credit Card (Stripe)</span>
              </div>
              <div class="payment-method-btn" data-method="PayPal" onclick="setCheckoutPayment('PayPal')">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
                <span class="payment-method-title">PayPal Checkout</span>
              </div>
              <div class="payment-method-btn" data-method="UPI" onclick="setCheckoutPayment('UPI')">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                <span class="payment-method-title">UPI Pay (India)</span>
              </div>
            `}
          </div>

          <!-- Dynamic secure integration simulation fields -->
          <div id="checkout-secure-payment-fields" style="background:#F8F6F2; padding:20px; border-radius:12px; margin-bottom:30px; border:1px solid var(--border-color);">
            <!-- Populated dynamically -->
          </div>

          <button type="submit" class="btn-primary checkout-btn" style="padding:15px; font-size:16px;">Place Artisanal Order</button>
        </form>
      </div>

      <!-- Checkout Summary Column -->
      <div>
        <div class="checkout-summary-box">
          <h3>Order Review</h3>
          
          <div style="max-height: 250px; overflow-y:auto; margin-bottom:20px;">
            ${cartItems.map(item => `
              <div class="summary-row" style="margin-bottom:10px; font-size:13px;">
                <span>${item.name} <span style="color:var(--primary-color);">x${item.qty}</span></span>
                <strong>${formatPrice(item.pricePKR * item.qty)}</strong>
              </div>
            `).join("")}
          </div>

          <div class="summary-row" style="border-top:1px solid var(--border-color); padding-top:15px;">
            <span>Subtotal</span>
            <strong>${formatPrice(subtotalPKR)}</strong>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <strong>${shippingPKR === 0 ? "Free" : formatPrice(shippingPKR)}</strong>
          </div>
          ${discountValPKR > 0 ? `
            <div class="summary-row" style="color:#27AE60;">
              <span>Discount</span>
              <strong>-${formatPrice(discountValPKR)}</strong>
            </div>
          ` : ""}

          <div class="summary-row total">
            <span>Grand Total</span>
            <strong>${formatPrice(totalPKR)}</strong>
          </div>

          <div style="margin-top:20px; background:rgba(92,58,33,0.04); border-radius:8px; padding:12px; font-size:11px; display:flex; gap:10px;">
            <svg viewBox="0 0 24 24" style="width:24px; fill:var(--primary-color); flex-shrink:0;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            <span>Note: Clay vessels are packed in multiple layers of organic bubble wrap & thick craft carton blocks to prevent cracks during delivery.</span>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("app-view").innerHTML = html;
  
  // Set default fields
  setCheckoutPayment(selectedPayment);
}

// Mock Autocomplete addresses for Pakistan/India regions
const ADDRESS_SUGGESTIONS = [
  "DHA Phase 6, Lahore, Pakistan",
  "Sector F-8/2, Islamabad, Pakistan",
  "Clifton Block 5, Karachi, Pakistan",
  "Connaught Place, New Delhi, India",
  "Bandra West, Mumbai, India",
  "Gulberg III, Lahore, Pakistan",
  "DHA Phase 5, Karachi, Pakistan",
  "F-6 Markaz, Islamabad, Pakistan"
];

window.autocompleteAddress = function(input) {
  const val = input.value.toLowerCase();
  const suggestionsBox = document.getElementById("address-suggestions");
  if (val.length < 2) {
    suggestionsBox.style.display = "none";
    return;
  }
  
  const matches = ADDRESS_SUGGESTIONS.filter(addr => addr.toLowerCase().includes(val));
  if (matches.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  suggestionsBox.innerHTML = matches.map(match => `
    <div class="suggestion-item" onclick="selectCheckoutAddress('${match}')">${match}</div>
  `).join("");
  suggestionsBox.style.display = "block";
};

window.selectCheckoutAddress = function(address) {
  document.getElementById("checkout-address").value = address;
  document.getElementById("address-suggestions").style.display = "none";
};

// Set active payment fields simulation
window.setCheckoutPayment = function(method) {
  selectedPayment = method;
  // Update class active
  document.querySelectorAll(".payment-method-btn").forEach(btn => {
    if (btn.getAttribute("data-method") === method) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  const paymentBox = document.getElementById("checkout-secure-payment-fields");
  
  if (method === "JazzCash" || method === "Easypaisa") {
    paymentBox.innerHTML = `
      <h5 style="margin-bottom:10px; font-size:14px; font-weight:700;">Secure Mobile Wallet (PKR)</h5>
      <p style="font-size:11px; margin-bottom:12px; color:rgba(92,58,33,0.6);">You will receive a USSD push request or an OTP on your mobile to authorize.</p>
      <div class="form-group">
        <label style="font-size:12px;">Enter Mobile Account Number</label>
        <input type="text" class="form-control" placeholder="e.g. 03001234567" required>
      </div>
    `;
  } else if (method === "UPI") {
    paymentBox.innerHTML = `
      <h5 style="margin-bottom:10px; font-size:14px; font-weight:700;">Unified Payments Interface (India)</h5>
      <div class="form-group">
        <label style="font-size:12px;">Enter UPI Virtual Address (VPA)</label>
        <input type="text" class="form-control" placeholder="e.g. name@okhdfcbank" required>
      </div>
    `;
  } else if (method === "Cash on Delivery") {
    paymentBox.innerHTML = `
      <h5 style="margin-bottom:5px; font-size:14px; font-weight:700;">Cash on Delivery</h5>
      <p style="font-size:12px; color:rgba(92,58,33,0.7);">Pay with cash at your doorstep when the delivery partner delivers your pottery.</p>
    `;
  } else {
    // Stripe/PayPal Credit Card hosted secure elements simulation
    paymentBox.innerHTML = `
      <h5 style="margin-bottom:10px; font-size:14px; font-weight:700; display:flex; justify-content:space-between; align-items:center;">
        <span>Stripe Hosted Elements</span>
        <span style="font-size:10px; padding:2px 8px; border-radius:10px; background:#27AE60; color:white;">PCI-DSS Secure</span>
      </h5>
      <p style="font-size:11px; margin-bottom:12px; color:rgba(92,58,33,0.6);">Your card details are sent directly to payment gateways. We never save raw card numbers.</p>
      <div class="form-group" style="margin-bottom:12px;">
        <label style="font-size:11px;">Card Number</label>
        <input type="text" class="form-control" placeholder="4242 4242 4242 4242" required>
      </div>
      <div class="form-grid">
        <div class="form-group">
          <label style="font-size:11px;">Expiry Date</label>
          <input type="text" class="form-control" placeholder="MM/YY" required>
        </div>
        <div class="form-group">
          <label style="font-size:11px;">CVC / CVV</label>
          <input type="password" class="form-control" placeholder="123" required>
        </div>
      </div>
    `;
  }
}

// Handle Place Order & Mock Receipt Generation
window.handlePlaceOrder = function(e, grandTotal, paymentType) {
  e.preventDefault();
  
  const products = db.get("products") || [];
  
  // Deduct stock and clear cart
  const orderedItems = cart.map(item => {
    const prod = products.find(p => p.id === item.id);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.qty);
    }
    return { id: item.id, name: prod.name, qty: item.qty, price: prod.pricePKR };
  });

  db.set("products", products);

  // Generate unique order ID
  const orderId = "ORD-" + Math.floor(10000 + Math.random() * 90000);
  const addressVal = document.getElementById("checkout-address").value;
  
  const newOrder = {
    id: orderId,
    userId: currentUser ? currentUser.id : "guest-user",
    date: new Date().toISOString().split("T")[0],
    items: orderedItems,
    subtotal: grandTotal - (grandTotal > 4000 ? 0 : 250),
    shipping: grandTotal > 4000 ? 0 : 250,
    total: grandTotal,
    currency: currentCurrency,
    status: "processing",
    address: addressVal,
    paymentMethod: selectedPayment,
    trackingSteps: [
      { step: "Order Placed", date: new Date().toLocaleString(), done: true },
      { step: "Processing", date: new Date().toLocaleString(), done: true },
      { step: "Shipped", date: "", done: false },
      { step: "Delivered", date: "", done: false }
    ]
  };

  // Prepend to orders
  const orders = db.get("orders") || [];
  orders.unshift(newOrder);
  db.set("orders", orders);

  // Track analytics purchase completions
  const analytics = db.get("analytics") || DEFAULT_ANALYTICS;
  analytics.checkoutCompletions += 1;
  // Update today's revenue in charts
  const todayChart = analytics.dailySales[analytics.dailySales.length - 1];
  todayChart.revenue += grandTotal;
  todayChart.orders += 1;
  db.set("analytics", analytics);

  // Clear Cart
  cart = [];
  db.set("cart", cart);
  updateNavbarState();

  // Show Order Confirmation View
  renderOrderConfirmation(newOrder);
};

// VIEW: ORDER CONFIRMATION PAGE
function renderOrderConfirmation(order) {
  let html = `
    <div style="text-align:center; padding:60px 20px; max-width:600px; margin:0 auto;">
      <svg viewBox="0 0 24 24" style="width:64px; fill:#27AE60; margin-bottom:20px;">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <h2 style="font-size:32px; margin-bottom:10px;">Order Placed successfully!</h2>
      <p style="color:rgba(92,58,33,0.7); font-size:14px;">Thank you for supporting heritage clay pottery. Your order ID is <strong>${order.id}</strong>.</p>
      
      <div style="background:var(--secondary-color); border-radius:12px; padding:25px; margin:30px 0; text-align:left; border:1.5px solid var(--border-color);">
        <h4 style="margin-bottom:15px; border-bottom:1px solid var(--border-color); padding-bottom:5px;">Order Summary</h4>
        ${order.items.map(item => `
          <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:8px;">
            <span>${item.name} (x${item.qty})</span>
            <strong>${formatPrice(item.price * item.qty)}</strong>
          </div>
        `).join("")}
        <div style="display:flex; justify-content:space-between; border-top:1.5px solid var(--border-color); padding-top:10px; margin-top:10px; font-weight:700; font-size:15px;">
          <span>Total Paid</span>
          <span style="color:var(--primary-color);">${formatPrice(order.total)}</span>
        </div>
      </div>

      <div style="display:flex; gap:15px; justify-content:center;">
        <button onclick="downloadOrderInvoice('${order.id}')" class="btn-primary" style="background:#5C3A21;">Download Invoice PDF</button>
        <a href="#/" class="btn-primary">Continue Shopping</a>
      </div>
    </div>
  `;
  document.getElementById("app-view").innerHTML = html;
}

// Download dynamic mock PDF Invoice using data URIs / Print Layout
window.downloadOrderInvoice = function(orderId) {
  const orders = db.get("orders") || [];
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const invoiceHTML = `
    <html>
    <head>
      <title>Invoice - ${order.id}</title>
      <style>
        body { font-family: sans-serif; color: #333; padding: 40px; }
        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #5C3A21; padding-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; color: #C1592C; }
        .summary { margin: 30px 0; width: 100%; border-collapse: collapse; }
        .summary th, .summary td { padding: 10px; border-bottom: 1px solid #ddd; text-align: left; }
        .total { font-weight: bold; font-size: 16px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="logo">Mitti Ky Bartan</div>
          <div>Handcrafted Pottery</div>
          <div>support@mittikybartan.com</div>
        </div>
        <div style="text-align: right;">
          <h2>INVOICE</h2>
          <div>Order ID: ${order.id}</div>
          <div>Date: ${order.date}</div>
          <div>Payment: ${order.paymentMethod}</div>
        </div>
      </div>
      
      <div style="margin: 30px 0;">
        <strong>Deliver To:</strong><br>
        Address: ${order.address}<br>
      </div>

      <table class="summary">
        <thead>
          <tr>
            <th>Item Details</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td>${item.name}</td>
              <td>${item.qty}</td>
              <td>${formatPrice(item.price)}</td>
              <td>${formatPrice(item.price * item.qty)}</td>
            </tr>
          `).join("")}
          <tr class="total">
            <td colspan="3" style="text-align:right;">Subtotal:</td>
            <td>${formatPrice(order.subtotal)}</td>
          </tr>
          <tr class="total">
            <td colspan="3" style="text-align:right;">Shipping:</td>
            <td>${formatPrice(order.shipping)}</td>
          </tr>
          <tr class="total">
            <td colspan="3" style="text-align:right; color:#C1592C;">Grand Total:</td>
            <td style="color:#C1592C;">${formatPrice(order.total)}</td>
          </tr>
        </tbody>
      </table>

      <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #777;">
        Thank you for preserving cultural heritage craftsmanship!
      </div>
    </body>
    </html>
  `;

  const win = window.open("", "_blank");
  win.document.write(invoiceHTML);
  win.document.close();
  setTimeout(() => {
    win.print();
  }, 500);
};

// VIEW: WISHLIST VIEW (Wrapper for Router)
// (Redirects to renderWishlist function logic)

// VIEW: AUTHENTICATION (Login / Registration)
function renderLogin() {
  let html = `
    <div class="auth-container">
      <div class="auth-header">
        <h2>Welcome Back</h2>
        <p style="font-size:12px; color:rgba(92,58,33,0.6);">Log in to track your pottery delivery</p>
      </div>

      <div class="social-login-grid">
        <button class="social-btn" onclick="handleSocialAuth('Google')">
          <svg viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99c.9-2.7 3.42-4.51 6.76-4.51z"/><path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.57h6.48c-.28 1.48-1.12 2.74-2.38 3.59l3.7 2.87c2.16-1.99 3.69-4.91 3.69-8.69z"/><path fill="#FBBC05" d="M5.24 14.75A7.16 7.16 0 0 1 4.8 12c0-.97.16-1.91.44-2.79L1.39 6.22A11.95 11.95 0 0 0 0 12c0 2.12.38 4.15 1.07 6.03l4.17-3.28z"/><path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.12.75-2.54 1.2-4.26 1.2-3.34 0-5.86-1.81-6.76-4.51l-3.85 2.99C3.37 20.33 7.35 23 12 23z"/></svg>
          <span>Google</span>
        </button>
        <button class="social-btn" onclick="handleSocialAuth('Facebook')">
          <svg viewBox="0 0 24 24" fill="#3B5998"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>
          <span>Facebook</span>
        </button>
      </div>

      <div class="divider">Or Email Log In</div>

      <form onsubmit="handleEmailAuth(event, 'login')">
        <div class="form-group" style="margin-bottom:15px;">
          <label>Email Address</label>
          <input type="email" id="auth-email" class="form-control" placeholder="customer@gmail.com" required>
        </div>
        <div class="form-group" style="margin-bottom:15px;">
          <label>Password</label>
          <input type="password" id="auth-password" class="form-control" placeholder="password123" required>
        </div>
        
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; margin-bottom:20px;">
          <label style="display:flex; gap:6px; cursor:pointer;"><input type="checkbox"> Remember me</label>
          <a onclick="forgotPassword()" style="color:var(--primary-color); cursor:pointer;">Forgot Password?</a>
        </div>

        <button type="submit" class="btn-primary" style="width: 100%;">Sign In</button>
      </form>

      <p style="font-size:13px; text-align:center; margin-top:20px;">
        Don't have an account? <a onclick="toggleAuthForm('signup')" style="color:var(--primary-color); cursor:pointer; font-weight:600;">Create Account</a>
      </p>
    </div>
  `;
  document.getElementById("app-view").innerHTML = html;
}

// Change login view to signup view
window.toggleAuthForm = function(type) {
  const container = document.querySelector(".auth-container");
  if (type === "signup") {
    container.innerHTML = `
      <div class="auth-header">
        <h2>Create Account</h2>
        <p style="font-size:12px; color:rgba(92,58,33,0.6);">Join the heritage traditional movement</p>
      </div>

      <form onsubmit="handleEmailAuth(event, 'signup')">
        <div class="form-group" style="margin-bottom:15px;">
          <label>Full Name</label>
          <input type="text" id="auth-name" class="form-control" placeholder="Sara Malik" required>
        </div>
        <div class="form-group" style="margin-bottom:15px;">
          <label>Email Address</label>
          <input type="email" id="auth-email" class="form-control" placeholder="sara@example.com" required>
        </div>
        <div class="form-group" style="margin-bottom:15px;">
          <label>Password</label>
          <input type="password" id="auth-password" class="form-control" placeholder="Create robust password" required>
        </div>

        <button type="submit" class="btn-primary" style="width: 100%; margin-top:10px;">Register Account</button>
      </form>

      <p style="font-size:13px; text-align:center; margin-top:20px;">
        Already have an account? <a onclick="renderLogin()" style="color:var(--primary-color); cursor:pointer; font-weight:600;">Sign In</a>
      </p>
    `;
  }
};

window.handleSocialAuth = function(provider) {
  // Simulate social login integration redirects/auth
  const users = db.get("users") || [];
  const customer = users.find(u => u.role === "customer");
  currentUser = customer;
  db.set("current_user", currentUser);
  updateNavbarState();
  showToast(`Successfully logged in using ${provider}! Welcome ${currentUser.name}.`, "success");
  window.location.hash = "#/";
};

window.handleEmailAuth = function(e, action) {
  e.preventDefault();
  const email = document.getElementById("auth-email").value;
  const password = document.getElementById("auth-password").value;
  const users = db.get("users") || [];

  if (action === "login") {
    // Authenticate
    const matched = users.find(u => u.email === email && u.password === password);
    if (matched) {
      currentUser = matched;
      db.set("current_user", currentUser);
      updateNavbarState();
      showToast(`Welcome back, ${matched.name}!`, "success");
      
      // Redirect based on role
      if (matched.role === "admin") {
        window.location.hash = "#/admin";
      } else {
        window.location.hash = "#/";
      }
    } else {
      showToast("Invalid credentials. Try customer@gmail.com / password123 or admin@mittikybartan.com / admin123", "error");
    }
  } else {
    // Register
    const name = document.getElementById("auth-name").value;
    const exists = users.some(u => u.email === email);
    if (exists) {
      showToast("Email already registered.", "error");
      return;
    }
    
    const newUser = {
      id: "cust-" + (users.length + 1),
      email: email,
      name: name,
      password: password,
      role: "customer"
    };
    users.push(newUser);
    db.set("users", users);
    
    currentUser = newUser;
    db.set("current_user", currentUser);
    updateNavbarState();
    
    showToast("Registration successful!", "success");
    window.location.hash = "#/";
  }
};

window.forgotPassword = function() {
  const email = prompt("Enter your registered email address to reset password:");
  if (email) {
    showToast(`Password recovery link has been dispatched to ${email}.`, "success");
  }
};

// VIEW: USER ACCOUNT / PROFILE
let activeProfileTab = "orders";
function renderProfile() {
  if (!currentUser) {
    window.location.hash = "#/login";
    return;
  }

  const allOrders = db.get("orders") || [];
  const userOrders = allOrders.filter(o => o.userId === currentUser.id);

  let html = `
    <div class="section-header">
      <h2 class="section-title">My Account</h2>
      <button class="btn-card-view" onclick="handleLogout()" style="border:1.5px solid var(--border-color); cursor:pointer;">Log Out</button>
    </div>

    <div class="profile-container">
      <!-- Profile Navigation Tabs -->
      <ul class="profile-tabs">
        <li class="profile-tab-item ${activeProfileTab === "orders" ? "active" : ""}" onclick="switchProfileTab('orders')">Orders History</li>
        <li class="profile-tab-item ${activeProfileTab === "address" ? "active" : ""}" onclick="switchProfileTab('address')">Saved Addresses</li>
        <li class="profile-tab-item ${activeProfileTab === "payments" ? "active" : ""}" onclick="switchProfileTab('payments')">Payment Methods</li>
      </ul>

      <!-- Tabs Contents -->
      <div>
        <div class="profile-pane ${activeProfileTab === "orders" ? "active" : ""}" id="profile-pane-orders" style="display:${activeProfileTab === 'orders' ? 'block' : 'none'};">
          <h3>Orders Tracking</h3>
          
          ${userOrders.length === 0 ? `<p style="margin-top:20px;">You haven't ordered any clay pottery yet.</p>` : userOrders.map(o => `
            <div class="order-card">
              <div class="order-header">
                <span>Order ID: ${o.id}</span>
                <span>Date: ${o.date}</span>
                <span class="status-indicator ${o.status}">${o.status.toUpperCase()}</span>
              </div>
              <div class="order-body">
                <div style="margin-bottom:15px;">
                  ${o.items.map(item => `
                    <div style="font-size:13px; display:flex; justify-content:space-between; margin-bottom:5px;">
                      <span>${item.name} <strong>x${item.qty}</strong></span>
                      <strong>${formatPrice(item.price * item.qty)}</strong>
                    </div>
                  `).join("")}
                </div>
                <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:10px;">
                  <span>Grand Total</span>
                  <span style="color:var(--primary-color);">${formatPrice(o.total)}</span>
                </div>

                <!-- Shipping Status tracking elements -->
                <div class="order-tracking-steps">
                  <div class="tracking-step active">
                    <div class="step-bubble"><svg viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg></div>
                    <span class="step-label">Order Placed</span>
                  </div>
                  <div class="tracking-step ${o.status === "processing" || o.status === "shipped" || o.status === "delivered" ? "active" : ""}">
                    <div class="step-bubble"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg></div>
                    <span class="step-label">Processing</span>
                  </div>
                  <div class="tracking-step ${o.status === "shipped" || o.status === "delivered" ? "active" : ""}">
                    <div class="step-bubble"><svg viewBox="0 0 24 24"><path d="M20 8h-3V4H3v12h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-3.5 10.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-9 0C6.67 18 6 17.33 6 16.5S6.67 15 7.5 15s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg></div>
                    <span class="step-label">Shipped</span>
                  </div>
                  <div class="tracking-step ${o.status === "delivered" ? "active" : ""}">
                    <div class="step-bubble"><svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>
                    <span class="step-label">Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>

        <div class="profile-pane ${activeProfileTab === "address" ? "active" : ""}" id="profile-pane-address" style="display:${activeProfileTab === 'address' ? 'block' : 'none'};">
          <h3>Saved Delivery Address</h3>
          <div style="background:white; border:1.5px solid var(--border-color); border-radius:12px; padding:25px; margin-top:20px;">
            <p><strong>Primary Address:</strong> ${currentUser.address || "No address added yet."}</p>
            <p><strong>Phone:</strong> ${currentUser.phone || "No phone added yet."}</p>
            <button onclick="updateProfileAddress()" class="btn-primary" style="margin-top:15px; font-size:12px; padding:8px 15px; border-radius:var(--border-radius-sm);">Update details</button>
          </div>
        </div>

        <div class="profile-pane ${activeProfileTab === "payments" ? "active" : ""}" id="profile-pane-payments" style="display:${activeProfileTab === 'payments' ? 'block' : 'none'};">
          <h3>Saved Payments</h3>
          <p style="margin-top:20px;">No credit cards or wallets linked. Secure Stripe element processes transaction tokens on demand.</p>
        </div>
      </div>
    </div>
  `;
  document.getElementById("app-view").innerHTML = html;
}

window.switchProfileTab = function(tab) {
  activeProfileTab = tab;
  renderProfile();
};

window.handleLogout = function() {
  currentUser = null;
  db.set("current_user", null);
  updateNavbarState();
  showToast("Logged out successfully.", "success");
  window.location.hash = "#/";
};

window.updateProfileAddress = function() {
  const addr = prompt("Enter your shipping address:", currentUser.address || "");
  const phone = prompt("Enter your contact number:", currentUser.phone || "");
  if (addr !== null && phone !== null) {
    currentUser.address = addr;
    currentUser.phone = phone;
    db.set("current_user", currentUser);
    
    // Update inside list
    const users = db.get("users") || [];
    const idx = users.findIndex(u => u.id === currentUser.id);
    if (idx > -1) {
      users[idx] = currentUser;
      db.set("users", users);
    }
    
    showToast("Profile address updated!", "success");
    renderProfile();
  }
};

// VIEW: STATIC INFORMATIONAL PAGES
function renderFAQ() {
  document.getElementById("app-view").innerHTML = `
    <div style="max-width:800px; margin:0 auto; padding:40px 0;">
      <h2 class="section-title" style="margin-bottom:30px;">Clay Cookware Seasoning & FAQ</h2>
      
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div style="background:white; border:1px solid var(--border-color); border-radius:12px; padding:20px;">
          <h4 style="font-size:16px; margin-bottom:10px; color:var(--primary-color);">Q. Do I really need to season terracotta cookware?</h4>
          <p style="font-size:14px; color:rgba(92,58,33,0.85);">Yes! Seasoning is essential. It seals the micro-pores in the natural clay, making it heat-resistant and non-stick. Refer to the 'Clay Seasoning & Care' tab on product detail pages for full instructions.</p>
        </div>
        <div style="background:white; border:1px solid var(--border-color); border-radius:12px; padding:20px;">
          <h4 style="font-size:16px; margin-bottom:10px; color:var(--primary-color);">Q. Can I use dish soap to wash clay pots?</h4>
          <p style="font-size:14px; color:rgba(92,58,33,0.85);">No. Clay is porous and will absorb toxic synthetic liquid soaps, which will leach into your foods during next cooking. Clean using warm water and a scrub brush with baking soda or lemon juice for stubborn grease.</p>
        </div>
        <div style="background:white; border:1px solid var(--border-color); border-radius:12px; padding:20px;">
          <h4 style="font-size:16px; margin-bottom:10px; color:var(--primary-color);">Q. Can these pots be used on electric stoves or induction tops?</h4>
          <p style="font-size:14px; color:rgba(92,58,33,0.85);">They are direct-flame friendly (gas stoves, firewood, oven). For electric glass stoves, use a diffuser ring to distribute heat. Earthenware does not contain magnetic metal, so it will not work directly on induction cooktops without an induction adapter plate.</p>
        </div>
      </div>
    </div>
  `;
}

function renderShipping() {
  document.getElementById("app-view").innerHTML = `
    <div style="max-width:800px; margin:0 auto; padding:40px 0;">
      <h2 class="section-title" style="margin-bottom:30px;">Shipping & Safe Packaging Information</h2>
      <p style="font-size:14px; line-height:1.6; margin-bottom:20px;">All pottery products are packed using specialized triple-layer organic cushion boxes, preventing crack impacts during sorting and delivery. We take full responsibility for safe delivery.</p>
      
      <h4 style="margin-bottom:10px; font-size:16px;">Delivery Timelines</h4>
      <ul style="padding-left:20px; font-size:14px; margin-bottom:30px;">
        <li style="margin-bottom:8px;"><strong>Local (Pakistan/India):</strong> 2 to 4 business days. Free shipping on orders over ₨4,000.</li>
        <li style="margin-bottom:8px;"><strong>International Shipping:</strong> 7 to 12 business days (Stripe/PayPal orders processed via DHL Express).</li>
      </ul>
    </div>
  `;
}

function renderReturns() {
  document.getElementById("app-view").innerHTML = `
    <div style="max-width:800px; margin:0 auto; padding:40px 0;">
      <h2 class="section-title" style="margin-bottom:30px;">Refund & Replacement Guarantee</h2>
      <p style="font-size:14px; line-height:1.6; margin-bottom:20px;">If your hand-spun pottery arrives cracked or broken, we will ship a replacement completely free of charge or issue a 100% refund immediately. No returns required for broken clayware.</p>
      <p style="font-size:14px; line-height:1.6;">Simply snap a photo of the package and WhatsApp us at +92 300 1234567 or email refunds@mittikybartan.com within 24 hours of delivery.</p>
    </div>
  `;
}

function renderContact() {
  document.getElementById("app-view").innerHTML = `
    <div style="max-width:600px; margin:0 auto; padding:40px 0;">
      <h2 class="section-title" style="margin-bottom:30px;">Contact Us</h2>
      
      <div style="background:var(--secondary-color); padding:20px; border-radius:12px; margin-bottom:30px; font-size:14px;">
        <p><strong>Artisanal Hotline:</strong> +92 300 1234567 (WhatsApp available)</p>
        <p><strong>Customer Email:</strong> support@mittikybartan.com</p>
      </div>

      <form onsubmit="event.preventDefault(); showToast('Thank you! Our support artisans will email you shortly.', 'success'); document.getElementById('contact-form').reset();" id="contact-form">
        <div class="form-group" style="margin-bottom:15px;">
          <label>Your Name</label>
          <input type="text" class="form-control" required>
        </div>
        <div class="form-group" style="margin-bottom:15px;">
          <label>Email Address</label>
          <input type="email" class="form-control" required>
        </div>
        <div class="form-group" style="margin-bottom:20px;">
          <label>Your Message</label>
          <textarea rows="5" class="form-control" placeholder="Inquire about custom pottery designs..." required></textarea>
        </div>
        <button type="submit" class="btn-primary" style="width:100%;">Submit Message</button>
      </form>
    </div>
  `;
}

// VIEW: ADMINISTRATIVE DASHBOARD (CRUD, Review approval & Charts)
let adminActiveView = "products"; // products, categories, orders, reviews, analytics
function renderAdmin() {
  if (!currentUser || currentUser.role !== "admin") {
    document.getElementById("app-view").innerHTML = `
      <div style="text-align:center; padding:100px 20px;">
        <h2 style="font-size:28px; margin-bottom:15px;">Unauthorized Access</h2>
        <p>You must log in using administrator credentials to view dashboard panels.</p>
        <a href="#/login" class="btn-primary" style="margin-top:20px; display:inline-block;">Go to Login</a>
      </div>
    `;
    return;
  }

  const products = db.get("products") || [];
  const categories = db.get("categories") || [];
  const orders = db.get("orders") || [];
  const reviewsDb = db.get("reviews") || {};
  const analytics = db.get("analytics") || DEFAULT_ANALYTICS;

  // Stat summaries
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  
  // Calculate average rating
  const avgRating = (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1);

  let html = `
    <div class="section-header" style="border-bottom:2px solid var(--primary-color); padding-bottom:15px; margin-bottom:30px;">
      <div>
        <h2 style="font-size:28px;">Admin Dashboard</h2>
        <span style="font-size:12px; color:rgba(92,58,33,0.6);">Real-time control panel & analytics metrics</span>
      </div>
      <div style="display:flex; gap:12px;">
        <button class="btn-card-view" onclick="switchAdminPanel('products')" style="border-color:${adminActiveView==='products' ? 'var(--primary-color)' : 'var(--border-color)'}">Products CRUD</button>
        <button class="btn-card-view" onclick="switchAdminPanel('categories')" style="border-color:${adminActiveView==='categories' ? 'var(--primary-color)' : 'var(--border-color)'}">Categories</button>
        <button class="btn-card-view" onclick="switchAdminPanel('orders')" style="border-color:${adminActiveView==='orders' ? 'var(--primary-color)' : 'var(--border-color)'}">Orders (${orders.filter(o=>o.status==='processing').length})</button>
        <button class="btn-card-view" onclick="switchAdminPanel('reviews')" style="border-color:${adminActiveView==='reviews' ? 'var(--primary-color)' : 'var(--border-color)'}">Approve Reviews</button>
        <button class="btn-card-view" onclick="switchAdminPanel('analytics')" style="border-color:${adminActiveView==='analytics' ? 'var(--primary-color)' : 'var(--border-color)'}">Sales Charts</button>
      </div>
    </div>

    <!-- Stat Dashboard Cards Row -->
    <div class="admin-grid">
      <div class="stat-card">
        <span class="stat-title">Total Revenue</span>
        <div class="stat-value">${formatPrice(totalRevenue)}</div>
        <span class="stat-desc">↑ 18.2% this week</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Completed Orders</span>
        <div class="stat-value">${totalOrders}</div>
        <span class="stat-desc">All tracking statuses</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Earthenware catalog</span>
        <div class="stat-value">${products.length} Items</div>
        <span class="stat-desc">Across ${categories.length - 1} categories</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Average Rating</span>
        <div class="stat-value">★ ${avgRating}</div>
        <span class="stat-desc">Customer satisfaction</span>
      </div>
    </div>

    <div class="admin-panel-container">
      ${renderActiveAdminPanel()}
    </div>
  `;

  document.getElementById("app-view").innerHTML = html;

  // If active tab is analytics, draw SVG charts
  if (adminActiveView === "analytics") {
    drawAdminAnalyticsCharts(analytics);
  }
}

window.switchAdminPanel = function(view) {
  adminActiveView = view;
  renderAdmin();
};

function renderActiveAdminPanel() {
  const products = db.get("products") || [];
  const categories = db.get("categories") || [];
  const orders = db.get("orders") || [];
  const reviewsDb = db.get("reviews") || {};

  if (adminActiveView === "products") {
    return `
      <div class="admin-sections-grid">
        <!-- CRUD List -->
        <div class="admin-card">
          <div class="admin-card-header">
            <h4>Earthenware Products</h4>
          </div>
          <table class="admin-table">
            <thead>
              <tr>
                <th>Pottery Name</th>
                <th>Category</th>
                <th>Price (PKR)</th>
                <th>Stock</th>
                <th>Home Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${products.map(p => `
                <tr>
                  <td><strong>${p.name}</strong></td>
                  <td><span style="text-transform:uppercase; font-size:10px; font-weight:700; color:var(--primary-color);">${p.category}</span></td>
                  <td>₨${p.pricePKR.toLocaleString()}</td>
                  <td>${p.stock}</td>
                  <td>
                    <button class="btn-card-view" style="padding:4px 8px; font-size:11px; background:${p.featured ? 'var(--secondary-color)':'#eee'}" onclick="toggleFeatureProduct('${p.id}')">
                      ${p.featured ? "Featured" : "Regular"}
                    </button>
                  </td>
                  <td>
                    <button onclick="editProductPrompt('${p.id}')" style="background:none; border:none; color:#096DD9; cursor:pointer; font-weight:700;">Edit</button>
                    <span style="color:#ddd;">|</span>
                    <button onclick="deleteProduct('${p.id}')" style="background:none; border:none; color:#A32A2A; cursor:pointer; font-weight:700;">Delete</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <!-- Add Form -->
        <div class="admin-card">
          <h4>Create New Pottery</h4>
          <form onsubmit="handleProductCreate(event)" style="margin-top:20px;" id="admin-create-prod-form">
            <div class="form-group" style="margin-bottom:12px;">
              <label>Product Name</label>
              <input type="text" id="crud-name" class="form-control" required>
            </div>
            <div class="form-group" style="margin-bottom:12px;">
              <label>Category</label>
              <select id="crud-category" class="sort-select">
                ${categories.filter(c => c.id !== "all" && c.id !== "new-arrivals" && c.id !== "best-sellers").map(c => `
                  <option value="${c.id}">${c.name}</option>
                `).join("")}
              </select>
            </div>
            <div class="form-grid" style="margin-bottom:12px;">
              <div class="form-group">
                <label>Price (PKR)</label>
                <input type="number" id="crud-price-pkr" class="form-control" required>
              </div>
              <div class="form-group">
                <label>Price (USD)</label>
                <input type="number" id="crud-price-usd" class="form-control" required>
              </div>
            </div>
            <div class="form-grid" style="margin-bottom:12px;">
              <div class="form-group">
                <label>Initial Stock</label>
                <input type="number" id="crud-stock" class="form-control" required>
              </div>
              <div class="form-group">
                <label>Tag Badge</label>
                <input type="text" id="crud-tag" class="form-control" placeholder="e.g. New / Sale">
              </div>
            </div>
            <div class="form-group" style="margin-bottom:15px;">
              <label>Description</label>
              <textarea id="crud-desc" rows="3" class="form-control" required></textarea>
            </div>
            <button type="submit" class="btn-primary" style="width:100%;">Create & Launch</button>
          </form>
        </div>
      </div>
    `;
  } else if (adminActiveView === "categories") {
    return `
      <div class="admin-sections-grid">
        <!-- Categories CRUD -->
        <div class="admin-card">
          <div class="admin-card-header">
            <h4>Pottery Categories</h4>
          </div>
          <table class="admin-table">
            <thead>
              <tr>
                <th>ID Key</th>
                <th>Category Title Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${categories.map(c => `
                <tr>
                  <td><code>${c.id}</code></td>
                  <td><strong>${c.name}</strong></td>
                  <td>
                    ${c.id === "all" || c.id === "new-arrivals" || c.id === "best-sellers" ? `
                      <span style="color:#aaa;">System Locked</span>
                    ` : `
                      <button onclick="deleteCategory('${c.id}')" style="background:none; border:none; color:#A32A2A; cursor:pointer; font-weight:700;">Delete</button>
                    `}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <!-- Add Category Form -->
        <div class="admin-card">
          <h4>Add New Category</h4>
          <form onsubmit="handleCategoryCreate(event)" style="margin-top:20px;">
            <div class="form-group" style="margin-bottom:15px;">
              <label>Category ID Key (lowercase, no spaces)</label>
              <input type="text" id="cat-id" class="form-control" placeholder="e.g. clay-cups" required>
            </div>
            <div class="form-group" style="margin-bottom:15px;">
              <label>Category Display Name</label>
              <input type="text" id="cat-name" class="form-control" placeholder="e.g. Clay Cups" required>
            </div>
            <button type="submit" class="btn-primary" style="width:100%;">Add Category</button>
          </form>
        </div>
      </div>
    `;
  } else if (adminActiveView === "orders") {
    return `
      <div class="admin-card">
        <h4>Orders Management</h4>
        <table class="admin-table" style="margin-top:20px;">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Shipping Address</th>
              <th>Total Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(o => `
              <tr>
                <td><strong>${o.id}</strong></td>
                <td>${o.date}</td>
                <td><small>${o.address}</small></td>
                <td>${formatPrice(o.total)}</td>
                <td>${o.paymentMethod}</td>
                <td><span class="status-indicator ${o.status}">${o.status.toUpperCase()}</span></td>
                <td>
                  <select onchange="updateOrderStatus('${o.id}', this.value)" class="sort-select" style="padding:4px 8px; font-size:12px; width:auto;">
                    <option value="processing" ${o.status==='processing' ? 'selected':''}>Processing</option>
                    <option value="shipped" ${o.status==='shipped' ? 'selected':''}>Shipped</option>
                    <option value="delivered" ${o.status==='delivered' ? 'selected':''}>Delivered</option>
                  </select>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  } else if (adminActiveView === "reviews") {
    // Flatten reviews from db to list pending ones
    const pendingReviewsList = [];
    Object.keys(reviewsDb).forEach(prodId => {
      reviewsDb[prodId].forEach((rev, idx) => {
        if (!rev.approved) {
          pendingReviewsList.push({ prodId: prodId, index: idx, ...rev });
        }
      });
    });

    return `
      <div class="admin-card">
        <h4>Review Moderation</h4>
        <p style="font-size:12px; color:rgba(92,58,33,0.6); margin-top:5px;">Approve or hide customer reviews before they display on site</p>
        
        ${pendingReviewsList.length === 0 ? `
          <p style="margin-top:30px; text-align:center;">All reviews are moderated and approved.</p>
        ` : `
          <table class="admin-table" style="margin-top:20px;">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Comment</th>
                <th>Rating</th>
                <th>Artisanal Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${pendingReviewsList.map(r => `
                <tr>
                  <td><strong>${r.name}</strong></td>
                  <td>"${r.comment}"</td>
                  <td style="color:#F39C12;">★ ${r.rating}</td>
                  <td>
                    ${r.images && r.images.length > 0 ? `
                      <img src="${r.images[0]}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;">
                    ` : "None"}
                  </td>
                  <td>
                    <button onclick="approveReview('${r.prodId}', ${r.index})" style="background:#27AE60; border:none; color:white; padding:5px 12px; border-radius:4px; cursor:pointer; font-weight:600;">Approve</button>
                    <button onclick="deleteReview('${r.prodId}', ${r.index})" style="background:#A32A2A; border:none; color:white; padding:5px 12px; border-radius:4px; cursor:pointer; font-weight:600; margin-left:8px;">Reject</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        `}
      </div>
    `;
  } else {
    // activeView === analytics
    return `
      <div class="admin-sections-grid">
        <!-- Revenue Line Chart -->
        <div class="admin-card">
          <h4>Weekly Sales Revenue (PKR)</h4>
          <div class="chart-viewport" id="revenue-chart"></div>
        </div>

        <!-- Conversion funnel / Product Views bar Chart -->
        <div class="admin-card">
          <h4>Add to Cart Clicks vs Page Views</h4>
          <div class="chart-viewport" id="views-chart"></div>
        </div>
      </div>
    `;
  }
}

// Admin Panel Action Handlers
window.toggleFeatureProduct = function(id) {
  const products = db.get("products") || [];
  const product = products.find(p => p.id === id);
  if (product) {
    product.featured = !product.featured;
    db.set("products", products);
    showToast(`${product.name} featured state updated!`, "success");
    renderAdmin();
  }
};

window.deleteProduct = function(id) {
  if (confirm("Are you sure you want to delete this organic pottery item?")) {
    let products = db.get("products") || [];
    products = products.filter(p => p.id !== id);
    db.set("products", products);
    showToast("Product deleted.", "success");
    renderAdmin();
    updateSidebarCategories();
  }
};

window.editProductPrompt = function(id) {
  const products = db.get("products") || [];
  const product = products.find(p => p.id === id);
  if (!product) return;

  const newPrice = prompt("Enter new price in PKR:", product.pricePKR);
  const newStock = prompt("Enter new stock level:", product.stock);
  if (newPrice !== null && newStock !== null) {
    product.pricePKR = parseInt(newPrice);
    product.stock = parseInt(newStock);
    db.set("products", products);
    showToast("Product details updated successfully!", "success");
    renderAdmin();
  }
};

window.handleProductCreate = function(e) {
  e.preventDefault();
  const name = document.getElementById("crud-name").value;
  const category = document.getElementById("crud-category").value;
  const pricePKR = parseInt(document.getElementById("crud-price-pkr").value);
  const priceUSD = parseInt(document.getElementById("crud-price-usd").value);
  const stock = parseInt(document.getElementById("crud-stock").value);
  const tag = document.getElementById("crud-tag").value;
  const desc = document.getElementById("crud-desc").value;

  const products = db.get("products") || [];
  const newProd = {
    id: "prod-" + (products.length + 1),
    name: name,
    category: category,
    pricePKR: pricePKR,
    priceUSD: priceUSD,
    originalPricePKR: pricePKR,
    originalPriceUSD: priceUSD,
    rating: 5.0,
    stock: stock,
    image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80",
    images: ["https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80"],
    tag: tag,
    featured: false,
    isBestSeller: false,
    isNewArrival: true,
    description: desc,
    material: "Handcrafted natural red clay",
    care: "Rinse with hot water before seasoning."
  };

  products.push(newProd);
  db.set("products", products);
  
  showToast(`${name} has been launched dynamically!`, "success");
  document.getElementById("admin-create-prod-form").reset();
  renderAdmin();
  updateSidebarCategories();
};

window.deleteCategory = function(id) {
  if (confirm("Delete this category? Products inside will not be deleted but won't filter under this.")) {
    let categories = db.get("categories") || [];
    categories = categories.filter(c => c.id !== id);
    db.set("categories", categories);
    showToast("Category removed.", "success");
    renderAdmin();
    updateSidebarCategories();
  }
};

window.handleCategoryCreate = function(e) {
  e.preventDefault();
  const id = document.getElementById("cat-id").value.trim().toLowerCase();
  const name = document.getElementById("cat-name").value.trim();

  const categories = db.get("categories") || [];
  if (categories.some(c => c.id === id)) {
    showToast("Category ID already exists.", "error");
    return;
  }

  categories.push({ id: id, name: name });
  db.set("categories", categories);

  showToast(`Category ${name} created successfully!`, "success");
  renderAdmin();
  updateSidebarCategories();
};

window.updateOrderStatus = function(orderId, newStatus) {
  const orders = db.get("orders") || [];
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    
    // Set matching tracking step done
    order.trackingSteps.forEach(step => {
      if (step.step.toLowerCase().includes(newStatus)) {
        step.done = true;
        step.date = new Date().toLocaleString();
      }
    });

    db.set("orders", orders);
    showToast(`Order status updated to ${newStatus.toUpperCase()}`, "success");
    renderAdmin();
  }
};

window.approveReview = function(prodId, index) {
  const reviewsDb = db.get("reviews") || {};
  if (reviewsDb[prodId] && reviewsDb[prodId][index]) {
    reviewsDb[prodId][index].approved = true;
    db.set("reviews", reviewsDb);
    showToast("Review approved and is now live!", "success");
    renderAdmin();
  }
};

window.deleteReview = function(prodId, index) {
  const reviewsDb = db.get("reviews") || {};
  if (reviewsDb[prodId] && reviewsDb[prodId][index]) {
    reviewsDb[prodId].splice(index, 1);
    db.set("reviews", reviewsDb);
    showToast("Review rejected and deleted.", "success");
    renderAdmin();
  }
};

// Pure SVG charts visualization for Admin Analytics
function drawAdminAnalyticsCharts(analytics) {
  const revChart = document.getElementById("revenue-chart");
  const viewsChart = document.getElementById("views-chart");

  if (!revChart || !viewsChart) return;

  // 1. Draw Weekly Sales Revenue line chart in SVG
  const sales = analytics.dailySales;
  const maxRev = Math.max(...sales.map(s => s.revenue), 10000);
  
  let linePoints = "";
  let barsHTML = "";
  const w = revChart.clientWidth || 400;
  const h = 180;
  const padding = 30;

  sales.forEach((s, idx) => {
    const x = padding + (idx * (w - 2 * padding) / (sales.length - 1));
    const y = h - padding - (s.revenue * (h - 2 * padding) / maxRev);
    linePoints += `${x},${y} `;
    
    // Draw dots & dates text
    barsHTML += `
      <circle cx="${x}" cy="${y}" r="4" fill="var(--primary-color)" />
      <text x="${x}" y="${h - 5}" font-size="9" text-anchor="middle" fill="#5C3A21">${s.date}</text>
      <text x="${x}" y="${y - 10}" font-size="9" text-anchor="middle" font-weight="bold" fill="var(--primary-hover)">₨${s.revenue}</text>
    `;
  });

  revChart.innerHTML = `
    <svg width="100%" height="100%" style="overflow:visible;">
      <polyline fill="none" stroke="var(--primary-color)" stroke-width="2.5" points="${linePoints}" />
      ${barsHTML}
    </svg>
  `;

  // 2. Draw Cart Clicks vs Page Views grouped bars
  // Grab top 3 viewed products
  const products = db.get("products") || [];
  const topViewedIds = Object.keys(analytics.productViews)
    .sort((a, b) => analytics.productViews[b] - analytics.productViews[a])
    .slice(0, 3);

  const totalViewsWidth = viewsChart.clientWidth || 300;
  const totalViewsHeight = 180;
  let barChartsHTML = "";
  
  topViewedIds.forEach((id, idx) => {
    const prod = products.find(p => p.id === id);
    if (!prod) return;

    const views = analytics.productViews[id] || 0;
    const clicks = analytics.productCartClicks[id] || 0;

    const groupWidth = (totalViewsWidth - 40) / 3;
    const xStart = 20 + idx * groupWidth;

    const maxVal = Math.max(views, 200);
    const viewBarHeight = (views * 120) / maxVal;
    const clickBarHeight = (clicks * 120) / maxVal;

    const nameTruncated = prod.name.length > 12 ? prod.name.substring(0, 10) + "..." : prod.name;

    barChartsHTML += `
      <!-- Views Bar (Deep Brown) -->
      <rect x="${xStart + 10}" y="${140 - viewBarHeight}" width="20" height="${viewBarHeight}" rx="4" fill="#5C3A21" />
      <text x="${xStart + 20}" y="${135 - viewBarHeight}" font-size="9" text-anchor="middle" fill="#5C3A21">${views}</text>

      <!-- Cart Clicks Bar (Terracotta) -->
      <rect x="${xStart + 35}" y="${140 - clickBarHeight}" width="20" height="${clickBarHeight}" rx="4" fill="var(--primary-color)" />
      <text x="${xStart + 45}" y="${135 - clickBarHeight}" font-size="9" text-anchor="middle" fill="var(--primary-color)">${clicks}</text>

      <!-- Labels -->
      <text x="${xStart + 32}" y="${155}" font-size="9" text-anchor="middle" font-weight="bold" fill="#5C3A21">${nameTruncated}</text>
    `;
  });

  viewsChart.innerHTML = `
    <svg width="100%" height="100%" style="overflow:visible;">
      ${barChartsHTML}
      <line x1="10" y1="140" x2="${totalViewsWidth - 10}" y2="140" stroke="#EADBC8" stroke-width="1.5" />
    </svg>
  `;
}

// --- PWA SERVICE WORKER REGISTRATION ---
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {
        console.log("[PWA] Service Worker registered successfully: ", registration.scope);
      })
      .catch((error) => {
        console.error("[PWA] Service Worker registration failed: ", error);
      });
  });
}
