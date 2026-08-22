/* ============================================================
   PC Fútbol 2026 - Sincroniza plantillas con Transfermarkt.
   Fuente principal: https://www.transfermarkt.es (plantillas de
   la temporada en curso, 1ª y 2ª División española).

   - Resuelve el verein-id de cada club vía las páginas de liga
     ES1/ES2 y empareja por nombre con DATA.EQUIPOS (data.js).
   - De cada página de club extrae: nombre, posición, edad,
     nacionalidad de los jugadores de la plantilla principal.
   - Conserva la media (m) del jugador si ya existía en
     plantillas.js; si es nuevo usa STARS (scraper-squads.mjs)
     o estimación por str del equipo.

   Uso:  node scripts/sync-transfermarkt.mjs [ids separados por coma] [--dry]
   Genera public/pcfutbol/js/plantillas.js
   ============================================================ */

const UA = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'accept-language': 'es-ES,es;q=0.9'
};
const BASE = 'https://www.transfermarkt.es';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const LIGAS = [
  { div: 1, url: `${BASE}/laliga/startseite/wettbewerb/ES1` },
  { div: 2, url: `${BASE}/segunda-division/startseite/wettbewerb/ES2` }
];

// Emparejado manual para nombres ambiguos o ausentes en las páginas de liga
// (nombre en data.js -> verein-id de Transfermarkt)
const OVERRIDES = {
  'Racing Santander': '630',
  'Depor La Coruña': '897'
};

// ---------- utilidades ----------
function quitarAcentos(s) { return s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }

function normNombre(s) {
  // 'b' se conserva para distinguir filiales (p. ej. "Real Sociedad B")
  const STOP = new Set(['cf', 'fc', 'cd', 'ud', 'rc', 'ad', 'de', 'del', 'la', 'el', 'las', 'los', 'bp']);
  return quitarAcentos(String(s).toLowerCase())
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t && !STOP.has(t));
}

function similitud(a, b) {
  const A = new Set(a), B = new Set(b);
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  return inter / Math.max(A.size, B.size);
}

