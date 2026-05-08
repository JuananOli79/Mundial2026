// ============================================================
//  MOTOR DE SOPA DE LETRAS
// ============================================================

class WordSearchGenerator {
  constructor(size = 10) {
    this.size = size;
    this.grid = [];
    this.placed = []; // [{word, cells:[{r,c}]}]
    this._initGrid();
  }

  _initGrid() {
    this.grid = Array.from({ length: this.size }, () =>
      Array(this.size).fill('')
    );
    this.placed = [];
  }

  /** Coloca una palabra en el grid. Devuelve true si lo logró. */
  placeWord(word) {
    const w = word.toUpperCase().replace(/Ñ/g,'N').replace(/Á/g,'A')
                  .replace(/É/g,'E').replace(/Í/g,'I').replace(/Ó/g,'O')
                  .replace(/Ú/g,'U');

    // Direcciones: derecha, abajo, diagonal↘
    const dirs = [
      { dr: 0, dc: 1 },
      { dr: 1, dc: 0 },
      { dr: 1, dc: 1 }
    ];

    // Mezclar posiciones y direcciones para variedad
    const shuffledDirs = dirs.sort(() => Math.random() - 0.5);

    for (const dir of shuffledDirs) {
      const positions = this._validPositions(w, dir.dr, dir.dc);
      if (positions.length > 0) {
        const pos = positions[Math.floor(Math.random() * positions.length)];
        const cells = [];
        for (let i = 0; i < w.length; i++) {
          const r = pos.r + dir.dr * i;
          const c = pos.c + dir.dc * i;
          this.grid[r][c] = w[i];
          cells.push({ r, c });
        }
        this.placed.push({ word: w, originalWord: word, cells });
        return true;
      }
    }
    return false;
  }

  _validPositions(word, dr, dc) {
    const positions = [];
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this._canPlace(word, r, c, dr, dc)) {
          positions.push({ r, c });
        }
      }
    }
    return positions;
  }

  _canPlace(word, r, c, dr, dc) {
    for (let i = 0; i < word.length; i++) {
      const nr = r + dr * i;
      const nc = c + dc * i;
      if (nr < 0 || nr >= this.size || nc < 0 || nc >= this.size) return false;
      const existing = this.grid[nr][nc];
      if (existing !== '' && existing !== word[i]) return false;
    }
    return true;
  }

  /** Rellena las celdas vacías con letras aleatorias */
  fillRandom() {
    const letters = 'ABCDEFGHIJKLMNOPRSTUVZ'; // sin letras raras
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.grid[r][c] === '') {
          this.grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
  }

  /** Genera el puzzle completo con las palabras dadas */
  generate(words) {
    // Intentar distintos tamaños si no caben las palabras
    const maxWord = Math.max(...words.map(w => w.length));
    this.size = Math.max(10, maxWord + 2);
    this._initGrid();

    for (const word of words) {
      let placed = false;
      for (let attempt = 0; attempt < 50; attempt++) {
        if (this.placeWord(word)) { placed = true; break; }
      }
      if (!placed) console.warn('No se pudo colocar la palabra:', word);
    }
    this.fillRandom();
    return this;
  }

  /** Normaliza texto para comparar (quita acentos, mayúsculas) */
  normalize(str) {
    return str.toUpperCase()
      .replace(/Á/g,'A').replace(/É/g,'E').replace(/Í/g,'I')
      .replace(/Ó/g,'O').replace(/Ú/g,'U').replace(/Ñ/g,'N');
  }

  /** Comprueba si un conjunto de celdas forma alguna palabra */
  checkSelection(cells) {
    if (!cells || cells.length < 2) return null;

    // Construir la cadena seleccionada
    const str = cells.map(({ r, c }) => this.grid[r][c]).join('');
    const reversed = str.split('').reverse().join('');

    for (const p of this.placed) {
      if (p.cells.length !== cells.length) continue;
      const wordNorm = this.normalize(p.originalWord);
      if (str === wordNorm || reversed === wordNorm) {
        return p;
      }
    }
    return null;
  }
}

// ============================================================
//  COMPONENTE DE INTERFAZ DE SOPA DE LETRAS
// ============================================================

class WordSearchUI {
  constructor(puzzle, container, wordListEl, onFoundCb, onFinishedCb) {
    this.puzzle      = puzzle;
    this.container   = container;
    this.wordListEl  = wordListEl;
    this.onFound     = onFoundCb;
    this.onFinished  = onFinishedCb;

    this.foundWords  = new Set();
    this.selecting   = false;
    this.startCell   = null;
    this.selectedCells = [];
    this.cellEls     = []; // 2D array of DOM elements
  }

