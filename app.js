/* ================================================
   華鏡 — 運命の振袖色診断
   Quiz Engine, Petal Particles & UI Controller
   ================================================ */

// ==================== DATA ====================

const QUESTIONS = [
  {
    question: "手首の内側の血管の色は？",
    options: [
      { text: "明るい青〜紫っぽい色", scores: { spring: 0, summer: 2, autumn: 0, winter: 2 } },
      { text: "緑っぽい色", scores: { spring: 2, summer: 0, autumn: 2, winter: 0 } },
      { text: "青と緑の中間くらい", scores: { spring: 1, summer: 1, autumn: 1, winter: 1 } }
    ]
  },
  {
    question: "日焼けするとどうなりますか？",
    options: [
      { text: "赤くなって、すぐ元に戻る", scores: { spring: 0, summer: 2, autumn: 0, winter: 2 } },
      { text: "赤くなった後、小麦色に定着する", scores: { spring: 2, summer: 0, autumn: 0, winter: 0 } },
      { text: "あまり赤くならず、すぐ小麦色になる", scores: { spring: 0, summer: 0, autumn: 2, winter: 0 } },
      { text: "そもそもあまり焼けない", scores: { spring: 0, summer: 1, autumn: 0, winter: 2 } }
    ]
  },
  {
    question: "瞳の色に近いのは？",
    options: [
      { text: "明るいブラウン・キラキラした印象", scores: { spring: 2, summer: 0, autumn: 0, winter: 0 } },
      { text: "やわらかいブラウン・優しい印象", scores: { spring: 0, summer: 2, autumn: 0, winter: 0 } },
      { text: "深いダークブラウン・落ち着いた印象", scores: { spring: 0, summer: 0, autumn: 2, winter: 0 } },
      { text: "黒に近い・はっきりした印象", scores: { spring: 0, summer: 0, autumn: 0, winter: 2 } }
    ]
  },
  {
    question: "地毛の色に近いのは？",
    options: [
      { text: "明るめのブラウン・ツヤがある", scores: { spring: 2, summer: 0, autumn: 0, winter: 0 } },
      { text: "やわらかいブラウン〜アッシュ系", scores: { spring: 0, summer: 2, autumn: 0, winter: 0 } },
      { text: "暗めのブラウン・マットな質感", scores: { spring: 0, summer: 0, autumn: 2, winter: 0 } },
      { text: "真っ黒に近い・ハリがある", scores: { spring: 0, summer: 0, autumn: 0, winter: 2 } }
    ]
  },
  {
    question: "肌の色味は？",
    options: [
      { text: "明るいアイボリー系で血色感がある", scores: { spring: 2, summer: 0, autumn: 0, winter: 0 } },
      { text: "ピンクがかった色白", scores: { spring: 0, summer: 2, autumn: 0, winter: 0 } },
      { text: "黄みがかったベージュ〜オークル系", scores: { spring: 0, summer: 0, autumn: 2, winter: 0 } },
      { text: "色白で青みがかっている", scores: { spring: 0, summer: 0, autumn: 0, winter: 2 } }
    ]
  },
  {
    question: "似合うと言われるリップの色は？",
    options: [
      { text: "コーラルピンク・オレンジ系", scores: { spring: 2, summer: 0, autumn: 0, winter: 0 } },
      { text: "ローズピンク・ベビーピンク", scores: { spring: 0, summer: 2, autumn: 0, winter: 0 } },
      { text: "テラコッタ・ブラウンレッド", scores: { spring: 0, summer: 0, autumn: 2, winter: 0 } },
      { text: "ワインレッド・フューシャピンク", scores: { spring: 0, summer: 0, autumn: 0, winter: 2 } }
    ]
  },
  {
    question: "シルバーとゴールド、顔映りが良いのは？",
    options: [
      { text: "明るいゴールド（キラキラ系）", scores: { spring: 2, summer: 0, autumn: 0, winter: 0 } },
      { text: "シルバー・プラチナ系", scores: { spring: 0, summer: 2, autumn: 0, winter: 2 } },
      { text: "落ち着いたゴールド（マット系）", scores: { spring: 0, summer: 0, autumn: 2, winter: 0 } }
    ]
  },
  {
    question: "白い服を着たとき、似合うと感じるのは？",
    options: [
      { text: "アイボリー・クリーム色", scores: { spring: 2, summer: 0, autumn: 2, winter: 0 } },
      { text: "真っ白・オフホワイト", scores: { spring: 0, summer: 2, autumn: 0, winter: 2 } }
    ]
  }
];

