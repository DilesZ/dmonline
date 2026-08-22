'use client';

import { useCallback, useEffect, useState } from 'react';

interface DriveRom {
  id: string;
  name: string;
  core?: string;
}

const SYS = 'Nintendo - Super Nintendo Entertainment System';

const CORE_LABEL: Record<string, string> = {
  snes: 'SNES',
  arcade: 'ARCADE',
  segaMD: 'MEGA DRIVE',
  nes: 'NES',
};

function thumbUrl(base: string, kind: 'Named_Boxarts' | 'Named_Snaps'): string {
  return `https://thumbnails.libretro.com/${encodeURIComponent(SYS)}/${kind}/${encodeURIComponent(base)}.png`;
}

function GameCard({ rom, biosId }: { rom: DriveRom; biosId?: string | null }) {
  const base = rom.name.replace(/\.[^.]+$/, '');
  const [stage, setStage] = useState(0); // 0 = boxart, 1 = snapshot, 2 = placeholder
  const core = rom.core ?? 'snes';

  const params = new URLSearchParams({
    rom: `/api/rom/${encodeURIComponent(rom.name)}?id=${rom.id}`,
    name: rom.name,
    core,
  });
  // BIOS de Neo Geo: si hay neogeo.zip en Drive se usa; si no, se extrae
  // automáticamente del propio zip del juego (packs "juego + BIOS").
  if (core === 'arcade') {
    if (biosId) {
      params.set('bios', biosId);
    } else {
      params.set('bios', rom.id);
      params.set('biosextract', '1');
    }
  }

  return (
    <a className="game" href={`/snes_emulator.html?${params.toString()}`}>
      <div className="cover">
        {stage < 2 && (
          <img
            src={thumbUrl(base, stage === 0 ? 'Named_Boxarts' : 'Named_Snaps')}
            alt={base}
            loading="lazy"
            onError={() => setStage(stage + 1)}
          />
        )}
        {stage === 2 && (
          <div className="fallback">
            <span>{base}</span>
          </div>
        )}
        <span className="sys">{CORE_LABEL[core] ?? core.toUpperCase()}</span>
        <div className="play">
          <span className="playbtn">▶</span>
        </div>
      </div>
      <span className="title">{base}</span>
    </a>
  );
}

