/**
 * Student Marketplace – Sample Data (Phase 1)
 * All content is DEMO. WhatsApp numbers are fictional.
 */

const MARKETPLACE_CONFIG = {
  siteName: "Student Marketplace",
  university: "Tshwane University of Technology (TUT)",
  currency: "R",
  demoWhatsApp: "27820000000",
  demoWhatsAppNote: "Demo contact only – real seller details in Phase 2"
};

const CATEGORIES = [
  { id: "fashion", name: "Fashion & Clothing", slug: "fashion", icon: "👕" },
  { id: "electronics", name: "Electronics & Gadgets", slug: "electronics", icon: "💻" },
  { id: "books", name: "Books & Stationery", slug: "books", icon: "📚" },
  { id: "food", name: "Food & Groceries", slug: "food", icon: "🍎" },
  { id: "beauty", name: "Beauty & Personal Care", slug: "beauty", icon: "🧴" },
  { id: "accommodation", name: "Home & Accommodation", slug: "accommodation", icon: "🛏️" },
  { id: "sports", name: "Sports & Fitness", slug: "sports", icon: "⚽" },
  { id: "accessories", name: "Accessories", slug: "accessories", icon: "🎧" },
  { id: "other", name: "Other", slug: "other", icon: "📦" }
];

const CONDITIONS = [
  { id: "brand-new", label: "Brand New" },
  { id: "like-new", label: "Like New" },
  { id: "good", label: "Good" },
  { id: "fair", label: "Fair" }
];

