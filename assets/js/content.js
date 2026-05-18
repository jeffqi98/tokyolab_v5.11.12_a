const SITE = {
  name: "TokyoLab",
  url: "https://tokyolab.org",
  author: "Jeffrey",
};

const SOCIAL_LINKS = [
  {
    key: "x",
    label: "X",
    url: "https://x.com/jfreyframes",
    icon: "x"
  },
  {
    key: "telegram",
    label: "Telegram",
    url: "https://t.me/tokyo_lab",
    icon: "telegram"
  },
  {
    key: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/jfrey24fps/",
    icon: "instagram"
  },
  {
    key: "youtube",
    label: "YouTube",
    url: "#",
    icon: "youtube"
  },
  {
    key: "github",
    label: "GitHub",
    url: "#",
    icon: "github"
  },
  {
    key: "mail",
    label: "Email",
    url: "mailto:tokyoxlab@proton.me",
    icon: "mail"
  }
];

const FEATURED_SOCIALS = [
  {
    key: "telegram",
    label: "Telegram Channel",
    handle: "@tokyo_lab",
    desc: {
      en: "Short updates, behind-the-scenes notes, and fragments from TokyoLab.",
      zh: "短更新、幕后记录，以及 TokyoLab 的一些生活碎片。",
      ja: "短い更新、制作の裏側、TokyoLab の断片。"
    },
    url: "https://t.me/tokyo_lab",
    icon: "telegram"
  },
  {
    key: "x",
    label: "X",
    handle: "@jfreyframes",
    desc: {
      en: "Photography, thoughts, and public notes in real time.",
      zh: "摄影、想法和实时公开记录。",
      ja: "写真、考え、リアルタイムの公開メモ。"
    },
    url: "https://x.com/jfreyframes",
    icon: "x"
  },
  {
    key: "instagram",
    label: "Instagram",
    handle: "@jfrey24fps",
    desc: {
      en: "Selected frames, travel moments, and visual diary updates.",
      zh: "精选照片、旅行瞬间和视觉日记更新。",
      ja: "選んだ写真、旅の瞬間、ビジュアル日記の更新。"
    },
    url: "https://www.instagram.com/jfrey24fps/",
    icon: "instagram"
  }
];

const PAYMENT_METHODS = [
  {
    key: "buyCoffee",
    title: "sponsors.buyCoffee",
    desc: "sponsors.buyCoffeeDesc",
    url: "https://buymeacoffee.com/jfreyframes"
  },
  {
    key: "paypal",
    title: "sponsors.paypal",
    desc: "sponsors.paypalDesc",
    url: ""
  },
  {
    key: "alipay",
    title: "sponsors.alipay",
    desc: "sponsors.alipayDesc",
    url: ""
  },
  {
    key: "kofi",
    title: "sponsors.kofi",
    desc: "sponsors.kofiDesc",
    url: "https://ko-fi.com/jfrey"
  },
  {
    key: "crypto",
    title: "sponsors.crypto",
    desc: "sponsors.cryptoDesc",
    url: ""
  }
];

const MUSIC_PLAYER = {
  title: "From The Start",
  artist: "Laufey",
  src: "assets/audio/from-the-start.mp3",
  loop: true,
  volume: 0.42
};

