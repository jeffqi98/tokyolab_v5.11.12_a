import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const postsDir = path.join(root, "_posts");
const outDir = path.join(root, "posts");
const postsManifestPath = path.join(root, "assets", "js", "auto-posts.js");

const files = fs
  .readdirSync(postsDir)
  .filter((file) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(file))
  .sort();

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: source };
  const data = {};
  const lines = match[1].split("\n");
  let currentKey = null;
  for (const line of lines) {
    const keyValue = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (keyValue) {
      currentKey = keyValue[1];
      const raw = keyValue[2].trim();
      data[currentKey] = raw.replace(/^["']|["']$/g, "");
      continue;
    }
    const listItem = line.match(/^\s+-\s*(.+)$/);
    if (listItem && currentKey) {
      if (!Array.isArray(data[currentKey])) data[currentKey] = [];
      data[currentKey].push(listItem[1].trim());
    }
  }
  return { data, body: match[2] };
}

function slugFromFile(file) {
  return file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function dateFromFile(file) {
  return file.slice(0, 10);
}

function monthDay(date) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC"
  });
}

function arrayValue(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return String(value)
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function plainExcerpt(markdown, fallback = "") {
  const firstParagraph = markdown
    .split(/\n\s*\n/)
    .find((block) => block.trim() && !block.trim().startsWith("#") && !block.trim().startsWith("![")) || fallback;
  return String(firstParagraph)
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function externalLinkAttrs(url = "") {
  return /^https?:\/\//.test(url) ? ' target="_blank" rel="noopener noreferrer"' : "";
}

function inlineMarkdown(value = "") {
  return escapeHtml(value)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" decoding="async">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => `<a href="${url}"${externalLinkAttrs(url)}>${label}</a>`)
    .replace(/&lt;(https?:\/\/[^&]+)&gt;/g, (_match, url) => `<a href="${url}"${externalLinkAttrs(url)}>${url}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let listOpen = false;
  let quote = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${paragraph.map((line) => inlineMarkdown(line)).join("<br>")}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listOpen) return;
    html.push("</ul>");
    listOpen = false;
  };

  const renderQuote = (lines) => {
    const marker = lines[0]?.trim().match(/^\[!(TIP|WARNING|NOTE|IMPORTANT)\]$/i);
    if (marker) {
      const type = marker[1].toLowerCase();
      const label = {
        tip: "Tip",
        warning: "Warning",
        note: "Note",
        important: "Important"
      }[type] || "Note";
      const body = markdownToHtml(lines.slice(1).join("\n"));
      return `<aside class="callout callout-${type}"><div class="callout-label">${label}</div>${body}</aside>`;
    }
    return `<blockquote>${lines.map((line) => line.trim() ? `<p>${inlineMarkdown(line)}</p>` : "").join("")}</blockquote>`;
  };

  const flushQuote = () => {
    if (!quote.length) return;
    html.push(renderQuote(quote));
    quote = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    const quoteLine = line.match(/^>\s?(.*)$/);
    if (quoteLine) {
      flushParagraph();
      flushList();
      quote.push(quoteLine[1]);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      flushParagraph();
      flushList();
      flushQuote();
      html.push("<hr>");
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushQuote();
      html.push(`<h${heading[1].length}>${inlineMarkdown(heading[2])}</h${heading[1].length}>`);
      continue;
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      flushParagraph();
      flushList();
      flushQuote();
      html.push(`<figure><img src="${image[2]}" alt="${escapeHtml(image[1])}" loading="lazy" decoding="async"></figure>`);
      continue;
    }

    const listItem = line.match(/^\s*[-*]\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      flushQuote();
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${inlineMarkdown(listItem[1])}</li>`);
      continue;
    }

    flushList();
    flushQuote();
    paragraph.push(line.replace(/\s{2}$/, ""));
  }

  flushParagraph();
  flushList();
  flushQuote();

  return html.join("\n");
}

