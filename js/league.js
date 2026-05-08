// ============================================================
//  LIGA SEMANAL — PUNTOS NIEVES
//  - Semana lunes→domingo, reseteo automático
//  - Puntos de partida acumulan → desbloquean Puntos Nieves (PN)
//  - Máximo 10 PN por semana
//  - PN no caducan → se canjean en la tienda de Nieves
// ============================================================

// ──────────────── ESCALA DE PUNTOS NIEVES ────────────────
// Puntos de juego acumulados en la semana → PN desbloqueados
// Calibrado para que jugar 1 día = ~1-2 PN y jugar toda la semana bien = 10 PN
const PN_LADDER = [
  { threshold:  2000, pn:  1, emoji: '🍬', prize: 'Una chuchería' },
  { threshold:  5000, pn:  2, emoji: '🍭', prize: '2 chuches' },
  { threshold:  9000, pn:  3, emoji: '🃏', prize: 'Sobre de cromos' },
  { threshold: 14000, pn:  4, emoji: '🎉', prize: 'Chuches grandes' },
  { threshold: 20000, pn:  5, emoji: '⚽', prize: '2 sobres de cromos' },
  { threshold: 27000, pn:  6, emoji: '🌟', prize: 'Carta especial' },
  { threshold: 33000, pn:  7, emoji: '🎁', prize: 'Pack Chuches VIP' },
  { threshold: 38000, pn:  8, emoji: '👑', prize: 'Sobre dorado' },
  { threshold: 43000, pn:  9, emoji: '🏆', prize: 'Gran colección' },
  { threshold: 50000, pn: 10, emoji: '💎', prize: '¡PREMIO MÁXIMO!' },
];

// ──────────────── TIENDA DE NIEVES ────────────────
const SHOP_ITEMS = [
  { cost:  1, name: 'Una Chuchería',      emoji: '🍬', desc: '¡Cualquier chuchería del kiosco de Nieves!' },
  { cost:  2, name: 'Pack de Chuches',    emoji: '🍭', desc: '3 chuches a tu elección' },
  { cost:  3, name: 'Sobre de Cromos',    emoji: '🃏', desc: 'Sobre de 5 cromos del Mundial 2026' },
  { cost:  4, name: 'Chuches Grandes',    emoji: '🎉', desc: 'Las chuches grandes del mostrador' },
  { cost:  5, name: '2 Sobres de Cromos', emoji: '⚽', desc: 'Dos sobres de cromos del Mundial' },
  { cost:  6, name: 'Carta Especial',     emoji: '🌟', desc: 'Carta sorpresa de coleccionista' },
  { cost:  7, name: 'Pack Chuches VIP',   emoji: '🎁', desc: 'La caja especial de detrás del mostrador' },
  { cost:  8, name: 'Sobre Dorado',       emoji: '👑', desc: 'Sobre dorado con cromos raros' },
  { cost:  9, name: 'Gran Colección',     emoji: '🏆', desc: '3 sobres de cromos + carta especial' },
  { cost: 10, name: '¡PREMIO MÁXIMO!',    emoji: '💎', desc: '¡El mayor premio de la Liga! Solo para campeones totales de la semana' },
];

// ──────────────── UTILIDADES DE FECHA ────────────────
function getWeekStart() {
  const now = new Date();
  const day = now.getDay(); // 0=Dom, 1=Lun…
  const diff = day === 0 ? -6 : 1 - day; // días hasta el lunes
  const mon = new Date(now);
  mon.setDate(now.getDate() + diff);
  mon.setHours(0, 0, 0, 0);
  return mon.toISOString().split('T')[0];
}

