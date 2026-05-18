# TokyoLab v5.11.5 — Static Photography Blog

This version keeps the existing Jekyll Markdown workflow, while also shipping generated static article pages for direct upload previews.

You only upload normal visible folders and files. GitHub Pages uses Jekyll automatically.

## Write posts

Put Markdown files in:

```text
_posts/
```

Filename format:

```text
2026-05-01-my-new-post.md
```

Frontmatter:

```md
---
title: 中文标题
title_en: English Title
title_ja: 日本語タイトル
date: 2026-05-01
tags: [hiking, japan]
excerpt: 中文摘要
excerpt_en: English summary
excerpt_ja: 日本語の概要
read: 5 min
---

正文从这里开始。

## 大章节
### 小章节
#### 更小章节
```

GitHub Pages will automatically generate real article pages.

## Catalog

Article pages automatically create a right-side Catalog from:

```text
## / ### / ####
```

Desktop: shows right-side Catalog.  
Mobile: hides Catalog.

## Photos

Put images in:

```text
assets/photos/gallery/
```

Photos page will read files from this folder through Jekyll.

Recommended image names:

```text
2026-05-01_nikko-lake-mountain.jpg
2026-05-03_kamakura-sea.jpg
```

## Important

Do not add `.nojekyll`.  
This version needs Jekyll.

No GitHub Actions are required.


## v5.8 Article CSS Fix

Fixed the Jekyll post layout so article pages load CSS and JS through relative paths:

```text
../assets/css/style.css
../assets/js/main.js
```

This prevents article pages from rendering as raw unstyled HTML on GitHub Pages project URLs.

## v5.9 Reading and Sponsor Upgrade

- Improved article typography for Chinese, English, and Japanese long-form reading.
- Moved article catalog generation into `assets/js/main.js` so every post uses the same behavior.
- Improved the static Markdown generator, including figure output, external links, and GitHub-style callout blocks.
- Generated `assets/js/auto-posts.js` and `assets/js/auto-photos.js` as valid static data, so the downloaded site works without Liquid script errors.
- Sponsor payment cards now show direct payment buttons only, so visitors do not need to copy links manually.
- Payment methods are controlled by `PAYMENT_METHODS` in `assets/js/content.js`. A method appears automatically when its `url` is filled in; leave `url` empty to hide it.
- Existing posts, photos, search, language switching, theme switching, RSS, and sitemap are preserved.

## v5.10 Summer Film Theme

- Added a third theme: `summer`.
- The theme switcher now cycles through `light`, `dark`, and `summer`.
- Summer mode uses pale green natural tones, warm highlights, translucent surfaces, and a subtle film-grain overlay.
- No external images are required for the theme, so the site remains a self-contained static package.

## v5.10.1 Forest Glow Refinement

- Refined the summer theme from a simple green palette into layered forest bokeh light.
- Added warm yellow-green glow, soft tree-shadow depth, and a finer matte film grain texture.
- Kept the theme CSS-only, so no reference photo or camera-card file is bundled into the site.

## v5.10.2 Photo-Based Summer Background

- Summer mode now uses `assets/theme/summer-forest-bg.jpg`, cropped from the top background area of the provided reference photo.
- The crop contains only the forest bokeh background and does not include the person.
- The original camera-card image is not bundled; only the processed background crop is included.

## v5.10.3 Natural Green Balance

- Removed the large warm-white veil from the summer background.
- Switched the bundled forest crop to a higher-resolution version for more natural green and shadow detail.
- Kept only a subtle vignette and fine film grain so the theme feels closer to the original summer light.

## v5.11 Compact Music Button

- Added a small floating music button in the bottom-right corner.
- The button follows the active theme colors for `light`, `dark`, and `summer`.
- Music starts only after the first user click, which avoids browser autoplay blocking.
- The player reads `assets/audio/from-the-start.mp3`.
- Playback state and approximate position are remembered during the browsing session.

## v5.11.1 Minimal Music Button

- Replaced the music-note glyph with a more minimal circular audio mark.
- The paused state shows a fine ring and center dot.
- The playing state switches to a subtle three-bar pulse inside the ring.

## v5.11.5 X Username Update

- Updated X handle to `@jfreyframes`.
- Updated X profile link to `https://x.com/jfreyframes`.
