/* ============================================================
   PC FÚTBOL 2026 - Datos iniciales
   Equipos de 1ª y 2ª División + generadores de nombres
   ============================================================ */

const DATA = {};

// ---------- DIVISIONES ----------
DATA.DIVISIONES = {
  1: { id: 1, nombre: 'Primera División', equipos: 20, jornadas: 38 },
  2: { id: 2, nombre: 'Segunda División', equipos: 22, jornadas: 42 }
};

// ---------- EQUIPOS ----------
// Composición real de la temporada 2026-27.
DATA.EQUIPOS = [
  // ===== PRIMERA DIVISIÓN (20) =====
  { id: 1,  nom: 'FC Barcelona',       abr: 'BAR', est: 'Spotify Camp Nou',    cap: 99354, cols: ['#a50044', '#004d98'], str: 91, div: 1, ciudad: 'Barcelona' },
  { id: 2,  nom: 'Real Madrid',        abr: 'RMA', est: 'Santiago Bernabéu',   cap: 81044, cols: ['#f5f5f5', '#1a1a6e'], str: 90, div: 1, ciudad: 'Madrid' },
  { id: 3,  nom: 'Atlético de Madrid', abr: 'ATM', est: 'Metropolitano',       cap: 70460, cols: ['#cb3524', '#1a2c5b'], str: 86, div: 1, ciudad: 'Madrid' },
  { id: 4,  nom: 'Villarreal CF',      abr: 'VIL', est: 'La Cerámica',         cap: 23500, cols: ['#ffe667', '#005187'], str: 81, div: 1, ciudad: 'Villarreal' },
  { id: 5,  nom: 'Real Betis',         abr: 'BET', est: 'Benito Villamarín',   cap: 60721, cols: ['#00954c', '#ffffff'], str: 80, div: 1, ciudad: 'Sevilla' },
  { id: 6,  nom: 'Athletic Club',      abr: 'ATH', est: 'San Mamés',           cap: 53289, cols: ['#ee2523', '#ffffff'], str: 80, div: 1, ciudad: 'Bilbao' },
  { id: 7,  nom: 'Real Sociedad',      abr: 'RSO', est: 'Reale Arena',         cap: 39500, cols: ['#0067b1', '#ffffff'], str: 78, div: 1, ciudad: 'San Sebastián' },
  { id: 8,  nom: 'Valencia CF',        abr: 'VAL', est: 'Mestalla',            cap: 49430, cols: ['#f5f5f5', '#ff7300'], str: 77, div: 1, ciudad: 'Valencia' },
  { id: 9,  nom: 'RC Celta',           abr: 'CEL', est: 'Balaídos',            cap: 29000, cols: ['#8ac3ee', '#ffffff'], str: 76, div: 1, ciudad: 'Vigo' },
  { id: 10, nom: 'Getafe CF',          abr: 'GET', est: 'Coliseum',            cap: 17393, cols: ['#005999', '#ffffff'], str: 74, div: 1, ciudad: 'Getafe' },
  { id: 11, nom: 'Rayo Vallecano',     abr: 'RAY', est: 'Vallecas',            cap: 14708, cols: ['#ffffff', '#e53027'], str: 74, div: 1, ciudad: 'Madrid' },
  { id: 12, nom: 'RCD Espanyol',       abr: 'ESP', est: 'RCDE Stadium',        cap: 40000, cols: ['#007fc8', '#ffffff'], str: 73, div: 1, ciudad: 'Barcelona' },
  { id: 13, nom: 'Sevilla FC',         abr: 'SEV', est: 'Sánchez-Pizjuán',     cap: 43883, cols: ['#d80027', '#ffffff'], str: 73, div: 1, ciudad: 'Sevilla' },
  { id: 14, nom: 'CA Osasuna',         abr: 'OSA', est: 'El Sadar',            cap: 23576, cols: ['#0a346f', '#d2001c'], str: 73, div: 1, ciudad: 'Pamplona' },
  { id: 15, nom: 'Deportivo Alavés',   abr: 'ALA', est: 'Mendizorroza',        cap: 19840, cols: ['#0761af', '#ffffff'], str: 72, div: 1, ciudad: 'Vitoria' },
  { id: 16, nom: 'Levante UD',         abr: 'LEV', est: 'Ciutat de València',  cap: 26354, cols: ['#004a9f', '#b4053e'], str: 71, div: 1, ciudad: 'Valencia' },
  { id: 17, nom: 'Elche CF',           abr: 'ELC', est: 'Martínez Valero',     cap: 31388, cols: ['#00953b', '#ffffff'], str: 70, div: 1, ciudad: 'Elche' },
  { id: 18, nom: 'Racing Santander',   abr: 'RAC', est: 'El Sardinero',        cap: 22222, cols: ['#ffffff', '#009a44'], str: 69, div: 1, ciudad: 'Santander' },
  { id: 19, nom: 'Málaga CF',          abr: 'MAL', est: 'La Rosaleda',         cap: 30044, cols: ['#0072bc', '#ffffff'], str: 68, div: 1, ciudad: 'Málaga' },
  { id: 20, nom: 'Depor La Coruña',    abr: 'DEP', est: 'Riazor',              cap: 32570, cols: ['#0072ce', '#ffffff'], str: 68, div: 1, ciudad: 'La Coruña' },

  // ===== SEGUNDA DIVISIÓN (22) =====
  { id: 21, nom: 'RCD Mallorca',       abr: 'MLL', est: 'Son Moix',            cap: 23142, cols: ['#e20613', '#000000'], str: 70, div: 2, ciudad: 'Palma' },
  { id: 22, nom: 'Girona FC',          abr: 'GIR', est: 'Montilivi',           cap: 14624, cols: ['#d81e05', '#ffffff'], str: 70, div: 2, ciudad: 'Girona' },
  { id: 23, nom: 'Real Oviedo',        abr: 'OVI', est: 'Carlos Tartiere',     cap: 30500, cols: ['#0055a5', '#ffffff'], str: 67, div: 2, ciudad: 'Oviedo' },
  { id: 24, nom: 'UD Las Palmas',      abr: 'LPA', est: 'Gran Canaria',        cap: 32400, cols: ['#ffe500', '#003da5'], str: 67, div: 2, ciudad: 'Las Palmas' },
  { id: 25, nom: 'Real Valladolid',    abr: 'VLL', est: 'José Zorrilla',       cap: 27618, cols: ['#b285bf', '#ffffff'], str: 66, div: 2, ciudad: 'Valladolid' },
  { id: 26, nom: 'CD Leganés',         abr: 'LEG', est: 'Butarque',            cap: 12550, cols: ['#0060a9', '#ffffff'], str: 65, div: 2, ciudad: 'Leganés' },
  { id: 27, nom: 'UD Almería',         abr: 'ALM', est: 'Juegos Mediterráneos', cap: 15374, cols: ['#e63329', '#ffffff'], str: 65, div: 2, ciudad: 'Almería' },
  { id: 28, nom: 'Sporting de Gijón',  abr: 'SPO', est: 'El Molinón',          cap: 30000, cols: ['#f5f5f5', '#d2001c'], str: 65, div: 2, ciudad: 'Gijón' },
  { id: 29, nom: 'SD Eibar',           abr: 'EIB', est: 'Ipurua',              cap: 8100,  cols: ['#b4053e', '#004a9f'], str: 64, div: 2, ciudad: 'Eibar' },
  { id: 30, nom: 'Granada CF',         abr: 'GRA', est: 'Los Cármenes',        cap: 19336, cols: ['#c8102e', '#ffffff'], str: 64, div: 2, ciudad: 'Granada' },
  { id: 31, nom: 'Cádiz CF',           abr: 'CAD', est: 'Nuevo Mirandilla',    cap: 20724, cols: ['#ffe500', '#005595'], str: 63, div: 2, ciudad: 'Cádiz' },
  { id: 32, nom: 'CD Tenerife',        abr: 'TEN', est: 'Heliodoro',           cap: 22820, cols: ['#ffffff', '#003da5'], str: 62, div: 2, ciudad: 'Santa Cruz' },
  { id: 33, nom: 'CD Castellón',       abr: 'CAS', est: 'Castalia',            cap: 15500, cols: ['#000000', '#ffffff'], str: 62, div: 2, ciudad: 'Castellón' },
  { id: 34, nom: 'Burgos CF',          abr: 'BUR', est: 'El Plantío',          cap: 12464, cols: ['#000000', '#ffffff'], str: 62, div: 2, ciudad: 'Burgos' },
  { id: 35, nom: 'Córdoba CF',         abr: 'COR', est: 'El Arcángel',         cap: 21822, cols: ['#f5f5f5', '#009a44'], str: 61, div: 2, ciudad: 'Córdoba' },
  { id: 36, nom: 'Albacete BP',        abr: 'ALB', est: 'Carlos Belmonte',     cap: 17300, cols: ['#ffffff', '#231f20'], str: 61, div: 2, ciudad: 'Albacete' },
  { id: 37, nom: 'FC Andorra',         abr: 'AND', est: 'Estadi Nacional',     cap: 3300,  cols: ['#ffd200', '#004a9f'], str: 60, div: 2, ciudad: 'Andorra la Vella' },
  { id: 38, nom: 'AD Ceuta FC',        abr: 'CEU', est: 'Alfonso Murube',      cap: 6500,  cols: ['#ffffff', '#e63329'], str: 59, div: 2, ciudad: 'Ceuta' },
  { id: 39, nom: 'CD Eldense',         abr: 'ELD', est: 'Pepico Amat',         cap: 6000,  cols: ['#004a9f', '#d2001c'], str: 58, div: 2, ciudad: 'Elda' },
  { id: 40, nom: 'CE Sabadell FC',     abr: 'SAB', est: 'Nova Creu Alta',      cap: 11500, cols: ['#004a9f', '#d2001c'], str: 57, div: 2, ciudad: 'Sabadell' },
  { id: 41, nom: 'Real Sociedad B',    abr: 'RSB', est: 'Zubieta',             cap: 2500,  cols: ['#0067b1', '#ffffff'], str: 56, div: 2, ciudad: 'San Sebastián' },
  { id: 42, nom: 'Celta Fortuna',      abr: 'CFU', est: 'Barreiro',            cap: 2500,  cols: ['#8ac3ee', '#ffffff'], str: 55, div: 2, ciudad: 'Vigo' }
];

