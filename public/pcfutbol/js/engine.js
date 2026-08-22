/* ============================================================
   PC FÚTBOL 2026 - Motor (núcleo)
   Nueva partida, jugadores, calendario, clasificación,
   ratings y simulación de partidos
   ============================================================ */

/* ---------- Utilidades aleatorias ---------- */
function rnd(min, max) { return Math.random() * (max - min) + min; }
function rndInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function fmtM(n) {
  const s = n < 0 ? '-' : '';
  n = Math.abs(n);
  if (n >= 1e9) return s + (n / 1e9).toFixed(2) + 'B€';
  if (n >= 1e6) return s + (n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1).replace('.0', '') + 'M€';
  if (n >= 1e3) return s + Math.round(n / 1e3) + 'K€';
  return s + Math.round(n) + '€';
}

const ENGINE = {};

/* ============================================================
   GENERACIÓN DE JUGADORES
   ============================================================ */
ENGINE.paisAleatorio = function () {
  const total = DATA.NACIONALIDADES.reduce((s, n) => s + n.peso, 0);
  let r = Math.random() * total;
  for (const n of DATA.NACIONALIDADES) { r -= n.peso; if (r <= 0) return n.pais; }
  return 'España';
};

ENGINE.nombreAleatorio = function (pais) {
  const nom = (pais === 'España' && Math.random() < 0.05) ? pick(DATA.NOMBRES_M) : pick(DATA.NOMBRES_H);
  return nom + ' ' + pick(DATA.APELLIDOS);
};

ENGINE.nuevoJugador = function (strEquipo, pos, edadMin, edadMax) {
  const edad = rndInt(edadMin ?? 18, edadMax ?? 35);
  const base = clamp(strEquipo + rndInt(-9, 9), 40, 96);
  const v = () => clamp(base + rndInt(-10, 10), 25, 99);
  const j = {
    id: null, nombre: '', pos,
    edad,
    pais: ENGINE.paisAleatorio(),
    attrs: { rit: v(), tec: v(), pase: v(), reg: v(), def: v(), fis: v(), por: 25 }
  };
  if (pos === 'POR') {
    j.attrs.por = clamp(base + rndInt(-6, 8), 30, 97);
    j.attrs.def = rndInt(20, 40);
  } else if (pos === 'DEF') {
    j.attrs.def = clamp(base + rndInt(-4, 10), 30, 98);
  } else if (pos === 'DEL') {
    j.attrs.reg = clamp(j.attrs.reg + rndInt(0, 8), 25, 99);
    j.attrs.def = rndInt(15, 45);
  } else {
    j.attrs.pase = clamp(j.attrs.pase + rndInt(0, 8), 25, 99);
  }
  j.media = ENGINE.calcMedia(j);
  j.potencial = edad <= 21 ? clamp(j.media + rndInt(4, 22), j.media, 96)
    : edad <= 25 ? clamp(j.media + rndInt(0, 12), j.media, 95)
      : j.media;
  j.valor = ENGINE.calcValor(j);
  j.salario = Math.max(300, Math.round(j.valor * rnd(0.00055, 0.0011) / 100) * 100);
  j.contrato = rndInt(1, 5);
  j.moral = rndInt(60, 95);
  j.forma = rndInt(70, 92);   // condición física
  j.racha = rndInt(45, 85);   // estado de forma deportivo
  j.goles = 0; j.asist = 0; j.paradas = 0; j.partidos = 0;
  j.amarillas = 0; j.rojas = 0;
  j.lesion = 0; j.sancion = 0;
  j.enVenta = false;
  j.golesTemp = {};
  return j;
};

ENGINE.calcMedia = function (j) {
  const a = j.attrs;
  if (j.pos === 'POR') return Math.round(a.por * 0.75 + a.fis * 0.15 + a.tec * 0.10);
  if (j.pos === 'DEF') return Math.round(a.def * 0.45 + a.fis * 0.20 + a.rit * 0.12 + a.pase * 0.13 + a.tec * 0.10);
  if (j.pos === 'MED') return Math.round(a.pase * 0.28 + a.tec * 0.20 + a.rit * 0.15 + a.reg * 0.14 + a.fis * 0.13 + a.def * 0.10);
  return Math.round(a.reg * 0.24 + a.rit * 0.22 + a.tec * 0.20 + a.fis * 0.18 + a.pase * 0.16);
};

