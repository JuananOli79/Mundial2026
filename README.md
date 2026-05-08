# 🏆 Mundial 2026 Quiz — Max vs Martín

Quiz interactivo de fútbol con más de **110 preguntas y minijuegos** sobre el Mundial 2026.

## 🎮 Modos de juego

| Modo | Descripción | Tiempo |
|------|-------------|--------|
| ❓ **Tipo Test** | 4 opciones estilo "¿Quién quiere ser millonario?" | 30 seg |
| ✅ **Verdadero/Falso** | Respuesta rápida | 15 seg |
| ✏️ **Completa la frase** | Toca las letras para formar la respuesta | 25 seg |
| 🔤 **Anagrama** | Ordena las letras para descubrir la palabra | 25 seg |
| 🔍 **Sopa de letras** | Encuentra palabras ocultas en la cuadrícula | 60 seg |

## 🌟 Características

- **Max vs Martín** — Juego por turnos en el mismo iPad
- **110+ preguntas** sobre el Mundial 2026, historia del fútbol, jugadores, estadios y reglas
- **Puntuación dinámica** — Más puntos cuanto más rápido respondas
- **Diseño para iPad** — Botones grandes, táctil y sin ratón
- **Animaciones** — Celebraciones y feedback visual

---

## 🚀 Cómo publicar en GitHub Pages

### Paso 1 — Crear repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en **"New repository"** (botón verde)
3. Nombre: `mundial2026` (o el que quieras)
4. Marca **"Public"**
5. Haz clic en **"Create repository"**

### Paso 2 — Subir los archivos

Opción A — Desde el navegador (más fácil):
1. En tu nuevo repositorio, haz clic en **"uploading an existing file"**
2. Arrastra toda la carpeta `mundial2026/` al área de subida
3. Escribe un mensaje como `"Primera versión"` y haz clic en **"Commit changes"**

Opción B — Con Git (terminal):
```bash
cd mundial2026
git init
git add .
git commit -m "Primera versión del quiz"
git remote add origin https://github.com/TU_USUARIO/mundial2026.git
git push -u origin main
```

### Paso 3 — Activar GitHub Pages

1. En tu repositorio, ve a **Settings** → **Pages** (menú izquierdo)
2. En **"Source"**, selecciona **"Deploy from a branch"**
3. Branch: **main**, carpeta: **/ (root)**
4. Haz clic en **Save**
5. Espera 1-2 minutos

### Paso 4 — ¡A jugar!

Tu quiz estará disponible en:
```
https://TU_USUARIO.github.io/mundial2026/
```

Abre esa URL en el iPad con Safari. Para la mejor experiencia:
- Toca el botón **Compartir** (📤) → **"Añadir a pantalla de inicio"**
- ¡Ahora funciona como una app nativa!

---

## 📁 Estructura del proyecto

```
mundial2026/
├── index.html          ← Estructura de la app
├── css/
│   └── style.css       ← Estilos (tema fútbol)
├── js/
│   ├── questions.js    ← Banco de preguntas (110+)
│   ├── wordsearch.js   ← Motor de sopa de letras
│   └── app.js          ← Lógica del juego
└── README.md           ← Este archivo
```

---

## ➕ Añadir más preguntas

Edita `js/questions.js` para añadir preguntas en cualquier categoría:

```javascript
// Añadir una pregunta tipo test:
{
  q: "¿Tu pregunta aquí?",
  opts: ["Opción A", "Opción B", "Opción C", "Opción D"],
  a: 0,              // índice de la respuesta correcta (0-3)
  cat: "🌍 Mundial 2026",
  explain: "Explicación para aprender.",
  pts: 800
}

// Añadir verdadero/falso:
{
  q: "¿Afirmación verdadera o falsa?",
  a: true,           // true o false
  cat: "🏆 Historia",
  explain: "Explicación.",
  pts: 500
}
```
