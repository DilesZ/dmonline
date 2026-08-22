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
  coverSrc: string;
  previewSrc?: string;
}

const SYS_BY_CORE: Record<string, string> = {
  snes: 'Nintendo - Super Nintendo Entertainment System',
  nes: 'Nintendo - Nintendo Entertainment System',
  segaMD: 'Sega - Mega Drive - Genesis',
  arcade: 'FBNeo - Arcade Games',
  manager: 'JuegosZ Originals',
};

const CORE_LABEL: Record<string, string> = {
  snes: 'SNES',
  arcade: 'ARCADE',
  segaMD: 'MEGA DRIVE',
  nes: 'NES',
  manager: 'MANAGER',
};

function thumbUrl(core: string, target: string, kind: 'Named_Boxarts' | 'Named_Snaps'): string {
  if (/^https?:\/\//.test(target)) return target;
  const sys = SYS_BY_CORE[core] ?? SYS_BY_CORE.snes;
  return `https://thumbnails.libretro.com/${encodeURIComponent(sys)}/${kind}/${encodeURIComponent(target)}.png`;
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
  const coverTarget = core === 'arcade' && rom.cover ? rom.cover : title;

  return {
    id: rom.id,
    title,
    core,
    href: buildRomHref(rom, biosId),
    coverSrc: thumbUrl(core, coverTarget, 'Named_Boxarts'),
    previewSrc: thumbUrl(core, coverTarget, 'Named_Snaps'),
  };
}

function LibraryTile({ item }: { item: LibraryItem }) {
  const [stage, setStage] = useState<'cover' | 'preview' | 'fallback'>('cover');

  return (
    <a className="game-card" href={item.href}>
      <div className="poster">
        {stage !== 'fallback' ? (
          <img
            src={stage === 'cover' ? item.coverSrc : item.previewSrc ?? item.coverSrc}
            alt={item.title}
            loading="lazy"
            onError={() => {
              if (stage === 'cover' && item.previewSrc) {
                setStage('preview');
              } else {
                setStage('fallback');
              }
            }}
          />
        ) : (
          <div className="fallback">
            <span>{item.title}</span>
          </div>
        )}
        <div className="poster-sheen" />
        <span className="sys">{CORE_LABEL[item.core] ?? item.core.toUpperCase()}</span>
        <div className="play">
          <span className="playbtn">▶</span>
          <span className="playtxt">Jugar ahora</span>
        </div>
      </div>
      <div className="card-meta">
        <strong className="title">{item.title}</strong>
        <span className="subtitle">
          {item.core === 'manager' ? 'Juego propio' : CORE_LABEL[item.core] ?? item.core}
        </span>
      </div>
    </a>
  );
}

function LibraryShowcase({ items }: { items: LibraryItem[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!items.length) return;
    setActive((prev) => (prev >= items.length ? 0 : prev));
  }, [items]);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [items.length, paused]);

  if (!items.length) return null;
  const current = items[active] ?? items[0];

  return (
    <section className="viewer" aria-label="Visor de juegos destacados">
      <div className="viewer-main">
        <div className="viewer-copy">
          <span className="viewer-kicker">Visor de Portadas</span>
          <h2>{current.title}</h2>
          <p>
            Las carátulas van rodando solas y al pasar por una se carga una vista previa del
            juego. Desde aquí también puedes entrar directamente a jugar.
          </p>
          <div className="viewer-actions">
            <a className="viewer-cta" href={current.href}>
              Jugar
            </a>
            <span className="viewer-core">{CORE_LABEL[current.core] ?? current.core}</span>
          </div>
        </div>

        <div className="viewer-preview-card">
          <div className="viewer-screen">
            <img src={current.previewSrc ?? current.coverSrc} alt={`${current.title} preview`} />
          </div>
          <div className="viewer-cover-stack" aria-hidden="true">
            {items.slice(0, Math.min(items.length, 10)).map((item, index) => {
              const offset = ((index - active + items.length) % items.length) - 1;
              const clamped = Math.max(-1, Math.min(3, offset));
              const isSelected = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`stack-card${isSelected ? ' active' : ''}`}
                  style={
                    {
                      '--offset': String(clamped),
                      '--delay': `${index * 40}ms`,
                      backgroundImage: `url("${item.coverSrc}")`,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <span className="sr-only">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="viewer-strip"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`viewer-chip${index === active ? ' on' : ''}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
          >
            <img src={item.coverSrc} alt="" aria-hidden="true" />
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [roms, setRoms] = useState<DriveRom[]>([]);
  const [biosId, setBiosId] = useState<string | null>(null);
  const [driveState, setDriveState] = useState<'idle' | 'ok' | 'error'>('idle');
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState('');

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
      title: 'PC Fútbol 6.0',
      core: 'manager',
      href: '/pcfutbol/',
      coverSrc: '/pcfutbol/cover.jpg',
      previewSrc: '/pcfutbol/cover.jpg',
    }),
    [],
  );

  const filteredRoms = useMemo(() => {
    const q = norm(query.trim());
    return roms.filter((rom) => {
      if (filter !== 'all' && (rom.core ?? 'snes') !== filter) return false;
      if (!q) return true;
      return norm(rom.name.replace(/\.[^.]+$/, '')).includes(q);
    });
  }, [filter, query, roms]);

  const showWebItem =
    filter === 'all' &&
    (query.trim() === '' || norm(webItem.title).includes(norm(query.trim())));

  const gridItems = useMemo(
    () => [
      ...(showWebItem ? [webItem] : []),
      ...filteredRoms.map((rom) => toLibraryItem(rom, biosId)),
    ],
    [biosId, filteredRoms, showWebItem, webItem],
  );

  const showcaseItems = useMemo(() => gridItems.slice(0, 12), [gridItems]);

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
          {platforms.map((core) => (
            <button
              key={core}
              className={`fbtn${filter === core ? ' on' : ''}`}
              onClick={() => setFilter(core)}
            >
              {CORE_LABEL[core]}
            </button>
          ))}
        </nav>
      </header>

      <section className="hero">
        <span className="hero-kicker">Biblioteca Mejorada</span>
        <h1>
          Tus clásicos <em>retro</em>,
          <br />
          ahora con visor y preview
        </h1>
        <p>Portadas completas, carrusel visual y acceso directo a cada juego.</p>
      </section>

      <main>
        <div className="section-head">
          <h2>Biblioteca</h2>
          {driveState === 'ok' && gridItems.length > 0 && (
            <span className="count">
              {gridItems.length} {gridItems.length === 1 ? 'juego' : 'juegos'}
            </span>
          )}
          <input
            className="search"
            type="search"
            placeholder="Buscar juego..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {driveState === 'idle' && (
          <div className="library-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <div className="skeleton" key={index} />
            ))}
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

        {driveState === 'ok' && roms.length > 0 && gridItems.length === 0 && query.trim() !== '' && (
          <p className="status">Sin resultados para "{query.trim()}".</p>
        )}

        {driveState === 'ok' && gridItems.length > 0 && (
          <>
            <LibraryShowcase items={showcaseItems} />

            <section className="library-grid">
              {gridItems.map((item) => (
                <LibraryTile key={item.id} item={item} />
              ))}
            </section>
          </>
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
          background: #07030f;
          color: #e8dff5;
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,.28), transparent 70%),
            radial-gradient(ellipse 40% 30% at 90% 10%, rgba(192,38,211,.12), transparent 70%),
            repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,.012) 2px 4px);
        }
        * { box-sizing: border-box; }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
        .hub { min-height: 100vh; display: flex; flex-direction: column; }

        .nav {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 28px;
          background: rgba(10,5,20,.82); backdrop-filter: blur(10px);
          border-bottom: 1px solid #2b1a4d;
        }
        .logo {
          font-size: 21px; font-weight: 900; letter-spacing: 2.5px;
          color: #fff; text-decoration: none; text-shadow: 0 0 22px rgba(139,92,246,.55);
        }
        .logo em, .flogo em {
          font-style: normal;
          background: linear-gradient(90deg, #a78bfa, #e879f9);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .links {
          display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end;
        }
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

        .hero {
          text-align: center;
          padding: 64px 20px 36px;
        }
        .hero-kicker {
          display: inline-block;
          margin-bottom: 14px;
          padding: 6px 12px;
          border-radius: 999px;
          border: 1px solid rgba(167,139,250,.35);
          background: rgba(124,58,237,.12);
          color: #c4b5fd;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.6px;
          text-transform: uppercase;
        }
        .hero h1 {
          font-size: clamp(30px, 5.5vw, 52px); font-weight: 900; line-height: 1.12;
          color: #fff; letter-spacing: .5px;
        }
        .hero h1 em {
          font-style: normal;
          background: linear-gradient(90deg, #a78bfa, #e879f9, #a78bfa);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          filter: drop-shadow(0 0 18px rgba(192,38,211,.45));
        }
        .hero p {
          color: #9d8bc7;
          margin-top: 14px;
          font-size: 16px;
          letter-spacing: .3px;
        }

        main {
          flex: 1;
          width: 100%;
          max-width: 1220px;
          margin: 0 auto;
          padding: 0 24px 40px;
        }
        .section-head {
          display: flex; align-items: baseline; gap: 14px;
          margin: 8px 0 22px; padding-bottom: 12px; border-bottom: 1px solid #241543;
        }
        .section-head h2 {
          font-size: 15px; font-weight: 900; letter-spacing: 3px;
          text-transform: uppercase; color: #c4b5fd;
        }
        .count {
          font-size: 11.5px; font-weight: 700; color: #77689f;
          padding: 3px 10px; border-radius: 999px; border: 1px solid #37265c;
        }
        .search {
          margin-left: auto;
          width: 240px; max-width: 45%;
          padding: 10px 14px; border-radius: 999px;
          background: #120a20; color: #e8dff5;
          border: 1px solid #37265c;
          font-family: inherit; font-size: 12.5px; font-weight: 600; letter-spacing: .3px;
          outline: none; transition: border-color .15s ease, box-shadow .15s ease;
        }
        .search::placeholder { color: #77689f; }
        .search:focus { border-color: #a78bfa; box-shadow: 0 0 14px rgba(124,58,237,.35); }
        .status { text-align: center; color: #9d8bc7; margin-top: 60px; font-size: 15px; }
        .status.error p { margin-bottom: 14px; color: #fca5a5; }
        .status button {
          padding: 8px 18px; border-radius: 8px; cursor: pointer;
          border: 1px solid #7c3aed; background: transparent; color: #c4b5fd; font-weight: 700;
        }
        .status button:hover { background: #7c3aed; color: #fff; }

        .viewer {
          display: grid;
          gap: 18px;
          margin: 0 0 34px;
          padding: 22px;
          border: 1px solid #241543;
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(22,12,40,.96), rgba(10,6,20,.96)),
            radial-gradient(circle at top right, rgba(192,38,211,.18), transparent 36%);
          box-shadow: 0 25px 60px rgba(0,0,0,.34);
        }
        .viewer-main {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(320px, .9fr);
          gap: 22px;
          align-items: stretch;
        }
        .viewer-copy {
          padding: 10px 4px 10px 2px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .viewer-kicker {
          color: #e879f9;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }
        .viewer-copy h2 {
          margin: 12px 0 12px;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.05;
          color: #fff;
        }
        .viewer-copy p {
          max-width: 46ch;
          margin: 0;
          color: #b9add7;
          font-size: 15px;
          line-height: 1.7;
        }
        .viewer-actions {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-top: 22px;
          flex-wrap: wrap;
        }
        .viewer-cta, .viewer-core {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0 16px;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 800;
        }
        .viewer-cta {
          color: #fff;
          background: linear-gradient(135deg, #7c3aed, #c026d3);
          box-shadow: 0 0 28px rgba(192,38,211,.32);
        }
        .viewer-core {
          color: #c4b5fd;
          border: 1px solid #37265c;
          background: rgba(124,58,237,.08);
        }
        .viewer-preview-card {
          position: relative;
          min-height: 420px;
          padding: 18px;
          border-radius: 24px;
          background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01));
          border: 1px solid rgba(167,139,250,.18);
          overflow: hidden;
        }
        .viewer-screen {
          position: relative;
          height: 100%;
          min-height: 280px;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(167,139,250,.18);
          background: #0d0817;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.03);
        }
        .viewer-screen img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .viewer-cover-stack {
          position: absolute;
          right: 26px;
          bottom: 20px;
          width: min(46%, 250px);
          height: 230px;
          pointer-events: none;
        }
        .stack-card {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 130px;
          aspect-ratio: 3 / 4;
          border-radius: 18px;
          border: 1px solid rgba(167,139,250,.3);
          background-color: #1a102f;
          background-position: center;
          background-size: cover;
          box-shadow: 0 16px 32px rgba(0,0,0,.35);
          transform:
            translateX(calc(var(--offset) * -34px))
            translateY(calc(abs(var(--offset)) * 8px))
            rotate(calc(var(--offset) * -7deg))
            scale(calc(1 - abs(var(--offset)) * .08));
          transition: transform .28s ease, box-shadow .28s ease, opacity .28s ease;
          opacity: calc(1 - abs(var(--offset)) * .18);
          pointer-events: auto;
          cursor: pointer;
          animation: float-in .36s ease both;
          animation-delay: var(--delay);
        }
        .stack-card.active {
          box-shadow: 0 18px 42px rgba(124,58,237,.35);
          border-color: rgba(232,121,249,.65);
        }
        .viewer-strip {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: minmax(180px, 1fr);
          gap: 14px;
          overflow-x: auto;
          padding-bottom: 6px;
        }
        .viewer-chip {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 78px;
          padding: 10px;
          border-radius: 18px;
          border: 1px solid #2b1a4d;
          background: rgba(12,7,22,.9);
          color: #ddd2f3;
          text-align: left;
          cursor: pointer;
          transition: transform .16s ease, border-color .16s ease, background .16s ease;
        }
        .viewer-chip:hover, .viewer-chip.on {
          transform: translateY(-2px);
          border-color: rgba(167,139,250,.6);
          background: rgba(24,14,42,.95);
        }
        .viewer-chip img {
          width: 42px;
          height: 56px;
          border-radius: 10px;
          object-fit: cover;
          flex: 0 0 auto;
        }
        .viewer-chip span {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.3;
        }

        .library-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 24px;
        }
        .game-card {
          color: inherit;
          text-decoration: none;
          display: block;
        }
        .poster {
          position: relative;
          aspect-ratio: 3 / 4;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #2b1a4d;
          background: linear-gradient(180deg, #160c2a, #0d0716);
          box-shadow: 0 14px 38px rgba(0,0,0,.42);
          transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease;
        }
        .poster img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,0));
        }
        .poster-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(125deg, transparent 30%, rgba(255,255,255,.14) 48%, transparent 62%);
          transform: translateX(-120%);
          transition: transform .45s ease;
        }
        .game-card:hover .poster {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(167,139,250,.75);
          box-shadow: 0 22px 50px rgba(124,58,237,.22);
        }
        .game-card:hover .poster-sheen {
          transform: translateX(120%);
        }
        .sys {
          position: absolute; top: 10px; left: 10px; z-index: 2;
          font-size: 10px; font-weight: 800; letter-spacing: 1px; color: #fff;
          padding: 4px 8px; border-radius: 999px;
          background: rgba(7,3,15,.72); border: 1px solid rgba(167,139,250,.45);
          backdrop-filter: blur(4px);
        }
        .fallback {
          width: 100%; height: 100%; display: flex; align-items: center;
          justify-content: center; padding: 16px; text-align: center;
          background: linear-gradient(160deg, #241145, #120a20);
          font-size: 14px; font-weight: 700; color: #a78bfa; line-height: 1.4;
        }
        .play {
          position: absolute; inset: auto 12px 12px 12px;
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px;
          border-radius: 14px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity .18s ease, transform .18s ease;
          background: linear-gradient(180deg, rgba(7,3,15,.15), rgba(7,3,15,.82));
          border: 1px solid rgba(167,139,250,.18);
        }
        .playbtn {
          width: 42px; height: 42px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; color: #fff; padding-left: 3px;
          background: linear-gradient(135deg, #7c3aed, #c026d3);
          box-shadow: 0 0 24px rgba(192,38,211,.45);
        }
        .playtxt {
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: .3px;
        }
        .game-card:hover .play {
          opacity: 1;
          transform: translateY(0);
        }
        .card-meta {
          display: grid;
          gap: 4px;
          padding: 12px 2px 0;
        }
        .title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 14px;
          font-weight: 800;
          color: #f1ebff;
          line-height: 1.35;
        }
        .subtitle {
          font-size: 11.5px;
          color: #8f80b6;
          letter-spacing: .4px;
          text-transform: uppercase;
        }

        .skeleton {
          aspect-ratio: 3 / 4; border-radius: 20px; border: 1px solid #1c1136;
          background: linear-gradient(100deg, #120a20 40%, #1c1136 50%, #120a20 60%);
          background-size: 200% 100%; animation: shine 1.4s infinite linear;
        }
        @keyframes shine { to { background-position: -200% 0; } }
        @keyframes float-in {
          from { opacity: 0; transform: translateY(18px) scale(.96); }
          to { opacity: 1; }
        }

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

        @media (max-width: 900px) {
          .viewer-main {
            grid-template-columns: 1fr;
          }
          .viewer-preview-card {
            min-height: 360px;
          }
          .viewer-cover-stack {
            width: 220px;
          }
        }
        @media (max-width: 640px) {
          .nav { flex-wrap: wrap; padding: 12px 16px; }
          .links { width: 100%; justify-content: center; }
          .section-head { flex-wrap: wrap; }
          .search { width: 100%; max-width: none; margin-left: 0; }
          main { padding: 0 16px 32px; }
          .viewer { padding: 16px; border-radius: 22px; }
          .viewer-copy p { font-size: 14px; }
          .viewer-preview-card {
            min-height: 300px;
            padding: 12px;
          }
          .viewer-cover-stack {
            width: 170px;
            height: 180px;
            right: 14px;
            bottom: 14px;
          }
          .stack-card {
            width: 92px;
            border-radius: 14px;
          }
          .viewer-strip {
            grid-auto-columns: minmax(160px, 1fr);
          }
          .library-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px 14px;
          }
        }
      `}</style>
    </div>
  );
}
