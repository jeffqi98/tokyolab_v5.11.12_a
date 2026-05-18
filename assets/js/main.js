
const LANGS = ["en", "zh", "ja"];

function getLang() {
  const saved = localStorage.getItem("lang");
  return LANGS.includes(saved) ? saved : "en";
}

function setLang(lang) {
  if (!LANGS.includes(lang)) lang = "en";
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  document.documentElement.dataset.lang = lang;
}

function tr(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[getLang()] || value.en || "";
  }
  return value || "";
}

function t(path) {
  const parts = path.split(".");
  let current = I18N[getLang()];
  for (const part of parts) current = current?.[part];
  return current || "";
}


function getPhotos() {
  const curated = typeof photos !== "undefined" ? photos : [];
  const auto = window.AUTO_PHOTOS && Array.isArray(window.AUTO_PHOTOS) ? window.AUTO_PHOTOS : [];
  if (!auto.length) return curated;
  const fileName = value => (value || "").split("/").pop();
  const seenSlugs = new Set(curated.map(photo => photo.slug));
  const seenSources = new Set(curated.flatMap(photo => [photo.src, photo.detailSrc]).filter(Boolean));
  const seenFiles = new Set(curated.flatMap(photo => [fileName(photo.src), fileName(photo.detailSrc)]).filter(Boolean));
  return [
    ...curated,
    ...auto.filter(photo => {
      const names = [fileName(photo.src), fileName(photo.detailSrc)];
      return !seenSlugs.has(photo.slug) &&
        !seenSources.has(photo.src) &&
        !seenSources.has(photo.detailSrc) &&
        names.every(name => !name || !seenFiles.has(name));
    })
  ];
}

function getPosts() {
  const curated = typeof posts !== "undefined" ? posts : [];
  const auto = window.AUTO_POSTS && Array.isArray(window.AUTO_POSTS) ? window.AUTO_POSTS : [];
  if (!auto.length) return curated;
  const seen = new Set(curated.map(post => post.url));
  return [...curated, ...auto.filter(post => !seen.has(post.url))];
}

function photoUrl(photo) {
  return `photo.html?slug=${encodeURIComponent(photo.slug)}`;
}

function assetPath(path) {
  const isNested = location.pathname.includes("/posts/") || location.pathname.includes("/photos/");
  if (!isNested) return path;
  if (path.startsWith("../")) return path;
  return "../" + path;
}

function initLang() {
  setLang(getLang());
  const switcher = document.querySelector("[data-lang-switcher]");
  if (!switcher) return;
  switcher.querySelectorAll("[data-lang]").forEach(button => {
    button.classList.toggle("active", button.dataset.lang === getLang());
    button.addEventListener("click", () => {
      setLang(button.dataset.lang);
      window.location.reload();
    });
  });
}

function applyStaticI18n() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const value = t(el.dataset.i18n);
    if (value) el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const value = t(el.dataset.i18nPlaceholder);
    if (value) el.setAttribute("placeholder", value);
  });

  document.querySelectorAll("[data-i18n-lines]").forEach(el => {
    const value = t(el.dataset.i18nLines);
    if (value) el.innerHTML = value.split("\n").join("<br>");
  });

  const labels = {
    "photos.html": t("nav.photos"),
    "posts.html": t("nav.posts"),
    "about.html": t("nav.about"),
    "sponsors.html": t("nav.sponsors")
  };

  document.querySelectorAll(".nav a").forEach(a => {
    const href = a.getAttribute("href") || "";
    Object.keys(labels).forEach(key => {
      if (href.endsWith(key) && !a.classList.contains("icon-btn")) {
        a.textContent = labels[key];
      }
    });
  });
}

function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a => {
    const href = a.getAttribute("href");
    if ((path === "" || path === "index.html") && href === "index.html") a.classList.add("active");
    else if (href && path === href.split("/").pop()) a.classList.add("active");
  });
}

function initTheme() {
  const saved = localStorage.getItem("theme");
  const themes = ["light", "dark", "summer"];
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = themes.includes(saved) ? saved : (prefersDark ? "dark" : "light");

  const btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;

  const update = () => {
    const theme = document.documentElement.dataset.theme;
    const icons = {
      light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
      dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/><circle cx="12" cy="12" r="4"/></svg>',
      summer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 20c7-1 11-7 12-16-8 1-14 6-16 13 2-1 5-1 8-1"/><path d="M9 15c2-4 5-6 9-8"/></svg>'
    };
    btn.innerHTML = icons[theme] || icons.light;
    btn.setAttribute("aria-label", `Theme: ${theme}`);
    btn.setAttribute("title", `Theme: ${theme}`);
  };

  update();

  btn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    const next = themes[(themes.indexOf(current) + 1) % themes.length] || "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    update();
  });
}

