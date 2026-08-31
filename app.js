/* ===================== TCF B2 Prep App ===================== */
"use strict";

/* ---------- Utilities ---------- */
function $(sel, root) { return (root || document).querySelector(sel); }
function $all(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
function escapeHtml(str) {
  return String(str == null ? "" : str).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function todayStr() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function daysBetween(a, b) {
  return Math.round((b - a) / 86400000);
}
function setApp(html) { $("#app").innerHTML = html; }
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { t.hidden = true; }, 2200);
}
function navigate(hash) { location.hash = hash; }

/* ---------- State ---------- */
const STORAGE_KEY = "tcfB2State_v1";
function defaultState() {
  return {
    srs: {},              // fr word -> { box: 0-5, due: timestamp }
    grammarScores: {},    // topicId -> { correct, total, date }
    readingScores: {},    // id -> { correct, total, date }
    listeningScores: {},  // id -> { correct, total, date }
    writingDone: {},      // id -> { date, wordCount }
    speakingDone: {},     // id -> { date }
    lessonScores: {},     // lesson id -> { correct, total, date } (mini quiz from common errors)
    activityDates: [],    // list of "YYYY-MM-DD"
    lastActive: null,
    streak: 0,
  };
}
let state = loadState();
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  } catch (e) { return defaultState(); }
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* storage full/unavailable */ }
}
function touchActivity() {
  const today = todayStr();
  if (state.lastActive === today) { saveState(); updateStreakBadge(); return; }
  if (state.lastActive) {
    const gap = daysBetween(new Date(state.lastActive), new Date(today));
    state.streak = gap === 1 ? state.streak + 1 : 1;
  } else {
    state.streak = 1;
  }
  state.lastActive = today;
  if (!state.activityDates.includes(today)) state.activityDates.push(today);
  saveState();
  updateStreakBadge();
}
function updateStreakBadge() { $("#streakCount").textContent = state.streak || 0; }

/* ---------- Quiz helper (used by grammar / reading / listening) ---------- */
function quizHTML(questions) {
  return questions.map((q, qi) => `
    <div class="q-block" data-qi="${qi}">
      <div class="q-text">${qi + 1}. ${escapeHtml(q.q)}</div>
      <div class="opts">
        ${q.options.map((opt, oi) => `<button type="button" class="opt" data-qi="${qi}" data-oi="${oi}">${escapeHtml(opt)}</button>`).join("")}
      </div>
      <div class="opt-explain" data-explain="${qi}" hidden></div>
    </div>
  `).join("");
}
function attachQuiz(container, questions, onFinish) {
  const answered = new Array(questions.length).fill(false);
  let score = 0;
  container.addEventListener("click", function (e) {
    const btn = e.target.closest(".opt");
    if (!btn || !container.contains(btn)) return;
    const qi = +btn.dataset.qi, oi = +btn.dataset.oi;
    if (answered[qi]) return;
    answered[qi] = true;
    const q = questions[qi];
    $all(`.opt[data-qi="${qi}"]`, container).forEach((o) => {
      const ooi = +o.dataset.oi;
      if (ooi === q.answerIndex) o.classList.add("correct");
      else if (ooi === oi) o.classList.add("incorrect");
      o.disabled = true;
    });
    if (oi === q.answerIndex) score++;
    if (q.explanation) {
      const ex = container.querySelector(`[data-explain="${qi}"]`);
      ex.hidden = false;
      ex.textContent = "💡 " + q.explanation;
    }
    if (answered.every(Boolean)) onFinish(score, questions.length);
  });
}

/* ---------- French speech synthesis ---------- */
let frVoices = [];
function loadVoices() {
  const all = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
  frVoices = all.filter((v) => v.lang && v.lang.toLowerCase().startsWith("fr"));
}
if (window.speechSynthesis) {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}
function speakFrench(text, opts) {
  if (!window.speechSynthesis) { toast("La synthèse vocale n'est pas disponible sur ce navigateur."); return; }
  opts = opts || {};
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "fr-FR";
  if (frVoices[opts.voiceIndex || 0]) u.voice = frVoices[opts.voiceIndex || 0];
  u.rate = opts.rate || 1;
  u.pitch = opts.pitch || 1;
  if (opts.onend) u.onend = opts.onend;
  speechSynthesis.speak(u);
}
function speakSequence(lines, opts, onDone) {
  speechSynthesis.cancel();
  let i = 0;
  function next() {
    if (i >= lines.length) { if (onDone) onDone(); return; }
    const voiceIdx = frVoices.length > 1 ? i % 2 : 0;
    const pitch = frVoices.length > 1 ? 1 : (i % 2 === 0 ? 1 : 1.15);
    speakFrench(lines[i], { rate: opts.rate, voiceIndex: voiceIdx, pitch: pitch, onend: () => { i++; next(); } });
  }
  next();
}

