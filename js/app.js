// ============================================================
//  MUNDIAL 2026 QUIZ - LÓGICA PRINCIPAL
// ============================================================

// ──────────────── ESTADO DEL JUEGO ────────────────
const STATE = {
  players: { max: false, martin: false },
  scores: { max: 0, martin: 0 },
  correct: { max: 0, martin: 0 },
  currentPlayer: 'max',  // 'max' | 'martin'
  questionIndex: 0,
  totalQuestions: 20,    // 10 por jugador
  activeTimer: null,
  timerDuration: 30,
  timerRemaining: 30,
  currentQuestion: null,
  currentType: null,     // 'quiz'|'trueFalse'|'fillBlank'|'anagram'|'wordSearch'
  usedQuizIds: [],
  usedTFIds: [],
  usedFBIds: [],
  usedAGIds: [],
  usedWSIds: [],
  wsUI: null,
  wsFinished: false,
  // anagram state
  agAnswer: [],          // letters placed by player
  agLetterBtns: [],      // scrambled letter buttons
  // fillblank state
  fbAnswer: [],
  fbLetterBtns: [],
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
  const available = arr.filter((_, i) => !usedIds.includes(i));
  if (available.length === 0) {
    usedIds.length = 0; // reset
    return pickRandom(arr, usedIds);
  }
  const idx = arr.indexOf(available[Math.floor(Math.random() * available.length)]);
  usedIds.push(idx);
  return { item: arr[idx], idx };
}

function playerLabel(p) {
  return p === 'max' ? 'MAX ⚽' : 'MARTÍN 🥅';
}

function playerEmoji(p) {
  return p === 'max' ? '⚽' : '🥅';
}

function otherPlayer(p) {
  return p === 'max' ? 'martin' : 'max';
}

// ──────────────── INICIO ────────────────

function togglePlayer(player) {
  STATE.players[player] = !STATE.players[player];
  const card = document.getElementById(`card-${player}`);
  const status = card.querySelector('.player-status');
  if (STATE.players[player]) {
    card.classList.add('active');
    status.textContent = '¡Listo! ✅';
  } else {
    card.classList.remove('active');
    status.textContent = 'Pulsa para jugar';
  }
  const btn = document.getElementById('btn-start');
  if (STATE.players.max && STATE.players.martin) {
    btn.classList.remove('disabled');
    btn.textContent = '¡COMENZAR! 🚀';
  } else {
    btn.classList.add('disabled');
    btn.textContent = '¡COMENZAR!';
  }
}

function startGame() {
  if (!STATE.players.max || !STATE.players.martin) return;

  // Reset state
  STATE.scores.max = 0;
  STATE.scores.martin = 0;
  STATE.correct.max = 0;
  STATE.correct.martin = 0;
  STATE.questionIndex = 0;
  STATE.currentPlayer = Math.random() < 0.5 ? 'max' : 'martin';
  STATE.usedQuizIds = [];
  STATE.usedTFIds = [];
  STATE.usedFBIds = [];
  STATE.usedAGIds = [];
  STATE.usedWSIds = [];

  showTurnScreen();
}

// ──────────────── TURNO ────────────────

function showTurnScreen() {
  stopTimer();

  // Update scoreboard
  document.getElementById('score-max').textContent   = STATE.scores.max;
  document.getElementById('score-martin').textContent = STATE.scores.martin;

  const maxCard    = document.getElementById('score-max-card');
  const martinCard = document.getElementById('score-martin-card');
  maxCard.classList.toggle('leading',    STATE.scores.max > STATE.scores.martin);
  martinCard.classList.toggle('leading', STATE.scores.martin > STATE.scores.max);

  document.getElementById('turn-player-name').textContent = STATE.currentPlayer === 'max' ? 'MAX' : 'MARTÍN';
  document.getElementById('turn-emoji').textContent       = playerEmoji(STATE.currentPlayer);
  document.getElementById('turn-announcement').style.background =
    STATE.currentPlayer === 'max'
      ? 'linear-gradient(135deg, #1d6fa4, #27a143)'
      : 'linear-gradient(135deg, #9b2c8a, #1d6fa4)';

  showScreen('screen-scoreboard');
}

function proceedToQuestion() {
  if (STATE.questionIndex >= STATE.totalQuestions) {
    endGame();
    return;
  }
  launchNextQuestion();
}

