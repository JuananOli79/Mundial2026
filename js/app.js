// ============================================================
//  MUNDIAL 2026 QUIZ  —  LÓGICA PRINCIPAL v2
// ============================================================

// ──────────────── PERFILES DE USUARIO ────────────────
// timerSpeed: multiplicador de velocidad del timer
//   0.5 → el timer va a la MITAD de velocidad (Max tiene el doble de tiempo real)
//   1.0 → velocidad normal
//   1.8 → el timer va 1.8× más rápido (Papá/Mamá tienen menos tiempo real)
// pointsMult: multiplicador de puntuación
//   1.5 → más puntos base (nivelación para Max)
//   1.0 → puntos normales
//   0.6 → menos puntos (Papá/Mamá deben responder muy rápido para puntuar igual)

const PROFILES = {
  max: {
    name: 'Max',       emoji: '⚽', color: '#22c55e',
    timerSpeed: 0.5,   pointsMult: 1.5,
    badge: '🌱 Júnior', badgeClass: 'badge-junior',
    lifelines: 2        // Max tiene 2 comodines
  },
  martin: {
    name: 'Martín',    emoji: '🥅', color: '#60a5fa',
    timerSpeed: 1.0,   pointsMult: 1.0,
    badge: '⚡ Normal', badgeClass: 'badge-normal',
    lifelines: 1
  },
  papa: {
    name: 'Papá',      emoji: '👨‍💼', color: '#f97316',
    timerSpeed: 1.8,   pointsMult: 0.6,
    badge: '🔥 Experto', badgeClass: 'badge-expert',
    lifelines: 1
  },
  mama: {
    name: 'Mamá',      emoji: '👩‍💼', color: '#ec4899',
    timerSpeed: 1.8,   pointsMult: 0.6,
    badge: '🔥 Experta', badgeClass: 'badge-expert',
    lifelines: 1
  },
  invitado: {
    name: 'Invitado',  emoji: '🌟', color: '#a855f7',
    timerSpeed: 1.0,   pointsMult: 1.0,
    badge: '⚡ Normal', badgeClass: 'badge-normal',
    lifelines: 1
  }
};

// ──────────────── ESTADO ────────────────
const STATE = {
  // Selección de jugadores (array de 2 profileIds)
  selectedProfiles: [],       // e.g. ['max', 'papa']
  // Puntuaciones indexadas por posición [0, 1]
  scores:   [0, 0],
  correct:  [0, 0],
  // ¿Qué jugador juega este turno? (índice 0 o 1)
  currentIdx: 0,
  questionIndex: 0,
  totalQuestions: 20,
  // Timer
  activeTimer: null,
  timerDuration: 30,
  timerRemaining: 30,
  timerInterval: 1000,        // ms entre ticks (varía según perfil)
  // Pregunta activa
  currentQuestion: null,
  currentType: null,
  // Pools de preguntas usadas
  usedQuizIds: [], usedTFIds: [], usedFBIds: [], usedAGIds: [], usedWSIds: [],
  // Lifelines
  lifelinesLeft: [1, 1],       // se sobreescribe al inicio según perfil
  lifelineUsed: false,         // si el comodín actual fue usado en esta pregunta
  // Anagrama / completa
  agAnswer: [], agLetterBtns: [],
  fbAnswer: [], fbLetterBtns: [],
  // Sopa de letras
  wsUI: null, wsFinished: false,
};

// ──────────────── UTILIDADES ────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  window.scrollTo(0, 0);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(arr, usedIds) {
  const available = arr.map((_, i) => i).filter(i => !usedIds.includes(i));
  if (available.length === 0) { usedIds.length = 0; return pickRandom(arr, usedIds); }
  const idx = available[Math.floor(Math.random() * available.length)];
  usedIds.push(idx);
  return { item: arr[idx], idx };
}

function currentProfile()  { return PROFILES[STATE.selectedProfiles[STATE.currentIdx]]; }
function otherIdx()        { return STATE.currentIdx === 0 ? 1 : 0; }

