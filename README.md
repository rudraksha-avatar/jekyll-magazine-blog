# The Pulse — Jekyll Magazine & Blog

A production-ready Jekyll magazine/blog website. Fully automated, 100% responsive, SEO-optimized, accessibility-friendly, and ads-ready.

---

## Project Structure

```
.
├── _config.yml              # Site configuration, plugins, defaults
├── Gemfile                  # Ruby dependencies
├── .gitignore
├── robots.txt               # Crawl rules (Liquid-processed)
├── ads.txt                  # Authorized Digital Sellers (AdSense)
├── index.html               # Homepage
├── 404.html                 # 404 error page
├── search.json              # Auto-generated search index
├── FOLLOW_IT_SETUP.md       # Follow.it newsletter setup guide
│
├── _data/
│   ├── integrations.yml     # ← ALL Google IDs and enable/disable switches
│   ├── authors.yml
│   ├── navigation.yml
│   └── settings.yml
│
├── _layouts/
│   ├── default.html         # Base HTML shell (wires in all integrations)
│   ├── home.html
│   ├── post.html
│   ├── page.html
│   ├── blog.html
│   ├── category.html
│   ├── tag.html
│   └── author.html
│
├── _includes/
│   ├── head-integrations.html   # Master include — calls all head includes
│   ├── head-analytics.html      # Google Analytics 4 (GA4)
│   ├── head-gtm.html            # Google Tag Manager <head> snippet
│   ├── body-gtm.html            # Google Tag Manager <body> noscript
│   ├── head-adsense.html        # Google AdSense global script
│   ├── head-verification.html   # Site verification meta tags
│   └── ...                      # other includes
│
│   ├── header.html          # Site header & nav
│   ├── footer.html          # Site footer
│   ├── sidebar.html         # Sidebar widgets
│   ├── post_card.html       # Standard post card
│   ├── post_card_featured.html  # Featured post card
│   ├── category_section.html    # Homepage category block
│   ├── breadcrumbs.html     # Breadcrumb nav
│   ├── pagination.html      # Pagination component
│   ├── author_box.html      # Author bio box
│   ├── related_posts.html   # Related posts section
│   ├── post_navigation.html # Prev/next post links
│   ├── share_buttons.html   # Social share buttons
│   ├── reading_time.html    # Reading time estimate
│   ├── newsletter.html      # Newsletter section (Follow.it)
│   ├── subscribe_inline.html    # Inline post subscribe CTA
│   ├── cat_url.html         # Category URL helper
│   └── tag_url.html         # Tag URL helper
│
├── _data/
│   ├── authors.yml          # Author profiles
│   ├── navigation.yml       # Header & footer nav links
│   └── settings.yml         # Site-wide feature toggles
│
├── _posts/                  # Blog posts (YYYY-MM-DD-slug.md)
├── _pages/                  # Static pages (about, contact, policy, search)
├── _layouts/                # Page layouts
│
├── _sass/
│   ├── _variables.scss      # Design tokens (colors, spacing, type)
│   ├── _base.scss           # Reset & base styles
│   ├── _prose.scss          # Content typography system
│   ├── _layout.scss         # Header, footer, grid layouts
│   ├── _components.scss     # Cards, badges, pagination, etc.
│   ├── _article.scss        # Post/page specific styles
│   ├── _home.scss           # Homepage-specific styles
│   ├── _search.scss         # Search page styles
│   └── _utilities.scss      # Utility classes
│
├── assets/
│   ├── css/main.scss        # SCSS entry point
│   ├── js/
│   │   ├── main.js          # Nav toggle, smooth scroll, image fallback
│   │   └── search.js        # Client-side search engine
│   ├── images/              # Site images
│   └── site.webmanifest     # PWA manifest
│
├── author/                  # Author archive pages (one per author)
└── blog/index.html          # Blog listing entry point
```

---

## Local Setup

### Prerequisites

- Ruby 3.0+ (`ruby -v`)
- Bundler (`gem install bundler`)

### Install & Run