// ──────────────── LANZAR PREGUNTA ────────────────

// Secuencia de tipos para variedad (se repite cíclicamente)
const TYPE_SEQUENCE = [
  'quiz', 'trueFalse', 'quiz', 'fillBlank',
  'quiz', 'anagram',  'quiz', 'trueFalse',
  'wordSearch', 'quiz', 'trueFalse', 'quiz',
  'fillBlank', 'anagram', 'quiz', 'trueFalse',
  'quiz', 'wordSearch', 'quiz', 'anagram'
];

function launchNextQuestion() {
  const type = TYPE_SEQUENCE[STATE.questionIndex % TYPE_SEQUENCE.length];
  STATE.currentType = type;
  STATE.questionIndex++;

  switch (type) {
    case 'quiz':       showQuizQuestion();      break;
    case 'trueFalse':  showTrueFalse();         break;
    case 'fillBlank':  showFillBlank();         break;
    case 'anagram':    showAnagram();           break;
    case 'wordSearch': showWordSearch();        break;
  }
}

function counterText() {
  return `P ${STATE.questionIndex}/${STATE.totalQuestions}`;
}

// ──────────────── TIPO TEST ────────────────

function showQuizQuestion() {
  const { item } = pickRandom(QUESTIONS.quiz, STATE.usedQuizIds);
  STATE.currentQuestion = item;

  document.getElementById('quiz-player-badge').textContent = playerLabel(STATE.currentPlayer);
  document.getElementById('question-counter').textContent  = counterText();
  document.getElementById('question-category').textContent = item.cat;
  document.getElementById('question-text').textContent     = item.q;
  document.getElementById('question-points').textContent   = `⭐ ${item.pts} pts`;

  // Mezclar opciones pero recordar cuál es la correcta
  const indices = [0, 1, 2, 3];
  const shuffled = shuffle(indices);
  const correctShuffled = shuffled.indexOf(item.a);

  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  const labels = ['A', 'B', 'C', 'D'];
  shuffled.forEach((origIdx, newIdx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-letter">${labels[newIdx]}</span>${item.opts[origIdx]}`;
    btn.onclick = () => answerQuiz(newIdx, correctShuffled, item);
    grid.appendChild(btn);
  });

  document.getElementById('question-feedback').classList.add('hidden');
  showScreen('screen-quiz');
  startTimer('timer-bar', 'timer-text', 30, () => timeOut('quiz', item));
}

function answerQuiz(chosen, correct, item) {
  stopTimer();
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach((b, i) => {
    b.classList.add('disabled');
    if (i === correct) b.classList.add('correct');
    else if (i === chosen) b.classList.add('wrong');
  });

  const isCorrect = chosen === correct;
  const pts = isCorrect ? Math.round(item.pts * (STATE.timerRemaining / 30) + item.pts * 0.3) : 0;
  showFeedback('quiz', isCorrect, item.explain, pts);
}

// ──────────────── VERDADERO / FALSO ────────────────

function showTrueFalse() {
  const { item } = pickRandom(QUESTIONS.trueFalse, STATE.usedTFIds);
  STATE.currentQuestion = item;

  document.getElementById('tf-player-badge').textContent = playerLabel(STATE.currentPlayer);
  document.getElementById('tf-counter').textContent      = counterText();
  document.getElementById('tf-question-text').textContent = item.q;

  document.getElementById('tf-feedback').classList.add('hidden');
  document.querySelectorAll('.btn-true, .btn-false').forEach(b => {
    b.classList.remove('disabled');
    b.style.opacity = '1';
  });

  showScreen('screen-truefalse');
  startTimer('tf-timer-bar', 'tf-timer-text', 15, () => timeOut('tf', item));
}

function answerTF(playerAnswer) {
  stopTimer();
  const item = STATE.currentQuestion;
  const isCorrect = playerAnswer === item.a;
  const pts = isCorrect ? Math.round(item.pts * (STATE.timerRemaining / 15) + item.pts * 0.3) : 0;

  document.querySelectorAll('.btn-true, .btn-false').forEach(b => {
    b.classList.add('disabled');
    b.style.opacity = '0.5';
  });

  showFeedback('tf', isCorrect, item.explain, pts);
}

// ──────────────── COMPLETA LA FRASE ────────────────