// ──────────────── SELECCIÓN DE JUGADORES ────────────────
function selectProfile(profileId) {
  const sel = STATE.selectedProfiles;

  if (sel.includes(profileId)) {
    // Deseleccionar
    const pos = sel.indexOf(profileId);
    sel.splice(pos, 1);
  } else if (sel.length < 2) {
    sel.push(profileId);
  } else {
    // Ya hay 2: reemplazar el último
    sel[1] = profileId;
  }

  // Actualizar visual de todas las tarjetas
  Object.keys(PROFILES).forEach(id => {
    const card = document.getElementById(`pcard-${id}`);
    if (!card) return;
    card.classList.remove('selected-0', 'selected-1');
    // Eliminar badges de slot
    const existing = card.querySelector('.profile-slot-badge');
    if (existing) existing.remove();
  });

  sel.forEach((id, pos) => {
    const card = document.getElementById(`pcard-${id}`);
    if (!card) return;
    card.classList.add(`selected-${pos}`);
    const badge = document.createElement('div');
    badge.className = 'profile-slot-badge' + (pos === 1 ? ' p2' : '');
    badge.textContent = pos === 0 ? 'J1' : 'J2';
    card.appendChild(badge);
  });

  // Actualizar slots
  [0, 1].forEach(pos => {
    const inner = document.getElementById(`slot-inner-${pos}`);
    if (!inner) return;
    if (sel[pos]) {
      const p = PROFILES[sel[pos]];
      inner.innerHTML = `
        <div class="slot-filled-emoji">${p.emoji}</div>
        <div class="slot-filled-name">${p.name}</div>
        <div class="slot-filled-badge ${p.badgeClass}">${p.badge}</div>`;
    } else {
      inner.innerHTML = `<span class="slot-empty">Elige un jugador</span>`;
    }
  });

  // Botón inicio
  const btn = document.getElementById('btn-start');
  if (sel.length === 2) {
    btn.classList.remove('disabled');
    btn.textContent = '¡COMENZAR! 🚀';
  } else {
    btn.classList.add('disabled');
    btn.textContent = '¡COMENZAR!';
  }
}

// ──────────────── INICIO ────────────────
function startGame() {
  if (STATE.selectedProfiles.length < 2) return;

  // Reset
  STATE.scores   = [0, 0];
  STATE.correct  = [0, 0];
  STATE.questionIndex = 0;
  STATE.currentIdx = Math.random() < 0.5 ? 0 : 1;
  STATE.usedQuizIds = []; STATE.usedTFIds = [];
  STATE.usedFBIds = [];   STATE.usedAGIds = [];
  STATE.usedWSIds = [];

  // Comodines según perfil
  STATE.lifelinesLeft = STATE.selectedProfiles.map(id => PROFILES[id].lifelines);

  showTurnScreen();
}

function restartGame() { startGame(); }

// ──────────────── MARCADOR ENTRE TURNOS ────────────────
function showTurnScreen() {
  stopTimer();

  const p0 = PROFILES[STATE.selectedProfiles[0]];
  const p1 = PROFILES[STATE.selectedProfiles[1]];

  // Nombres y puntos
  document.getElementById('sb-avatar-0').textContent = p0.emoji;
  document.getElementById('sb-name-0').textContent   = p0.name.toUpperCase();
  document.getElementById('sb-pts-0').textContent    = STATE.scores[0];
  document.getElementById('sb-avatar-1').textContent = p1.emoji;
  document.getElementById('sb-name-1').textContent   = p1.name.toUpperCase();
  document.getElementById('sb-pts-1').textContent    = STATE.scores[1];

  // Resaltar líder
  document.getElementById('sb-card-0').classList.toggle('leading', STATE.scores[0] > STATE.scores[1]);
  document.getElementById('sb-card-1').classList.toggle('leading', STATE.scores[1] > STATE.scores[0]);

  // Turno actual
  const cur = PROFILES[STATE.selectedProfiles[STATE.currentIdx]];
  document.getElementById('turn-avatar').textContent = cur.emoji;
  document.getElementById('turn-name').textContent   = cur.name.toUpperCase();
  document.getElementById('turn-box').style.borderColor = cur.color;

  showScreen('screen-scoreboard');
}

function proceedToQuestion() {
  if (STATE.questionIndex >= STATE.totalQuestions) { endGame(); return; }
  launchNextQuestion();
}

