/* ============================================================
   Extractor de plantillas reales 2026-27 para PC Fútbol.
   Fuentes por equipo:
     1) Página de temporada "2026–27 X season" (Wikipedia EN)
        - formato moderno {{Efs player2|pos=GK|nat=BEL|name=[[..]]}}
        - formato Barça    {{fb si player|pos=GK|nb=ESP|p=[[..]]|age={{Age|2001|5|4}}}}
     2) Respaldo: artículo del club (sección plantilla actual)
        - formato {{Fs player|no=1|nat=MKD|pos=GK|name=[[..]]}}
   Edades: inline cuando existe; si no, lote vía Wikidata (P569).
   Genera public/pcfutbol/js/plantillas.js
   ============================================================ */

const UA = { 'user-agent': 'pcfutbol-squad-scraper/1.0 (juego web amateur)' };
const sleep = ms => new Promise(r => setTimeout(r, ms));

// teamId -> candidatos de página de temporada (Wikipedia EN)
const TEAM_SEASON = {
  1: ['2026–27 FC Barcelona season'],
  2: ['2026–27 Real Madrid CF season'],
  3: ['2026–27 Atlético Madrid season'],
  4: ['2026–27 Villarreal CF season'],
  5: ['2026–27 Real Betis season'],
  6: ['2026–27 Athletic Bilbao season'],
  7: ['2026–27 Real Sociedad season'],
  8: ['2026–27 Valencia CF season'],
  9: ['2026–27 RC Celta de Vigo season'],
  10: ['2026–27 Getafe CF season'],
  11: ['2026–27 Rayo Vallecano season'],
  12: ['2026–27 RCD Espanyol season'],
  13: ['2026–27 Sevilla FC season'],
  14: ['2026–27 CA Osasuna season'],
  15: ['2026–27 Deportivo Alavés season'],
  16: ['2026–27 Levante UD season'],
  17: ['2026–27 Elche CF season'],
  18: ['2026–27 Racing Santander season', '2026–27 Racing de Santander season'],
  19: ['2026–27 Málaga CF season'],
  20: ['2026–27 Deportivo de La Coruña season', '2026–27 Deportivo La Coruña season'],
  21: ['2026–27 RCD Mallorca season'],
  22: ['2026–27 Girona FC season'],
  23: ['2026–27 Real Oviedo season'],
  24: ['2026–27 UD Las Palmas season'],
  25: ['2026–27 Real Valladolid season'],
  26: ['2026–27 CD Leganés season'],
  27: ['2026–27 UD Almería season'],
  28: ['2026–27 Sporting de Gijón season'],
  29: ['2026–27 SD Eibar season'],
  30: ['2026–27 Granada CF season'],
  31: ['2026–27 Cádiz CF season'],
  32: ['2026–27 CD Tenerife season'],
  33: ['2026–27 CD Castellón season'],
  34: ['2026–27 Burgos CF season'],
  35: ['2026–27 Córdoba CF season'],
  36: ['2026–27 Albacete Balompié season'],
  37: ['2026–27 FC Andorra season'],
  38: ['2026–27 AD Ceuta FC season'],
  39: ['2026–27 CD Eldense season'],
  40: ['2026–27 CE Sabadell FC season'],
  41: ['2026–27 Real Sociedad B season'],
  42: ['2026–27 Celta Fortuna season']
};

// teamId -> artículo del club (respaldo, plantilla actual)
const CLUB_ARTICLE = {
  1: 'FC Barcelona', 2: 'Real Madrid CF', 3: 'Atlético Madrid', 4: 'Villarreal CF',
  5: 'Real Betis', 6: 'Athletic Bilbao', 7: 'Real Sociedad', 8: 'Valencia CF',
  9: 'RC Celta de Vigo', 10: 'Getafe CF', 11: 'Rayo Vallecano', 12: 'RCD Espanyol',
  13: 'Sevilla FC', 14: 'CA Osasuna', 15: 'Deportivo Alavés', 16: 'Levante UD',
  17: 'Elche CF', 18: 'Racing de Santander', 19: 'Málaga CF', 20: 'Deportivo de A Coruña',
  21: 'RCD Mallorca', 22: 'Girona FC', 23: 'Real Oviedo', 24: 'UD Las Palmas',
  25: 'Real Valladolid', 26: 'CD Leganés', 27: 'UD Almería', 28: 'Sporting de Gijón',
  29: 'SD Eibar', 30: 'Granada CF', 31: 'Cádiz CF', 32: 'CD Tenerife',
  33: 'CD Castellón', 34: 'Burgos CF', 35: 'Córdoba CF', 36: 'Albacete Balompié',
  37: 'FC Andorra', 38: 'AD Ceuta FC', 39: 'CD Eldense', 40: 'CE Sabadell FC',
  41: 'Real Sociedad B', 42: 'Celta Fortuna'
};
const CLUB_ALT = { 42: ['RC Celta Fortuna', 'Celta de Vigo B'], 36: ['Albacete Balompié', 'Albacete BP'] };

