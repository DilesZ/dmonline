'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

interface DriveRom {
  id: string;
  name: string;
  core?: string;
  cover?: string;
}

interface LibraryItem {
  id: string;
  title: string;
  core: string;
  href: string;
  covers: string[];
  previews: string[];
  videos: string[];
}

const SYS_BY_CORE: Record<string, string> = {
  snes: 'Nintendo - Super Nintendo Entertainment System',
  nes: 'Nintendo - Nintendo Entertainment System',
  segaMD: 'Sega - Mega Drive - Genesis',
  arcade: 'FBNeo - Arcade Games',
  nds: 'Nintendo - Nintendo DS',
  gba: 'Nintendo - Game Boy Advance',
  manager: 'JuegosZ Originals',
};

const CORE_LABEL: Record<string, string> = {
  snes: 'SNES',
  arcade: 'ARCADE',
  segaMD: 'MEGA DRIVE',
  nes: 'NES',
  nds: 'NINTENDO DS',
  gba: 'GAME BOY ADVANCE',
  manager: 'MANAGER',
};

const ACCENT: Record<string, { main: string; soft: string; glow: string }> = {
  snes: { main: '#8b5cf6', soft: 'rgba(139,92,246,.16)', glow: 'rgba(139,92,246,.55)' },
  nes: { main: '#fb7185', soft: 'rgba(251,113,133,.14)', glow: 'rgba(251,113,133,.5)' },
  segaMD: { main: '#38bdf8', soft: 'rgba(56,189,248,.14)', glow: 'rgba(56,189,248,.5)' },
  arcade: { main: '#e879f9', soft: 'rgba(232,121,249,.15)', glow: 'rgba(232,121,249,.55)' },
  nds: { main: '#34d399', soft: 'rgba(52,211,153,.14)', glow: 'rgba(52,211,153,.5)' },
  gba: { main: '#818cf8', soft: 'rgba(129,140,248,.14)', glow: 'rgba(129,140,248,.5)' },
  manager: { main: '#fbbf24', soft: 'rgba(251,191,36,.14)', glow: 'rgba(251,191,36,.5)' },
};

function accentOf(core: string) {
  return ACCENT[core] ?? ACCENT.snes;
}

// Distintivo corto de plataforma para el índice
const SYS_MARK: Record<string, string> = {
  snes: 'SN',
  nes: 'NE',
  segaMD: 'MD',
  arcade: 'AR',
  manager: 'PF',
};

// Logos oficiales de plataforma (Wikimedia Commons). w = ancho del slot según proporción del logo
const PLATFORM_LOGO: Record<string, { src: string; w: number }> = {
  snes: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Super_Nintendo_Entertainment_System_logo.svg/250px-Super_Nintendo_Entertainment_System_logo.svg.png', w: 74 },
  nes: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/NES_logo.svg/120px-NES_logo.svg.png', w: 56 },
  segaMD: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/SEGA_logo.svg/250px-SEGA_logo.svg.png', w: 64 },
  arcade: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Crystal128-input-gaming.svg/120px-Crystal128-input-gaming.svg.png', w: 52 },
  nds: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Nintendo_DS_Logo.svg/120px-Nintendo_DS_Logo.svg.png', w: 88 },
  gba: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Game_Boy_Advance_logo.svg/250px-Game_Boy_Advance_logo.svg.png', w: 96 },
  manager: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Soccer_ball.svg/120px-Soccer_ball.svg.png', w: 48 },
};

function SysLogo({ core, fallback }: { core: string; fallback: string }) {
  const logo = PLATFORM_LOGO[core];
  const [err, setErr] = useState(false);
  if (!logo || err) return <>{fallback}</>;
  return <img src={logo.src} alt="" loading="lazy" onError={() => setErr(true)} />;
}

// Vídeo gameplay en bucle (estilo RetroArch) por nombre de ROM sin extensión.
// Fuente: packs públicos de video-snaps en archive.org (MAME, Mega Drive, SNES).
const GAME_VIDEOS: Record<string, string> = {
  // Arcade (MAME video snaps)
  pang: 'https://archive.org/download/mamearcade-video-snaps/pang.mp4',
  snowbros: 'https://archive.org/download/mamearcade-video-snaps/snowbros.mp4',
  snowbro2: 'https://archive.org/download/mamearcade-video-snaps/snowbro2.mp4',
  spang: 'https://archive.org/download/mamearcade-video-snaps/spang.mp4',
  tumbleb: 'https://archive.org/download/mamearcade-video-snaps/tumblep.mp4',
  wjammers: 'https://archive.org/download/mamearcade-video-snaps/wjammers.mp4',
  // Mega Drive / Genesis
  columns: 'https://archive.org/download/SegaMegaDriveGenesisVideos/Columnsworldv1.1.mp4',
  'golden axe': 'https://archive.org/download/SegaMegaDriveGenesisVideos/GoldenAxeworldv1.1.mp4',
  'sonic & knuckles': 'https://archive.org/download/SegaMegaDriveGenesisVideos/SonicKnucklesworld.mp4',
  'sonic the hedgehog (usa, europe)': 'https://archive.org/download/SegaMegaDriveGenesisVideos/SonicTheHedgehogusaEurope.mp4',
  'streets of rage': 'https://archive.org/download/SegaMegaDriveGenesisVideos/StreetsOfRageworldrevA.mp4',
  // Super Nintendo
  'mega man 7': 'https://archive.org/download/super-nintendo-entertainment-system-video-snaps/Mega%20Man%207%20(USA).mp4',
  'mega man x': 'https://archive.org/download/super-nintendo-entertainment-system-video-snaps/Mega%20Man%20X%20(USA).mp4',
  'super mario all-stars': 'https://archive.org/download/super-nintendo-entertainment-system-video-snaps/Super%20Mario%20All-Stars%20(USA).mp4',
  'super mario kart': 'https://archive.org/download/super-nintendo-entertainment-system-video-snaps/Super%20Mario%20Kart%20(USA).mp4',
  'super mario world': 'https://archive.org/download/super-nintendo-entertainment-system-video-snaps/Super%20Mario%20World%20(USA).mp4',
  // Game Boy Advance
  'zelda a link to the past & four swords': 'https://archive.org/download/nintendo-game-boy-advance-video-sanps-sq/Legend%20of%20Zelda%2C%20The%20-%20A%20Link%20to%20the%20Past%20%26%20Four%20Swords%20(USA%2C%20Australia).mp4',
};