// ──────────────── SECUENCIA DE TIPOS ────────────────
const TYPE_SEQ = [
  'quiz','trueFalse','quiz','fillBlank',
  'quiz','anagram','quiz','trueFalse',
  'wordSearch','quiz','trueFalse','quiz',
  'fillBlank','anagram','quiz','trueFalse',
  'quiz','wordSearch','quiz','anagram'
];

function launchNextQuestion() {
  STATE.currentType = TYPE_SEQ[STATE.questionIndex % TYPE_SEQ.length];
  STATE.questionIndex++;
  STATE.lifelineUsed = false;

  switch (STATE.currentType) {
    case 'quiz':       showQuizQ();      break;
    case 'trueFalse':  showTrueFalse();  break;
    case 'fillBlank':  showFillBlank();  break;
    case 'anagram':    showAnagram();    break;
    case 'wordSearch': showWordSearch(); break;
  }
}

function qCounter() { return `${STATE.questionIndex} / ${STATE.totalQuestions}`; }

// ──────────────── HEADER JUGADOR ────────────────
function setGameHeader(prefix) {
  const p = currentProfile();
  const el = document.getElementById(`${prefix}-player-info`);
  if (el) {
    document.getElementById(`${prefix}-player-avatar`).textContent = p.emoji;
    document.getElementById(`${prefix}-player-name`).textContent   = p.name.toUpperCase();
  }
  // Live score
  const sc = document.getElementById(`${prefix}-pts-live`);
  if (sc) sc.textContent = `${STATE.scores[STATE.currentIdx]} pts`;
}

// ──────────────── TIPO TEST (MILLONARIO) ────────────────
function showQuizQ() {
  const { item } = pickRandom(QUESTIONS.quiz, STATE.usedQuizIds);
  STATE.currentQuestion = item;

  setGameHeader('quiz');
  document.getElementById('quiz-counter').textContent  = qCounter();
  document.getElementById('quiz-cat').textContent      = item.cat;
  document.getElementById('quiz-text').textContent     = item.q;
  document.getElementById('quiz-pts-label').textContent = `⭐ ${Math.round(item.pts * currentProfile().pointsMult)} pts`;

  // Mezclar opciones
  const indices   = shuffle([0, 1, 2, 3]);
  const corrIdx   = indices.indexOf(item.a);
  const labels    = ['A', 'B', 'C', 'D'];

  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  indices.forEach((origIdx, newIdx) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.id = `opt-${newIdx}`;
    btn.dataset.iscorrect = newIdx === corrIdx ? '1' : '0';
    btn.innerHTML = `<span class="opt-letter">${labels[newIdx]}</span>${item.opts[origIdx]}`;
    btn.onclick = () => selectQuizAnswer(newIdx, corrIdx, item);
    grid.appendChild(btn);
  });

  // Comodín
  const ll = document.getElementById('lifeline-btn');
  if (STATE.lifelinesLeft[STATE.currentIdx] > 0) {
    ll.classList.remove('used');
    ll.innerHTML = `<span class="ll-icon">50</span>:<span class="ll-icon">50</span> <span class="ll-label">Comodín (${STATE.lifelinesLeft[STATE.currentIdx]})</span>`;
  } else {
    ll.classList.add('used');
  }

  document.getElementById('quiz-feedback').classList.add('hidden');
  showScreen('screen-quiz');

  const dur = 30;
  startTimer('quiz', dur, () => timeOutQuiz(corrIdx, item));
}

function selectQuizAnswer(chosen, correct, item) {
  stopTimer();
  // Deshabilitar todos
  document.querySelectorAll('.opt-btn').forEach(b => b.classList.add('disabled'));
  // Poner pendiente el elegido
  document.getElementById(`opt-${chosen}`).classList.remove('disabled');
  document.getElementById(`opt-${chosen}`).classList.add('pending');

  // Pausa dramática luego revelar
  setTimeout(() => revealQuizAnswer(chosen, correct, item), 1400);
}