function renderHome() {
  const latestPhotos = document.querySelector("[data-latest-photos]");
  if (latestPhotos) {
    latestPhotos.innerHTML = getPhotos().slice(0, 3).map(p => `
      <a class="photo-card fade-in" href="${photoUrl(p)}">
        <img src="${assetPath(p.src)}" alt="${tr(p.title)}">
        <span class="photo-meta"><span>${tr(p.title)}</span><span>${p.year}</span></span>
      </a>
    `).join("");
  }

  const latestPosts = document.querySelector("[data-latest-posts]");
  if (latestPosts) latestPosts.innerHTML = makePostGroups(getPosts().slice(0, 3));
}

function makePostGroups(list) {
  const groups = list.reduce((acc, post) => {
    (acc[post.year] ||= []).push(post);
    return acc;
  }, {});

  return Object.keys(groups).sort((a, b) => b - a).map(year => `
    <div class="year-group">
      <div class="year-label">${year}</div>
      <div>
        ${groups[year].map(post => `
          <a class="post-row fade-in" href="${post.url}">
            <span class="post-date">${post.monthDay}</span>
            <span class="post-title">${tr(post.title)}</span>
            <span class="post-read">${post.read}</span>
          </a>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function renderPosts() {
  const el = document.querySelector("[data-posts]");
  if (el) el.innerHTML = makePostGroups(getPosts());
}

function renderPhotos() {
  const grid = document.querySelector("[data-photo-grid]");
  const filters = document.querySelector("[data-filters]");
  if (!grid) return;

  const tags = ["all", ...Array.from(new Set(getPhotos().flatMap(photo => photo.tags)))];

  if (filters) {
    filters.innerHTML = tags.map((tag, index) => `
      <button class="filter-btn ${index === 0 ? "active" : ""}" data-filter="${tag}">${tag}</button>
    `).join("");

    filters.addEventListener("click", event => {
      const btn = event.target.closest("[data-filter]");
      if (!btn) return;
      filters.querySelectorAll(".filter-btn").forEach(item => item.classList.remove("active"));
      btn.classList.add("active");
      draw(btn.dataset.filter);
    });
  }

  function draw(tag = "all") {
    const list = tag === "all" ? getPhotos() : getPhotos().filter(photo => photo.tags.includes(tag));
    grid.innerHTML = list.map(photo => `
      <a class="grid-card fade-in" href="${photoUrl(photo)}">
        <img src="${assetPath(photo.src)}" alt="${tr(photo.title)}">
        <span class="grid-caption"><strong>${tr(photo.title)}</strong><span>${photo.year}</span></span>
      </a>
    `).join("");
    revealNow();
  }

  draw();
}

function renderPhotoDetail() {
  const el = document.querySelector("[data-photo-detail]");
  if (!el) return;

  const slug = el.dataset.photoDetail;
  const photo = getPhotos().find(item => item.slug === slug);

  if (!photo) {
    el.innerHTML = `<p class="result-desc">Photo not found.</p>`;
    return;
  }

  document.title = `${tr(photo.title)} · TokyoLab`;

  const settings = [photo.focalLength, photo.aperture, photo.shutter, photo.iso].filter(Boolean).join(" · ");
  const note = tr(photo.note);
  const related = getPhotos()
    .filter(item => item.slug !== photo.slug && item.tags.some(tag => photo.tags.includes(tag)))
    .slice(0, 3);

  const noteBlock = note && note.trim()
    ? `<section class="photo-note fade-in"><h2>${t("photo.note")}</h2><p>${note}</p></section>`
    : "";

  el.innerHTML = `
    <section class="photo-detail-head compact">
      <div class="kicker">${tr(photo.location)}</div>
      <h1>${tr(photo.title)}</h1>
      <p>${tr(photo.caption)}</p>
    </section>

    <figure class="photo-detail-image fade-in">
      <img src="${assetPath(photo.detailSrc || photo.src)}" alt="${tr(photo.title)}">
    </figure>

    <section class="metadata-strip fade-in" aria-label="Photo metadata">
      <div><span>${t("photo.location")}</span><strong>${tr(photo.location)}</strong></div>
      <div><span>${t("photo.date")}</span><strong>${photo.date}</strong></div>
      <div><span>${t("photo.camera")}</span><strong>${photo.camera}</strong></div>
      <div><span>${t("photo.lens")}</span><strong>${photo.lens}</strong></div>
      <div><span>${t("photo.settings")}</span><strong>${settings}</strong></div>
    </section>

    <div class="tag-line compact-tags fade-in">
      ${photo.tags.map(tag => `<span>#${tag}</span>`).join("")}
    </div>

    ${noteBlock}

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">${t("photo.related")}</h2>
        <a class="section-link" href="../photos.html">${t("photo.allPhotos")}</a>
      </div>
      <div class="related-photos">
        ${related.map(item => `
          <a class="grid-card fade-in" href="${photoUrl(item)}">
            <img src="${assetPath(item.src)}" alt="${tr(item.title)}">
            <span class="grid-caption"><strong>${tr(item.title)}</strong><span>${item.year}</span></span>
          </a>
        `).join("")}
      </div>
    </section>
  `;

  revealNow();
}

function renderSearch() {
  const input = document.querySelector("[data-search-input]");
  const results = document.querySelector("[data-search-results]");
  if (!input || !results) return;

  const corpus = [
    ...getPosts().map(post => ({
      type: "post",
      title: tr(post.title),
      desc: tr(post.excerpt),
      url: post.url,
      text: [tr(post.title), tr(post.excerpt), post.tags.join(" ")].join(" ").toLowerCase()
    })),
    ...getPhotos().map(photo => ({
      type: "photo",
      title: tr(photo.title),
      desc: `${tr(photo.location)} · ${tr(photo.caption)}`,
      url: photoUrl(photo),
      text: [tr(photo.title), tr(photo.location), tr(photo.caption), photo.camera, photo.lens, photo.tags.join(" ")].join(" ").toLowerCase()
    }))
  ];

  const suggestions = ["tokyo", "hokkaido", "sea", "hiking", "camera"];

  function draw(queryText = "") {
    const query = queryText.trim().toLowerCase();

    if (!query) {
      results.innerHTML = `
        <div class="search-empty fade-in">
          <p>${t("pages.searchEmpty")}</p>
          <div class="search-chips">
            ${suggestions.map(item => `<button type="button" data-suggestion="${item}">${item}</button>`).join("")}
          </div>
        </div>
      `;

      results.querySelectorAll("[data-suggestion]").forEach(btn => {
        btn.addEventListener("click", () => {
          input.value = btn.dataset.suggestion;
          draw(input.value);
          input.focus();
        });
      });

      revealNow();
      return;
    }

    const list = corpus.filter(item => item.text.includes(query)).slice(0, 8);

    results.innerHTML = list.map(item => `
      <a class="result-item fade-in" href="${item.url}">
        <div class="result-type">${item.type}</div>
        <div class="result-title">${item.title}</div>
        <div class="result-desc">${item.desc}</div>
      </a>
    `).join("") || `<p class="result-desc">${t("pages.noResults")} “${query}”.</p>`;

    revealNow();
  }

  input.addEventListener("input", event => draw(event.target.value));
  draw();
}


function iconSvg(name) {
  const icons = {
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4l16 16M20 4L4 20"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 4L3 11.5l7 2.2M21 4l-5 17-6-7.3M21 4L10 13.7"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.5"/><path d="M17.5 6.5h.01"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="6.5" width="18" height="11" rx="3"/><path d="M10.5 9.5v5l4.5-2.5-4.5-2.5z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3a9 9 0 0 0-3 17c.45.08.62-.2.62-.44v-1.55c-2.52.55-3.05-1.08-3.05-1.08-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.37 2.1.97 2.61.74.08-.58.31-.97.56-1.2-2.01-.23-4.13-1-4.13-4.47 0-.99.35-1.79.93-2.42-.09-.23-.4-1.15.09-2.39 0 0 .76-.24 2.48.92A8.6 8.6 0 0 1 12 6.83c.77 0 1.54.1 2.26.31 1.72-1.16 2.48-.92 2.48-.92.49 1.24.18 2.16.09 2.39.58.63.93 1.43.93 2.42 0 3.48-2.12 4.24-4.14 4.46.32.28.61.83.61 1.67v2.48c0 .24.16.52.62.43A9 9 0 0 0 12 3z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="4" y="6" width="16" height="12" rx="2"/><path d="M4 8l8 6 8-6"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10 13a5 5 0 0 0 7.07 0l2-2a5 5 0 0 0-7.07-7.07l-1.15 1.15"/><path d="M14 11a5 5 0 0 0-7.07 0l-2 2A5 5 0 0 0 12 20.07l1.15-1.15"/></svg>'
  };
  return icons[name] || icons.link;
}


function renderFeaturedSocials() {
  const mount = document.querySelector("[data-featured-socials]");
  if (!mount || typeof FEATURED_SOCIALS === "undefined") return;

  mount.innerHTML = FEATURED_SOCIALS
    .filter(item => item.url && item.url !== "#")
    .map(item => `
      <a class="featured-social-card fade-in" href="${item.url}" target="_blank" rel="noopener noreferrer">
        <div class="featured-social-icon">${iconSvg(item.icon)}</div>
        <div>
          <strong>${item.label}</strong>
          <span>${item.handle}</span>
          <p>${tr(item.desc)}</p>
        </div>
      </a>
    `).join("");

  revealNow();
}

function renderSocialLinks() {
  const mounts = document.querySelectorAll("[data-social-links]");
  if (!mounts.length || typeof SOCIAL_LINKS === "undefined") return;

  const html = SOCIAL_LINKS
    .filter(item => item.url && item.url !== "#")
    .map(item => `
      <a class="social-button" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}" title="${item.label}">
        ${iconSvg(item.icon)}
        <span>${item.label}</span>
      </a>
    `).join("");

  mounts.forEach(mount => {
    mount.innerHTML = html;
  });
}

function renderPaymentMethods() {
  const grid = document.querySelector("[data-payment-grid]");
  if (!grid || typeof PAYMENT_METHODS === "undefined") return;

  const methods = PAYMENT_METHODS.filter(item => item.url && item.url !== "#");

  grid.innerHTML = methods.map(item => {
    const external = /^https?:\/\//.test(item.url);
    const target = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `
      <a class="payment-card payment-card-link fade-in" href="${item.url}"${target}>
        <h3>${t(item.title)}</h3>
        <p>${t(item.desc)}</p>
        <span class="payment-cta">${t("sponsors.openPayment")}</span>
      </a>
    `;
  }).join("");

  revealNow();
}

function initMusicPlayer() {
  const config = typeof MUSIC_PLAYER !== "undefined" ? MUSIC_PLAYER : null;
  if (!config?.src) return;

  const audio = new Audio(assetPath(config.src));
  const stateKey = "tokyolabMusic";
  const timeKey = "tokyolabMusicTime";
  const volume = Number.isFinite(config.volume) ? config.volume : 0.42;

  audio.loop = config.loop !== false;
  audio.preload = "none";
  audio.volume = Math.min(Math.max(volume, 0), 1);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "music-toggle";
  button.setAttribute("aria-label", `Play ${config.title}`);
  button.setAttribute("title", `${config.title} · ${config.artist}`);
  button.innerHTML = `
    <span class="music-glyph" aria-hidden="true">
      <span class="music-ring"></span>
      <span class="music-core"></span>
      <span class="music-bars"><i></i><i></i><i></i></span>
    </span>
    <span class="music-label">${config.title}</span>
  `;
  document.body.appendChild(button);

  const setState = playing => {
    button.classList.toggle("playing", playing);
    button.setAttribute("aria-pressed", playing ? "true" : "false");
    button.setAttribute("aria-label", `${playing ? "Pause" : "Play"} ${config.title}`);
  };

  const restoreTime = () => {
    const savedTime = Number(sessionStorage.getItem(timeKey));
    if (Number.isFinite(savedTime) && savedTime > 0 && audio.duration && savedTime < audio.duration - 2) {
      audio.currentTime = savedTime;
    }
  };

  const play = async () => {
    button.classList.remove("music-unavailable");
    try {
      if (!audio.src) audio.src = assetPath(config.src);
      restoreTime();
      await audio.play();
      localStorage.setItem(stateKey, "on");
      setState(true);
    } catch (_error) {
      localStorage.setItem(stateKey, "off");
      setState(false);
    }
  };

  button.addEventListener("click", () => {
    if (audio.paused) play();
    else {
      audio.pause();
      localStorage.setItem(stateKey, "off");
      setState(false);
    }
  });

  audio.addEventListener("loadedmetadata", restoreTime);
  audio.addEventListener("timeupdate", () => {
    if (!audio.paused && Number.isFinite(audio.currentTime)) {
      sessionStorage.setItem(timeKey, String(audio.currentTime));
    }
  });
  audio.addEventListener("error", () => {
    localStorage.setItem(stateKey, "off");
    button.classList.add("music-unavailable");
    button.setAttribute("title", `Add audio file: ${config.src}`);
    setState(false);
  });

  setState(false);
  if (localStorage.getItem(stateKey) === "on") play();
}

function initSponsors() {
  const tabs = document.querySelector("[data-sponsor-tabs]");
  if (!tabs) return;

  tabs.addEventListener("click", event => {
    const btn = event.target.closest("[data-sponsor-tab]");
    if (!btn) return;

    const target = btn.dataset.sponsorTab;

    tabs.querySelectorAll("[data-sponsor-tab]").forEach(item => {
      item.classList.toggle("active", item === btn);
    });

    document.querySelectorAll("[data-sponsor-panel]").forEach(panel => {
      panel.classList.toggle("active", panel.dataset.sponsorPanel === target);
    });
  });
}

function initArticleToc() {
  const body = document.querySelector(".article-body");
  const nav = document.querySelector("[data-article-toc]");
  const box = document.querySelector(".article-toc");
  if (!body || !nav || !box) return;

  const headings = Array.from(body.querySelectorAll("h2, h3, h4"));
  if (!headings.length) {
    box.hidden = true;
    return;
  }

  const used = new Set();
  const slugify = text => {
    const base = text.trim().toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\u4e00-\u9fff\u3040-\u30ff-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "section";
    let id = base;
    let n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    return id;
  };

  nav.innerHTML = headings.map(heading => {
    if (!heading.id) heading.id = slugify(heading.textContent);
    const level = heading.tagName.toLowerCase().replace("h", "");
    return `<a class="toc-level-${level}" href="#${heading.id}">${heading.textContent}</a>`;
  }).join("");
}

function initPhotoProtection() {
  // This deters normal saving, but no website can fully prevent image capture.
  document.addEventListener("contextmenu", event => {
    if (event.target.closest("img, .photo-card, .grid-card, .photo-detail-image")) {
      event.preventDefault();
      showNoSaveHint(event.clientX, event.clientY);
    }
  });

  document.addEventListener("dragstart", event => {
    if (event.target.closest("img")) {
      event.preventDefault();
    }
  });

  document.addEventListener("selectstart", event => {
    if (event.target.closest(".photo-card, .grid-card, .photo-detail-image")) {
      event.preventDefault();
    }
  });

  document.addEventListener("keydown", event => {
    const key = event.key.toLowerCase();
    const blocked =
      (event.metaKey || event.ctrlKey) && (key === "s" || key === "u" || key === "p") ||
      (event.metaKey || event.ctrlKey || event.shiftKey) && key === "i";

    if (blocked) {
      event.preventDefault();
      showNoSaveHint(window.innerWidth / 2, 90);
    }
  });

  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
    img.setAttribute("loading", img.getAttribute("loading") || "lazy");
  });
}

function showNoSaveHint(x, y) {
  let hint = document.querySelector(".no-save-hint");
  if (!hint) {
    hint = document.createElement("div");
    hint.className = "no-save-hint";
    document.body.appendChild(hint);
  }

  const message = {
    en: "Photos are protected",
    zh: "照片已保护",
    ja: "写真は保護されています"
  }[getLang()] || "Photos are protected";

  hint.textContent = message;
  hint.style.left = `${Math.min(x + 12, window.innerWidth - 180)}px`;
  hint.style.top = `${Math.min(y + 12, window.innerHeight - 48)}px`;
  hint.classList.add("show");

  clearTimeout(window.__noSaveHintTimer);
  window.__noSaveHintTimer = setTimeout(() => {
    hint.classList.remove("show");
  }, 1200);
}

function revealNow() {
  const items = document.querySelectorAll(".fade-in:not(.visible)");

  // Safety first: dynamic content must never stay invisible.
  // The previous IntersectionObserver version could leave posts/photos at opacity: 0
  // in some local previews or browser states.
  requestAnimationFrame(() => {
    items.forEach(item => item.classList.add("visible"));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLang();
  initTheme();
  applyStaticI18n();
  setActiveNav();
  renderHome();
  renderPosts();
  renderPhotos();
  renderPhotoDetail();
  renderSearch();
  renderSocialLinks();
  renderFeaturedSocials();
  renderPaymentMethods();
  initMusicPlayer();
  initSponsors();
  initArticleToc();
  initPhotoProtection();
  revealNow();
});