ENGINE.calcValor = function (j) {
  let val = Math.pow(Math.max(j.media - 40, 1), 2.35) * 5200;
  if (j.edad <= 23) val *= 1.45;
  else if (j.edad <= 27) val *= 1.25;
  else if (j.edad >= 34) val *= 0.38;
  else if (j.edad >= 31) val *= 0.62;
  if (j.potencial > j.media + 5) val *= 1.18;
  return Math.round(val / 10000) * 10000;
};

// Sube o baja atributos uno a uno hasta que la media del jugador coincida
// con el valor objetivo (usado para calcar jugadores reales).
ENGINE.ajustarMedia = function (j, objetivo) {
  objetivo = clamp(Math.round(objetivo), 35, 96);
  let guard = 0;
  while (j.media !== objetivo && guard++ < 150) {
    const dir = j.media < objetivo ? 1 : -1;
    const cands = Object.keys(j.attrs).filter(a =>
      (a === 'por' ? j.pos === 'POR' : j.pos !== 'POR') &&
      (dir > 0 ? j.attrs[a] < 97 : j.attrs[a] > 24));
    if (!cands.length) break;
    const attr = cands[Math.floor(Math.random() * cands.length)];
    j.attrs[attr] += dir;
    j.media = ENGINE.calcMedia(j);
  }
};

ENGINE.canterano = function (st, teamId) {
  const t = st.teams[teamId];
  const pos = pick(['POR', 'DEF', 'DEF', 'MED', 'MED', 'MED', 'DEL', 'DEL']);
  const j = ENGINE.nuevoJugador(clamp(t.str - rndInt(4, 14), 40, 88), pos, 17, 20);
  j.id = st.seq++;
  j.equipo = teamId;
  j.contrato = rndInt(2, 4);
  j.salario = Math.max(200, Math.round(j.salario * 0.35 / 100) * 100);
  let dup = true, n = 0;
  while (dup && n++ < 50) { j.nombre = ENGINE.nombreAleatorio(j.pais); dup = st.players.some(p => p.nombre === j.nombre); }
  st.players.push(j);
  return j;
};

/* ============================================================
   NUEVA PARTIDA
   ============================================================ */