const RESULTS = {
  spring: {
    type: "spring",
    emoji: "🌸",
    name: "桜タイプ",
    subtitle: "イエベ春（Spring）",
    description: "明るくフレッシュで、可愛らしい華やかさを持つあなた。春の陽だまりのような温かみと透明感が魅力です。振袖も、あなたの持つ明るさと血色感を活かす暖色系がぴったり。",
    keywords: ["明るい", "キュート", "フレッシュ", "華やか", "ツヤ感"],
    palette: [
      { color: "#F5A0B1", name: "桜色", nameEn: "Sakura" },
      { color: "#F7936B", name: "珊瑚色", nameEn: "Coral" },
      { color: "#F0CC68", name: "山吹色", nameEn: "Yamabuki" },
      { color: "#A8D86E", name: "若草色", nameEn: "Wakakusa" },
      { color: "#FFF5E0", name: "練色", nameEn: "Neri" }
    ],
    furisodeAdvice: "コーラルピンクやクリームイエロー、若草色など、<strong>明るく鮮やかな暖色系</strong>の振袖が顔映えします。小花柄や可愛らしい古典柄がよく似合います。",
    stylingTips: [
      { icon: "👘", title: "振袖の柄", text: "小花柄、梅、桜など可愛らしいモチーフが得意。明るい色彩の古典柄も◎" },
      { icon: "🎀", title: "帯の合わせ方", text: "クリーム系やパステルカラーの帯で全体を明るく。ゴールドの帯締めでアクセントを" },
      { icon: "💍", title: "小物選び", text: "キラキラしたゴールド系の小物、パールの髪飾りが透明感をプラス" },
      { icon: "💄", title: "メイク", text: "コーラルピンクのリップ、オレンジ系チークで血色感を出すのがポイント" }
    ],
    ngColors: "くすんだグレーや暗いカーキ、真っ黒は顔色がくすんで見える場合があります。深みのある秋色よりも、<strong>明るくクリアな色</strong>を選びましょう。",
    furisodeImages: [
      { src: "images/hr220ai (4)_fixed.png", label: "クリーム × 花柄" },
      { src: "images/hr222 (13)_fixed.png", label: "ピンク × 華やか古典" }
    ],
    theme: "theme-spring"
  },
  summer: {
    type: "summer",
    emoji: "💠",
    name: "紫陽花タイプ",
    subtitle: "ブルベ夏（Summer）",
    description: "上品でエレガント、透明感にあふれるあなた。紫陽花のような繊細な美しさが魅力です。穏やかで涼しげな色味の振袖が、あなたの清楚な雰囲気を最大限に引き出します。",
    keywords: ["上品", "エレガント", "透明感", "清楚", "フェミニン"],
    palette: [
      { color: "#A8B4D6", name: "藤色", nameEn: "Fuji" },
      { color: "#8EC5C0", name: "浅葱色", nameEn: "Asagi" },
      { color: "#D6A3C4", name: "薄紅色", nameEn: "Usubeni" },
      { color: "#C4B8D6", name: "藤紫", nameEn: "Fujimurasaki" },
      { color: "#E8E0EC", name: "白藤色", nameEn: "Shirafuji" }
    ],
    furisodeAdvice: "ラベンダーや水色、ローズピンクなど、<strong>明るいトーンのくすみカラー</strong>の振袖が透明感を引き立てます。繊細な花柄やグラデーションが美しく映えます。",
    stylingTips: [
      { icon: "👘", title: "振袖の柄", text: "藤、撫子、紫陽花など繊細な花柄が得意。グラデーションのある色使いも◎" },
      { icon: "🎀", title: "帯の合わせ方", text: "シルバーや淡いラベンダー系の帯で上品に。同系色でまとめると統一感UP" },
      { icon: "💍", title: "小物選び", text: "シルバー系の小物やパステルカラーの帯揚げで涼やかに。パールも好相性" },
      { icon: "💄", title: "メイク", text: "ローズ系のリップ、ピンクベージュのチーク、ラベンダー系のアイカラーで透明感を演出" }
    ],
    ngColors: "オレンジやマスタードなど黄みの強い色、ドギツい原色は浮いて見えることがあります。<strong>明るくソフトな寒色系</strong>を選ぶと間違いなしです。",
    furisodeImages: [
      { src: "images/hr145 (9)_fixed.png", label: "紫 × 繊細花柄" },
      { src: "images/hi256ai (4)_fixed.png", label: "水色 × 古典柄" }
    ],
    theme: "theme-summer"
  },
  autumn: {
    type: "autumn",
    emoji: "🍁",
    name: "紅葉タイプ",
    subtitle: "イエベ秋（Autumn）",
    description: "ゴージャスでリッチ、大人っぽい落ち着きのあるあなた。紅葉のような深みのある暖かさが魅力です。こっくりとした深い色味の振袖が、あなたのリッチな雰囲気にぴったりです。",
    keywords: ["ゴージャス", "リッチ", "大人っぽい", "シック", "ナチュラル"],
    palette: [
      { color: "#C87941", name: "紅葉色", nameEn: "Momiji" },
      { color: "#8B6D2E", name: "琥珀色", nameEn: "Kohaku" },
      { color: "#5B7A3A", name: "松葉色", nameEn: "Matsuba" },
      { color: "#A67C52", name: "朽葉色", nameEn: "Kuchiba" },
      { color: "#8E3A40", name: "蘇芳色", nameEn: "Suou" }
    ],
    furisodeAdvice: "テラコッタやマスタード、深緑など、<strong>深みのある暖色系</strong>の振袖が映えます。アンティーク調の振袖や大柄の牡丹柄がゴージャスな雰囲気を引き立てます。",
    stylingTips: [
      { icon: "👘", title: "振袖の柄", text: "大柄の牡丹や菊、アンティーク調の柄が得意。レトロモダンなデザインも◎" },
      { icon: "🎀", title: "帯の合わせ方", text: "ゴールドやダークグリーンの帯でリッチに。アンティーク調の帯でおしゃれ上級者に" },
      { icon: "💍", title: "小物選び", text: "べっ甲風の髪飾り、マットゴールドの帯留め、アースカラーの帯揚げがよく似合う" },
      { icon: "💄", title: "メイク", text: "テラコッタリップ、ブラウン系チーク、カーキやブラウンのアイカラーで大人っぽく" }
    ],
    ngColors: "パステルカラーや明るいピンク系は、顔がぼやけて見えることがあります。<strong>深みのある落ち着いた色</strong>を選ぶと顔が締まり、美しさが際立ちます。",
    furisodeImages: [
      { src: "images/hr239 (13)_fixed.png", label: "赤 × 古典花柄" },
      { src: "images/hr244 (10)_fixed.png", label: "黄 × 華やか牡丹" },
      { src: "images/hr251ai (13)_fixed.png", label: "深緑 × 松竹梅" }
    ],
    theme: "theme-autumn"
  },
  winter: {
    type: "winter",
    emoji: "❄️",
    name: "椿タイプ",
    subtitle: "ブルベ冬（Winter）",
    description: "クールでドラマチック、凛とした美しさを持つあなた。椿のような鮮やかなコントラストが魅力です。パキッとした鮮やかな色やシックなモノトーンの振袖が、あなたの存在感を最大限に引き出します。",
    keywords: ["クール", "ドラマチック", "凛とした", "モダン", "シャープ"],
    palette: [
      { color: "#4A6FA5", name: "群青色", nameEn: "Gunjou" },
      { color: "#C44569", name: "紅色", nameEn: "Kurenai" },
      { color: "#8A8D91", name: "銀鼠色", nameEn: "Ginnezumi" },
      { color: "#2D2D3F", name: "鉄紺", nameEn: "Tetsukon" },
      { color: "#FFFFFF", name: "白", nameEn: "Shiro" }
    ],
    furisodeAdvice: "ロイヤルブルーやマゼンタ、黒など、<strong>パキッとした鮮やかな色</strong>の振袖が主役級の存在感を放ちます。モダンな柄やコントラストの効いたデザインが得意です。",
    stylingTips: [
      { icon: "👘", title: "振袖の柄", text: "モダンな幾何学柄、大胆な色使いの柄が得意。黒地×ビビッドカラーも◎" },
      { icon: "🎀", title: "帯の合わせ方", text: "シルバーや黒の帯でクールに。白×黒のモノトーンコーデもスタイリッシュ" },
      { icon: "💍", title: "小物選び", text: "プラチナ系の小物、クリスタルの髪飾り、ビビッドカラーの帯揚げで華やかに" },
      { icon: "💄", title: "メイク", text: "ワインレッドのリップ、ローズ系チーク、シルバーラメのアイカラーで華やかかつクールに" }
    ],
    ngColors: "くすんだベージュやオレンジ系、中途半端な色味は顔がぼんやり見えることがあります。<strong>はっきりとした鮮やかな色 or モノトーン</strong>を選びましょう。",
    furisodeImages: [
      { src: "images/hr161ai (5)_fixed.png", label: "黒 × モダン大柄" }
    ],
    theme: "theme-winter"
  }
};

