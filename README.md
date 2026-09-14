---
title: "Rom's Personal Homepage"
tags:
  - website/personal-homepage
  - github-pages
---

# Rom's Personal Homepage

A lightweight static personal homepage for [Rom](https://github.com/Rom-Stoic).

The site is designed to be updated over time and published directly with GitHub Pages. It has no
build step, package manager, or local dependency installation.

> [!info] Site Contents
> The homepage brings together research, education, writing, course notes, tutoring, climbing,
> shared learning resources, physical training, and contact links.

## Repository Structure

| File | Purpose |
|---|---|
| `index.html` | Page content and structure |
| `styles.css` | Layout, typography, colors, and responsive design |
| `script.js` | Theme toggle and background animation |
| `assets/portrait.jpg` | Personal portrait |
| `assets/climbing-placeholder.svg` | Current abstract climbing image |
| `.nojekyll` | Marks the repository as a plain static site |
| `.gitignore` | Ignores local system and development files |

The page also loads fonts from Google Fonts and icons from Lucide's CDN. No files need to be
installed locally for the site to work.

## Local Preview

You can open `index.html` directly in a browser.

For a local HTTP preview, run the following command from this folder:

```bash
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173) in a browser.


## Updating Content

| Task | File |
|---|---|
| Edit text or contact links | `index.html` |
| Change visual design | `styles.css` |
| Change theme behavior or animation | `script.js` |
| Replace the portrait | `assets/portrait.jpg` |
| Replace the climbing image | Update the referenced asset in `index.html` |

After an update, preview the site locally, commit the change, and push it to GitHub. GitHub Pages
will publish the new version from the selected branch and folder.
