// Catálogo de juegos (clon de online.dinamicmultimedia.es/juegos.html)
// Estructura espejada del games.js original, simplificada para el clon.

export type GameCategory =
  | 'pcbasket'
  | 'pcfutbol'
  | 'clubes'
  | 'internacional'
  | 'seleccion'
  | 'varios';

export interface GameInfo {
  id: string;
  name: string;
  year: number;
  publisher: string;
  color: string;            // color base para el degradado de la portada
  category: GameCategory;
  player: 'kiosk' | 'dosbox';
  miniGame: 'penalty' | 'basket' | 'chess' | 'adventure' | 'beatemup';
  badges?: ('new' | 'fixed')[];
  desc: string[];           // párrafos HTML ya divididos en bloques
  controls: string;         // resumen de controles para el mini-juego
}

export const GAMES: Record<string, GameInfo> = {
  // ─── PC Basket ─────────────────────────────────────────────────────────────
  pcbasket: {
    id: 'pcbasket',
    name: 'PC Basket 4.0',
    year: 1996,
    publisher: 'Dinamic Multimedia',
    color: '#d35400',
    category: 'pcbasket',
    player: 'kiosk',
    miniGame: 'basket',
    badges: ['fixed'],
    controls: 'Ratón para apuntar · Clic para lanzar · 5 tiros por ronda',
    desc: [
      'PC Basket 4.0 es la cuarta entrega de la mítica saga de baloncesto de Dinamic Multimedia, lanzada en 1996. Como manager-general de tu equipo, controlabas cada detalle: fichajes, tácticas, finanzas y dirección deportiva.',
      'La simulación de partidos en tiempo real y la profundidad estadística lo convirtieron en un referente del género en España. Sus famosos gráficos vectoriales con jugadores representados como puntos animados eran la marca de la casa.',
      'Incluía plantillas reales de la liga ACB, sistema de lesiones, juveniles y mercado de fichajes. Muchos aficionados lo recuerdan como uno de los juegos más adictivos de la época dorada del estudio español.',
    ],
  },
  pcbasket65: {
    id: 'pcbasket65',
    name: 'PC Basket 6.5',
    year: 1999,
    publisher: 'Dinamic Multimedia',
    color: '#5b7089',
    category: 'pcbasket',
    player: 'kiosk',
    miniGame: 'basket',
    controls: 'Ratón para apuntar · Clic para lanzar · 5 tiros por ronda',
    desc: [
      'PC Basket 6.5 supuso la evolución definitiva de la franquicia. Con un motor renovado, plantillas actualizadas a la temporada 98/99 y mejoras en la simulación de partidos, ofrecía la experiencia de management más completa de la saga.',
      'Entre sus novedades destacaban la gestión económica avanzada, el sistema de ojeo de jugadores y la posibilidad de disputar competiciones europeas. Era considerado por la comunidad como el mejor PC Basket jamás publicado.',
    ],
  },

  // ─── PC Fútbol ─────────────────────────────────────────────────────────────
  pcf4: {
    id: 'pcf4',
    name: 'PC Fútbol 4.0',
    year: 1995,
    publisher: 'Dinamic Multimedia',
    color: '#0f3a5f',
    category: 'pcfutbol',
    player: 'kiosk',
    miniGame: 'penalty',
    badges: ['fixed'],
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Fútbol 4.0 (1995) marcó un antes y un después en la historia del videojuego español. Vendió más de 250.000 copias y se convirtió en el título más vendido del estudio, catapultando a Dinamic Multimedia al estrellato de los noventa.',
      'Su mezcla de simulación táctica, mercado de fichajes y partidos en tiempo real con vista de pájaro creó un género de management futbolístico que sería imitado durante años. La versión 4.0 introdujo el sistema de préstamos y mejoró el simulador de partidos.',
    ],
  },
  pccalcio4es: {
    id: 'pccalcio4es',
    name: 'PC Calcio 4.0',
    year: 1996,
    publisher: 'Dinamic Multimedia',
    color: '#c60b1e',
    category: 'pcfutbol',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Calcio 4.0 fue la adaptación italiana del motor de PC Fútbol, lanzada en 1996 para conquerir el mercado de la Serie A. Recreaba las plantillas, estadios y competiciones del calcio con licencia oficial.',
      'Mantuvo la interfaz característica del estudio pero con jugadores, escudos y campeonatos italianos. El sistema de fichajes y la simulación de partidos eran idénticos al PC Fútbol original, lo que facilitó su aceptación entre los aficionados transalpinos.',
    ],
  },
  pcf5: {
    id: 'pcf5',
    name: 'PC Fútbol 5.0',
    year: 1996,
    publisher: 'Dinamic Multimedia',
    color: '#16466e',
    category: 'pcfutbol',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Fútbol 5.0 llegó en 1996 con importantes novedades: módulo de prensa deportiva, sistema de internacionalización con convocatorias de selección y un simulador de partidos mejorado con mayor realismo táctico.',
      'Esta entrega consolidó la fórmula ganadora del estudio y fue la primera en incorporar competiciones europeas y el módulo de club europeo, un guiño a los aficionados que soñaban con guiar a su equipo a la Copa de Europa.',
    ],
  },
  pccalcio5es: {
    id: 'pccalcio5es',
    name: 'PC Calcio 5.0',
    year: 1997,
    publisher: 'Dinamic Multimedia',
    color: '#2e7d32',
    category: 'pcfutbol',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Calcio 5.0 (1997) fue la versión italiana del motor de PC Fútbol 5.0, con plantillas de la Serie A actualizadas a la temporada 96/97 y todas las novedades introducidas en la versión española.',
      'Mantuvo el ya clásico sistema de management con mercado de fichajes, simulación táctica y dirección deportiva, pero con un toque transalpino que lo hacía especialmente popular entre los fans del calcio.',
    ],
  },
  pcfrance: {
    id: 'pcfrance',
    name: 'PC France 5.0',
    year: 1997,
    publisher: 'Dinamic Multimedia',
    color: '#0055a4',
    category: 'pcfutbol',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC France 5.0 (1997) fue la versión francesa del motor de PC Fútbol 5.0, lanzada para conquistar el mercado galo. Recreaba la Division 1 con sus clubes, jugadores y estadios de la época.',
      'Con la creciente popularidad del fútbol francés tras la victoria del PSG en la Recopa y el mundial juvenil, la marca Dinamic decidió exportar su exitosa fórmula. El resultado fue una entrega tan completa como la versión española.',
    ],
  },
  pcpremier5: {
    id: 'pcpremier5',
    name: 'PC Premier 5.0',
    year: 1997,
    publisher: 'Dinamic Multimedia',
    color: '#c9a227',
    category: 'pcfutbol',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Premier 5.0 (1997) fue la adaptación británica del motor de PC Fútbol 5.0, con las plantillas de la Premier League y la possibility de competir en FA Cup y competiciones europeas.',
      'Recreaba con detalle el carácter físico y rápido del fútbol inglés, manteniendo el sistema de management profundo que hizo famoso al estudio. Una entrega muy querida por los aficionados anglosajones a los simuladores de gestión.',
    ],
  },
  pcf6: {
    id: 'pcf6',
    name: 'PC Fútbol 6.0',
    year: 1997,
    publisher: 'Dinamic Multimedia',
    color: '#123c6b',
    category: 'pcfutbol',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Fútbol 6.0 (1997) trajo consigo una revisión gráfica completa y un motor de simulación más realista. Se incorporó un sistema de ojeadores y un mercado de fichajes mucho más dinámico.',
      'Esta entrega es considerada por muchos veteranos como una de las más equilibradas de la saga: manteniendo la accesibilidad de la interfaz pero añadiendo profundidad táctica y financiera suficiente para mantener enganchados a los aficionados durante temporadas enteras.',
    ],
  },
  pccalcio6es: {
    id: 'pccalcio6es',
    name: 'PC Calcio 6.0',
    year: 1998,
    publisher: 'Dinamic Multimedia',
    color: '#c9a227',
    category: 'pcfutbol',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Calcio 6.0 (1998) fue la versión italiana del motor de PC Fútbol 6.0, con plantillas de la Serie A actualizadas a la temporada 97/98 y todas las mejoras introducidas en la versión española.',
      'Con la consolidation del calcio como una de las ligas más potentes del mundo (la Juve, el Inter, el Milan y la Lazio dominaban el panorama europeo), esta entrega disfrutó de gran popularidad entre los tifosi italianos.',
    ],
  },
  pcpremier: {
    id: 'pcpremier',
    name: 'PC Premier 6.0',
    year: 1998,
    publisher: 'Dinamic Multimedia',
    color: '#c9a227',
    category: 'pcfutbol',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Premier 6.0 (1998) fue la adaptación británica del motor de PC Fútbol 6.0, con las plantillas de la Premier League actualizadas y todas las mejoras de la versión española.',
      'Con el fútbol inglés viviendo una de sus épocas más vibrantes (Arsenal, Manchester United y Chelsea pugnaban por el título), este título permitía revivir aquellas temporadas legendarias con un nivel de detalle tremendo.',
    ],
  },
  pcf7: {
    id: 'pcf7',
    name: 'PC Fútbol 7.0',
    year: 1998,
    publisher: 'Dinamic Multimedia',
    color: '#0a3d62',
    category: 'pcfutbol',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Fútbol 7.0 (1998) fue la última gran entrega de la saga en los noventa. Introdujo un nuevo motor de simulación, plantillas ampliadas y un sistema de gestión financiera mucho más realista.',
      'Para muchos aficionados es el PC Fútbol definitivo: combina lo mejor de las entregas anteriores con una interfaz pulida, un simulador de partidos fluido y una duración prácticamente infinita. Es probablemente el título más recordado de la saga junto al 4.0.',
    ],
  },

  // ─── Clubes ────────────────────────────────────────────────────────────────
  pcbarca99: {
    id: 'pcbarca99',
    name: "Barça '99",
    year: 1999,
    publisher: 'Dinamic Multimedia',
    color: '#004d98',
    category: 'clubes',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      "Barça '99 (1999) fue una edición especial del motor de PC Fútbol dedicada exclusivamente al FC Barcelona, con su plantilla completa de la temporada 98/99 y todo su histórico de jugadores de cantera.",
      'Permitía revivir aquella mítica temporada azulgrana con jugadores como Figo, Rivaldo, Kluivert, Guardiola o Cocu. Una auténtica joya para los culés que querían gestionar su equipo de toda la vida con la plantilla real.',
    ],
  },
  pcbarcabasket99: {
    id: 'pcbarcabasket99',
    name: "Barça Basket '99",
    year: 1999,
    publisher: 'Dinamic Multimedia',
    color: '#004d98',
    category: 'clubes',
    player: 'kiosk',
    miniGame: 'basket',
    controls: 'Ratón para apuntar · Clic para lanzar · 5 tiros por ronda',
    desc: [
      "Barça Basket '99 (1999) fue una edición especial del motor de PC Basket centrada en la sección de baloncesto del FC Barcelona, con la plantilla completa de la temporada 98/99.",
      "En aquella época el Barça de baloncesto era uno de los grandes de Europa, con jugadores míticos como Djordjevic, el \"Amo\" Iturbe o Sasha Djordjevic. Revivir aquella plantilla en formato manager era un lujo para los aficionados.",
    ],
  },
  pcrm: {
    id: 'pcrm',
    name: 'Real Madrid 99',
    year: 1999,
    publisher: 'Dinamic Multimedia',
    color: '#febe10',
    category: 'clubes',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      "Real Madrid 99 (1999) fue la edición especial del motor de PC Fútbol dedicada al Real Madrid, con su plantilla completa de la temporada 98/99 y todo su histórico de la casa blanca.",
      'La época del Madrid de los Galácticos estaba a punto de empezar, pero aquel equipo ya apuntaba maneras con Hierro, Roberto Carlos, Raúl, Mijatovic o Seedorf. Una pieza de coleccionista para cualquier madridista.',
    ],
  },
  pcrmbasket99: {
    id: 'pcrmbasket99',
    name: "Real Madrid Basket '99",
    year: 1999,
    publisher: 'Dinamic Multimedia',
    color: '#0a2463',
    category: 'clubes',
    player: 'kiosk',
    miniGame: 'basket',
    controls: 'Ratón para apuntar · Clic para lanzar · 5 tiros por ronda',
    desc: [
      "Real Madrid Basket '99 (1999) fue la edición especial del motor de PC Basket dedicada a la sección de baloncesto del Real Madrid, con la plantilla completa de la temporada 98/99.",
      'El Madrid de baloncesto de finales de los 90 contaba con jugadores de la talla de Sasha Djordjevic, Lucas, Struelens o Angulo. Gestionar a aquella plantilla era un auténtico lujo para los aficionados al baloncesto nacional.',
    ],
  },
  atm2000: {
    id: 'atm2000',
    name: 'At. de Madrid 2000',
    year: 2000,
    publisher: 'Dinamic Multimedia',
    color: '#cb3524',
    category: 'clubes',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      "At. de Madrid 2000 (2000) fue la edición especial del motor de PC Fútbol dedicada al Club Atlético de Madrid, con su plantilla completa de la temporada 99/00.",
      'Aquella temporada fue histórica para el Atleti: el doblete de Liga y Copa del Rey con jugadores como Hasselbaink, Valerón, Baraja o Molina. Una de las ediciones más queridas por la afición colchonera.',
    ],
  },
  pcriver: {
    id: 'pcriver',
    name: 'PC River',
    year: 2000,
    publisher: 'Dinamic Multimedia',
    color: '#d42a2a',
    category: 'clubes',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      "PC River (2000) fue una edición especial dedicada al Club Atlético River Plate, con la plantilla completa del equipo argentino de la época y todo el histórico del club millonario.",
      'Con Gallardo, Aimar, Saviola o Ortega en sus filas, River era uno de los equipos más espectaculares del mundo a finales de los 90. Esta edición permitía gestionar a la banda roja con un nivel de detalle que enamoró a los simpatizantes argentinos.',
    ],
  },

  // ─── Versiones Internacionales ─────────────────────────────────────────────
  pccalcio: {
    id: 'pccalcio',
    name: 'PC Calcio 4.0 (Italia)',
    year: 1996,
    publisher: 'Dinamic Multimedia',
    color: '#0064a8',
    category: 'internacional',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Calcio 4.0 (Italia, 1996) fue la versión original italiana del PC Calcio, distinta de la versión española. Recreaba con detalle la Serie A y sus competiciones nacionales.',
      'Con licencias propias del mercado transalpino, esta versión está pensada para el público italiano: textos, interfaz y comentarios adaptados al calcio. Una pieza de coleccionista para los aficionados a la saga.',
    ],
  },
  pccalcio5: {
    id: 'pccalcio5',
    name: 'PC Calcio 5 (Italia)',
    year: 1997,
    publisher: 'Dinamic Multimedia',
    color: '#2e7d32',
    category: 'internacional',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Calcio 5 (Italia, 1997) fue la segunda versión italiana íntegramente localizada, con plantillas de la Serie A actualizadas a la temporada 96/97 y todas las novedades del motor de PC Fútbol 5.0.',
      'La hegemonía de la Juve de Lippi y el resurgir del Parma hacían de la Serie A una de las ligas más competitivas del mundo. Gestionar un equipo transalpino en aquella época era todo un lujo táctico.',
    ],
  },
  pccalcio6: {
    id: 'pccalcio6',
    name: 'PC Calcio 6 (Italia)',
    year: 1998,
    publisher: 'Dinamic Multimedia',
    color: '#c9a227',
    category: 'internacional',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Calcio 6 (Italia, 1998) fue la tercera versión italiana, con plantillas de la Serie A de la temporada 97/98 y todas las mejoras del motor de PC Fútbol 6.0.',
      'La Serie A vivía entonces una de sus épocas doradas: Juve, Inter, Lazio, Parma y Fiorentina competían a nivel europeo con plantillas llenas de estrellas. Gestionar uno de aquellos equipos era todo un privilegio.',
    ],
  },
  pccalcio7: {
    id: 'pccalcio7',
    name: 'PC Calcio 7 (Italia)',
    year: 1999,
    publisher: 'Dinamic Multimedia',
    color: '#1a6fb0',
    category: 'internacional',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Calcio 7 (Italia, 1999) fue la cuarta y última versión italiana, con plantillas actualizadas y el motor renovado de PC Fútbol 7.0. Una de las entregas más completas para el mercado transalpino.',
      'La temporada 98/99 deparó un campeón sorpresa (el Milan de Zaccheroni), con la Lazio de Eriksson y la Fiorentina de Maldini y Batistuta peleando hasta el final. Revivir aquella temporada es todo un clásico.',
    ],
  },
  pcfa96: {
    id: 'pcfa96',
    name: 'PC Fútbol 4.0 (Argentina)',
    year: 1996,
    publisher: 'Dinamic Multimedia',
    color: '#75aadb',
    category: 'internacional',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Fútbol 4.0 (Argentina, 1996) fue la versión argentina del motor de PC Fútbol, con los clubes del torneo Apertura y Clausura y los jugadores de la época dorada del fútbol argentino.',
      'Con Boca de Riquelme emergiendo y River de Gallardo y Astralada dominando, esta versión capturó toda la intensidad del superclásico argentino. Una entrega muy querida por la afición trasandina.',
    ],
  },
  pcf5arg: {
    id: 'pcf5arg',
    name: 'PC Fútbol 5.0 (Argentina)',
    year: 1997,
    publisher: 'Dinamic Multimedia',
    color: '#75aadb',
    category: 'internacional',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Fútbol 5.0 (Argentina, 1997) actualizó las plantillas del fútbol argentino y añadió todas las novedades del motor de PC Fútbol 5.0, incluyendo el módulo de prensa y el sistema de ojeo.',
      'Aquella temporada vio consagrarse al palmeiras argentino con la conquista de la Supercopa por River y el primer título de La Volpe en el banquillo de Vélez. Revivir el Apertura y Clausura era todo un lujo.',
    ],
  },
  pcf6arg: {
    id: 'pcf6arg',
    name: 'PC Fútbol 6.0 (Argentina)',
    year: 1998,
    publisher: 'Dinamic Multimedia',
    color: '#75aadb',
    category: 'internacional',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'PC Fútbol 6.0 (Argentina, 1998) fue la última versión argentina, con plantillas actualizadas a la temporada 97/98 y todas las mejoras del motor de PC Fútbol 6.0.',
      'Aquel año fue histórico para el fútbol argentino: el Mundial de Francia 98 consagró a Ortega, Batistuta y compañía como estrellas mundiales. El Apertura de River y el Clausura de Vélez vivieron tardas memorables.',
    ],
  },
  pm97: {
    id: 'pm97',
    name: 'Premier Manager 97 (Inglaterra)',
    year: 1997,
    publisher: 'Dinamic Multimedia',
    color: '#1b2a6b',
    category: 'internacional',
    player: 'kiosk',
    miniGame: 'penalty',
    badges: ['new'],
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'Premier Manager 97 (Inglaterra, 1997) fue la primera adaptación íntegra del motor de PC Fútbol al fútbol inglés, con licencias de la Premier League, la FA Cup y competiciones europeas.',
      'Recreaba la efervescencia del fútbol inglés previo a la era Mourinho: Blackburn, Manchester United, Newcastle y Liverpool competían por el título en una de las ligas más potentes del mundo. Una entrega muy esperada por los fans británicos de los simuladores.',
    ],
  },
  pm98: {
    id: 'pm98',
    name: 'Premier Manager 98 (Inglaterra)',
    year: 1998,
    publisher: 'Dinamic Multimedia',
    color: '#1b2a6b',
    category: 'internacional',
    player: 'kiosk',
    miniGame: 'penalty',
    badges: ['new'],
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'Premier Manager 98 (Inglaterra, 1998) actualizó las plantillas inglesas y añadió las mejoras del motor de PC Fútbol 6.0, con un simulador de partidos más realista.',
      'Aquella temporada es una de las más recordadas de la historia de la Premier: el Manchester United de Beckham, Scholes y Giggs logró el histórico triplete (Premier, FA Cup y Champions). Gestionar a aquel equipo era un sueño para cualquier manager.',
    ],
  },
  pm99: {
    id: 'pm99',
    name: 'Premier Manager 99 (Inglaterra)',
    year: 1999,
    publisher: 'Dinamic Multimedia',
    color: '#1b2a6b',
    category: 'internacional',
    player: 'kiosk',
    miniGame: 'penalty',
    badges: ['new'],
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      'Premier Manager 99 (Inglaterra, 1999) fue la última entrega británica de la saga, basada en el motor de PC Fútbol 7.0. Era la versión más completa y pulida para el mercado inglés.',
      'Con plantillas actualizadas a la temporada 98/99, simulación mejorada y todas las opciones tácticas, se convirtió en uno de los títulos de management más queridos por la afición británica a finales de los noventa.',
    ],
  },

  // ─── Selección Española ─────────────────────────────────────────────────────
  euro96: {
    id: 'euro96',
    name: "PC Selección Española Eurocopa '96",
    year: 1996,
    publisher: 'Dinamic Multimedia',
    color: '#c1121f',
    category: 'seleccion',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      "PC Selección Española Eurocopa '96 (1996) fue una edición especial del motor de PC Fútbol centrada en la selección española, con motivo de la Eurocopa de Inglaterra.",
      'Aquel equipo, con jugadores como Zubizarreta, Hierro, Nadal, Caminero o Kiko, eliminó a Italia en cuartos pero cayó en penaltis ante la anfitriona Inglaterra en semifinales. Revivir aquella Eurocopa era todo un lujo para la afición española.',
    ],
  },
  wc98: {
    id: 'wc98',
    name: "PC Selección Española Mundial '98",
    year: 1998,
    publisher: 'Dinamic Multimedia',
    color: '#9d0208',
    category: 'seleccion',
    player: 'kiosk',
    miniGame: 'penalty',
    controls: 'Ratón para apuntar · Clic para chutar · 5 penaltis por tanda',
    desc: [
      "PC Selección Española Mundial '98 (1998) fue la edición especial del motor de PC Fútbol centrada en la selección española de fútbol, con motivo del Mundial de Francia 98.",
      'Aquel equipo, liderado por Hierro, Raúl, Luis Enrique y Morientes, fue eliminado en fase de grupos en una de las mayores decepciones del fútbol español reciente. Aun así, revivir aquel equipo en formato manager es una pieza de coleccionista.',
    ],
  },

  // ─── Varios ────────────────────────────────────────────────────────────────
  justic: {
    id: 'justic',
    name: 'Los Justicieros',
    year: 1996,
    publisher: 'Dinamic Multimedia',
    color: '#8a5a2b',
    category: 'varios',
    player: 'dosbox',
    miniGame: 'beatemup',
    controls: 'Cursores para moverte · Espacio para golpear · Elimina a todos los enemigos',
    desc: [
      'Los Justicieros (1996) fue un beat-em-up de scroll lateral desarrollado por Dinamic Multimedia, ambientado en un futuro ciberpunk donde un equipo de justicieros urbanos limpia las calles ciudad a ciudad.',
      'Con hasta tres personajes seleccionables (cada uno con habilidades propias: fuerza bruta, velocidad y armas a distancia), el juego ofrecía horas de acción arcade para un jugador o en cooperativo local.',
      'Gráficamente impresionante para la época, con escenarios urbanos detallados y animaciones fluidas, fue uno de los últimos grandes éxitos del estudio español antes de su cierre.',
    ],
  },
  igor: {
    id: 'igor',
    name: 'Igor: Objetivo Uikokahonia',
    year: 1994,
    publisher: 'Dinamic Multimedia',
    color: '#f2c200',
    category: 'varios',
    player: 'kiosk',
    miniGame: 'adventure',
    controls: 'Ratón para explorar · Clic en puntos calientes · Resuelve el puzle',
    desc: [
      'Igor: Objetivo Uikokahonia (1994) fue una aventura gráfica de ciencia ficción desarrollada por Pendulo Studios y publicada por Dinamic Multimedia. Su protagonista, Igor, debía viajar al planeta Uikokahonia para rescatar a su amada.',
      'Con gráficos dibujados a mano, voces digitalizadas y un guion cargado de humor, fue una de las aventuras más entrañables del cine interactivo español. Su estilo recordaba a las grandes aventuras de LucasArts de la época.',
      'El juego combina exploración, conversaciones con personajes excéntricos y puzzles lógicos. Cada pantalla es una pequeña obra de arte pop art con detalles expresivos y guiños a la cultura popular.',
    ],
  },
  combatchess: {
    id: 'combatchess',
    name: 'Combat Chess',
    year: 1997,
    publisher: 'Empire Interactive / Dinamic',
    color: '#7a1620',
    category: 'varios',
    player: 'kiosk',
    miniGame: 'chess',
    controls: 'Clic para seleccionar pieza · Clic para mover · ¡Dale jaque mate!',
    desc: [
      'Combat Chess (1997) fue una edición especial del clásico juego de ajedrez con un giro espectacular: cada pieza está representada por un personaje animado que combate contra su oponente en una secuencia de lucha.',
      'Desarrollado por Empire Interactive y distribuido por Dinamic, el juego combinaba la profundidad estratégica del ajedrez tradicional con animaciones de combate estilo beat-em-up para cada captura. Una experiencia visualmente deslumbrante.',
      'Incluía modo torneo, partidas a tiempo y opción de jugar contra la máquina con distintos niveles de dificultad. Una joya imprescindible para los aficionados al ajedrez y a la animación clásica.',
    ],
  },
};

export interface GameSection {
  title: string;
  ids: string[];
}

export const SECTIONS: GameSection[] = [
  { title: 'PC Basket', ids: ['pcbasket', 'pcbasket65'] },
  {
    title: 'PC Fútbol',
    ids: [
      'pcf4', 'pccalcio4es', 'pcf5', 'pccalcio5es', 'pcfrance',
      'pcpremier5', 'pcf6', 'pccalcio6es', 'pcpremier', 'pcf7',
    ],
  },
  {
    title: 'Clubes',
    ids: [
      'pcbarca99', 'pcbarcabasket99', 'pcrm', 'pcrmbasket99', 'atm2000', 'pcriver',
    ],
  },
  {
    title: 'Versiones Internacionales',
    ids: [
      'pccalcio', 'pccalcio5', 'pccalcio6', 'pccalcio7',
      'pcfa96', 'pcf5arg', 'pcf6arg',
      'pm97', 'pm98', 'pm99',
    ],
  },
  {
    title: 'Selección Española',
    ids: ['euro96', 'wc98'],
  },
  {
    title: 'Varios',
    ids: ['justic', 'igor', 'combatchess'],
  },
];

export const FOOTER_VERSION = 'DMOnline Clone 1.0';