// Valoraciones manuales (escala del juego) para jugadores reconocidos
const STARS = {
  // Barcelona
  'Lamine Yamal': 92, 'Pedri': 88, 'Rodri': 87, 'Raphinha': 86, 'Frenkie de Jong': 84,
  'Pau Cubarsí': 83, 'Ronald Araújo': 82, 'Jules Koundé': 84, 'Alejandro Balde': 81,
  'Dani Olmo': 83, 'Gavi': 82, 'Wojciech Szczęsny': 81, 'Joan Garcia': 83,
  'Anthony Gordon': 82, 'Karim Adeyemi': 81, 'João Cancelo': 80, 'Andreas Christensen': 78,
  'Fermín López': 79, 'Roony Bardghji': 74, 'Marc Bernal': 73, 'Marc Casadó': 76,
  'Gerard Martín': 73, 'Eric García': 75, 'Héctor Fort': 70,
  // Real Madrid
  'Kylian Mbappé': 91, 'Vinícius Júnior': 89, 'Jude Bellingham': 88, 'Thibaut Courtois': 88,
  'Federico Valverde': 86, 'Éder Militão': 84, 'Aurélien Tchouaméni': 84, 'Rodrygo': 85,
  'Trent Alexander-Arnold': 86, 'Ibrahima Konaté': 84, 'Marc Cucurella': 82, 'Dean Huijsen': 82,
  'Arda Güler': 83, 'Eduardo Camavinga': 83, 'Antonio Rüdiger': 82, 'Bernardo Silva': 85,
  'Denzel Dumfries': 82, 'Brahim Díaz': 81, 'Andriy Lunin': 79, 'Raúl Asencio': 78,
  'Endrick': 80, 'Franco Mastantuono': 79, 'Álvaro Carreras': 80, 'Carlos Espí': 72,
  'Yan Diomande': 76, 'Ferland Mendy': 78, 'Thiago Pitarch': 68,
  // Atlético
  'Julián Álvarez': 87, 'Julian Alvarez': 87, 'Antoine Griezmann': 84, 'Jan Oblak': 85,
  'Robin Le Normand': 82, 'José María Giménez': 81, 'Koke': 78, 'Marcos Llorente': 81,
  'Giuliano Simeone': 79, 'Nico Paz': 82, 'Álex Baena': 83,
  // Villarreal / Betis / Athletic / RSO / Valencia / Celta...
  'Gerard Moreno': 81, 'Juan Foyth': 80, 'Luiz Júnior': 80, 'Nicolas Pépé': 77,
  'Ayoze Pérez': 80, 'Thomas Partey': 80, 'Santi Comesaña': 78,
  'Isco': 83, 'Antony': 83, 'Giovani Lo Celso': 79, 'Pau López': 78, 'Marc Bartra': 75,
  'Nico Williams': 85, 'Iñaki Williams': 81, 'Unai Simón': 84, 'Oihan Sancet': 82,
  'Daniel Vivian': 80, 'Yeray Álvarez': 77, 'Mikel Jauregizar': 78,
  'Takefusa Kubo': 82, 'Mikel Oyarzabal': 83, 'Brais Méndez': 80, 'Álex Remiro': 82,
  'Igor Zubeldia': 79, 'Beñat Turrientes': 77,
  'Giorgi Mamardashvili': 83, 'José Gayà': 78, 'Hugo Duro': 77, 'Javi Guerra': 78,
  'Luis Rioja': 75, 'Umar Sadiq': 75, 'Arnaut Danjuma': 75, 'Stole Dimitrievski': 77,
  'Guido Rodríguez': 76, 'Mouctar Diakhaby': 75, 'André Almeida': 74,
  'Óscar Mingueza': 79, 'Iago Aspas': 78, 'Borja Iglesias': 76, 'Carl Starfelt': 75,
  'David Soria': 78, 'Christantus Uche': 76, 'Mauro Arambarri': 76,
  'Augusto Batalla': 77, 'Isi Palazón': 78, 'Jorge de Frutos': 77,
  'Marko Dmitrović': 76, 'Javi Puado': 79, 'Fernando Calero': 76,
  'Lucien Agoumé': 76, 'Dodi Lukébakio': 79, 'Isaac Romero': 76, 'Rubén Vargas': 77,
  'Sergio Herrera': 75, 'Ante Budimir': 78, 'Aimar Oroz': 78,
  'Antonio Blanco': 76, 'Carlos Vicente': 75, 'Antonio Sivera': 77,
  'Carlos Álvarez': 78, 'Iván Romero': 75, 'Mathew Ryan': 74, 'Andrea Belotti': 75
};

