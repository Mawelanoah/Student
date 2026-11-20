/**
 * Student Marketplace - Sample Data (Phase 1)
 * ============================================
 * This file contains all demo listings, categories and configuration.
 * In Phase 2 this will be replaced by live data from Supabase.
 *
 * IMPORTANT:
 * - All WhatsApp numbers below are FICTIONAL DEMO numbers only.
 * - Never use real personal numbers in this demo data.
 * - Replace with real seller contact details only after proper verification
 *   and privacy controls are in place (Phase 2+).
 */

const MARKETPLACE_CONFIG = {
  siteName: "Student Marketplace",
  university: "Tshwane University of Technology (TUT)",
  currency: "R",
  // Demo WhatsApp number used across all sample listings.
  // This is NOT a real number. It exists only so the WhatsApp buttons work in the demo.
  demoWhatsApp: "27820000000",
  demoWhatsAppNote: "Demo contact only – replace with real seller details in Phase 2"
};

const CATEGORIES = [
  { id: "books", name: "Books and Study Materials", slug: "books", icon: "📚" },
  { id: "electronics", name: "Electronics", slug: "electronics", icon: "💻" },
  { id: "clothing", name: "Clothing and Shoes", slug: "clothing", icon: "👕" },
  { id: "furniture", name: "Furniture and Room Essentials", slug: "furniture", icon: "🛏️" },
  { id: "accessories", name: "Accessories", slug: "accessories", icon: "🎧" },
  { id: "sports", name: "Sports and Fitness", slug: "sports", icon: "⚽" },
  { id: "beauty", name: "Beauty and Personal Care", slug: "beauty", icon: "🧴" },
  { id: "other", name: "Other", slug: "other", icon: "📦" }
];

const CONDITIONS = [
  { id: "brand-new", label: "Brand New" },
  { id: "like-new", label: "Like New" },
  { id: "good", label: "Good" },
  { id: "fair", label: "Fair" }
];

/**
 * Sample listings
 * Prices are in South African Rand (ZAR).
 * Images use reliable Unsplash sources with descriptive alt text.
 * All seller WhatsApp values point to the shared demo number.
 */