ENGINE.nuevaPartida = function (nombreManager, teamId) {
  const st = {
    version: 1,
    managerName: nombreManager,
    userTeam: teamId,
    anio: 2026,
    jornada: 1,
    seq: 1,
    teams: {},
    players: [],
    libres: [],
    fixtures: {},
    copa: null,
    tactics: {},
    entrenamiento: 'equilibrado',
    finanzas: {},
    patrocinador: 0,
    noticias: [],
    ofertasRecibidas: [],
    finTemporada: false,
    despedido: false
  };

  for (const e of DATA.EQUIPOS) {
    st.teams[e.id] = {
      ...e,
      saldo: e.div === 1 ? rndInt(20, 120) * 1e6 : rndInt(4, 25) * 1e6,
      presup: e.div === 1 ? rndInt(15, 90) * 1e6 : rndInt(3, 18) * 1e6,
      lastResults: [],
      titulos: 0
    };
  }

  // Plantillas: reales (DATA.PLANTILLAS, temporada 2026-27) si existen;
  // si no, generadas. Relleno hasta el mínimo por posición en ambos casos.
  const usados = new Set(DATA.PLANTILLAS ? Object.values(DATA.PLANTILLAS).flat().map(r => r.n) : []);
  for (const e of DATA.EQUIPOS) {
    const real = DATA.PLANTILLAS && DATA.PLANTILLAS[e.id];
    if (real) {
      for (const r of real) {
        const j = ENGINE.nuevoJugador(e.str, r.pos, r.e, Math.max(r.e ?? 18, 18));
        j.id = st.seq++;
        j.equipo = e.id;
        j.nombre = r.n;
        if (r.p) j.pais = r.p;
        ENGINE.ajustarMedia(j, r.m ?? clamp(e.str - rndInt(2, 9), 40, 90));
        st.players.push(j);
      }
    } else {
      const dist = [['POR', 3], ['DEF', 8], ['MED', 8], ['DEL', 5]];
      for (const [pos, n] of dist) {
        for (let i = 0; i < n; i++) {
          const j = ENGINE.nuevoJugador(e.str, pos, e.str > 80 ? 20 : 19, 36);
          j.equipo = e.id;
          let intentos = 0;
          do { j.nombre = ENGINE.nombreAleatorio(j.pais); intentos++; } while (usados.has(j.nombre) && intentos < 50);
          usados.add(j.nombre);
          st.players.push(j);
        }
      }
      continue;
    }
    // Mínimos de posición para plantillas reales cortas
    const minimo = [['POR', 2], ['DEF', 7], ['MED', 7], ['DEL', 4]];
    for (const [pos, min] of minimo) {
      let n = st.players.filter(p => p.equipo === e.id && p.pos === pos).length;
      while (n < min) {
        const j = ENGINE.nuevoJugador(clamp(e.str - rndInt(3, 10), 40, 88), pos, 18, 33);
        j.id = st.seq++;
        j.equipo = e.id;
        let intentos = 0;
        do { j.nombre = ENGINE.nombreAleatorio(j.pais); intentos++; } while (usados.has(j.nombre) && intentos < 50);
        usados.add(j.nombre);
        st.players.push(j);
        n++;
      }
    }
  }

  // Agentes libres
  for (let i = 0; i < 30; i++) {
    const j = ENGINE.nuevoJugador(rndInt(58, 78), pick(['POR', 'DEF', 'MED', 'DEL']), 19, 37);
    j.id = st.seq++;
    j.equipo = null;
    j.contrato = 0;
    j.salario = Math.round(j.salario * 0.7 / 100) * 100;
    let intentos = 0;
    do { j.nombre = ENGINE.nombreAleatorio(j.pais); intentos++; } while (usados.has(j.nombre) && intentos < 50);
    usados.add(j.nombre);
    st.libres.push(j);
  }

  // Calendarios de liga
  st.fixtures[1] = ENGINE.generarCalendario(DATA.EQUIPOS.filter(e => e.div === 1).map(e => e.id));
  st.fixtures[2] = ENGINE.generarCalendario(DATA.EQUIPOS.filter(e => e.div === 2).map(e => e.id));

  // Copa del Rey
  SEASON.sortearCopa(st);

  // Tácticas iniciales del usuario
  ENGINE.autoAlinear(st, teamId);

  // Finanzas del usuario
  const t = st.teams[teamId];
  st.finanzas = {
    saldo: t.saldo,
    presup: t.presup,
    log: [{ j: 0, anio: st.anio, desc: 'Presupuesto inicial de la temporada', imp: t.saldo }]
  };
  st.patrocinador = ENGINE.patrocinio(t);
  st.objetivo = ENGINE.objetivoEquipo(st, teamId);

  ENGINE.noticia(st, `¡Bienvenido al ${t.nom}, ${nombreManager}! La directiva confía en ti para "${st.objetivo.texto}".`);
  return st;
};

ENGINE.patrocinio = function (t) {
  return Math.round((t.cap * 12 + t.str * 45000) / 1000) * 1000;
};

ENGINE.objetivoEquipo = function (st, teamId) {
  const t = st.teams[teamId];
  const rivales = Object.values(st.teams).filter(x => x.div === t.div).sort((a, b) => b.str - a.str);
  const rank = rivales.findIndex(x => x.id === teamId) + 1;
  return { ...DATA.OBJETIVOS(rank, rivales.length), rank };
};