// Código FIFA -> país en español
const PAIS = {
  ESP: 'España', FRA: 'Francia', BRA: 'Brasil', ARG: 'Argentina', POR: 'Portugal',
  ITA: 'Italia', GER: 'Alemania', ENG: 'Inglaterra', SCO: 'Escocia', WAL: 'Gales',
  NIR: 'Irlanda del Norte', IRL: 'Irlanda', NED: 'Países Bajos', BEL: 'Bélgica',
  SUI: 'Suiza', AUT: 'Austria', DEN: 'Dinamarca', NOR: 'Noruega', SWE: 'Suecia',
  FIN: 'Finlandia', ISL: 'Islandia', POL: 'Polonia', CZE: 'Chequia', SVK: 'Eslovaquia',
  HUN: 'Hungría', ROU: 'Rumanía', BUL: 'Bulgaria', GRE: 'Grecia', TUR: 'Turquía',
  SRB: 'Serbia', CRO: 'Croacia', SVN: 'Eslovenia', BIH: 'Bosnia y Herzegovina',
  MKD: 'Macedonia del Norte', ALB: 'Albania', MNE: 'Montenegro', UKR: 'Ucrania',
  RUS: 'Rusia', GEO: 'Georgia', ARM: 'Armenia', AZE: 'Azerbaiyán', ISR: 'Israel',
  MAR: 'Marruecos', ALG: 'Argelia', TUN: 'Túnez', EGY: 'Egipto', SEN: 'Senegal',
  NGA: 'Nigeria', GHA: 'Ghana', CIV: 'Costa de Marfil', CMR: 'Camerún', MLI: 'Malí',
  GUI: 'Guinea', COD: 'RD Congo', RSA: 'Sudáfrica', CPV: 'Cabo Verde', GAB: 'Gabón',
  USA: 'Estados Unidos', MEX: 'México', CAN: 'Canadá', CRC: 'Costa Rica', HON: 'Honduras',
  COL: 'Colombia', URU: 'Uruguay', CHI: 'Chile', PAR: 'Paraguay', PER: 'Perú',
  VEN: 'Venezuela', ECU: 'Ecuador', BOL: 'Bolivia', JPN: 'Japón', KOR: 'Corea del Sur',
  AUS: 'Australia', IRN: 'Irán', KSA: 'Arabia Saudita', QAT: 'Catar', UZB: 'Uzbekistán',
  DOM: 'República Dominicana', PAN: 'Panamá', AND: 'Andorra', LUX: 'Luxemburgo',
  KOS: 'Kosovo', CYP: 'Chipre', KAZ: 'Kazajistán', NIG: 'Nigeriano', TOG: 'Togo',
  MOZ: 'Mozambique', ZIM: 'Zimbabue', GAM: 'Gambia', SLE: 'Sierra Leona', TAN: 'Tanzania'
};

const POS_MAP = { GK: 'POR', DF: 'DEF', MF: 'MED', FW: 'DEL' };

function hash01(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  return h / 4294967296;
}
function limpiarNombre(t) {
  return t.replace(/\s*\((?:footballer[^)]*|born [^)]*|soccer[^)]*)\)\s*/i, '').trim();
}

async function fetchText(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}
async function getRaw(title, intentos = 3) {
  const url = 'https://en.wikipedia.org/w/index.php?title=' + encodeURIComponent(title) + '&action=raw';
  let last;
  for (let i = 0; i < intentos; i++) {
    try { return await fetchText(url); }
    catch (e) { last = e; await sleep(1500 * (i + 1)); }
  }
  throw last;
}