/* ================= ROUTER ================= */
function parseHash() {
  const h = location.hash.replace(/^#\/?/, "");
  const parts = h.split("/").filter(Boolean);
  return parts.length ? parts : ["home"];
}
const NAV_GROUP = { home: "home", lessons: "lessons", flashcards: "flashcards", grammar: "grammar", skills: "skills", reading: "skills", listening: "skills", writing: "skills", speaking: "skills", progress: "progress" };
const BACK_TARGET = {
  "flashcards/study": "#/flashcards",
  "lessons/detail": "#/lessons",
  "grammar/detail": "#/grammar",
  "reading/list": "#/skills",
  "reading/detail": "#/reading",
  "listening/list": "#/skills",
  "listening/detail": "#/listening",
  "writing/list": "#/skills",
  "writing/detail": "#/writing",
  "speaking/list": "#/skills",
  "speaking/detail": "#/speaking",
  "skills/hub": "#/home",
};

function render() {
  window.scrollTo(0, 0);
  const parts = parseHash();
  const route = parts[0];
  const sub = parts[1];

  $all(".navitem").forEach((a) => a.classList.toggle("active", a.dataset.route === (NAV_GROUP[route] || route)));

  let title = "TCF B2";
  let backHash = null;

  switch (route) {
    case "home": title = "TCF B2"; renderHome(); break;
    case "lessons":
      if (sub) { title = "Leçon"; backHash = BACK_TARGET["lessons/detail"]; renderLessonDetail(sub); }
      else { title = "Leçons (A1 → B2)"; renderLessonsList(); }
      break;
    case "flashcards":
      if (sub === "study") { title = "Session de cartes"; backHash = BACK_TARGET["flashcards/study"]; renderFlashcardStudy(); }
      else { title = "Cartes de vocabulaire"; renderFlashcardsHome(); }
      break;
    case "grammar":
      if (sub) { title = "Grammaire"; backHash = BACK_TARGET["grammar/detail"]; renderGrammarDetail(sub); }
      else { title = "Grammaire"; renderGrammarList(); }
      break;
    case "skills": title = "Épreuves de l'examen"; backHash = BACK_TARGET["skills/hub"]; renderSkillsHub(); break;
    case "reading":
      if (sub) { title = "Compréhension écrite"; backHash = BACK_TARGET["reading/detail"]; renderReadingDetail(sub); }
      else { title = "Compréhension écrite"; backHash = BACK_TARGET["reading/list"]; renderReadingList(); }
      break;
    case "listening":
      if (sub) { title = "Compréhension orale"; backHash = BACK_TARGET["listening/detail"]; renderListeningDetail(sub); }
      else { title = "Compréhension orale"; backHash = BACK_TARGET["listening/list"]; renderListeningList(); }
      break;
    case "writing":
      if (sub) { title = "Expression écrite"; backHash = BACK_TARGET["writing/detail"]; renderWritingDetail(sub); }
      else { title = "Expression écrite"; backHash = BACK_TARGET["writing/list"]; renderWritingList(); }
      break;
    case "speaking":
      if (sub) { title = "Expression orale"; backHash = BACK_TARGET["speaking/detail"]; renderSpeakingDetail(sub); }
      else { title = "Expression orale"; backHash = BACK_TARGET["speaking/list"]; renderSpeakingList(); }
      break;
    case "progress": title = "Ma progression"; renderProgress(); break;
    default: renderHome();
  }
  $("#topbarTitle").textContent = title;
  const backBtn = $("#backBtn");
  if (backHash) { backBtn.hidden = false; backBtn.onclick = () => navigate(backHash); }
  else backBtn.hidden = true;
}
window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => {
  updateStreakBadge();
  render();
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
});

/* ================= HOME ================= */
function tile(hash, emoji, label, sub) {
  return `<a class="tile" href="${hash}"><span class="emoji">${emoji}</span><span class="label">${label}</span><span class="sub">${sub}</span></a>`;
}
function renderHome() {
  const dueCount = VOCAB_DATA.filter((c) => isDue(c)).length;
  const masteredCount = Object.values(state.srs).filter((r) => r.box >= 4).length;
  setApp(`
    <div class="card">
      <h2>Bonjour 👋</h2>
      <p class="muted">Préparez le TCF et visez le niveau B2 : vocabulaire, grammaire, lecture, écoute, écriture et expression orale, le tout dans une seule application.</p>
      <div class="stat-row mt12">
        <div class="stat-box"><div class="num">🔥 ${state.streak || 0}</div><div class="lbl">jours de suite</div></div>
        <div class="stat-box"><div class="num">${dueCount}</div><div class="lbl">cartes à réviser</div></div>
        <div class="stat-box"><div class="num">${masteredCount}/${VOCAB_DATA.length}</div><div class="lbl">mots maîtrisés</div></div>
      </div>
    </div>
    <div class="section-title">Modules d'entraînement</div>
    <div class="tile-grid">
      ${tile("#/lessons", "📚", "Leçons (A1→B2)", LESSONS_DATA.length + " leçons pas à pas")}
      ${tile("#/flashcards", "🗂️", "Cartes de vocabulaire", VOCAB_DATA.length + " mots · A1→B2")}
      ${tile("#/grammar", "📐", "Grammaire", GRAMMAR_DATA.length + " points clés B2")}
      ${tile("#/reading", "📖", "Compréhension écrite", READING_DATA.length + " textes")}
      ${tile("#/listening", "🎧", "Compréhension orale", LISTENING_DATA.length + " exercices")}
      ${tile("#/writing", "✍️", "Expression écrite", "3 types d'épreuve")}
      ${tile("#/speaking", "🗣️", "Expression orale", "3 types d'épreuve")}
    </div>
    <div class="section-title">À propos du TCF</div>
    <div class="card">
      <p>Le TCF évalue 4 compétences (compréhension orale, structures de langue, compréhension écrite obligatoires + expression écrite et orale en option). Le score va de 100 à 699 ; le niveau <b>B2</b> correspond généralement à un score d'environ <b>400 à 499</b> points par épreuve.</p>
      <a class="btn secondary mt8" href="#/progress" style="text-decoration:none;">Voir ma progression</a>
    </div>
  `);
}

/* ================= FLASHCARDS ================= */
const LEVELS = ["A1", "A2", "B1", "B2"];
VOCAB_DATA.forEach((c) => { c.deck = "core"; });
const CURRICULUM_VOCAB_DATA = LESSONS_DATA.flatMap((lesson) =>
  lesson.vocab.map((v) => ({
    fr: v.fr, en: v.en, fa: v.fa,
    level: lesson.level, category: lesson.title, lessonId: lesson.id, deck: "lessons",
  }))
);
const DECKS = {
  core: { label: "Vocabulaire TCF (" + VOCAB_DATA.length + " mots)", data: VOCAB_DATA, levels: ["A1", "A2", "B1", "B2"] },
  lessons: { label: "Cours particulier (" + LESSONS_DATA.length + " leçons)", data: CURRICULUM_VOCAB_DATA, levels: ["A1", "A2", "B1", "B2"] },
};
function srsKey(card) { return card.deck + "::" + card.fr; }
function isDue(card) {
  const rec = state.srs[srsKey(card)];
  if (!rec) return true;
  return rec.due <= Date.now();
}
let flashDeck = localStorage.getItem("flashDeck") || "core";
let flashFilterByDeck = JSON.parse(localStorage.getItem("flashFilterByDeck") || "{}");
function currentFilter() { return flashFilterByDeck[flashDeck] || []; }
function setCurrentFilter(arr) { flashFilterByDeck[flashDeck] = arr; localStorage.setItem("flashFilterByDeck", JSON.stringify(flashFilterByDeck)); }