ENGINE.noticia = function (st, txt) {
  st.noticias.unshift({ j: st.jornada, anio: st.anio, txt });
  if (st.noticias.length > 60) st.noticias.pop();
};

ENGINE.movimientoFinanzas = function (st, imp, desc) {
  st.finanzas.saldo += imp;
  st.finanzas.log.unshift({ j: st.jornada, anio: st.anio, desc, imp: Math.round(imp) });
  if (st.finanzas.log.length > 80) st.finanzas.log.pop();
};

/* ============================================================
   CALENDARIO LIGA (round-robin doble, método del círculo)
   ============================================================ */
ENGINE.generarCalendario = function (teamIds) {
  const ids = shuffle(teamIds);
  const n = ids.length;
  const rondas = n - 1;
  const mitad = n / 2;
  let lista = ids.slice();
  const primera = [];
  for (let r = 0; r < rondas; r++) {
    const jornada = [];
    for (let i = 0; i < mitad; i++) {
      const a = lista[i], b = lista[n - 1 - i];
      jornada.push((r + i) % 2 === 0 ? { h: a, a: b, jugado: false } : { h: b, a: a, jugado: false });
    }
    primera.push(jornada);
    lista = [lista[0], lista[n - 1], ...lista.slice(1, n - 1)];
  }
  const segunda = primera.map(j => j.map(p => ({ h: p.a, a: p.h, jugado: false })));
  return [...primera, ...segunda];
};

/* ============================================================
   CLASIFICACIÓN Y ESTADÍSTICAS
   ============================================================ */
ENGINE.clasificacion = function (st, div) {
  const filas = Object.values(st.teams).filter(t => t.div === div).map(t => ({
    id: t.id, nom: t.nom, abr: t.abr, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0
  }));
  const idx = Object.fromEntries(filas.map(f => [f.id, f]));
  const cal = st.fixtures[div];
  const jornadas = Math.min(cal.length, st.jornada - 1);
  for (let j = 0; j < jornadas; j++) {
    for (const p of cal[j]) {
      if (!p.jugado) continue;
      const l = idx[p.h], v = idx[p.a];
      l.pj++; v.pj++;
      l.gf += p.hg; l.gc += p.ag; v.gf += p.ag; v.gc += p.hg;
      if (p.hg > p.ag) { l.pg++; l.pts += 3; v.pp++; }
      else if (p.hg < p.ag) { v.pg++; v.pts += 3; l.pp++; }
      else { l.pe++; v.pe++; l.pts++; v.pts++; }
    }
  }
  filas.sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc) || b.gf - a.gf || a.nom.localeCompare(b.nom));
  filas.forEach((f, i) => f.pos = i + 1);
  return filas;
};

ENGINE.pichichi = function (st, div) {
  return st.players
    .filter(p => p.equipo && st.teams[p.equipo].div === div)
    .map(p => ({ id: p.id, nombre: p.nombre, equipo: p.equipo, golesT: p.golesTemp?.[st.anio] ?? 0, asist: p.asist }))
    .filter(p => p.golesT > 0)
    .sort((a, b) => b.golesT - a.golesT || b.asist - a.asist)
    .slice(0, 12);
};

/* ============================================================
   RATINGS DE EQUIPO
   ============================================================ */
ENGINE.rendimiento = function (j) {
  if (!j) return 30;
  const fisico = 0.65 + 0.35 * (j.forma / 100);
  const animico = 0.92 + 0.16 * (j.moral / 100);
  const rachaF = 0.93 + 0.14 * (j.racha / 100);
  return j.media * fisico * animico * rachaF;
};

ENGINE.formaEquipo = function (st, teamId) {
  const lr = st.teams[teamId].lastResults.slice(-5);
  if (!lr.length) return 0;
  let b = 0;
  for (const r of lr) b += r === 'V' ? 1 : r === 'E' ? 0 : -1;
  return b * 1.2;
};

ENGINE.penaltyFueraPosicion = function (formacion, once) {
  let pen = 0;
  formacion.forEach((slot, i) => {
    const j = once[i];
    if (j && j.pos !== slot.pos) pen += j.pos === 'POR' ? 14 : 4.5;
  });
  return pen;
};