const LISTINGS = [
  { id: "tut-001", title: "First Year Accounting Textbook – Complete Set", description: "Full set of first-year Accounting textbooks used at TUT. Includes workbooks and lecture notes.", price: 450, category: "books", condition: "like-new", images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80"], sellerName: "Thabo M.", campus: "Pretoria Campus", datePosted: "2026-11-18", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: true, status: "active", verified: false },
  { id: "tut-002", title: "HP Pavilion 15 Laptop – 8GB RAM, 256GB SSD", description: "Reliable student laptop in excellent condition. Perfect for assignments and online lectures.", price: 4200, category: "electronics", condition: "good", images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80"], sellerName: "Lerato K.", campus: "Pretoria Campus", datePosted: "2026-11-17", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: true, status: "active", verified: false },
  { id: "tut-003", title: "Nike Air Force 1 Sneakers – Size 8 (UK)", description: "Classic white Nike Air Force 1s. Worn only a few times.", price: 850, category: "fashion", condition: "like-new", images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80"], sellerName: "Sipho D.", campus: "Soshanguve Campus", datePosted: "2026-11-16", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: false, status: "active", verified: false },
  { id: "tut-004", title: "Study Desk with Drawer – Compact & Sturdy", description: "Solid wooden study desk with one drawer. Perfect size for a student room.", price: 650, category: "accommodation", condition: "good", images: ["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80"], sellerName: "Naledi P.", campus: "Pretoria Campus", datePosted: "2026-11-15", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: true, status: "active", verified: false },
  { id: "tut-005", title: "Sony WH-1000XM4 Noise Cancelling Headphones", description: "Industry-leading noise cancellation. Great for focusing in residences or libraries.", price: 2800, category: "accessories", condition: "good", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"], sellerName: "Kagiso T.", campus: "Pretoria Campus", datePosted: "2026-11-14", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: false, status: "active", verified: false },
  { id: "tut-006", title: "Engineering Mathematics Textbook (3rd Year)", description: "Advanced Engineering Mathematics textbook used in TUT engineering modules.", price: 380, category: "books", condition: "good", images: ["https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&q=80"], sellerName: "Amahle N.", campus: "Soshanguve Campus", datePosted: "2026-11-13", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: false, status: "active", verified: false },
  { id: "tut-007", title: "Samsung Galaxy A54 – 128GB (Unlocked)", description: "Well-looked-after phone. Screen protector and case included.", price: 3100, category: "electronics", condition: "like-new", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80"], sellerName: "Tumi S.", campus: "Pretoria Campus", datePosted: "2026-11-12", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: true, status: "active", verified: false },
  { id: "tut-008", title: "Single Bed Frame + Mattress (Student Size)", description: "Sturdy single bed frame with a comfortable foam mattress.", price: 1200, category: "accommodation", condition: "good", images: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"], sellerName: "Boitumelo R.", campus: "Pretoria Campus", datePosted: "2026-11-11", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: false, status: "active", verified: false },
  { id: "tut-009", title: "Adidas Tracksuit – Full Set (Medium)", description: "Black Adidas tracksuit top and pants. Worn a handful of times.", price: 550, category: "fashion", condition: "like-new", images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"], sellerName: "Karabo M.", campus: "Soshanguve Campus", datePosted: "2026-11-10", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: false, status: "active", verified: false },
  { id: "tut-010", title: "Yoga Mat + Resistance Bands Set", description: "Thick non-slip yoga mat and a full set of resistance bands.", price: 320, category: "sports", condition: "brand-new", images: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80"], sellerName: "Zanele H.", campus: "Pretoria Campus", datePosted: "2026-11-09", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: false, status: "active", verified: false },
  { id: "tut-011", title: "Skincare Bundle – Cleanser, Moisturiser & Sunscreen", description: "Popular student-friendly skincare set. Most products still more than half full.", price: 280, category: "beauty", condition: "good", images: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"], sellerName: "Palesa L.", campus: "Pretoria Campus", datePosted: "2026-11-08", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: false, status: "active", verified: false },
  { id: "tut-012", title: "Scientific Calculator (Casio fx-991EX)", description: "Advanced scientific calculator allowed in most TUT exams.", price: 450, category: "books", condition: "like-new", images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80"], sellerName: "Mpho V.", campus: "Soshanguve Campus", datePosted: "2026-11-07", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: false, status: "active", verified: false },
  { id: "tut-013", title: "Wireless Mouse + Keyboard Combo", description: "Quiet wireless mouse and compact keyboard.", price: 380, category: "electronics", condition: "good", images: ["https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80"], sellerName: "Johan B.", campus: "Pretoria Campus", datePosted: "2026-11-06", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: false, status: "active", verified: false },
  { id: "tut-014", title: "Desk Lamp with USB Charging Port", description: "Modern LED desk lamp with adjustable brightness and USB port.", price: 220, category: "accommodation", condition: "brand-new", images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80"], sellerName: "Nomsa G.", campus: "Pretoria Campus", datePosted: "2026-11-05", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: false, status: "active", verified: false },
  { id: "tut-015", title: "Canvas Backpack – Laptop Compartment", description: "Durable canvas backpack with padded laptop sleeve.", price: 350, category: "accessories", condition: "like-new", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"], sellerName: "Andile C.", campus: "Soshanguve Campus", datePosted: "2026-11-04", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: false, status: "active", verified: false },
  { id: "tut-016", title: "Mini Fridge – Perfect for Residence", description: "Compact bar fridge that fits easily in a student room.", price: 950, category: "other", condition: "good", images: ["https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80"], sellerName: "Fatima A.", campus: "Pretoria Campus", datePosted: "2026-11-03", whatsapp: MARKETPLACE_CONFIG.demoWhatsApp, featured: true, status: "active", verified: false }
];

const SERVICES = [
  { id: "svc-01", name: "Hair Braiding & Styling", provider: "Zinhle Beauty", description: "Professional braiding, weaves and natural hair styling for students.", priceFrom: 150, category: "beauty", location: "Pretoria Campus area", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80", availability: "Weekends & evenings" },
  { id: "svc-02", name: "Maths & Accounting Tutoring", provider: "Thabo Tutors", description: "One-on-one and small group tutoring for first and second year modules.", priceFrom: 120, category: "tutoring", location: "Pretoria / Online", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80", availability: "Mon–Fri afternoons" },
  { id: "svc-03", name: "Event & Portrait Photography", provider: "Lens by Naledi", description: "Student events, graduation, CV and social media portraits.", priceFrom: 300, category: "photography", location: "TUT campuses", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80", availability: "By appointment" },
  { id: "svc-04", name: "Graphic Design & Posters", provider: "Studio K", description: "Flyers, social media graphics, logos and presentation design.", priceFrom: 200, category: "design", location: "Remote / Pretoria", image: "https://images.unsplash.com/photo-1626785774573-4b7993143466?w=600&q=80", availability: "3–5 day delivery" },
  { id: "svc-05", name: "Phone Screen & Battery Repairs", provider: "FixIt Campus", description: "Affordable phone repairs for common models. Same-day when parts available.", priceFrom: 250, category: "repairs", location: "Near Soshanguve Campus", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80", availability: "Mon–Sat 9:00–17:00" },
  { id: "svc-06", name: "Room Cleaning (Res)", provider: "CleanStay", description: "Basic cleaning for student rooms and shared flats.", priceFrom: 180, category: "cleaning", location: "Pretoria residences", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80", availability: "Weekends" }
];

const OPPORTUNITIES = [
  { id: "opp-01", title: "Part-time Library Assistant", type: "Part-time job", description: "Support library operations. Ideal for organised students.", deadline: "2026-12-15", eligibility: "Current TUT student", location: "Pretoria Campus", demo: true },
  { id: "opp-02", title: "Engineering Internship (Demo)", type: "Internship", description: "Sample internship listing for demonstration only.", deadline: "2027-01-31", eligibility: "Engineering students (2nd year+)", location: "Gauteng", demo: true },
  { id: "opp-03", title: "Student Entrepreneur Bursary (Sample)", type: "Bursary", description: "Demonstration bursary card. No real application is open.", deadline: "2026-12-31", eligibility: "Registered TUT students", location: "National", demo: true },
  { id: "opp-04", title: "Campus Brand Ambassador", type: "Part-time job", description: "Represent student brands on campus. Flexible hours.", deadline: "Rolling", eligibility: "All years", location: "TUT campuses", demo: true },
  { id: "opp-05", title: "Graduate Programme Preview", type: "Graduate programme", description: "Sample graduate programme listing for UI demonstration.", deadline: "2027-02-28", eligibility: "Final year / recent graduates", location: "Johannesburg / Pretoria", demo: true }
];

const CAMPUS_UPDATES = [
  { id: "cc-01", title: "Welcome Week activities", type: "Event", summary: "Sample campus event preview.", date: "2026-11-25" },
  { id: "cc-02", title: "Student business spotlight", type: "Spotlight", summary: "Demonstration spotlight for student-owned businesses.", date: "2026-11-20" },
  { id: "cc-03", title: "Exam preparation workshop", type: "Education", summary: "Sample educational opportunity card.", date: "2026-11-28" }
];

function getCategoryById(id) { return CATEGORIES.find(c => c.id === id) || { name: "Other", icon: "📦" }; }
function getConditionLabel(id) { const c = CONDITIONS.find(x => x.id === id); return c ? c.label : id; }
function formatPrice(amount) { return "R" + Number(amount).toLocaleString("en-ZA"); }
function formatDate(dateStr) { return new Date(dateStr).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }); }
function getListingById(id) { return LISTINGS.find(l => l.id === id) || null; }
function getFeaturedListings() { return LISTINGS.filter(l => l.featured && l.status === "active").slice(0, 6); }
function getRecentListings(limit) { limit = limit || 8; return LISTINGS.filter(l => l.status === "active").sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted)).slice(0, limit); }
function buildWhatsAppLink(phone, message) { const clean = (phone || MARKETPLACE_CONFIG.demoWhatsApp).replace(/\D/g, ""); const text = encodeURIComponent(message || "Hi, I’m interested in your item on Student Marketplace."); return "https://wa.me/" + clean + "?text=" + text; }
function getServiceById(id) { return SERVICES.find(s => s.id === id) || null; }

window.MARKETPLACE_CONFIG = MARKETPLACE_CONFIG;
window.CATEGORIES = CATEGORIES;
window.CONDITIONS = CONDITIONS;
window.LISTINGS = LISTINGS;
window.SERVICES = SERVICES;
window.OPPORTUNITIES = OPPORTUNITIES;
window.CAMPUS_UPDATES = CAMPUS_UPDATES;
window.getCategoryById = getCategoryById;
window.getConditionLabel = getConditionLabel;
window.formatPrice = formatPrice;
window.formatDate = formatDate;
window.getListingById = getListingById;
window.getFeaturedListings = getFeaturedListings;
window.getRecentListings = getRecentListings;
window.buildWhatsAppLink = buildWhatsAppLink;
window.getServiceById = getServiceById;