// ==================== STATE ====================

let currentQuestion = 0;
let answers = [];
let scores = { spring: 0, summer: 0, autumn: 0, winter: 0 };

// ==================== DOM ELEMENTS ====================

const heroSection = document.getElementById('hero');
const introSection = document.getElementById('intro');
const quizSection = document.getElementById('quiz');
const resultSection = document.getElementById('result');
const scrollToIntroBtn = document.getElementById('scroll-to-intro');
const startQuizBtn = document.getElementById('start-quiz-btn');
const backBtn = document.getElementById('back-btn');
const retryBtn = document.getElementById('retry-btn');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const quizCard = document.getElementById('quiz-card');

// ==================== PETAL PARTICLE SYSTEM ====================

class PetalSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.petals = [];
    this.maxPetals = 25;
    this.colors = ['#f5a0b1', '#f0d68a', '#a8b4d6', '#c87941'];
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createPetal() {
    return {
      x: Math.random() * this.canvas.width,
      y: -20,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: Math.random() * 0.6 - 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.3 + 0.1,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.01 + 0.005
    };
  }

  drawPetal(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.rotation);
    this.ctx.globalAlpha = p.opacity;
    this.ctx.fillStyle = p.color;
    this.ctx.beginPath();
    // Petal shape
    this.ctx.moveTo(0, 0);
    this.ctx.bezierCurveTo(
      p.size * 0.5, -p.size * 0.8,
      p.size, -p.size * 0.3,
      0, p.size
    );
    this.ctx.bezierCurveTo(
      -p.size, -p.size * 0.3,
      -p.size * 0.5, -p.size * 0.8,
      0, 0
    );
    this.ctx.fill();
    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Add new petals
    if (this.petals.length < this.maxPetals && Math.random() < 0.03) {
      this.petals.push(this.createPetal());
    }

    // Update and draw
    this.petals = this.petals.filter(p => {
      p.y += p.speedY;
      p.sway += p.swaySpeed;
      p.x += p.speedX + Math.sin(p.sway) * 0.3;
      p.rotation += p.rotationSpeed;

      if (p.y > this.canvas.height + 20) return false;

      this.drawPetal(p);
      return true;
    });

    requestAnimationFrame(() => this.animate());
  }

  setSeasonColors(season) {
    const colorMap = {
      spring: ['#f5a0b1', '#f7c89b', '#c8e6a0', '#ffd4dc'],
      summer: ['#a8b4d6', '#8ec5c0', '#d6a3c4', '#c4b8d6'],
      autumn: ['#c87941', '#8b6d2e', '#a67c52', '#d4a052'],
      winter: ['#4a6fa5', '#c44569', '#8a8d91', '#e0e0e8']
    };
    this.colors = colorMap[season] || this.colors;
  }
}