// ---------- NOMBRES PARA GENERAR JUGADORES ----------
DATA.NOMBRES_H = ['Adrián','Álex','Alonso','Andrés','Antonio','Álvaro','Arnau','Aitor','Beñat','Bruno','Carlos','Cristian','Dani','David','Diego','Eduardo','Enzo','Eric','Fran','Gabriel','Gonzalo','Hugo','Iker','Iván','Jaime','Javier','Jesús','Jorge','José','Joel','Juan','Kevin','Leo','Lucas','Luis','Manu','Marc','Marco','Mario','Mateo','Miguel','Mikel','Nico','Oihan','Óscar','Pablo','Pedro','Pol','Pau','Raúl','Rayco','Rodri','Rubén','Samu','Sergio','Unai','Víctor','Yeray','Ander','Asier','Gorka','Iñaki','Jon','Julen','Xabi'];
DATA.NOMBRES_M = ['Ana','Alba','Carmen','Claudia','Elena','Irene','Laura','Lucía','Marta','Nerea','Patricia','Sara','Sofía','Paula','Ainhoa','Naroa','Leire','Maddi'];
DATA.APELLIDOS = ['García','Fernández','González','Rodríguez','López','Martínez','Sánchez','Pérez','Gómez','Martín','Jiménez','Ruiz','Hernández','Díaz','Moreno','Muñoz','Álvarez','Romero','Alonso','Gutiérrez','Navarro','Torres','Domínguez','Vázquez','Ramos','Gil','Serrano','Blanco','Molina','Morales','Ortega','Delgado','Castro','Rubio','Marín','Sanz','Núñez','Iglesias','Medina','Garrido','Castillo','Santos','Lozano','Guerrero','Cano','Prieto','Méndez','Cruz','Calvo','Gallego','Vidal','León','Herrera','Márquez','Cabrera','Campos','Vega','Fuentes','Carrasco','Caballero','Nieto','Reyes','Aguilar','Pascual','Herrero','Montero','Lorenzo','Hidalgo','Ibáñez','Ferrer','Durán','Benítez','Vicente','Arias','Carmona','Crespo','Román','Pastor','Soto','Sáez','Velasco','Soler','Moya','Esteban','Parra','Bravo','Gallardo','Rojas','Ríos','Pardo','Merino','Franco','Mendoza','Redondo','Bermejo','Cifuentes','Lara','Palacios','Valero','Peña','Salas','Trujillo','Costa','Silva','Pereira','Oliveira','Cardoso','Ferreira','Machado','Rossi','Ferrari','Esposito','Ricci','Greco','Conti','Dubois','Laurent','Marchal','Keller','Wagner','Becker','Hoffmann','Novak','Kovač','Petrović','Jurić','Szabó','Kovács','Dembele','Traoré','Keita','Diallo','Camara','Ndiaye','Sarr','Owusu','Adeyemi','Okafor','Musa','Bello','Yilmaz','Demir','Kaya','Çelik','Petit','Moreau','Girard','Lambert','Renard','Soto','Vera','Cáceres','Godín','Suárez','Olivera','Ugarte','Bentancur','Giménez','Barrios','Villalba','Enciso','Domínguez','Balbuena','Almirón','Sanabria'];

