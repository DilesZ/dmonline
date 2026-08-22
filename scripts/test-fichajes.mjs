import fs from 'node:fs';
import vm from 'node:vm';

Object.assign(globalThis, {
  clamp: (v, a, b) => Math.max(a, Math.min(b, v)),
  rndInt: (a, b) => Math.floor(a + Math.random() * (b - a + 1)),
  rnd: (a, b) => a + Math.random() * (b - a),
  pick: a => a[Math.floor(Math.random() * a.length)],
  shuffle: a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
  fmtM: v => v >= 1e6 ? (v / 1e6).toFixed(2).replace('.', ',') + ' mill. €' : Math.round(v / 1e3) + ' mil €',
  DATA: { FORMACIONES: { '4-4-2': [] }, DIVISIONES: {} },
  ENGINE: {
    noticia: (st, t) => st.noticias.unshift({ j: st.jornada, anio: st.anio, txt: t }),
    movimientoFinanzas: (st, imp, d) => { st.finanzas.saldo += imp; st.finanzas.log.unshift({ j: st.jornada, anio: st.anio, desc: d, imp }); },
    autoAlinear: () => {},
    calcValor: j => j.valor || 1000000
  },
  UI: { autosave: () => {} }
});

const src = [
  fs.readFileSync('public/pcfutbol/js/engine.js', 'utf8').replace(/^const DATA = \{\};/m, '// DATA externo'),
  fs.readFileSync('public/pcfutbol/js/season.js', 'utf8'),
  `
// Stubs ligeros sobre el ENGINE real para aislar la lógica de fichajes
ENGINE.autoAlinear = () => {};
ENGINE.calcValor = j => j.valor || 1000000;
ENGINE.noticia = (st, t) => st.noticias.unshift({ j: st.jornada, anio: st.anio, txt: t });
ENGINE.movimientoFinanzas = (st, imp, d) => { st.finanzas.saldo += imp; st.finanzas.log.unshift({ j: st.jornada, anio: st.anio, desc: d, imp }); };
`,
  `
// ===== PRUEBAS =====
let fallos = 0;
const assert = (c, m) => { console.log((c ? 'OK   ' : 'FALLO') + ' - ' + m); if (!c) fallos++; };
function nuevoJ(id, nom, equipo, extra = {}) {
  return { id, nombre: nom, pos: 'MED', edad: 26, media: 75, potencial: 80, salario: 400000,
    valor: 5000000, contrato: 3, moral: 70, forma: 90, lesion: 0, sancion: 0, equipo,
    enVenta: false, cedible: false, attrs: {}, golesTemp: {}, ...extra };
}
const st = {
  userTeam: 1, jornada: 10, anio: 2026, patrocinador: 0, entrenamiento: 'equilibrado',
  noticias: [], ofertasRecibidas: [],
  finanzas: { saldo: 20000000, presup: 15000000, log: [], bonos: 0, pagos: [] },
  teams: { 1: { id: 1, nom: 'MI CLUB', abr: 'MIO', str: 78, div: 1, saldo: 20000000, presup: 15000000, lastResults: [] },
           2: { id: 2, nom: 'RIVAL FC', abr: 'RIV', str: 72, div: 1, saldo: 8000000, presup: 6000000, lastResults: [] } },
  players: [
    nuevoJ(101, 'Objetivo Estrella', 2, { enVenta: true }),
    nuevoJ(102, 'Moneda de Cambio', 1),
    nuevoJ(103, 'Cedible Joven', 2, { cedible: true, edad: 20 })
  ],
  libres: [nuevoJ(201, 'Libre Dorado', null)]
};

// --- 1) AGENTE LIBRE ---
const eL = SEASON.exigenciasLibre(st.libres[0]);
let r = SEASON.enviarOfertaUsuario(st, { tipo: 'libre', jugadorId: 201, terminos: {
  prima: eL.prima, ficha: eL.ficha * 1.4, anios: 3, clausula: eL.clausula * 2,
  bonusPartido: eL.bonusPartido, primaGol: eL.primaGol, libertadDesc: false } });
assert(r.ok, 'libre: oferta enviada -> ' + r.msg);
assert(st.ofertasEnviadas[0].estado === 'pendiente', 'libre: queda pendiente tras enviar');

SEASON.procesarOfertas(st);
assert(st.ofertasEnviadas[0].estado === 'pendiente', 'libre: NO resuelve en la misma jornada');

st.jornada++;
SEASON.procesarOfertas(st);
assert(st.ofertasEnviadas[0].estado === 'aceptada', 'libre: aceptada tras 1 jornada (' + st.ofertasEnviadas[0].respuesta + ')');
assert(st.libres.length === 0 && st.players.find(p => p.id === 201).equipo === 1, 'libre: jugador incorporado al equipo');
assert(st.finanzas.saldo < 20000000, 'libre: prima cobrada');

// --- 2) TRASPASO FRACCIONADO CON JUGADOR INCLUIDO ---
const objetivo = st.players.find(p => p.id === 101);
const pide = SEASON.pideClub(st, objetivo);
const importe = pide * 1.5;
r = SEASON.enviarOfertaUsuario(st, { tipo: 'club', jugadorId: 101, terminos: {
  importe, pagos: 3, incluidos: [102],
  prima: 0, ficha: eL.ficha * 1.4, anios: 4, clausula: eL.clausula * 2,
  bonusPartido: eL.bonusPartido, primaGol: eL.primaGol, libertadDesc: false } });
assert(r.ok, 'club: oferta enviada -> ' + r.msg);
const saldoAntes = st.finanzas.saldo;
st.jornada++;
SEASON.procesarOfertas(st);
const ofClub = st.ofertasEnviadas.find(o => o.tipo === 'club');
assert(ofClub.estado === 'aceptada', 'club: aceptada (' + ofClub.respuesta + ')');
assert(objetivo.equipo === 1, 'club: jugador llega al usuario');
assert(st.players.find(p => p.id === 102).equipo === 2, 'club: incluido traspasado al rival');
const cuotaEsperada = Math.round(importe / 3);
assert(Math.abs(saldoAntes - st.finanzas.saldo - cuotaEsperada) < 1000, 'club: solo 1ª plaza cobrada ahora');
assert(st.finanzas.pagos.length === 2 && st.finanzas.pagos.every(p => p.anio > st.anio), 'club: 2 plazas futuras programadas');
assert(objetivo.contrato === 4 && objetivo.clausula > 0, 'club: contrato personal aplicado');

// --- 3) CESIÓN ---
const cedido = st.players.find(p => p.id === 103);
const pedido = Math.round(Math.max(50000, cedido.valor * 0.05) / 1000) * 1000;
r = SEASON.enviarOfertaUsuario(st, { tipo: 'cesion', jugadorId: 103, terminos: { prima: pedido, pctSalario: 75 } });
assert(r.ok, 'cesion: solicitud enviada');
st.jornada++;
SEASON.procesarOfertas(st);
const ofCes = st.ofertasEnviadas.find(o => o.tipo === 'cesion');
assert(ofCes.estado === 'aceptada', 'cesion: aceptada (' + ofCes.respuesta + ')');
assert(cedido.equipo === 1 && cedido.cesionDe === 2, 'cesion: jugador cedido al usuario');
assert(cedido.salarioOriginal === 400000 && cedido.salario === 300000, 'cesion: salario al 75% con original guardado');

console.log('\\n' + (fallos ? fallos + ' FALLOS' : 'TODAS LAS PRUEBAS SUPERADAS'));
process.exit(fallos ? 1 : 0);
`
];

vm.runInThisContext(src.join('\n\n'), { filename: 'harness.js' });
