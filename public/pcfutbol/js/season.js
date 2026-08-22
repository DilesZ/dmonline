/* ============================================================
   PC FÚTBOL 2026 - Flujo de temporada
   Jornadas, Copa del Rey, mercado IA, finanzas, fin de
   temporada y guardado
   ============================================================ */

const SEASON = {};
SEASON.COPA_JORNADAS = [3, 8, 13, 18, 24, 29];

/* ============================================================
   COPA DEL REY
   ============================================================ */
SEASON.sortearCopa = function (st) {
  const todos = Object.values(st.teams);
  const rankById = Object.fromEntries([...todos].sort((a, b) => b.str - a.str).map((t, i) => [t.id, i + 1]));
  const ordenados = [...todos].sort((a, b) => rankById[a.id] - rankById[b.id]);
  const debiles = ordenados.slice(-20).map(t => t.id); // juegan preliminar
  const fuertes = ordenados.slice(0, 22).map(t => t.id); // pasan directos
  const parejos = [];
  for (let i = 0; i < debiles.length; i += 2) parejos.push({ h: debiles[i], a: debiles[i + 1], jugado: false });
  st.copa = {
    ronda: 0,
    resueltaEn: -1,
    nombres: ['Preliminar', 'Dieciseisavos', 'Octavos', 'Cuartos', 'Semifinal', 'FINAL'],
    rondas: [parejos],
    clasificados: fuertes,
    finalizada: false,
    campeon: null
  };
};

// ¿Hay partido de Copa del usuario esta jornada? (se juega junto a la liga)
SEASON.partidoCopaPendiente = function (st) {
  if (!st.copa || st.copa.finalizada) return null;
  const idx = st.copa.ronda;
  if (idx >= SEASON.COPA_JORNADAS.length) return null;
  if (st.jornada !== SEASON.COPA_JORNADAS[idx]) return null;
  const ronda = st.copa.rondas[idx];
  if (!ronda) return null;
  return ronda.find(p => (p.h === st.userTeam || p.a === st.userTeam) && !p.jugado) || null;
};

// Juega la ronda de Copa completa salvo el partido del usuario (que se pasa ya jugado)
SEASON.cerrarRondaCopa = function (st, pUser) {
  const copa = st.copa;
  const ronda = copa.rondas[copa.ronda];
  if (!ronda) { copa.finalizada = true; return; }
  const ganadores = [];
  for (const p of ronda) {
    if (!p.jugado) {
      const res = ENGINE.simularPartido(st, p.h, p.a, true);
      p.hg = res.hg; p.ag = res.ag; p.jugado = true; p.penaltis = res.penaltis ?? null;
    }
    let g;
    if (p === pUser && p.penaltis) {
      g = p.hg > p.ag ? p.h : p.ag > p.hg ? p.a : (p.penaltis[0] > p.penaltis[1] ? p.h : p.a);
    } else {
      g = p.hg > p.ag ? p.h : p.ag > p.hg ? p.a : ((p.penaltis?.[0] ?? 0) > (p.penaltis?.[1] ?? 0) ? p.h : p.a);
    }
    ganadores.push(g);
  }
  copa.ronda++;
  copa.resueltaEn = st.jornada;
  if (ganadores.length === 1) {
    copa.finalizada = true;
    copa.campeon = ganadores[0];
    st.teams[ganadores[0]].titulos++;
    ENGINE.noticia(st, ganadores[0] === st.userTeam
      ? `🏆 ¡¡CAMPEÓN DE COPA!! ¡El ${st.teams[ganadores[0]].nom} levanta la Copa del Rey!`
      : `🏆 ${st.teams[ganadores[0]].nom} gana la Copa del Rey.`);
    return;
  }
  // Participantes de la siguiente ronda: ganadores + exentos de la ronda preliminar
  const participantes = copa.ronda === 1 ? [...ganadores, ...(copa.clasificados ?? [])] : ganadores;
  // Sorteo de la siguiente ronda
  const emparejados = [];
  const bolsa = shuffle(participantes);
  while (bolsa.length >= 2) {
    emparejados.push({ h: bolsa.shift(), a: bolsa.shift(), jugado: false });
  }
  copa.rondas[copa.ronda] = emparejados;
  const pU = emparejados.find(p => p.h === st.userTeam || p.a === st.userTeam);
  if (pU) ENGINE.noticia(st, `🥇 Copa del Rey · ${copa.nombres[copa.ronda]}: ${st.teams[pU.h].nom} vs ${st.teams[pU.a].nom}`);
};