function showFillBlank() {
  const { item } = pickRandom(QUESTIONS.fillBlank, STATE.usedFBIds);
  STATE.currentQuestion = item;
  STATE.fbAnswer = Array(item.answer.length).fill('');
  STATE.fbLetterBtns = [];

  document.getElementById('fb-player-badge').textContent = playerLabel(STATE.currentPlayer);
  document.getElementById('fb-counter').textContent      = counterText();
  document.getElementById('fb-question-text').textContent = item.question;

  // Boxes para la respuesta
  const boxesEl = document.getElementById('answer-boxes');
  boxesEl.innerHTML = '';
  for (let i = 0; i < item.answer.length; i++) {
    const box = document.createElement('div');
    box.className = 'answer-box';
    box.id = `fb-box-${i}`;
    box.textContent = '';
    box.onclick = () => removeLetterFB(i);
    boxesEl.appendChild(box);
  }

  // Letras disponibles: las de la respuesta + extras, mezcladas
  const letterPool = shuffle([...item.answer.split(''), ...item.extraLetters]);
  const optionsEl = document.getElementById('letter-options');
  optionsEl.innerHTML = '';
  letterPool.forEach((letter, idx) => {
    const btn = document.createElement('button');
    btn.className = 'letter-btn';
    btn.id = `fb-lbtn-${idx}`;
    btn.textContent = letter;
    btn.onclick = () => addLetterFB(letter, idx);
    optionsEl.appendChild(btn);
    STATE.fbLetterBtns.push({ letter, idx, used: false });
  });

  document.getElementById('fb-feedback').classList.add('hidden');
  showScreen('screen-fillblank');
  startTimer('fb-timer-bar', 'fb-timer-text', 25, () => timeOut('fb', item));
}

function addLetterFB(letter, btnIdx) {
  const firstEmpty = STATE.fbAnswer.indexOf('');
  if (firstEmpty === -1) return; // ya lleno

  STATE.fbAnswer[firstEmpty] = letter;
  document.getElementById(`fb-box-${firstEmpty}`).textContent = letter;
  document.getElementById(`fb-box-${firstEmpty}`).classList.add('filled');
  document.getElementById(`fb-lbtn-${btnIdx}`).classList.add('used');
  STATE.fbLetterBtns[btnIdx].used = true;
  STATE.fbLetterBtns[btnIdx].boxIdx = firstEmpty;

  // Auto-check si ya llenó todas
  if (!STATE.fbAnswer.includes('')) {
    checkFillBlank();
  }
}

function removeLetterFB(boxIdx) {
  if (!STATE.fbAnswer[boxIdx]) return;
  // Encontrar qué botón usó esa caja
  const btn = STATE.fbLetterBtns.find(b => b.used && b.boxIdx === boxIdx);
  if (btn) {
    document.getElementById(`fb-lbtn-${btn.idx}`).classList.remove('used');
    btn.used = false;
    btn.boxIdx = undefined;
  }
  STATE.fbAnswer[boxIdx] = '';
  document.getElementById(`fb-box-${boxIdx}`).textContent = '';
  document.getElementById(`fb-box-${boxIdx}`).classList.remove('filled');
}

function checkFillBlank() {
  stopTimer();
  const item = STATE.currentQuestion;
  const playerAnswer = STATE.fbAnswer.join('').toUpperCase();
  const isCorrect = playerAnswer === item.answer.toUpperCase();
  const pts = isCorrect ? Math.round(item.pts * (STATE.timerRemaining / 25) + item.pts * 0.3) : 0;
  // Deshabilitar botones
  document.querySelectorAll('.letter-btn').forEach(b => b.classList.add('used'));
  showFeedback('fb', isCorrect, `${isCorrect ? '' : 'La respuesta correcta era: ' + item.answer + '. '}${item.explain}`, pts);
}

// ──────────────── ANAGRAMA ────────────────