// Packs públicos de video-snaps con nombres No-Intro → candidatos automáticos por región
const VIDEO_PACK_BY_CORE: Record<string, string> = {
  snes: 'https://archive.org/download/super-nintendo-entertainment-system-video-snaps/',
  nes: 'https://archive.org/download/nintendo-entertainment-system-video-snaps/',
  nds: 'https://archive.org/download/NintendoDSVideoSnaps/',
  gba: 'https://archive.org/download/nintendo-game-boy-advance-video-sanps-sq/',
};

// Títulos de ROM no estándar → nombre No-Intro real (para carátulas)
const COVER_ALIASES: Record<string, string> = {
  'zelda a link to the past & four swords': 'Legend of Zelda, The - A Link to the Past & Four Swords',
};

function thumbCandidates(core: string, target: string): string[] {
  if (/^https?:\/\//.test(target)) return [target];
  const sys = SYS_BY_CORE[core] ?? SYS_BY_CORE.snes;
  const enc = encodeURIComponent;
  const urls: string[] = [];
  const push = (kind: 'Named_Boxarts' | 'Named_Snaps' | 'Named_Titles', name: string) => {
    const u = `https://thumbnails.libretro.com/${enc(sys)}/${kind}/${enc(name)}.png`;
    if (!urls.includes(u)) urls.push(u);
  };

  for (const kind of ['Named_Boxarts', 'Named_Snaps', 'Named_Titles'] as const) push(kind, target);

  // Variantes sin paréntesis/corchetes y con regiones típicas de No-Intro
  const limpio = target.replace(/\s*\([^)]*\)/g, '').replace(/\s*\[[^\]]*\]/g, '').trim();
  const variantes = new Set<string>();
  if (limpio && limpio !== target) variantes.add(limpio);
  const sinRegion = !/\([^)]*\)/.test(target);
  if (sinRegion) for (const r of ['USA', 'Europe', 'Japan', 'World']) variantes.add(`${limpio} (${r})`);

  // Libretro nombra los archivos sustituyendo '&' por '_' ("Sonic _ Knuckles (World)")
  const alt = target.replace(/&/g, '_');
  if (alt !== target) {
    const altLimpio = alt.replace(/\s*\([^)]*\)/g, '').replace(/\s*\[[^\]]*\]/g, '').trim();
    variantes.add(alt);
    if (sinRegion) for (const r of ['USA', 'Europe', 'Japan', 'World']) variantes.add(`${altLimpio} (${r})`);
  }

  // Variantes multiidioma típicas de No-Intro ("(USA) (En,Fr,Es)", "(Europe) (En,Fr,De,Es,It)")
  if (sinRegion) {
    variantes.add(`${limpio} (USA) (En,Fr,Es)`);
    variantes.add(`${limpio} (Europe) (En,Fr,De,Es,It)`);
  }

  for (const v of variantes)
    for (const kind of ['Named_Boxarts', 'Named_Snaps'] as const) push(kind, v);

  return urls;
}

function norm(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function buildRomHref(rom: DriveRom, biosId?: string | null): string {
  const core = rom.core ?? 'snes';
  const params = new URLSearchParams({
    rom: `/api/rom/${encodeURIComponent(rom.name)}?id=${rom.id}`,
    name: rom.name,
    core,
  });

  if (core === 'arcade') {
    if (biosId) {
      params.set('bios', biosId);
    } else {
      params.set('bios', rom.id);
      params.set('biosextract', '1');
    }
  }

  return `/snes_emulator.html?${params.toString()}`;
}

function toLibraryItem(rom: DriveRom, biosId?: string | null): LibraryItem {
  const title = rom.name.replace(/\.[^.]+$/, '');
  const core = rom.core ?? 'snes';
  const coverTarget = core === 'arcade' && rom.cover ? rom.cover : (COVER_ALIASES[title.toLowerCase()] ?? title);
  const romKey = rom.name.replace(/\.[^.]+$/, '').toLowerCase();

  // Vídeo: mapa manual + candidatos automáticos de los packs No-Intro por región
  const videos: string[] = [];
  if (GAME_VIDEOS[romKey]) videos.push(GAME_VIDEOS[romKey]);
  const pack = VIDEO_PACK_BY_CORE[core];
  if (pack) {
    const enc = encodeURIComponent;
    if (/\([^)]*\)/.test(title)) {
      videos.push(`${pack}${enc(title)}.mp4`);
    } else {
      for (const r of ['USA', 'Europe', 'USA, Europe', 'World', 'France', 'Japan']) videos.push(`${pack}${enc(`${title} (${r})`)}.mp4`);
    }
  }

  return {
    id: rom.id,
    title,
    core,
    href: buildRomHref(rom, biosId),
    covers: thumbCandidates(core, coverTarget),
    previews: thumbCandidates(core, coverTarget),
    videos,
  };
}

// Imagen que recorre una lista de URLs hasta encontrar una que cargue
function Thumb({ sources, alt, className }: { sources: string[]; alt: string; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => setI(0), [sources.join('|')]);
  if (i >= sources.length) return null;
  return (
    <img
      src={sources[i]}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setI((v) => v + 1)}
    />
  );
}

