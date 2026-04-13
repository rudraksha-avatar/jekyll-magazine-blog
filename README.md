# The Pulse — Jekyll Magazine & Blog

A production-ready Jekyll magazine/blog platform with category-based content, featured articles, full SEO, author support, and Cloudflare Pages deployment.

---

## Features

- Magazine-style homepage with hero, latest posts, category sections, and trending
- Paginated blog listing with post cards
- Full single post layout: TOC, breadcrumbs, author box, related posts, share buttons, prev/next
- Category and tag archive pages (auto-generated via jekyll-archives)
- Author archive pages with bio and social links
- Client-side search with JSON index
- Full SEO: jekyll-seo-tag, Open Graph, Twitter Cards, JSON-LD schema (Article, BreadcrumbList, WebSite, Organization)
- RSS/Atom feed, XML sitemap, robots.txt
- Policy pages: Privacy Policy, Terms, Disclaimer, Cookie Policy
- Ad-friendly layout with placeholder zones (top banner, in-content, sidebar)
- Responsive design — mobile, tablet, desktop
- Accessible: semantic HTML5, ARIA landmarks, keyboard navigation, focus states
- Minimal JavaScript — no heavy frameworks

---

## Folder Structure

```
.
├── _config.yml           # Site configuration
├── Gemfile               # Ruby dependencies
├── .gitignore
├── robots.txt
├── search.json           # Search index template
├── index.html            # Homepage
├── 404.html              # 404 page
├── blog/
│   └── index.html        # Blog listing (paginated)
├── author/               # Author archive pages
├── _pages/               # Static pages (about, contact, policies, search)
├── _posts/               # Blog posts (Markdown)
├── _layouts/             # Page layouts
├── _includes/            # Reusable components
├── _data/
│   ├── authors.yml       # Author profiles
│   ├── navigation.yml    # Header/footer nav
│   └── settings.yml      # Site feature toggles
├── _sass/                # SCSS partials
└── assets/
    ├── css/main.scss     # Main stylesheet entry
    ├── js/main.js        # Main JavaScript
    └── images/           # Images
```

---

## Local Setup

### Prerequisites

- Ruby 3.0+ (`ruby -v`)
- Bundler (`gem install bundler`)
- Git

### Install & Run

```bash
# Clone the repo
git clone https://github.com/yourusername/the-pulse.git
cd the-pulse

# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve --livereload

# Open in browser
# http://localhost:4000
```

### Build for Production

```bash
bundle exec jekyll build
# Output is in _site/
```

---

## Adding a New Post

Create a file in `_posts/` with the naming format `YYYY-MM-DD-post-title.md`:

```markdown
---
layout: post
title: "Your Post Title"
description: "A concise description for SEO and post cards (150–160 chars)."
date: 2025-04-15
last_modified_at: 2025-04-16
categories: [technology]
tags: [ai, productivity]
author: sarah_chen
image: /assets/images/posts/your-image.jpg
image_alt: "Descriptive alt text for the image"
featured: false
toc: true
---

Your post content here in Markdown.
```

### Front Matter Reference

| Field | Required | Description |
|-------|----------|-------------|
| `layout` | Yes | Always `post` |
| `title` | Yes | Post title |
| `description` | Recommended | SEO meta description |
| `date` | Yes | Publication date |
| `last_modified_at` | Optional | Shows "Updated" date |
| `categories` | Recommended | Array, e.g. `[technology]` |
| `tags` | Optional | Array of tags |
| `author` | Recommended | Key from `_data/authors.yml` |
| `image` | Recommended | Path to featured image |
| `image_alt` | Recommended | Alt text for featured image |
| `featured` | Optional | `true` to show in hero section |
| `toc` | Optional | `true` to show table of contents |
| `noindex` | Optional | `true` to exclude from search engines |

---

## Managing Categories & Tags

Categories and tag archive pages are **automatically generated** by `jekyll-archives`. Simply use them in your post front matter:

```yaml
categories: [technology, business]
tags: [ai, startups, productivity]
```

Archive pages will be available at:
- `/category/technology/`
- `/tag/ai/`

To add a category description shown on archive pages, add it to `_config.yml`:

