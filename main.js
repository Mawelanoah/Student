/**
 * Student Marketplace – Main shared JavaScript
 * Handles mobile navigation, image fallbacks, and common UI behaviour.
 * Phase 1 – Client-side only.
 */

(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     Mobile Navigation
     ---------------------------------------------------------------------- */
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

    // Close when a link is clicked
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        body.style.overflow = "";
      });
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        mobileNav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        body.style.overflow = "";
      }
    });
  }

  /* ----------------------------------------------------------------------
     Image fallback handling
     ---------------------------------------------------------------------- */
  function initImageFallbacks() {
    document.querySelectorAll("img[data-fallback]").forEach(function (img) {
      img.addEventListener("error", function () {
        const fallback = img.getAttribute("data-fallback") || "";
        if (fallback && img.src !== fallback) {
          img.src = fallback;
        } else {
          // Final fallback: show a neutral placeholder
          img.style.display = "none";
          const parent = img.parentElement;
          if (parent && !parent.querySelector(".img-fallback")) {
            const placeholder = document.createElement("div");
            placeholder.className = "img-fallback";
            placeholder.style.width = "100%";
            placeholder.style.height = "100%";
            placeholder.style.minHeight = "120px";
            placeholder.textContent = "No image";
            parent.appendChild(placeholder);
          }
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     Header search (homepage + marketplace redirect)
     ---------------------------------------------------------------------- */
  function initHeaderSearch() {
    const form = document.querySelector(".header-search-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = form.querySelector("input[name='q']");
      const query = (input && input.value.trim()) || "";
      if (query) {
        window.location.href = "marketplace.html?q=" + encodeURIComponent(query);
      } else {
        window.location.href = "marketplace.html";
      }
    });
  }

  /* ----------------------------------------------------------------------
     Hero search
     ---------------------------------------------------------------------- */
  function initHeroSearch() {
    const form = document.querySelector(".hero-search-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = form.querySelector("input[name='q']");
      const query = (input && input.value.trim()) || "";
      if (query) {
        window.location.href = "marketplace.html?q=" + encodeURIComponent(query);
      } else {
        window.location.href = "marketplace.html";
      }
    });
  }

  /* ----------------------------------------------------------------------
     Active nav highlighting
     ---------------------------------------------------------------------- */
  function setActiveNav() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-desktop a, .nav-mobile a").forEach(function (link) {
      const href = link.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        link.classList.add("active");
      }
    });
  }

  /* ----------------------------------------------------------------------
     Render product cards (shared helper)
     ---------------------------------------------------------------------- */
  window.renderProductCard = function (listing) {
    if (!listing) return "";

    const category = window.getCategoryById(listing.category);
    const conditionLabel = window.getConditionLabel(listing.condition);
    const price = window.formatPrice(listing.price);
    const imageUrl = (listing.images && listing.images[0]) || "";
    const fallback = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400&q=60";

    return `
      <article class="product-card">
        <a href="product.html?id=${encodeURIComponent(listing.id)}" class="product-card-image" aria-label="${escapeHtml(listing.title)}">
          <img
            src="${imageUrl}"
            alt="${escapeHtml(listing.title)}"
            loading="lazy"
            data-fallback="${fallback}"
            width="400"
            height="400"
          >
        </a>
        <div class="product-card-body">
          <div class="product-card-meta">
            <span class="badge badge-condition">${escapeHtml(conditionLabel)}</span>
            ${listing.featured ? '<span class="badge badge-featured">Featured</span>' : ""}
          </div>
          <h3 class="product-card-title">
            <a href="product.html?id=${encodeURIComponent(listing.id)}">${escapeHtml(listing.title)}</a>
          </h3>
          <div class="product-card-price">${price}</div>
          <div class="product-card-meta">
            <span>${escapeHtml(category.name)}</span>
            <span>${window.formatDate(listing.datePosted)}</span>
          </div>
        </div>
      </article>
    `;
  };

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  window.escapeHtml = escapeHtml;

  /* ----------------------------------------------------------------------
     Initialise everything on DOM ready
     ---------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initImageFallbacks();
    initHeaderSearch();
    initHeroSearch();
    setActiveNav();
  });
})();
