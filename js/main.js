(function () {
  "use strict";
  function initMobileNav() {
    const toggle = document.querySelector(".menu-toggle");
    const mobileNav = document.querySelector(".nav-mobile");
    const body = document.body;
    if (!toggle || !mobileNav) return;
    toggle.addEventListener("click", function () {
      const isOpen = mobileNav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      body.style.overflow = isOpen ? "hidden" : "";
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        body.style.overflow = "";
      });
    });
  }
  function initImageFallbacks() {
    document.querySelectorAll("img[data-fallback]").forEach(function (img) {
      img.addEventListener("error", function () {
        const fallback = img.getAttribute("data-fallback") || "";
        if (fallback && img.src !== fallback) img.src = fallback;
      });
    });
  }
  function initHeaderSearch() {
    const form = document.querySelector(".header-search-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = form.querySelector("input[name='q']");
      const q = (input && input.value.trim()) || "";
      window.location.href = "marketplace.html" + (q ? "?q=" + encodeURIComponent(q) : "");
    });
  }
  function initHeroSearch() {
    const form = document.querySelector(".hero-search-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = form.querySelector("input[name='q']");
      const q = (input && input.value.trim()) || "";
      window.location.href = "marketplace.html" + (q ? "?q=" + encodeURIComponent(q) : "");
    });
  }
  function setActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-desktop a, .nav-mobile a").forEach(function (link) {
      if (link.getAttribute("href") === path) link.classList.add("active");
    });
  }
  function updateWishlistBadge() {
    const el = document.querySelector("[data-wishlist-count]");
    if (el && window.Wishlist) {
      const n = window.Wishlist.count();
      el.textContent = n > 0 ? String(n) : "";
      el.style.display = n > 0 ? "inline-flex" : "none";
    }
  }
  window.escapeHtml = function (text) {
    const div = document.createElement("div");
    div.textContent = text == null ? "" : String(text);
    return div.innerHTML;
  };
  window.renderProductCard = function (listing) {
    if (!listing) return "";
    const category = window.getCategoryById(listing.category);
    const conditionLabel = window.getConditionLabel(listing.condition);
    const price = window.formatPrice(listing.price);
    const imageUrl = (listing.images && listing.images[0]) || "";
    const fallback = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400&q=60";
    const inWish = window.Wishlist && window.Wishlist.has(listing.id);
    const heart = inWish ? "♥" : "♡";
    return '<article class="product-card" data-id="' + listing.id + '"><a href="product.html?id=' + encodeURIComponent(listing.id) + '" class="product-card-image" aria-label="' + window.escapeHtml(listing.title) + '"><img src="' + imageUrl + '" alt="' + window.escapeHtml(listing.title) + '" loading="lazy" data-fallback="' + fallback + '" width="400" height="400"></a><div class="product-card-body"><div class="product-card-meta"><span class="badge badge-condition">' + window.escapeHtml(conditionLabel) + '</span>' + (listing.featured ? '<span class="badge badge-featured">Featured</span>' : '') + '</div><h3 class="product-card-title"><a href="product.html?id=' + encodeURIComponent(listing.id) + '">' + window.escapeHtml(listing.title) + '</a></h3><div class="product-card-price">' + price + '</div><div class="product-card-meta"><span>' + window.escapeHtml(listing.sellerName) + '</span><span>' + window.escapeHtml(listing.campus) + '</span></div><div style="display:flex;gap:0.5rem;margin-top:0.5rem;"><a href="product.html?id=' + encodeURIComponent(listing.id) + '" class="btn btn-outline btn-sm" style="flex:1;">View</a><button type="button" class="btn btn-ghost btn-sm wishlist-btn" data-wish-id="' + listing.id + '" aria-label="Toggle wishlist" style="min-width:44px;">' + heart + '</button></div></div></article>';
  };
  function bindWishlistButtons(root) {
    (root || document).querySelectorAll(".wishlist-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!window.Wishlist) return;
        const id = btn.getAttribute("data-wish-id");
        const added = window.Wishlist.toggle(id);
        btn.textContent = added ? "♥" : "♡";
        updateWishlistBadge();
      });
    });
  }
  window.bindWishlistButtons = bindWishlistButtons;
  window.updateWishlistBadge = updateWishlistBadge;
  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initImageFallbacks();
    initHeaderSearch();
    initHeroSearch();
    setActiveNav();
    updateWishlistBadge();
    bindWishlistButtons(document);
  });
})();