const I18N = {
  en: {
    nav: { photos: "Photos", posts: "Posts", about: "About", sponsors: "Sponsors", search: "Search" },
    home: {
      kicker: "Tokyo based visual diary",
      title: "Where\ntime\nforgets\nto pass.",
      intro: "Photography, hiking, sea wind, small streets, and the quiet moments that deserve a place outside social media.",
      sideYear: "2026 / archive",
      sideText: "TokyoLab is a small personal archive for photographs, travel notes, and fragments of life in Japan.",
      sideLink: "Read about TokyoLab →",
      latestPhotos: "Latest photos",
      viewAll: "View all →",
      latestPosts: "Latest posts",
      archive: "Archive →"
    },
    pages: {
      photosKicker: "Visual archive",
      photosTitle: "Photos",
      photosIntro: "A visual archive of places I walked through, collected as quiet frames from Japan.",
      postsKicker: "Writing archive",
      postsTitle: "Posts",
      postsIntro: "Notes on hiking, photography, Japan, and the quiet parts of life. ",
      searchKicker: "Find something",
      searchTitle: "Search",
      searchPlaceholder: "Search...",
      searchEmpty: "Search photos, posts, locations, cameras, lenses, or tags.",
      noResults: "No results for",
      aboutKicker: "About",
      aboutTitle: "TokyoLab",
      aboutLabel: "Jeffrey / Tokyo",
      aboutP1: "I’m Jeffrey, currently based in Tokyo. I like using photos and words to document hiking, travel, and the quiet, beautiful moments in life that feel worth keeping.",
      aboutP2: "Hiking has added a lot of joy to my life. On the trail, I’ve seen many landscapes and met many interesting people. In the fast rhythm of city life, returning to the countryside helps me find a more comfortable and relaxed way of living, so I don’t stay so tense all the time.",
      aboutP3: "Compared with a fixed routine, every hike is full of unknowns: unknown people, unknown shops, unknown views. All of that brings a fresh feeling back into my life.",
      aboutP4: "Escaping the city has let me do many things I rarely have the chance to do: sitting down to chat with shop owners in small countryside stores, or listening to the rain from inside a tent deep in quiet mountains.",
      aboutP5: "These experiences keep recharging me. I enjoy this way of living, and I want to share the joy I find on the road with others.",
      aboutP6: "TokyoLab is my personal blog: a place for my thoughts, feelings, and photography. I hope it can bring you something, too."
    },
    photo: {
      location: "Location",
      date: "Date",
      camera: "Camera",
      lens: "Lens",
      settings: "Settings",
      note: "Note",
      related: "Related photos",
      allPhotos: "All photos →",
      backPhotos: "Back to photos"
    },
    sponsors: {
      kicker: "Support the archive",
      title: "Sponsors",
      thanks: "Great thanks for all the sponsors.",
      intro: "If you enjoy TokyoLab and find the photos or notes useful, you can support the archive. It helps keep this site independent, quiet, and outside the social media feed.",
      support: "Support TokyoLab",
      howLink: "How does this work?",
      circles: "Sponsor Circles",
      tiers: "Sponsor Tiers",
      coffee: "Coffee",
      film: "Film Roll",
      journey: "Journey",
      priceCoffee: "$5 / once",
      priceFilm: "$10 / once",
      priceJourney: "$75 / once",
      descCoffee: "A small thank-you for a photo, post, or guide you liked.",
      descFilm: "Support future photo walks, hosting, and archive maintenance.",
      descJourney: "For readers who want to support TokyoLab as a long-term personal project.",
      choose: "Choose payment →",
      payments: "Payment methods",
      paymentIntro: "Choose an available method. Each button opens the official payment page directly, with no copy-and-paste step.",
      buyCoffee: "Buy Me a Coffee",
      buyCoffeeDesc: "Good for international visitors and small one-time support.",
      paypal: "PayPal",
      paypalDesc: "Simple international payment option.",
      alipay: "Alipay",
      alipayDesc: "Useful for Chinese readers and RMB support.",
      kofi: "Ko-fi",
      kofiDesc: "Creator-style support page, clean and easy to share.",
      crypto: "Crypto",
      cryptoDesc: "Optional wallet support for readers who prefer USDT or stablecoins.",
      openPayment: "Open payment →",
      addPaymentLink: "Coming soon",
      addLink: "buymeacoffee.com/jeffqi",
      addPaypal: "PayPal URL",
      addAlipay: "Alipay URL or QR page",
      addKofi: "https://ko-fi.com/jeffqi",
      addCrypto: "Wallet and network details",
      howTitle: "How does this work?",
      howLabel: "Simple / optional",
      howP1: "Sponsorship is optional. The site stays free to read. Support only means you want to help keep TokyoLab online and encourage more photographs, notes, and travel records.",
      howP2: "For privacy, this static version does not collect payment information. All payment links should point to external services you control."
    },
    footer: "Photography / Hiking / Archive"
  },

  zh: {
    nav: { photos: "照片", posts: "文章", about: "关于", sponsors: "赞助", search: "搜索" },
    home: {
      kicker: "生活在东京的视觉日记",
      title: "时间\n遗落\n之地",
      intro: "摄影、徒步、海风、小街道，以及那些不想只留在社交媒体里的安静瞬间。",
      sideYear: "2026 / 档案",
      sideText: "TokyoLab 是一个小型个人档案馆，用来保存照片、旅行笔记和在日本生活的片段。",
      sideLink: "了解 TokyoLab →",
      latestPhotos: "最新照片",
      viewAll: "查看全部 →",
      latestPosts: "最新文章",
      archive: "文章归档 →"
    },
    pages: {
      photosKicker: "视觉档案",
      photosTitle: "照片",
      photosIntro: "这里保存我走过的地方，把日本生活里的安静画面慢慢归档。",
      postsKicker: "文字档案",
      postsTitle: "文章",
      postsIntro: "关于徒步、摄影、日本生活以及所思所感的记录。",
      searchKicker: "找点什么",
      searchTitle: "搜索",
      searchPlaceholder: "搜索...",
      searchEmpty: "可以搜索照片、文章、地点、相机、镜头或标签。",
      noResults: "没有找到结果：",
      aboutKicker: "关于",
      aboutTitle: "TokyoLab",
      aboutLabel: "Jeffrey / 东京",
      aboutP1: "我是 Jeffrey，目前生活在东京。我喜欢用照片和文字记录徒步、旅行以及生活里那些安静、美好值得留下来的瞬间。",
      aboutP2: "Hike给我的生活增添了很多乐趣，徒步旅程中见识到了很多景色、遇到了很多有趣的人，都市的快节奏下，回归乡野寻找舒适、休闲的生活方式，让自己不至于那么紧绷。",
      aboutP3: "相比既定生活而言，每次徒步都充满着未知，未知的人、未知的商店、未知的景色，这都能带给我生活更多的新鲜感。",
      aboutP4: "逃离都市让我做了很多平时没有机会做的事：有了时间去乡下商铺老板坐下来聊聊天，在人迹罕至的山间⛰️坐在帐篷听雨声。",
      aboutP5: "这些经历不断给我充能，我享受这种生活，也想把旅行中的欢乐跟大家分享。",
      aboutP6: "TokyoLab 是我的个人blog：这里存放着我的所思所感、摄影作品集，希望也能带给你一些收获。"
    },
    photo: {
      location: "地点",
      date: "日期",
      camera: "相机",
      lens: "镜头",
      settings: "参数",
      note: "文字",
      related: "相关照片",
      allPhotos: "全部照片 →",
      backPhotos: "返回照片"
    },
    sponsors: {
      kicker: "支持这个档案馆",
      title: "赞助",
      thanks: "感谢所有支持者。",
      intro: "如果你喜欢 TokyoLab，觉得这里的照片或文字对你有帮助，可以支持这个档案馆。它会帮助这个网站保持独立、安静，并继续存在于社交媒体之外。",
      support: "支持 TokyoLab",
      howLink: "这是怎么运作的？",
      circles: "赞助者",
      tiers: "赞助档位",
      coffee: "Coffee",
      film: "Film Roll",
      journey: "Journey",
      priceCoffee: "¥30 / 一次",
      priceFilm: "¥100 / 一次",
      priceJourney: "¥500 / 一次",
      descCoffee: "如果你喜欢某张照片、某篇文章或某个指南，可以请我喝杯咖啡。",
      descFilm: "支持未来的拍摄、网站维护和档案整理。",
      descJourney: "适合想长期支持 TokyoLab 这个个人项目的读者。",
      choose: "选择支付方式 →",
      payments: "支付方式",
      paymentIntro: "选择可用的赞助方式，按钮会直接打开官方支付页面，不需要复制链接。",
      buyCoffee: "Buy Me a Coffee",
      buyCoffeeDesc: "适合海外读者的一次性小额支持。",
      paypal: "PayPal",
      paypalDesc: "简单的国际支付方式。",
      alipay: "支付宝",
      alipayDesc: "适合中文读者和人民币支持。",
      kofi: "Ko-fi",
      kofiDesc: "创作者常用的支持页面，干净也容易分享。",
      crypto: "Crypto",
      cryptoDesc: "适合偏好 USDT 或稳定币的读者。",
      openPayment: "打开支付页面 →",
      addPaymentLink: "即将开放",
      addLink: "https://buymeacoffee.com/jfreyframes",
      addPaypal: "PayPal 页面地址",
      addAlipay: "支付宝页面或二维码页面",
      addKofi: "https://ko-fi.com/jfrey",
      addCrypto: "钱包地址和网络信息",
      howTitle: "这是怎么运作的？",
      howLabel: "简单 / 自愿",
      howP1: "赞助完全自愿。网站内容仍然免费阅读。支持只是表示你愿意帮助 TokyoLab 继续在线，并鼓励更多照片、笔记和旅行记录。",
      howP2: "出于隐私考虑，这个静态版本不会收集支付信息。所有支付链接都应该跳转到你自己控制的外部服务。"
    },
    footer: "摄影 / 徒步 / 档案"
  },

  ja: {
    nav: { photos: "写真", posts: "記事", about: "About", sponsors: "支援", search: "検索" },
    home: {
      kicker: "東京を拠点にしたビジュアル日記",
      title: "時間が\n流れることを\n忘れる場所。",
      intro: "写真、ハイキング、海風、小さな路地、そしてSNSだけに流したくない静かな瞬間。",
      sideYear: "2026 / アーカイブ",
      sideText: "TokyoLab は、写真、旅の記録、日本での生活の断片を残すための小さな個人アーカイブです。",
      sideLink: "TokyoLab について →",
      latestPhotos: "最新の写真",
      viewAll: "すべて見る →",
      latestPosts: "最新の記事",
      archive: "アーカイブ →"
    },
    pages: {
      photosKicker: "ビジュアルアーカイブ",
      photosTitle: "写真",
      photosIntro: "歩いてきた場所を、静かな日本の記録として少しずつ残しています。",
      postsKicker: "文章アーカイブ",
      postsTitle: "記事",
      postsIntro: "ハイキング、写真、日本での生活、そして静かな時間についての記録です。",
      searchKicker: "探す",
      searchTitle: "検索",
      searchPlaceholder: "検索...",
      searchEmpty: "写真、記事、場所、カメラ、レンズ、タグを検索できます。",
      noResults: "検索結果がありません：",
      aboutKicker: "About",
      aboutTitle: "TokyoLab",
      aboutLabel: "Jeffrey / Tokyo",
      aboutP1: "Jeffrey です。現在は東京で暮らしています。写真と言葉で、ハイキングや旅、そして日常の中にある静かで美しく、残しておきたい瞬間を記録するのが好きです。",
      aboutP2: "ハイキングは、私の生活にたくさんの楽しさを加えてくれました。歩く旅の中で多くの景色に出会い、面白い人たちにも出会いました。都市の速いリズムの中で、田舎や自然に戻ることは、心地よく、ゆっくりとした生活の感覚を取り戻す時間になっています。",
      aboutP3: "決まった日常と比べると、毎回のハイキングには未知があります。知らない人、知らない店、知らない景色。そのすべてが、生活に新鮮さを与えてくれます。",
      aboutP4: "都市を離れることで、普段はなかなかできないこともできるようになりました。田舎の小さなお店の店主と座って話したり、人の少ない山の中でテントに入り、雨音を聞いたり。",
      aboutP5: "そうした経験は、何度も私を充電してくれます。私はこの生活を楽しんでいますし、旅の中で見つけた楽しさを、みなさんにも共有したいと思っています。",
      aboutP6: "TokyoLab は私の個人ブログです。考えたこと、感じたこと、そして写真作品を置いておく場所です。ここを訪れた人にも、何か少しでも残るものがあればうれしいです。"
    },
    photo: {
      location: "場所",
      date: "日付",
      camera: "カメラ",
      lens: "レンズ",
      settings: "設定",
      note: "メモ",
      related: "関連写真",
      allPhotos: "すべての写真 →",
      backPhotos: "写真一覧へ"
    },
    sponsors: {
      kicker: "アーカイブを支援",
      title: "支援",
      thanks: "すべての支援者に感謝します。",
      intro: "TokyoLab の写真や文章を楽しんでいただけたら、このアーカイブを支援できます。サイトを独立した静かな場所として続ける助けになります。",
      support: "TokyoLab を支援",
      howLink: "仕組みを見る",
      circles: "支援者",
      tiers: "支援プラン",
      coffee: "Coffee",
      film: "Film Roll",
      journey: "Journey",
      priceCoffee: "JPY 600 / 1回",
      priceFilm: "JPY 2,200 / 1回",
      priceJourney: "JPY 12,000 / 1回",
      descCoffee: "気に入った写真、記事、ガイドへの小さなお礼として。",
      descFilm: "今後の写真散歩、ホスティング、アーカイブの維持を支援します。",
      descJourney: "TokyoLab を長期的に支援したい方向けです。",
      choose: "支払い方法を選ぶ →",
      payments: "支払い方法",
      paymentIntro: "利用できる支払い方法を選ぶと、コピー不要で公式の支払いページを直接開けます。",
      buyCoffee: "Buy Me a Coffee",
      buyCoffeeDesc: "海外の読者や小額の一回支援に向いています。",
      paypal: "PayPal",
      paypalDesc: "シンプルな国際決済方法です。",
      alipay: "Alipay",
      alipayDesc: "中国語圏の読者や人民元での支援に便利です。",
      kofi: "Ko-fi",
      kofiDesc: "クリエイター向けの支援ページで、共有しやすいです。",
      crypto: "Crypto",
      cryptoDesc: "USDT やステーブルコインを使いたい読者向けです。",
      openPayment: "支払いページを開く →",
      addPaymentLink: "近日公開",
      addLink: "https://buymeacoffee.com/jfreyframes",
      addPaypal: "PayPal URL",
      addAlipay: "Alipay URL または QR ページ",
      addKofi: "https://ko-fi.com/jfrey",
      addCrypto: "ウォレットとネットワーク情報",
      howTitle: "仕組み",
      howLabel: "シンプル / 任意",
      howP1: "支援は任意です。サイトは無料で読めます。支援は TokyoLab をオンラインで続け、写真や記録を増やすための応援です。",
      howP2: "プライバシーのため、この静的サイトでは支払い情報を収集しません。支払いリンクはあなたが管理する外部サービスに設定してください。"
    },
    footer: "写真 / ハイキング / アーカイブ"
  }
};

