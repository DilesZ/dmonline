/* ============================================================
   PC FÚTBOL 2026 - Interfaz
   Pantallas, hub de gestión y flujo de jornadas
   ============================================================ */

const UI = {};
UI.st = null;              // estado de la partida actual
UI.divSeleccion = 1;
UI.equipoSeleccion = null;
UI.tabActual = 'resumen';
UI.fichajesSub = 'transferibles';

const $ = sel => document.querySelector(sel);
const $$ = sel => [...document.querySelectorAll(sel)];

/* ---------- Helpers visuales ---------- */
UI.mostrarPantalla = function (id) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  $('#screen-' + id).classList.add('active');
  window.scrollTo(0, 0);
};

UI.escudoHTML = function (t, cls = 'eq-escudo', extra = '') {
  const w = DATA.TM_WAPPEN && DATA.TM_WAPPEN[t.id];
  if (!w) return `<div class="${cls}" style="background:${t.cols[0]};color:${t.cols[1]}">${t.abr}</div>`;
  // Escudo oficial; si la imagen falla, se ve el fondo con las siglas
  return `<div class="${cls}" style="background:#fff;color:${t.cols[0]}" title="${t.nom}"${extra}>${t.abr}<img class="escudo-img" src="${w}" alt="${t.nom}" loading="lazy" onerror="this.remove()"></div>`;
};

UI.modal = function (html) {
  $('#modal-caja').innerHTML = html;
  $('#modal-overlay').classList.remove('hidden');
};
UI.cerrarModal = function () { $('#modal-overlay').classList.add('hidden'); };

UI.autosave = function () { if (UI.st) SEASON.guardar(UI.st, 'auto'); };

/* ============================================================
   MENÚ PRINCIPAL
   ============================================================ */
UI.volverMenu = function () { UI.mostrarPantalla('menu'); };

UI.irNuevaPartida = function () {
  UI.equipoSeleccion = null;
  $('#btn-empezar').disabled = true;
  $('#info-equipo-nueva').classList.add('hidden');
  UI.renderEquiposNueva();
  UI.mostrarPantalla('nueva');
};

UI.setDivSeleccion = function (div) {
  UI.divSeleccion = div;
  UI.equipoSeleccion = null;
  $('#btn-empezar').disabled = true;
  $('#info-equipo-nueva').classList.add('hidden');
  $('#btn-div1').classList.toggle('active', div === 1);
  $('#btn-div2').classList.toggle('active', div === 2);
  UI.renderEquiposNueva();
};

UI.renderEquiposNueva = function () {
  const equipos = DATA.EQUIPOS.filter(e => e.div === UI.divSeleccion);
  $('#lista-equipos-nueva').innerHTML = equipos.map(e => `
    <div class="eq-card ${e.id === UI.equipoSeleccion ? 'sel' : ''}" onclick="UI.selEquipoNueva(${e.id}, this)">
      ${UI.escudoHTML(e)}
      <div>
        <div class="eq-nom">${e.nom}</div>
        <div class="eq-str">MEDIA ${e.str} · ${e.est}</div>
      </div>
    </div>`).join('');
};