async function fetchText(url, intentos = 3) {
  let last;
  for (let i = 0; i < intentos; i++) {
    try {
      const res = await fetch(url, { headers: UA });
      if (res.status === 429 || res.status === 503) throw new Error(`HTTP ${res.status} (rate limit)`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) { last = e; await sleep(1200 * (i + 1)); }
  }
  throw last;
}

// ---------- lectura de archivos locales ----------
async function cargarLocales() {
  const fs = await import('node:fs');
  const ruta = p => new URL(p, import.meta.url);

  // Equipos desde data.js
  const dataJs = fs.readFileSync(ruta('../public/pcfutbol/js/data.js'), 'utf8');
  const equipos = [...dataJs.matchAll(/\{\s*id:\s*(\d+),\s*nom:\s*'([^']+)'[^}]*str:\s*(\d+),\s*div:\s*(\d)/g)]
    .map(m => ({ id: +m[1], nom: m[2], str: +m[3], div: +m[4] }));

  // Medias previas desde plantillas.js
  let previas = {};
  try {
    const s = fs.readFileSync(ruta('../public/pcfutbol/js/plantillas.js'), 'utf8');
    previas = JSON.parse(s.slice(s.indexOf('=', s.indexOf('DATA.PLANTILLAS')) + 1, s.lastIndexOf(';')));
  } catch { /* sin datos previos */ }
  const mediaPrevia = {};
  for (const lista of Object.values(previas))
    for (const j of lista || []) mediaPrevia[normNombre(j.n).join(' ')] = j.m;

  // Valoraciones manuales (bloque STARS de scraper-squads.mjs)
  let STARS = {};
  try {
    const src = fs.readFileSync(ruta('./scraper-squads.mjs'), 'utf8');
    const ini = src.indexOf('const STARS = {');
    const fin = src.indexOf('};', ini);
    STARS = new Function(`return (${src.slice(src.indexOf('{', ini), fin + 1)})`)();
  } catch { /* seguimos sin overrides */ }

  const salida = ruta('../public/pcfutbol/js/plantillas.js');
  return { fs, equipos, mediaPrevia, STARS, salida };
}

// ---------- Transfermarkt ----------
// Clubes de cada liga: [{ id, nombre, href }]
async function obtenerClubesLiga(url) {
  const html = await fetchText(url);
  const clubes = new Map();
  for (const m of html.matchAll(/<a([^>]*?)href="(\/[a-z0-9\-]+\/startseite\/verein\/\d+)[^"]*"([^>]*)>([\s\S]*?)<\/a>/g)) {
    const base = '/' + m[2].split('/').filter(Boolean).slice(0, 4).join('/'); // /slug/startseite/verein/ID
    const id = base.split('/').pop();
    let nombre = m[4].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!nombre) { const t = (m[1] + m[3]).match(/title="([^"]+)"/); if (t) nombre = t[1].trim(); }
    if (!nombre || nombre.length < 3) continue;
    if (!clubes.has(base) || clubes.get(base).nombre.length < nombre.length)
      clubes.set(base, { id, nombre, href: base });
  }
  return [...clubes.values()];
}

function resolverClub(equipo, clubes) {
  if (OVERRIDES[equipo.nom]) {
    const id = OVERRIDES[equipo.nom];
    // TM resuelve por verein-id aunque el slug no coincida
    return clubes.find(c => c.id === id) || { id, nombre: equipo.nom, href: `/-/startseite/verein/${id}` };
  }
  const objetivo = normNombre(equipo.nom);
  let mejor = null, mejorScore = 0;
  for (const c of clubes) {
    const s = similitud(objetivo, normNombre(c.nombre));
    if (s > mejorScore) { mejorScore = s; mejor = c; }
  }
  return mejorScore >= 0.5 ? mejor : null;
}

// Fila de jugador en la página del club
const POS_CLASE = { bg_Torwart: 'POR', bg_Abwehr: 'DEF', bg_Mittelfeld: 'MED', bg_Sturm: 'DEL' };

function parsearPlantilla(html) {
  const filas = html.matchAll(/<tr class="(?:odd|even)"[\s\S]*?(?=<tr class="(?:odd|even)"|<\/tbody>)/g);
  const vistos = new Set(), out = [];
  for (const f of filas) {
    const fila = f[0];
    const clasePos = fila.match(/bg_(Torwart|Abwehr|Mittelfeld|Sturm)/);
    if (!clasePos) continue;
    const nomM = fila.match(/<a href="\/[^"]*\/profil\/spieler\/(\d+)"[^>]*>\s*([^<]+?)\s*</);
    if (!nomM) continue;
    const idTm = nomM[1];
    if (vistos.has(idTm)) continue;
    const edadM = fila.match(/(\d{2})\/(\d{2})\/(\d{4})\s*\((\d{1,2})\)/);
    if (!edadM) continue;

    // Datos extra para las fichas: dorsal, foto, bandera, posición detallada, valor de mercado
    const numM = fila.match(/<div class=rn_nummer>(\d+)<\/div>/);
    const imgM = fila.match(/data-src="(https:\/\/img\.a\.transfermarkt\.technology\/portrait\/[^"]+)"/);
    const flagM = fila.match(/<img[^>]*class="flaggenrahmen"[^>]*>/);
    let pais = null, flag = null;
    if (flagM) {
      const t = flagM[0].match(/title="([^"]+)"/); if (t) pais = t[1];
      const s = flagM[0].match(/src="([^"]+)"/); if (s) flag = s[1];
    }
    const posDetM = fila.match(/<\/a>\s*<\/td>\s*<\/tr>\s*<tr>\s*<td>\s*([^<]+?)\s*</);
    const vmM = fila.match(/class="rechts hauptlink"[^>]*>\s*<a[^>]*>\s*([^<]+?)\s*<\/a>/);

    const edad = parseInt(edadM[4], 10);
    if (edad < 15 || edad > 45) continue;
    vistos.add(idTm);
    out.push({
      n: nomM[2], pos: POS_CLASE['bg_' + clasePos[1]],
      ...(posDetM ? { posDet: posDetM[1] } : {}),
      e: edad, fnac: `${edadM[1]}/${edadM[2]}/${edadM[3]}`,
      ...(numM ? { num: parseInt(numM[1], 10) } : {}),
      ...(pais ? { p: pais } : {}), ...(flag ? { flag } : {}),
      ...(imgM ? { img: imgM[1] } : {}),
      ...(vmM ? { vm: vmM[1] } : {})
    });
  }
  return out.slice(0, 30); // plantilla principal
}