const photos = [
  {
    slug: "otaru-hokkaido",
    src: "assets/photos/2026-01-14-hakodate-night-view.jpg",
    detailSrc: "assets/photos/2026-01-14-hakodate-night-view.jpg",
    title: { en: "hakodate, Hokkaido", zh: "函馆，北海道", ja: "函館、北海道" },
    location: { en: "hakodate, Hokkaido, Japan", zh: "日本 北海道 函館", ja: "日本・北海道・函館" },
    date: "2026-01-14",
    year: "2026",
    camera: "Canon EOS R5",
    lens: "RF24-70mm F2.8 L IS USM",
    focalLength: "24mm",
    aperture: "f/2.8",
    shutter: "1/200s",
    iso: "ISO 100",
    tags: ["sea", "hokkaido"],
    caption: { en: "A quiet afternoon by the water.", zh: "水边一个安静的下午。", ja: "水辺の静かな午後。" },
    note: {
      en: "Otaru feels like a city that keeps its memories close to the canal. The light was soft, the wind was cold, and every corner looked like an old postcard.",
      zh: "小樽像是一座把记忆留在运河边的城市。光线很软，风很冷，每个角落都像一张旧明信片。",
      ja: "小樽は、運河のそばに記憶を残している街のように感じました。光は柔らかく、風は冷たく、どの角も古いポストカードのようでした。"
    }
  }
];