export default function Home() {
  const [roms, setRoms] = useState<DriveRom[]>([]);
  const [biosId, setBiosId] = useState<string | null>(null);
  const [driveState, setDriveState] = useState<'idle' | 'ok' | 'error'>('idle');

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
    loadDrive();
  }, [loadDrive]);

  return (
    <div className="hub">
      <header className="nav">
        <a className="logo" href="/">
          JUEGOS<em>Z</em>
        </a>
        <nav className="links">
          <span className="chip">🎮 RETRO</span>
        </nav>
      </header>

      <section className="hero">
        <h1>
          Tus clásicos <em>retro</em>,
          <br />
          directo en el navegador
        </h1>
        <p>Sin descargas. Sin instalaciones. Elige carátula y juega.</p>
      </section>

      <main>
        <div className="section-head">
          <h2>Biblioteca</h2>
          {driveState === 'ok' && roms.length > 0 && (
            <span className="count">
              {roms.length} {roms.length === 1 ? 'juego' : 'juegos'}
            </span>
          )}
        </div>

        {driveState === 'idle' && (
          <div className="grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="skeleton" key={i} />
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
          <p className="status">Todavía no hay juegos. Sube ROMs a la carpeta de Drive (raíz = SNES, o en subcarpetas: Arcade, Mega Drive, NES…)</p>
        )}

        {roms.length > 0 && (
          <section className="grid">
            {roms.map((r) => (
              <GameCard key={r.id} rom={r} />
            ))}
          </section>
        )}
      </main>

      <footer>
        <p className="flogo">
          JUEGOS<em>Z</em>
        </p>
        <p>
          Las ROMs son responsabilidad de cada usuario: utiliza únicamente copias de
          seguridad de juegos que poseas. Este sitio no almacena ni distribuye juegos.
        </p>
        <p className="tech">Emulación por EmulatorJS · núcleo snes9x</p>
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
        .hub { min-height: 100vh; display: flex; flex-direction: column; }

        /* ─── Navbar ─── */
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
        .chip {
          font-size: 11px; letter-spacing: 1.2px; font-weight: 800;
          padding: 6px 13px; border-radius: 999px; color: #fff;
          background: linear-gradient(90deg, #7c3aed, #c026d3);
          box-shadow: 0 0 16px rgba(192,38,211,.4);
        }

        /* ─── Hero ─── */
        .hero { text-align: center; padding: 64px 20px 44px; }
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
        .hero p { color: #9d8bc7; margin-top: 14px; font-size: 16px; letter-spacing: .3px; }

        /* ─── Main ─── */
        main { flex: 1; width: 100%; max-width: 1160px; margin: 0 auto; padding: 0 24px 40px; }
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
        .status { text-align: center; color: #9d8bc7; margin-top: 60px; font-size: 15px; }
        .status.error p { margin-bottom: 14px; color: #fca5a5; }
        .status button {
          padding: 8px 18px; border-radius: 8px; cursor: pointer;
          border: 1px solid #7c3aed; background: transparent; color: #c4b5fd; font-weight: 700;
        }
        .status button:hover { background: #7c3aed; color: #fff; }

        /* ─── Grid ─── */
        .grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
          gap: 24px 16px;
        }
        .game { text-decoration: none; color: inherit; display: block; }
        .cover {
          position: relative; aspect-ratio: 3 / 4; border-radius: 12px; overflow: hidden;
          border: 1px solid #2b1a4d; background: #120a20;
          box-shadow: 0 6px 18px rgba(0,0,0,.5);
          transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease;
        }
        .game:hover .cover {
          transform: translateY(-6px) scale(1.02); border-color: #a78bfa;
          box-shadow: 0 16px 38px rgba(124,58,237,.45);
        }
        .cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .sys {
          position: absolute; top: 8px; left: 8px; z-index: 2;
          font-size: 9px; font-weight: 800; letter-spacing: 1px; color: #fff;
          padding: 3px 8px; border-radius: 999px;
          background: rgba(7,3,15,.72); border: 1px solid rgba(167,139,250,.45);
          backdrop-filter: blur(4px);
        }
        .fallback {
          width: 100%; height: 100%; display: flex; align-items: center;
          justify-content: center; padding: 12px; text-align: center;
          background: linear-gradient(160deg, #241145, #120a20);
          font-size: 13px; font-weight: 700; color: #a78bfa; line-height: 1.4;
        }
        .play {
          position: absolute; inset: 0; display: flex; align-items: center;
          justify-content: center; opacity: 0; transition: opacity .16s ease;
          background: linear-gradient(180deg, rgba(7,3,15,.15), rgba(7,3,15,.72));
        }
        .playbtn {
          width: 54px; height: 54px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; color: #fff; padding-left: 4px;
          background: linear-gradient(135deg, #7c3aed, #c026d3);
          box-shadow: 0 0 30px rgba(192,38,211,.75);
        }
        .game:hover .play { opacity: 1; }
        .title {
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
          overflow: hidden; margin-top: 10px; font-size: 12.5px; font-weight: 600;
          color: #9d8bc7; line-height: 1.35;
        }
        .game:hover .title { color: #e8dff5; }

        /* ─── Skeletons ─── */
        .skeleton {
          aspect-ratio: 3 / 4; border-radius: 12px; border: 1px solid #1c1136;
          background: linear-gradient(100deg, #120a20 40%, #1c1136 50%, #120a20 60%);
          background-size: 200% 100%; animation: shine 1.4s infinite linear;
        }
        @keyframes shine { to { background-position: -200% 0; } }

        /* ─── Footer ─── */
        footer { text-align: center; padding: 40px 20px 42px; border-top: 1px solid #1c1136; }
        .flogo {
          font-size: 15px; font-weight: 900; letter-spacing: 2.5px; color: #fff;
          margin-bottom: 12px;
        }
        footer p { color: #5f527f; font-size: 12px; line-height: 1.7; max-width: 620px; margin: 0 auto; }
        .tech { margin-top: 8px; color: #3d3358; }
      `}</style>
    </div>
  );
}