// ==================== QUIZ ENGINE ====================

function startQuiz() {
  currentQuestion = 0;
  answers = [];
  scores = { spring: 0, summer: 0, autumn: 0, winter: 0 };

  heroSection.style.display = 'none';
  introSection.style.display = 'none';
  resultSection.style.display = 'none';
  quizSection.style.display = 'flex';

  window.scrollTo({ top: 0, behavior: 'smooth' });
  showQuestion();
}

function showQuestion() {
  const q = QUESTIONS[currentQuestion];

  // Update progress
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${currentQuestion + 1} / ${QUESTIONS.length}`;

  // Animate card
  quizCard.style.animation = 'none';
  quizCard.offsetHeight; // trigger reflow
  quizCard.style.animation = 'cardFadeIn 0.5s var(--ease-out) both';

  // Update content
  questionNumber.textContent = `Question ${currentQuestion + 1}`;
  questionText.textContent = q.question;

  // Build options
  optionsContainer.innerHTML = '';
  const labels = ['A', 'B', 'C', 'D'];
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-label">${labels[i]}</span>
      <span class="option-text">${opt.text}</span>
    `;
    btn.addEventListener('click', () => selectOption(i));
    optionsContainer.appendChild(btn);
  });

  // Back button
  backBtn.style.display = currentQuestion > 0 ? 'inline-flex' : 'none';
}

