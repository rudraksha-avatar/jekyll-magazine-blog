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
  // Search Functionality
  // ============================================================
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchInfo = document.getElementById('search-info');

  if (searchInput && searchResults) {
    let searchData = [];

    // Load search index
    fetch('/search.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        searchData = data;
        // If there's a query param on load, run search
        const params = new URLSearchParams(window.location.search);
        const q = params.get('q');
        if (q) {
          searchInput.value = q;
          runSearch(q);
        }
      })
      .catch(function () {
        // Search index not available
      });

    searchInput.addEventListener('input', debounce(function () {
      const query = searchInput.value.trim();
      // Update URL without reload
      const url = new URL(window.location);
      if (query) {
        url.searchParams.set('q', query);
      } else {
        url.searchParams.delete('q');
      }
      window.history.replaceState({}, '', url);
      runSearch(query);
    }, 250));

    function runSearch(query) {
      if (!query || query.length < 2) {
        searchResults.innerHTML = '';
        if (searchInfo) searchInfo.textContent = '';
        return;
      }

      const q = query.toLowerCase();
      const results = searchData.filter(function (item) {
        return (
          (item.title && item.title.toLowerCase().includes(q)) ||
          (item.excerpt && item.excerpt.toLowerCase().includes(q)) ||
          (item.categories && item.categories.toLowerCase().includes(q)) ||
          (item.tags && item.tags.toLowerCase().includes(q)) ||
          (item.content && item.content.toLowerCase().includes(q))
        );
      });

      renderResults(results, query);
    }

    function renderResults(results, query) {
      if (searchInfo) {
        searchInfo.innerHTML = results.length > 0
          ? 'Found <strong>' + results.length + '</strong> result' + (results.length !== 1 ? 's' : '') + ' for <strong>"' + escapeHtml(query) + '"</strong>'
          : '';
      }

      if (results.length === 0) {
        searchResults.innerHTML =
          '<div class="search-no-results">' +
          '<p>No results found for <strong>"' + escapeHtml(query) + '"</strong></p>' +
          '<p>Try different keywords or browse our <a href="/blog/">latest articles</a>.</p>' +
          '</div>';
        return;
      }

      const html = results.map(function (item) {
        const excerpt = highlight(item.excerpt || '', query);
        const title = highlight(item.title || '', query);
        const cats = item.categories ? item.categories.split(',').map(function (c) {
          return '<a href="/category/' + slugify(c.trim()) + '/" class="category-badge">' + capitalize(c.trim()) + '</a>';
        }).join(' ') : '';

        return '<div class="search-result-item">' +
          (cats ? '<div class="search-result-category">' + cats + '</div>' : '') +
          '<h2 class="search-result-title"><a href="' + item.url + '">' + title + '</a></h2>' +
          (excerpt ? '<p class="search-result-excerpt">' + excerpt + '</p>' : '') +
          '<div class="search-result-meta">' +
          (item.date ? '<span>' + item.date + '</span>' : '') +
          (item.author ? '<span>By ' + escapeHtml(item.author) + '</span>' : '') +
          '</div>' +
          '</div>';
      }).join('');

      searchResults.innerHTML = '<div class="search-results-list">' + html + '</div>';
    }

    function highlight(text, query) {
      if (!text || !query) return escapeHtml(text);
      const escaped = escapeHtml(text);
      const re = new RegExp('(' + escapeRegex(query) + ')', 'gi');
      return escaped.replace(re, '<mark class="search-highlight">$1</mark>');
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function escapeRegex(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function slugify(str) {
      return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }

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
      this.src = '/assets/images/default-post.jpg';
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