// Ronda de copa sin partido del usuario (equipos IA)
SEASON.copaSoloIA = function (st) {
  if (!st.copa || st.copa.finalizada) return;
  if (st.copa.ronda >= SEASON.COPA_JORNADAS.length) return;
  SEASON.cerrarRondaCopa(st, null);
};

/* ============================================================
   SIMULACIÓN DE LA LIGA EN UNA JORNADA
   ============================================================ */
SEASON.simularJornadaLiga = function (st, incluirUsuario) {
  const resultados = [];
  let partidoUsuario = null;
  const userDiv = st.teams[st.userTeam].div;
  for (const div of [1, 2]) {
    const cal = st.fixtures[div];
    if (st.jornada > cal.length) continue;
    for (const p of cal[st.jornada - 1]) {
      if (p.jugado) continue;
      if (!incluirUsuario && div === userDiv && (p.h === st.userTeam || p.a === st.userTeam)) {
        partidoUsuario = p;
        continue;
      }
      const res = ENGINE.simularPartido(st, p.h, p.a, false);
      p.hg = res.hg; p.ag = res.ag; p.jugado = true; p.stats = res.stats;
      resultados.push({ h: p.h, a: p.a, hg: res.hg, ag: res.ag });
    }
  }
  return { resultados, partidoUsuario };
};

/* ============================================================
   CIERRE DE JORNADA
   ============================================================ */
SEASON.cerrarJornada = function (st) {
  // Recuperación + entrenamiento
  for (const j of st.players) {
    if (j.lesion > 0) {
      j.lesion--;
      j.forma = clamp(j.forma + 4, 20, 100);
      if (j.equipo === st.userTeam && st.entrenamiento === 'recuperacion') j.forma = clamp(j.forma + 4, 20, 100);
    } else {
      j.forma = clamp(j.forma + rndInt(9, 16), 20, 100);
    }
    if (j.sancion > 0) j.sancion--;
    if (j.equipo === st.userTeam && j.lesion === 0) SEASON.entrenarJugador(st, j);
  }

  // Finanzas semanales
  SEASON.finanzasSemanales(st);

  // Mercado IA
  SEASON.mercadoIA(st);

  // Ofertas por jugadores en venta
  SEASON.ofertasPorVentas(st);

  // ¿Toca resolver una ronda de Copa esta jornada (y el usuario no juega en ella)?
  const copaUser = SEASON.partidoCopaPendiente(st);
  if (!copaUser && st.copa && !st.copa.finalizada
    && st.copa.ronda < SEASON.COPA_JORNADAS.length
    && st.jornada === SEASON.COPA_JORNADAS[st.copa.ronda]
    && st.copa.resueltaEn !== st.jornada) {
    SEASON.copaSoloIA(st);
  }

  st.jornada++;

  // Fin de temporada
  const maxJ = Math.max(st.fixtures[1].length, st.fixtures[2].length);
  const copaAcabada = !st.copa || st.copa.finalizada || st.copa.ronda >= SEASON.COPA_JORNADAS.length;
  if (st.jornada > maxJ && copaAcabada) {
    SEASON.finDeTemporada(st);
  }

  UI.autosave(st);
};

SEASON.entrenarJugador = function (st, j) {
  const foco = st.entrenamiento;
  const joven = j.edad <= 23;
  let prob = joven ? 0.10 : j.edad <= 28 ? 0.045 : 0.015;
  if (foco === 'juveniles') prob *= joven ? 1.8 : 0.4;
  if (Math.random() < prob) {
    let attr;
    if (foco === 'fisico') attr = pick(['rit', 'fis']);
    else if (foco === 'tecnica') attr = pick(['tec', 'reg', 'pase']);
    else if (foco === 'defensa') attr = pick(['def', 'fis']);
    else attr = pick(Object.keys(j.attrs));
    if (j.pos === 'POR') attr = Math.random() < 0.6 ? 'por' : pick(['fis', 'tec']);
    else if (attr === 'por' && j.pos !== 'POR') attr = 'fis';
    if (j.attrs[attr] < 99 && (j.attrs[attr] < j.potencial || Math.random() < 0.3)) {
      j.attrs[attr]++;
      const nm = ENGINE.calcMedia(j);
      if (nm !== j.media) { j.media = nm; j.valor = ENGINE.calcValor(j); }
    }
  }
};