ENGINE.ratingOnce = function (st, teamId, tactics) {
  const map = Object.fromEntries(st.players.map(p => [p.id, p]));
  const once = tactics.once.map(id => map[id]).filter(Boolean);
  if (once.length < 11) return { atk: st.teams[teamId].str, mid: st.teams[teamId].str, def: st.teams[teamId].str };
  const formacion = DATA.FORMACIONES[tactics.formacion] || DATA.FORMACIONES['4-4-2'];
  let atk = 0, mid = 0, def = 0, nDel = 0, nMed = 0, nDef = 0;
  formacion.forEach((slot, i) => {
    const j = once[i];
    const rend = ENGINE.rendimiento(j);
    if (slot.pos === 'POR') { def += rend; nDef++; }
    else if (slot.pos === 'DEF') { def += rend * 0.92; mid += rend * 0.15; nDef++; }
    else if (slot.pos === 'MED') { mid += rend * 0.9; atk += rend * 0.35; def += rend * 0.25; nMed++; }
    else { atk += rend * 0.95; mid += rend * 0.2; nDel++; }
  });
  const ment = DATA.MENTALIDADES[tactics.mentalidad] || DATA.MENTALIDADES.equilibrada;
  const formBonus = ENGINE.formaEquipo(st, teamId);
  const penPos = ENGINE.penaltyFueraPosicion(formacion, once);
  return {
    atk: atk / Math.max(nDel, 1) + ment.atk + formBonus - penPos,
    mid: mid / Math.max(nMed, 1),
    def: def / Math.max(nDef, 1) + ment.def + formBonus - penPos
  };
};

/* ============================================================
   ALINEACIÓN AUTOMÁTICA
   ============================================================ */
ENGINE.autoAlinear = function (st, teamId) {
  const disponibles = st.players.filter(p => p.equipo === teamId && p.lesion === 0 && p.sancion === 0);
  const mejores = {};
  for (const pos of ['POR', 'DEF', 'MED', 'DEL']) {
    mejores[pos] = disponibles.filter(p => p.pos === pos).sort((a, b) => ENGINE.rendimiento(b) - ENGINE.rendimiento(a));
  }
  const forms = [['4-4-2', 4, 4, 2], ['4-3-3', 4, 3, 3], ['3-5-2', 3, 5, 2], ['5-3-2', 5, 3, 2], ['3-4-3', 3, 4, 3], ['4-2-3-1', 4, 5, 1]];
  let formacion = '4-4-2', bestScore = -1;
  const cuenta = { POR: 3, DEF: mejores.DEF.length, MED: mejores.MED.length, DEL: mejores.DEL.length };
  for (const [f, nd, nm, nl] of forms) {
    if (cuenta.DEF >= nd && cuenta.MED >= nm && cuenta.DEL >= nl) {
      const score = nd * (mejores.DEF[nd - 1] ? ENGINE.rendimiento(mejores.DEF[nd - 1]) : 0)
        + nm * (mejores.MED[nm - 1] ? ENGINE.rendimiento(mejores.MED[nm - 1]) : 0)
        + nl * (mejores.DEL[nl - 1] ? ENGINE.rendimiento(mejores.DEL[nl - 1]) : 0);
      if (score > bestScore) { bestScore = score; formacion = f; }
    }
  }
  const slots = DATA.FORMACIONES[formacion];
  const nec = { POR: 0, DEF: 0, MED: 0, DEL: 0 };
  slots.forEach(s => nec[s.pos]++);
  const once = [], usadosIds = new Set();
  for (const pos of ['POR', 'DEF', 'MED', 'DEL']) {
    for (let k = 0; k < nec[pos]; k++) {
      const cand = mejores[pos][k];
      if (cand) { once.push(cand.id); usadosIds.add(cand.id); }
    }
  }
  for (const j of disponibles) {
    if (once.length >= 11) break;
    if (!usadosIds.has(j.id)) { once.push(j.id); usadosIds.add(j.id); }
  }
  const suplentes = disponibles.filter(p => !usadosIds.has(p.id))
    .sort((a, b) => ENGINE.rendimiento(b) - ENGINE.rendimiento(a)).slice(0, 7).map(p => p.id);
  const capitan = st.players.filter(p => usadosIds.has(p.id) && p.pos !== 'POR')
    .sort((a, b) => b.media - a.media)[0]?.id ?? once[0];
  st.tactics[teamId] = { formacion, once, suplentes, mentalidad: 'equilibrada', presion: 'media', capitan };
};