function formatWeekLabel(weekStart) {
  const start = new Date(weekStart + 'T12:00:00');
  const end   = new Date(start);
  end.setDate(start.getDate() + 6);
  const MONTHS = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()}–${end.getDate()} ${MONTHS[end.getMonth()]} ${end.getFullYear()}`;
  }
  return `${start.getDate()} ${MONTHS[start.getMonth()]} – ${end.getDate()} ${MONTHS[end.getMonth()]}`;
}

// ──────────────── PERSISTENCIA ────────────────
const STORAGE_KEY = 'mundial2026_league_v2';

function loadLeague() {
  const weekStart = getWeekStart();
  let data = null;
  try { data = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch {}

  if (!data || data.weekStart !== weekStart) {
    // Nueva semana: resetear puntos semanales pero conservar saldo PN
    const oldData = data;
    data = { weekStart, playerData: {} };
    Object.keys(PROFILES).forEach(id => {
      const oldPD = oldData?.playerData?.[id];
      data.playerData[id] = {
        weekPts:    0,
        weekPN:     0,       // PN ganados esta semana (0-10)
        pnBalance:  oldPD?.pnBalance  ?? 0,  // saldo acumulado pendiente de canje
        pnEarned:   oldPD?.pnEarned   ?? 0,  // total PN ganados en la vida
        pnSpent:    oldPD?.pnSpent    ?? 0,  // total PN canjeados en la vida
        gamesPlayed: 0,
      };
    });
  }

  // Garantizar que todos los perfiles existen (si se añaden nuevos)
  Object.keys(PROFILES).forEach(id => {
    if (!data.playerData[id]) {
      data.playerData[id] = { weekPts:0, weekPN:0, pnBalance:0, pnEarned:0, pnSpent:0, gamesPlayed:0 };
    }
  });

  return data;
}

function saveLeague(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ──────────────── CÁLCULO PN ────────────────
function calcPNFromPts(weekPts) {
  let pn = 0;
  for (const step of PN_LADDER) {
    if (weekPts >= step.threshold) pn = step.pn; else break;
  }
  return pn;
}

/** Llama al final de cada partida con los dos jugadores y sus puntos */
function addGameScores(profileId0, pts0, profileId1, pts1) {
  const data = loadLeague();
  const notifications = []; // mensajes de "nuevo PN ganado"

  [[profileId0, pts0], [profileId1, pts1]].forEach(([id, pts]) => {
    if (!id || pts == null) return;
    const pd = data.playerData[id];
    const prevPN = pd.weekPN;
    pd.weekPts += pts;
    pd.gamesPlayed++;
    const newPN = Math.min(10, calcPNFromPts(pd.weekPts));
    const earned = newPN - prevPN;
    if (earned > 0) {
      pd.weekPN     = newPN;
      pd.pnBalance += earned;
      pd.pnEarned  += earned;
      notifications.push({ id, earned, total: newPN });
    }
  });

  saveLeague(data);
  return { data, notifications };
}

/** Canjear PN. Devuelve true si OK. */
function redeemPN(profileId, cost) {
  const data = loadLeague();
  const pd   = data.playerData[profileId];
  if (!pd || pd.pnBalance < cost) return false;
  pd.pnBalance -= cost;
  pd.pnSpent   += cost;
  saveLeague(data);
  return true;
}

// ──────────────── RENDER PANTALLA LIGA ────────────────

let _redeemProfile = null;
let _redeemCost    = null;
let _redeemName    = null;

function openLeagueScreen() {
  renderLeague();
  showScreen('screen-league');
}

function renderLeague() {
  const data = loadLeague();

  // Título semana
  document.getElementById('league-week').textContent = formatWeekLabel(data.weekStart);

  // ── Clasificación ──
  const allEntries = Object.entries(data.playerData);
  const sorted = [...allEntries].sort(([,a],[,b]) => b.weekPts - a.weekPts);

  const rankEl = document.getElementById('league-ranking');
  rankEl.innerHTML = '';

  const MEDALS = ['🥇','🥈','🥉','4️⃣','5️⃣'];

  sorted.forEach(([id, pd], pos) => {
    const p   = PROFILES[id];
    const pn  = calcPNFromPts(pd.weekPts);

    // Barra de progreso hacia el siguiente PN
    const prevStep = pn > 0 ? PN_LADDER.find(s => s.pn === pn) : null;
    const nextStep = PN_LADDER.find(s => s.pn === pn + 1);
    const prevPts  = prevStep?.threshold ?? 0;
    const nextPts  = nextStep?.threshold ?? PN_LADDER.at(-1).threshold;
    const pct = pn >= 10 ? 100
      : Math.round(((pd.weekPts - prevPts) / (nextPts - prevPts)) * 100);
    const ptsToNext = pn < 10 ? Math.max(0, nextPts - pd.weekPts) : 0;

    const card = document.createElement('div');
    card.className = 'rank-card' + (pos === 0 && pd.weekPts > 0 ? ' rank-leader' : '');
    card.innerHTML = `
      <div class="rank-pos">${MEDALS[pos] ?? ''}</div>
      <div class="rank-avatar">${p.emoji}</div>
      <div class="rank-body">
        <div class="rank-name">${p.name}
          <span class="rank-badge ${p.badgeClass}">${p.badge}</span>
        </div>
        <div class="rank-weekpts">${pd.weekPts.toLocaleString()} pts esta semana · ${pd.gamesPlayed} partidas</div>
        <div class="rank-bar-wrap">
          <div class="rank-bar-fill" style="width:${Math.min(100,Math.max(0,pct))}%"></div>
        </div>
        <div class="rank-bar-label">
          ${pn < 10
            ? `Próximo premio en ${ptsToNext.toLocaleString()} pts más → ${PN_LADDER.find(s=>s.pn===pn+1)?.emoji ?? ''} ⭐${pn+1}`
            : '¡Máximo de la semana alcanzado! 🏆'}
        </div>
      </div>
      <div class="rank-pn-box">
        <div class="rank-pn-num">${pd.pnBalance}</div>
        <div class="rank-pn-star">⭐</div>
        <div class="rank-pn-lbl">Nieves</div>
      </div>`;
    rankEl.appendChild(card);
  });

  // ── Escala de premios ──
  const maxPts = Math.max(...Object.values(data.playerData).map(d => d.weekPts), 0);
  const ladderEl = document.getElementById('pn-ladder-strip');
  ladderEl.innerHTML = '';
  PN_LADDER.forEach(step => {
    const reached = maxPts >= step.threshold;
    const div = document.createElement('div');
    div.className = 'ladder-node' + (reached ? ' ladder-reached' : '');
    div.innerHTML = `
      <div class="ln-emoji">${step.emoji}</div>
      <div class="ln-pn">⭐${step.pn}</div>
      <div class="ln-pts">${step.threshold >= 1000 ? (step.threshold/1000).toFixed(0)+'K' : step.threshold}</div>
      <div class="ln-prize">${step.prize}</div>`;
    ladderEl.appendChild(div);
  });

  // ── Tienda de Nieves ──
  renderShop(data);
}

function renderShop(data) {
  const shopEl = document.getElementById('league-shop');
  shopEl.innerHTML = '';

  // Mostrar jugadores con nombre fijo (Max, Martín) primero; después los demás
  const orderedIds = ['max','martin','papa','mama','invitado']
    .filter(id => data.playerData[id]);

  SHOP_ITEMS.forEach(item => {
    const playerBtns = orderedIds.map(id => {
      const pd  = data.playerData[id];
      const p   = PROFILES[id];
      const can = pd.pnBalance >= item.cost;
      return `<button class="shop-player-btn ${can ? 'can-afford' : 'cant-afford'}"
        onclick="confirmRedeem('${id}',${item.cost},'${item.name}')">
        ${p.emoji} <span>${p.name}</span>
        <span class="shop-btn-bal">(⭐${pd.pnBalance})</span>
      </button>`;
    }).join('');

    const itemEl = document.createElement('div');
    itemEl.className = 'shop-item';
    itemEl.innerHTML = `
      <div class="shop-left">
        <div class="shop-emoji">${item.emoji}</div>
        <div class="shop-cost-badge">⭐${item.cost}</div>
      </div>
      <div class="shop-mid">
        <div class="shop-name">${item.name}</div>
        <div class="shop-desc">${item.desc}</div>
      </div>
      <div class="shop-btns">${playerBtns}</div>`;
    shopEl.appendChild(itemEl);
  });
}

// ──────────────── CANJE (modal) ────────────────
function confirmRedeem(profileId, cost, itemName) {
  const data = loadLeague();
  const pd   = data.playerData[profileId];
  const p    = PROFILES[profileId];

  if (!pd || pd.pnBalance < cost) {
    showRedeemMsg(`❌ ${p.name} solo tiene ⭐${pd?.pnBalance ?? 0} (necesita ⭐${cost})`);
    return;
  }

  _redeemProfile = profileId;
  _redeemCost    = cost;
  _redeemName    = itemName;

  document.getElementById('redeem-avatar').textContent  = p.emoji;
  document.getElementById('redeem-player').textContent  = p.name;
  document.getElementById('redeem-item').textContent    = `${itemName}`;
  document.getElementById('redeem-cost').textContent    = `⭐${cost} Puntos Nieves`;
  document.getElementById('redeem-after').textContent   = `Te quedarán ⭐${pd.pnBalance - cost}`;
  document.getElementById('redeem-modal').classList.remove('hidden');
}

function confirmRedeemYes() {
  if (_redeemProfile === null) return;
  const ok = redeemPN(_redeemProfile, _redeemCost);
  document.getElementById('redeem-modal').classList.add('hidden');
  if (ok) {
    celebrate('¡CANJEADO! 🏪', '🍬');
    setTimeout(() => renderLeague(), 1300);
  }
  _redeemProfile = _redeemCost = _redeemName = null;
}

function cancelRedeem() {
  document.getElementById('redeem-modal').classList.add('hidden');
  _redeemProfile = _redeemCost = _redeemName = null;
}

function showRedeemMsg(msg) {
  const el = document.getElementById('redeem-toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 2500);
}