SEASON.finanzasSemanales = function (st) {
  const salarios = st.players.filter(p => p.equipo === st.userTeam).reduce((s, p) => s + p.salario, 0);
  ENGINE.movimientoFinanzas(st, st.patrocinador, 'Patrocinador y TV');
  ENGINE.movimientoFinanzas(st, -Math.round(salarios / 4.33), 'Nóminas de la plantilla');
  ENGINE.movimientoFinanzas(st, -35000, 'Mantenimiento del estadio');
  st.teams[st.userTeam].saldo = st.finanzas.saldo;
};

/* ============================================================
   MERCADO IA
   ============================================================ */
SEASON.mercadoIA = function (st) {
  const equipos = Object.values(st.teams);

  // Poner/quitar jugadores en venta
  for (const t of equipos) {
    if (t.id === st.userTeam) continue;
    if (Math.random() < 0.09) {
      const candidatos = st.players.filter(p => p.equipo === t.id && !p.enVenta && p.lesion === 0);
      if (candidatos.length > 20) pick(candidatos).enVenta = true;
    }
    if (Math.random() < 0.05) {
      const enVenta = st.players.filter(p => p.equipo === t.id && p.enVenta);
      if (enVenta.length && Math.random() < 0.5) pick(enVenta).enVenta = false;
    }
  }

  // Traspasos entre equipos IA
  const nTraspasos = rndInt(0, 2);
  for (let k = 0; k < nTraspasos; k++) {
    const comprador = pick(equipos), vendedor = pick(equipos);
    if (comprador.id === vendedor.id) continue;
    const objetivos = st.players.filter(p => p.equipo === vendedor.id && p.enVenta && p.media <= comprador.str + 2);
    if (!objetivos.length) continue;
    const j = pick(objetivos);
    const precio = Math.round(j.valor * rnd(0.85, 1.25) / 10000) * 10000;
    if (comprador.saldo < precio || comprador.presup < precio) continue;
    comprador.saldo -= precio; comprador.presup -= precio;
    vendedor.saldo += precio; vendedor.presup += Math.round(precio * 0.6);
    j.equipo = comprador.id; j.enVenta = false; j.contrato = rndInt(2, 5);
    ENGINE.noticia(st, `${comprador.nom} ficha a ${j.nombre} (${j.pos}, ${j.media}) del ${vendedor.nom} por ${fmtM(precio)}.`);
  }

  // Agentes libres firman con equipos cortos
  for (const t of equipos) {
    if (t.id === st.userTeam) continue;
    const n = st.players.filter(p => p.equipo === t.id).length;
    if (n < 21 && st.libres.length && Math.random() < 0.4) {
      const j = st.libres.splice(rndInt(0, st.libres.length - 1), 1)[0];
      j.equipo = t.id; j.contrato = rndInt(1, 3);
      ENGINE.noticia(st, `${t.nom} ficha al agente libre ${j.nombre} (${j.pos}, ${j.media}).`);
    }
  }
};

SEASON.ofertasPorVentas = function (st) {
  const enVenta = st.players.filter(p => p.equipo === st.userTeam && p.enVenta);
  st.ofertasRecibidas = [];
  for (const j of enVenta) {
    if (Math.random() < 0.35) {
      const interesados = Object.values(st.teams).filter(t => t.id !== st.userTeam && t.saldo > j.valor * 0.7 && t.str >= j.media - 8);
      if (!interesados.length) continue;
      const t = pick(interesados);
      const precio = Math.round(j.valor * rnd(0.75, 1.15) / 10000) * 10000;
      st.ofertasRecibidas.push({ jugadorId: j.id, equipo: t.id, precio });
      ENGINE.noticia(st, `📩 ${t.nom} ofrece ${fmtM(precio)} por ${j.nombre}.`);
    }
  }
};