ENGINE.autoOnceIA = function (st, teamId) {
  ENGINE.autoAlinear(st, teamId);
  const tac = st.tactics[teamId];
  const t = st.teams[teamId];
  tac.mentalidad = t.str > 82 ? 'ofensiva' : t.str < 68 ? 'defensiva' : 'equilibrada';
  return tac;
};

/* ============================================================
   SIMULACIÓN DE PARTIDO
   Pre-simula los 90' y devuelve eventos para narración en vivo
   ============================================================ */
ENGINE.simularPartido = function (st, eqH, eqA, esCopa) {
  const tacH = st.userTeam === eqH ? st.tactics[eqH] : ENGINE.autoOnceIA(st, eqH);
  const tacA = st.userTeam === eqA ? st.tactics[eqA] : ENGINE.autoOnceIA(st, eqA);
  const rH = ENGINE.ratingOnce(st, eqH, tacH);
  const rA = ENGINE.ratingOnce(st, eqA, tacA);
  const ventajaLocal = 2.6;
  const atkH = rH.atk + ventajaLocal - rA.def;
  const atkA = rA.atk - rH.def;

  const eventos = [];
  const marcador = { h: 0, a: 0 };
  const stats = { posesion: 50, tirosH: 0, tirosA: 0, parsH: 0, parsA: 0, faltas: 0 };

  const onceH = tacH.once.map(id => st.players.find(p => p.id === id)).filter(Boolean);
  const onceA = tacA.once.map(id => st.players.find(p => p.id === id)).filter(Boolean);

  stats.posesion = clamp(50 + Math.round((rH.mid - rA.mid) * 1.1), 28, 72);

  const elegirAtacante = (once) => {
    const pond = once.map(j => {
      const w = (j.pos === 'DEL' ? 6 : j.pos === 'MED' ? 3.2 : j.pos === 'DEF' ? 0.9 : 0.05) * (0.6 + j.racha / 150);
      return { j, w };
    });
    const tot = pond.reduce((s, x) => s + x.w, 0);
    let r = Math.random() * tot;
    for (const x of pond) { r -= x.w; if (r <= 0) return x.j; }
    return pond[0].j;
  };
  const elegirAsistente = (once, autor) => {
    const cands = once.filter(j => j && j.id !== autor.id && j.pos !== 'POR');
    if (!cands.length) return null;
    const pond = cands.map(j => ({ j, w: (j.pos === 'MED' ? 4 : j.pos === 'DEL' ? 2.5 : 1) * (j.attrs.pase / 60) }));
    const tot = pond.reduce((s, x) => s + x.w, 0);
    let r = Math.random() * tot;
    for (const x of pond) { r -= x.w; if (r <= 0) return x.j; }
    return cands[0];
  };

  function marcar(lado, autor, min, esPen, asistente) {
    marcador[lado]++;
    autor._golesPartido = (autor._golesPartido || 0) + 1;
    if (asistente) asistente._asisPartido = (asistente._asisPartido || 0) + 1;
    eventos.push({
      min, tipo: 'gol', lado,
      txt: pick(DATA.COMENTARIOS.gol).replace('{eq}', st.teams[lado === 'h' ? eqH : eqA].abr).replace('{j}', autor.nombre.split(' ')[0]) + (esPen ? ' (de penalti)' : '')
    });
  }

  eventos.push({ min: 0, tipo: 'inicio', txt: pick(DATA.COMENTARIOS.inicio).replace('{est}', st.teams[eqH].est).replace('{eq1}', st.teams[eqH].nom).replace('{eq2}', st.teams[eqA].nom) });

  const expulsados = { h: 0, a: 0 };
  for (let min = 1; min <= 90; min++) {
    const pOcH = clamp(0.115 + atkH * 0.0011 - expulsados.h * 0.006, 0.04, 0.20);
    const pOcA = clamp(0.108 + atkA * 0.0011 - expulsados.a * 0.006, 0.04, 0.20);

    for (const lado of ['h', 'a']) {
      if (Math.random() > (lado === 'h' ? pOcH : pOcA)) continue;
      const once = lado === 'h' ? onceH : onceA;
      const rival = lado === 'h' ? onceA : onceH;
      const autor = elegirAtacante(once);
      lado === 'h' ? stats.tirosH++ : stats.tirosA++;

      // ¿penalti? (~0.12 por partido y equipo)
      if (Math.random() < 0.012) {
        const gkRival = rival.find(j => j.pos === 'POR');
        const pGol = clamp(0.76 + ((autor?.media ?? 60) - (gkRival?.attrs.por ?? 60)) * 0.002, 0.55, 0.94);
        if (Math.random() < pGol) marcar(lado, autor, min, true);
        else {
          if (gkRival) gkRival.paradas++;
          eventos.push({ min, tipo: 'parada', lado, txt: '¡PENALTI PARADO! ' + pick(DATA.COMENTARIOS.parada).replace('{j}', autor.nombre.split(' ')[0]) });
        }
        continue;
      }

      const gk = rival.find(j => j.pos === 'POR');
      const pGol = clamp(0.11 + ((autor?.media ?? 60) - (gk?.attrs.por ?? 60)) * 0.0012, 0.05, 0.24);
      const dado = Math.random();
      const nombreCorto = autor.nombre.split(' ')[0];
      if (dado < pGol) {
        marcar(lado, autor, min, false, elegirAsistente(once, autor));
      } else if (dado < pGol + 0.45) {
        if (gk && Math.random() < 0.75) { gk.paradas++; lado === 'h' ? stats.parsA++ : stats.parsH++; }
        eventos.push({ min, tipo: 'parada', lado, txt: pick(DATA.COMENTARIOS.parada).replace('{j}', nombreCorto) });
      } else if (dado < pGol + 0.49) {
        eventos.push({ min, tipo: 'poste', lado, txt: pick(DATA.COMENTARIOS.poste).replace('{j}', nombreCorto) });
      } else {
        eventos.push({ min, tipo: 'fuera', lado, txt: pick(DATA.COMENTARIOS.fuera).replace('{j}', nombreCorto) });
      }
    }

    // Faltas y tarjetas
    if (Math.random() < 0.14) {
      const lado = Math.random() < 0.5 ? 'h' : 'a';
      const rival = lado === 'h' ? onceA : onceH;
      const infractor = pick(rival.filter(j => j.pos !== 'POR')) || rival[0];
      if (infractor && !infractor._expulsado) {
        stats.faltas++;
        const r = Math.random();
        if (r < 0.010) {
          infractor.rojas++; infractor._expulsado = true; expulsados[lado]++;
          eventos.push({ min, tipo: 'roja', lado, txt: pick(DATA.COMENTARIOS.roja).replace('{j}', infractor.nombre).replace('{eq}', st.teams[lado === 'h' ? eqH : eqA].abr) });
        } else if (r < 0.30) {
          infractor.amarillas++;
          eventos.push({ min, tipo: 'amarilla', lado, txt: pick(DATA.COMENTARIOS.amarilla).replace('{j}', infractor.nombre) });
        }
      }
    }

    // Lesiones
    if (Math.random() < 0.0022) {
      const lado = Math.random() < 0.5 ? 'h' : 'a';
      const once = lado === 'h' ? onceH : onceA;
      const herido = pick(once.filter(j => j.pos !== 'POR'));
      if (herido && !herido._expulsado) {
        herido._lesionGravedad = rndInt(1, 6);
        eventos.push({ min, tipo: 'lesion', lado, txt: pick(DATA.COMENTARIOS.lesion).replace('{j}', herido.nombre) });
      }
    }

    if (Math.random() < 0.04) {
      eventos.push({ min, tipo: 'minuto', lado: null, txt: pick(DATA.COMENTARIOS.minuto) });
    }
  }

  eventos.sort((a, b) => a.min - b.min);
  // El descanso debe ir tras los eventos del minuto 45 o antes
  const resDescanso = st.teams[eqH].abr + ' ' + marcador.h + '-' + marcador.a + ' ' + st.teams[eqA].abr;
  const ev45 = eventos.findLastIndex(e => e.min <= 45 && e.tipo !== 'inicio');
  eventos.splice(ev45 + 1, 0, { min: 45, tipo: 'descanso', txt: pick(DATA.COMENTARIOS.descanso) + ' ' + resDescanso });

  const res = { hg: marcador.h, ag: marcador.a, eventos, stats };

  // Consolidar estadísticas individuales
  for (const j of [...onceH, ...onceA]) {
    j.partidos++;
    j.forma = clamp(j.forma - rndInt(8, 14), 20, 100);
    let golesP = 0;
    if (j._golesPartido) {
      golesP = j._golesPartido;
      j.golesTemp[st.anio] = (j.golesTemp[st.anio] ?? 0) + j._golesPartido;
      j.goles = (j.goles ?? 0) + j._golesPartido;
      delete j._golesPartido;
    }
    // Bonos por partido/gole del usuario (se pagan en el cierre semanal)
    if (j.equipo === st.userTeam && st.finanzas && (j.bonusPartido || j.primaGol)) {
      const bono = (j.bonusPartido || 0) + (j.primaGol || 0) * golesP;
      if (bono > 0) st.finanzas.bonos = (st.finanzas.bonos || 0) + bono;
    }
    if (j._asisPartido) { j.asist += j._asisPartido; delete j._asisPartido; }
    if (j._expulsado) { j.sancion = rndInt(1, 3); delete j._expulsado; }
    if (j._lesionGravedad) { j.lesion = j._lesionGravedad; delete j._lesionGravedad; }
  }

  // Moral según resultado
  const updMoral = (tid, gano, emp) => {
    for (const j of st.players.filter(p => p.equipo === tid)) {
      j.moral = clamp(j.moral + (gano ? rndInt(2, 6) : emp ? rndInt(-1, 2) : rndInt(-6, -1)), 15, 100);
      j.racha = clamp(j.racha + rndInt(-6, 7), 25, 99);
    }
    const t = st.teams[tid];
    t.lastResults.push(gano ? 'V' : emp ? 'E' : 'D');
    if (t.lastResults.length > 10) t.lastResults.shift();
  };
  updMoral(eqH, res.hg > res.ag, res.hg === res.ag);
  updMoral(eqA, res.ag > res.hg, res.hg === res.ag);

  // Taquilla para el local
  const tH = st.teams[eqH];
  const aforo = Math.round(tH.cap * clamp(0.45 + tH.str / 250 + tH.lastResults.slice(-3).filter(r => r === 'V').length * 0.05, 0.35, 1));
  const taquilla = aforo * (tH.div === 1 ? 34 : 21);
  if (eqH === st.userTeam) {
    ENGINE.movimientoFinanzas(st, taquilla, `Taquilla vs ${st.teams[eqA].abr} (${aforo.toLocaleString()} espectadores)`);
  } else {
    tH.saldo += taquilla;
  }

  // Penaltis en Copa
  if (esCopa && res.hg === res.ag) {
    let ph = 0, pa = 0;
    for (let i = 0; i < 5; i++) { if (Math.random() < 0.76) ph++; if (Math.random() < 0.74) pa++; }
    while (ph === pa) { if (Math.random() < 0.75) ph++; if (Math.random() < 0.75) pa++; }
    res.penaltis = [ph, pa];
  }
  return res;
};