```yaml
category_descriptions:
  technology: "The latest in tech, software, AI, and digital innovation."
```

To show a category section on the homepage, add it to `featured_categories` in `_config.yml`:

```yaml
featured_categories:
  - technology
  - culture
```

---

## Adding Authors

Edit `_data/authors.yml`:

```yaml
jane_doe:
  name: "jane_doe"
  display_name: "Jane Doe"
  bio: "Jane writes about technology and culture."
  avatar: /assets/images/authors/jane-doe.jpg
  role: "Staff Writer"
  social:
    twitter: "janedoe"
    linkedin: "janedoe"
```

Then create an author archive page at `author/jane-doe.html`:

```yaml
---
layout: author
title: "Jane Doe"
author_key: jane_doe
description: "Articles by Jane Doe."
permalink: /author/jane_doe/
---
```

Use the author key in post front matter: `author: jane_doe`

---

## Customizing Branding & SEO

Edit `_config.yml`:

```yaml
title: "Your Site Name"
tagline: "Your tagline"
description: "Your site description for SEO"
url: "https://yourdomain.com"

social:
  twitter: "yourhandle"
  facebook: "yourpage"
```

Update `_data/navigation.yml` to change header and footer links.

---

## Plugin Summary

| Plugin | Purpose |
|--------|---------|
| `jekyll-feed` | Generates RSS/Atom feed at `/feed.xml` |
| `jekyll-sitemap` | Generates XML sitemap at `/sitemap.xml` |
| `jekyll-seo-tag` | Meta tags, Open Graph, Twitter Cards |
| `jekyll-paginate-v2` | Pagination for blog and archive pages |
| `jekyll-archives` | Auto-generates category and tag archive pages |
| `jekyll-include-cache` | Caches includes for faster builds |
| `jekyll-last-modified-at` | Tracks last modified date for posts |
| `jekyll-redirect-from` | Handles URL redirects via front matter |
| `jekyll-toc` | Generates table of contents for posts |

---

## Policy Pages

Policy pages are in `_pages/`. Edit them to match your actual policies:

- `_pages/privacy-policy.md` → `/privacy-policy/`
- `_pages/terms.md` → `/terms/`
- `_pages/disclaimer.md` → `/disclaimer/`
- `_pages/cookie-policy.md` → `/cookie-policy/`

**Important:** Replace placeholder contact emails and domain names before publishing.

---

## Images & Content Best Practices

- **Featured images:** Recommended size 1200×675px (16:9 ratio), JPEG or WebP
- **Author avatars:** 200×200px minimum, square, JPEG or PNG
- Place post images in `assets/images/posts/`
- Place author avatars in `assets/images/authors/`
- Always provide descriptive `image_alt` text
- Compress images before committing (use tools like Squoosh or ImageOptim)
- A default fallback image at `assets/images/default-post.jpg` is used when no image is specified

---

## GitHub Setup

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/yourusername/the-pulse.git
git branch -M main
git push -u origin main
```

---

## Cloudflare Pages Deployment

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Select your GitHub repository
4. Configure the build:

| Setting | Value |
|---------|-------|
| Framework preset | None (Jekyll) |
| Build command | `bundle exec jekyll build` |
| Build output directory | `_site` |
| Root directory | `/` (leave blank) |

5. Add environment variables:
   - `JEKYLL_ENV` = `production`
   - `RUBY_VERSION` = `3.2.0`

6. Click **Save and Deploy**

Cloudflare Pages will build and deploy on every push to your main branch.

### Custom Domain

In Cloudflare Pages → your project → **Custom domains**, add your domain. Update `url` in `_config.yml` to match.

---

## Ad Placeholder Zones

Ad placeholders are shown when `show_ad_placeholders: true` in `_data/settings.yml`. Replace the placeholder divs with your actual AdSense code when ready:

- **Top banner** (`.ad-top-banner`) — above content on post pages
- **In-content** (`.ad-in-content`) — after intro on post pages  
- **Sidebar** (`.ad-sidebar`) — top of sidebar widget area

---

*Built with Jekyll. Deployed on Cloudflare Pages.*