/* ============================================================
   FIN DE TEMPORADA Y SIGUIENTE TEMPORADA
   ============================================================ */
SEASON.finDeTemporada = function (st) {
  st.finTemporada = true;
  const divUser = st.teams[st.userTeam].div;
  const tablaUser = ENGINE.clasificacion(st, divUser);
  const posUser = tablaUser.find(f => f.id === st.userTeam)?.pos;
  st.resultadoFinal = { div: divUser, pos: posUser };

  const campeon1 = ENGINE.clasificacion(st, 1)[0];
  const campeon2 = ENGINE.clasificacion(st, 2)[0];
  st.teams[campeon1.id].titulos++;
  st.campeones = { d1: campeon1.id, d2: campeon2.id, copa: st.copa?.campeon ?? null };

  ENGINE.noticia(st, `🏁 Fin de temporada ${st.anio}/${String(st.anio + 1).slice(2)}. Campeones: ${campeon1.nom} (1ª), ${campeon2.nom} (2ª)` + (st.copa?.campeon ? `, ${st.teams[st.copa.campeon].nom} (Copa)` : '') + '.');

  const obj = st.objetivo;
  if (posUser > obj.max + 3) {
    st.despedido = true;
    ENGINE.noticia(st, `❌ La directiva ha decidido prescindir de tus servicios. Objetivo "${obj.texto}", posición final: ${posUser}ª.`);
  } else if (posUser <= obj.min) {
    ENGINE.noticia(st, `✅ ¡Objetivo cumplido con creces! Posición final: ${posUser}ª.`);
  } else {
    ENGINE.noticia(st, `📋 Temporada completada. Objetivo "${obj.texto}" — posición final: ${posUser}ª.`);
  }

  UI.autosave(st);
};