function template({ title, subtitle, date, content }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="../apple-touch-icon.svg">
  <title>${escapeHtml(title)} · TokyoLab</title>
  <meta name="description" content="${escapeHtml(subtitle || title)}">
  <link rel="canonical" href="https://tokyolab.org/tokyolab_v5.8/posts/${escapeHtml(slugFromTitle(title))}.html">
  <meta property="og:title" content="${escapeHtml(title)} · TokyoLab">
  <meta property="og:description" content="${escapeHtml(subtitle || title)}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body>
<header class="site-header">
  <a class="brand" href="../index.html"><span class="brand-mark">tl</span><span>TOKYOLAB</span></a>
  <nav class="nav" aria-label="Navigation">
    <a href="../photos.html">Photos</a>
    <a href="../posts.html" class="active">Posts</a>
    <a href="../about.html">About</a>
    <a href="../sponsors.html">Sponsors</a>
    <a class="icon-btn" href="../search.html" aria-label="Search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></a>
    <button class="icon-btn" data-theme-toggle aria-label="Toggle theme"></button>
    <div class="lang-switcher" data-lang-switcher aria-label="Language switcher">
      <button data-lang="en">EN</button>
      <button data-lang="zh">中</button>
      <button data-lang="ja">日</button>
    </div>
  </nav>
</header>

<main class="article-layout">
  <article class="article">
    <header class="article-head">
      <div class="article-kicker">TokyoLab Journal</div>
      <h1>${title}</h1>
      ${subtitle ? `<p class="article-subtitle">${subtitle}</p>` : ""}
      <div class="article-meta"><time datetime="${date}">${date}</time><span>TokyoLab</span></div>
    </header>
    <div class="article-body">
      ${content}
    </div>
  </article>
  <aside class="article-toc" aria-label="Article catalog">
    <div class="toc-title">CATALOG</div>
    <nav data-article-toc></nav>
  </aside>
</main>

<footer class="site-footer">
  <span>© <span id="year">2026</span> TokyoLab</span>
  <span><a href="../posts.html">Back to posts</a></span>
</footer>
<script>document.getElementById('year').textContent = new Date().getFullYear()</script>
<script src="../assets/js/site-config.js"></script>
<script src="../assets/js/content.js"></script>
<script src="../assets/js/auto-photos.js"></script>
<script src="../assets/js/auto-posts.js"></script>
<script src="../assets/js/main.js"></script>
<script src="../assets/js/analytics-ads.js"></script>
</body>
</html>
`;
}

function slugFromTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/g, "-")
    .replace(/^-|-$/g, "");
}

fs.mkdirSync(outDir, { recursive: true });

const manifest = [];

for (const file of files) {
  const source = fs.readFileSync(path.join(postsDir, file), "utf8");
  const { data, body } = parseFrontmatter(source);
  const slug = slugFromFile(file);
  const date = data.date || dateFromFile(file);
  const html = markdownToHtml(body);
  const page = template({
    title: data.title || slug,
    subtitle: data.subtitle || "",
    date,
    content: html
  }).replace(/posts\/[^"]+\.html/, `posts/${slug}.html`);
  fs.writeFileSync(path.join(outDir, `${slug}.html`), page);
  console.log(`generated posts/${slug}.html`);

  const excerpt = plainExcerpt(body, data.subtitle || data.title || slug);
  manifest.push({
    title: {
      en: data.title_en || data.title || slug,
      zh: data.title || slug,
      ja: data.title_ja || data.title || slug
    },
    date,
    year: date.slice(0, 4),
    monthDay: monthDay(date),
    read: data.read || "5 min",
    tags: arrayValue(data.tags),
    url: `posts/${slug}.html`,
    excerpt: {
      en: data.excerpt_en || data.excerpt || data.subtitle || excerpt,
      zh: data.excerpt || excerpt,
      ja: data.excerpt_ja || data.excerpt || data.subtitle || excerpt
    }
  });
}

manifest.sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync(postsManifestPath, `window.AUTO_POSTS = ${JSON.stringify(manifest, null, 2)};\n`);
console.log(`generated assets/js/auto-posts.js with ${manifest.length} posts`);