function revealQuizAnswer(chosen, correct, item) {
  const chosenBtn  = document.getElementById(`opt-${chosen}`);
  const correctBtn = document.getElementById(`opt-${correct}`);

  chosenBtn.classList.remove('pending');

  const isCorrect = chosen === correct;

  if (isCorrect) {
    chosenBtn.classList.add('correct');
  } else {
    chosenBtn.classList.add('wrong');
    correctBtn.classList.remove('disabled');
    correctBtn.classList.add('correct');
  }

  const pts = isCorrect
    ? calcPts(item.pts, STATE.timerDuration)
    : 0;

  showFeedback('quiz', isCorrect, item.explain, pts);
}

function timeOutQuiz(correct, item) {
  document.querySelectorAll('.opt-btn').forEach(b => b.classList.add('disabled'));
  document.getElementById(`opt-${correct}`).classList.remove('disabled');
  document.getElementById(`opt-${correct}`).classList.add('correct');
  showFeedback('quiz', false, item.explain, 0, true);
}

// Comodín 50:50
function use5050() {
  if (STATE.lifelinesLeft[STATE.currentIdx] <= 0) return;
  STATE.lifelinesLeft[STATE.currentIdx]--;

  const item = STATE.currentQuestion;
  const opts = document.querySelectorAll('.opt-btn');

  // Eliminar 2 incorrectas aleatorias
  const wrongs = [];
  opts.forEach((btn, idx) => {
    const label = btn.querySelector('.opt-letter').textContent;
    const origIdx = ['A','B','C','D'].indexOf(label);
    // btn tiene el texto, comparamos con la correcta reconstruida
    if (!btn.classList.contains('disabled') && !btn.classList.contains('eliminated')) {
      // Detectar cuál es la correcta por posición visual:
      // Guardamos el corrIdx en un data-attr cuando creamos los botones
      if (btn.dataset.wrong === 'true') wrongs.push(idx);
    }
  });

  // Eliminar 2 de las 3 incorrectas aleatoriamente
  const wrongBtns = [];
  opts.forEach((btn, idx) => {
    if (btn.dataset.iscorrect !== '1' && !btn.classList.contains('eliminated')) wrongBtns.push(idx);
  });
  const toElim = shuffle(wrongBtns).slice(0, 2);
  toElim.forEach(idx => opts[idx].classList.add('eliminated'));

  // Actualizar botón
  const ll = document.getElementById('lifeline-btn');
  if (STATE.lifelinesLeft[STATE.currentIdx] > 0) {
    ll.innerHTML = `<span class="ll-icon">50</span>:<span class="ll-icon">50</span> <span class="ll-label">Comodín (${STATE.lifelinesLeft[STATE.currentIdx]})</span>`;
  } else {
    ll.classList.add('used');
  }
  STATE.lifelineUsed = true;
}

// ──────────────── VERDADERO / FALSO ────────────────
function showTrueFalse() {
  const { item } = pickRandom(QUESTIONS.trueFalse, STATE.usedTFIds);
  STATE.currentQuestion = item;

  setGameHeader('tf');
  document.getElementById('tf-counter').textContent = qCounter();
  document.getElementById('tf-text').textContent    = item.q;
  document.getElementById('tf-feedback').classList.add('hidden');
  document.querySelectorAll('.tf-btn').forEach(b => { b.classList.remove('disabled'); b.style.opacity = '1'; });

  showScreen('screen-truefalse');
  startTimer('tf', 15, () => {
    document.querySelectorAll('.tf-btn').forEach(b => { b.classList.add('disabled'); b.style.opacity = '.5'; });
    showFeedback('tf', false, item.explain, 0, true);
  });
}

function answerTF(answer) {
  stopTimer();
  const item = STATE.currentQuestion;
  document.querySelectorAll('.tf-btn').forEach(b => { b.classList.add('disabled'); b.style.opacity = '.5'; });
  const isCorrect = answer === item.a;
  showFeedback('tf', isCorrect, item.explain, isCorrect ? calcPts(item.pts, 15) : 0);
}