const posts = [
  {
    title: {
      en: "Two Years Living in Japan: Life Experience and Is It Still Worth Immigrating?",
      zh: "来日本两年，日本的生活分享及还值得移民吗？",
      ja: "日本に来て2年、生活体験と移住先としての現実"
    },
    date: "2026-01-05",
    year: "2026",
    monthDay: "Jan 05",
    read: "12 min",
    tags: ["visa", "life", "japan"],
    url: "posts/two-years-in-japan-life-and-immigration.html",
    excerpt: {
      en: "A personal note on real life in Tokyo, immigration anxiety, cost, language, and whether Japan still fits as a long-term destination.",
      zh: "基于亲身经历，聊聊东京真实生活、签证焦虑、语言、成本，以及日本是否还值得作为移民目的地。",
      ja: "東京での生活、ビザ不安、言語、コスト、そして日本が長期的な移住先として合うかについての個人的な記録。"
    }
  },
  {
    title: {
      en: "TokyoLab Podcast Launched",
      zh: "TokyoLab Podcast 正式上线",
      ja: "TokyoLab Podcast が始まりました"
    },
    date: "2026-01-15",
    year: "2026",
    monthDay: "Jan 15",
    read: "4 min",
    tags: ["podcast", "tokyolab", "japan"],
    url: "posts/tokyolab-podcast-launched.html",
    excerpt: {
      en: "A slower audio space for immigration, life in Japan, investing, and long-term personal decisions.",
      zh: "一档关于移民、日本生活、投资与长期成长的慢速播客。",
      ja: "移住、日本生活、投資、長期的な成長についてゆっくり考える音声の場所。"
    }
  },
  {
    title: {
      en: "Hiking by the Sea — Odawara City Door to the Sea",
      zh: "海边徒步｜小田原市 Door to the Sea",
      ja: "海辺の散歩｜小田原 Door to the Sea"
    },
    date: "2024-03-28",
    year: "2024",
    monthDay: "Mar 28",
    read: "8 min",
    tags: ["hiking", "sea", "odawara"],
    url: "posts/odawara-door-to-the-sea.html",
    excerpt: {
      en: "A day route from Shinjuku to Odawara, walking toward Door to the Sea, Odawara Castle, and the quiet streets near the coast.",
      zh: "从新宿出发去小田原，走向 Door to the Sea、小田原城和海边小城的安静街道。",
      ja: "新宿から小田原へ向かい、Door to the Sea、小田原城、海辺の静かな道を歩いた記録。"
    }
  },
  {
    title: {
      en: "A Weekend Hike in Hinohara Village and Kanotoiwa",
      zh: "周末去深山徒步｜檜原村 / 神户岩",
      ja: "週末の山歩き｜檜原村・神戸岩"
    },
    date: "2024-03-23",
    year: "2024",
    monthDay: "Mar 23",
    read: "8 min",
    tags: ["hiking", "tokyo"],
    url: "posts/hiking-on-the-mountain.html",
    excerpt: {
      en: "A quiet route through Hinohara Village, Hossawa Falls, and Kanotoiwa, with practical notes on transport, food, and timing.",
      zh: "从檜原村、払沢の滝到神户岩的一次安静徒步，也记录交通、吃饭和时间安排上的现实问题。",
      ja: "檜原村、払沢の滝、神戸岩を歩いた静かな記録。交通、食事、時間配分についても書いています。"
    }
  }
];
