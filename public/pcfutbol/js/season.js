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

  // Resolver ofertas del usuario enviadas hace 1 jornada (agentes/clubes tardan en contestar)
  SEASON.procesarOfertas(st);

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
  if (st.finanzas.bonos > 0) {
    ENGINE.movimientoFinanzas(st, -st.finanzas.bonos, 'Bonos por partidos y goles');
    st.finanzas.bonos = 0;
  }
  st.teams[st.userTeam].saldo = st.finanzas.saldo;
};

/* ============================================================
   MERCADO IA
   ============================================================ */
SEASON.mercadoIA = function (st) {
  const equipos = Object.values(st.teams);

  // Poner/quitar jugadores en venta y declarar cesibles
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
    // Cesibles: jóvenes con poca participación que el club deja salir a préstamo
    if (Math.random() < 0.08) {
      const candidatos = st.players.filter(p => p.equipo === t.id && !p.cedible && !p.enVenta && p.edad <= 24 && p.lesion === 0);
      if (candidatos.length) pick(candidatos).cedible = true;
    }
    if (Math.random() < 0.06) {
      const cedibles = st.players.filter(p => p.equipo === t.id && p.cedible);
      if (cedibles.length && Math.random() < 0.5) pick(cedibles).cedible = false;
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

  // Cobro de plazas fraccionadas de fichajes que vencen esta temporada
  st.finanzas.pagos = st.finanzas.pagos || [];
  for (const pago of st.finanzas.pagos.filter(p => p.anio === st.anio)) {
    ENGINE.movimientoFinanzas(st, -pago.importe, `Plaza de fichaje: ${pago.desc}`);
  }
  st.finanzas.pagos = st.finanzas.pagos.filter(p => p.anio > st.anio);

  // Devolver cesiones finalizadas
  for (const j of st.players) {
    if (j.cesionDe && j.cesionHastaAnio < st.anio) {
      const origen = st.teams[j.cesionDe];
      ENGINE.noticia(st, `↩️ ${j.nombre} vuelve al ${origen?.nom ?? 'su club'} tras su cesión.`);
      if (j.salarioOriginal != null) { j.salario = j.salarioOriginal; delete j.salarioOriginal; }
      j.equipo = j.cesionDe;
      delete j.cesionDe; delete j.cesionHastaAnio;
      j.enVenta = false; j.cedible = false;
    }
  }

  // Las ofertas pendientes caducan con el mercado de verano
  st.ofertasEnviadas = [];

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
   FICHAJES DEL USUARIO — negociación con respuesta diferida
   Las ofertas tardan 1 jornada en recibir respuesta.
   ============================================================ */

// Lo que pide un agente libre según su perfil
SEASON.exigenciasLibre = function (j) {
  const ficha = Math.round(Math.max(j.salario * 1.05, j.valor * 0.0008) / 100) * 100;
  return {
    ficha,
    prima: Math.round(Math.max(50000, j.valor * 0.06) / 1000) * 1000,
    clausula: Math.round(j.valor * 1.5),
    anios: j.edad >= 31 ? 2 : 3,
    bonusPartido: Math.round(ficha * 0.05 / 100) * 100,
    primaGol: Math.round(ficha * (j.pos === 'DEL' ? 0.14 : j.pos === 'MED' ? 0.10 : 0.03) / 100) * 100,
    golesEsp: Math.max(0, Math.round((j.media - 58) / (j.pos === 'DEL' ? 6 : j.pos === 'MED' ? 9 : 22))),
    partidosEsp: 24
  };
};

// Valoración del agente/jugador sobre una propuesta personal ('acepta'|'contra'|'rechaza')
SEASON.valoraLibre = function (j, t) {
  const e = SEASON.exigenciasLibre(j);
  // Valor anual que percibe el jugador (base + bonos estimados + primas repartidas)
  const anual = (t.ficha || 0)
    + (t.bonusPartido || 0) * e.partidosEsp * 0.75
    + (t.primaGol || 0) * e.golesEsp
    + Math.round((t.prima || 0) / (Math.max(1, t.anios) * 1.6))
    + (t.libertadDesc ? e.ficha * 0.08 : -e.ficha * 0.03);
  // Objetivo del jugador según seguridad del contrato
  let objetivo = e.ficha * (1 + (t.anios >= 4 ? 0.10 : t.anios <= 2 ? -0.04 : 0));
  if (j.edad <= 25 && (t.clausula || 0) < e.clausula * 0.7) objetivo *= 1.15; // joven sin cláusula digna
  if ((t.clausula || 0) >= e.clausula * 1.3) objetivo *= 0.92;                // cláusula generosa
  const ratio = anual / Math.max(1, objetivo);
  return ratio >= 1 ? 'acepta' : ratio >= 0.85 ? 'contra' : 'rechaza';
};

// Lo que pide un club por su jugador
SEASON.pideClub = function (st, j) {
  let mult = 1.05 + Math.max(0, j.media - 70) * 0.02;
  if (!j.enVenta) mult += 0.35;      // no está transferible: hay que convencer
  if (j.cedible) mult -= 0.55;       // cesible: casi regalado
  if (j.contrato <= 1) mult -= 0.25; // contrato en año final
  return Math.round(j.valor * mult * rnd(0.95, 1.08) / 10000) * 10000;
};

function cobrarPresupuesto(st, imp, desc) {
  st.finanzas.saldo -= imp;
  st.finanzas.presup -= imp;
  st.finanzas.log.unshift({ j: st.jornada, anio: st.anio, desc, imp: -imp });
}

// Envía una oferta y la deja pendiente hasta la próxima jornada
SEASON.enviarOfertaUsuario = function (st, oferta) {
  st.ofertasEnviadas = st.ofertasEnviadas || [];
  const yaPendiente = st.ofertasEnviadas.some(o =>
    o.estado === 'pendiente' && o.jugadorId === oferta.jugadorId);
  if (yaPendiente) return { ok: false, msg: 'Ya hay una oferta en curso por este jugador. Espera la respuesta.' };

  const costeInmediato = oferta.tipo === 'club'
    ? (oferta.terminos.prima || 0)
    : (oferta.terminos.prima || 0);
  const compromisoTotal = costeInmediato + (oferta.tipo === 'club' ? oferta.terminos.importe : 0);
  if (compromisoTotal > st.finanzas.presup)
    return { ok: false, msg: `Compromiso total (${fmtM(compromisoTotal)}) superior al presupuesto (${fmtM(st.finanzas.presup)}).` };

  if (oferta.tipo === 'libre') {
    const j = st.libres.find(p => p.id === oferta.jugadorId);
    if (!j) return { ok: false, msg: 'El jugador ya no está disponible.' };
  } else {
    const j = st.players.find(p => p.id === oferta.jugadorId);
    if (!j || !j.equipo || j.equipo === st.userTeam) return { ok: false, msg: 'Fichaje no válido.' };
    oferta.aEquipo = j.equipo;
    oferta.pide = SEASON.pideClub(st, j);
  }

  oferta.id = Date.now() + rndInt(1, 9999);
  oferta.jornadaEnvio = st.jornada;
  oferta.estado = 'pendiente';
  oferta.respuesta = null;
  st.ofertasEnviadas.unshift(oferta);
  UI.autosave(st);
  return { ok: true, msg: 'Oferta enviada. Recibirás respuesta en la próxima jornada.' };
};

// Aplica los términos personales al jugador recién fichado
function aplicarContrato(j, t) {
  j.salario = t.ficha;
  j.contrato = t.anios;
  j.clausula = t.clausula || 0;
  j.libertadDesc = !!t.libertadDesc;
  j.bonusPartido = t.bonusPartido || 0;
  j.primaGol = t.primaGol || 0;
  j.enVenta = false; j.cedible = false;
  j.moral = clamp(j.moral + 8, 0, 100);
}

function ejecutarLibre(st, j, t) {
  if (t.prima) cobrarPresupuesto(st, t.prima, `Prima de fichaje: ${j.nombre}`);
  j.equipo = st.userTeam;
  aplicarContrato(j, t);
  st.libres = st.libres.filter(p => p.id !== j.id);
  if (!st.players.some(p => p.id === j.id)) st.players.push(j);
  ENGINE.autoAlinear(st, st.userTeam);
  ENGINE.noticia(st, `✍️ Fichaje: ${j.nombre} (${j.pos}, ${j.media}) llega libre. Ficha ${fmtM(t.ficha)}/año${t.prima ? `, prima ${fmtM(t.prima)}` : ''}.`);
}

function ejecutarTraspaso(st, j, t) {
  const vendedor = st.teams[j.equipo];
  const cuotas = Math.max(1, t.pagos || 1);
  const cuota = Math.round(t.importe / cuotas);

  // Primera plaza ahora, resto al inicio de cada temporada
  cobrarPresupuesto(st, cuota, `Fichaje de ${j.nombre} (${vendedor.abr}) · plaza 1/${cuotas}`);
  st.finanzas.pagos = st.finanzas.pagos || [];
  for (let k = 1; k < cuotas; k++) {
    st.finanzas.pagos.push({ anio: st.anio + k, importe: cuota, desc: `${j.nombre} (${vendedor.abr})` });
  }
  if (t.prima) cobrarPresupuesto(st, t.prima, `Prima de fichaje: ${j.nombre}`);

  // Jugadores incluidos en la operación -> al club vendedor
  for (const pid of (t.incluidos || [])) {
    const p = st.players.find(x => x.id === pid);
    if (!p || p.equipo !== st.userTeam) continue;
    p.equipo = vendedor.id; p.enVenta = false; p.cedible = false;
    p.contrato = rndInt(2, 4);
    ENGINE.noticia(st, `🔁 ${p.nombre} entra en la operación y pasa al ${vendedor.nom}.`);
  }
  vendedor.saldo += t.importe;
  vendedor.presup += Math.round(t.importe * 0.6);

  j.equipo = st.userTeam;
  aplicarContrato(j, t);
  ENGINE.autoAlinear(st, st.userTeam);
  ENGINE.noticia(st, `✍️ ¡Cerrado! ${j.nombre} (${j.pos}, ${j.media}) llega del ${vendedor.nom} por ${fmtM(t.importe)}${cuotas > 1 ? ` pagados en ${cuotas} años` : ''}.`);
}

function ejecutarCesion(st, j, t) {
  const origen = st.teams[j.equipo];
  if (t.prima) cobrarPresupuesto(st, t.prima, `Cesión de ${j.nombre} (${origen.abr}) · prima`);
  j.salarioOriginal = j.salario;
  j.salario = Math.round(j.salario * (t.pctSalario || 100) / 100);
  j.cesionDe = origen.id;
  j.cesionHastaAnio = st.anio;
  j.equipo = st.userTeam;
  j.enVenta = false; j.cedible = false;
  j.moral = clamp(j.moral + 5, 0, 100);
  ENGINE.autoAlinear(st, st.userTeam);
  ENGINE.noticia(st, `🤝 Cesión: ${j.nombre} (${j.pos}, ${j.media}) llega cedido del ${origen.nom} hasta final de temporada.`);
}

// Resuelve las ofertas pendientes (llamado al cerrar cada jornada)
SEASON.procesarOfertas = function (st) {
  st.ofertasEnviadas = st.ofertasEnviadas || [];
  let cambio = false;
  for (const of of st.ofertasEnviadas) {
    if (of.estado !== 'pendiente' || of.jornadaEnvio >= st.jornada) continue;
    cambio = true;
    if (of.tipo === 'libre') SEASON.resolverLibre(st, of);
    else if (of.tipo === 'club') SEASON.resolverClub(st, of);
    else if (of.tipo === 'cesion') SEASON.resolverCesion(st, of);
  }
  if (cambio) UI.autosave(st);
};

SEASON.resolverLibre = function (st, of) {
  const j = st.libres.find(p => p.id === of.jugadorId);
  if (!j) { of.estado = 'rechazada'; of.respuesta = 'El jugador había firmado con otro club.'; return; }
  const v = SEASON.valoraLibre(j, of.terminos);
  if (v === 'acepta') {
    ejecutarLibre(st, j, of.terminos);
    of.estado = 'aceptada';
    of.respuesta = `¡${j.nombre} ha firmado como agente libre!`;
  } else if (v === 'contra') {
    const e = SEASON.exigenciasLibre(j);
    const contra = { ...of.terminos, ficha: Math.round(Math.max(of.terminos.ficha, e.ficha) * 1.18 / 100) * 100 };
    of.estado = 'contraoferta';
    of.contra = contra;
    of.respuesta = `El agente de ${j.nombre} pide mejoras: ficha de ${fmtM(contra.ficha)}/año.`;
    ENGINE.noticia(st, `💬 ${j.nombre} pide mejoras para firmar su llegada libre.`);
  } else {
    of.estado = 'rechazada';
    of.respuesta = `${j.nombre} rechaza la propuesta: no le convence económicamente.`;
    ENGINE.noticia(st, `❌ ${j.nombre} rechaza nuestra oferta como agente libre.`);
  }
};

SEASON.resolverClub = function (st, of) {
  const j = st.players.find(p => p.id === of.jugadorId);
  if (!j || j.equipo !== of.aEquipo) { of.estado = 'rechazada'; of.respuesta = 'El jugador se ha marchado a otro club.'; return; }
  const vendedor = st.teams[of.aEquipo];
  const t = of.terminos;
  const pide = of.pide || SEASON.pideClub(st, j);

  const valorIncluidos = (t.incluidos || []).reduce((s, pid) => {
    const p = st.players.find(x => x.id === pid);
    return s + (p && p.equipo === st.userTeam ? ENGINE.calcValor(p) : 0);
  }, 0);
  const efectivo = t.importe * (1 - 0.02 * ((t.pagos || 1) - 1)) + Math.round(valorIncluidos * 0.85);
  const valJug = SEASON.valoraLibre(j, t);

  if (efectivo >= pide && valJug === 'acepta') {
    ejecutarTraspaso(st, j, t);
    of.estado = 'aceptada';
    of.respuesta = `¡Operación cerrada! ${vendedor.nom} acepta ${fmtM(t.importe)}${(t.incluidos || []).length ? ' + jugadores incluidos' : ''} y ${j.nombre} acepta el contrato.`;
  } else if (efectivo >= pide * 0.82 || valJug === 'contra') {
    const contra = { ...t };
    let motivos = [];
    if (efectivo < pide) {
      contra.importe = pide;
      contra.pagos = 1;
      motivos.push(`el club pide ${fmtM(pide)}`);
    }
    if (valJug !== 'acepta') {
      const e = SEASON.exigenciasLibre(j);
      contra.ficha = Math.round(Math.max(t.ficha || 0, e.ficha) * 1.15 / 100) * 100;
      motivos.push(`el jugador pide ${fmtM(contra.ficha)}/año`);
    }
    of.estado = 'contraoferta';
    of.contra = contra;
    of.respuesta = `Negociación abierta: ${motivos.join(' y ')}.`;
    ENGINE.noticia(st, `💬 Contraoferta por ${j.nombre}: ${motivos.join(' y ')}.`);
  } else {
    of.estado = 'rechazada';
    of.respuesta = `${vendedor.nom} rechaza la oferta de plano por ${j.nombre}.`;
    ENGINE.noticia(st, `❌ ${vendedor.nom} rechaza nuestra oferta por ${j.nombre}.`);
  }
};

SEASON.resolverCesion = function (st, of) {
  const j = st.players.find(p => p.id === of.jugadorId);
  if (!j || j.equipo !== of.aEquipo) { of.estado = 'rechazada'; of.respuesta = 'El jugador ya no está en ese club.'; return; }
  const origen = st.teams[of.aEquipo];
  const t = of.terminos;
  const pedido = Math.round(Math.max(50000, j.valor * 0.05) / 1000) * 1000;
  if ((t.prima || 0) >= pedido) {
    ejecutarCesion(st, j, t);
    of.estado = 'aceptada';
    of.respuesta = `¡Cesión acordada! ${j.nombre} llega hasta final de temporada.`;
  } else if ((t.prima || 0) >= pedido * 0.5) {
    of.estado = 'contraoferta';
    of.contra = { ...t, prima: pedido };
    of.respuesta = `${origen.nom} deja salir a ${j.nombre} cedido a cambio de ${fmtM(pedido)}.`;
  } else {
    of.estado = 'rechazada';
    of.respuesta = `${origen.nom} no deja salir a ${j.nombre} en esas condiciones.`;
    ENGINE.noticia(st, `❌ ${origen.nom} frena la cesión de ${j.nombre}.`);
  }
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