function showAnagram() {
  const { item } = pickRandom(QUESTIONS.anagram, STATE.usedAGIds);
  STATE.currentQuestion = item;
  const word = item.word.toUpperCase();
  STATE.agAnswer = Array(word.length).fill('');
  STATE.agLetterBtns = [];

  document.getElementById('ag-player-badge').textContent = playerLabel(STATE.currentPlayer);
  document.getElementById('ag-counter').textContent      = counterText();
  document.getElementById('ag-hint-text').textContent    = `💡 ${item.hint}`;

  // Slots para la respuesta
  const slotsEl = document.getElementById('answer-slots');
  slotsEl.innerHTML = '';
  for (let i = 0; i < word.length; i++) {
    const slot = document.createElement('div');
    slot.className = 'answer-slot';
    slot.id = `ag-slot-${i}`;
    slot.onclick = () => removeLetterAG(i);
    slotsEl.appendChild(slot);
  }

  // Letras mezcladas (asegurar que no queden en orden)
  let scrambled = shuffle(word.split(''));
  // Re-mezclar si accidentalmente quedó como la respuesta
  while (scrambled.join('') === word) scrambled = shuffle(word.split(''));

  const scrambledEl = document.getElementById('scrambled-letters');
  scrambledEl.innerHTML = '';
  scrambled.forEach((letter, idx) => {
    const btn = document.createElement('button');
    btn.className = 'scramble-btn';
    btn.id = `ag-btn-${idx}`;
    btn.textContent = letter;
    btn.onclick = () => addLetterAG(letter, idx);
    scrambledEl.appendChild(btn);
    STATE.agLetterBtns.push({ letter, idx, used: false });
  });

  document.getElementById('ag-feedback').classList.add('hidden');
  showScreen('screen-anagram');
  startTimer('ag-timer-bar', 'ag-timer-text', 25, () => timeOut('ag', item));
}

function addLetterAG(letter, btnIdx) {
  const firstEmpty = STATE.agAnswer.indexOf('');
  if (firstEmpty === -1) return;

  STATE.agAnswer[firstEmpty] = letter;
  document.getElementById(`ag-slot-${firstEmpty}`).textContent = letter;
  document.getElementById(`ag-slot-${firstEmpty}`).classList.add('filled');
  document.getElementById(`ag-btn-${btnIdx}`).classList.add('used');
  STATE.agLetterBtns[btnIdx].used = true;
  STATE.agLetterBtns[btnIdx].slotIdx = firstEmpty;

  if (!STATE.agAnswer.includes('')) {
    checkAnagram();
  }
}

function removeLetterAG(slotIdx) {
  if (!STATE.agAnswer[slotIdx]) return;
  const btn = STATE.agLetterBtns.find(b => b.used && b.slotIdx === slotIdx);
  if (btn) {
    document.getElementById(`ag-btn-${btn.idx}`).classList.remove('used');
    btn.used = false;
    btn.slotIdx = undefined;
  }
  STATE.agAnswer[slotIdx] = '';
  document.getElementById(`ag-slot-${slotIdx}`).textContent = '';
  document.getElementById(`ag-slot-${slotIdx}`).classList.remove('filled');
}

function checkAnagram() {
  stopTimer();
  const item = STATE.currentQuestion;
  const playerAnswer = STATE.agAnswer.join('').toUpperCase();
  const isCorrect = playerAnswer === item.word.toUpperCase();
  const pts = isCorrect ? Math.round(item.pts * (STATE.timerRemaining / 25) + item.pts * 0.3) : 0;
  document.querySelectorAll('.scramble-btn').forEach(b => b.classList.add('used'));
  showFeedback('ag', isCorrect, `${isCorrect ? '' : 'La respuesta era: ' + item.word + '. '}${item.explain}`, pts);
}

// ──────────────── SOPA DE LETRAS ────────────────

