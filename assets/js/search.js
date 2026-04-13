/**
 * The Pulse — Search
 * Fully automated client-side search powered by /search.json
 * Generated automatically by Jekyll on every build.
 */
(function () {
  'use strict';

  var searchInput   = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');
  var searchInfo    = document.getElementById('search-info');
  var searchIdle    = document.getElementById('search-idle');

  if (!searchInput || !searchResults) return;

  var searchData = [];
  var currentQuery = '';

  // ── Resolve the search.json URL from the page's origin ──────────────────
  var jsonUrl = (window.location.origin || '') + '/search.json';

  // ── Load index ───────────────────────────────────────────────────────────
  fetch(jsonUrl)
    .then(function (res) {
      if (!res.ok) throw new Error('search.json not found');
      return res.json();
    })
    .then(function (data) {
      searchData = data;
      // Run search if query param present on page load
      var params = new URLSearchParams(window.location.search);
      var q = params.get('q') || '';
      if (q) {
        searchInput.value = q;
        runSearch(q);
      }
    })
    .catch(function () {
      // Silently fail — search just won't work without the index
    });

  // ── Live search as user types ────────────────────────────────────────────
  searchInput.addEventListener('input', debounce(function () {
    var query = searchInput.value.trim();
    pushState(query);
    runSearch(query);
  }, 220));

  // ── Form submit (keyboard Enter / button click) ──────────────────────────
  var form = document.getElementById('search-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var query = searchInput.value.trim();
      pushState(query);
      runSearch(query);
    });
  }

  // ── Core search ──────────────────────────────────────────────────────────
  function runSearch(query) {
    currentQuery = query;

    if (!query || query.length < 2) {
      searchResults.innerHTML = '';
      if (searchInfo) searchInfo.textContent = '';
      showIdle(true);
      return;
    }

    showIdle(false);

    var q = query.toLowerCase().trim();
    var tokens = q.split(/\s+/).filter(Boolean);

    var results = searchData.filter(function (item) {
      return tokens.every(function (token) {
        return matchesToken(item, token);
      });
    });

    // Sort: posts first, then pages, then authors
    results.sort(function (a, b) {
      var order = { post: 0, page: 1, author: 2 };
      return (order[a.type] || 9) - (order[b.type] || 9);
    });

    renderResults(results, query);
  }

  function matchesToken(item, token) {
    var fields = [
      item.title,
      item.excerpt,
      item.content,
      item.author,
      Array.isArray(item.categories) ? item.categories.join(' ') : (item.categories || ''),
      Array.isArray(item.tags) ? item.tags.join(' ') : (item.tags || '')
    ];
    return fields.some(function (f) {
      return f && f.toLowerCase().includes(token);
    });
  }

  // ── Render ────────────────────────────────────────────────────────────────
  function renderResults(results, query) {
    // Status line
    if (searchInfo) {
      if (results.length > 0) {
        searchInfo.innerHTML =
          'Found <strong>' + results.length + '</strong> result' +
          (results.length !== 1 ? 's' : '') +
          ' for <strong>\u201c' + escapeHtml(query) + '\u201d</strong>';
      } else {
        searchInfo.textContent = '';
      }
    }

    if (results.length === 0) {
      searchResults.innerHTML =
        '<div class="search-no-results">' +
          '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>' +
          '<p class="search-no-results-title">No results for \u201c' + escapeHtml(query) + '\u201d</p>' +
          '<p class="search-no-results-hint">Try different keywords, check spelling, or <a href="/blog/">browse all articles</a>.</p>' +
        '</div>';
      return;
    }

    var html = results.map(function (item) {
      return renderCard(item, query);
    }).join('');

    searchResults.innerHTML = '<div class="search-results-list" role="list">' + html + '</div>';
  }

  function renderCard(item, query) {
    var typeBadge = typeLabel(item.type);
    var cats = '';
    if (item.type === 'post' && Array.isArray(item.categories) && item.categories.length) {
      cats = item.categories.slice(0, 2).map(function (c) {
        return '<a href="/category/' + slugify(c) + '/" class="category-badge">' + capitalize(c) + '</a>';
      }).join(' ');
    }

    var title   = highlight(item.title || 'Untitled', query);
    var excerpt = highlight(item.excerpt || '', query);
    var meta    = [];
    if (item.date)   meta.push('<time datetime="' + escapeHtml(item.date_iso || '') + '">' + escapeHtml(item.date) + '</time>');
    if (item.author) meta.push('<span>' + escapeHtml(item.author) + '</span>');

    return (
      '<article class="search-result-item" role="listitem">' +
        '<div class="search-result-badges">' +
          typeBadge +
          (cats ? '<span class="search-result-cats">' + cats + '</span>' : '') +
        '</div>' +
        '<h2 class="search-result-title"><a href="' + escapeHtml(item.url) + '">' + title + '</a></h2>' +
        (excerpt ? '<p class="search-result-excerpt">' + excerpt + '</p>' : '') +
        (meta.length ? '<div class="search-result-meta">' + meta.join('') + '</div>' : '') +
      '</article>'
    );
  }

  function typeLabel(type) {
    var labels = {
      post:   { text: 'Article',  cls: 'search-type-post'   },
      page:   { text: 'Page',     cls: 'search-type-page'   },
      author: { text: 'Author',   cls: 'search-type-author' }
    };
    var l = labels[type] || { text: type || 'Item', cls: 'search-type-page' };
    return '<span class="search-type-badge ' + l.cls + '">' + l.text + '</span>';
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function highlight(text, query) {
    if (!text || !query) return escapeHtml(text || '');
    var escaped = escapeHtml(text);
    var tokens = query.trim().split(/\s+/).filter(Boolean);
    tokens.forEach(function (token) {
      var re = new RegExp('(' + escapeRegex(token) + ')', 'gi');
      escaped = escaped.replace(re, '<mark class="search-highlight">$1</mark>');
    });
    return escaped;
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function slugify(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  function showIdle(show) {
    if (!searchIdle) return;
    searchIdle.style.display = show ? '' : 'none';
    searchIdle.setAttribute('aria-hidden', show ? 'false' : 'true');
  }

  function pushState(query) {
    try {
      var url = new URL(window.location.href);
      if (query) {
        url.searchParams.set('q', query);
      } else {
        url.searchParams.delete('q');
      }
      window.history.replaceState({}, '', url.toString());
    } catch (e) { /* ignore */ }
  }

  function debounce(fn, delay) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

})();