  render() {
    const size = this.puzzle.size;
    this.container.innerHTML = '';
    this.container.style.gridTemplateColumns = `repeat(${size}, 38px)`;
    this.cellEls = [];

    for (let r = 0; r < size; r++) {
      this.cellEls[r] = [];
      for (let c = 0; c < size; c++) {
        const cell = document.createElement('div');
        cell.className = 'ws-cell';
        cell.textContent = this.puzzle.grid[r][c];
        cell.dataset.r = r;
        cell.dataset.c = c;

        // Touch events
        cell.addEventListener('touchstart', (e) => {
          e.preventDefault();
          this._startSelect(r, c);
        }, { passive: false });

        cell.addEventListener('touchmove', (e) => {
          e.preventDefault();
          const touch = e.touches[0];
          const el = document.elementFromPoint(touch.clientX, touch.clientY);
          if (el && el.dataset.r !== undefined) {
            this._moveSelect(parseInt(el.dataset.r), parseInt(el.dataset.c));
          }
        }, { passive: false });

        cell.addEventListener('touchend', (e) => {
          e.preventDefault();
          this._endSelect();
        }, { passive: false });

        // Mouse events (for testing on desktop)
        cell.addEventListener('mousedown', () => this._startSelect(r, c));
        cell.addEventListener('mouseenter', () => { if (this.selecting) this._moveSelect(r, c); });
        cell.addEventListener('mouseup', () => this._endSelect());

        this.container.appendChild(cell);
        this.cellEls[r][c] = cell;
      }
    }

    // Render word list
    this.wordListEl.innerHTML = '';
    for (const p of this.puzzle.placed) {
      const chip = document.createElement('div');
      chip.className = 'ws-word-chip';
      chip.id = `chip-${p.word}`;
      chip.textContent = p.originalWord.toUpperCase();
      this.wordListEl.appendChild(chip);
    }
  }

  _startSelect(r, c) {
    this.selecting = true;
    this.startCell = { r, c };
    this.selectedCells = [{ r, c }];
    this._highlightSelected();
  }

  _moveSelect(r, c) {
    if (!this.selecting || !this.startCell) return;

    // Solo permitimos líneas rectas (horizontal, vertical, diagonal)
    const { r: sr, c: sc } = this.startCell;
    const dr = r - sr;
    const dc = c - sc;

    let cells = [];

    if (dr === 0 && dc !== 0) {
      // Horizontal
      const step = dc > 0 ? 1 : -1;
      for (let col = sc; col !== c + step; col += step) {
        cells.push({ r: sr, c: col });
      }
    } else if (dc === 0 && dr !== 0) {
      // Vertical
      const step = dr > 0 ? 1 : -1;
      for (let row = sr; row !== r + step; row += step) {
        cells.push({ r: row, c: sc });
      }
    } else if (Math.abs(dr) === Math.abs(dc) && dr !== 0) {
      // Diagonal
      const rStep = dr > 0 ? 1 : -1;
      const cStep = dc > 0 ? 1 : -1;
      let row = sr, col = sc;
      while (row !== r + rStep || col !== c + cStep) {
        cells.push({ r: row, c: col });
        row += rStep;
        col += cStep;
      }
    } else {
      // Movimiento no válido, solo mostrar celda inicial
      cells = [{ r: sr, c: sc }];
    }

    this.selectedCells = cells;
    this._highlightSelected();
  }

  _endSelect() {
    if (!this.selecting) return;
    this.selecting = false;

    const found = this.puzzle.checkSelection(this.selectedCells);

    if (found && !this.foundWords.has(found.word)) {
      this.foundWords.add(found.word);
      // Marcar celdas como encontradas
      for (const { r, c } of found.cells) {
        this.cellEls[r][c].classList.add('found-cell');
        this.cellEls[r][c].classList.remove('selected');
      }
      // Marcar chip
      const chip = document.getElementById(`chip-${found.word}`);
      if (chip) chip.classList.add('found');

      if (this.onFound) this.onFound(found.word);

      // ¿Terminó?
      if (this.foundWords.size === this.puzzle.placed.length) {
        if (this.onFinished) this.onFinished();
      }
    } else {
      // Quitar selección
      this._clearSelected();
    }
  }

  _highlightSelected() {
    // Limpiar todo primero
    this._clearSelected();
    for (const { r, c } of this.selectedCells) {
      if (this.cellEls[r] && this.cellEls[r][c]) {
        this.cellEls[r][c].classList.add('selected');
      }
    }
  }

  _clearSelected() {
    for (let r = 0; r < this.puzzle.size; r++) {
      for (let c = 0; c < this.puzzle.size; c++) {
        if (this.cellEls[r] && this.cellEls[r][c]) {
          this.cellEls[r][c].classList.remove('selected');
        }
      }
    }
  }
}