function renderFlashcardsHome() {
  const deckLevels = DECKS[flashDeck].levels;
  const deckData = DECKS[flashDeck].data;
  const filter = currentFilter();
  const filtered = filter.length ? deckData.filter((c) => filter.includes(c.level)) : deckData;
  const due = filtered.filter(isDue).length;
  const mastered = filtered.filter((c) => (state.srs[srsKey(c)] || {}).box >= 4).length;
  setApp(`
    <div class="chip-row" id="deckChips">
      ${Object.keys(DECKS).map((k) => `<button type="button" class="chip ${flashDeck === k ? "active" : ""}" data-deck="${k}">${DECKS[k].label}</button>`).join("")}
    </div>
    <p class="muted">Choisissez un ou plusieurs niveaux, puis lancez une session de révision (méthode Leitner : les cartes difficiles reviennent plus souvent).</p>
    <div class="chip-row" id="levelChips">
      ${deckLevels.map((l) => `<button type="button" class="chip ${filter.includes(l) ? "active" : ""}" data-lvl="${l}">${l}</button>`).join("")}
    </div>
    <div class="stat-row mb12">
      <div class="stat-box"><div class="num">${filtered.length}</div><div class="lbl">mots sélectionnés</div></div>
      <div class="stat-box"><div class="num">${due}</div><div class="lbl">à réviser</div></div>
      <div class="stat-box"><div class="num">${mastered}</div><div class="lbl">maîtrisés</div></div>
    </div>
    <button class="btn" id="startStudyBtn">▶ Commencer la session (max. 15 cartes)</button>
    <div class="section-title">Répartition par niveau</div>
    ${deckLevels.map((l) => {
      const words = deckData.filter((c) => c.level === l);
      const m = words.filter((c) => (state.srs[srsKey(c)] || {}).box >= 4).length;
      const p = words.length ? Math.round((m / words.length) * 100) : 0;
      return `<div class="list-row"><div><span class="pill ${l.toLowerCase()}">${l}</span>${words.length} mots</div><div class="rt">${m} maîtrisés (${p}%)</div></div>`;
    }).join("")}
  `);
  $all("#deckChips .chip").forEach((btn) => {
    btn.onclick = () => {
      flashDeck = btn.dataset.deck;
      localStorage.setItem("flashDeck", flashDeck);
      renderFlashcardsHome();
    };
  });
  $all("#levelChips .chip").forEach((btn) => {
    btn.onclick = () => {
      const lvl = btn.dataset.lvl;
      const f = currentFilter();
      setCurrentFilter(f.includes(lvl) ? f.filter((x) => x !== lvl) : [...f, lvl]);
      renderFlashcardsHome();
    };
  });
  $("#startStudyBtn").onclick = () => { studySession = null; navigate("#/flashcards/study"); };
}

let studySession = null;
function buildStudySession() {
  const deckData = DECKS[flashDeck].data;
  const filter = currentFilter();
  const pool = filter.length ? deckData.filter((c) => filter.includes(c.level)) : deckData;
  let due = shuffle(pool.filter(isDue));
  let practiceAnyway = false;
  if (due.length === 0) { due = shuffle(pool); practiceAnyway = true; }
  return { cards: due.slice(0, 15), idx: 0, flipped: false, correct: 0, practiceAnyway };
}
function startLessonStudy(lessonId) {
  const lesson = LESSONS_DATA.find((l) => l.id === lessonId);
  if (!lesson) return;
  const cards = lesson.vocab.map((v) => ({
    fr: v.fr, en: v.en, fa: v.fa, level: lesson.level, category: lesson.title, lessonId: lesson.id, deck: "lessons",
  }));
  studySession = { cards: shuffle(cards).slice(0, 20), idx: 0, flipped: false, correct: 0, practiceAnyway: false };
  navigate("#/flashcards/study");
}
function renderFlashcardStudy() {
  if (!studySession) studySession = buildStudySession();
  if (!studySession.cards.length) {
    setApp(`<div class="empty-state">Aucune carte disponible pour ce filtre. <br/><a class="btn secondary mt12" href="#/flashcards" style="text-decoration:none;display:inline-block;">Retour</a></div>`);
    return;
  }
  if (studySession.idx >= studySession.cards.length) {
    const total = studySession.cards.length;
    setApp(`
      <div class="score-banner"><div>Session terminée 🎉</div><div class="big">${studySession.correct}/${total}</div><div class="muted">cartes connues du premier coup</div></div>
      <div class="btn-row">
        <button class="btn secondary" id="againBtn">Nouvelle session</button>
        <a class="btn" href="#/flashcards" style="text-decoration:none;display:flex;align-items:center;justify-content:center;">Terminer</a>
      </div>
    `);
    $("#againBtn").onclick = () => { studySession = buildStudySession(); renderFlashcardStudy(); };
    return;
  }
  const card = studySession.cards[studySession.idx];
  setApp(`
    ${studySession.practiceAnyway ? '<p class="muted center">Aucune carte due aujourd\'hui — session de pratique libre.</p>' : ""}
    <div class="muted center mb8">Carte ${studySession.idx + 1} / ${studySession.cards.length}</div>
    <div class="flash-wrap">
      <div class="flashcard" id="flashcardEl">
        <span class="lvl-tag pill ${card.level.toLowerCase()}">${card.level}</span>
        <span class="cat-tag">${escapeHtml(card.category)}</span>
        ${studySession.flipped ? `
          <div class="flash-back">
            <div class="en">${escapeHtml(card.en)}</div>
            ${card.fa ? `<div class="fa">${escapeHtml(card.fa)}</div>` : ""}
            ${card.example ? `<div class="example">${escapeHtml(card.example)}</div>` : ""}
            ${card.exampleEn ? `<div class="exampleEn">${escapeHtml(card.exampleEn)}</div>` : ""}
          </div>` : `
          <div class="flash-front">
            <div class="word">${escapeHtml(card.fr)}</div>
            ${card.pos ? `<div class="pos">${escapeHtml(card.pos)}</div>` : ""}
          </div>`}
      </div>
    </div>
    <div class="btn-row mb12">
      <button class="btn secondary small" id="speakBtn">🔊 Prononciation</button>
    </div>
    ${studySession.flipped ? `
      <div class="flip-hint">Cette carte, vous la connaissiez ?</div>
      <div class="srs-actions">
        <button class="btn srs-again" data-g="again">Encore</button>
        <button class="btn srs-hard" data-g="hard">Difficile</button>
        <button class="btn srs-good" data-g="good">Bien</button>
        <button class="btn srs-easy" data-g="easy">Facile</button>
      </div>
    ` : `<div class="flip-hint">Touchez la carte pour retourner</div>`}
  `);
  $("#flashcardEl").onclick = () => { studySession.flipped = !studySession.flipped; renderFlashcardStudy(); };
  $("#speakBtn").onclick = (e) => { e.stopPropagation(); speakFrench(card.fr, { rate: 0.9 }); };
  $all(".srs-actions .btn").forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      gradeCard(card, btn.dataset.g);
      studySession.idx++;
      studySession.flipped = false;
      renderFlashcardStudy();
    };
  });
}
const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16, 30];
function gradeCard(card, grade) {
  const key = srsKey(card);
  const rec = state.srs[key] || { box: 0, due: Date.now() };
  let box = rec.box, days;
  if (grade === "again") { box = 1; days = 0; }
  else if (grade === "hard") { box = Math.max(1, box); days = 1; }
  else if (grade === "good") { box = Math.min(5, box + 1); days = BOX_INTERVAL_DAYS[box]; }
  else if (grade === "easy") { box = Math.min(5, box + 2); days = Math.round(BOX_INTERVAL_DAYS[box] * 1.3) || 2; }
  state.srs[key] = { box, due: Date.now() + days * 86400000 };
  if (grade === "good" || grade === "easy") studySession.correct++;
  touchActivity();
}

