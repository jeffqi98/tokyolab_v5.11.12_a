function loadScript(src, attrs = {}) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
  document.head.appendChild(script);
}

function initAnalyticsAndAds() {
  const config = window.TOKYOLAB_CONFIG || {};

  if (config.enableAnalytics && config.googleAnalyticsId && !config.googleAnalyticsId.includes("XXXX")) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", config.googleAnalyticsId);
  }

  if (config.enableAdsense && config.googleAdsensePublisherId && !config.googleAdsensePublisherId.includes("XXXX")) {
    loadScript(
      `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.googleAdsensePublisherId}`,
      { crossorigin: "anonymous" }
    );
  }
}

document.addEventListener("DOMContentLoaded", initAnalyticsAndAds);