function showWordSearch() {
  const { item } = pickRandom(QUESTIONS.wordSearch, STATE.usedWSIds);
  STATE.currentQuestion = item;
  STATE.wsFinished = false;

  document.getElementById('ws-player-badge').textContent = playerLabel(STATE.currentPlayer);
  document.getElementById('ws-counter').textContent      = counterText();

  const gen = new WordSearchGenerator();
  gen.generate(item.words);

  const gridEl    = document.getElementById('ws-grid');
  const wordsEl   = document.getElementById('ws-words-list');

  STATE.wsUI = new WordSearchUI(
    gen, gridEl, wordsEl,
    (word) => {
      // palabra encontrada
      celebrate('¡ENCONTRADA! 🔍', '🎯');
    },
    () => {
      // todas encontradas
      STATE.wsFinished = true;
      stopTimer();
      const pts = Math.round(item.pts * (STATE.timerRemaining / 60) + item.pts * 0.3);
      document.getElementById('ws-feedback-text').textContent = '¡Todas encontradas!';
      document.getElementById('ws-feedback-points').textContent = `+${pts} pts`;
      document.getElementById('ws-feedback').classList.remove('hidden');
      addPoints(pts);
    }
  );
  STATE.wsUI.render();

  document.getElementById('ws-feedback').classList.add('hidden');
  showScreen('screen-wordsearch');
  startTimer('ws-timer-bar', 'ws-timer-text', 60, () => {
    if (!STATE.wsFinished) {
      const wordsFound = STATE.wsUI.foundWords.size;
      const total = gen.placed.length;
      const pts = Math.round((wordsFound / total) * item.pts * 0.5);
      document.getElementById('ws-feedback-text').textContent =
        wordsFound > 0 ? `¡Encontraste ${wordsFound} de ${total}!` : '¡Se acabó el tiempo!';
      document.getElementById('ws-feedback-points').textContent = pts > 0 ? `+${pts} pts` : '+0 pts';
      document.getElementById('ws-feedback').classList.remove('hidden');
      if (pts > 0) addPoints(pts);
    }
  });
}

// ──────────────── FEEDBACK ────────────────

function showFeedback(type, isCorrect, explanation, pts) {
  const feedbackId  = { quiz: 'question-feedback', tf: 'tf-feedback', fb: 'fb-feedback', ag: 'ag-feedback' }[type];
  const iconId      = { quiz: 'feedback-icon',     tf: 'tf-feedback-icon',  fb: 'fb-feedback-icon',  ag: 'ag-feedback-icon'  }[type];
  const textId      = { quiz: 'feedback-text',     tf: 'tf-feedback-text',  fb: 'fb-feedback-text',  ag: 'ag-feedback-text'  }[type];
  const explainId   = { quiz: 'feedback-explanation', tf: 'tf-feedback-explanation', fb: 'fb-feedback-explanation', ag: 'ag-feedback-explanation' }[type];
  const ptsId       = { quiz: 'feedback-points',   tf: 'tf-feedback-points',fb: 'fb-feedback-points', ag: 'ag-feedback-points' }[type];

  document.getElementById(iconId).textContent    = isCorrect ? '✅' : '❌';
  document.getElementById(textId).textContent    = isCorrect ? correctMessage() : wrongMessage();
  document.getElementById(explainId).textContent = explanation;
  document.getElementById(ptsId).textContent     = pts > 0 ? `+${pts} pts` : '¡Sigue intentándolo!';
  document.getElementById(feedbackId).classList.remove('hidden');

  if (isCorrect) {
    addPoints(pts);
    STATE.correct[STATE.currentPlayer]++;
    celebrate(correctMessage(), '🎉');
  }
}