DATA.NACIONALIDADES = [
  { pais: 'España', peso: 55 },
  { pais: 'Francia', peso: 8 }, { pais: 'Brasil', peso: 7 }, { pais: 'Argentina', peso: 6 },
  { pais: 'Portugal', peso: 4 }, { pais: 'Italia', peso: 4 }, { pais: 'Uruguay', peso: 3 },
  { pais: 'Croacia', peso: 2 }, { pais: 'Marruecos', peso: 2 }, { pais: 'Senegal', peso: 2 },
  { pais: 'Colombia', peso: 2 }, { pais: 'Serbia', peso: 1 }, { pais: 'Turquía', peso: 1 }, { pais: 'Ghana', peso: 1 }
];

// ---------- ESCUDOS OFICIALES (Transfermarkt) ----------
// verein-id de cada equipo en transfermarkt.es -> wappen/medium/{id}.png
DATA.TM_WAPPEN = {
  1: 'https://img.a.transfermarkt.technology/wappen/medium/131.png',
  2: 'https://img.a.transfermarkt.technology/wappen/medium/418.png',
  3: 'https://img.a.transfermarkt.technology/wappen/medium/13.png',
  4: 'https://img.a.transfermarkt.technology/wappen/medium/1050.png',
  5: 'https://img.a.transfermarkt.technology/wappen/medium/150.png',
  6: 'https://img.a.transfermarkt.technology/wappen/medium/621.png',
  7: 'https://img.a.transfermarkt.technology/wappen/medium/681.png',
  8: 'https://img.a.transfermarkt.technology/wappen/medium/1049.png',
  9: 'https://img.a.transfermarkt.technology/wappen/medium/940.png',
  10: 'https://img.a.transfermarkt.technology/wappen/medium/3709.png',
  11: 'https://img.a.transfermarkt.technology/wappen/medium/367.png',
  12: 'https://img.a.transfermarkt.technology/wappen/medium/714.png',
  13: 'https://img.a.transfermarkt.technology/wappen/medium/368.png',
  14: 'https://img.a.transfermarkt.technology/wappen/medium/331.png',
  15: 'https://img.a.transfermarkt.technology/wappen/medium/1108.png',
  16: 'https://img.a.transfermarkt.technology/wappen/medium/3368.png',
  17: 'https://img.a.transfermarkt.technology/wappen/medium/1531.png',
  18: 'https://img.a.transfermarkt.technology/wappen/medium/630.png',
  19: 'https://img.a.transfermarkt.technology/wappen/medium/1084.png',
  20: 'https://img.a.transfermarkt.technology/wappen/medium/897.png',
  21: 'https://img.a.transfermarkt.technology/wappen/medium/237.png',
  22: 'https://img.a.transfermarkt.technology/wappen/medium/12321.png',
  23: 'https://img.a.transfermarkt.technology/wappen/medium/2497.png',
  24: 'https://img.a.transfermarkt.technology/wappen/medium/472.png',
  25: 'https://img.a.transfermarkt.technology/wappen/medium/366.png',
  26: 'https://img.a.transfermarkt.technology/wappen/medium/1244.png',
  27: 'https://img.a.transfermarkt.technology/wappen/medium/3302.png',
  28: 'https://img.a.transfermarkt.technology/wappen/medium/2448.png',
  29: 'https://img.a.transfermarkt.technology/wappen/medium/1533.png',
  30: 'https://img.a.transfermarkt.technology/wappen/medium/16795.png',
  31: 'https://img.a.transfermarkt.technology/wappen/medium/2687.png',
  32: 'https://img.a.transfermarkt.technology/wappen/medium/648.png',
  33: 'https://img.a.transfermarkt.technology/wappen/medium/2502.png',
  34: 'https://img.a.transfermarkt.technology/wappen/medium/1536.png',
  35: 'https://img.a.transfermarkt.technology/wappen/medium/993.png',
  36: 'https://img.a.transfermarkt.technology/wappen/medium/1532.png',
  37: 'https://img.a.transfermarkt.technology/wappen/medium/10718.png',
  38: 'https://img.a.transfermarkt.technology/wappen/medium/8568.png',
  39: 'https://img.a.transfermarkt.technology/wappen/medium/12567.png',
  40: 'https://img.a.transfermarkt.technology/wappen/medium/11422.png',
  41: 'https://img.a.transfermarkt.technology/wappen/medium/9899.png',
  42: 'https://img.a.transfermarkt.technology/wappen/medium/8733.png'
};