SEASON.siguienteTemporada = function (st) {
  st.anio++;
  st.jornada = 1;
  st.finTemporada = false;

  // Ascensos/descensos
  const tabla1 = ENGINE.clasificacion(st, 1);
  const tabla2 = ENGINE.clasificacion(st, 2);
  const descienden = tabla1.slice(-3).map(f => f.id);
  const ascienden = tabla2.slice(0, 3).map(f => f.id);
  for (const id of descienden) st.teams[id].div = 2;
  for (const id of ascienden) st.teams[id].div = 1;

  // Envejecer, retiradas, contratos
  const retirados = [];
  for (const j of st.players) {
    j.edad++;
    j.goles = 0; j.asist = 0; j.paradas = 0; j.partidos = 0;
    j.amarillas = 0; j.rojas = 0; j.lesion = 0; j.sancion = 0;
    j.golesTemp = {}; j.enVenta = false;
    j.contrato--;
    j.forma = rndInt(70, 95); j.racha = rndInt(45, 85);

    if (j.edad >= 31) {
      const dec = j.edad >= 35 ? rndInt(2, 5) : rndInt(1, 3);
      for (const a of Object.keys(j.attrs)) {
        if (a === 'por' && j.pos !== 'POR') continue;
        j.attrs[a] = clamp(j.attrs[a] - dec, 20, 99);
      }
      j.media = ENGINE.calcMedia(j);
    } else if (j.edad <= 24 && j.potencial > j.media) {
      for (const a of Object.keys(j.attrs)) {
        if (j.attrs[a] < j.potencial && Math.random() < 0.5) j.attrs[a] = clamp(j.attrs[a] + rndInt(1, 3), 1, 99);
      }
      j.media = ENGINE.calcMedia(j);
    }
    j.valor = ENGINE.calcValor(j);

    const probRet = j.edad >= 38 ? 0.9 : j.edad >= 36 ? 0.6 : j.edad >= 34 ? 0.35 : (j.edad >= 32 && j.media < 62 ? 0.15 : 0);
    if (Math.random() < probRet) retirados.push(j.id);
  }
  for (const id of retirados) {
    const j = st.players.find(p => p.id === id);
    if (j?.equipo === st.userTeam) ENGINE.noticia(st, `${j.nombre} anuncia su retirada a los ${j.edad} años. ¡Leyenda!`);
  }
  st.players = st.players.filter(p => !retirados.includes(p.id));

  // Contratos expirados
  for (const j of st.players) {
    if (j.contrato <= 0) {
      if (j.equipo === st.userTeam) {
        j.contrato = rndInt(2, 4);
        j.salario = Math.round(j.salario * rnd(1.05, 1.3) / 100) * 100;
      } else if (Math.random() < 0.5) {
        j.contrato = rndInt(1, 4);
        j.salario = Math.round(j.salario * 1.1 / 100) * 100;
      } else {
        st.libres.push({ ...j, equipo: null, contrato: 0 });
        j._fuera = true;
      }
    }
  }
  st.players = st.players.filter(p => !p._fuera);

  // Rellenar plantillas pequeñas
  for (const t of Object.values(st.teams)) {
    let guard = 0;
    while (st.players.filter(p => p.equipo === t.id).length < 20 && guard++ < 30) {
      if (st.libres.length && Math.random() < 0.5) {
        const j = st.libres.splice(rndInt(0, st.libres.length - 1), 1)[0];
        j.equipo = t.id; j.contrato = rndInt(2, 4);
      } else {
        ENGINE.canterano(st, t.id);
      }
    }
  }

  // Ajustar fuerza base de equipos (progresión ligera)
  for (const t of Object.values(st.teams)) {
    t.str = clamp(t.str + rndInt(-1, 1), 55, 92);
  }

  // Nuevos calendarios y copa
  st.fixtures[1] = ENGINE.generarCalendario(Object.values(st.teams).filter(t => t.div === 1).map(t => t.id));
  st.fixtures[2] = ENGINE.generarCalendario(Object.values(st.teams).filter(t => t.div === 2).map(t => t.id));
  SEASON.sortearCopa(st);

  // Finanzas nuevas según posición
  const t = st.teams[st.userTeam];
  const premio = st.resultadoFinal ? Math.max(0, (Object.values(st.teams).filter(x => x.div === t.div).length - st.resultadoFinal.pos)) * (t.div === 1 ? 900000 : 350000) : 0;
  ENGINE.movimientoFinanzas(st, premio, `Premios de Liga ${st.anio - 1}/${String(st.anio).slice(2)}`);
  t.presup = Math.max(500000, Math.round((st.finanzas.saldo * 0.35 + premio) / 10000) * 10000);
  st.finanzas.presup = t.presup;
  st.finanzas.log.unshift({ j: 0, anio: st.anio, desc: 'Presupuesto para fichajes', imp: t.presup });
  st.patrocinador = ENGINE.patrocinio(t);
  st.objetivo = ENGINE.objetivoEquipo(st, st.userTeam);
  st.ofertasRecibidas = [];

  ENGINE.autoAlinear(st, st.userTeam);
  ENGINE.noticia(st, `🎬 Comienza la temporada ${st.anio}/${String(st.anio + 1).slice(2)}. Nuevo objetivo de la directiva: "${st.objetivo.texto}".`);

  UI.autosave(st);
};

/* ============================================================
   FICHAJES DEL USUARIO
   ============================================================ */
SEASON.ficharLibre = function (st, jugadorId, salarioOferta, contratoAnios) {
  const j = st.libres.find(p => p.id === jugadorId);
  if (!j) return { ok: false, msg: 'El jugador ya no está disponible.' };
  const exigido = Math.round(j.salario * 1.05);
  if (salarioOferta < exigido) return { ok: false, msg: `${j.nombre} pide al menos ${fmtM(exigido)} por temporada.` };
  j.equipo = st.userTeam;
  j.salario = salarioOferta;
  j.contrato = contratoAnios;
  j.moral = clamp(j.moral + 8, 0, 100);
  st.libres = st.libres.filter(p => p.id !== jugadorId);
  ENGINE.noticia(st, `✍️ Fichaje: ${j.nombre} (${j.pos}, ${j.media}) llega libre con ficha de ${fmtM(salarioOferta)}.`);
  UI.autosave(st);
  return { ok: true, msg: `¡${j.nombre} firma con nosotros!` };
};