// ──────────────── COMPLETA LA FRASE ────────────────
function showFillBlank() {
  const { item } = pickRandom(QUESTIONS.fillBlank, STATE.usedFBIds);
  STATE.currentQuestion = item;
  STATE.fbAnswer = Array(item.answer.length).fill('');
  STATE.fbLetterBtns = [];

  setGameHeader('fb');
  document.getElementById('fb-counter').textContent = qCounter();
  document.getElementById('fb-text').textContent    = item.question + `  [💡 ${item.hint}]`;

  const boxesEl = document.getElementById('answer-boxes');
  boxesEl.innerHTML = '';
  for (let i = 0; i < item.answer.length; i++) {
    const box = document.createElement('div');
    box.className = 'answer-box';
    box.id = `fb-box-${i}`;
    box.onclick = () => removeLetterFB(i);
    boxesEl.appendChild(box);
  }

  const pool = shuffle([...item.answer.split(''), ...item.extraLetters]);
  const optsEl = document.getElementById('letter-options');
  optsEl.innerHTML = '';
  pool.forEach((letter, idx) => {
    const btn = document.createElement('button');
    btn.className = 'letter-btn';
    btn.id = `fb-lbtn-${idx}`;
    btn.textContent = letter;
    btn.onclick = () => addLetterFB(letter, idx);
    optsEl.appendChild(btn);
    STATE.fbLetterBtns.push({ letter, idx, used: false });
  });

  document.getElementById('fb-feedback').classList.add('hidden');
  showScreen('screen-fillblank');
  startTimer('fb', 25, () => {
    document.querySelectorAll('.letter-btn').forEach(b => b.classList.add('used'));
    showFeedback('fb', false, `La respuesta era: ${item.answer}. ${item.explain}`, 0, true);
  });
}

function addLetterFB(letter, btnIdx) {
  const firstEmpty = STATE.fbAnswer.indexOf('');
  if (firstEmpty === -1) return;
  STATE.fbAnswer[firstEmpty] = letter;
  const box = document.getElementById(`fb-box-${firstEmpty}`);
  box.textContent = letter; box.classList.add('filled');
  document.getElementById(`fb-lbtn-${btnIdx}`).classList.add('used');
  STATE.fbLetterBtns[btnIdx].used = true;
  STATE.fbLetterBtns[btnIdx].boxIdx = firstEmpty;
  if (!STATE.fbAnswer.includes('')) checkFillBlank();
}

function removeLetterFB(boxIdx) {
  if (!STATE.fbAnswer[boxIdx]) return;
  const btn = STATE.fbLetterBtns.find(b => b.used && b.boxIdx === boxIdx);
  if (btn) { document.getElementById(`fb-lbtn-${btn.idx}`).classList.remove('used'); btn.used = false; }
  STATE.fbAnswer[boxIdx] = '';
  const box = document.getElementById(`fb-box-${boxIdx}`);
  box.textContent = ''; box.classList.remove('filled');
}

function checkFillBlank() {
  stopTimer();
  const item = STATE.currentQuestion;
  const isCorrect = STATE.fbAnswer.join('').toUpperCase() === item.answer.toUpperCase();
  document.querySelectorAll('.letter-btn').forEach(b => b.classList.add('used'));
  showFeedback('fb', isCorrect,
    isCorrect ? item.explain : `La respuesta era: ${item.answer}. ${item.explain}`,
    isCorrect ? calcPts(item.pts, 25) : 0);
}

// ──────────────── ANAGRAMA ────────────────
function showAnagram() {
  const { item } = pickRandom(QUESTIONS.anagram, STATE.usedAGIds);
  STATE.currentQuestion = item;
  const word = item.word.toUpperCase();
  STATE.agAnswer = Array(word.length).fill('');
  STATE.agLetterBtns = [];

  setGameHeader('ag');
  document.getElementById('ag-counter').textContent = qCounter();
  document.getElementById('ag-hint').textContent    = `💡 ${item.hint}`;

  const slotsEl = document.getElementById('answer-slots');
  slotsEl.innerHTML = '';
  for (let i = 0; i < word.length; i++) {
    const slot = document.createElement('div');
    slot.className = 'answer-slot'; slot.id = `ag-slot-${i}`;
    slot.onclick = () => removeLetterAG(i);
    slotsEl.appendChild(slot);
  }

  let scrambled = shuffle(word.split(''));
  while (scrambled.join('') === word) scrambled = shuffle(word.split(''));

  const scramEl = document.getElementById('scrambled-letters');
  scramEl.innerHTML = '';
  scrambled.forEach((letter, idx) => {
    const btn = document.createElement('button');
    btn.className = 'scramble-btn'; btn.id = `ag-btn-${idx}`;
    btn.textContent = letter;
    btn.onclick = () => addLetterAG(letter, idx);
    scramEl.appendChild(btn);
    STATE.agLetterBtns.push({ letter, idx, used: false });
  });

  document.getElementById('ag-feedback').classList.add('hidden');
  showScreen('screen-anagram');
  startTimer('ag', 25, () => {
    document.querySelectorAll('.scramble-btn').forEach(b => b.classList.add('used'));
    showFeedback('ag', false, `La respuesta era: ${item.word}. ${item.explain}`, 0, true);
  });
}