// ---------- FORMACIONES ----------
DATA.FORMACIONES = {
  '4-4-2': [
    { pos: 'POR', x: 50, y: 92 }, { pos: 'DEF', x: 15, y: 72 }, { pos: 'DEF', x: 38, y: 76 },
    { pos: 'DEF', x: 62, y: 76 }, { pos: 'DEF', x: 85, y: 72 }, { pos: 'MED', x: 15, y: 45 },
    { pos: 'MED', x: 38, y: 50 }, { pos: 'MED', x: 62, y: 50 }, { pos: 'MED', x: 85, y: 45 },
    { pos: 'DEL', x: 38, y: 18 }, { pos: 'DEL', x: 62, y: 18 }
  ],
  '4-3-3': [
    { pos: 'POR', x: 50, y: 92 }, { pos: 'DEF', x: 15, y: 72 }, { pos: 'DEF', x: 38, y: 76 },
    { pos: 'DEF', x: 62, y: 76 }, { pos: 'DEF', x: 85, y: 72 }, { pos: 'MED', x: 28, y: 52 },
    { pos: 'MED', x: 50, y: 46 }, { pos: 'MED', x: 72, y: 52 }, { pos: 'DEL', x: 18, y: 20 },
    { pos: 'DEL', x: 50, y: 14 }, { pos: 'DEL', x: 82, y: 20 }
  ],
  '4-2-3-1': [
    { pos: 'POR', x: 50, y: 92 }, { pos: 'DEF', x: 15, y: 72 }, { pos: 'DEF', x: 38, y: 76 },
    { pos: 'DEF', x: 62, y: 76 }, { pos: 'DEF', x: 85, y: 72 }, { pos: 'MED', x: 38, y: 58 },
    { pos: 'MED', x: 62, y: 58 }, { pos: 'MED', x: 18, y: 36 }, { pos: 'MED', x: 50, y: 38 },
    { pos: 'MED', x: 82, y: 36 }, { pos: 'DEL', x: 50, y: 14 }
  ],
  '3-5-2': [
    { pos: 'POR', x: 50, y: 92 }, { pos: 'DEF', x: 28, y: 76 }, { pos: 'DEF', x: 50, y: 78 },
    { pos: 'DEF', x: 72, y: 76 }, { pos: 'MED', x: 10, y: 50 }, { pos: 'MED', x: 32, y: 52 },
    { pos: 'MED', x: 50, y: 44 }, { pos: 'MED', x: 68, y: 52 }, { pos: 'MED', x: 90, y: 50 },
    { pos: 'DEL', x: 38, y: 18 }, { pos: 'DEL', x: 62, y: 18 }
  ],
  '5-3-2': [
    { pos: 'POR', x: 50, y: 92 }, { pos: 'DEF', x: 10, y: 66 }, { pos: 'DEF', x: 30, y: 76 },
    { pos: 'DEF', x: 50, y: 78 }, { pos: 'DEF', x: 70, y: 76 }, { pos: 'DEF', x: 90, y: 66 },
    { pos: 'MED', x: 28, y: 48 }, { pos: 'MED', x: 50, y: 44 }, { pos: 'MED', x: 72, y: 48 },
    { pos: 'DEL', x: 38, y: 18 }, { pos: 'DEL', x: 62, y: 18 }
  ],
  '3-4-3': [
    { pos: 'POR', x: 50, y: 92 }, { pos: 'DEF', x: 28, y: 76 }, { pos: 'DEF', x: 50, y: 78 },
    { pos: 'DEF', x: 72, y: 76 }, { pos: 'MED', x: 12, y: 52 }, { pos: 'MED', x: 38, y: 50 },
    { pos: 'MED', x: 62, y: 50 }, { pos: 'MED', x: 88, y: 52 }, { pos: 'DEL', x: 20, y: 20 },
    { pos: 'DEL', x: 50, y: 14 }, { pos: 'DEL', x: 80, y: 20 }
  ]
};