UI.selEquipoNueva = function (id, el) {
  UI.equipoSeleccion = id;
  const e = DATA.EQUIPOS.find(x => x.id === id);
  $$('#lista-equipos-nueva .eq-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  $('#btn-empezar').disabled = false;
  const obj = DATA.OBJETIVOS(
    [...DATA.EQUIPOS.filter(x => x.div === e.div)].sort((a, b) => b.str - a.str).findIndex(x => x.id === id) + 1,
    DATA.EQUIPOS.filter(x => x.div === e.div).length
  );
  const info = $('#info-equipo-nueva');
  info.innerHTML = `
    <div class="spot-team">
      ${UI.escudoHTML(e, 'eq-escudo spot-crest')}
      <div>
        <div class="spot-tname">${e.nom}</div>
        <div class="spot-tmeta">${e.ciudad} · Estadio ${e.est} (${e.cap.toLocaleString('es-ES')} localidades) · MEDIA ${e.str}</div>
        <div class="spot-tobj">OBJETIVO DE LA DIRECTIVA: "${obj.texto}"</div>
      </div>
    </div>`;
  info.classList.remove('hidden');
};

UI.empezarPartida = function () {
  const nombre = ($('#input-manager').value || 'ENTRENADOR').toUpperCase().slice(0, 20);
  UI.st = ENGINE.nuevaPartida(nombre, UI.equipoSeleccion);
  UI.autosave();
  UI.abrirHub();
};

UI.pantallaCargar = function () {
  const guardadas = SEASON.listarGuardados();
  const auto = SEASON.cargar('auto');
  let html = '';
  if (auto) {
    html += `<div class="oferta-caja"><span>💾 AUTOMÁTICA — ${auto.teams[auto.userTeam].nom} · T${auto.anio}/${String(auto.anio + 1).slice(2)} J${auto.jornada} · ${auto.managerName}</span>
      <button class="btn btn-principal" onclick="UI.cargarPartida('auto')">CARGAR</button></div>`;
  }
  html += guardadas.map(g => `
    <div class="oferta-caja"><span>RANURA ${g.slot} — ${g.equipo} · T${g.anio}/${String(g.anio + 1).slice(2)} J${g.jornada} · ${g.manager}</span>
      <span><button class="btn btn-principal" onclick="UI.cargarPartida(${g.slot})">CARGAR</button>
      <button class="btn btn-peligro" onclick="UI.borrarPartida(${g.slot})">✕</button></span></div>`).join('');
  if (!html) html = '<p style="color:var(--gris)">No hay partidas guardadas.</p>';
  $('#lista-guardados').innerHTML = html;
  UI.mostrarPantalla('cargar');
};

UI.cargarPartida = function (slot) {
  const st = SEASON.cargar(slot);
  if (!st) return;
  UI.st = st;
  if (st.despedido) { UI.pantallaFinTemporada(); return; }
  if (st.finTemporada) { UI.pantallaFinTemporada(); return; }
  UI.abrirHub();
};

UI.borrarPartida = function (slot) {
  SEASON.borrar(slot);
  UI.pantallaCargar();
};

UI.mostrarAyuda = function () { UI.mostrarPantalla('ayuda'); };

/* ============================================================
   HUB DE GESTIÓN
   ============================================================ */
UI.abrirHub = function () {
  UI.tabActual = 'resumen';
  $$('#hub-tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === 'resumen'));
  UI.renderTopbar();
  UI.mostrarPantalla('hub');
  UI.renderTab();
};

UI.renderTopbar = function () {
  const st = UI.st;
  const t = st.teams[st.userTeam];
  $('#hub-badge').outerHTML = UI.escudoHTML(t, 'club-badge', ' id="hub-badge"');
  $('#hub-equipo').textContent = t.nom;
  const posUser = ENGINE.clasificacion(st, t.div).find(f => f.id === st.userTeam)?.pos ?? '-';
  $('#hub-sub').textContent = `${DATA.DIVISIONES[t.div].nombre} · Temporada ${st.anio}/${String(st.anio + 1).slice(2)} · Entrenador ${st.managerName}`;
  $('#hub-datos').innerHTML = `
    <span>JORNADA <b>${Math.min(st.jornada, st.fixtures[t.div].length)}</b></span>
    <span>POS <b>${posUser}ª</b></span>
    <span>SALDO <b>${fmtM(st.finanzas.saldo)}</b></span>
    <span>FICHAJES <b>${fmtM(st.finanzas.presup)}</b></span>`;
};

$$('#hub-tabs button').forEach(b => b.addEventListener('click', () => UI.setTab(b.dataset.tab)));
$('#modal-overlay').addEventListener('click', e => { if (e.target.id === 'modal-overlay') UI.cerrarModal(); });

UI.setTab = function (tab) {
  UI.tabActual = tab;
  $$('#hub-tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  UI.renderTab();
};

UI.renderTab = function () {
  const r = {
    resumen: UI.tabResumen,
    plantilla: UI.tabPlantilla,
    tacticas: UI.tabTacticas,
    calendario: UI.tabCalendario,
    clasificacion: UI.tabClasificacion,
    fichajes: UI.tabFichajes,
    finanzas: UI.tabFinanzas,
    entrenamiento: UI.tabEntrenamiento
  }[UI.tabActual];
  r();
  UI.renderTopbar();
};

/* ---------- TAB RESUMEN ---------- */
UI.tabResumen = function () {
  const st = UI.st;
  const t = st.teams[st.userTeam];
  const maxJ = st.fixtures[t.div].length;
  const copaUser = SEASON.partidoCopaPendiente(st);

  // Próximo partido
  let proximo = '';
  if (st.jornada <= maxJ) {
    if (copaUser) {
      const rivalId = copaUser.h === t.id ? copaUser.a : copaUser.h;
      const rival = st.teams[rivalId];
      proximo = `
        <h3>🥇 COPA DEL REY · ${st.copa.nombres[st.copa.ronda]}</h3>
        <div style="display:flex;align-items:center;gap:14px;margin:10px 0">
          ${UI.escudoHTML(t, 'club-badge')}
          <div><b>${t.nom}</b> vs <b>${rival.nom}</b></div>
          ${UI.escudoHTML(rival, 'club-badge')}
        </div>
        <div style="color:var(--gris);font-size:12px">
          ${copaUser.h === t.id ? `LOCAL · ${t.est}` : `VISITANTE · ${rival.est}`} · Eliminatoria a partido único (penaltis si empate)
        </div>
        <div style="margin-top:12px"><button class="btn btn-principal" onclick="UI.jugarJornada()">⚽ DISPUTAR LA COPA</button></div>
        <p style="color:var(--gris);font-size:11px;margin-top:8px">El partido de Liga de esta jornada se disputará entre semana.</p>`;
    } else {
    const p = st.fixtures[t.div][st.jornada - 1].find(q => q.h === t.id || q.a === t.id);
    if (p) {
      const rivalId = p.h === t.id ? p.a : p.h;
      const rival = st.teams[rivalId];
      const tabla = ENGINE.clasificacion(st, t.div);
      const posRival = tabla.find(f => f.id === rivalId)?.pos ?? '?';
      proximo = `
        <h3>PRÓXIMO PARTIDO · JORNADA ${st.jornada}</h3>
        <div style="display:flex;align-items:center;gap:14px;margin:10px 0">
          ${UI.escudoHTML(t, 'club-badge')}
          <div><b>${t.nom}</b> vs <b>${rival.nom}</b></div>
          ${UI.escudoHTML(rival, 'club-badge')}
        </div>
        <div style="color:var(--gris);font-size:12px">
          ${p.h === t.id ? `LOCAL · ${t.est}` : `VISITANTE · ${rival.est}`} · Rival: ${posRival}ª de su liga · Media rival: ${rival.str}
        </div>
        <div style="margin-top:12px"><button class="btn btn-principal" onclick="UI.jugarJornada()">⚽ JUGAR JORNADA ${st.jornada}</button></div>`;
    }
    }
  } else {
    proximo = '<h3>LIGA TERMINADA</h3><p>Espere al cierre de la Copa...</p>';
  }

  // Mini clasificación alrededor del usuario
  const tabla = ENGINE.clasificacion(st, t.div);
  const idxU = Math.max(0, tabla.findIndex(f => f.id === t.id) - 2);
  const trozo = tabla.slice(idxU, idxU + 5);
  const miniTabla = `<table class="tabla"><tr><th>#</th><th>EQUIPO</th><th>PJ</th><th class="num">PTS</th></tr>
    ${trozo.map(f => `<tr class="${f.id === t.id ? 'tr-user' : ''}"><td>${f.pos}</td><td>${f.abr}</td><td>${f.pj}</td><td class="num">${f.pts}</td></tr>`).join('')}</table>`;

  // Últimas noticias
  const noticias = st.noticias.slice(0, 8).map(n =>
    `<div class="noticia-item"><time>J${n.j}·${String(n.anio).slice(2)}</time>${n.txt}</div>`).join('');

  $('#hub-contenido').innerHTML = `
    <div class="resumen-grid">
      <div class="card">${proximo}
        <h3 style="margin-top:16px">OBJETIVO DIRECTIVA</h3>
        <div>"${st.objetivo.texto}" — entre la <b>${st.objetivo.min}ª</b> y <b>${st.objetivo.max}ª</b> posición</div>
      </div>
      <div class="card"><h3>CLASIFICACIÓN (ZONA)</h3>${miniTabla}</div>
      <div class="card"><h3>NOTICIAS</h3><div class="noticias-lista">${noticias || '<p style="color:var(--gris)">Sin noticias.</p>'}</div></div>
    </div>`;
};

/* ---------- TAB PLANTILLA ---------- */
UI.plantillaOrden = 'media';
UI.tabPlantilla = function () {
  const st = UI.st;
  const jugadores = st.players.filter(p => p.equipo === st.userTeam)
    .sort((a, b) => ENGINE.rendimiento(b) - ENGINE.rendimiento(a));
  const tac = st.tactics[st.userTeam];

  // Datos reales de Transfermarkt (plantillas.js) emparejados por nombre
  const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
  const reales = {};
  for (const r of ((DATA.PLANTILLAS && DATA.PLANTILLAS[st.userTeam]) || [])) reales[norm(r.n)] = r;
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const filas = jugadores.map(j => {
    const r = reales[norm(j.nombre)] || {};
    const titularIdx = tac.once.indexOf(j.id);
    const estado = j.lesion > 0 ? `<span class="estado-jug est-lesion">LESIONADO ${j.lesion}j</span>`
      : j.sancion > 0 ? `<span class="estado-jug est-sancion">SANCIONADO ${j.sancion}j</span>`
        : j.enVenta ? '<span class="estado-jug est-venta">EN VENTA</span>'
          : titularIdx >= 0 ? '<span class="tm-titular">TITULAR</span>'
            : j.forma < 45 ? '<span class="estado-jug est-forma-baja">BAJA FORMA</span>' : '';
    const ini = j.nombre.split(/\s+/).map(x => x[0]).join('').slice(0, 2).toUpperCase();
    return `<tr onclick="UI.detalleJugador(${j.id})">
      <td class="tm-num">${r.num ?? ''}</td>
      <td>
        <div class="tm-jugador">
          ${r.img
            ? `<img class="tm-foto" src="${esc(r.img)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">`
            : `<span class="tm-foto tm-sinfoto">${ini}</span>`}
          <div>
            <div class="tm-nombre">${esc(j.nombre)}${titularIdx >= 0 ? ' ⭐' : ''}</div>
            <div class="tm-posdet">${esc(r.posDet || j.pos)}</div>
          </div>
        </div>
      </td>
      <td class="ctr">${r.fnac ? `${esc(r.fnac)} <b>(${j.edad})</b>` : j.edad}</td>
      <td class="ctr">${r.flag ? `<img class="tm-flag" src="${esc(r.flag)}" title="${esc(r.p || '')}" alt="${esc(r.p || '')}">` : ''}</td>
      <td class="ctr"><span class="media-num">${j.media}</span></td>
      <td class="num">${Math.round(j.forma)}%</td>
      <td class="ctr">${'●'.repeat(Math.round(j.moral / 25)) || '○'}</td>
      <td class="num">${j.golesTemp?.[st.anio] ?? 0}</td>
      <td class="ctr">${j.contrato}a</td>
      <td class="num">${fmtM(j.salario)}</td>
      <td class="num tm-vm">${esc(r.vm || '—')}</td>
      <td>${estado}</td>
    </tr>`;
  }).join('');

  const salarios = jugadores.reduce((s, p) => s + p.salario, 0);
  $('#hub-contenido').innerHTML = `
    <div class="tm-panel">
      <div class="tm-box-header">Plantilla principal <small>${jugadores.length} jugadores · datos e imágenes de Transfermarkt</small></div>
      <div style="overflow-x:auto">
        <table class="tm-table">
          <thead><tr><th>#</th><th>Jugador</th><th>F. Nacim./Edad</th><th>Nac.</th><th>MED</th><th>Forma</th><th>Moral</th><th>Goles</th><th>Cto</th><th>Ficha/año</th><th>Valor de mercado</th><th>Estado</th></tr></thead>
          <tbody>${filas}</tbody>
        </table>
      </div>
      <div class="tm-footer">Masa salarial anual: <b>${fmtM(salarios)}</b> (≈${fmtM(Math.round(salarios / 4.33))}/semana) · Clic en un jugador para ver su ficha.</div>
    </div>`;
};

UI.detalleJugador = function (id) {
  const st = UI.st;
  const j = st.players.find(p => p.id === id);
  if (!j) return;
  const esUsuario = j.equipo === st.userTeam;
  const a = j.attrs;
  const barra = v => `<span class="barra-media" style="width:60px"><i style="width:${v}%"></i></span> ${v}`;
  const normS = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
  const real = (j.equipo && DATA.PLANTILLAS && DATA.PLANTILLAS[j.equipo]) || [];
  const r = real.find(x => normS(x.n) === normS(j.nombre));
  UI.modal(`
    <h3>${j.nombre}</h3>
    <div style="display:flex;gap:10px;align-items:center">
      ${r && r.img
        ? `<img class="tm-foto" style="width:52px;height:52px" src="${r.img}" alt="" onerror="this.style.display='none'">`
        : `<div class="slot-circulo" style="border-radius:6px">${j.pos}</div>`}
      <div>
        <div class="media-num" style="font-size:22px">${j.media}</div>
        <div style="font-size:11px;color:var(--gris)">POTENCIAL ${j.potencial} · ${j.pais}${r && r.posDet ? ' · ' + r.posDet : ''}</div>
      </div>
    </div>
    <dl>
      <dt>Equipo</dt><dd>${j.equipo ? st.teams[j.equipo].nom : 'AGENTE LIBRE'}</dd>
      <dt>Edad</dt><dd>${j.edad}</dd>
      <dt>Valor</dt><dd>${fmtM(j.valor)}</dd>
      <dt>Ficha/año</dt><dd>${fmtM(j.salario)}</dd>
      <dt>Contrato</dt><dd>${j.contrato > 0 ? j.contrato + ' años' : '-'}</dd>
      <dt>Moral/Forma</dt><dd>${j.moral} / ${Math.round(j.forma)}%</dd>
      <dt>Goles/Asist (temporada)</dt><dd>${j.golesTemp?.[st.anio] ?? 0} / ${j.asist}</dd>
      <dt>Partidos/Tarjetas</dt><dd>${j.partidos} / ${j.amarillas}💛 ${j.rojas}🟥</dd>
    </dl>
    <div style="font-size:13px;line-height:1.9">
      VELOCIDAD ${barra(a.rit)}<br>TÉCNICA ${barra(a.tec)}<br>PASE ${barra(a.pase)}<br>
      REGATE ${barra(a.reg)}<br>DEFENSA ${barra(a.def)}<br>FÍSICO ${barra(a.fis)}<br>
      PORTERO ${j.pos === 'POR' ? barra(a.por) : '-'}
    </div>
    ${esUsuario ? `<div class="modal-acciones">
      <button class="btn ${j.enVenta ? '' : 'btn-peligro'}" onclick="UI.toggleVenta(${j.id});UI.cerrarModal();UI.renderTab()">
        ${j.enVenta ? 'QUITAR DE LA VENTA' : 'PONER EN VENTA'}</button>
      <button class="btn btn-sec" onclick="UI.toggleCesible(${j.id});UI.cerrarModal();UI.renderTab()">
        ${j.cedible ? 'QUITAR DE CESIBLES' : 'DECLARAR CESIBLE'}</button>
      <button class="btn btn-sec" onclick="UI.cerrarModal()">CERRAR</button>
    </div>` : `<div class="modal-acciones"><button class="btn btn-sec" onclick="UI.cerrarModal()">CERRAR</button></div>`}`);
};

UI.toggleVenta = function (id) {
  const j = UI.st.players.find(p => p.id === id);
  if (j) j.enVenta = !j.enVenta;
  UI.autosave();
};

UI.toggleCesible = function (id) {
  const j = UI.st.players.find(p => p.id === id);
  if (j) j.cedible = !j.cedible;
  UI.autosave(UI.st);
};

/* ---------- TAB TÁCTICAS ---------- */
UI.tacSelSlot = null;
UI.tacSelBench = null;
UI.tabTacticas = function () {
  const st = UI.st;
  UI.tacSelSlot = null;
  UI.tacSelBench = null;
  const tac = st.tactics[st.userTeam];
  const formacion = tac.formacion in DATA.FORMACIONES ? tac.formacion : '4-4-2';
  const slots = DATA.FORMACIONES[formacion];
  const map = Object.fromEntries(st.players.filter(p => p.equipo === st.userTeam).map(p => [p.id, p]));

  const campo = slots.map((s, i) => {
    const j = map[tac.once[i]];
    const fueraPos = j && j.pos !== s.pos;
    const p = (tac.posiciones && tac.posiciones[i]) || s;
    const sel = UI.tacSelSlot === i ? ' slot-seleccionado' : '';
    return `<div class="slot-jugador ${!j ? 'slot-vacio' : fueraPos ? 'slot-fuera' : ''}${sel}" style="left:${p.x}%;top:${p.y}%"
      onpointerdown="UI.slotPointerDown(event,${i})"
      ondragover="event.preventDefault()" ondragenter="this.classList.add('drop-target')" ondragleave="this.classList.remove('drop-target')"
      ondrop="UI.dropSlot(event,${i})">
      <div class="slot-circulo">${j ? (fueraPos ? j.media + '!' : j.media) : s.pos}</div>
      <div class="slot-nombre">${j ? j.nombre.split(' ')[0] + ' ' + (j.nombre.split(' ')[1]?.[0] ?? '') + '.' : '(' + s.pos + ')'}</div>
    </div>`;
  }).join('');

  const disponibles = st.players.filter(p => p.equipo === st.userTeam && p.lesion === 0 && p.sancion === 0 && !tac.once.includes(p.id))
    .sort((a, b) => ENGINE.rendimiento(b) - ENGINE.rendimiento(a));
  const lista = disponibles.map(j => `
    <div class="fila-once ${UI.tacSelBench === j.id ? 'sel' : ''}" draggable="true"
      onclick="UI.clickSuplente(${j.id})"
      ondragstart="UI.dragStartBench(event,${j.id})">
      <span class="pos-tag">${j.pos}</span>
      <span style="flex:1">${j.nombre}</span>
      <span class="media-num">${j.media}</span>
      <span style="color:var(--gris)">${Math.round(j.forma)}%</span>
    </div>`).join('');

  $('#hub-contenido').innerHTML = `
    <div class="controles-tacticas">
      <label>FORMACIÓN</label>
      <select onchange="UI.setFormacion(this.value)">
        ${Object.keys(DATA.FORMACIONES).map(f => `<option value="${f}" ${f === formacion ? 'selected' : ''}>${f}</option>`).join('')}
      </select>
      <label>MENTALIDAD</label>
      <select onchange="UI.setMentalidad(this.value)">
        ${Object.entries(DATA.MENTALIDADES).map(([k, m]) => `<option value="${k}" ${k === tac.mentalidad ? 'selected' : ''}>${m.nom}</option>`).join('')}
      </select>
      <button class="btn" onclick="UI.autoAlinearBtn()">⚙ ALINEACIÓN AUTOMÁTICA</button>
      ${tac.posiciones ? '<button class="btn btn-sec" onclick="UI.resetPosiciones()">⟲ POSICIONES BASE</button>' : ''}
    </div>
    <div class="tacticas-layout">
      <div class="campo">${campo}</div>
      <div class="card">
        <h3>SUPLENTES Y RESERVAS</h3>
        <p style="color:var(--gris);font-size:12px;margin-bottom:8px">Arrastra un suplente a cualquier hueco del campo, o pínchalo y luego elige el hueco donde quieras ponerlo. También puedes intercambiar dos jugadores del once arrastrando uno sobre otro.</p>
        <p style="color:var(--gris);font-size:12px;margin-bottom:8px">Para ajustar la posición en el campo, arrastra a un jugador: se mueve libremente sin salirse de su función (radio máximo alrededor de su puesto en la formación).</p>
        <div class="lista-once">${lista || '<p style="color:var(--gris)">No hay más jugadores disponibles.</p>'}</div>
      </div>
    </div>`;
};

// Coloca al suplente `pid` en el hueco `i`; quien ocupaba ese hueco pasa al banquillo
UI.ponerEnSlot = function (i, pid) {
  const st = UI.st, tac = st.tactics[st.userTeam];
  if (!pid || tac.once.includes(pid)) return;
  const sale = tac.once[i];
  tac.once[i] = pid;
  tac.suplentes = tac.suplentes.filter(id => id !== pid);
  if (sale) tac.suplentes.push(sale);
  UI.autosave();
};

UI.clickSlot = function (i) {
  const st = UI.st, tac = st.tactics[st.userTeam];
  if (UI.tacSelBench !== null) {
    // Hay un suplente seleccionado: colocarlo en este hueco
    UI.ponerEnSlot(i, UI.tacSelBench);
    UI.tacSelBench = null;
    UI.tacSelSlot = null;
  } else if (UI.tacSelSlot === null) {
    UI.tacSelSlot = i;
  } else if (UI.tacSelSlot === i) {
    UI.tacSelSlot = null;
  } else {
    [tac.once[UI.tacSelSlot], tac.once[i]] = [tac.once[i], tac.once[UI.tacSelSlot]];
    UI.tacSelSlot = null;
    UI.autosave();
  }
  UI.renderTab();
};

UI.clickSuplente = function (pid) {
  const st = UI.st, tac = st.tactics[st.userTeam];
  if (UI.tacSelSlot !== null) {
    // Hueco ya seleccionado: colocar aquí
    UI.ponerEnSlot(UI.tacSelSlot, pid);
    UI.tacSelSlot = null;
    UI.tacSelBench = null;
  } else {
    // Seleccionar suplente para luego elegir destino (sin sustitución automática)
    UI.tacSelBench = UI.tacSelBench === pid ? null : pid;
  }
  UI.renderTab();
};

/* ----- Arrastrar y soltar (banquillo -> campo) ----- */
UI.dragStartBench = function (ev, pid) {
  ev.dataTransfer.setData('text/plain', 'bench:' + pid);
  ev.dataTransfer.effectAllowed = 'move';
};
UI.dropSlot = function (ev, i) {
  ev.preventDefault();
  const data = String(ev.dataTransfer.getData('text/plain') || '');
  if (!data.startsWith('bench:')) return;
  UI.ponerEnSlot(i, +data.split(':')[1]);
  UI.tacSelSlot = null;
  UI.tacSelBench = null;
  UI.renderTab();
};

/* ----- Movimiento libre dentro del rango del rol -----
   Arrastra un jugador para ajustar su posición en el campo sin
   salirse de su función: como máximo RANGO_POS (%) alrededor de la
   posición base de su hueco en la formación. Tap = seleccionar,
   soltar sobre otro jugador = intercambiar. Las posiciones quedan
   ligadas al rol (hueco), no al jugador. */
UI.RANGO_POS = 16;

UI.baseSlot = function (i) {
  const tac = UI.st.tactics[UI.st.userTeam];
  const f = tac.formacion in DATA.FORMACIONES ? tac.formacion : '4-4-2';
  return DATA.FORMACIONES[f][i];
};

UI.clampRango = function (i, x, y) {
  const base = UI.baseSlot(i);
  let dx = x - base.x, dy = y - base.y;
  const d = Math.hypot(dx, dy);
  if (d > UI.RANGO_POS) { dx = dx / d * UI.RANGO_POS; dy = dy / d * UI.RANGO_POS; }
  return { x: Math.round(Math.max(4, Math.min(96, base.x + dx)) * 10) / 10,
           y: Math.round(Math.max(5, Math.min(95, base.y + dy)) * 10) / 10 };
};

UI.slotPointerDown = function (ev, i) {
  if (ev.button !== undefined && ev.button !== 0) return;
  ev.preventDefault();
  const el = ev.currentTarget;
  const st = UI.st, tac = st.tactics[st.userTeam];
  const rectCampo = el.closest('.campo').getBoundingClientRect();
  const origX = parseFloat(el.style.left), origY = parseFloat(el.style.top);
  const sx = ev.clientX, sy = ev.clientY;
  let moved = false;

  const slotBajo = e => {
    for (const t of document.elementsFromPoint(e.clientX, e.clientY)) {
      if (t.classList && t.classList.contains('slot-jugador') && t !== el) {
        const m = (t.getAttribute('onpointerdown') || '').match(/slotPointerDown\(event,(\d+)\)/);
        if (m) return { i: +m[1], el: t };
      }
    }
    return null;
  };

  const enMove = e => {
    if (!moved && Math.hypot(e.clientX - sx, e.clientY - sy) < 6) return;
    moved = true;
    el.classList.add('moviendo');
    const p = UI.clampRango(i, origX + (e.clientX - sx) / rectCampo.width * 100,
                              origY + (e.clientY - sy) / rectCampo.height * 100);
    el.style.left = p.x + '%'; el.style.top = p.y + '%';
    document.querySelectorAll('.slot-jugador.drop-target').forEach(x => x.classList.remove('drop-target'));
    const otro = slotBajo(e);
    if (otro) otro.el.classList.add('drop-target');
  };

  const enUp = e => {
    window.removeEventListener('pointermove', enMove);
    window.removeEventListener('pointerup', enUp);
    el.classList.remove('moviendo', 'drop-target');
    if (!moved) { UI.clickSlot(i); return; }            // tap normal: selección/intercambio
    const otro = slotBajo(e);
    if (otro) {                                          // soltado sobre otro jugador: intercambio
      [tac.once[i], tac.once[otro.i]] = [tac.once[otro.i], tac.once[i]];
      UI.autosave(); UI.renderTab(); return;
    }
    // guardar la posición personalizada de este rol
    tac.posiciones = tac.posiciones || {};
    tac.posiciones[i] = UI.clampRango(i, origX + (e.clientX - sx) / rectCampo.width * 100,
                                         origY + (e.clientY - sy) / rectCampo.height * 100);
    UI.autosave(); UI.renderTab();
  };

  window.addEventListener('pointermove', enMove);
  window.addEventListener('pointerup', enUp);
};

UI.resetPosiciones = function () {
  delete UI.st.tactics[UI.st.userTeam].posiciones;
  UI.autosave();
  UI.renderTab();
};

UI.setFormacion = function (f) {
  const st = UI.st, tac = st.tactics[st.userTeam];
  tac.formacion = f;
  delete tac.posiciones; // la nueva formación tiene otros roles base
  // Reordenar jugadores por posición natural
  const map = Object.fromEntries(st.players.map(p => [p.id, p]));
  const slots = DATA.FORMACIONES[f];
  const actuales = tac.once.map(id => map[id]).filter(Boolean);
  const resto = st.players.filter(p => p.equipo === st.userTeam && p.lesion === 0 && p.sancion === 0 && !tac.once.includes(p.id));
  const nuevoOnce = [];
  for (const s of slots) {
    let cand = actuales.find(j => j.pos === s.pos && !nuevoOnce.includes(j.id))
      || resto.filter(j => j.pos === s.pos).sort((a, b) => ENGINE.rendimiento(b) - ENGINE.rendimiento(a)).find(j => !nuevoOnce.includes(j.id));
    if (!cand) cand = [...actuales, ...resto].filter(j => !nuevoOnce.includes(j.id)).sort((a, b) => ENGINE.rendimiento(b) - ENGINE.rendimiento(a))[0];
    if (cand) nuevoOnce.push(cand.id);
  }
  tac.once = nuevoOnce;
  tac.suplentes = st.players.filter(p => p.equipo === st.userTeam && p.lesion === 0 && p.sancion === 0 && !nuevoOnce.includes(p.id))
    .sort((a, b) => ENGINE.rendimiento(b) - ENGINE.rendimiento(a)).slice(0, 7).map(p => p.id);
  UI.autosave();
  UI.renderTab();
};

UI.setMentalidad = function (m) {
  UI.st.tactics[UI.st.userTeam].mentalidad = m;
  UI.autosave();
};

UI.autoAlinearBtn = function () {
  ENGINE.autoAlinear(UI.st, UI.st.userTeam);
  UI.autosave();
  UI.renderTab();
};

/* ---------- TAB CALENDARIO ---------- */
UI.tabCalendario = function () {
  const st = UI.st;
  const t = st.teams[st.userTeam];
  const cal = st.fixtures[t.div];
  let html = '<div class="calendario-lista">';
  cal.forEach((jornada, ji) => {
    html += `<div class="jornada-sep">JORNADA ${ji + 1}${ji + 1 === st.jornada ? ' ◀ ACTUAL' : ''}</div>`;
    for (const p of jornada) {
      const esUser = p.h === t.id || p.a === t.id;
      const res = p.jugado ? `${p.hg}-${p.ag}` : ji + 1 === st.jornada ? '▶' : '—';
      html += `<div class="partido-fila ${esUser ? 'user' : ''}">
        <span>${st.teams[p.h].abr}</span>
        <span>${st.teams[p.h].nom}</span>
        <span class="res">${res}</span>
        <span>${st.teams[p.a].nom}</span>
      </div>`;
    }
  });
  html += '</div>';
  // Resultados de copa del usuario
  if (st.copa) {
    let copaHtml = '<h3 style="margin-top:16px">🥇 COPA DEL REY — NUESTRO CAMINO</h3><div class="calendario-lista">';
    st.copa.rondas.forEach((ronda, ri) => {
      for (const p of ronda) {
        if (p.h !== t.id && p.a !== t.id) continue;
        const rivalId = p.h === t.id ? p.a : p.h;
        copaHtml += `<div class="partido-fila user">
          <span>${st.copa.nombres[ri]}</span>
          <span>${p.h === t.id ? 'vs ' + st.teams[rivalId].nom : 'en ' + st.teams[p.h].nom}</span>
          <span class="res">${p.jugado ? `${p.hg}-${p.ag}` + (p.penaltis ? ` (p.${p.penaltis[0]}-${p.penaltis[1]})` : '') : ri === st.copa.ronda && SEASON.COPA_JORNADAS[ri] === st.jornada ? '▶' : '—'}</span>
          <span></span></div>`;
      }
    });
    copaHtml += '</div>';
    html = `<div class="card">${copaHtml}</div>` + `<div class="card"><h3>LIGA</h3>${html}</div>`;
  } else {
    html = `<div class="card"><h3>CALENDARIO LIGA</h3>${html}</div>`;
  }
  $('#hub-contenido').innerHTML = html;
};

/* ---------- TAB CLASIFICACIÓN ---------- */
UI.tabClasificacion = function () {
  const st = UI.st;
  const tablaHTML = (div) => {
    const tabla = ENGINE.clasificacion(st, div);
    const nAsc = div === 2 ? 3 : 4, nDesc = 3;
    return `<table class="tabla">
      <tr><th>#</th><th>EQUIPO</th><th class="ctr">PJ</th><th class="ctr">PG</th><th class="ctr">PE</th><th class="ctr">PP</th><th class="ctr">GF</th><th class="ctr">GC</th><th class="ctr">DG</th><th class="num">PTS</th></tr>
      ${tabla.map(f => {
      const cls = (div === 2 && f.pos <= 3) || (div === 1 && f.pos > tabla.length - 3) ? 'pos-asc' : '';
      const cls2 = div === 1 && f.pos > tabla.length - 3 ? 'pos-desc' : cls;
      return `<tr class="${f.id === st.userTeam ? 'tr-user' : ''} ${cls2}">
        <td>${f.pos}</td><td>${f.nom}</td><td class="ctr">${f.pj}</td><td class="ctr">${f.pg}</td>
        <td class="ctr">${f.pe}</td><td class="ctr">${f.pp}</td><td class="ctr">${f.gf}</td><td class="ctr">${f.gc}</td>
        <td class="ctr">${f.gf - f.gc > 0 ? '+' : ''}${f.gf - f.gc}</td><td class="num"><b>${f.pts}</b></td></tr>`;
    }).join('')}</table>`;
  };
  const pic1 = ENGINE.pichichi(st, 1).slice(0, 8);
  const pichichiHTML = `<table class="tabla"><tr><th>JUGADOR</th><th>EQUPO</th><th class="num">GOLES</th></tr>
    ${pic1.map(p => `<tr><td>${p.nombre}</td><td>${st.teams[p.equipo].abr}</td><td class="num"><b>${p.golesT}</b></td></tr>`).join('')}</table>`;

  $('#hub-contenido').innerHTML = `
    <div class="dos-tablas">
      <div class="card"><h3>${DATA.DIVISIONES[1].nombre}</h3><div class="clasif-wrap">${tablaHTML(1)}</div></div>
      <div class="card"><h3>${DATA.DIVISIONES[2].nombre}</h3><div class="clasif-wrap">${tablaHTML(2)}</div></div>
    </div>
    <div class="dos-tablas">
      <div class="card"><h3>⚽ PICHICHI 1ª</h3>${pichichiHTML}</div>
      <div class="card">
        <h3>LEYENDA</h3>
        <div class="leyenda-clasif">
          <span><span class="punto-leyenda" style="background:var(--verde)"></span> Ascenso / Champions</span>
          <span><span class="punto-leyenda" style="background:var(--rojo)"></span> Descenso</span>
        </div>
        <p style="color:var(--gris);font-size:12px;margin-top:8px">Los 3 últimos de 1ª descienden; los 3 primeros de 2ª ascienden.</p>
      </div>
    </div>`;
};

/* ---------- TAB FICHAJES ---------- */
UI.tabFichajes = function () {
  const st = UI.st;
  st.ofertasEnviadas = st.ofertasEnviadas || [];
  const sub = UI.fichajesSub;
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pendienteDe = pid => st.ofertasEnviadas.some(o => o.estado === 'pendiente' && o.jugadorId === pid);
  const btnMercado = (j, txt, fn, cls = '') => pendienteDe(j.id)
    ? '<button class="btn btn-mini" disabled>⏳ EN CURSO</button>'
    : `<button class="btn btn-mini ${cls}" onclick="${fn}(${j.id})">${txt}</button>`;
  let cuerpo = '';

  if (sub === 'transferibles') {
    const mercado = st.players.filter(p => p.equipo && p.equipo !== st.userTeam && p.enVenta)
      .sort((a, b) => b.media - a.media).slice(0, 40);
    cuerpo = `<table class="tabla">
      <tr><th>NOMBRE</th><th class="ctr">POS</th><th class="ctr">EDAD</th><th class="num">MED</th><th>EQUIPO</th><th class="num">VALOR</th><th></th></tr>
      ${mercado.map(j => `<tr>
        <td style="cursor:pointer" onclick="UI.detalleJugador(${j.id})">${j.nombre}</td>
        <td class="ctr">${j.pos}</td><td class="ctr">${j.edad}</td>
        <td class="num media-num">${j.media}</td>
        <td>${st.teams[j.equipo].abr}</td>
        <td class="num">${fmtM(j.valor)}</td>
        <td>${btnMercado(j, 'HACER OFERTA', 'UI.dialogoOfertaTraspaso')}</td>
      </tr>`).join('') || '<tr><td colspan="7" style="color:var(--gris)">No hay jugadores transferibles ahora mismo. Vuelve tras la próxima jornada.</td></tr>'}
    </table>`;
  } else if (sub === 'cedibles') {
    const cedibles = st.players.filter(p => p.equipo && p.equipo !== st.userTeam && p.cedible)
      .sort((a, b) => b.media - a.media);
    cuerpo = `<table class="tabla">
      <tr><th>NOMBRE</th><th class="ctr">POS</th><th class="ctr">EDAD</th><th class="num">MED</th><th>EQUIPO</th><th class="num">SALARIO ACTUAL</th><th></th></tr>
      ${cedibles.map(j => `<tr>
        <td style="cursor:pointer" onclick="UI.detalleJugador(${j.id})">${j.nombre}</td>
        <td class="ctr">${j.pos}</td><td class="ctr">${j.edad}</td>
        <td class="num media-num">${j.media}</td>
        <td>${st.teams[j.equipo].abr}</td>
        <td class="num">${fmtM(j.salario)}</td>
        <td>${btnMercado(j, 'PEDIR CESIÓN', 'UI.dialogoCesion')}</td>
      </tr>`).join('') || '<tr><td colspan="7" style="color:var(--gris)">Ningún club ha declarado cesibles jugadores por ahora.</td></tr>'}
    </table>`;
  } else if (sub === 'libres') {
    const libres = st.libres.slice().sort((a, b) => b.media - a.media);
    cuerpo = `<table class="tabla">
      <tr><th>NOMBRE</th><th class="ctr">POS</th><th class="ctr">EDAD</th><th class="num">MED</th><th class="num">FICHA QUE PIDE</th><th></th></tr>
      ${libres.map(j => {
        const e = SEASON.exigenciasLibre(j);
        return `<tr>
        <td style="cursor:pointer" onclick="UI.detalleJugador(${j.id})">${j.nombre}</td>
        <td class="ctr">${j.pos}</td><td class="ctr">${j.edad}</td>
        <td class="num media-num">${j.media}</td>
        <td class="num">≈ ${fmtM(e.ficha)}</td>
        <td>${btnMercado(j, 'NEGOCIAR', 'UI.dialogoLibre')}</td>
      </tr>`;
      }).join('')}</table>`;
  } else if (sub === 'misofertas') {
    const tipoTxt = { libre: 'AGENTE LIBRE', club: 'TRASPASO', cesion: 'CESIÓN' };
    cuerpo = st.ofertasEnviadas.length ? st.ofertasEnviadas.map(of => {
      const j = st.players.find(p => p.id === of.jugadorId) || st.libres.find(p => p.id === of.jugadorId);
      if (!j) return '';
      const badge = of.estado === 'pendiente'
        ? `<span style="color:var(--amarillo)">⏳ Esperando respuesta (responde J${of.jornadaEnvio + 1})</span>`
        : of.estado === 'aceptada' ? '<span style="color:var(--verde)">✅ ACEPTADA</span>'
          : of.estado === 'contraoferta' ? '<span style="color:var(--cyan)">🔄 CONTRAOFERTA</span>'
            : '<span style="color:var(--rojo)">❌ RECHAZADA</span>';
      return `<div class="oferta-caja">
        <span><b>${esc(j.nombre)}</b> · ${tipoTxt[of.tipo] || of.tipo} · ${badge}
          <br><small style="color:var(--gris)">${esc(of.respuesta || '')}</small></span>
        <span>
          ${of.estado === 'contraoferta' ? `<button class="btn btn-principal btn-mini" onclick="UI.mejorarOferta(${of.id})">MEJORAR OFERTA</button>` : ''}
          ${of.estado !== 'pendiente' ? `<button class="btn btn-mini" onclick="UI.descartarOferta(${of.id})">DESCARTAR</button>` : ''}
        </span>
      </div>`;
    }).join('') : '<p style="color:var(--gris)">No has enviado ninguna oferta. Las respuestas llegan una jornada después de enviarlas.</p>';
  } else if (sub === 'recibidas') {
    cuerpo = (st.ofertasRecibidas.length ? st.ofertasRecibidas.map((o, i) => {
      const j = st.players.find(p => p.id === o.jugadorId);
      if (!j) return '';
      return `<div class="oferta-caja"><span>${st.teams[o.equipo].nom} ofrece <b>${fmtM(o.precio)}</b> por <b>${j.nombre}</b> (${j.pos}, ${j.media}, valor ${fmtM(j.valor)})</span>
        <span><button class="btn btn-principal" onclick="UI.aceptarVenta(${i})">ACEPTAR</button></span></div>`;
    }).join('') : '<p style="color:var(--gris)">No hay ofertas. Pon jugadores EN VENTA desde Plantilla para recibir propuestas.</p>');
  }

  const nPend = st.ofertasEnviadas.filter(o => o.estado === 'pendiente').length;
  const nContra = st.ofertasEnviadas.filter(o => o.estado === 'contraoferta').length;
  $('#hub-contenido').innerHTML = `
    <div class="card">
      <div class="tabs-mini">
        <button class="btn-tab ${sub === 'transferibles' ? 'active' : ''}" onclick="UI.fichajesSub='transferibles';UI.renderTab()">TRANSFERIBLES</button>
        <button class="btn-tab ${sub === 'cedibles' ? 'active' : ''}" onclick="UI.fichajesSub='cedibles';UI.renderTab()">CESIBLES</button>
        <button class="btn-tab ${sub === 'libres' ? 'active' : ''}" onclick="UI.fichajesSub='libres';UI.renderTab()">AGENTES LIBRES</button>
        <button class="btn-tab ${sub === 'misofertas' ? 'active' : ''}" onclick="UI.fichajesSub='misofertas';UI.renderTab()">MIS OFERTAS (${nPend + nContra})</button>
        <button class="btn-tab ${sub === 'recibidas' ? 'active' : ''}" onclick="UI.fichajesSub='recibidas';UI.renderTab()">RECIBIDAS (${st.ofertasRecibidas.length})</button>
        <span style="margin-left:auto;color:var(--cyan)">PRESUPUESTO: <b>${fmtM(st.finanzas.presup)}</b></span>
      </div>
      <div style="overflow-x:auto">${cuerpo}</div>
      <p style="margin-top:8px;color:var(--gris);font-size:12px">Toda oferta tarda <b>1 jornada</b> en recibir respuesta del agente o del club. Si te hacen una contraoferta podrás mejorarla.</p>
    </div>`;
};

/* ----- Ventanas de negociación ----- */
UI.terminosPersonalesHTML = function (pfx, e, t) {
  const aniosSel = n => [1, 2, 3, 4, 5].map(a =>
    `<option value="${a}" ${(t.anios || e.anios) === a ? 'selected' : ''}>${a}</option>`).join('');
  return `
    <div class="fila-form"><label>PRIMA DE FICHAJE:</label><input type="number" id="${pfx}-prima" step="50000" min="0" value="${t.prima ?? 0}"></div>
    <div class="fila-form"><label>FICHA ANUAL:</label><input type="number" id="${pfx}-ficha" step="25000" value="${t.ficha ?? e.ficha}"></div>
    <div class="fila-form"><label>AÑOS DE CONTRATO:</label><select id="${pfx}-anios">${aniosSel()}</select></div>
    <div class="fila-form"><label>CLÁUSULA (0 = SIN ELLA):</label><input type="number" id="${pfx}-clausula" step="500000" min="0" value="${t.clausula ?? Math.round(e.clausula * 0.8)}"></div>
    <div class="fila-form"><label>BONO POR PARTIDO:</label><input type="number" id="${pfx}-bono" step="1000" min="0" value="${t.bonusPartido ?? 0}"></div>
    <div class="fila-form"><label>PRIMA POR GOL:</label><input type="number" id="${pfx}-gol" step="1000" min="0" value="${t.primaGol ?? 0}"></div>
    <div class="fila-form"><label>LIBERTAD SI DESCIENDE:</label><input type="checkbox" id="${pfx}-desc" ${t.libertadDesc ? 'checked' : ''}></div>`;
};

UI.leerTerminosPersonales = function (pfx) {
  return {
    prima: parseInt($('#' + pfx + '-prima').value, 10) || 0,
    ficha: parseInt($('#' + pfx + '-ficha').value, 10) || 0,
    anios: parseInt($('#' + pfx + '-anios').value, 10) || 3,
    clausula: parseInt($('#' + pfx + '-clausula').value, 10) || 0,
    bonusPartido: parseInt($('#' + pfx + '-bono').value, 10) || 0,
    primaGol: parseInt($('#' + pfx + '-gol').value, 10) || 0,
    libertadDesc: $('#' + pfx + '-desc').checked
  };
};

// Envía (o reenvía mejorando) una oferta
function enviarYavisar(st, oferta, ofIdPrevia) {
  const r = SEASON.enviarOfertaUsuario(st, oferta);
  if (r.ok && ofIdPrevia) st.ofertasEnviadas = st.ofertasEnviadas.filter(o => o.id !== ofIdPrevia);
  UI.cerrarModal();
  UI.aviso(r.ok ? '📨 ' + r.msg : '❌ ' + r.msg);
  if (r.ok) UI.renderTab();
}

UI.dialogoLibre = function (id) {
  const st = UI.st;
  const j = st.libres.find(p => p.id === id);
  if (!j) return;
  const e = SEASON.exigenciasLibre(j);
  UI.modal(`
    <h3>NEGOCIACIÓN — AGENTE LIBRE</h3>
    <p style="font-size:13px">${j.nombre} · ${j.pos} · ${j.edad} años · Media <b>${j.media}</b> · Valor ${fmtM(j.valor)}</p>
    <p style="color:var(--gris);font-size:12px;margin-top:6px">El agente pide ≈<b>${fmtM(e.ficha)}</b>/año, prima ≈${fmtM(e.prima)} y cláusula ≈${fmtM(e.clausula)}. Los bonos y la libertad por descenso suman atractivo; los contratos largos exigen mejor ficha.</p>
    ${UI.terminosPersonalesHTML('lf', e, {})}
    <div class="modal-acciones">
      <button class="btn btn-sec" onclick="UI.cerrarModal()">CANCELAR</button>
      <button class="btn btn-principal" onclick="UI.enviarLibre(${id})">ENVIAR PROPUESTA 📨</button>
    </div>`);
};

UI.enviarLibre = function (id) {
  const terminos = UI.leerTerminosPersonales('lf');
  enviarYavisar(UI.st, { tipo: 'libre', jugadorId: id, terminos });
};

UI.dialogoOfertaTraspaso = function (id, previa) {
  const st = UI.st;
  const j = st.players.find(p => p.id === id);
  if (!j) return;
  const e = SEASON.exigenciasLibre(j);
  const pide = SEASON.pideClub(st, j);
  const t = previa ? previa.contra || previa.terminos : {};
  const plantilla = st.players.filter(p => p.equipo === st.userTeam && p.id !== id)
    .sort((a, b) => ENGINE.calcValor(b) - ENGINE.calcValor(a)).slice(0, 14);
  const incluidosSet = new Set(t.incluidos || []);
  UI.modal(`
    <h3>OFERTA AL CLUB — ${st.teams[j.equipo].nom.toUpperCase()}</h3>
    <p style="font-size:13px">${j.nombre} · ${j.pos} · ${j.edad} años · Media <b>${j.media}</b> · Valor ${fmtM(j.valor)}${j.enVenta ? ' · <b style="color:var(--verde)">TRANSFERIBLE</b>' : ''}</p>
    <p style="color:var(--gris);font-size:12px;margin-top:6px">El club pide ≈<b>${fmtM(pide)}</b>. Fraccionar el pago reduce un poco el atractivo; incluir jugadores suma su valor (×0,85).</p>
    <div class="fila-form"><label>IMPORTE TOTAL:</label><input type="number" id="oc-importe" step="100000" min="0" value="${t.importe ?? Math.max(pide, Math.round(j.valor * 1.1 / 10000) * 10000)}"></div>
    <div class="fila-form"><label>PAGO FRACCIONADO:</label>
      <select id="oc-pagos">${[1, 2, 3, 4, 5].map(n => `<option value="${n}" ${(t.pagos || 1) === n ? 'selected' : ''}>${n === 1 ? 'Al contado' : `En ${n} años`}</option>`).join('')}</select>
    </div>
    <div class="fila-form"><label style="align-self:flex-start">INCLUIR JUGADORES:</label>
      <div style="max-height:130px;overflow-y:auto;border:1px solid var(--borde);padding:4px;width:100%">
        ${plantilla.map(p => `<label style="display:flex;gap:6px;font-size:12px;padding:2px 0">
          <input type="checkbox" class="oc-incl" value="${p.id}" ${incluidosSet.has(p.id) ? 'checked' : ''}>
          <span style="flex:1">${p.nombre}</span><span style="color:var(--gris)">${p.pos} · ${fmtM(ENGINE.calcValor(p))}</span></label>`).join('')}
      </div>
    </div>
    <p style="margin-top:8px;color:var(--cyan);font-size:12px">CONTRATO DEL JUGADOR (el agente pide ≈${fmtM(e.ficha)}/año):</p>
    ${UI.terminosPersonalesHTML('oc', e, t)}
    <div class="modal-acciones">
      <button class="btn btn-sec" onclick="UI.cerrarModal()">CANCELAR</button>
      <button class="btn btn-principal" onclick="UI.enviarOfertaClub(${id}${previa ? ',' + previa.id : ''})">ENVIAR OFERTA 📨</button>
    </div>`);
};

UI.enviarOfertaClub = function (id, ofIdPrevia) {
  const terminos = UI.leerTerminosPersonales('oc');
  terminos.importe = parseInt($('#oc-importe').value, 10) || 0;
  terminos.pagos = parseInt($('#oc-pagos').value, 10) || 1;
  terminos.incluidos = $$('.oc-incl:checked').map(c => +c.value);
  if (!terminos.importe) { UI.aviso('❌ Indica el importe ofrecido al club.'); return; }
  enviarYavisar(UI.st, { tipo: 'club', jugadorId: id, terminos }, ofIdPrevia);
};

UI.dialogoCesion = function (id, previa) {
  const st = UI.st;
  const j = st.players.find(p => p.id === id);
  if (!j) return;
  const pedido = Math.round(Math.max(50000, j.valor * 0.05) / 1000) * 1000;
  const t = previa ? previa.contra || previa.terminos : {};
  UI.modal(`
    <h3>PETICIÓN DE CESIÓN — ${st.teams[j.equipo].nom.toUpperCase()}</h3>
    <p style="font-size:13px">${j.nombre} · ${j.pos} · ${j.edad} años · Media <b>${j.media}</b> · Salario actual ${fmtM(j.salario)}</p>
    <p style="color:var(--gris);font-size:12px;margin-top:6px">El club pide ≈<b>${fmtM(pedido)}</b> de prima por la cesión (hasta final de temporada). Puedes acordar qué parte del salario pagas tú.</p>
    <div class="fila-form"><label>PRIMA POR LA CESIÓN:</label><input type="number" id="cs-prima" step="10000" min="0" value="${t.prima ?? pedido}"></div>
    <div class="fila-form"><label>SALARIO A TU CARGO:</label>
      <select id="cs-salario">
        ${[[100, '100% (completo)'], [75, '75%'], [50, '50%']].map(([v, l]) => `<option value="${v}" ${(t.pctSalario || 100) === v ? 'selected' : ''}>${l}</option>`).join('')}
      </select>
    </div>
    <div class="modal-acciones">
      <button class="btn btn-sec" onclick="UI.cerrarModal()">CANCELAR</button>
      <button class="btn btn-principal" onclick="UI.enviarCesion(${id}${previa ? ',' + previa.id : ''})">SOLICITAR CESIÓN 📨</button>
    </div>`);
};

UI.enviarCesion = function (id, ofIdPrevia) {
  const terminos = {
    prima: parseInt($('#cs-prima').value, 10) || 0,
    pctSalario: parseInt($('#cs-salario').value, 10) || 100
  };
  enviarYavisar(UI.st, { tipo: 'cesion', jugadorId: id, terminos }, ofIdPrevia);
};

UI.mejorarOferta = function (ofId) {
  const of = UI.st.ofertasEnviadas.find(o => o.id === ofId);
  if (!of) return;
  if (of.tipo === 'libre') UI.dialogoLibre(of.jugadorId);
  else if (of.tipo === 'club') UI.dialogoOfertaTraspaso(of.jugadorId, of);
  else if (of.tipo === 'cesion') UI.dialogoCesion(of.jugadorId, of);
};

UI.descartarOferta = function (ofId) {
  UI.st.ofertasEnviadas = UI.st.ofertasEnviadas.filter(o => o.id !== ofId);
  UI.autosave(UI.st);
  UI.renderTab();
};

UI.aceptarVenta = function (i) {
  const r = SEASON.aceptarOfertaVenta(UI.st, i);
  UI.aviso(r.ok ? '✅ ' + r.msg : '❌ ' + r.msg);
  UI.renderTab();
};

UI.aviso = function (txt) {
  UI.modal(`<p>${txt}</p><div class="modal-acciones"><button class="btn btn-principal" onclick="UI.cerrarModal()">ACEPTAR</button></div>`);
};

/* ---------- TAB FINANZAS ---------- */
UI.tabFinanzas = function () {
  const st = UI.st;
  const salarios = st.players.filter(p => p.equipo === st.userTeam).reduce((s, p) => s + p.salario, 0);
  const semSal = Math.round(salarios / 4.33);
  const netoSemanal = st.patrocinador - semSal - 35000;
  $('#hub-contenido').innerHTML = `
    <div class="finanzas-grid">
      <div class="fin-caja"><div class="etq">SALDO DEL CLUB</div><div class="val">${fmtM(st.finanzas.saldo)}</div></div>
      <div class="fin-caja"><div class="etq">PRESUPUESTO FICHAJES</div><div class="val">${fmtM(st.finanzas.presup)}</div></div>
      <div class="fin-caja"><div class="etq">INGRESOS SEMANALES</div><div class="val imp-pos">+${fmtM(st.patrocinador)}</div></div>
      <div class="fin-caja"><div class="etq">GASTOS SEMANALES</div><div class="val imp-neg">-${fmtM(semSal + 35000)}</div></div>
      <div class="fin-caja"><div class="etq">BALANCE SEMANAL</div><div class="val ${netoSemanal >= 0 ? 'imp-pos' : 'imp-neg'}">${netoSemanal >= 0 ? '+' : ''}${fmtM(netoSemanal)}</div></div>
    </div>
    <div class="card"><h3>ÚLTIMOS MOVIMIENTOS</h3>
      <div class="log-finanzas">
        ${st.finanzas.log.slice(0, 40).map(m => `<div class="noticia-item"><time>J${m.j}·${String(m.anio).slice(2)}</time>${m.desc} <span style="float:right" class="${m.imp >= 0 ? 'imp-pos' : 'imp-neg'}">${m.imp >= 0 ? '+' : ''}${fmtM(m.imp)}</span></div>`).join('')}
      </div></div>`;
};

/* ---------- TAB ENTRENAMIENTO ---------- */
UI.tabEntrenamiento = function () {
  const ops = [
    ['equilibrado', 'EQUILIBRADO', 'Mejora general moderada para toda la plantilla.'],
    ['juveniles', 'JUVENILES', 'Prioriza a los menores de 24. Los veteranos apenas progresan.'],
    ['fisico', 'FÍSICO', 'Trabajo de velocidad y físico. Ideal tras lesiones masivas.'],
    ['tecnica', 'TÉCNICA', 'Regate, técnica y pase. Para mediapuntas y delanteros.'],
    ['defensa', 'DEFENSA', 'Defensa y físico. Refuerza tu zaga.'],
    ['recuperacion', 'RECUPERACIÓN', 'Los lesionados se recuperan antes y con mejor forma.']
  ];
  $('#hub-contenido').innerHTML = `
    <div class="card">
      <h3>PLAN DE ENTRENAMIENTO SEMANAL</h3>
      <p style="color:var(--gris);font-size:12px;margin-bottom:12px">Cada semana hay una probabilidad de que los jugadores mejoren atributos según el enfoque elegido.</p>
      <div class="entrenamiento-opciones">
        ${ops.map(([k, nom, desc]) => `<div class="ent-op ${UI.st.entrenamiento === k ? 'sel' : ''}" onclick="UI.setEntrenamiento('${k}')">
          <b>${nom}</b><small>${desc}</small></div>`).join('')}
      </div>
    </div>`;
};

UI.setEntrenamiento = function (k) {
  UI.st.entrenamiento = k;
  UI.autosave();
  UI.renderTab();
};

/* ============================================================
   FLUJO DE JORNADA Y PARTIDOS
   ============================================================ */
UI.partidoActual = null; // {fixture, esCopa}

UI.jugarJornada = function () {
  const st = UI.st;
  const copaUser = SEASON.partidoCopaPendiente(st);

  if (copaUser) {
    // Semana de Copa: la liga se simula entera (incluido nuestro partido) y jugamos la Copa en vivo
    SEASON.simularJornadaLiga(st, true);
    const res = ENGINE.simularPartido(st, copaUser.h, copaUser.a, true);
    copaUser.hg = res.hg; copaUser.ag = res.ag; copaUser.jugado = true; copaUser.penaltis = res.penaltis ?? null;
    UI.partidoActual = { tipo: 'copa', fixture: copaUser, res, extra: null };
  } else {
    const { resultados, partidoUsuario } = SEASON.simularJornadaLiga(st);
    if (partidoUsuario) {
      const esLocal = partidoUsuario.h === st.userTeam;
      const res = ENGINE.simularPartido(st, partidoUsuario.h, partidoUsuario.a, false);
      UI.partidoActual = { tipo: 'liga', fixture: partidoUsuario, res, extra: resultados };
    } else {
      // Sin partido propio (no debería pasar): solo resultados
      UI.resultadosJornada(resultados, null, null);
      return;
    }
  }
  Match.empezar(UI.partidoActual.fixture, UI.partidoActual.res);
};

// Se llama desde Match al terminar el encuentro en vivo
UI.finPartidoEnVivo = function () {
  const pa = UI.partidoActual;
  const st = UI.st;
  let todosResultados = [];

  if (pa.tipo === 'liga') {
    todosResultados = pa.extra.map(r => ({ h: r.h, a: r.a, hg: r.hg, ag: r.ag }));
    todosResultados.push({ h: pa.fixture.h, a: pa.fixture.a, hg: pa.fixture.hg, ag: pa.fixture.ag });
  } else {
    // Liga ya simulada: recoger los resultados de esta jornada
    for (const div of [1, 2]) {
      const cal = st.fixtures[div];
      if (st.jornada <= cal.length) {
        for (const p of cal[st.jornada - 1]) {
          if (p.jugado) todosResultados.push({ h: p.h, a: p.a, hg: p.hg, ag: p.ag, copa: false });
        }
      }
    }
    SEASON.cerrarRondaCopa(st, pa.fixture);
    // Añadir resultados de copa
    const ronda = st.copa.rondas[Math.max(0, st.copa.ronda - 1)];
    if (ronda) for (const p of ronda) todosResultados.push({ h: p.h, a: p.a, hg: p.hg, ag: p.ag, pen: p.penaltis, copa: true });
  }

  UI.resultadosJornada(todosResultados, pa.fixture, pa.tipo);
};

UI.resultadosJornada = function (resultados, fixtureUser, tipo) {
  const st = UI.st;
  const t = st.teams[st.userTeam];
  $('#res-titulo').textContent = `RESULTADOS · JORNADA ${st.jornada}${tipo === 'copa' ? ' · COPA DEL REY' : ''}`;
  const fila = r => {
    const esUser = r.h === t.id || r.a === t.id;
    return `<div class="res-fila ${esUser ? 'user' : ''}">
      <span>${r.copa ? '🥇 ' : ''}${st.teams[r.h].nom}</span>
      <span class="marcador-res">${r.hg}-${r.ag}${r.pen ? ` (p.${r.pen[0]}-${r.pen[1]})` : ''}</span>
      <span>${st.teams[r.a].nom}</span></div>`;
  };
  const liga = resultados.filter(r => !r.copa);
  const copa = resultados.filter(r => r.copa);
  let html = '';
  if (liga.length) html += `<div><h3 style="color:var(--cyan);margin-bottom:8px;font-size:18px">${DATA.DIVISIONES[1].nombre}</h3>${liga.filter(r => st.teams[r.h].div === 1).map(fila).join('')}
    <h3 style="color:var(--cyan);margin:12px 0 8px;font-size:18px">${DATA.DIVISIONES[2].nombre}</h3>${liga.filter(r => st.teams[r.h].div === 2).map(fila).join('')}</div>`;
  if (copa.length) html += `<div><h3 style="color:var(--cyan);margin-bottom:8px;font-size:18px">COPA DEL REY</h3>${copa.map(fila).join('')}</div>`;
  $('#res-cuerpo').innerHTML = `<div class="resultados-grid">${html}</div>`;
  UI.mostrarPantalla('resultados');
};

UI.continuarTrasResultados = function () {
  const st = UI.st;
  SEASON.cerrarJornada(st);
  if (st.finTemporada) {
    UI.pantallaFinTemporada();
  } else {
    UI.abrirHub();
  }
};

/* ============================================================
   FIN DE TEMPORADA
   ============================================================ */
UI.pantallaFinTemporada = function () {
  const st = UI.st;
  const t = st.teams[st.userTeam];
  const campeon = id => st.teams[id] ? `${UI.escudoHTML(st.teams[id], 'club-badge')} <b>${st.teams[id].nom}</b>` : '—';
  const tablaDiv = st.resultadoFinal ? ENGINE.clasificacion(st, st.resultadoFinal.div) : [];
  const posUser = st.resultadoFinal?.pos;

  const titulo = st.despedido ? 'DESPEDIDO'
    : posUser && posUser <= st.objetivo.min ? '¡TEMPORADA BRILLANTE!'
      : posUser && posUser <= st.objetivo.max ? 'OBJETIVO CUMPLIDO'
        : 'TEMPORADA DISCRETA';
  const iconoTitulo = st.despedido ? '❌' : posUser === 1 ? '🏆' : '📋';

  $('#fin-cuerpo').innerHTML = `
    <div class="fin-hero">
      <div class="titulo-gordo">${iconoTitulo} ${titulo}</div>
      <div class="sub-gordo">TEMPORADA ${st.anio}/${String(st.anio + 1).slice(2)} · ${t.nom} · POSICIÓN: ${posUser}ª · OBJETIVO "${st.objetivo.texto}"</div>
    </div>
    ${st.campeones ? `<div class="trofeos">
      <div class="trofeo-caja"><div class="trofeo-icon">🏆</div><div class="trofeo-comp">1ª DIVISIÓN</div><div class="trofeo-eq">${campeon(st.campeones.d1)}</div></div>
      <div class="trofeo-caja"><div class="trofeo-icon">🥈</div><div class="trofeo-comp">2ª DIVISIÓN</div><div class="trofeo-eq">${campeon(st.campeones.d2)}</div></div>
      ${st.campeones.copa ? `<div class="trofeo-caja"><div class="trofeo-icon">🥇</div><div class="trofeo-comp">COPA DEL REY</div><div class="trofeo-eq">${campeon(st.campeones.copa)}</div></div>` : ''}
    </div>` : ''}
    <div class="dos-tablas">
      <div class="card"><h3>CLASIFICACIÓN FINAL</h3>
        <table class="tabla">${tablaDiv.map(f => `<tr class="${f.id === st.userTeam ? 'tr-user' : ''}"><td>${f.pos}</td><td>${f.nom}</td><td class="num"><b>${f.pts}</b></td></tr>`).join('')}</table>
      </div>
      <div class="card"><h3>ÚLTIMAS NOTICIAS</h3><div class="noticias-lista">${st.noticias.slice(0, 6).map(n => `<div class="noticia-item"><time>J${n.j}·${String(n.anio).slice(2)}</time>${n.txt}</div>`).join('')}</div></div>
    </div>
    <div class="acciones-panel">
      ${st.despedido
      ? `<button class="btn btn-peligro" onclick="UI.irNuevaPartida()">COMENZAR UNA NUEVA AVENTURA</button>`
      : `<button class="btn btn-principal" onclick="UI.continuarSiguienteTemporada()">CONTINUAR A TEMPORADA ${st.anio + 1}/${String(st.anio + 2).slice(2)} ▶</button>`}
    </div>`;
  UI.mostrarPantalla('finTemporada');
};

UI.continuarSiguienteTemporada = function () {
  SEASON.siguienteTemporada(UI.st);
  UI.abrirHub();
};

/* ============================================================
   MENÚ DE PARTIDA (dentro del hub)
   ============================================================ */
UI.abrirMenuPartida = function () {
  UI.modal(`
    <h3>MENÚ DE PARTIDA</h3>
    <p style="font-size:13px;color:var(--gris)">La partida se guarda automáticamente cada jornada.</p>
    <div class="modal-acciones" style="flex-direction:column;align-items:stretch">
      <button class="btn" onclick="UI.guardarSlot(1)">GUARDAR EN RANURA 1</button>
      <button class="btn" onclick="UI.guardarSlot(2)">GUARDAR EN RANURA 2</button>
      <button class="btn" onclick="UI.guardarSlot(3)">GUARDAR EN RANURA 3</button>
      <button class="btn btn-peligro" onclick="UI.salirAlMenu()">SALIR AL MENÚ PRINCIPAL</button>
    </div>
    <div class="modal-acciones"><button class="btn btn-sec" onclick="UI.cerrarModal()">CERRAR</button></div>`);
};

UI.guardarSlot = function (n) {
  const ok = SEASON.guardar(UI.st, n);
  UI.cerrarModal();
  UI.aviso(ok ? `✅ Partida guardada en la ranura ${n}.` : '❌ No se pudo guardar.');
};

UI.salirAlMenu = function () {
  UI.autosave();
  UI.st = null;
  UI.cerrarModal();
  UI.volverMenu();
};
