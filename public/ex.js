// =========================
// PRODUCT DATA (11 ITEMS)
// =========================
const products = [
  {
    id: 1,
    name: "HHaul Electric Forklift 3.5T",
    category: "forklift",
    price: 1550000,
    usage: "Warehouse, factory",
    tag: "Electric",
    img: "https://images.tractorjunction.com/Infrajunction-prod/ace_30e_1_15cdc074a2.jpg?format=webp&quality=40"
  },
  {
    id: 2,
    name: "Compact Electric Pallet Truck",
    category: "forklift",
    price: 320000,
    usage: "Warehouse",
    tag: "Pallet",
    img: "https://media-live2.prod.scw.jungheinrichcloud.com/resource/image/545608/landscape_ratio5x4/970/776/c1b9e6d4d622bb73b1179e5d9a49727e/8941FE2BBC4D84C8DF3EDB34190622D5/stage-pallet-truck-eje.jpg"
  },
  {
    id: 3,
    name: "Rough‑Terrain Diesel Forklift 5T",
    category: "industrial",
    price: 1850000,
    usage: "Construction, yard",
    tag: "Diesel",
    img: "https://kentpallettrucks.co.uk/wp-content/uploads/2022/06/HC-rough-terrain_2WD.jpg"
  },
  {
    id: 4,
    name: "4x4 Telehandler 12m Boom",
    category: "industrial",
    price: 2600000,
    usage: "Construction, sites",
    tag: "Telehandler",
    img: "https://cdn.truckscout24.com/data/listing/img/vga/ts/58/88/17862961-01.jpg?v=1747043693"
  },
  {
    id: 5,
    name: "Smart Electric Tractor 50 HP",
    category: "farming",
    price: 1100000,
    usage: "Farms",
    tag: "Electric",
    img: "https://assets.tractorjunction.com/tractor-junction/assets/images/upload/sonalika-tiger-electric-4wd-1696505405.webp?width=347&height=202"
  },
  {
    id: 6,
    name: "Rotavator Attachment 7 ft",
    category: "farming",
    price: 175000,
    usage: "Soil preparation",
    tag: "Implements",
    img: "https://m.media-amazon.com/images/I/71UkFP+3UML._AC_UF1000,1000_QL80_.jpg"
  },
  {
    id: 7,
    name: "Hydraulic Loader Backhoe",
    category: "industrial",
    price: 2200000,
    usage: "Digging, loading",
    tag: "Backhoe",
    img: "https://cdn.hswstatic.com/gif/backhoe-loader-bol.jpg"
  },
  {
    id: 8,
    name: "High‑Lift Order Picker",
    category: "forklift",
    price: 980000,
    usage: "High‑rack warehouse",
    tag: "Order Picker",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQgrKS8ILjCWPhWlg4kCgjPC2fcX1yW45VQ&s"
  },
  {
    id: 9,
    name: "Premium Hydraulic Oil",
    category: "oil",
    price: 2500,
    usage: "Hydraulic systems",
    tag: "Oil",
    img: "oil1.png"
  },
  {
    id: 10,
    name: "Heavy Duty Engine Oil",
    category: "oil",
    price: 3500,
    usage: "Diesel engines",
    tag: "Oil",
    img: "oil2.png"
  },
  {
    id: 11,
    name: "Gear Oil SAE 90",
    category: "oil",
    price: 2800,
    usage: "Gearboxes",
    tag: "Oil",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy7ftKnj5oHyyjdIqOZhQmBTOrB-zOyGD-Yg&s"
  }
];

// =========================
// DOM REFERENCES
// =========================
const productGrid = document.getElementById("productGrid");

if (!productGrid) {
  console.error("productGrid element not found in HTML");
}

const searchInput = document.getElementById("searchInput");
const categoryCards = document.querySelectorAll(".category-card");

const cartOpenBtn = document.getElementById("cartOpenBtn");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartDrawer = document.getElementById("cartDrawer");
const backdrop = document.getElementById("backdrop");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const buyNowBtn = document.getElementById("buyNowBtn");

// Contact form (for fake submit)
const contactForm = document.getElementById("contactForm");

// FAQ elements
const faqItems = document.querySelectorAll(".faq-item");

let activeCategory = "all";
let cart = [];

// Helper: format rupees with commas
const formatPrice = (value) =>
  value.toLocaleString("en-IN", { maximumFractionDigits: 0 });

// =========================
// GSAP + SCROLLTRIGGER SETUP
// (scroll-strip animation)
// =========================
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap
    .timeline({
      scrollTrigger: {
        scrub: 1,
        trigger: ".scroll-trigger-ready__worm-wrap",
        start: "top 90%",
        end: "bottom 30%",
        // markers: true, // debug ke liye
      },
    })
    .from(".scroll-strip__title", {
      y: 60,
      opacity: 0,
      duration: 1,
    })
    .from(
      ".scroll-strip__text",
      {
        y: 40,
        opacity: 0,
        duration: 1,
      },
      "-=0.5"
    );
}