// ---------- main ----------
async function main() {
  const { fs, equipos, mediaPrevia, STARS, salida } = await cargarLocales();
  const soloIds = process.argv[2] && !process.argv[2].startsWith('--')
    ? process.argv[2].split(',').map(Number) : null;

  console.log('Descargando clubes de las ligas ES1/ES2...');
  const clubesPorDiv = {};
  for (const liga of LIGAS) {
    clubesPorDiv[liga.div] = await obtenerClubesLiga(liga.url);
    console.log(`  Div ${liga.div}: ${clubesPorDiv[liga.div].length} clubes <- ${liga.url}`);
    await sleep(400);
  }

  const hash01 = str => { let h = 5381; for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0; return h / 4294967296; };
  const clampMedia = v => Math.max(46, Math.min(93, Math.round(v)));
  const ordenPos = { POR: 0, DEF: 1, MED: 2, DEL: 3 };

  const plantillas = {};
  let totalJugadores = 0, equiposOk = 0;

  for (const equipo of equipos) {
    if (soloIds && !soloIds.includes(equipo.id)) continue;
    const otrasDiv = equipo.div === 1 ? 2 : 1;
    const club = resolverClub(equipo, [
      ...(clubesPorDiv[equipo.div] || []),
      ...(clubesPorDiv[otrasDiv] || [])
    ]);
    if (!club) { console.log(`[${equipo.id}] SIN MATCH en TM para "${equipo.nom}"`); continue; }

    let jugadores = [];
    try {
      const html = await fetchText(`${BASE}${club.href}`);
      jugadores = parsearPlantilla(html);
    } catch (e) { console.log(`[${equipo.id}] fallo descarga ${club.nombre}: ${e.message}`); continue; }

    if (jugadores.length < 14) { console.log(`[${equipo.id}] ${club.nombre}: solo ${jugadores.length} jugadores, se descarta`); continue; }

    // Media: previa > STARS > estimación por str del equipo
    for (const j of jugadores) {
      const clave = normNombre(j.n).join(' ');
      if (STARS[j.n]) j.m = STARS[j.n];
      else if (mediaPrevia[clave]) j.m = mediaPrevia[clave];
      else {
        const r1 = hash01('m1:' + j.n), r2 = hash01('m2:' + j.n);
        const jitter = Math.round(r1 * 9) - 5 + (r2 < 0.15 ? 2 : 0);
        j.m = clampMedia(equipo.str + jitter + (j.pos === 'POR' ? 0 : 1));
      }
    }
    jugadores.sort((a, b) => ordenPos[a.pos] - ordenPos[b.pos] || b.m - a.m || a.n.localeCompare(b.n));

    // Formato final: n, pos, posDet, e, fnac, num, p (país), flag, img, vm, m
    plantillas[equipo.id] = jugadores.map(j => ({ ...j, m: j.m }));

    equiposOk++;
    totalJugadores += jugadores.length;
    const sinEdad = jugadores.filter(j => !j.e).length;
    console.log(`[${equipo.id}] OK ${jugadores.length} jug. <- TM "${club.nombre}" (#${club.id})${sinEdad ? ` (${sinEdad} sin edad)` : ''}`);
    await sleep(450);
  }

  const cabecera = `/* ============================================================
   PC FÚTBOL 2026 - Plantillas reales temporada 2026-27
   Generado automáticamente desde Transfermarkt (fuente principal):
   https://www.transfermarkt.es
   n: nombre · pos: POR/DEF/MED/DEL · posDet: posición detallada ·
   e: edad · fnac: fecha nacimiento · num: dorsal · p: país ·
   flag: bandera · img: foto · vm: valor de mercado · m: media
   Última sincronización: ${new Date().toISOString().slice(0, 10)}
   ============================================================ */

DATA.PLANTILLAS = `;
  if (!process.argv.includes('--dry')) {
    fs.writeFileSync(salida, cabecera + JSON.stringify(plantillas) + ';\n', 'utf8');
  }
  console.log(`\nSincronizadas ${equiposOk}/${equipos.length} plantillas con ${totalJugadores} jugadores${process.argv.includes('--dry') ? ' (dry-run, no se escribe)' : ' -> public/pcfutbol/js/plantillas.js'}`);
}

main().catch(e => { console.error(e); process.exit(1); });