function selectOption(optionIndex) {
  const q = QUESTIONS[currentQuestion];
  const selectedScores = q.options[optionIndex].scores;

  // Save answer
  answers[currentQuestion] = optionIndex;

  // Add scores
  Object.keys(selectedScores).forEach(key => {
    scores[key] += selectedScores[key];
  });

  // Visual feedback
  const btns = optionsContainer.querySelectorAll('.option-btn');
  btns[optionIndex].style.borderColor = 'rgba(212, 168, 67, 0.6)';
  btns[optionIndex].style.background = 'rgba(212, 168, 67, 0.1)';

  // Next question or show result
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < QUESTIONS.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 350);
}

function goBack() {
  if (currentQuestion > 0) {
    // Remove last answer's scores
    const prevAnswer = answers[currentQuestion - 1];
    const prevScores = QUESTIONS[currentQuestion - 1].options[prevAnswer].scores;
    Object.keys(prevScores).forEach(key => {
      scores[key] -= prevScores[key];
    });
    answers.pop();

    currentQuestion--;
    showQuestion();
  }
}

// ==================== RESULT DISPLAY ====================

function showResult() {
  // Determine winning type
  const resultType = Object.keys(scores).reduce((a, b) => scores[a] >= scores[b] ? a : b);
  const result = RESULTS[resultType];
  currentResultType = resultType;

  // Change theme
  document.body.className = result.theme;
  petalSystem.setSeasonColors(resultType);

  // Hide quiz, show result
  quizSection.style.display = 'none';
  resultSection.style.display = 'block';

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Populate result
  document.getElementById('result-emoji').textContent = result.emoji;
  document.getElementById('result-type-name').innerHTML = `${result.name}<small style="display:block;font-size:0.5em;color:var(--text-muted);font-weight:400;margin-top:0.3em;">${result.subtitle}</small>`;
  document.getElementById('result-description').textContent = result.description;

  // Keywords
  const keywordsEl = document.getElementById('result-keywords');
  keywordsEl.innerHTML = result.keywords.map(k => `<span class="keyword-tag">${k}</span>`).join('');

  // Color Palette
  const paletteEl = document.getElementById('result-palette');
  paletteEl.innerHTML = result.palette.map(c => `
    <div class="color-chip">
      <div class="color-swatch" style="background:${c.color};"></div>
      <div class="color-name">${c.name}</div>
      <div class="color-name-en">${c.nameEn}</div>
    </div>
  `).join('');

  // Furisode Advice
  document.getElementById('furisode-advice').innerHTML = result.furisodeAdvice;

  // Furisode Images
  const galleryEl = document.getElementById('furisode-gallery');
  if (result.furisodeImages && result.furisodeImages.length > 0) {
    galleryEl.innerHTML = result.furisodeImages.map(img => `
      <div class="furisode-image-item">
        <img src="${img.src}" alt="${img.label}" loading="lazy">
        <p class="furisode-image-label">${img.label}</p>
      </div>
    `).join('');
  } else {
    galleryEl.innerHTML = '';
  }

  // Styling Tips
  const tipsEl = document.getElementById('styling-tips');
  tipsEl.innerHTML = result.stylingTips.map(t => `
    <div class="styling-tip">
      <span class="tip-icon">${t.icon}</span>
      <div class="tip-content">
        <h4>${t.title}</h4>
        <p>${t.text}</p>
      </div>
    </div>
  `).join('');

  // NG Colors
  document.getElementById('ng-colors').innerHTML = result.ngColors;
}

