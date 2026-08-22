/* ============================================================
   PC FÚTBOL 2026 - Reproductor de partido en vivo
   Reproduce minuto a minuto los eventos pre-simulados
   ============================================================ */

const Match = {};
Match.minuto = 0;
Match.vel = 1;
Match.jugando = false;
Match.timer = null;
Match.res = null;
Match.fixture = null;

Match.empezar = function (fixture, res) {
  Match.fixture = fixture;
  Match.res = res;
  Match.minuto = 0;
  Match.jugando = false;
  clearInterval(Match.timer);

  const st = UI.st;
  const tH = st.teams[fixture.h], tA = st.teams[fixture.a];
  $('#pm-eqH').innerHTML = `<div class="mini-badge" style="background:${tH.cols[0]};color:${tH.cols[1]}">${tH.abr}</div> ${tH.nom}`;
  $('#pm-eqA').innerHTML = `${tA.nom} <div class="mini-badge" style="background:${tA.cols[0]};color:${tA.cols[1]}">${tA.abr}</div>`;
  $('#pm-score').textContent = '0 - 0';
  $('#pm-minuto').textContent = "0'";
  $('#pm-narracion').innerHTML = '';
  $('#pm-stats').innerHTML = '<span>POSESIÓN <b>50-50</b></span><span>TIROS <b>0-0</b></span><span>PARADAS <b>0-0</b></span>';
  $('#pm-play').textContent = '▶ JUGAR';
  UI.mostrarPantalla('partido');

  // Mostrar evento de inicio
  Match.pintarEventosHasta(0);
};

Match.playPause = function () {
  Match.jugando = !Match.jugando;
  $('#pm-play').textContent = Match.jugando ? '⏸ PAUSA' : '▶ SEGUIR';
  if (Match.jugando) {
    Match.timer = setInterval(Match.tick, Math.max(30, 320 / Match.vel));
  } else {
    clearInterval(Match.timer);
  }
};

Match.velocidad = function (v) {
  Match.vel = v;
  if (Match.jugando) {
    clearInterval(Match.timer);
    Match.timer = setInterval(Match.tick, Math.max(30, 320 / v));
  }
};

Match.saltar = function () {
  Match.minuto = 90;
  Match.pintarEventosHasta(90);
  Match.fin();
};

Match.tick = function () {
  if (!Match.jugando) return;
  Match.minuto++;
  Match.pintarEventosHasta(Match.minuto);
  if (Match.minuto >= 90) {
    Match.fin();
  }
};

Match.pintarEventosHasta = function (min) {
  const res = Match.res;
  const st = UI.st;
  const narr = $('#pm-narracion');
  let nuevos = '';
  for (const ev of res.eventos) {
    if (ev._pintado) continue;
    if (ev.min > min) break;
    ev._pintado = true;
    const cls = ev.tipo === 'gol' ? 'ev-gol' : ev.tipo === 'roja' ? 'ev-roja' : ev.tipo === 'lesion' ? 'ev-lesion'
      : (ev.tipo === 'descanso' || ev.tipo === 'inicio') ? 'ev-descanso' : '';
    const lado = ev.lado === 'h' ? st.teams[Match.fixture.h].abr : ev.lado === 'a' ? st.teams[Match.fixture.a].abr : '';
    nuevos += `<p class="${cls}"><span class="min-tag">${ev.min}'${lado ? ' · ' + lado : ''}</span>${ev.txt}</p>`;
  }
  if (nuevos) {
    narr.insertAdjacentHTML('beforeend', nuevos);
    narr.scrollTop = narr.scrollHeight;
  }
  // Marcador y minuto
  let hg = 0, ag = 0;
  for (const ev of res.eventos) {
    if (ev.tipo === 'gol' && ev.min <= min) ev.lado === 'h' ? hg++ : ag++;
  }
  $('#pm-score').textContent = `${hg} - ${ag}`;
  $('#pm-minuto').textContent = `${Math.min(min, 90)}'`;
  const s = res.stats;
  const posH = min > 0 ? s.posesion : 50;
  $('#pm-stats').innerHTML =
    `<span>POSESIÓN <b>${posH}-${100 - posH}</b></span>
     <span>TIROS <b>${Math.round(s.tirosH * min / 90)}-${Math.round(s.tirosA * min / 90)}</b></span>
     <span>PARADAS <b>${Math.round(s.parsH * min / 90)}-${Math.round(s.parsA * min / 90)}</b></span>`;
};

Match.fin = function () {
  clearInterval(Match.timer);
  Match.jugando = false;
  const res = Match.res;
  const fixture = Match.fixture;
  const st = UI.st;

  // Aplicar resultado al fixture (una sola vez)
  if (!fixture.jugado) {
    fixture.hg = res.hg; fixture.ag = res.ag; fixture.jugado = true;
    if (res.penaltis) fixture.penaltis = res.penaltis;
  }

  const tH = st.teams[fixture.h].abr, tA = st.teams[fixture.a].abr;
  let final = `FINAL: ${tH} ${res.hg}-${res.ag} ${tA}`;
  if (res.penaltis) final += ` · Penaltis: ${res.penaltis[0]}-${res.penaltis[1]}`;
  const ganoUser = (fixture.h === st.userTeam && res.hg > res.ag) || (fixture.a === st.userTeam && res.ag > res.hg);
  const penUser = res.penaltis && ((fixture.h === st.userTeam && res.penaltis[0] > res.penaltis[1]) || (fixture.a === st.userTeam && res.penaltis[1] > res.penaltis[0]));
  $('#pm-narracion').insertAdjacentHTML('beforeend',
    `<p class="ev-descanso"><span class="min-tag">90'</span>${final}</p>
     <p style="color:${ganoUser || penUser ? 'var(--verde)' : res.hg === res.ag ? 'var(--gris)' : 'var(--rojo)'};font-weight:600">
       ${ganoUser || penUser ? '¡VICTORIA!' : res.hg === res.ag && !penUser ? 'EMPATE' : 'DERROTA'}
     </p>`);
  $('#pm-narracion').scrollTop = 999999;
  $('#pm-play').textContent = '▶ JUGAR';

  // Botón continuar
  setTimeout(() => {
    $('#pm-play').onclick = null;
    UI.finPartidoEnVivo();
  }, 1400);
};
