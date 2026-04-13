/**
 * The Pulse - Main JavaScript
 * Minimal, performance-focused scripts
 */

(function () {
  'use strict';

  // ============================================================
  // Mobile Navigation Toggle
  // ============================================================
  var navToggle = document.getElementById('nav-toggle');
  var siteNav   = document.getElementById('site-nav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = siteNav.classList.toggle('is-open');
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
  // Lazy image fallback
  // ============================================================
  document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
    img.addEventListener('error', function () {
      if (!this.dataset.errored) {
        this.dataset.errored = '1';
        this.src = 'https://placehold.co/800x450/e5e7eb/6b7280?text=Image+Not+Found';
        this.alt = 'Image not available';
      }
    });
  });

  // ============================================================
  // Smooth scroll for anchor links (respects prefers-reduced-motion)
  // ============================================================
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  // ============================================================
  // Active nav link highlighting
  // ============================================================
  var currentPath = window.location.pathname;
  document.querySelectorAll('.nav-item a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href !== '/' && currentPath.indexOf(href) === 0) {
      link.closest('.nav-item').classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

})();