```bash
# Clone the repo
git clone https://github.com/yourusername/the-pulse.git
cd the-pulse

# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve --livereload

# Build for production
bundle exec jekyll build
```

The site will be available at `http://localhost:4000`.

---

## Adding Content

### Add a Post

Create a file in `_posts/` named `YYYY-MM-DD-your-post-slug.md`:

```markdown
---
layout: post
title: "Your Post Title"
description: "A 1–2 sentence description for SEO and post cards."
date: 2025-05-01
last_modified_at: 2025-05-02
categories: [technology]
tags: [ai, productivity]
author: sarah_chen
image: https://example.com/your-image.jpg
image_alt: "Descriptive alt text for the image"
featured: false
toc: true
---

Your post content here in Markdown.
```

**Available front matter fields:**

| Field | Required | Description |
|---|---|---|
| `title` | Yes | Post title |
| `description` | Recommended | SEO description, shown in cards |
| `date` | Yes | Publication date |
| `last_modified_at` | No | Last update date |
| `categories` | Recommended | Array of categories (lowercase) |
| `tags` | Recommended | Array of tags (lowercase, hyphenated) |
| `author` | No | Author key from `_data/authors.yml` |
| `image` | No | Featured image URL |
| `image_alt` | No | Image alt text |
| `featured` | No | `true` to show in hero section |
| `toc` | No | `true` to show table of contents |
| `noindex` | No | `true` to exclude from search engines |

### Add a Category

Categories are **automatic** — just use them in post front matter. Archive pages are generated by `jekyll-paginate-v2` autopages at `/category/your-category/`.

To add a description for a category, edit `_config.yml`:

```yaml
category_descriptions:
  your-category: "Description shown on the category archive page."
```

To show a category section on the homepage, add it to `featured_categories` in `_config.yml`:

```yaml
featured_categories:
  - technology
  - culture
  - your-category
```

### Add a Tag

Tags are **automatic** — just use them in post front matter. Archive pages are generated at `/tag/your-tag/`.

### Add an Author

1. Add the author to `_data/authors.yml`:

```yaml
your_author_key:
  name: "your_author_key"
  display_name: "Author Full Name"
  bio: "Short bio for the author box and author archive page."
  avatar: "https://example.com/avatar.jpg"
  role: "Job Title"
  email: ""
  website: "https://example.com"
  social:
    twitter: "twitterhandle"
    linkedin: "linkedinhandle"
```

2. Create an author archive page in `author/`:

```html
---
layout: author
title: "Author Full Name"
author_key: your_author_key
description: "Articles by Author Full Name."
permalink: /author/your_author_key/
---
```

3. Use the author key in post front matter: `author: your_author_key`

---

## Plugins

| Plugin | Purpose |
|---|---|
| `jekyll-feed` | Generates `/feed.xml` RSS feed |
| `jekyll-sitemap` | Generates `/sitemap.xml` |
| `jekyll-seo-tag` | Injects SEO meta, OG, Twitter Card tags |
| `jekyll-paginate-v2` | Pagination + autopages for categories/tags |
| `jekyll-archives` | (Configured but disabled — autopages handles archives) |
| `jekyll-include-cache` | Caches `{% include %}` calls for faster builds |
| `jekyll-last-modified-at` | Tracks `last_modified_at` for posts |
| `jekyll-redirect-from` | Handles URL redirects via front matter |
| `jekyll-toc` | Generates table of contents for posts with `toc: true` |

---

## Search

Search is fully automated — no manual maintenance required.

- `search.json` is generated by Jekyll on every build from all posts, pages, and authors
- `assets/js/search.js` loads the index and runs client-side fuzzy search
- Results are highlighted and sorted (posts first, then pages, then authors)
- URL query params (`?q=term`) are supported for direct linking
- The search page is at `/search/`

---

## Newsletter (Follow.it)