function resetQuiz() {
  document.body.className = '';
  petalSystem.colors = ['#f5a0b1', '#f0d68a', '#a8b4d6', '#c87941'];

  resultSection.style.display = 'none';
  couponSection.style.display = 'none';
  reservationSection.style.display = 'none';
  heroSection.style.display = 'flex';
  introSection.style.display = 'block';

  // Reset coupon state
  luckyCard.classList.remove('flipped');
  couponRevealed.style.display = 'none';
  reservationForm.style.display = '';
  reservationComplete.style.display = 'none';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== COUPON FLOW ====================

const couponSection = document.getElementById('coupon');
const reservationSection = document.getElementById('reservation');
const goToCouponBtn = document.getElementById('go-to-coupon-btn');
const goToReservationBtn = document.getElementById('go-to-reservation-btn');
const luckyCard = document.getElementById('lucky-card');
const luckyCardWrapper = document.getElementById('lucky-card-wrapper');
const couponRevealed = document.getElementById('coupon-revealed');
const reservationForm = document.getElementById('reservation-form');
const reservationComplete = document.getElementById('reservation-complete');
const backToCouponBtn = document.getElementById('back-to-coupon-btn');

let currentResultType = null;

function goToCouponPage() {
  resultSection.style.display = 'none';
  couponSection.style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function flipCard() {
  if (luckyCard.classList.contains('flipped')) return;

  luckyCard.classList.add('flipped');

  setTimeout(() => {
    couponRevealed.style.display = 'block';
  }, 900);
}

function goToReservationPage() {
  couponSection.style.display = 'none';
  reservationSection.style.display = 'flex';

  // Auto-fill diagnosis result
  const result = RESULTS[currentResultType];
  if (result) {
    const diagnosisText = `おすすめ：${result.name}`;
    document.getElementById('res-diagnosis').innerHTML = `<span>${diagnosisText}</span>`;
    // Sync with hidden input for Formspree
    document.getElementById('hidden-diagnosis').value = diagnosisText;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function handleReservation(e) {
  e.preventDefault();

  const form = e.target;
  const button = form.querySelector('.btn-submit');
  const originalBtnText = button.innerHTML;

  // Loading state
  button.disabled = true;
  button.innerHTML = '<span>送信中...</span>';

  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Hide form, show completion
      const formCard = reservationForm.closest('.reservation-card');
      formCard.style.display = 'none';
      reservationComplete.style.display = 'block';
    } else {
      const data = await response.json();
      if (data.errors) {
        alert(data.errors.map(error => error.message).join(', '));
      } else {
        alert('送信に失敗しました。時間をおいて再度お試しください。');
      }
    }
  } catch (error) {
    alert('ネットワークエラーが発生しました。インターネット接続を確認してください。');
  } finally {
    button.disabled = false;
    button.innerHTML = originalBtnText;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function backToCoupon() {
  reservationSection.style.display = 'none';
  couponSection.style.display = 'flex';

  // Reset reservation form display
  const formCard = reservationForm.closest('.reservation-card');
  formCard.style.display = '';
  reservationComplete.style.display = 'none';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== EVENT LISTENERS ====================

scrollToIntroBtn.addEventListener('click', () => {
  introSection.scrollIntoView({ behavior: 'smooth' });
});

startQuizBtn.addEventListener('click', startQuiz);
backBtn.addEventListener('click', goBack);
retryBtn.addEventListener('click', resetQuiz);

// Coupon flow events
goToCouponBtn.addEventListener('click', goToCouponPage);
luckyCardWrapper.addEventListener('click', flipCard);
goToReservationBtn.addEventListener('click', goToReservationPage);
reservationForm.addEventListener('submit', handleReservation);
backToCouponBtn.addEventListener('click', backToCoupon);

// ==================== INIT ====================

const petalSystem = new PetalSystem(document.getElementById('petals-canvas'));

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.glass-card').forEach(card => {
  observer.observe(card);
});