// Vídeo gameplay en bucle: recorre fuentes hasta que una cargue; si ninguna, no se muestra
function GameVideo({ sources }: { sources: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => setI(0), [sources.join('|')]);
  if (i >= sources.length) return null;
  return (
    <video
      className="crt-video"
      src={sources[i]}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onError={() => setI((v) => v + 1)}
    />
  );
}

/* ============================================================
   SPOTLIGHT — escenario cinemático con índice tipográfico
   ============================================================ */
function Spotlight({ items, favorites, toggleFavorite, isFavorite }: { items: LibraryItem[]; favorites: Set<string>; toggleFavorite: (id: string) => void; isFavorite: (id: string) => boolean }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [crtIdx, setCrtIdx] = useState(0);

  const go = useCallback(
    (index: number) => {
      setActive((cur) => {
        const next = ((index % items.length) + items.length) % items.length;
        if (next !== cur) {
          setPrev(cur);
          setCrtIdx(0);
        }
        return next;
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (!items.length) return;
    setActive((p) => (p >= items.length ? 0 : p));
  }, [items]);

  // Teclado: flechas navegan, Enter juega
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || !items.length) return;
      if (e.key === 'ArrowRight') { go(active + 1); }
      else if (e.key === 'ArrowLeft') { go(active - 1); }
      else if (e.key === 'Enter') window.open(items[active]?.href, '_blank', 'noopener');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, go, items]);

  // Limpia la capa anterior tras la transición
  useEffect(() => {
    if (prev === null) return;
    const t = window.setTimeout(() => setPrev(null), 700);
    return () => window.clearTimeout(t);
  }, [prev]);

  if (!items.length) return null;
  const current = items[active] ?? items[0];
  const crtSources = useMemo(
    () => [...current.previews, ...current.covers].filter((u, i, a) => a.indexOf(u) === i),
    [current],
  );
  const acc = accentOf(current.core);
  const label = CORE_LABEL[current.core] ?? current.core.toUpperCase();
  const num = String(active + 1).padStart(2, '0');

  return (
    <section
      className="stage-wrap"
      aria-label="Escenario de juegos"
      style={{ '--acc': acc.main, '--acc-soft': acc.soft, '--acc-glow': acc.glow } as React.CSSProperties}
    >
      {/* Fondo ambiental: carátula desenfocada del juego activo */}
      <div className="stage-bg" aria-hidden="true">
        {prev !== null && items[prev] && (
          <Thumb key={'p' + prev} sources={items[prev].covers} alt="" className="bg-img bg-out" />
        )}
        <Thumb key={current.id} sources={current.covers} alt="" className="bg-img bg-in" />
        <div className="bg-veil" />
      </div>

      <div className="stage-body">
        {/* Índice tipográfico — columna izquierda */}
        <aside className="rail-wrap">
          <div className="rail-head">
            <span>ÍNDICE COMPLETO</span>
            <span>{items.length} {items.length === 1 ? 'JUEGO' : 'JUEGOS'}</span>
          </div>
          <div className="rail">
            {items.map((item, index) => {
              const a = accentOf(item.core);
              const on = index === active;
              const sys = SYS_MARK[item.core] ?? item.core.slice(0, 2).toUpperCase();
              return (
                <div
                  key={item.id}
                  className={`rail-item${on ? ' on' : ''}`}
                  style={{ '--i-acc': a.main, '--i-soft': a.soft } as React.CSSProperties}
                  onMouseEnter={() => go(index)}
                  onClick={() => go(index)}
                >
                  <span className="rail-title">{item.title}</span>
                  <span className="rail-sys" title={`${CORE_LABEL[item.core] ?? item.core}`} style={{ '--sys-w': `${PLATFORM_LOGO[item.core]?.w ?? 58}px` } as React.CSSProperties}><SysLogo core={item.core} fallback={sys} /></span>
                  <button
                    className={`rail-fav${isFavorite(item.id) ? ' on' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                    aria-label={isFavorite(item.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                    title={isFavorite(item.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                  >
                    ★
                  </button>
                  <a
                    className="rail-play"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Jugar a ${item.title}`}
                    aria-label={`Jugar a ${item.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    ▶
                  </a>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Escenario principal */}
        <div className="stage-main">
          <div className="spot" key={'t' + active}>
            <div className="spot-topline">
              <span className="spot-sys">{label}</span>
              <span className="spot-num">{num} / {String(items.length).padStart(2, '0')}</span>
            </div>
            <h2 className="spot-title">{current.title}</h2>
            <div className="spot-actions">
              <a className="spot-play" href={current.href} target="_blank" rel="noopener noreferrer">
                <span className="play-tri">▶</span> JUGAR AHORA
              </a>
              <span className="spot-hint">← → cambiar · Enter jugar</span>
            </div>
          </div>

          <div className="crt" key={'c' + active}>
            <div className="crt-inner">
              {crtIdx < crtSources.length ? (
                <img
                  src={crtSources[crtIdx]}
                  alt={`Pantalla de ${current.title}`}
                  onError={() => setCrtIdx((v) => v + 1)}
                  className={crtIdx >= current.previews.length ? 'crt-cover' : undefined}
                />
              ) : (
                <div className="crt-fallback"><span>{current.title}</span></div>
              )}
              {current.videos.length > 0 && <GameVideo sources={current.videos} />}
              <div className="crt-scan" />
            </div>
            <div className="crt-foot">
              <span className="crt-dot" /> READY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PLANTILLA MÓVIL — hero con vídeo arriba, barra fija y lista
   de tarjetas a página completa (sin scroll interno limitado)
   ============================================================ */
function MobileLibrary({
  items, query, setQuery, filter, setFilter, platforms, favorites, toggleFavorite, isFavorite,
}: {
  items: LibraryItem[];
  query: string; setQuery: (v: string) => void;
  filter: string; setFilter: (v: string) => void;
  platforms: string[];
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}) {
  const [active, setActive] = useState(0);
  const [shotIdx, setShotIdx] = useState(0);

  useEffect(() => {
    setActive((p) => (p >= items.length ? 0 : p));
    setShotIdx(0);
  }, [items]);

  const select = (index: number) => {
    setActive(index);
    setShotIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!items.length) return null;

  const current = items[Math.min(active, items.length - 1)];
  const shots = [...current.previews, ...current.covers].filter((u, i, arr) => arr.indexOf(u) === i);
  const acc = accentOf(current.core);
  const label = CORE_LABEL[current.core] ?? current.core.toUpperCase();

  return (
    <section className="mob" aria-label="Biblioteca de juegos">
      {/* Vista previa del juego activo */}
      <div
        className="m-hero"
        key={'h' + current.id}
        style={{ '--acc': acc.main, '--acc-glow': acc.glow } as React.CSSProperties}
      >
        <div className="m-screen">
          {shotIdx < shots.length ? (
            <img
              src={shots[shotIdx]}
              alt={`Pantalla de ${current.title}`}
              onError={() => setShotIdx((v) => v + 1)}
            />
          ) : (
            <div className="m-fallback"><span>{current.title}</span></div>
          )}
          {current.videos.length > 0 && <GameVideo sources={current.videos} />}
          <div className="m-scan" />
          <span className="m-badge">{label}</span>
        </div>
        <div className="m-meta">
          <h2 className="m-title">{current.title}</h2>
          <a className="m-playbig" href={current.href} target="_blank" rel="noopener noreferrer">
            ▶&nbsp;&nbsp;JUGAR AHORA
          </a>
        </div>
      </div>

      {/* Buscador y plataformas fijos */}
      <div className="m-bar">
        <input
          className="search"
          type="search"
          placeholder="Buscar juego..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="m-chips">
          <button className={`fbtn${filter === 'all' ? ' on' : ''}`} onClick={() => setFilter('all')}>
            Todos
          </button>
          <button className={`fbtn${filter === 'favorites' ? ' on' : ''}`} onClick={() => setFilter('favorites')} title="Favoritos">
            ★
          </button>
          {platforms.map((core) => (
            <button
              key={core}
              className={`fbtn${filter === core ? ' on' : ''}`}
              onClick={() => setFilter(core)}
            >
              {CORE_LABEL[core]}
            </button>
          ))}
        </div>
      </div>

      <div className="m-count">
        ÍNDICE COMPLETO · {items.length} {items.length === 1 ? 'JUEGO' : 'JUEGOS'}
      </div>

      {/* Lista de juegos a página completa */}
      <ul className="m-list">
        {items.map((item, index) => {
          const a = accentOf(item.core);
          const ini = item.title.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
          return (
            <li
              key={item.id}
              className={`m-item${index === active ? ' on' : ''}`}
              style={{ '--acc': a.main } as React.CSSProperties}
              onClick={() => select(index)}
            >
              <span className="m-thumbbox">
                <span className="m-thumbini">{ini}</span>
                <Thumb sources={item.covers.slice(0, 4)} alt="" className="m-thumbimg" />
              </span>
              <span className="m-txt">
                <span className="m-name">{item.title}</span>
                <span className="m-sub">{CORE_LABEL[item.core] ?? item.core.toUpperCase()}</span>
              </span>
              <button
                className={`m-fav${isFavorite(item.id) ? ' on' : ''}`}
                onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                aria-label={isFavorite(item.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                title={isFavorite(item.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              >
                ★
              </button>
              <a
                className="m-play"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`Jugar a ${item.title}`}
                aria-label={`Jugar a ${item.title}`}
                onClick={(e) => e.stopPropagation()}
              >
                ▶
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function Home() {
  const [roms, setRoms] = useState<DriveRom[]>([]);
  const [biosId, setBiosId] = useState<string | null>(null);
  const [driveState, setDriveState] = useState<'idle' | 'ok' | 'error'>('idle');
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState('');

  // Favoritos persistidos en localStorage
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  useEffect(() => {
    try {
      const stored = localStorage.getItem('juegosz-favorites');
      if (stored) setFavorites(new Set(JSON.parse(stored)));
    } catch {}
  }, []);
  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try { localStorage.setItem('juegosz-favorites', JSON.stringify([...next])); } catch {}
      return next;
    });
  }, []);
  const isFavorite = (id: string) => favorites.has(id);

  // Plantilla móvil propia por debajo de 860px
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)');
    const upd = () => setIsMobile(mq.matches);
    upd();
    mq.addEventListener('change', upd);
    return () => mq.removeEventListener('change', upd);
  }, []);

  const loadDrive = useCallback(async () => {
    setDriveState('idle');
    try {
      const res = await fetch('/api/drive?action=list');
      if (!res.ok) throw new Error(String(res.status));
      const data: { roms?: DriveRom[]; biosId?: string } = await res.json();
      setRoms(data.roms ?? []);
      setBiosId(data.biosId ?? null);
      setDriveState('ok');
    } catch {
      setDriveState('error');
    }
  }, []);

  useEffect(() => {
    void loadDrive();
  }, [loadDrive]);

  const platforms = useMemo(
    () => Object.keys(CORE_LABEL).filter((c) => c !== 'manager' && roms.some((r) => (r.core ?? 'snes') === c)),
    [roms],
  );

  const webItem = useMemo<LibraryItem>(
    () => ({
      id: 'pcfutbol',
      title: 'PC Fútbol 2026',
      core: 'manager',
      href: '/pcfutbol/',
      covers: ['/pcfutbol/cover.jpg'],
      previews: ['/pcfutbol/cover.jpg'],
      videos: [],
    }),
    [],
  );

  const filteredRoms = useMemo(() => {
    const q = norm(query.trim());
    return roms.filter((rom) => {
      if (filter === 'favorites') {
        if (!favorites.has(rom.id)) return false;
      } else if (filter !== 'all' && (rom.core ?? 'snes') !== filter) return false;
      if (!q) return true;
      return norm(rom.name.replace(/\.[^.]+$/, '')).includes(q);
    });
  }, [filter, query, roms, favorites]);

  const showWebItem =
    filter === 'all' &&
    (query.trim() === '' || norm(webItem.title).includes(norm(query.trim())));

  const spotlightItems = useMemo(
    () => [
      ...(showWebItem ? [webItem] : []),
      ...filteredRoms.map((rom) => toLibraryItem(rom, biosId)),
    ],
    [biosId, filteredRoms, showWebItem, webItem],
  );

  useEffect(() => {
    if (filter !== 'all' && !platforms.includes(filter)) setFilter('all');
  }, [platforms, filter]);

  return (
    <div className="hub">
      <header className="nav">
        <a className="logo" href="/">
          JUEGOS<em>Z</em>
        </a>
        <nav className="links">
          <button
            className={`fbtn${filter === 'all' ? ' on' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button
            className={`fbtn${filter === 'favorites' ? ' on' : ''}`}
            onClick={() => setFilter('favorites')}
            title="Favoritos"
            aria-label="Favoritos"
          >
            ★
          </button>
          {platforms.map((core) => (
            <button
              key={core}
              className={`fbtn${filter === core ? ' on' : ''}`}
              onClick={() => setFilter(core)}
            >
              {CORE_LABEL[core]}
            </button>
          ))}
          <input
            className="search"
            type="search"
            placeholder="Buscar juego..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </nav>
      </header>

      <main>
        {driveState === 'idle' && (
          <div className="stage-wrap skeleton-stage" aria-label="Cargando biblioteca">
            <div className="skel-line w40" />
            <div className="skel-line w80" />
            <div className="skel-line w60" />
            <div className="skel-cta" />
          </div>
        )}

        {driveState === 'error' && (
          <div className="status error">
            <p>No se pudo leer la carpeta de Drive.</p>
            <button onClick={() => void loadDrive()}>Reintentar</button>
          </div>
        )}

        {driveState === 'ok' && roms.length === 0 && (
          <p className="status">
            Todavia no hay juegos. Sube ROMs a la carpeta de Drive (raiz = SNES, o en
            subcarpetas: Arcade, Mega Drive, NES...)
          </p>
        )}

        {driveState === 'ok' && roms.length > 0 && spotlightItems.length === 0 && query.trim() !== '' && (
          <p className="status">Sin resultados para "{query.trim()}"</p>
        )}

        {driveState === 'ok' && spotlightItems.length > 0 && (
          isMobile ? (
            <MobileLibrary
              items={spotlightItems}
              query={query}
              setQuery={setQuery}
              filter={filter}
              setFilter={setFilter}
              platforms={platforms}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          ) : (
            <Spotlight items={spotlightItems} favorites={favorites} toggleFavorite={toggleFavorite} isFavorite={isFavorite} />
          )
        )}
      </main>

      <footer>
        <p className="flogo">
          JUEGOS<em>Z</em>
        </p>
        <p>
          Las ROMs son responsabilidad de cada usuario: utiliza unicamente copias de
          seguridad de juegos que poseas. Este sitio no almacena ni distribuye juegos.
        </p>
        <p className="tech">Mis juegos favoritos de nino</p>
      </footer>

      <style jsx global>{`
        html, body {
          background: #060310;
          color: #e8dff5;
          background-image:
            radial-gradient(ellipse 90% 55% at 50% -12%, rgba(124,58,237,.22), transparent 70%),
            repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,.012) 2px 4px);
        }
        * { box-sizing: border-box; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
        .hub { min-height: 100vh; display: flex; flex-direction: column; }

        /* ===== NAV ===== */
        .nav {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between; gap: 14px;
          padding: 13px 28px;
          background: rgba(8,4,18,.85); backdrop-filter: blur(12px);
          border-bottom: 1px solid #241543;
        }
        .logo {
          font-size: 21px; font-weight: 900; letter-spacing: 2.5px;
          color: #fff; text-decoration: none; text-shadow: 0 0 22px rgba(139,92,246,.55);
          flex-shrink: 0;
        }
        .logo em, .flogo em {
          font-style: normal;
          background: linear-gradient(90deg, #a78bfa, #e879f9);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .links { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; align-items: center; }
        .fbtn {
          font-family: inherit; font-size: 11px; letter-spacing: 1px; font-weight: 800;
          padding: 6px 14px; border-radius: 999px; cursor: pointer;
          color: #c4b5fd; background: rgba(124,58,237,.08);
          border: 1px solid #37265c; transition: all .15s ease;
        }
        .fbtn:hover { border-color: #a78bfa; color: #fff; }
        .fbtn.on {
          color: #fff; background: linear-gradient(90deg, #7c3aed, #c026d3);
          border-color: transparent; box-shadow: 0 0 16px rgba(192,38,211,.4);
        }
        .search {
          width: 210px; max-width: 100%;
          padding: 8px 14px; border-radius: 999px;
          background: #120a20; color: #e8dff5;
          border: 1px solid #37265c;
          font-family: inherit; font-size: 12.5px; font-weight: 600; letter-spacing: .3px;
          outline: none; transition: border-color .15s ease, box-shadow .15s ease;
        }
        .search::placeholder { color: #77689f; }
        .search:focus { border-color: #a78bfa; box-shadow: 0 0 14px rgba(124,58,237,.35); }

        main { flex: 1; width: 100%; max-width: 1280px; margin: 0 auto; padding: 6px 24px 46px; }
        .status { text-align: center; color: #9d8bc7; margin-top: 60px; font-size: 15px; }
        .status.error p { margin-bottom: 14px; color: #fca5a5; }
        .status button {
          padding: 8px 18px; border-radius: 8px; cursor: pointer;
          border: 1px solid #7c3aed; background: transparent; color: #c4b5fd; font-weight: 700;
        }
        .status button:hover { background: #7c3aed; color: #fff; }

        /* ===== STAGE ===== */
        .stage-wrap {
          position: relative;
          border: 1px solid #2b1a4d;
          border-radius: 30px;
          overflow: hidden;
          background:
            radial-gradient(120% 90% at 20% 0%, rgba(30,16,58,.9), rgba(9,5,18,.97)),
            #0a0614;
          box-shadow: 0 30px 80px rgba(0,0,0,.5);
          isolation: isolate;
        }
        .stage-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .bg-img {
          position: absolute; inset: -6%;
          width: 112%; height: 112%;
          object-fit: cover;
          filter: blur(30px) brightness(.30) saturate(1.25);
          transform: scale(1.08);
        }
        .bg-in { animation: bgIn .8s ease both; }
        .bg-out { animation: bgOut .7s ease both; }
        @keyframes bgIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bgOut { from { opacity: 1; } to { opacity: 0; } }
        .bg-veil {
          position: absolute; inset: 0;
          background:
            linear-gradient(90deg, rgba(7,3,15,.94) 0%, rgba(7,3,15,.72) 46%, rgba(7,3,15,.42) 100%),
            radial-gradient(80% 60% at 85% 100%, rgba(0,0,0,.55), transparent 70%);
        }

        .stage-body {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 340px minmax(0, 1fr);
          min-height: 460px;
        }

        /* --- Índice lateral izquierdo --- */
        .rail-wrap {
          display: flex; flex-direction: column;
          border-right: 1px solid rgba(167,139,250,.16);
          background: rgba(5,2,12,.62);
          backdrop-filter: blur(6px);
          min-width: 0;
          min-height: 0;
        }
        .rail-head {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 18px 10px;
          font-size: 10px; font-weight: 900; letter-spacing: 2.6px; color: #77689f;
          border-bottom: 1px solid rgba(167,139,250,.12);
          flex-shrink: 0;
        }
        .rail {
          flex: 1 1 0;
          min-height: 0;
          overflow-y: auto;
          padding: 8px 10px 14px;
          scrollbar-width: thin;
          scrollbar-color: #37265c transparent;
        }
        .rail::-webkit-scrollbar { width: 8px; }
        .rail::-webkit-scrollbar-thumb { background: #37265c; border-radius: 99px; }
        .rail-item {
          display: flex; align-items: center; gap: 13px;
          width: 100%;
          padding: 9px 16px;
          background: transparent; border: 0; border-radius: 12px;
          color: #b9add7; font-family: inherit;
          font-size: 14px; font-weight: 700; letter-spacing: .4px;
          text-align: left; cursor: pointer;
          transition: background .14s ease, color .14s ease, transform .14s ease;
        }
        .rail-item:hover { background: rgba(167,139,250,.08); color: #fff; transform: translateX(4px); }
        .rail-item.on {
          background: linear-gradient(90deg, var(--i-soft), transparent 70%);
          color: #fff;
          box-shadow: inset 3px 0 0 var(--i-acc);
        }
        .rail-title {
          flex: 1; min-width: 0;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .rail-sys {
          flex-shrink: 0;
          width: var(--sys-w, 58px);
          height: calc(var(--sys-w, 58px) * .82);
          display: flex; align-items: center; justify-content: center;
          font-family: 'VT323', monospace; font-size: 24px;
          letter-spacing: .5px;
          color: var(--i-acc);
        }
        .rail-sys img {
          width: 100%; height: 100%;
          object-fit: contain; display: block;
          filter: drop-shadow(0 0 1px rgba(255,255,255,.3)) drop-shadow(0 1px 3px rgba(0,0,0,.55));
          transition: filter .15s ease;
        }
        .rail-item:hover .rail-sys img, .rail-item.on .rail-sys img {
          filter: drop-shadow(0 0 1px rgba(255,255,255,.3)) drop-shadow(0 0 8px var(--i-acc));
        }
        .rail-play {
          flex-shrink: 0;
          margin-left: auto;
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px;
          color: var(--i-acc);
          background: rgba(255,255,255,.05);
          border: 1px solid var(--i-acc);
          text-decoration: none;
          transition: all .14s ease;
        }
        .rail-item:hover .rail-play {
          background: var(--i-acc); color: #0a0614;
          box-shadow: 0 0 16px var(--i-soft);
          transform: scale(1.08);
        }
        .rail-play:active { transform: scale(.94); }

        /* --- Escenario principal (derecha) --- */
        .stage-main {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(260px, .85fr);
          gap: 32px;
          padding: 40px 44px 34px;
          align-items: center;
        }

        /* --- Columna tipográfica --- */
        .spot { animation: spotIn .5s cubic-bezier(.2,.8,.25,1) both; }
        @keyframes spotIn { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        .spot-topline { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .spot-sys {
          font-size: 10.5px; font-weight: 900; letter-spacing: 2.4px; text-transform: uppercase;
          color: var(--acc);
          padding: 5px 12px; border-radius: 999px;
          border: 1px solid var(--acc);
          background: var(--acc-soft);
          box-shadow: 0 0 18px var(--acc-soft);
        }
        .spot-num { font-size: 11px; font-weight: 800; letter-spacing: 2px; color: #77689f; }
        .spot-title {
          margin: 0 0 26px;
          font-size: clamp(30px, 4.6vw, 72px);
          font-weight: 900; line-height: 1.02; letter-spacing: -.5px;
          color: #fff;
          text-shadow: 0 4px 40px rgba(0,0,0,.6), 0 0 80px var(--acc-glow);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-transform: uppercase;
        }
        .spot-actions { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .spot-play {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 15px 30px; border-radius: 999px;
          font-size: 14px; font-weight: 900; letter-spacing: 2px;
          color: #fff; text-decoration: none;
          background: linear-gradient(135deg, var(--acc), #c026d3);
          box-shadow: 0 0 0 1px rgba(255,255,255,.14) inset, 0 12px 38px var(--acc-glow);
          transition: transform .16s ease, box-shadow .16s ease, filter .16s ease;
          animation: ctaBreath 2.8s ease-in-out infinite;
        }
        @keyframes ctaBreath {
          0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,.14) inset, 0 12px 38px var(--acc-glow); }
          50% { box-shadow: 0 0 0 1px rgba(255,255,255,.2) inset, 0 12px 54px var(--acc-glow); }
        }
        .spot-play:hover { transform: translateY(-2px) scale(1.03); filter: brightness(1.12); }
        .play-tri { font-size: 13px; }
        .spot-hint { font-size: 11px; letter-spacing: 1.4px; color: #77689f; font-weight: 700; text-transform: uppercase; }

        /* --- CRT --- */
        .crt {
          justify-self: center; width: min(100%, 380px);
          transform: rotate(-2deg);
          animation: crtIn .55s cubic-bezier(.2,.8,.25,1) both;
        }
        @keyframes crtIn { from { opacity: 0; transform: rotate(-2deg) translateY(22px) scale(.96); } to { opacity: 1; transform: rotate(-2deg) none; } }
        .crt-inner {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: 18px;
          overflow: hidden;
          border: 2px solid var(--acc);
          box-shadow: 0 0 0 6px rgba(255,255,255,.04), 0 24px 60px rgba(0,0,0,.55), 0 0 60px var(--acc-glow);
          background: #050208;
        }
        .crt-inner img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          image-rendering: pixelated;
        }
        .crt-inner img.crt-cover { object-fit: contain; padding: 14px; }
        .crt-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .crt-scan {
          position: absolute; inset: 0; pointer-events: none;
          background:
            repeating-linear-gradient(0deg, rgba(0,0,0,.22) 0 1px, transparent 1px 3px),
            radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,.10), transparent 55%);
          mix-blend-mode: overlay;
        }
        .crt-fallback {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center; text-align: center;
          padding: 18px; font-weight: 800; font-size: 15px; color: #a78bfa; line-height: 1.4;
        }
        .crt-foot {
          display: flex; align-items: center; gap: 8px;
          margin-top: 10px; justify-content: center;
          font-size: 10px; font-weight: 800; letter-spacing: 3px; color: #77689f;
        }
        .crt-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #4ade80; box-shadow: 0 0 10px #4ade80;
          animation: blink 1.6s infinite;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }

        /* ===== SKELETON ===== */
        .skeleton-stage { min-height: 430px; padding: 60px 48px; display: flex; flex-direction: column; gap: 18px; }
        .skel-line {
          height: 26px; border-radius: 8px;
          background: linear-gradient(100deg, #140b24 40%, #221340 50%, #140b24 60%);
          background-size: 200% 100%; animation: shine 1.4s infinite linear;
        }
        .skel-line.w40 { width: 40%; } .skel-line.w80 { width: 80%; } .skel-line.w60 { width: 60%; height: 40px; }
        .skel-cta {
          width: 220px; height: 52px; border-radius: 999px; margin-top: 10px;
          background: linear-gradient(100deg, #140b24 40%, #221340 50%, #140b24 60%);
          background-size: 200% 100%; animation: shine 1.4s infinite linear;
        }
        @keyframes shine { to { background-position: -200% 0; } }

        /* ===== FOOTER ===== */
        footer {
          text-align: center;
          padding: 40px 20px 42px;
          border-top: 1px solid #1c1136;
        }
        .flogo {
          font-size: 15px; font-weight: 900; letter-spacing: 2.5px; color: #fff;
          margin-bottom: 12px;
        }
        footer p {
          color: #5f527f;
          font-size: 12px;
          line-height: 1.7;
          max-width: 620px;
          margin: 0 auto;
        }
        .tech { margin-top: 8px; color: #3d3358; }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1020px) {
          .stage-body { grid-template-columns: 1fr; }
          .rail-wrap {
            order: -1;
            border-right: 0; border-bottom: 1px solid rgba(167,139,250,.16);
            border-top: 0;
          }
          .rail { max-height: 260px; }
          .stage-main { padding: 30px 26px 26px; grid-template-columns: 1fr; gap: 24px; }
          .crt { width: min(100%, 340px); transform: none; margin: 0 auto; }
          @keyframes crtIn { from { opacity: 0; transform: translateY(22px) scale(.96); } to { opacity: 1; transform: none; } }
        }
        @media (max-width: 640px) {
          .nav { flex-wrap: wrap; padding: 12px 16px; }
          .links { width: 100%; justify-content: flex-start; }
          .search { flex: 1; width: auto; min-width: 0; }
          main { padding: 4px 14px 34px; overflow-x: hidden; }
          .stage-wrap { border-radius: 22px; overflow-x: hidden; }
          .spot-title { font-size: clamp(22px, 7vw, 34px); }
          .spot-hint { display: none; }
          .spot-actions { flex-wrap: wrap; gap: 10px; }
          .rail-head { padding: 10px 14px 8px; letter-spacing: 2px; }
          .rail { padding: 4px 8px 12px; max-height: min(46vh, 420px); }
          .rail-item { gap: 9px; padding: 7px 10px; font-size: 12.5px; border-radius: 10px; }
          .rail-sys {
            width: min(var(--sys-w, 58px), 50px);
            height: calc(min(var(--sys-w, 58px), 50px) * .78);
            font-size: 15px;
          }
          .rail-play {
          width: 24px; height: 24px; font-size: 9px; }
        .rail-fav {
          width: 24px; height: 24px; font-size: 11px; line-height: 1;
          display: grid; place-items: center; cursor: pointer;
          background: transparent; border: 1px solid #37265c; border-radius: 6px;
          color: #77689f; transition: all .15s ease;
        }
        .rail-fav:hover { border-color: #fbbf24; color: #fbbf24; background: rgba(251,191,36,.1); }
        .rail-fav.on { border-color: #fbbf24; color: #fbbf24; background: rgba(251,191,36,.2); box-shadow: 0 0 10px rgba(251,191,36,.4); }
        .stage-main { padding: 18px 14px 16px; gap: 16px; }
        .crt { width: min(100%, 280px); }
        }

        /* ===== PLANTILLA MÓVIL (≤860px, árbol JSX propio) ===== */
        @media (max-width: 860px) {
          .nav { display: none; }
          main { padding: 12px 12px 44px; }
        }
        .mob { display: flex; flex-direction: column; gap: 14px; }

        .m-hero {
          position: relative; border-radius: 22px; overflow: hidden;
          border: 1px solid #2b1a4d; background: #0a0614;
          box-shadow: 0 18px 50px rgba(0,0,0,.45);
          animation: mIn .45s ease both;
        }
        @keyframes mIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .m-screen {
          position: relative; aspect-ratio: 16 / 9;
          background: #000; overflow: hidden;
        }
        .m-screen > img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
        }
        .m-scan {
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background:
            repeating-linear-gradient(0deg, rgba(0,0,0,.15) 0 1px, transparent 1px 3px),
            radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,.5));
        }
        .m-badge {
          position: absolute; z-index: 4; top: 10px; left: 10px;
          font-size: 9px; font-weight: 900; letter-spacing: 2px; color: #fff;
          background: rgba(6,3,14,.72); border: 1px solid rgba(255,255,255,.14);
          padding: 5px 10px; border-radius: 999px; backdrop-filter: blur(6px);
        }
        .m-fallback {
          position: absolute; inset: 0; display: grid; place-items: center; padding: 18px;
          color: #584a80; font-weight: 900; text-align: center; font-size: 14px;
          background:
            radial-gradient(90% 70% at 50% 30%, rgba(124,58,237,.14), transparent 70%), #0b0716;
        }
        .m-meta {
          padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 12px;
          background: linear-gradient(180deg, rgba(20,11,38,.55), rgba(8,4,16,.92));
        }
        .m-title {
          margin: 0; font-size: clamp(19px, 5.4vw, 26px); font-weight: 900;
          color: #fff; line-height: 1.15; text-shadow: 0 2px 18px rgba(0,0,0,.5);
        }
        .m-playbig {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 18px; border-radius: 14px; text-decoration: none;
          font-weight: 900; letter-spacing: 2.2px; font-size: 13px; color: #fff;
          background: linear-gradient(135deg, var(--acc, #7c3aed), #c026d3);
          box-shadow: 0 8px 24px rgba(124,58,237,.35);
          transition: transform .12s ease;
        }
        .m-playbig:active { transform: scale(.97); }

        .m-bar {
          position: sticky; top: 8px; z-index: 40;
          display: flex; flex-direction: column; gap: 8px; padding: 10px;
          border-radius: 16px; background: rgba(10,6,20,.92);
          backdrop-filter: blur(12px); border: 1px solid #241543;
        }
        .m-bar .search { width: 100%; }
        .m-chips {
          display: flex; gap: 7px; overflow-x: auto; padding-bottom: 2px;
          scrollbar-width: none; -webkit-overflow-scrolling: touch;
        }
        .m-chips::-webkit-scrollbar { display: none; }
        .m-chips .fbtn { flex-shrink: 0; white-space: nowrap; }

        .m-count {
          font-size: 10px; font-weight: 900; letter-spacing: 2.4px;
          color: #77689f; padding: 2px 6px 0;
        }
        .m-list {
          list-style: none; margin: 0; padding: 0 0 34px;
          display: flex; flex-direction: column; gap: 9px;
        }
        .m-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 12px; border-radius: 15px; cursor: pointer;
          background: rgba(21,12,40,.55); border: 1px solid #241643;
          transition: border-color .15s ease, background .15s ease, transform .12s ease;
        }
        .m-item:active { transform: scale(.985); }
        .m-item.on {
          border-color: var(--acc); background: rgba(30,17,56,.78);
          box-shadow: 0 0 0 1px var(--acc), 0 6px 22px rgba(0,0,0,.35);
        }
        .m-thumbbox {
          position: relative; width: 54px; height: 54px; border-radius: 11px;
          overflow: hidden; background: #130b24; flex-shrink: 0;
          display: grid; place-items: center;
        }
        .m-thumbini {
          position: absolute; font-size: 15px; font-weight: 900;
          color: #584a80; letter-spacing: .5px;
        }
        .m-thumbimg {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
        }
        .m-txt { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 3px; }
        .m-name {
          font-size: 14.5px; font-weight: 800; color: #efe9ff;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .m-sub { font-size: 9.5px; font-weight: 800; letter-spacing: 1.8px; color: var(--acc); opacity: .85; }
        .m-play {
          width: 36px; height: 36px; flex-shrink: 0; border-radius: 50%;
          display: grid; place-items: center; font-size: 11px; text-decoration: none; color: #fff;
          background: linear-gradient(135deg, var(--acc), #c026d3);
          box-shadow: 0 4px 14px rgba(0,0,0,.4);
        }
        .m-fav {
          width: 36px; height: 36px; flex-shrink: 0; border-radius: 50%;
          display: grid; place-items: center; font-size: 13px; line-height: 1;
          cursor: pointer; background: transparent; border: 1px solid #37265c;
          color: #77689f; transition: all .15s ease;
        }
        .m-fav:hover { border-color: #fbbf24; color: #fbbf24; background: rgba(251,191,36,.1); }
        .m-fav.on { border-color: #fbbf24; color: #fbbf24; background: rgba(251,191,36,.2); box-shadow: 0 0 10px rgba(251,191,36,.4); }
      `}</style>
    </div>
  );
}
