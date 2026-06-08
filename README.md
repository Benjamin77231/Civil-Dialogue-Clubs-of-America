# Civil Dialogue Clubs of America — Website

A complete static website for CDCA, built with plain HTML, CSS, and JavaScript. No build step, no dependencies, no backend required. Designed for deployment on GitHub Pages.

---

## File Structure

```
cdca-website/
├── index.html          ← Home page
├── about.html          ← About / Our Story / Founder
├── start-a-club.html   ← Club launch guide + interest form
├── training.html       ← Leader Training program + signup
├── directory.html      ← Club directory with search/filter
├── contact.html        ← Contact form + info
├── style.css           ← All styles (shared across all pages)
├── script.js           ← All JavaScript (shared across all pages)
└── README.md           ← This file
```

All HTML files link to the same `style.css` and `script.js` — keep all files in the same root folder.

---

## Deploying to GitHub Pages

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up if you don't have an account. It's free.

### Step 2 — Create a new repository
1. Click the **+** icon in the top right → **New repository**
2. Name it `cdca-website` (or any name you prefer — it will appear in your URL)
3. Set visibility to **Public**
4. Leave all other settings at their defaults
5. Click **Create repository**

### Step 3 — Upload your files
1. On the new repository page, click **uploading an existing file**
2. Drag and drop all files from your local `cdca-website/` folder into the upload area (all 9 files at once)
3. Scroll down, leave the commit message as-is, and click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to your repository → click **Settings** (top menu)
2. In the left sidebar, scroll to **Pages**
3. Under "Source", select **Deploy from a branch**
4. Set branch to **main** and folder to **/ (root)**
5. Click **Save**

### Step 5 — Your site is live
After 30–90 seconds, your site will be available at:
```
https://YOUR-GITHUB-USERNAME.github.io/cdca-website/
```
GitHub will display the exact URL in the Pages settings once deployment is complete.

> **Tip:** Every time you edit and re-upload files, GitHub Pages automatically rebuilds and redeploys within ~60 seconds.

---

## Updating Content

### Swapping in real photos
Every photo placeholder in the HTML has a comment above it explaining exactly what image goes there and the recommended dimensions. To replace a placeholder:

1. Find the `<!-- IMAGE PLACEHOLDER: ... -->` comment in the HTML
2. Delete the `<div class="photo-placeholder ...">...</div>` block below it
3. Replace it with a standard `<img>` tag:
   ```html
   <img src="images/your-photo.jpg" alt="Descriptive alt text" style="width:100%; border-radius:8px;" />
   ```
4. Create an `images/` folder in your repository and upload photos there

### Updating stats on the homepage
In `index.html`, find the hero stats section. Update the `data-count` attribute on each stat number with your real figures — the counter animation will pick them up automatically:
```html
<div class="hero__stat-num" data-count="42">42</div>
```

### Connecting the forms to Formspree
The forms currently use `action="mailto:placeholder@cdca.org"` as a placeholder. To make them actually send submissions:

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your unique endpoint URL (looks like `https://formspree.io/f/xrgpabcd`)
3. In each HTML file, find the `<form>` tag and:
   - Replace `action="mailto:placeholder@cdca.org"` with `action="https://formspree.io/f/YOUR_ID"`
   - Remove `method="POST"` and `enctype="text/plain"` (Formspree handles this)
   - Add `method="POST"` back (Formspree requires it)

There are forms in: `start-a-club.html`, `training.html`, and `contact.html`.

### Updating social media links
Search for `href="#"` in the footer and header of each page — replace with your actual social profile URLs.

### Updating email addresses
Search for `placeholder@cdca.org`, `hello@cdca.org`, `press@cdca.org`, and `partnerships@cdca.org` across all files and replace with your real addresses.

### Adding clubs to the directory
In `directory.html`, copy an existing `<article class="club-card">` block and update:
- `data-state` — region for filtering (`northeast`, `south`, `midwest`, `west`)
- `data-name` — club name in lowercase (for search)
- `data-city` — city in lowercase (for search)
- All the text content inside the card

---

## Customization Notes

- **Colors** — All colors are CSS variables in `style.css` under `:root`. Change `--navy`, `--gold`, etc. to update the whole site at once.
- **Fonts** — Font families are set via `--font-head`, `--font-body`, `--font-ui` in `:root`. The Google Fonts `<link>` tags at the top of each HTML file pull them in.
- **Nav links** — The navigation is duplicated in each HTML file (desktop + mobile versions). If you add a new page, add its link to both navs in every file.
- **Footer links** — The footer is also duplicated across all pages. Update in each file when adding new pages or sections.

---

## Browser Support
Tested against: Chrome, Firefox, Safari, Edge (latest versions). Mobile responsive at 375px and up. No polyfills required.

---

## Tech Stack
- HTML5
- CSS3 (custom properties, grid, flexbox, clamp)
- Vanilla JavaScript (ES6+)
- [Google Fonts](https://fonts.google.com) — Playfair Display, Source Serif 4, DM Sans
- [Font Awesome 6](https://fontawesome.com) — icons via CDN

No npm. No webpack. No framework. Open any `.html` file directly in a browser and it works.

---

*Built for Civil Dialogue Clubs of America. Student-led. Nonpartisan. National.*
