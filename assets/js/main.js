/**
 * The Pulse - Main JavaScript
 * Minimal, performance-focused scripts
 */

(function () {
  'use strict';

  // ============================================================
  // Mobile Navigation Toggle
  // ============================================================
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !siteNav.contains(e.target)) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close nav on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // ============================================================
  // Search
  // Search logic lives in assets/js/search.js which is loaded
  // only on the search page — keeping main.js lean.
  // ============================================================

  // ============================================================
  // Debounce utility
  // ============================================================
  function debounce(fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  // ============================================================
  // Lazy image fallback
  // ============================================================
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      this.src = 'https://placehold.co/800x450/e5e7eb/6b7280?text=Image+Not+Found';
      this.alt = 'Image not available';
    });
  });

  // ============================================================
  // Smooth scroll for anchor links
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