function correctMessage() {
  const msgs = ['¡CORRECTO! 🎉', '¡INCREÍBLE! 🌟', '¡GENIAL! 🚀', '¡PERFECTO! ⭐', '¡BRILLANTE! 💫', '¡CAMPEÓN! 🏆'];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

function wrongMessage() {
  const msgs = ['¡Casi! 😅', '¡Inténtalo de nuevo! 💪', '¡No pasa nada! 🙂', '¡La próxima! ⚽'];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

function addPoints(pts) {
  STATE.scores[STATE.currentPlayer] += pts;
}

// ──────────────── TIEMPO AGOTADO ────────────────

function timeOut(type, item) {
  const feedbackId  = { quiz: 'question-feedback', tf: 'tf-feedback', fb: 'fb-feedback', ag: 'ag-feedback' }[type];
  const iconId      = { quiz: 'feedback-icon',     tf: 'tf-feedback-icon',  fb: 'fb-feedback-icon',  ag: 'ag-feedback-icon'  }[type];
  const textId      = { quiz: 'feedback-text',     tf: 'tf-feedback-text',  fb: 'fb-feedback-text',  ag: 'ag-feedback-text'  }[type];
  const explainId   = { quiz: 'feedback-explanation', tf: 'tf-feedback-explanation', fb: 'fb-feedback-explanation', ag: 'ag-feedback-explanation' }[type];
  const ptsId       = { quiz: 'feedback-points',   tf: 'tf-feedback-points',fb: 'fb-feedback-points', ag: 'ag-feedback-points' }[type];

  document.getElementById(iconId).textContent    = '⏰';
  document.getElementById(textId).textContent    = '¡Tiempo! ⏰';
  document.getElementById(ptsId).textContent     = '+0 pts';

  let explain = '';
  if (type === 'quiz')    explain = item.explain;
  if (type === 'tf')      explain = item.explain;
  if (type === 'fb')      explain = `La respuesta era: ${item.answer}. ${item.explain}`;
  if (type === 'ag')      explain = `La respuesta era: ${item.word}. ${item.explain}`;
  document.getElementById(explainId).textContent = explain;

  // Disable all buttons
  if (type === 'quiz')   document.querySelectorAll('.option-btn').forEach(b => b.classList.add('disabled'));
  if (type === 'tf')     document.querySelectorAll('.btn-true, .btn-false').forEach(b => { b.classList.add('disabled'); b.style.opacity='0.5'; });
  if (type === 'fb')     document.querySelectorAll('.letter-btn').forEach(b => b.classList.add('used'));
  if (type === 'ag')     document.querySelectorAll('.scramble-btn').forEach(b => b.classList.add('used'));

  document.getElementById(feedbackId).classList.remove('hidden');
}

// ──────────────── SIGUIENTE TURNO ────────────────

function nextTurn() {
  stopTimer();
  // Alternar jugadores
  STATE.currentPlayer = otherPlayer(STATE.currentPlayer);

  if (STATE.questionIndex >= STATE.totalQuestions) {
    endGame();
  } else {
    showTurnScreen();
  }
}

// ──────────────── FIN DE JUEGO ────────────────

function endGame() {
  stopTimer();
  const maxPts    = STATE.scores.max;
  const martinPts = STATE.scores.martin;

  let winnerText;
  const maxCard    = document.getElementById('end-score-max');
  const martinCard = document.getElementById('end-score-martin');
  maxCard.classList.remove('winner');
  martinCard.classList.remove('winner');

  if (maxPts > martinPts) {
    winnerText = '¡MAX GANA! ⚽🏆';
    maxCard.classList.add('winner');
  } else if (martinPts > maxPts) {
    winnerText = '¡MARTÍN GANA! 🥅🏆';
    martinCard.classList.add('winner');
  } else {
    winnerText = '¡EMPATE! 🤝🏆';
  }

  document.getElementById('winner-text').textContent  = winnerText;
  document.getElementById('final-pts-max').textContent    = maxPts;
  document.getElementById('final-pts-martin').textContent = martinPts;

  document.getElementById('end-stats').innerHTML = `
    ✅ Respuestas correctas de MAX: <strong>${STATE.correct.max}</strong><br>
    ✅ Respuestas correctas de MARTÍN: <strong>${STATE.correct.martin}</strong><br>
    🏆 Preguntas jugadas: <strong>${STATE.totalQuestions}</strong>
  `;

  showScreen('screen-end');
}

function restartGame() {
  startGame();
}

// ──────────────── TEMPORIZADOR ────────────────

function startTimer(barId, textId, duration, onEnd) {
  stopTimer();
  STATE.timerDuration  = duration;
  STATE.timerRemaining = duration;

  const bar  = document.getElementById(barId);
  const text = document.getElementById(textId);
  if (!bar || !text) return;

  bar.style.width = '100%';
  bar.style.transition = 'none';
  bar.classList.remove('urgent');
  text.textContent = duration;

  let remaining = duration;
  STATE.activeTimer = setInterval(() => {
    remaining--;
    STATE.timerRemaining = remaining;
    const pct = (remaining / duration) * 100;
    bar.style.transition = 'width 1s linear';
    bar.style.width = pct + '%';
    text.textContent = remaining;
    if (remaining <= 5) bar.classList.add('urgent');
    if (remaining <= 0) {
      stopTimer();
      if (onEnd) onEnd();
    }
  }, 1000);
}

function stopTimer() {
  if (STATE.activeTimer) {
    clearInterval(STATE.activeTimer);
    STATE.activeTimer = null;
  }
}

// ──────────────── CELEBRACIÓN ────────────────

function celebrate(text, emoji) {
  const overlay = document.getElementById('overlay-celebrate');
  document.getElementById('celebrate-text').textContent  = text;
  document.getElementById('celebrate-emoji').textContent = emoji;
  overlay.classList.remove('hidden');
  setTimeout(() => overlay.classList.add('hidden'), 1200);
}

// ──────────────── INIT ────────────────
showScreen('screen-start');