function addLetterAG(letter, btnIdx) {
  const firstEmpty = STATE.agAnswer.indexOf('');
  if (firstEmpty === -1) return;
  STATE.agAnswer[firstEmpty] = letter;
  const slot = document.getElementById(`ag-slot-${firstEmpty}`);
  slot.textContent = letter; slot.classList.add('filled');
  document.getElementById(`ag-btn-${btnIdx}`).classList.add('used');
  STATE.agLetterBtns[btnIdx].used = true;
  STATE.agLetterBtns[btnIdx].slotIdx = firstEmpty;
  if (!STATE.agAnswer.includes('')) checkAnagram();
}

function removeLetterAG(slotIdx) {
  if (!STATE.agAnswer[slotIdx]) return;
  const btn = STATE.agLetterBtns.find(b => b.used && b.slotIdx === slotIdx);
  if (btn) { document.getElementById(`ag-btn-${btn.idx}`).classList.remove('used'); btn.used = false; }
  STATE.agAnswer[slotIdx] = '';
  const slot = document.getElementById(`ag-slot-${slotIdx}`);
  slot.textContent = ''; slot.classList.remove('filled');
}

function checkAnagram() {
  stopTimer();
  const item = STATE.currentQuestion;
  const isCorrect = STATE.agAnswer.join('').toUpperCase() === item.word.toUpperCase();
  document.querySelectorAll('.scramble-btn').forEach(b => b.classList.add('used'));
  showFeedback('ag', isCorrect,
    isCorrect ? item.explain : `La respuesta era: ${item.word}. ${item.explain}`,
    isCorrect ? calcPts(item.pts, 25) : 0);
}

// ──────────────── SOPA DE LETRAS ────────────────
function showWordSearch() {
  const { item } = pickRandom(QUESTIONS.wordSearch, STATE.usedWSIds);
  STATE.currentQuestion = item;
  STATE.wsFinished = false;

  setGameHeader('ws');
  document.getElementById('ws-feedback').classList.add('hidden');

  const gen = new WordSearchGenerator();
  gen.generate(item.words);

  STATE.wsUI = new WordSearchUI(
    gen,
    document.getElementById('ws-grid'),
    document.getElementById('ws-words-list'),
    () => celebrate('¡ENCONTRADA! 🔍', '🎯'),
    () => {
      STATE.wsFinished = true;
      stopTimer();
      const pts = calcPts(item.pts, 60);
      document.getElementById('ws-fp-text').textContent  = '¡Todas encontradas! 🔍';
      document.getElementById('ws-fp-pts').textContent   = `+${pts} pts`;
      document.getElementById('ws-feedback').classList.remove('hidden');
      addPoints(pts);
    }
  );
  STATE.wsUI.render();

  showScreen('screen-wordsearch');
  startTimer('ws', 60, () => {
    if (!STATE.wsFinished) {
      const found = STATE.wsUI.foundWords.size;
      const total = gen.placed.length;
      const pts   = Math.round((found / Math.max(total, 1)) * item.pts * currentProfile().pointsMult * 0.5);
      document.getElementById('ws-fp-text').textContent = found > 0 ? `¡${found} de ${total} palabras!` : '¡Tiempo agotado!';
      document.getElementById('ws-fp-pts').textContent  = pts > 0 ? `+${pts} pts` : '+0 pts';
      document.getElementById('ws-feedback').classList.remove('hidden');
      if (pts > 0) addPoints(pts);
    }
  });
}

