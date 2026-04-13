# Follow.it Setup Guide

This site uses [Follow.it](https://follow.it) to power email subscriptions via RSS.
The subscription forms are already built into the site — you just need to register
your feed with Follow.it and swap in the real form action URL.

---

## Step 1 — Deploy your site and confirm the RSS feed is live

Before registering with Follow.it, your site must be publicly accessible.

1. Deploy to GitHub Pages, Netlify, Vercel, or your host of choice.
2. Visit `https://yourdomain.com/feed.xml` in a browser.
3. You should see raw XML starting with `<?xml version="1.0"` and `<rss version="2.0"`.
4. If you see a 404, check that `jekyll-feed` is in your `Gemfile` and `_config.yml` plugins list — it already is in this project.

---

## Step 2 — Register your feed on Follow.it

1. Go to **[https://follow.it/add-feed](https://follow.it/add-feed)**
2. Paste your RSS feed URL:
   ```
   https://yourdomain.com/feed.xml
   ```
3. Click **Follow** / **Add Feed**.
4. Create a free Follow.it account (or log in if you already have one).
5. Follow.it will verify your feed and set up your publisher dashboard.

---

## Step 3 — Get your form action URL

1. Log in to your Follow.it dashboard: **[https://follow.it/publisher](https://follow.it/publisher)**
2. In the left sidebar click **Subscription Forms** → **Embed Form**.
3. Follow.it will show you an HTML snippet like this:

   ```html
   <form action="https://api.follow.it/subscription-form/XXXXXXXXXXXXXXXX/8" method="post">
     <input type="email" name="email" placeholder="Your email">
     <button type="submit">Subscribe</button>
   </form>
   ```

4. Copy the full `action` URL — it looks like:
   ```
   https://api.follow.it/subscription-form/XXXXXXXXXXXXXXXX/8
   ```
   The long string in the middle is your unique feed token.

---

## Step 4 — Update the form action in the site

The placeholder action URL currently in the site is:
```
https://api.follow.it/subscription-form/dGhlcHVsc2UuZXhhbXBsZS5jb20vZmVlZC54bWw=/8
```

Replace it with your real URL in **three files**:

### `_includes/newsletter.html`
```html
<form
  class="newsletter-form"
  action="https://api.follow.it/subscription-form/YOUR_TOKEN_HERE/8"
  ...
>
```

### `_includes/sidebar.html`
```html
<form
  class="sidebar-subscribe-form"
  action="https://api.follow.it/subscription-form/YOUR_TOKEN_HERE/8"
  ...
>
```

### `_includes/subscribe_inline.html`
```html
<form
  class="inline-subscribe-form"
  action="https://api.follow.it/subscription-form/YOUR_TOKEN_HERE/8"
  ...
>
```

You can do a project-wide find & replace for the placeholder token:

**Find:**
```
dGhlcHVsc2UuZXhhbXBsZS5jb20vZmVlZC54bWw=
```
**Replace with:**
```
YOUR_REAL_TOKEN_FROM_FOLLOWIT
```

---

## Step 5 — Test the form

1. Rebuild and deploy the site.
2. Open the homepage and enter a test email address in the newsletter form.
3. Click **Subscribe** — the form posts to Follow.it and opens their confirmation page in a new tab.
4. Check your inbox for the Follow.it confirmation email.
5. Confirm the subscription.
6. In your Follow.it dashboard under **Subscribers**, you should see the test address listed.

---

## Step 6 — Configure your sender settings (recommended)

In your Follow.it publisher dashboard:

| Setting | Where |
|---|---|
| Sender name | Settings → Email Settings → From Name |
| Reply-to email | Settings → Email Settings → Reply-To |
| Email frequency | Settings → Digest Settings (instant / daily / weekly) |
| Email template | Settings → Email Template (logo, colors, footer) |
| Unsubscribe page | Handled automatically by Follow.it |

---

## Where subscription forms appear on this site

| Location | File | Trigger |
|---|---|---|
| Newsletter section (above footer) | `_includes/newsletter.html` | All pages where `show_newsletter: true` |
| Sidebar widget | `_includes/sidebar.html` | Post pages, page layout |
| Inline post CTA | `_includes/subscribe_inline.html` | After tags on every post |

All three forms are controlled by the `show_newsletter` flag in `_data/settings.yml`:

```yaml
# _data/settings.yml
show_newsletter: true   # set to false to hide all subscription forms
```

---

## RSS feed details

| Property | Value |
|---|---|
| Feed URL | `https://yourdomain.com/feed.xml` |
| Plugin | `jekyll-feed` |
| Posts included | 20 (set by `feed.posts_limit` in `_config.yml`) |
| Feed includes | title, description, date, author, categories, full content |

To verify your feed is valid before registering: **[https://validator.w3.org/feed/](https://validator.w3.org/feed/)**

---

## Troubleshooting

**Form submits but nothing happens**
- Check the `action` URL is correct and starts with `https://api.follow.it/`
- Make sure the form has `method="post"` and the email input has `name="email"`

**Feed not found by Follow.it**
- Confirm `https://yourdomain.com/feed.xml` returns XML in a browser
- Check `jekyll-feed` is listed under `plugins:` in `_config.yml`
- Make sure the site is fully deployed (not just running locally)

**Subscribers not receiving emails**
- Check Follow.it dashboard → Logs for delivery errors
- Verify sender email is not hitting spam — ask subscribers to whitelist `noreply@follow.it`
- Check that your feed is updating (new posts appear in `/feed.xml`)

**Want to use a custom sender domain**
- Follow.it Pro plans support custom sending domains
- See: [https://follow.it/pricing](https://follow.it/pricing)