// Extrae jugadores según el conjunto de plantillas presentes en el wikitexto
function extraerJugadores(texto) {
  const out = [];
  const vistos = new Set();
  const push = (pos, nombre, pais, edadInline, articulo) => {
    if (!POS_MAP[pos]) return;
    if (!nombre || vistos.has(nombre)) return;
    vistos.add(nombre);
    out.push({ n: nombre, pos: POS_MAP[pos], pais: pais || null, e: edadInline ?? null, articulo: articulo || null });
  };

  // 1) {{Efs player2|no=1 |pos=GK|nat=BEL|name=[[Nombre]] ...}}
  for (const m of texto.matchAll(/\{\{\s*Efs player2\s*\|([^{}]*)\}\}/g)) {
    const c = m[1];
    const posM = c.match(/pos\s*=\s*([A-Za-z]+)/);
    const nomM = c.match(/name\s*=\s*\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
    const natM = c.match(/nat\s*=\s*([A-Za-z]{3})/);
    if (posM && nomM) push(posM[1].toUpperCase(), (nomM[2] ? nomM[2] : limpiarNombre(nomM[1])).trim(),
      natM && PAIS[natM[1].toUpperCase()] ? PAIS[natM[1].toUpperCase()] : null, null, nomM[1].trim());
  }
  if (out.length >= 12) return out;

  // 2) {{fb si player |n=1 |pos=GK |nb=ESP |p=[[Joan Garcia]] |age={{Age|2001|5|4}} ...}}
  // (contiene sub-plantillas anidadas, así que se procesa línea a línea;
  // se descarta todo lo que venga después del filial/reservas)
  let textoSI = texto;
  const corte = textoSI.search(/={2,4}\s*(?:Reserve|B-team|Filial|Segundo equipo)/i);
  if (corte > 0) textoSI = textoSI.slice(0, corte);
  for (const linea of textoSI.split('\n')) {
    if (!/^\s*\{\{\s*fb si player\s*\|/.test(linea)) continue;
    const posM = linea.match(/pos\s*=\s*([A-Za-z]+)/);
    const nomM = linea.match(/p\s*=\s*\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
    const nbM = linea.match(/nb\s*=\s*([A-Za-z]{3})/);
    const edadM = linea.match(/age\s*=\s*\{\{Age\|(\d{4})/);
    if (posM && nomM) push(posM[1].toUpperCase(), (nomM[2] ? nomM[2] : limpiarNombre(nomM[1])).trim(),
      nbM && PAIS[nbM[1].toUpperCase()] ? PAIS[nbM[1].toUpperCase()] : null,
      edadM ? 2026 - parseInt(edadM[1], 10) : null, nomM[1].trim());
  }
  if (out.length >= 12) return out;

  // 3) {{Fs player|no=1|nat=MKD|pos=GK|name=[[Stole Dimitrievski]]}}
  // Solo el primer bloque de plantilla (el del primer equipo)
  let textoFS = texto;
  const finFs = textoFS.indexOf('{{Fs end}}');
  if (finFs > 0) textoFS = textoFS.slice(0, finFs);
  for (const m of textoFS.matchAll(/\{\{\s*Fs player\s*\|([^{}]*)\}\}/g)) {
    const c = m[1];
    const posM = c.match(/pos\s*=\s*([A-Za-z]+)/);
    const nomM = c.match(/name\s*=\s*\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
    const natM = c.match(/nat\s*=\s*([A-Za-z]{3})/);
    if (posM && nomM) push(posM[1].toUpperCase(), (nomM[2] ? nomM[2] : limpiarNombre(nomM[1])).trim(),
      natM && PAIS[natM[1].toUpperCase()] ? PAIS[natM[1].toUpperCase()] : null, null, nomM[1].trim());
  }
  return out;
}

// Edades faltantes vía Wikidata (fecha nacimiento P569), por lotes
async function resolverEdades(jugadores) {
  const pendientes = [...new Set(jugadores.filter(j => j.e == null && j.articulo).map(j => j.articulo))];
  const edades = {};
  const CHUNK = 40;
  for (let i = 0; i < pendientes.length; i += CHUNK) {
    const lote = pendientes.slice(i, i + CHUNK);
    const url = 'https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&format=json&props=claims|sitelinks&normalize=1&titles=' +
      encodeURIComponent(lote.join('|'));
    try {
      const data = JSON.parse(await fetchText(url));
      for (const ent of Object.values(data.entities || {})) {
        if (!ent || ent.missing === '' || !ent.claims || !ent.claims.P569) continue;
        const snak = ent.claims.P569.find(c => c.mainsnak && c.mainsnak.datavalue)?.mainsnak;
        if (!snak) continue;
        const anio = parseInt(String(snak.datavalue.value.time).slice(1, 5), 10);
        if (!anio || anio < 1970 || anio > 2012) continue;
        const clave = ent.sitelinks?.enwiki?.title || ent.id;
        edades[clave] = 2026 - anio;
      }
    } catch (e) {
      console.error('  lote Wikidata falló:', e.message);
    }
    await sleep(150);
  }
  for (const j of jugadores) {
    if (j.e == null) j.e = edades[j.articulo] ?? (21 + Math.floor(hash01('edad:' + j.n) * 14));
    delete j.articulo;
    if (!j.pais) j.pais = 'España';
  }
}

async function main() {
  const fs = await import('node:fs');
  // Filtrado opcional por ids (p. ej. "20,42") y fusión con lo ya generado
  const soloIds = process.argv[2] ? process.argv[2].split(',').map(Number) : null;
  const rutaSalida = new URL('../public/pcfutbol/js/plantillas.js', import.meta.url);
  let plantillas = {};
  if (fs.existsSync(rutaSalida)) {
    try {
      const previo = fs.readFileSync(rutaSalida, 'utf8');
      const marca = previo.indexOf('DATA.PLANTILLAS');
      plantillas = JSON.parse(previo.slice(previo.indexOf('=', marca) + 1, previo.lastIndexOf(';')));
    } catch { /* empezamos de cero */ }
  }
  let equiposOk = Object.keys(plantillas).length, totalJugadores = Object.values(plantillas).reduce((s, p) => s + p.length, 0);

  for (const id of Object.keys(CLUB_ARTICLE).map(Number)) {
    if (soloIds && !soloIds.includes(id)) continue;
    if (plantillas[id]) continue;
    let jugadores = [];
    let fuente = '';

    // Fuente 1: página de temporada
    for (const titulo of TEAM_SEASON[id] || []) {
      try {
        const texto = await getRaw(titulo);
        jugadores = extraerJugadores(texto);
        if (jugadores.length >= 12) { fuente = titulo; break; }
      } catch { /* siguiente candidato */ }
      await sleep(350);
    }

    // Fuente 2: artículo del club
    if (!fuente) {
      const candidatos = CLUB_ALT[id] || [CLUB_ARTICLE[id]];
      for (const titulo of candidatos) {
        try {
          const texto = await getRaw(titulo);
          jugadores = extraerJugadores(texto);
          if (jugadores.length >= 12) { fuente = titulo + ' (artículo club)'; break; }
          console.log(`[${id}] "${titulo}": solo ${jugadores.length} jugadores`);
        } catch (e) {
          console.log(`[${id}] fallo "${titulo}": ${e.message}`);
        }
        await sleep(350);
      }
    }

    if (!jugadores.length) { console.log(`[${id}] SIN DATOS`); continue; }

    await resolverEdades(jugadores);
    plantillas[id] = jugadores;
    equiposOk++;
    totalJugadores += jugadores.length;
    console.log(`[${id}] OK ${jugadores.length} jugadores <- ${fuente}`);
    await sleep(250);
  }

  // Media estimada para quien no tiene override manual
  const dataJs = fs.readFileSync(new URL('../public/pcfutbol/js/data.js', import.meta.url), 'utf8');
  const STR = {};
  for (const mm of dataJs.matchAll(/id:\s*(\d+),\s*nom:\s*'([^']+)'[^}]*str:\s*(\d+)/g)) STR[mm[1]] = parseInt(mm[3], 10);
  const clampMedia = v => Math.max(46, Math.min(93, Math.round(v)));
  for (const [id, js] of Object.entries(plantillas)) {
    const str = STR[id] ?? 60;
    for (const j of js) {
      if (STARS[j.n]) { j.m = STARS[j.n]; continue; }
      const r1 = hash01('m1:' + j.n), r2 = hash01('m2:' + j.n);
      const jitter = Math.round(r1 * 9) - 5 + (r2 < 0.15 ? 2 : 0);
      j.m = clampMedia(str + jitter + (j.pos === 'POR' ? 0 : 1));
    }
  }

  const cabecera = `/* ============================================================
   PC FÚTBOL 2026 - Plantillas reales temporada 2026-27
   Generado automáticamente desde Wikipedia/Wikidata.
   n: nombre · pos: POR/DEF/MED/DEL · e: edad · p: país · m: media
   ============================================================ */

DATA.PLANTILLAS = `;
  fs.writeFileSync(rutaSalida, cabecera + JSON.stringify(plantillas) + ';\n', 'utf8');
  console.log(`\nGeneradas ${equiposOk}/42 plantillas con ${totalJugadores} jugadores -> public/pcfutbol/js/plantillas.js`);
}

main().catch(e => { console.error(e); process.exit(1); });