// =========================
// RENDER PRODUCTS GRID
// =========================
function renderProducts() {
  const keyword = searchInput.value.trim().toLowerCase();

  productGrid.innerHTML = "";
  const fragment = document.createDocumentFragment();

  products.forEach((p) => {
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    const matchKeyword =
      !keyword ||
      p.name.toLowerCase().includes(keyword) ||
      p.usage.toLowerCase().includes(keyword) ||
      p.tag.toLowerCase().includes(keyword);

    if (!matchCategory || !matchKeyword) return;

    const card = document.createElement("div");
    card.className = "product-card click-animate";
    card.dataset.id = p.id;

    card.innerHTML = `
      <img class="product-img" src="${p.img}" alt="${p.name}">
      <div class="product-title">${p.name}</div>
      <div class="product-meta">${p.usage}</div>
      <div>
        <span class="tag">${p.tag}</span>
        <span class="tag">${p.category}</span>
      </div>
      <div class="price">₹${formatPrice(p.price)}</div>
      <div class="qty-row">
        <button class="qty-btn" data-action="minus">-</button>
        <div class="qty-display">1</div>
        <button class="qty-btn" data-action="plus">+</button>
      </div>
      <div style="display:flex; gap:0.5rem; margin-top:0.6rem;">
        <button class="btn secondary add-cart-btn">Add to cart</button>
        <button class="btn primary buy-btn">Buy</button>
      </div>
    `;

    fragment.appendChild(card);
  });

  productGrid.appendChild(fragment);
}

// =========================
// CATEGORY FILTER CLICKS
// =========================
categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    categoryCards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
    activeCategory = card.dataset.filter;
    renderProducts();
    pulse(card);
  });
});

// =========================
// SEARCH FILTER
// =========================
searchInput.addEventListener("input", () => {
  renderProducts();
});

// =========================
// PRODUCT CARD EVENTS
// =========================
productGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".product-card");
  if (!card) return;

  const qtyDisplay = card.querySelector(".qty-display");
  let qty = parseInt(qtyDisplay.textContent, 10) || 1;

  if (e.target.matches(".qty-btn")) {
    const action = e.target.dataset.action;
    if (action === "plus") qty++;
    if (action === "minus") qty = Math.max(1, qty - 1);
    qtyDisplay.textContent = qty;
    clickRipple(e.target);
  }

  if (e.target.matches(".add-cart-btn")) {
    addToCart(card.dataset.id, qty);
    clickRipple(e.target);
  }

  if (e.target.matches(".buy-btn")) {
    addToCart(card.dataset.id, qty);
    openCart();
    clickRipple(e.target);
  }
});

// =========================
// CART LOGIC
// =========================
function addToCart(productId, qty) {
  const id = Number(productId);
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    const product = products.find((p) => p.id === id);
    cart.push({ ...product, qty });
  }
  updateCartUI();
}

function updateCartUI() {
  let total = 0;
  let count = 0;
  cartItemsContainer.innerHTML = "";

  cart.forEach((item) => {
    total += item.price * item.qty;
    count += item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div><strong>${item.name}</strong></div>
      <div>Qty: ${item.qty} × ₹${formatPrice(item.price)}</div>
      <div>Line: ₹${formatPrice(item.price * item.qty)}</div>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartCount.textContent = count;
  cartTotal.textContent = formatPrice(total);
}

// =========================
// CART DRAWER OPEN/CLOSE
// =========================
function openCart() {
  cartDrawer.classList.add("open");
  backdrop.classList.add("visible");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  backdrop.classList.remove("visible");
}

cartOpenBtn.addEventListener("click", () => {
  openCart();
  pulse(cartOpenBtn);
});

cartCloseBtn.addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

buyNowBtn.addEventListener("click", () => {
  if (!cart.length) {
    alert("Add at least one machine to cart.");
    return;
  }
  alert("Demo only: integrate payment or order form here.");
});

// =========================
// SMOOTH SCROLL BUTTONS
// =========================
document.querySelectorAll("[data-scroll]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-scroll");
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      pulse(btn);
    }
  });
});

// =========================
// GLOBAL CLICK ANIMATION
// =========================
document.addEventListener("click", (e) => {
  const interactive = e.target.closest(
    "button, .product-card, .category-card, .nav-link, .cart-icon"
  );
  if (interactive) {
    tinyScale(interactive);
  }
});

// =========================
// SMALL ANIMATION HELPERS
// =========================
function tinyScale(el) {
  el.style.transform += " scale(0.97)";
  setTimeout(() => {
    el.style.transform = el.style.transform.replace(" scale(0.97)", "");
  }, 120);
}

function pulse(el) {
  el.style.boxShadow = "0 0 14px rgba(148,245,179,0.9)";
  setTimeout(() => {
    el.style.boxShadow = "";
  }, 220);
}

// Pehle wale clickRipple function ko sahi se band karein
function clickRipple(el) {
  el.style.transform += " translateY(-1px) scale(1.04)";
  setTimeout(() => {
    el.style.transform = el.style.transform.replace(
      " translateY(-1px) scale(1.04)",
      ""
    );
  }, 100); // 100ms ka delay
}

// *** SABSE ZAROORI: Function ko call karein ***
renderProducts();