The site uses [Follow.it](https://follow.it) for email subscriptions via RSS.

See `FOLLOW_IT_SETUP.md` for the complete setup guide.

**Quick summary:**
1. Deploy the site so `/feed.xml` is publicly accessible
2. Register your feed at [follow.it/add-feed](https://follow.it/add-feed)
3. Get your form action URL from the Follow.it dashboard
4. Replace the placeholder action URL in:
   - `_includes/newsletter.html`
   - `_includes/sidebar.html`
   - `_includes/subscribe_inline.html`

Toggle all newsletter forms on/off in `_data/settings.yml`:
```yaml
show_newsletter: true
```

---

## Site Settings

Edit `_data/settings.yml` to toggle features:

```yaml
show_reading_time: true      # Show reading time on posts/cards
show_author: true            # Show author on posts
show_date: true              # Show date on posts
show_categories: true        # Show category badges
show_tags: true              # Show tag badges on posts
show_share_buttons: true     # Show social share buttons
show_related_posts: true     # Show related posts section
related_posts_count: 3       # Number of related posts
show_toc: false              # Default TOC state (override per-post)
show_breadcrumbs: true       # Show breadcrumb navigation
show_newsletter: true        # Show newsletter section
show_ad_placeholders: true   # Show ad placeholder blocks
posts_per_page: 9            # Posts per page on archive pages
excerpt_length: 160          # Excerpt word count
```

---

## Customizing Branding & SEO

Edit `_config.yml`:

```yaml
title: "Your Site Name"
tagline: "Your Tagline"
description: "Your site description for SEO."
url: "https://yourdomain.com"

author:
  name: "Your Name"
  email: "hello@yourdomain.com"

organization:
  name: "Your Organization"
  logo: "https://yourdomain.com/assets/images/logo.png"

social:
  twitter: "yourhandle"
  facebook: "yourpage"
  instagram: "yourhandle"
```

Edit `_sass/_variables.scss` to change colors, fonts, and spacing:

```scss
$color-primary:  #1a1a2e;   // Dark navy (header, footer brand)
$color-accent:   #e63946;   // Red (badges, links, CTAs)
$font-sans:      'Inter', sans-serif;
$font-serif:     'Merriweather', serif;
```

---

## GitHub Setup

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create a GitHub repo and push
git remote add origin https://github.com/yourusername/the-pulse.git
git branch -M main
git push -u origin main
```

---

## Cloudflare Pages Deployment

1. Log in to [Cloudflare Pages](https://pages.cloudflare.com)
2. Click **Create a project** → **Connect to Git**
3. Select your GitHub repository
4. Configure the build:

| Setting | Value |
|---|---|
| Framework preset | Jekyll |
| Build command | `bundle exec jekyll build` |
| Build output directory | `_site` |
| Root directory | `/` (leave blank) |

5. Add environment variables:
   - `JEKYLL_ENV` = `production`
   - `RUBY_VERSION` = `3.2.0`

6. Click **Save and Deploy**

Your site will be live at `https://your-project.pages.dev`. Add a custom domain in the Cloudflare Pages settings.

---

## GitHub Pages Deployment

If using GitHub Pages instead:

1. In `_config.yml`, set `baseurl: ""` and `url: "https://yourusername.github.io"`
2. Push to the `main` branch
3. In your GitHub repo → Settings → Pages → Source: **GitHub Actions**
4. Create `.github/workflows/jekyll.yml`:

```yaml
name: Deploy Jekyll site to Pages
on:
  push:
    branches: ["main"]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.2'
          bundler-cache: true
      - run: bundle exec jekyll build
        env:
          JEKYLL_ENV: production
      - uses: actions/upload-pages-artifact@v3
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

---

## Google Integrations

All Google services are managed from a **single file**: `_data/integrations.yml`.

Changing an ID there updates the entire site on the next build. No per-page editing required.

### Where to configure

Open `_data/integrations.yml`:

```yaml
google_analytics:
  enabled: true                    # set to true to activate
  measurement_id: "G-XXXXXXXXXX"  # replace with your GA4 ID

google_tag_manager:
  enabled: false                   # set to true to activate
  container_id: "GTM-XXXXXXX"     # replace with your GTM container ID

google_adsense:
  enabled: true                    # set to true to activate
  publisher_id: "ca-pub-XXXXXXXXXXXXXXXX"  # replace with your publisher ID
  auto_ads: false                  # true = Auto Ads, false = manual units only

verification:
  google: ""                       # paste the content="" value from Search Console
  bing: ""                         # Bing Webmaster Tools verification value
  pinterest: ""                    # Pinterest domain verification value
  yandex: ""                       # Yandex Webmaster verification value
```

### How to get each ID

| Service | Where to get the ID |
|---|---|
| Google Analytics 4 | [analytics.google.com](https://analytics.google.com) → Admin → Data Streams → Measurement ID (`G-...`) |
| Google Tag Manager | [tagmanager.google.com](https://tagmanager.google.com) → Container ID (`GTM-...`) |
| Google AdSense | [adsense.google.com](https://adsense.google.com) → Account → Publisher ID (`ca-pub-...`) |
| Google Search Console | [search.google.com/search-console](https://search.google.com/search-console) → Add property → HTML tag → copy `content=""` value |

### How it works (architecture)

```
_data/integrations.yml          ← single source of truth
        ↓
_includes/head-integrations.html  ← master include (called once)
    ├── head-gtm.html             ← GTM <head> script
    ├── head-analytics.html       ← GA4 global tag
    ├── head-adsense.html         ← AdSense script
    └── head-verification.html    ← verification <meta> tags
        ↓
_layouts/default.html             ← wires everything in
    ├── <head> → {% include head-integrations.html %}
    └── <body> → {% include body-gtm.html %}  (noscript fallback)
```

Every layout inherits from `default.html`, so all pages get the integrations automatically.

### GTM vs GA4 — which to use

- **GA4 only** (`google_analytics.enabled: true`, `google_tag_manager.enabled: false`) — simplest setup, GA4 loads directly.
- **GTM only** (`google_tag_manager.enabled: true`, `google_analytics.enabled: false`) — fire GA4 (and other tags) through GTM. More flexible.
- **Both enabled** — avoid this. It will send duplicate GA4 hits. Use one or the other.

### AdSense Auto Ads vs Manual

- `auto_ads: false` — AdSense script loads but only serves ads where you place `<ins class="adsbygoogle">` elements manually in templates.
- `auto_ads: true` — AdSense automatically finds and fills ad slots across all pages. No manual placement needed.

The existing ad placeholder `<div>` elements in the templates are ready to be replaced with real `<ins>` ad units when you're approved.

### ads.txt

`ads.txt` is at the root of the project and gets copied to `_site/ads.txt` on every build. Update it with your real publisher ID:

```
google.com, ca-pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

Replace `ca-pub-XXXXXXXXXXXXXXXX` with your actual AdSense publisher ID. This file is required by AdSense to authorize your domain.

### Enabling/disabling services

Set `enabled: false` for any service to completely remove it from the built HTML. No scripts, no meta tags, no network requests. Safe to commit with placeholder IDs.

---

## Ad Placeholders

Ad placeholders are shown when `show_ad_placeholders: true` in `_data/settings.yml`.

To replace with real AdSense ads, find the placeholder divs in the layouts and replace with your AdSense code:

```html
<!-- Replace this: -->
<div class="ad-placeholder ad-top-banner" aria-hidden="true">
  <span>Advertisement</span>
</div>

<!-- With your AdSense unit: -->
<div class="ad-top-banner">
  <ins class="adsbygoogle" ...></ins>
</div>
```

Ad locations:
- **Top banner** — below breadcrumbs on post, blog, category, tag, author pages
- **In-content** — inside post content area
- **Sidebar** — top of sidebar column

---

## Performance Notes

- Fonts are loaded with `media="print" onload` for non-render-blocking delivery
- Images use `loading="lazy"` throughout
- JS is deferred (`defer` attribute)
- Search JS is only loaded on the search page
- CSS is compressed in production (`style: compressed` in `_config.yml`)
- `jekyll-include-cache` caches repeated includes for faster builds
