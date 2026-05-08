// ============================================================
//  MUNDIAL 2026 QUIZ - BANCO DE PREGUNTAS (110+ preguntas)
// ============================================================

const QUESTIONS = {

  // ──────────────────────────────────────────────────────────
  //  TIPO TEST  (4 opciones)  – 65 preguntas
  // ──────────────────────────────────────────────────────────
  quiz: [
    // --- MUNDIAL 2026 ---
    {
      q: "¿En qué países se celebrará el Mundial 2026?",
      opts: ["Brasil, Argentina y Uruguay", "Estados Unidos, Canadá y México", "España, Portugal y Marruecos", "Alemania, Austria y Suiza"],
      a: 1,
      cat: "🌍 Mundial 2026",
      explain: "¡El Mundial 2026 es el primero organizado por 3 países a la vez! EE.UU., Canadá y México.",
      pts: 800
    },
    {
      q: "¿Cuántos equipos participarán en el Mundial 2026?",
      opts: ["32 equipos", "36 equipos", "48 equipos", "24 equipos"],
      a: 2,
      cat: "🌍 Mundial 2026",
      explain: "¡48 equipos! Es la primera vez que el Mundial amplía de 32 a 48 participantes.",
      pts: 800
    },
    {
      q: "¿En qué estadio se jugará la gran final del Mundial 2026?",
      opts: ["Estadio Azteca", "SoFi Stadium (LA)", "MetLife Stadium (Nueva York)", "AT&T Stadium (Dallas)"],
      a: 2,
      cat: "🏟️ Estadios",
      explain: "¡La final será en el MetLife Stadium, cerca de Nueva York, con capacidad para más de 82.000 personas!",
      pts: 1000
    },
    {
      q: "¿En cuántos grupos se dividirán los 48 equipos del Mundial 2026?",
      opts: ["8 grupos de 6", "12 grupos de 4", "16 grupos de 3", "6 grupos de 8"],
      a: 1,
      cat: "🌍 Mundial 2026",
      explain: "Habrá 12 grupos de 4 equipos. Los 2 primeros de cada grupo pasan a la siguiente ronda.",
      pts: 1000
    },
    {
      q: "¿Cuántos estadios de EEUU acogerán partidos del Mundial 2026?",
      opts: ["8 estadios", "9 estadios", "11 estadios", "14 estadios"],
      a: 2,
      cat: "🌍 Mundial 2026",
      explain: "¡11 estadios en EEUU! Además hay 3 en México y 2 en Canadá.",
      pts: 1000
    },
    {
      q: "¿En qué ciudad de México está el famoso Estadio Azteca?",
      opts: ["Guadalajara", "Monterrey", "Ciudad de México", "Tijuana"],
      a: 2,
      cat: "🏟️ Estadios",
      explain: "El Estadio Azteca está en Ciudad de México. ¡Ha acogido dos finales del Mundial: 1970 y 1986!",
      pts: 600
    },
    {
      q: "¿Qué ciudad canadiense tiene estadio en el Mundial 2026?",
      opts: ["Montreal y Ottawa", "Vancouver y Toronto", "Calgary y Quebec", "Edmonton y Winnipeg"],
      a: 1,
      cat: "🌍 Mundial 2026",
      explain: "Canadá aportará Vancouver (BC Place) y Toronto al Mundial 2026.",
      pts: 800
    },
    {
      q: "¿Cuántos partidos se jugarán en total en el Mundial 2026?",
      opts: ["64 partidos", "80 partidos", "96 partidos", "104 partidos"],
      a: 3,
      cat: "🌍 Mundial 2026",
      explain: "¡104 partidos! Muchos más que los 64 del Mundial 2022 en Qatar.",
      pts: 1000
    },

    // --- HISTORIA DEL MUNDIAL ---
    {
      q: "¿Qué país ganó el Mundial 2022 en Qatar?",
      opts: ["Francia", "Argentina", "Brasil", "Croacia"],
      a: 1,
      cat: "🏆 Historia",
      explain: "¡Argentina campeona del mundo en Qatar 2022! Ganaron a Francia en la final por penaltis.",
      pts: 600
    },
    {
      q: "¿En qué año se celebró el primer Campeonato del Mundo de fútbol?",
      opts: ["1926", "1930", "1934", "1938"],
      a: 1,
      cat: "🏆 Historia",
      explain: "El primer Mundial fue en 1930, organizado por Uruguay. ¡Y Uruguay también ganó!",
      pts: 800
    },
    {
      q: "¿Qué país ha ganado MÁS Mundiales en la historia?",
      opts: ["Alemania", "Italia", "Brasil", "Argentina"],
      a: 2,
      cat: "🏆 Historia",
      explain: "¡Brasil con 5 Mundiales! 1958, 1962, 1970, 1994 y 2002. ¡Los campeones de campeones!",
      pts: 600
    },
    {
      q: "¿Cuántos Mundiales ha ganado Argentina?",
      opts: ["1", "2", "3", "4"],
      a: 2,
      cat: "🏆 Historia",
      explain: "Argentina ha ganado 3 Mundiales: 1978 (Argentina), 1986 (México) y 2022 (Qatar).",
      pts: 800
    },
    {
      q: "¿En qué año ganó España su único Mundial?",
      opts: ["2006", "2010", "2014", "2018"],
      a: 1,
      cat: "🏆 Historia",
      explain: "España ganó el Mundial 2010 en Sudáfrica. ¡Iniesta marcó el gol en la prórroga!",
      pts: 600
    },
    {
      q: "¿Contra qué país jugó España la final del Mundial 2010?",
      opts: ["Brasil", "Alemania", "Países Bajos (Holanda)", "Uruguay"],
      a: 2,
      cat: "🏆 Historia",
      explain: "España ganó 1-0 a los Países Bajos (Holanda) con el gol de Iniesta en la prórroga.",
      pts: 800
    },
    {
      q: "¿Qué jugador marcó el gol de la victoria para España en la final de 2010?",
      opts: ["David Villa", "Fernando Torres", "Andrés Iniesta", "Xavi Hernández"],
      a: 2,
      cat: "🏆 Historia",
      explain: "¡Iniesta marcó en el minuto 116 de la prórroga! Fue una de las finales más emocionantes.",
      pts: 800
    },
    {
      q: "¿Dónde se celebró el Mundial 2022?",
      opts: ["Arabia Saudí", "Emiratos Árabes", "Qatar", "Baréin"],
      a: 2,
      cat: "🏆 Historia",
      explain: "Qatar 2022 fue el primer Mundial en un país árabe y el primero en invierno (noviembre-diciembre).",
      pts: 600
    },
    {
      q: "¿Quién ganó el primer Mundial de fútbol en 1930?",
      opts: ["Brasil", "Argentina", "Uruguay", "Italia"],
      a: 2,
      cat: "🏆 Historia",
      explain: "¡Uruguay ganó el primer Mundial en su propio país! Ganaron la final a Argentina 4-2.",
      pts: 800
    },
    {
      q: "¿En qué año y dónde ganó Brasil su primer Mundial?",
      opts: ["1950 en Brasil", "1958 en Suecia", "1962 en Chile", "1966 en Inglaterra"],
      a: 1,
      cat: "🏆 Historia",
      explain: "Brasil ganó su primer Mundial en 1958 en Suecia. ¡Un joven Pelé solo tenía 17 años!",
      pts: 1000
    },
    {
      q: "¿Cuántos Mundiales ganó Pelé durante su carrera?",
      opts: ["1", "2", "3", "4"],
      a: 2,
      cat: "⭐ Jugadores",
      explain: "¡Pelé ganó 3 Mundiales con Brasil! En 1958, 1962 y 1970. ¡El único en hacerlo!",
      pts: 800
    },
    {
      q: "¿Qué jugador marcó el famoso gol llamado 'La Mano de Dios'?",
      opts: ["Pelé", "Diego Maradona", "Ronaldo", "Zidane"],
      a: 1,
      cat: "🏆 Historia",
      explain: "Maradona marcó con la mano en el Mundial 1986 contra Inglaterra y dijo que fue 'la mano de Dios'.",
      pts: 600
    },
    {
      q: "¿En qué Mundial fue el famoso gol de 'La Mano de Dios'?",
      opts: ["España 1982", "México 1986", "Italia 1990", "USA 1994"],
      a: 1,
      cat: "🏆 Historia",
      explain: "Fue en México 1986, en los cuartos de final entre Argentina e Inglaterra.",
      pts: 800
    },
    {
      q: "¿Qué país organizó el Mundial 2014?",
      opts: ["Argentina", "Colombia", "Brasil", "Chile"],
      a: 2,
      cat: "🏆 Historia",
      explain: "Brasil organizó el Mundial 2014. ¡Alemania les ganó 7-1 en semifinales! El famoso 'Mineirazo'.",
      pts: 600
    },
    {
      q: "¿Qué país ganó el Mundial 2014 en Brasil?",
      opts: ["Brasil", "Argentina", "Alemania", "Francia"],
      a: 2,
      cat: "🏆 Historia",
      explain: "¡Alemania ganó el Mundial 2014! Gobernó a Argentina 1-0 en la final con gol de Götze.",
      pts: 600
    },
    {
      q: "¿Qué país ganó el Mundial 2018 en Rusia?",
      opts: ["Croacia", "Francia", "Bélgica", "Brasil"],
      a: 1,
      cat: "🏆 Historia",
      explain: "¡Francia campeón en 2018! Ganó la final a Croacia 4-2. Mbappé marcó con solo 19 años.",
      pts: 600
    },
    {
      q: "¿Qué mundial se llamó el 'Mineirazo' por la goleada de Alemania a Brasil?",
      opts: ["Mundial 2010", "Mundial 2014", "Mundial 2018", "Mundial 2022"],
      a: 1,
      cat: "🏆 Historia",
      explain: "En el Estadio Mineirão de Brasil, Alemania ganó 7-1 a Brasil en semifinales del Mundial 2014.",
      pts: 1000
    },

    // --- JUGADORES ---
    {
      q: "¿De qué país es la estrella Lionel Messi?",
      opts: ["Brasil", "Uruguay", "Argentina", "Chile"],
      a: 2,
      cat: "⭐ Jugadores",
      explain: "¡Messi es argentino! Nació en Rosario y es considerado uno de los mejores jugadores de la historia.",
      pts: 400
    },
    {
      q: "¿De qué país es Kylian Mbappé?",
      opts: ["Bélgica", "Senegal", "Argelia", "Francia"],
      a: 3,
      cat: "⭐ Jugadores",
      explain: "¡Mbappé es francés! Fue el goleador del Mundial 2022 con 8 goles. ¡Un crack total!",
      pts: 400
    },
    {
      q: "¿Cuántos goles marcó Mbappé en el Mundial 2022?",
      opts: ["5", "6", "7", "8"],
      a: 3,
      cat: "⭐ Jugadores",
      explain: "¡Mbappé marcó 8 goles en Qatar 2022! ¡Incluyendo un hat-trick en la final contra Argentina!",
      pts: 800
    },
    {
      q: "¿Quién es el máximo goleador de todos los Mundiales de la historia?",
      opts: ["Pelé", "Ronaldo (Brasil)", "Miroslav Klose", "Just Fontaine"],
      a: 2,
      cat: "⭐ Jugadores",
      explain: "Miroslav Klose (Alemania) marcó 16 goles en 4 Mundiales (2002, 2006, 2010, 2014). ¡El mejor!",
      pts: 1000
    },
    {
      q: "¿Cuántos goles marcó Messi en el Mundial 2022?",
      opts: ["5", "7", "9", "11"],
      a: 1,
      cat: "⭐ Jugadores",
      explain: "¡Messi marcó 7 goles en Qatar 2022 y ganó el Balón de Oro del torneo!",
      pts: 800
    },
    {
      q: "¿Qué apodo tiene Cristiano Ronaldo?",
      opts: ["El Fenómeno", "CR7", "La Pulga", "El Bicho"],
      a: 1,
      cat: "⭐ Jugadores",
      explain: "CR7 = Cristiano Ronaldo + el número 7, su dorsal favorito. ¡Uno de los mejores de la historia!",
      pts: 400
    },
    {
      q: "¿Qué apodo tiene Messi?",
      opts: ["CR7", "El Fenómeno", "La Pulga", "El Matador"],
      a: 2,
      cat: "⭐ Jugadores",
      explain: "Messi es 'La Pulga' porque mide 1,70m, ¡pero es imposible de parar en el campo!",
      pts: 400
    },
    {
      q: "¿En qué equipo de clubes juega Vinicius Jr.?",
      opts: ["Barcelona", "PSG", "Real Madrid", "Manchester City"],
      a: 2,
      cat: "⭐ Jugadores",
      explain: "¡Vinicius Jr. es del Real Madrid! El delantero brasileño es uno de los mejores del mundo.",
      pts: 600
    },
    {
      q: "¿De qué país es el delantero Erling Haaland?",
      opts: ["Suecia", "Dinamarca", "Noruega", "Finlandia"],
      a: 2,
      cat: "⭐ Jugadores",
      explain: "¡Haaland es noruego! Juega en el Manchester City y es una máquina de marcar goles.",
      pts: 600
    },
    {
      q: "¿Qué jugador inglés juega en el Real Madrid?",
      opts: ["Marcus Rashford", "Phil Foden", "Jude Bellingham", "Bukayo Saka"],
      a: 2,
      cat: "⭐ Jugadores",
      explain: "¡Jude Bellingham fichó por el Real Madrid y se convirtió en uno de sus mejores jugadores!",
      pts: 600
    },
    {
      q: "¿Cuántos Balones de Oro ha ganado Messi hasta 2024?",
      opts: ["5", "6", "7", "8"],
      a: 3,
      cat: "⭐ Jugadores",
      explain: "¡Messi ha ganado 8 Balones de Oro! Es el jugador con más premios de la historia.",
      pts: 1000
    },
    {
      q: "¿Qué camiseta lleva Messi en Argentina?",
      opts: ["Número 9", "Número 10", "Número 7", "Número 11"],
      a: 1,
      cat: "⭐ Jugadores",
      explain: "¡El 10 es el número más famoso del fútbol! Maradona también llevó el 10 en Argentina.",
      pts: 400
    },
    {
      q: "¿En qué equipo juega Lamine Yamal, la joven estrella española?",
      opts: ["Real Madrid", "Atlético de Madrid", "Barcelona", "Sevilla"],
      a: 2,
      cat: "⭐ Jugadores",
      explain: "¡Lamine Yamal juega en el Barcelona! Debutó en la selección española siendo muy joven.",
      pts: 600
    },

    // --- SELECCIONES ---
    {
      q: "¿Cómo se llama el apodo de la selección de Brasil?",
      opts: ["Los Cariocas", "La Canarinha", "Os Guerreiros", "La Verde-Amarela"],
      a: 1,
      cat: "🌐 Selecciones",
      explain: "¡La Canarinha (el canario)! Por el amarillo de su famosa camiseta.",
      pts: 600
    },
    {
      q: "¿Cuál es el apodo de la selección de España?",
      opts: ["Los Toros", "La Armada", "La Furia Roja", "Los Ibéricos"],
      a: 2,
      cat: "🌐 Selecciones",
      explain: "¡La Furia Roja! Por su camiseta roja y el espíritu combativo del equipo.",
      pts: 400
    },
    {
      q: "¿Qué colores lleva la selección de Argentina?",
      opts: ["Rojo y azul", "Azul y blanco", "Verde y blanco", "Amarillo y verde"],
      a: 1,
      cat: "🌐 Selecciones",
      explain: "¡Azul y blanco! Por eso les llaman 'La Albiceleste' (albo=blanco, celeste=azul claro).",
      pts: 400
    },
    {
      q: "¿Cómo se llama la selección de Alemania?",
      opts: ["Die Roten", "Die Mannschaft", "Die Adler", "Die Blau"],
      a: 1,
      cat: "🌐 Selecciones",
      explain: "¡Die Mannschaft significa 'El Equipo' en alemán! Es el apodo oficial de la selección alemana.",
      pts: 600
    },
    {
      q: "¿Qué colores son los de la selección de Italia?",
      opts: ["Rojo y verde", "Azul marino", "Amarillo y azul", "Verde y blanco"],
      a: 1,
      cat: "🌐 Selecciones",
      explain: "¡Italia juega de azul marino! Por eso les llaman 'Gli Azzurri' (Los Azules).",
      pts: 400
    },
    {
      q: "¿Cuántos Mundiales ha ganado Alemania?",
      opts: ["2", "3", "4", "5"],
      a: 2,
      cat: "🌐 Selecciones",
      explain: "¡Alemania ha ganado 4 Mundiales! En 1954, 1974, 1990 y 2014.",
      pts: 600
    },
    {
      q: "¿Cuántos Mundiales ha ganado Italia?",
      opts: ["2", "3", "4", "5"],
      a: 2,
      cat: "🌐 Selecciones",
      explain: "¡Italia también tiene 4 Mundiales! 1934, 1938, 1982 y 2006.",
      pts: 600
    },
    {
      q: "¿Cuántos Mundiales ha ganado Francia?",
      opts: ["1", "2", "3", "4"],
      a: 1,
      cat: "🌐 Selecciones",
      explain: "Francia ha ganado 2 Mundiales: el primero en 1998 (en casa) y el segundo en 2018 en Rusia.",
      pts: 600
    },
    {
      q: "¿Cómo se llama la camiseta tradicional de Argentina?",
      opts: ["La Tricolor", "La Celeste", "La Albiceleste", "La Azulgrana"],
      a: 2,
      cat: "🌐 Selecciones",
      explain: "'Albiceleste' viene de 'albo' (blanco) y 'celeste' (azul claro). ¡La camiseta más famosa del mundo!",
      pts: 800
    },
    {
      q: "¿Qué selección africana llegó más lejos en un Mundial? (cuartos de final en 2002)",
      opts: ["Nigeria", "Senegal", "Costa de Marfil", "Camerún"],
      a: 1,
      cat: "🌐 Selecciones",
      explain: "¡Senegal llegó a cuartos de final en el Mundial 2002! Fue un resultado histórico para África.",
      pts: 1000
    },
    {
      q: "¿Qué selección africana llegó a semifinales del Mundial 2022?",
      opts: ["Nigeria", "Senegal", "Marruecos", "Ghana"],
      a: 2,
      cat: "🌐 Selecciones",
      explain: "¡Marruecos llegó a semifinales del Mundial 2022! Fue el primer equipo africano en lograrlo.",
      pts: 800
    },

    // --- ESTADIOS Y SEDES ---
    {
      q: "¿En qué ciudad estadounidense está el SoFi Stadium, sede del Mundial 2026?",
      opts: ["Nueva York", "Miami", "Los Ángeles", "Dallas"],
      a: 2,
      cat: "🏟️ Estadios",
      explain: "¡El SoFi Stadium está en Los Ángeles! Es el hogar de los equipos de fútbol americano Rams y Chargers.",
      pts: 800
    },
    {
      q: "¿Cuántos Mundiales ya ha organizado México antes del 2026?",
      opts: ["0", "1", "2", "3"],
      a: 2,
      cat: "🏟️ Estadios",
      explain: "¡México organizó 2 Mundiales antes: 1970 y 1986! Y en 2026 será el tercero. ¡Único en el mundo!",
      pts: 800
    },
    {
      q: "¿Qué estadio mexicano jugará el Mundial por tercera vez en 2026?",
      opts: ["Estadio Azteca", "Estadio Akron", "Estadio BBVA", "Estadio Corona"],
      a: 0,
      cat: "🏟️ Estadios",
      explain: "¡El Estadio Azteca! Será el único estadio en acoger partidos de 3 Mundiales diferentes.",
      pts: 1000
    },
    {
      q: "¿En qué ciudad de México está el Estadio Akron?",
      opts: ["Ciudad de México", "Monterrey", "Guadalajara", "Puebla"],
      a: 2,
      cat: "🏟️ Estadios",
      explain: "¡El Estadio Akron está en Guadalajara! Es el estadio del Club Deportivo Guadalajara (Chivas).",
      pts: 800
    },

    // --- REGLAS DEL FÚTBOL ---
    {
      q: "¿Cuántos jugadores puede tener cada equipo en el campo?",
      opts: ["9 jugadores", "10 jugadores", "11 jugadores", "12 jugadores"],
      a: 2,
      cat: "📋 Reglas",
      explain: "¡11 jugadores por equipo! Incluyendo el portero. Si bajan de 7 el árbitro puede suspender el partido.",
      pts: 200
    },
    {
      q: "¿Cuánto dura un partido de fútbol normal?",
      opts: ["80 minutos", "90 minutos", "100 minutos", "120 minutos"],
      a: 1,
      cat: "📋 Reglas",
      explain: "¡90 minutos! Divididos en dos tiempos de 45 minutos. Si hay empate puede haber prórroga.",
      pts: 200
    },
    {
      q: "¿Cuánto dura la prórroga si hay empate en eliminatorias?",
      opts: ["15 minutos", "20 minutos", "30 minutos", "45 minutos"],
      a: 2,
      cat: "📋 Reglas",
      explain: "¡30 minutos de prórroga! Dos periodos de 15 minutos. Si sigue el empate, ¡hay penaltis!",
      pts: 400
    },
    {
      q: "¿Cuántos penaltis lanza cada equipo en la tanda de penaltis?",
      opts: ["3", "4", "5", "6"],
      a: 2,
      cat: "📋 Reglas",
      explain: "¡5 penaltis por equipo! Si siguen empatados continúan de 1 en 1 hasta que uno falle.",
      pts: 400
    },
    {
      q: "¿Desde qué distancia se lanza un penalti?",
      opts: ["9 metros", "11 metros", "13 metros", "16 metros"],
      a: 1,
      cat: "📋 Reglas",
      explain: "¡El punto de penalti está a 11 metros de la portería! También se llama 'los once metros'.",
      pts: 400
    },
    {
      q: "¿Qué es un 'Hat-trick' en fútbol?",
      opts: ["Un gol con la cabeza", "Tres goles en el mismo partido", "Un penalti fallado", "Una falta directa"],
      a: 1,
      cat: "📋 Reglas",
      explain: "¡Hat-trick = 3 goles en el mismo partido por el mismo jugador! Es algo muy especial.",
      pts: 400
    },
    {
      q: "¿Cuántas tarjetas amarillas suponen la expulsión de un jugador?",
      opts: ["1", "2", "3", "4"],
      a: 1,
      cat: "📋 Reglas",
      explain: "¡2 tarjetas amarillas = expulsión! El árbitro enseña la segunda amarilla y luego la roja.",
      pts: 200
    },
    {
      q: "¿Qué regla es el 'fuera de juego' o 'offside'?",
      opts: ["Cuando el balón sale por la línea de fondo", "Cuando un atacante está más adelante que el último defensa al recibir", "Cuando el portero toca el balón fuera del área", "Cuando un jugador hace falta por detrás"],
      a: 1,
      cat: "📋 Reglas",
      explain: "¡Fuera de juego! Cuando recibes el pase hay que tener al menos un defensa por delante (además del portero).",
      pts: 600
    },

    // --- RÉCORDS Y CURIOSIDADES ---
    {
      q: "¿En qué Mundial se marcaron más goles por partido de media?",
      opts: ["1930 en Uruguay", "1954 en Suiza", "1970 en México", "1998 en Francia"],
      a: 1,
      cat: "📊 Récords",
      explain: "¡El Mundial 1954 en Suiza! Se marcaron 5,38 goles por partido de media. ¡Una locura!",
      pts: 1000
    },
    {
      q: "¿Qué jugador marcó más goles en un único Mundial (13 goles en 1958)?",
      opts: ["Pelé", "Just Fontaine", "Eusébio", "Gerd Müller"],
      a: 1,
      cat: "📊 Récords",
      explain: "¡Just Fontaine (Francia) marcó 13 goles en el Mundial 1958! Es el récord absoluto de goles en un solo Mundial.",
      pts: 1000
    },
    {
      q: "¿Cuál es el marcador más abultado de la historia del Mundial?",
      opts: ["10-0", "12-0", "14-0", "17-0"],
      a: 1,
      cat: "📊 Récords",
      explain: "¡12-0! Fue el resultado de Hungría 10-1 El Salvador en 1982... y también Australia 31 - American Samoa en clasificación.",
      pts: 1000
    },
    {
      q: "¿Qué jugador ganó el Balón de Oro del Mundial 2022?",
      opts: ["Kylian Mbappé", "Lionel Messi", "Julián Álvarez", "Lautaro Martínez"],
      a: 1,
      cat: "⭐ Jugadores",
      explain: "¡Messi ganó el Balón de Oro del Mundial 2022! Fue el mejor jugador del torneo.",
      pts: 600
    },
    {
      q: "¿Qué jugador ganó la Bota de Oro (máximo goleador) del Mundial 2022?",
      opts: ["Lionel Messi", "Julián Álvarez", "Kylian Mbappé", "Olivier Giroud"],
      a: 2,
      cat: "⭐ Jugadores",
      explain: "¡Mbappé ganó la Bota de Oro con 8 goles en Qatar 2022! A pesar de que Francia no ganó el Mundial.",
      pts: 800
    }
  ],

  // ──────────────────────────────────────────────────────────
  //  VERDADERO / FALSO  – 25 preguntas
  // ──────────────────────────────────────────────────────────
  trueFalse: [
    {
      q: "El Mundial 2026 se celebrará solo en Estados Unidos.",
      a: false,
      cat: "🌍 Mundial 2026",
      explain: "¡FALSO! El Mundial 2026 lo organizan tres países: Estados Unidos, Canadá y México.",
      pts: 500
    },
    {
      q: "Brasil ha ganado 5 Mundiales, más que ningún otro país.",
      a: true,
      cat: "🏆 Historia",
      explain: "¡VERDADERO! Brasil es el único campeón del mundo 5 veces: 1958, 1962, 1970, 1994 y 2002.",
      pts: 500
    },
    {
      q: "La final del Mundial 2026 se jugará en el Estadio Azteca de México.",
      a: false,
      cat: "🌍 Mundial 2026",
      explain: "¡FALSO! La final será en el MetLife Stadium, cerca de Nueva York, en Estados Unidos.",
      pts: 600
    },
    {
      q: "Argentina ganó el Mundial 2022 en Qatar.",
      a: true,
      cat: "🏆 Historia",
      explain: "¡VERDADERO! Argentina ganó a Francia en los penaltis. ¡Messi levantó al fin la Copa del Mundo!",
      pts: 400
    },
    {
      q: "Messi es de Brasil.",
      a: false,
      cat: "⭐ Jugadores",
      explain: "¡FALSO! Messi es argentino. Nació en Rosario, Argentina.",
      pts: 300
    },
    {
      q: "El Mundial 2026 tendrá 32 equipos como siempre.",
      a: false,
      cat: "🌍 Mundial 2026",
      explain: "¡FALSO! El Mundial 2026 amplía a 48 equipos por primera vez en la historia.",
      pts: 500
    },
    {
      q: "Pelé ganó 3 Mundiales con Brasil.",
      a: true,
      cat: "⭐ Jugadores",
      explain: "¡VERDADERO! Pelé ganó el Mundial en 1958, 1962 y 1970. ¡El único jugador en ganar tres!",
      pts: 600
    },
    {
      q: "España ganó su primer Mundial en 2006.",
      a: false,
      cat: "🏆 Historia",
      explain: "¡FALSO! España ganó su único Mundial en 2010 en Sudáfrica, no en 2006.",
      pts: 500
    },
    {
      q: "Un partido de fútbol dura 90 minutos.",
      a: true,
      cat: "📋 Reglas",
      explain: "¡VERDADERO! Dos partes de 45 minutos cada una.",
      pts: 300
    },
    {
      q: "El Estadio Azteca ha organizado la final del Mundial dos veces.",
      a: true,
      cat: "🏟️ Estadios",
      explain: "¡VERDADERO! En 1970 (Brasil vs Italia) y en 1986 (Argentina vs Alemania). ¡Único estadio del mundo!",
      pts: 800
    },
    {
      q: "Mbappé marcó un hat-trick en la final del Mundial 2022.",
      a: true,
      cat: "⭐ Jugadores",
      explain: "¡VERDADERO! Mbappé marcó 3 goles en la final contra Argentina, ¡pero aun así Francia perdió!",
      pts: 700
    },
    {
      q: "El portero puede coger el balón con las manos en cualquier parte del campo.",
      a: false,
      cat: "📋 Reglas",
      explain: "¡FALSO! El portero solo puede coger el balón con las manos dentro de su propia área.",
      pts: 400
    },
    {
      q: "Miroslav Klose tiene el récord de más goles en Mundiales con 16.",
      a: true,
      cat: "⭐ Jugadores",
      explain: "¡VERDADERO! Klose marcó 16 goles en los Mundiales de 2002, 2006, 2010 y 2014.",
      pts: 700
    },
    {
      q: "El Mundial 1930 fue ganado por Argentina.",
      a: false,
      cat: "🏆 Historia",
      explain: "¡FALSO! El primer Mundial de 1930 lo ganó Uruguay en su propio país.",
      pts: 600
    },
    {
      q: "El VAR (videoarbitraje) se usó por primera vez en el Mundial 2018.",
      a: true,
      cat: "📋 Reglas",
      explain: "¡VERDADERO! El VAR debutó en el Mundial 2018 en Rusia. Permite revisar jugadas polémicas en vídeo.",
      pts: 700
    },
    {
      q: "Maradona marcó 'La Mano de Dios' contra Brasil.",
      a: false,
      cat: "🏆 Historia",
      explain: "¡FALSO! Maradona marcó con la mano contra Inglaterra en los cuartos de final del Mundial 1986.",
      pts: 500
    },
    {
      q: "Un penalti se lanza desde 11 metros de la portería.",
      a: true,
      cat: "📋 Reglas",
      explain: "¡VERDADERO! El punto de penalti está exactamente a 11 metros (o 12 yardas) de la portería.",
      pts: 300
    },
    {
      q: "El Mundial 2022 en Qatar fue el primero en celebrarse en invierno (noviembre-diciembre).",
      a: true,
      cat: "🏆 Historia",
      explain: "¡VERDADERO! Por el calor extremo en Qatar, el Mundial se adelantó al invierno europeo.",
      pts: 600
    },
    {
      q: "Francia ha ganado el Mundial más veces que España.",
      a: true,
      cat: "🌐 Selecciones",
      explain: "¡VERDADERO! Francia ha ganado 2 (1998 y 2018) y España solo 1 (2010).",
      pts: 500
    },
    {
      q: "En el Mundial 2026 participarán selecciones de todos los continentes.",
      a: true,
      cat: "🌍 Mundial 2026",
      explain: "¡VERDADERO! Con 48 equipos habrá selecciones de todos los continentes: Europa, América, África, Asia y Oceanía.",
      pts: 500
    },
    {
      q: "El balón oficial del Mundial 2022 se llamaba 'Al Rihla'.",
      a: true,
      cat: "🏆 Historia",
      explain: "¡VERDADERO! 'Al Rihla' significa 'el viaje' en árabe. Fue diseñado especialmente para Qatar.",
      pts: 700
    },
    {
      q: "Un jugador que recibe 2 tarjetas amarillas en el mismo partido es expulsado.",
      a: true,
      cat: "📋 Reglas",
      explain: "¡VERDADERO! El árbitro enseña primero la segunda amarilla y luego la roja directa.",
      pts: 300
    },
    {
      q: "Todos los partidos de grupo del Mundial 2026 se jugarán en EE.UU.",
      a: false,
      cat: "🌍 Mundial 2026",
      explain: "¡FALSO! Los partidos de grupo también se jugarán en México y Canadá.",
      pts: 500
    },
    {
      q: "Lamine Yamal es un jugador del Real Madrid.",
      a: false,
      cat: "⭐ Jugadores",
      explain: "¡FALSO! Lamine Yamal juega en el FC Barcelona.",
      pts: 500
    },
    {
      q: "Marruecos fue el primer equipo africano en llegar a semifinales del Mundial.",
      a: true,
      cat: "🌐 Selecciones",
      explain: "¡VERDADERO! Marruecos llegó a semifinales del Mundial 2022 en Qatar. ¡Un hito histórico para África!",
      pts: 700
    }
  ],

  // ──────────────────────────────────────────────────────────
  //  COMPLETA LA FRASE  – 15 preguntas
  // ──────────────────────────────────────────────────────────
  fillBlank: [
    {
      question: "El país que ha ganado más Mundiales es ___",
      answer: "BRASIL",
      hint: "Sus colores son verde y amarillo",
      extraLetters: ["X","K","W","Q","Z"],
      cat: "🏆 Historia",
      explain: "¡BRASIL con 5 Mundiales! 1958, 1962, 1970, 1994 y 2002.",
      pts: 700
    },
    {
      question: "El Mundial 2026 tendrá ___ equipos",
      answer: "CUARENTA",
      hint: "Un número entre 40 y 50",
      extraLetters: ["X","K","W","P","Z"],
      cat: "🌍 Mundial 2026",
      explain: "¡48 equipos! En español el número sería 'cuarenta y ocho'.",
      pts: 800
    },
    {
      question: "Argentina ganó el Mundial en el año 20___",
      answer: "VEINTIDOS",
      hint: "Fue en Qatar",
      extraLetters: ["X","K","F","P","Z"],
      cat: "🏆 Historia",
      explain: "¡Argentina ganó el Mundial 2022 en Qatar!",
      pts: 600
    },
    {
      question: "El estadio donde se jugará la final del Mundial 2026 se llama ___ Stadium",
      answer: "METLIFE",
      hint: "Es en Nueva York",
      extraLetters: ["X","K","W","Q","Z"],
      cat: "🏟️ Estadios",
      explain: "¡MetLife Stadium, cerca de Nueva York!",
      pts: 900
    },
    {
      question: "Messi juega en la selección de ___",
      answer: "ARGENTINA",
      hint: "País de Sudamérica",
      extraLetters: ["X","K","W","P","Z"],
      cat: "⭐ Jugadores",
      explain: "¡Messi es argentino! Una de las selecciones más famosas del mundo.",
      pts: 400
    },
    {
      question: "España ganó el Mundial de 2010 en ___",
      answer: "SUDAFRICA",
      hint: "País del continente africano",
      extraLetters: ["X","K","W","Q","Z"],
      cat: "🏆 Historia",
      explain: "¡España ganó el Mundial 2010 en Sudáfrica!",
      pts: 700
    },
    {
      question: "El récord de más goles en un solo Mundial (13) lo tiene ___",
      answer: "FONTAINE",
      hint: "Jugador francés de los años 50",
      extraLetters: ["X","K","W","P","Z"],
      cat: "📊 Récords",
      explain: "¡Just Fontaine marcó 13 goles en el Mundial 1958! Un récord que sigue en pie.",
      pts: 1000
    },
    {
      question: "El apodo de la selección brasileña es La ___",
      answer: "CANARINHA",
      hint: "Un pájaro amarillo",
      extraLetters: ["X","K","W","P","Z"],
      cat: "🌐 Selecciones",
      explain: "¡La Canarinha! Como el canario, pequeño pájaro amarillo muy conocido.",
      pts: 700
    },
    {
      question: "El famoso gol de Maradona se llamó 'La ___ de Dios'",
      answer: "MANO",
      hint: "Parte del cuerpo",
      extraLetters: ["X","K","W","Q","Z"],
      cat: "🏆 Historia",
      explain: "¡La Mano de Dios! Maradona marcó con la mano pero el árbitro no lo vio.",
      pts: 500
    },
    {
      question: "La prórroga dura ___ minutos",
      answer: "TREINTA",
      hint: "Número entre 20 y 40",
      extraLetters: ["X","K","W","Q","Z"],
      cat: "📋 Reglas",
      explain: "¡30 minutos de prórroga! Dos periodos de 15 minutos.",
      pts: 500
    },
    {
      question: "Tres goles en el mismo partido se llama ___",
      answer: "HATTRICK",
      hint: "Término inglés del fútbol",
      extraLetters: ["X","K","W","Q","Z"],
      cat: "📋 Reglas",
      explain: "¡Hat-trick! Un logro muy especial: marcar 3 goles en el mismo partido.",
      pts: 600
    },
    {
      question: "El apodo de Messi es 'La ___'",
      answer: "PULGA",
      hint: "Un insecto muy pequeño",
      extraLetters: ["X","K","W","Q","Z"],
      cat: "⭐ Jugadores",
      explain: "¡La Pulga! Porque Messi es bajito (1,70m) pero imposible de parar.",
      pts: 400
    },
    {
      question: "El país sede del primer Mundial en 1930 fue ___",
      answer: "URUGUAY",
      hint: "País pequeño de Sudamérica",
      extraLetters: ["X","K","W","Q","Z"],
      cat: "🏆 Historia",
      explain: "¡Uruguay organizó y ganó el primer Mundial en 1930!",
      pts: 700
    },
    {
      question: "La selección de Italia se llama 'Gli ___' (Los Azules)",
      answer: "AZZURRI",
      hint: "Palabra italiana para el color azul",
      extraLetters: ["X","K","W","Q","Z"],
      cat: "🌐 Selecciones",
      explain: "¡Gli Azzurri! En italiano significa 'Los Azules', por el color de su camiseta.",
      pts: 800
    },
    {
      question: "Mbappé marcó ___ goles en el Mundial 2022",
      answer: "OCHO",
      hint: "Número entre 7 y 9",
      extraLetters: ["X","K","W","Q","Z"],
      cat: "⭐ Jugadores",
      explain: "¡8 goles de Mbappé en Qatar 2022! La Bota de Oro del torneo.",
      pts: 700
    }
  ],

  // ──────────────────────────────────────────────────────────
  //  ANAGRAMAS  – 15 palabras
  // ──────────────────────────────────────────────────────────
  anagram: [
    { word: "BRASIL",    hint: "País con más Mundiales",            cat: "🌐 Selecciones", explain: "¡BRASIL! 5 veces campeón del mundo.",    pts: 700 },
    { word: "MEXICO",    hint: "País sede del Mundial 2026",        cat: "🌍 Mundial 2026", explain: "¡MEXICO! Uno de los 3 países organizadores.", pts: 500 },
    { word: "MESSI",     hint: "Estrella argentina",                cat: "⭐ Jugadores",   explain: "¡MESSI! El mejor del mundo.",             pts: 500 },
    { word: "MUNDIAL",   hint: "¡El torneo más grande!",            cat: "🏆 Historia",   explain: "¡MUNDIAL! La Copa del Mundo FIFA.",       pts: 500 },
    { word: "PORTERO",   hint: "El único que puede usar las manos", cat: "📋 Reglas",     explain: "¡PORTERO! Defiende la portería con las manos.", pts: 500 },
    { word: "GOLEADOR",  hint: "El que más goles marca",            cat: "📊 Récords",    explain: "¡GOLEADOR! El jugador que más goles anota.", pts: 700 },
    { word: "AZTECA",    hint: "Famoso estadio mexicano",           cat: "🏟️ Estadios",  explain: "¡AZTECA! El Estadio Azteca en México DF.",  pts: 700 },
    { word: "ARBITRO",   hint: "El que pita las faltas",            cat: "📋 Reglas",     explain: "¡ÁRBITRO! El que pita, enseña tarjetas y pone los tiempos.", pts: 600 },
    { word: "PENALTI",   hint: "Tiro desde 11 metros",              cat: "📋 Reglas",     explain: "¡PENALTI! Desde el punto de penalti, a 11 metros.", pts: 600 },
    { word: "MBAPPE",    hint: "Estrella francesa",                 cat: "⭐ Jugadores",  explain: "¡MBAPPÉ! El crack francés que marcó 8 goles en 2022.", pts: 600 },
    { word: "OFFSIDE",   hint: "Regla del fuera de juego",          cat: "📋 Reglas",     explain: "¡OFFSIDE (fuera de juego)! Una de las reglas más importantes.", pts: 700 },
    { word: "CANADA",    hint: "País norteamericano sede 2026",     cat: "🌍 Mundial 2026", explain: "¡CANADÁ! Otro de los 3 países organizadores del Mundial 2026.", pts: 600 },
    { word: "TROFEO",    hint: "Lo que gana el campeón",            cat: "🏆 Historia",   explain: "¡TROFEO! La Copa del Mundo que todos quieren levantar.", pts: 500 },
    { word: "ECUADOR",   hint: "País sudamericano clasificado",     cat: "🌐 Selecciones", explain: "¡ECUADOR! Selección sudamericana que busca su hueco en el Mundial.", pts: 700 },
    { word: "DELANTERO", hint: "Jugador que ataca y marca goles",   cat: "📋 Reglas",     explain: "¡DELANTERO! El jugador que está más adelante y busca marcar goles.", pts: 700 }
  ],

  // ──────────────────────────────────────────────────────────
  //  SOPAS DE LETRAS  – 5 puzzles
  // ──────────────────────────────────────────────────────────
  wordSearch: [
    {
      title: "Países del Mundial 2026",
      words: ["BRASIL", "MEXICO", "CANADA", "ESPANA", "FRANCE"],
      explain: "Los países organizadores y grandes favoritos del Mundial 2026.",
      pts: 1200
    },
    {
      title: "Estrellas del fútbol",
      words: ["MESSI", "MBAPPE", "HAALAND", "VINICIUS", "PEDRI"],
      explain: "Los mejores jugadores del mundo que competirán en el Mundial 2026.",
      pts: 1200
    },
    {
      title: "Conceptos del fútbol",
      words: ["GOLEADOR", "PORTERO", "PENALTI", "ARBITRO", "OFFSIDE"],
      explain: "¡Palabras clave del fútbol que todo fan debe conocer!",
      pts: 1200
    },
    {
      title: "Sedes del Mundial 2026",
      words: ["MIAMI", "DALLAS", "SEATTLE", "AZTECA", "TORONTO"],
      explain: "Ciudades y estadios que acogerán el Mundial 2026.",
      pts: 1200
    },
    {
      title: "Campeones del mundo",
      words: ["ARGENTINA", "ALEMANIA", "URUGUAY", "ITALIA", "BRASIL"],
      explain: "Los países que han ganado la Copa del Mundo.",
      pts: 1200
    }
  ]
};