// ──────────────── FEEDBACK ────────────────
function showFeedback(type, isCorrect, explanation, pts, isTimeout = false) {
  const ids = {
    quiz: ['quiz-feedback','quiz-fp-icon','quiz-fp-text','quiz-fp-explain','quiz-fp-pts'],
    tf:   ['tf-feedback',  'tf-fp-icon',  'tf-fp-text',  'tf-fp-explain',  'tf-fp-pts'],
    fb:   ['fb-feedback',  'fb-fp-icon',  'fb-fp-text',  'fb-fp-explain',  'fb-fp-pts'],
    ag:   ['ag-feedback',  'ag-fp-icon',  'ag-fp-text',  'ag-fp-explain',  'ag-fp-pts'],
  };
  const [panelId, iconId, textId, expId, ptsId] = ids[type];

  document.getElementById(iconId).textContent = isTimeout ? '⏰' : (isCorrect ? '✅' : '❌');
  document.getElementById(textId).textContent = isTimeout ? '¡Tiempo! ⏰' : (isCorrect ? correctMsg() : wrongMsg());
  document.getElementById(expId).textContent  = explanation;
  document.getElementById(ptsId).textContent  = pts > 0 ? `+${pts} pts` : (isTimeout ? '¡Se acabó el tiempo!' : '¡Sigue intentándolo! 💪');
  document.getElementById(panelId).classList.remove('hidden');

  if (isCorrect && pts > 0) {
    addPoints(pts);
    STATE.correct[STATE.currentIdx]++;
    celebrate(correctMsg(), '🎉');
  }
}

function correctMsg() {
  const m = ['¡CORRECTO! 🎉','¡INCREÍBLE! 🌟','¡GENIAL! 🚀','¡PERFECTO! ⭐','¡BRILLANTE! 💫','¡CAMPEÓN! 🏆'];
  return m[Math.floor(Math.random() * m.length)];
}
function wrongMsg() {
  const m = ['¡Casi! 😅','¡Sigue intentándolo! 💪','¡No pasa nada! 🙂','¡La próxima! ⚽'];
  return m[Math.floor(Math.random() * m.length)];
}

// ──────────────── PUNTOS ────────────────
function calcPts(basePts, duration) {
  const p    = currentProfile();
  const frac = STATE.timerRemaining / duration;  // 0–1
  // Mínimo 30% de los puntos; el resto según velocidad de respuesta
  return Math.round(basePts * p.pointsMult * (0.3 + 0.7 * frac));
}

function addPoints(pts) {
  STATE.scores[STATE.currentIdx] += pts;
  ['quiz','tf','fb','ag','ws'].forEach(prefix => {
    const sc = document.getElementById(`${prefix}-pts-live`);
    if (sc) sc.textContent = `${STATE.scores[STATE.currentIdx]} pts`;
  });
}

// ──────────────── SIGUIENTE TURNO ────────────────
function nextTurn() {
  stopTimer();
  STATE.currentIdx = otherIdx();
  if (STATE.questionIndex >= STATE.totalQuestions) { endGame(); return; }
  showTurnScreen();
}