DATA.MENTALIDADES = {
  muy_defensiva: { nom: 'Muy defensiva', atk: -12, def: 10 },
  defensiva:     { nom: 'Defensiva',     atk: -6,  def: 5 },
  equilibrada:   { nom: 'Equilibrada',   atk: 0,   def: 0 },
  ofensiva:      { nom: 'Ofensiva',      atk: 6,   def: -5 },
  muy_ofensiva:  { nom: 'Muy ofensiva',  atk: 12,  def: -10 }
};

// ---------- COMENTARIOS DE PARTIDO ----------
DATA.COMENTARIOS = {
  oportunidad: [
    '{j} encara la portería y dispara...',
    'Gran pase filtrado para {j}, que se planta solo...',
    '{j} remata desde la frontal del área...',
    'Centro medido al área y {j} la pelea...',
    '{j} prueba suerte desde lejos...'
  ],
  gol: [
    '¡GOOOOL de {eq}! {j} bate al portero. ¡Delirio en el estadio!',
    '¡GOL! {j} marca para el {eq}. El estadio estalla.',
    '¡GOOOL! {j} no falla ante la portería rival.',
    '¡Golazo de {j}! El {eq} hace vibrar a su afición.',
    '¡GOL de {eq}! {j} fusila la portería.'
  ],
  parada: [
    '¡Qué paradón del portero ante el remate de {j}!',
    '{j} dispara pero el portero vuela y despeja.',
    'La saca el portero con la punta de los dedos.',
    'Disparo de {j} que se estrella en el cuerpo del portero.'
  ],
  fuera: [
    '{j} dispara fuera por muy poco.',
    'El remate de {j} se marcha rozando el palo.',
    '{j} la manda a las nubes.'
  ],
  poste: [
    '¡¡PALO!! El disparo de {j} se estrella en la madera.',
    '{j} remata y el balón pega en el poste. Increíble.'
  ],
  amarilla: [
    'Tarjeta amarilla para {j} por una entrada dura.',
    'El árbitro amonesta a {j}.',
    '{j} ve la amarilla por frenar el contraataque.'
  ],
  roja: [
    '¡ROJA DIRECTA! Expulsado {j}. Se queda con diez el {eq}!',
    '¡Segunda amarilla! {j} es expulsado.',
    '¡Expulsado {j}! Protestó con demasiada contundencia.'
  ],
  lesion: [
    '{j} se queda tumbado en el césped... no puede continuar.',
    'Malas noticias: {j} se lesiona y deberá ser sustituido.'
  ],
  inicio: [
    '¡Comienza el partido en {est}! Rueda el balón.',
    '¡Arranca el encuentro entre {eq1} y {eq2}!',
    'Saque inicial. Ambiente espectacular en {est}.'
  ],
  descanso: ['Llegamos al descanso. Los jugadores se van a vestuarios.'],
  minuto: [
    'El partido se rompe por bandas.',
    'Dominio territorial del equipo local.',
    'Los dos equipos se estudian en el centro del campo.',
    'Buena presión del equipo visitante.',
    'El balón viaja de área a área sin claridad.',
    'Córner para el equipo atacante.',
    'El público empuja a su equipo.'
  ]
};

// Objetivo de la directiva según rango esperado
DATA.OBJETIVOS = (rank, total) => {
  if (rank <= 2) return { min: 1, max: 3, texto: 'Luchar por el título' };
  if (rank <= Math.ceil(total * 0.3)) return { min: 3, max: Math.ceil(total * 0.35), texto: 'Puestos de Europa / Ascenso' };
  if (rank <= Math.ceil(total * 0.6)) return { min: Math.ceil(total * 0.25), max: Math.ceil(total * 0.75), texto: 'Mitad alta de la tabla' };
  if (rank <= Math.ceil(total * 0.85)) return { min: Math.ceil(total * 0.5), max: total - 2, texto: 'La permanencia' };
  return { min: total - 5, max: total, texto: 'Evitar el descenso' };
};