const LISTINGS = [
  {
    id: "tut-001",
    title: "First Year Accounting Textbook – Complete Set",
    description: "Full set of first-year Accounting textbooks used at TUT. Includes workbooks and lecture notes. No highlighting or missing pages. Perfect for students starting the semester.",
    price: 450,
    category: "books",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80"
    ],
    sellerName: "Thabo M.",
    campus: "Pretoria Campus",
    datePosted: "2026-11-18",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: true,
    status: "active"
  },
  {
    id: "tut-002",
    title: "HP Pavilion 15 Laptop – 8GB RAM, 256GB SSD",
    description: "Reliable student laptop in excellent condition. Perfect for assignments, online lectures and light design work. Comes with original charger. Battery health still strong.",
    price: 4200,
    category: "electronics",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac882e4e?w=800&q=80"
    ],
    sellerName: "Lerato K.",
    campus: "Pretoria Campus",
    datePosted: "2026-11-17",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: true,
    status: "active"
  },
  {
    id: "tut-003",
    title: "Nike Air Force 1 Sneakers – Size 8 (UK)",
    description: "Classic white Nike Air Force 1s. Worn only a few times. Still look almost new. Ideal for campus and casual wear.",
    price: 850,
    category: "clothing",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    sellerName: "Sipho D.",
    campus: "Soshanguve Campus",
    datePosted: "2026-11-16",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: false,
    status: "active"
  },
  {
    id: "tut-004",
    title: "Study Desk with Drawer – Compact & Sturdy",
    description: "Solid wooden study desk with one drawer. Perfect size for a student room. Easy to assemble. Selling because I’m moving out of res.",
    price: 650,
    category: "furniture",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d8?w=800&q=80"
    ],
    sellerName: "Naledi P.",
    campus: "Pretoria Campus",
    datePosted: "2026-11-15",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: true,
    status: "active"
  },
  {
    id: "tut-005",
    title: "Sony WH-1000XM4 Noise Cancelling Headphones",
    description: "Industry-leading noise cancellation. Great for focusing in noisy residences or libraries. Includes original case and cable. Minor wear on the ear cups.",
    price: 2800,
    category: "accessories",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80"
    ],
    sellerName: "Kagiso T.",
    campus: "Pretoria Campus",
    datePosted: "2026-11-14",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: false,
    status: "active"
  },
  {
    id: "tut-006",
    title: "Engineering Mathematics Textbook (3rd Year)",
    description: "Advanced Engineering Mathematics textbook used in TUT engineering modules. Clean pages, no missing sections. Includes formula sheet at the back.",
    price: 380,
    category: "books",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80"
    ],
    sellerName: "Amahle N.",
    campus: "Soshanguve Campus",
    datePosted: "2026-11-13",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: false,
    status: "active"
  },
  {
    id: "tut-007",
    title: "Samsung Galaxy A54 – 128GB (Unlocked)",
    description: "Well-looked-after phone. Screen protector and case included. Battery still holds a full day of normal student use. No cracks or major scratches.",
    price: 3100,
    category: "electronics",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80"
    ],
    sellerName: "Tumi S.",
    campus: "Pretoria Campus",
    datePosted: "2026-11-12",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: true,
    status: "active"
  },
  {
    id: "tut-008",
    title: "Single Bed Frame + Mattress (Student Size)",
    description: "Sturdy single bed frame with a comfortable foam mattress. Ideal for residence rooms. Mattress cover included. Collect only – Pretoria area.",
    price: 1200,
    category: "furniture",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"
    ],
    sellerName: "Boitumelo R.",
    campus: "Pretoria Campus",
    datePosted: "2026-11-11",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: false,
    status: "active"
  },
  {
    id: "tut-009",
    title: "Adidas Tracksuit – Full Set (Medium)",
    description: "Black Adidas tracksuit top and pants. Worn a handful of times. Great for lectures, gym or casual campus days. Smoke-free home.",
    price: 550,
    category: "clothing",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
    ],
    sellerName: "Karabo M.",
    campus: "Soshanguve Campus",
    datePosted: "2026-11-10",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: false,
    status: "active"
  },
  {
    id: "tut-010",
    title: "Yoga Mat + Resistance Bands Set",
    description: "Thick non-slip yoga mat and a full set of resistance bands. Perfect for home workouts in res. Barely used – still in excellent condition.",
    price: 320,
    category: "sports",
    condition: "brand-new",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80"
    ],
    sellerName: "Zanele H.",
    campus: "Pretoria Campus",
    datePosted: "2026-11-09",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: false,
    status: "active"
  },
  {
    id: "tut-011",
    title: "Skincare Bundle – Cleanser, Moisturiser & Sunscreen",
    description: "Popular student-friendly skincare set. Most products still more than half full. Ideal if you want to try before committing to full-size products.",
    price: 280,
    category: "beauty",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"
    ],
    sellerName: "Palesa L.",
    campus: "Pretoria Campus",
    datePosted: "2026-11-08",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: false,
    status: "active"
  },
  {
    id: "tut-012",
    title: "Scientific Calculator (Casio fx-991EX)",
    description: "Advanced scientific calculator allowed in most TUT exams. Excellent condition, original cover included. Battery still strong.",
    price: 450,
    category: "books",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80"
    ],
    sellerName: "Mpho V.",
    campus: "Soshanguve Campus",
    datePosted: "2026-11-07",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: false,
    status: "active"
  },
  {
    id: "tut-013",
    title: "Wireless Mouse + Keyboard Combo",
    description: "Quiet wireless mouse and compact keyboard. Great for working in the library or shared rooms without disturbing others. USB receiver included.",
    price: 380,
    category: "electronics",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80"
    ],
    sellerName: "Johan B.",
    campus: "Pretoria Campus",
    datePosted: "2026-11-06",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: false,
    status: "active"
  },
  {
    id: "tut-014",
    title: "Desk Lamp with USB Charging Port",
    description: "Modern LED desk lamp with adjustable brightness and a built-in USB port for charging your phone while studying. Very handy in residence rooms.",
    price: 220,
    category: "furniture",
    condition: "brand-new",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80"
    ],
    sellerName: "Nomsa G.",
    campus: "Pretoria Campus",
    datePosted: "2026-11-05",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: false,
    status: "active"
  },
  {
    id: "tut-015",
    title: "Canvas Backpack – Laptop Compartment",
    description: "Durable canvas backpack with padded laptop sleeve (fits up to 15-inch). Multiple pockets. Used for one semester only. Still looks great.",
    price: 350,
    category: "accessories",
    condition: "like-new",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    sellerName: "Andile C.",
    campus: "Soshanguve Campus",
    datePosted: "2026-11-04",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: false,
    status: "active"
  },
  {
    id: "tut-016",
    title: "Mini Fridge – Perfect for Residence",
    description: "Compact bar fridge that fits easily in a student room. Keeps drinks and leftovers cold. Quiet operation. Collect from Pretoria Campus area.",
    price: 950,
    category: "other",
    condition: "good",
    images: [
      "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80"
    ],
    sellerName: "Fatima A.",
    campus: "Pretoria Campus",
    datePosted: "2026-11-03",
    whatsapp: MARKETPLACE_CONFIG.demoWhatsApp,
    featured: true,
    status: "active"
  }
];

/**
 * Helper functions used across the site
 */
function getCategoryById(id) {
  return CATEGORIES.find(c => c.id === id) || { name: "Other", icon: "📦" };
}

function getConditionLabel(id) {
  const cond = CONDITIONS.find(c => c.id === id);
  return cond ? cond.label : id;
}

function formatPrice(amount) {
  return "R" + amount.toLocaleString("en-ZA");
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function getListingById(id) {
  return LISTINGS.find(l => l.id === id) || null;
}

function getFeaturedListings() {
  return LISTINGS.filter(l => l.featured && l.status === "active").slice(0, 6);
}

function getRecentListings(limit = 8) {
  return [...LISTINGS]
    .filter(l => l.status === "active")
    .sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted))
    .slice(0, limit);
}

function buildWhatsAppLink(phone, message) {
  const cleanPhone = (phone || MARKETPLACE_CONFIG.demoWhatsApp).replace(/\D/g, "");
  const text = encodeURIComponent(message || "Hi, I’m interested in your item on Student Marketplace.");
  return `https://wa.me/${cleanPhone}?text=${text}`;
}

// Export for use in other scripts (browser global)
window.MARKETPLACE_CONFIG = MARKETPLACE_CONFIG;
window.CATEGORIES = CATEGORIES;
window.CONDITIONS = CONDITIONS;
window.LISTINGS = LISTINGS;
window.getCategoryById = getCategoryById;
window.getConditionLabel = getConditionLabel;
window.formatPrice = formatPrice;
window.formatDate = formatDate;
window.getListingById = getListingById;
window.getFeaturedListings = getFeaturedListings;
window.getRecentListings = getRecentListings;
window.buildWhatsAppLink = buildWhatsAppLink;