// ──────────────── FIN ────────────────
function endGame() {
  stopTimer();
  const [pts0, pts1]     = STATE.scores;
  const [name0, name1]   = STATE.selectedProfiles.map(id => PROFILES[id].name);
  const [emoji0, emoji1] = STATE.selectedProfiles.map(id => PROFILES[id].emoji);

  const card0 = document.getElementById('end-card-0');
  const card1 = document.getElementById('end-card-1');
  card0.classList.remove('winner'); card1.classList.remove('winner');

  let winnerText;
  if (pts0 > pts1)      { winnerText = `¡${name0.toUpperCase()} GANA! ${emoji0} 🏆`; card0.classList.add('winner'); }
  else if (pts1 > pts0) { winnerText = `¡${name1.toUpperCase()} GANA! ${emoji1} 🏆`; card1.classList.add('winner'); }
  else                  { winnerText = '¡EMPATE! 🤝🏆'; }

  document.getElementById('end-winner').textContent  = winnerText;
  document.getElementById('end-avatar-0').textContent = emoji0;
  document.getElementById('end-name-0').textContent   = name0.toUpperCase();
  document.getElementById('end-pts-0').textContent    = pts0;
  document.getElementById('end-avatar-1').textContent = emoji1;
  document.getElementById('end-name-1').textContent   = name1.toUpperCase();
  document.getElementById('end-pts-1').textContent    = pts1;

  // ── Guardar en liga semanal ──
  const { notifications } = addGameScores(
    STATE.selectedProfiles[0], STATE.scores[0],
    STATE.selectedProfiles[1], STATE.scores[1]
  );

  // Leer saldos actualizados para mostrar en pantalla final
  const leagueData = loadLeague();
  const pn0 = leagueData.playerData[STATE.selectedProfiles[0]]?.pnBalance ?? 0;
  const pn1 = leagueData.playerData[STATE.selectedProfiles[1]]?.pnBalance ?? 0;

  document.getElementById('end-stats').innerHTML =
    `✅ Correctas de ${name0}: <strong>${STATE.correct[0]}</strong> · ⭐ ${pn0} Pts Nieves<br>
     ✅ Correctas de ${name1}: <strong>${STATE.correct[1]}</strong> · ⭐ ${pn1} Pts Nieves<br>
     🏆 Preguntas jugadas: <strong>${STATE.totalQuestions}</strong>`;

  showScreen('screen-end');

  // Mostrar notificaciones de nuevos PN ganados
  if (notifications.length > 0) {
    setTimeout(() => {
      notifications.forEach((n, i) => {
        const p    = PROFILES[n.id];
        const step = PN_LADDER.find(s => s.pn === n.total);
        setTimeout(() => showPNToast(
          `${p.emoji} ${p.name} gana +${n.earned} ⭐ Nieves → Total: ${n.total}/10\n${step?.prize ?? ''}`
        ), i * 2200);
      });
    }, 800);
  }
}

// ──────────────── TEMPORIZADOR (con velocidad por perfil) ────────────────
function startTimer(prefix, duration, onEnd) {
  stopTimer();
  const p     = currentProfile();
  // Intervalo real en ms: 1000 / timerSpeed
  // timerSpeed 0.5 → 2000ms por tick (más lento para Max)
  // timerSpeed 1.8 → ~555ms por tick (más rápido para Papá)
  const intervalMs = Math.round(1000 / p.timerSpeed);

  STATE.timerDuration  = duration;
  STATE.timerRemaining = duration;
  STATE.timerInterval  = intervalMs;

  const fillEl = document.getElementById(`${prefix}-ring-fill`);
  const numEl  = document.getElementById(`${prefix}-timer-num`);
  const CIRC   = 163.4; // 2π × 26

  if (fillEl) { fillEl.style.strokeDashoffset = '0'; fillEl.classList.remove('urgent'); }
  if (numEl)  numEl.textContent = duration;

  let remaining = duration;
  STATE.activeTimer = setInterval(() => {
    remaining--;
    STATE.timerRemaining = remaining;
    const pct = remaining / duration;
    if (fillEl) {
      fillEl.style.strokeDashoffset = String(CIRC * (1 - pct));
      if (remaining <= 5) fillEl.classList.add('urgent');
    }
    if (numEl) numEl.textContent = remaining;
    if (remaining <= 0) { stopTimer(); if (onEnd) onEnd(); }
  }, intervalMs);
}

function stopTimer() {
  if (STATE.activeTimer) { clearInterval(STATE.activeTimer); STATE.activeTimer = null; }
}

// ──────────────── TOAST PUNTOS NIEVES ────────────────
function showPNToast(msg) {
  const existing = document.querySelector('.pn-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'pn-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// ──────────────── CELEBRACIÓN ────────────────
function celebrate(text, emoji) {
  document.getElementById('cel-emoji').textContent = emoji;
  document.getElementById('cel-text').textContent  = text;
  const ov = document.getElementById('overlay-celebrate');
  ov.classList.remove('hidden');
  setTimeout(() => ov.classList.add('hidden'), 1100);
}

// ──────────────── INIT ────────────────
showScreen('screen-start');