/* ================= LESSONS (43-lesson curriculum) ================= */
function renderLessonsList() {
  const byLevel = { A1: LESSONS_DATA.filter((l) => l.level === "A1"), A2: LESSONS_DATA.filter((l) => l.level === "A2"), B1: LESSONS_DATA.filter((l) => l.level === "B1"), B2: LESSONS_DATA.filter((l) => l.level === "B2") };
  setApp(`
    <p class="muted">Un parcours guidé de ${LESSONS_DATA.length} leçons (français ↔ persan), du tout débutant (A1) au niveau avancé (B2). Chaque leçon inclut le vocabulaire, des phrases types et les erreurs fréquentes à éviter. Les leçons marquées ▶️ ont un lien vidéo YouTube confirmé.</p>
    ${["A1", "A2", "B1", "B2"].map((lvl) => `
      <div class="section-title">Niveau ${lvl}</div>
      ${byLevel[lvl].map((l) => {
        const s = state.lessonScores[l.id];
        return `<a class="list-row" href="#/lessons/${l.id}">
          <div><span class="pill ${l.level.toLowerCase()}">${l.id}</span>${l.videoId ? `<span title="Vidéo disponible">▶️</span> ` : ""}${escapeHtml(l.title)}</div>
          <div class="rt">${s ? `<span class="pill done">${s.correct}/${s.total}</span>` : l.vocab.length + " mots"}</div>
        </a>`;
      }).join("")}
    `).join("")}
  `);
}
function buildLessonQuiz(lesson) {
  return (lesson.errors || []).map((e) => {
    const opts = shuffle([e.right, e.wrong]);
    return { q: "Quelle phrase est correcte ?", options: opts, answerIndex: opts.indexOf(e.right), explanation: e.note || "" };
  });
}
function renderLessonDetail(idStr) {
  const lesson = LESSONS_DATA.find((l) => l.id === Number(idStr));
  if (!lesson) { setApp(`<div class="empty-state">Leçon introuvable.</div>`); return; }
  const idx = LESSONS_DATA.findIndex((l) => l.id === lesson.id);
  const prev = LESSONS_DATA[idx - 1];
  const next = LESSONS_DATA[idx + 1];
  touchActivity();
  setApp(`
    <div class="card">
      <span class="pill ${lesson.level.toLowerCase()}">Leçon ${lesson.id} · ${lesson.level}</span>
      <h2>${escapeHtml(lesson.title)}</h2>
      <div class="fa mb8" style="text-align:left;">${escapeHtml(lesson.topic)}</div>
      <p class="muted">${escapeHtml(lesson.objective)}</p>
      <button class="btn mt8" id="reviseBtn">🗂️ Réviser ce vocabulaire (${lesson.vocab.length} mots)</button>
      ${lesson.videoId ? `
        <div class="btn-row mt8">
          <button class="btn secondary" id="listenBtn" style="background:#c4302b;color:#fff;border-color:#c4302b;">🔊 Écouter en lisant</button>
          <a class="btn secondary" style="text-decoration:none;" target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=${lesson.videoId}">▶ Ouvrir sur YouTube</a>
        </div>
        <div id="audioPlayerWrap" hidden></div>
      ` : `
        <a class="btn secondary mt8" style="text-decoration:none;" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.topic)}">🔎 Chercher la vidéo sur YouTube</a>
        <p class="muted" style="font-size:11.5px;margin:6px 0 0;">Lien direct pas encore confirmé pour cette leçon — ce bouton ouvre une recherche YouTube avec le titre persan de la leçon.</p>
      `}
    </div>

    ${lesson.text ? `
      <div class="section-title">Texte complet de la leçon</div>
      <div class="card">
        <div class="passage-text">${escapeHtml(lesson.text)}</div>
      </div>
    ` : ""}

    <div class="section-title">Vocabulaire</div>
    <div class="card">
      ${lesson.vocab.map((v) => `
        <div class="list-row" style="margin-bottom:8px;">
          <div><b>${escapeHtml(v.fr)}</b>${v.en ? `<div class="muted" style="font-size:12.5px;">${escapeHtml(v.en)}</div>` : ""}</div>
          ${v.fa ? `<div class="fa rt">${escapeHtml(v.fa)}</div>` : ""}
        </div>
      `).join("")}
    </div>

    <div class="section-title">Phrases types</div>
    <div class="card">
      <ul>${lesson.examples.map((ex) => `<li class="mb8">${escapeHtml(ex)}</li>`).join("")}</ul>
    </div>

    ${lesson.errors && lesson.errors.length ? `
      <div class="section-title">Erreurs fréquentes</div>
      <div class="card">
        ${lesson.errors.map((e) => `
          <div class="mb12">
            <div class="err-wrong">✗ ${escapeHtml(e.wrong)}</div>
            <div class="err-right">✓ ${escapeHtml(e.right)}</div>
            ${e.note ? `<div class="muted" style="font-size:12.5px;">${escapeHtml(e.note)}</div>` : ""}
          </div>
        `).join("")}
      </div>

      <div class="section-title">Mini quiz</div>
      <div class="card" id="quizScoreCard" hidden><div class="score-banner"><div>Résultat</div><div class="big" id="quizScoreText"></div></div></div>
      <div id="quizContainer">${quizHTML(buildLessonQuiz(lesson))}</div>
    ` : ""}

    <div class="btn-row mt16">
      ${prev ? `<a class="btn secondary" href="#/lessons/${prev.id}" style="text-decoration:none;display:flex;align-items:center;justify-content:center;">← Leçon ${prev.id}</a>` : `<span></span>`}
      ${next ? `<a class="btn secondary" href="#/lessons/${next.id}" style="text-decoration:none;display:flex;align-items:center;justify-content:center;">Leçon ${next.id} →</a>` : `<span></span>`}
    </div>
  `);
  $("#reviseBtn").onclick = () => startLessonStudy(lesson.id);
  const listenBtn = $("#listenBtn");
  if (listenBtn) {
    listenBtn.onclick = () => {
      const wrap = $("#audioPlayerWrap");
      if (wrap.hidden) {
        wrap.innerHTML = `<iframe class="lesson-player" src="https://www.youtube.com/embed/${lesson.videoId}?autoplay=1&rel=0" title="Vidéo de la leçon" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        wrap.hidden = false;
        listenBtn.textContent = "⏹️ Arrêter";
      } else {
        wrap.innerHTML = "";
        wrap.hidden = true;
        listenBtn.textContent = "🔊 Écouter en lisant";
      }
    };
  }
  if (lesson.errors && lesson.errors.length) {
    const quiz = buildLessonQuiz(lesson);
    attachQuiz($("#quizContainer"), quiz, (score, total) => {
      state.lessonScores[lesson.id] = { correct: score, total, date: todayStr() };
      touchActivity();
      $("#quizScoreCard").hidden = false;
      $("#quizScoreText").textContent = score + "/" + total;
      toast("Score enregistré : " + score + "/" + total);
    });
  }
}

/* ================= GRAMMAR ================= */
function renderGrammarList() {
  setApp(`
    <p class="muted">Points de grammaire essentiels pour le niveau B2. Lisez l'explication puis testez-vous avec le quiz.</p>
    ${GRAMMAR_DATA.map((t) => {
      const s = state.grammarScores[t.id];
      return `<a class="list-row" href="#/grammar/${t.id}">
        <div><span class="pill ${t.level.toLowerCase()}">${t.level}</span>${escapeHtml(t.title)}</div>
        <div class="rt">${s ? `<span class="pill done">${s.correct}/${s.total}</span>` : "Non testé"}</div>
      </a>`;
    }).join("")}
  `);
}
function renderGrammarDetail(id) {
  const topic = GRAMMAR_DATA.find((t) => t.id === id);
  if (!topic) { setApp(`<div class="empty-state">Sujet introuvable.</div>`); return; }
  setApp(`
    <div class="card">
      <span class="pill ${topic.level.toLowerCase()}">${topic.level}</span>
      <h2>${escapeHtml(topic.title)}</h2>
      <ul>${topic.points.map((p) => `<li class="mb8">${escapeHtml(p)}</li>`).join("")}</ul>
    </div>
    <div class="section-title">Quiz d'entraînement</div>
    <div class="card" id="quizScoreCard" hidden><div class="score-banner"><div>Résultat</div><div class="big" id="quizScoreText"></div></div></div>
    <div id="quizContainer">${quizHTML(topic.quiz)}</div>
  `);
  attachQuiz($("#quizContainer"), topic.quiz, (score, total) => {
    state.grammarScores[id] = { correct: score, total, date: todayStr() };
    touchActivity();
    $("#quizScoreCard").hidden = false;
    $("#quizScoreText").textContent = score + "/" + total;
    toast("Score enregistré : " + score + "/" + total);
  });
}

/* ================= SKILLS HUB ================= */
function renderSkillsHub() {
  setApp(`
    <p class="muted">Les quatre épreuves clés du TCF. Entraînez-vous dans des conditions proches de l'examen.</p>
    <div class="tile-grid">
      ${tile("#/reading", "📖", "Compréhension écrite", READING_DATA.length + " textes")}
      ${tile("#/listening", "🎧", "Compréhension orale", LISTENING_DATA.length + " exercices")}
      ${tile("#/writing", "✍️", "Expression écrite", "3 tâches")}
      ${tile("#/speaking", "🗣️", "Expression orale", "3 tâches")}
    </div>
  `);
}

/* ================= READING ================= */
function renderReadingList() {
  setApp(READING_DATA.map((p) => {
    const s = state.readingScores[p.id];
    return `<a class="list-row" href="#/reading/${p.id}">
      <div><span class="pill ${p.level.toLowerCase()}">${p.level}</span>${escapeHtml(p.title)}</div>
      <div class="rt">${s ? `<span class="pill done">${s.correct}/${s.total}</span>` : escapeHtml(p.questions.length + " questions")}</div>
    </a>`;
  }).join(""));
}
function renderReadingDetail(id) {
  const p = READING_DATA.find((x) => x.id === id);
  if (!p) { setApp(`<div class="empty-state">Texte introuvable.</div>`); return; }
  setApp(`
    <div class="card">
      <span class="pill ${p.level.toLowerCase()}">${p.level}</span>
      <h2>${escapeHtml(p.title)}</h2>
      <div class="passage-text">${escapeHtml(p.text)}</div>
    </div>
    <div class="section-title">Questions de compréhension</div>
    <div class="card" id="quizScoreCard" hidden><div class="score-banner"><div>Résultat</div><div class="big" id="quizScoreText"></div></div></div>
    <div id="quizContainer">${quizHTML(p.questions)}</div>
  `);
  attachQuiz($("#quizContainer"), p.questions, (score, total) => {
    state.readingScores[id] = { correct: score, total, date: todayStr() };
    touchActivity();
    $("#quizScoreCard").hidden = false;
    $("#quizScoreText").textContent = score + "/" + total;
    toast("Score enregistré : " + score + "/" + total);
  });
}

/* ================= LISTENING ================= */
function renderListeningList() {
  setApp(`
    <p class="muted">🔊 Écoutez chaque enregistrement (voix de synthèse française) avant de répondre — comme à l'examen, vous ne voyez pas le texte à l'avance.</p>
    ${LISTENING_DATA.map((p) => {
      const s = state.listeningScores[p.id];
      return `<a class="list-row" href="#/listening/${p.id}">
        <div><span class="pill ${p.level.toLowerCase()}">${p.level}</span>${escapeHtml(p.title)}</div>
        <div class="rt">${s ? `<span class="pill done">${s.correct}/${s.total}</span>` : escapeHtml(p.questions.length + " questions")}</div>
      </a>`;
    }).join("")}
  `);
}
function renderListeningDetail(id) {
  const p = LISTENING_DATA.find((x) => x.id === id);
  if (!p) { setApp(`<div class="empty-state">Exercice introuvable.</div>`); return; }
  const lines = p.speakers ? p.speakers.map((s) => s.text) : [p.script];
  setApp(`
    <div class="card">
      <span class="pill ${p.level.toLowerCase()}">${p.level}</span>
      <h2>${escapeHtml(p.title)}</h2>
      <div class="audio-controls">
        <button class="btn small" id="playBtn">▶ Écouter</button>
        <select class="speed-select" id="speedSelect">
          <option value="0.8">Lent (0.8x)</option>
          <option value="1" selected>Normal (1x)</option>
          <option value="1.15">Rapide (1.15x)</option>
        </select>
      </div>
      <button class="btn ghost small" id="toggleScript">Afficher la transcription</button>
      <div class="passage-text mt12" id="scriptText" hidden>${escapeHtml(p.script)}</div>
    </div>
    <div class="section-title">Questions de compréhension</div>
    <div class="card" id="quizScoreCard" hidden><div class="score-banner"><div>Résultat</div><div class="big" id="quizScoreText"></div></div></div>
    <div id="quizContainer">${quizHTML(p.questions)}</div>
  `);
  $("#playBtn").onclick = () => {
    const rate = parseFloat($("#speedSelect").value);
    speakSequence(lines, { rate }, () => {});
  };
  $("#toggleScript").onclick = () => {
    const box = $("#scriptText");
    box.hidden = !box.hidden;
    $("#toggleScript").textContent = box.hidden ? "Afficher la transcription" : "Masquer la transcription";
  };
  attachQuiz($("#quizContainer"), p.questions, (score, total) => {
    state.listeningScores[id] = { correct: score, total, date: todayStr() };
    touchActivity();
    $("#quizScoreCard").hidden = false;
    $("#quizScoreText").textContent = score + "/" + total;
    toast("Score enregistré : " + score + "/" + total);
  });
}

/* ================= WRITING ================= */
function renderWritingList() {
  setApp(WRITING_DATA.map((t) => {
    const done = state.writingDone[t.id];
    return `<a class="list-row" href="#/writing/${t.id}">
      <div><span class="pill b2">${t.task}</span>${escapeHtml(t.title)}</div>
      <div class="rt">${done ? '<span class="pill done">Fait ✓</span>' : escapeHtml(t.wordRange)}</div>
    </a>`;
  }).join(""));
}
let writingPromptIdx = {};
function renderWritingDetail(id) {
  const t = WRITING_DATA.find((x) => x.id === id);
  if (!t) { setApp(`<div class="empty-state">Sujet introuvable.</div>`); return; }
  if (writingPromptIdx[id] === undefined) writingPromptIdx[id] = 0;
  const prompt = t.prompts[writingPromptIdx[id]];
  setApp(`
    <div class="card">
      <span class="pill b2">${t.task}</span>
      <h2>${escapeHtml(t.title)}</h2>
      <p class="muted">${escapeHtml(t.instructions)}</p>
      <div class="stat-row mb12">
        <div class="stat-box"><div class="num">${t.wordRange}</div><div class="lbl">longueur</div></div>
        <div class="stat-box"><div class="num">${t.timeSuggested}</div><div class="lbl">temps conseillé</div></div>
      </div>
      <div class="card" style="background:var(--bg);"><b>Sujet :</b> ${escapeHtml(prompt)}</div>
      <button class="btn ghost small mt8" id="newPromptBtn">🔀 Changer de sujet</button>
    </div>

    <div class="section-title">Votre réponse</div>
    <textarea class="writing-box" id="writingBox" placeholder="Écrivez votre réponse ici…"></textarea>
    <div class="word-count" id="wordCount"><span>0 mot</span><span></span></div>

    <div class="btn-row mt12">
      <button class="btn secondary" id="toggleChecklist">Grille d'auto-évaluation</button>
      <button class="btn secondary" id="toggleModel">Exemple de réponse</button>
    </div>
    <div class="card mt12 checklist" id="checklistBox" hidden>
      ${t.checklist.map((c, i) => `<label><input type="checkbox" />${escapeHtml(c)}</label>`).join("")}
    </div>
    <div class="card mt12" id="modelBox" hidden><div class="passage-text">${escapeHtml(t.model)}</div></div>

    <button class="btn mt16" id="markDoneBtn">✓ Marquer cette épreuve comme terminée</button>
  `);
  $("#newPromptBtn").onclick = () => { writingPromptIdx[id] = (writingPromptIdx[id] + 1) % t.prompts.length; renderWritingDetail(id); };
  const box = $("#writingBox");
  const wc = $("#wordCount");
  function updateCount() {
    const words = box.value.trim().length ? box.value.trim().split(/\s+/).length : 0;
    const range = t.wordRange.match(/(\d+)[^\d]+(\d+)/);
    let cls = "";
    if (range) {
      const min = +range[1], max = +range[2];
      cls = words >= min && words <= max ? "ok" : words > 0 ? "warn" : "";
    }
    wc.className = "word-count " + cls;
    wc.innerHTML = `<span>${words} mot${words > 1 ? "s" : ""}</span><span>Objectif : ${t.wordRange}</span>`;
  }
  box.addEventListener("input", updateCount);
  updateCount();
  $("#toggleChecklist").onclick = () => { $("#checklistBox").hidden = !$("#checklistBox").hidden; };
  $("#toggleModel").onclick = () => { $("#modelBox").hidden = !$("#modelBox").hidden; };
  $("#markDoneBtn").onclick = () => {
    const words = box.value.trim().length ? box.value.trim().split(/\s+/).length : 0;
    state.writingDone[id] = { date: todayStr(), wordCount: words };
    touchActivity();
    toast("Épreuve marquée comme terminée !");
    navigate("#/writing");
  };
}

/* ================= SPEAKING ================= */
function renderSpeakingList() {
  setApp(SPEAKING_DATA.map((t) => {
    const done = state.speakingDone[t.id];
    return `<a class="list-row" href="#/speaking/${t.id}">
      <div><span class="pill b2">${t.task}</span>${escapeHtml(t.title)}</div>
      <div class="rt">${done ? '<span class="pill done">Fait ✓</span>' : (t.prepSeconds ? t.prepSeconds + "s prép." : "Sans préparation")}</div>
    </a>`;
  }).join(""));
}
let speakingPromptIdx = {};
let speakState = { timer: null, mediaRecorder: null, chunks: [], recognizer: null, phase: "idle" };
function renderSpeakingDetail(id) {
  const t = SPEAKING_DATA.find((x) => x.id === id);
  if (!t) { setApp(`<div class="empty-state">Sujet introuvable.</div>`); return; }
  if (speakingPromptIdx[id] === undefined) speakingPromptIdx[id] = 0;
  const prompt = t.prompts[speakingPromptIdx[id]];
  const hasSTT = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  setApp(`
    <div class="card">
      <span class="pill b2">${t.task}</span>
      <h2>${escapeHtml(t.title)}</h2>
      <p class="muted">${escapeHtml(t.instructions)}</p>
      <div class="card" style="background:var(--bg);"><b>Sujet :</b> ${escapeHtml(prompt)}</div>
      <button class="btn ghost small mt8" id="newPromptBtn">🔀 Changer de sujet</button>
    </div>

    <div class="card center">
      <div id="phaseLabel" class="muted mb8">Prêt à commencer</div>
      <div class="timer-display" id="timerDisplay">${t.prepSeconds ? t.prepSeconds : t.speakSeconds}</div>
      <button class="btn" id="startBtn">🎙️ Démarrer</button>
      <div class="mt12" id="recordingUi" hidden>
        <div class="muted"><span class="rec-dot"></span>Enregistrement en cours…</div>
      </div>
      <div class="mt12" id="playbackUi" hidden></div>
      <div class="mt12" id="micError" class="muted" hidden></div>
    </div>

    <div class="section-title">Transcription automatique (expérimentale)</div>
    <div class="transcript-box" id="transcriptBox">${hasSTT ? "La transcription apparaîtra ici pendant l'enregistrement." : "Transcription automatique non disponible sur ce navigateur — utilisez l'écoute de votre enregistrement pour vous auto-évaluer."}</div>

    <div class="btn-row mt16">
      <button class="btn secondary" id="toggleChecklist">Grille d'auto-évaluation</button>
    </div>
    <div class="card mt12 checklist" id="checklistBox" hidden>
      ${t.checklist.map((c) => `<label><input type="checkbox" />${escapeHtml(c)}</label>`).join("")}
    </div>

    <button class="btn mt16" id="markDoneBtn">✓ Marquer cette épreuve comme terminée</button>
  `);
  $("#newPromptBtn").onclick = () => { speakingPromptIdx[id] = (speakingPromptIdx[id] + 1) % t.prompts.length; renderSpeakingDetail(id); };
  $("#toggleChecklist").onclick = () => { $("#checklistBox").hidden = !$("#checklistBox").hidden; };
  $("#markDoneBtn").onclick = () => {
    state.speakingDone[id] = { date: todayStr() };
    touchActivity();
    toast("Épreuve marquée comme terminée !");
    navigate("#/speaking");
  };
  $("#startBtn").onclick = () => startSpeakingFlow(t);
}

function clearSpeakTimer() { if (speakState.timer) { clearInterval(speakState.timer); speakState.timer = null; } }
function startSpeakingFlow(t) {
  clearSpeakTimer();
  const startBtn = $("#startBtn");
  startBtn.disabled = true;
  if (t.prepSeconds > 0) runCountdown(t.prepSeconds, "Préparation…", () => beginRecording(t));
  else beginRecording(t);
}
function runCountdown(seconds, label, onDone) {
  let remaining = seconds;
  $("#phaseLabel").textContent = label;
  $("#timerDisplay").textContent = remaining;
  clearSpeakTimer();
  speakState.timer = setInterval(() => {
    remaining--;
    $("#timerDisplay").textContent = Math.max(remaining, 0);
    if (remaining <= 0) { clearSpeakTimer(); onDone(); }
  }, 1000);
}
async function beginRecording(t) {
  $("#phaseLabel").textContent = "Enregistrement";
  $("#recordingUi").hidden = false;
  $("#micError").hidden = true;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mr = new MediaRecorder(stream);
    speakState.mediaRecorder = mr;
    speakState.chunks = [];
    mr.ondataavailable = (e) => speakState.chunks.push(e.data);
    mr.onstop = () => {
      stream.getTracks().forEach((tr) => tr.stop());
      const blob = new Blob(speakState.chunks, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      $("#recordingUi").hidden = true;
      $("#playbackUi").hidden = false;
      $("#playbackUi").innerHTML = `<audio controls src="${url}" style="width:100%"></audio><div class="muted mt8">Réécoutez-vous et comparez avec la grille d'auto-évaluation ci-dessous.</div>`;
      $("#phaseLabel").textContent = "Terminé";
      $("#startBtn").disabled = false;
      $("#startBtn").textContent = "🎙️ Recommencer";
    };
    mr.start();
    startRecognition();
    runCountdown(t.speakSeconds, "Enregistrement…", () => stopRecording());
  } catch (err) {
    $("#micError").hidden = false;
    $("#micError").textContent = "Impossible d'accéder au microphone. Vérifiez les autorisations de votre navigateur pour ce site.";
    $("#startBtn").disabled = false;
    $("#phaseLabel").textContent = "Erreur micro";
  }
}
function stopRecording() {
  if (speakState.mediaRecorder && speakState.mediaRecorder.state !== "inactive") speakState.mediaRecorder.stop();
  stopRecognition();
}
function startRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;
  try {
    const rec = new SR();
    rec.lang = "fr-FR";
    rec.continuous = true;
    rec.interimResults = true;
    let finalText = "";
    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript + " ";
        else interim += e.results[i][0].transcript;
      }
      const box = $("#transcriptBox");
      if (box) box.textContent = (finalText + interim).trim() || "…";
    };
    rec.onerror = () => {};
    rec.start();
    speakState.recognizer = rec;
  } catch (e) { /* not supported / blocked */ }
}
function stopRecognition() {
  if (speakState.recognizer) { try { speakState.recognizer.stop(); } catch (e) {} speakState.recognizer = null; }
}