SEASON.ficharEquipo = function (st, jugadorId, oferta) {
  const j = st.players.find(p => p.id === jugadorId);
  if (!j || !j.equipo || j.equipo === st.userTeam) return { ok: false, msg: 'Fichaje no válido.' };
  if (oferta > st.finanzas.presup) return { ok: false, msg: 'No tienes presupuesto suficiente para esa oferta.' };
  const vendedor = st.teams[j.equipo];
  const minimo = Math.round(j.valor * 0.85 / 10000) * 10000;
  if (oferta < minimo) return { ok: false, msg: `${vendedor.nom} rechaza la oferta. Piden mínimo ${fmtM(minimo)}.` };
  const aceptacion = oferta >= j.valor * 1.25 ? 1 : oferta >= j.valor * 1.05 ? 0.75 : oferta >= minimo ? 0.4 : 0;
  if (Math.random() > aceptacion) {
    return { ok: false, msg: `${vendedor.nom} rechaza la oferta de ${fmtM(oferta)} por ${j.nombre}.` };
  }
  const salarioNuevo = Math.round(Math.max(j.salario * 1.15, j.valor * 0.0008) / 100) * 100;
  st.finanzas.saldo -= oferta;
  st.finanzas.presup -= oferta;
  st.finanzas.log.unshift({ j: st.jornada, anio: st.anio, desc: `Fichaje de ${j.nombre} (${vendedor.abr})`, imp: -oferta });
  vendedor.saldo += oferta; vendedor.presup += Math.round(oferta * 0.6);
  j.equipo = st.userTeam; j.enVenta = false;
  j.salario = salarioNuevo;
  j.contrato = rndInt(3, 5);
  j.moral = clamp(j.moral + 10, 0, 100);
  ENGINE.noticia(st, `✍️ ¡Fichaje estrella! ${j.nombre} (${j.pos}, ${j.media}) llega del ${vendedor.nom} por ${fmtM(oferta)}.`);
  UI.autosave(st);
  return { ok: true, msg: `¡${j.nombre} es nuevo jugador nuestro! Coste: ${fmtM(oferta)}. Ficha: ${fmtM(salarioNuevo)}.` };
};

SEASON.aceptarOfertaVenta = function (st, idx) {
  const of = st.ofertasRecibidas[idx];
  if (!of) return { ok: false, msg: 'La oferta ya no está disponible.' };
  const j = st.players.find(p => p.id === of.jugadorId);
  if (!j || j.equipo !== st.userTeam) return { ok: false, msg: 'Operación inválida.' };
  const comprador = st.teams[of.equipo];
  st.finanzas.saldo += of.precio;
  st.finanzas.presup += Math.round(of.precio * 0.7);
  st.finanzas.log.unshift({ j: st.jornada, anio: st.anio, desc: `Venta de ${j.nombre} a ${comprador.abr}`, imp: of.precio });
  j.equipo = of.equipo; j.enVenta = false;
  st.ofertasRecibidas.splice(idx, 1);
  ENGINE.autoAlinear(st, st.userTeam);
  ENGINE.noticia(st, `➡️ ${j.nombre} abandona el club rumbo al ${comprador.nom} por ${fmtM(of.precio)}.`);
  UI.autosave(st);
  return { ok: true, msg: `${j.nombre} vendido al ${comprador.nom} por ${fmtM(of.precio)}.` };
};

/* ============================================================
   GUARDADO
   ============================================================ */
SEASON.guardar = function (st, slot) {
  try {
    localStorage.setItem('pcf2026_save_' + slot, JSON.stringify(st));
    return true;
  } catch (e) { console.error(e); return false; }
};

SEASON.cargar = function (slot) {
  try {
    const raw = localStorage.getItem('pcf2026_save_' + slot);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
};

SEASON.borrar = function (slot) {
  localStorage.removeItem('pcf2026_save_' + slot);
};

SEASON.listarGuardados = function () {
  const out = [];
  for (let i = 1; i <= 3; i++) {
    const s = SEASON.cargar(i);
    if (s) out.push({ slot: i, manager: s.managerName, equipo: s.teams[s.userTeam]?.nom, anio: s.anio, jornada: s.jornada });
  }
  return out;
};