/* ================= PROGRESS ================= */
function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }
function renderProgress() {
  const mastered = Object.values(state.srs).filter((r) => r.box >= 4).length;
  const gScores = Object.values(state.grammarScores);
  const gAvg = gScores.length ? Math.round(100 * gScores.reduce((s, x) => s + x.correct / x.total, 0) / gScores.length) : 0;
  const rDone = Object.keys(state.readingScores).length;
  const lDone = Object.keys(state.listeningScores).length;
  const wDone = Object.keys(state.writingDone).length;
  const sDone = Object.keys(state.speakingDone).length;

  function bar(label, done, total) {
    return `<div class="mb12">
      <div class="word-count"><span>${label}</span><span>${done}/${total}</span></div>
      <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct(done, total)}%"></div></div>
    </div>`;
  }

  setApp(`
    <div class="stat-row mb12">
      <div class="stat-box"><div class="num">🔥 ${state.streak || 0}</div><div class="lbl">jours de suite</div></div>
      <div class="stat-box"><div class="num">${state.activityDates.length}</div><div class="lbl">jours actifs</div></div>
      <div class="stat-box"><div class="num">${gAvg}%</div><div class="lbl">moyenne grammaire</div></div>
    </div>
    <div class="card">
      ${bar("Leçons du cours consultées", Object.keys(state.lessonScores).length, LESSONS_DATA.length)}
      ${bar("Vocabulaire maîtrisé (TCF)", mastered, VOCAB_DATA.length)}
      ${bar("Points de grammaire testés", gScores.length, GRAMMAR_DATA.length)}
      ${bar("Textes lus", rDone, READING_DATA.length)}
      ${bar("Exercices d'écoute", lDone, LISTENING_DATA.length)}
      ${bar("Sujets d'expression écrite", wDone, WRITING_DATA.length)}
      ${bar("Sujets d'expression orale", sDone, SPEAKING_DATA.length)}
    </div>
    <div class="section-title">Sauvegarde</div>
    <div class="card">
      <p class="muted" style="margin-top:0;">Votre progression est stockée uniquement dans ce navigateur. Téléchargez une sauvegarde régulièrement pour ne pas la perdre (changement de téléphone, données du site effacées, etc.), et restaurez-la ici quand vous en avez besoin.</p>
      <div class="btn-row">
        <button class="btn secondary" id="exportBtn">💾 Télécharger ma sauvegarde</button>
        <button class="btn secondary" id="importBtn">📥 Restaurer une sauvegarde</button>
      </div>
      <input type="file" id="importFile" accept="application/json" hidden>
    </div>
    <button class="btn danger mt16" id="resetBtn">Réinitialiser ma progression</button>
  `);
  $("#resetBtn").onclick = () => {
    if (confirm("Réinitialiser toute votre progression ? Cette action est irréversible.")) {
      state = defaultState();
      saveState();
      updateStreakBadge();
      toast("Progression réinitialisée.");
      navigate("#/progress");
      renderProgress();
    }
  };
  $("#exportBtn").onclick = async () => {
    const payload = JSON.stringify({ app: "tcf-b2-app", version: 1, exportedAt: new Date().toISOString(), state }, null, 2);
    const filename = `tcf-b2-sauvegarde-${todayStr()}.json`;
    const hasClaudeRuntime = typeof window.claude !== "undefined" && typeof window.claude.use === "function";
    if (hasClaudeRuntime) {
      // Running inside the claude.ai artifact viewer: browser-style <a download> links
      // do nothing there, so use the platform's downloads capability instead.
      try {
        const downloads = await window.claude.use("downloads");
        if (downloads) {
          await downloads.save({ filename, data: payload });
          toast("Sauvegarde téléchargée.");
        } else {
          toast("Téléchargement indisponible dans cet aperçu — utilisez la version sur votre site.");
        }
      } catch (e) {
        toast("Téléchargement refusé ou indisponible ici.");
      }
      return;
    }
    try {
      const blob = new Blob([payload], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      toast("Sauvegarde téléchargée.");
    } catch (e) {
      toast("Le téléchargement n'a pas fonctionné dans cet environnement.");
    }
  };
  $("#importBtn").onclick = () => $("#importFile").click();
  $("#importFile").onchange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const incoming = parsed && parsed.state ? parsed.state : parsed;
        if (!incoming || typeof incoming !== "object") throw new Error("format invalide");
        if (!confirm("Remplacer votre progression actuelle par cette sauvegarde ? Cette action est irréversible.")) return;
        state = Object.assign(defaultState(), incoming);
        saveState();
        updateStreakBadge();
        toast("Progression restaurée depuis la sauvegarde.");
        navigate("#/progress");
        renderProgress();
      } catch (err) {
        toast("Fichier de sauvegarde invalide.");
      }
    };
    reader.readAsText(file);
  };
}
