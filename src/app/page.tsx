'use client';

import { useCallback, useEffect, useState } from 'react';

interface DriveRom {
  id: string;
  name: string;
}

const SYS = 'Nintendo - Super Nintendo Entertainment System';

function thumbUrl(base: string, kind: 'Named_Boxarts' | 'Named_Snaps'): string {
  return `https://thumbnails.libretro.com/${encodeURIComponent(SYS)}/${kind}/${encodeURIComponent(base)}.png`;
}

function GameCard({ rom }: { rom: DriveRom }) {
  const base = rom.name.replace(/\.[^.]+$/, '');
  const [stage, setStage] = useState(0); // 0 = boxart, 1 = snapshot, 2 = placeholder

  return (
    <a
      className="game"
      href={`/snes_emulator.html?rom=${encodeURIComponent(
        `/api/drive?action=file&id=${rom.id}`,
      )}&name=${encodeURIComponent(rom.name)}`}
    >
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
        <div className="play">▶</div>
      </div>
      <span className="title">{base}</span>
    </a>
  );
}

export default function Home() {
  const [roms, setRoms] = useState<DriveRom[]>([]);
  const [driveState, setDriveState] = useState<'idle' | 'ok' | 'error'>('idle');

  const loadDrive = useCallback(async () => {
    setDriveState('idle');
    try {
      const res = await fetch('/api/drive?action=list');
      if (!res.ok) throw new Error(String(res.status));
      const data: { roms?: DriveRom[] } = await res.json();
      setRoms(data.roms ?? []);
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
      <header className="topbar">
        <h1>▸ RETRO HUB</h1>
        <span className="badge">SNES</span>
      </header>

      <main>
        {driveState === 'idle' && <p className="status">Cargando biblioteca…</p>}

        {driveState === 'error' && (
          <div className="status error">
            <p>No se pudo leer la carpeta de Drive.</p>
            <button onClick={() => void loadDrive()}>Reintentar</button>
          </div>
        )}

        {driveState === 'ok' && roms.length === 0 && (
          <p className="status">La carpeta de Drive está vacía. Sube ROMs (.smc, .sfc, .zip…)</p>
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
        <p>
          Las ROMs son responsabilidad de cada usuario: utiliza únicamente copias de
          seguridad de juegos que poseas. Este sitio no almacena ni distribuye juegos.
        </p>
      </footer>

      <style jsx global>{`
        html, body {
          background: #0b0514;
          color: #e8dff5;
          background-image:
            radial-gradient(ellipse at 50% -20%, rgba(124,58,237,.25), transparent 60%),
            repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,.012) 2px 4px);
        }
        .hub { min-height: 100vh; display: flex; flex-direction: column; }
        .topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 22px; background: linear-gradient(180deg, #1a0f2e, #120a20);
          border-bottom: 1px solid #3c096c;
        }
        .topbar h1 {
          font-size: 16px; font-weight: 800; letter-spacing: 2px;
          color: #c4b5fd; text-transform: uppercase;
        }
        .badge {
          font-size: 11px; letter-spacing: 1.5px; font-weight: 800;
          padding: 5px 12px; border-radius: 999px; color: #fff;
          background: linear-gradient(90deg, #7c3aed, #c026d3);
          box-shadow: 0 0 16px rgba(192,38,211,.45);
        }
        main {
          flex: 1; width: 100%; max-width: 1100px; margin: 0 auto; padding: 36px 22px;
        }
        .status { text-align: center; color: #9d8bc7; margin-top: 60px; font-size: 15px; }
        .status.error p { margin-bottom: 14px; color: #fca5a5; }
        .status button {
          padding: 8px 18px; border-radius: 8px; cursor: pointer;
          border: 1px solid #7c3aed; background: transparent; color: #c4b5fd; font-weight: 700;
        }
        .grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 20px 16px;
        }
        .game { text-decoration: none; color: inherit; display: block; }
        .cover {
          position: relative; aspect-ratio: 3 / 4; border-radius: 10px; overflow: hidden;
          border: 1px solid #37265c; background: #120a20;
          box-shadow: 0 4px 14px rgba(0,0,0,.45);
          transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease;
        }
        .game:hover .cover {
          transform: translateY(-5px); border-color: #a78bfa;
          box-shadow: 0 14px 34px rgba(124,58,237,.4);
        }
        .cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .fallback {
          width: 100%; height: 100%; display: flex; align-items: center;
          justify-content: center; padding: 12px; text-align: center;
          background: linear-gradient(160deg, #241145, #120a20);
          font-size: 13px; font-weight: 700; color: #a78bfa; line-height: 1.4;
        }
        .play {
          position: absolute; inset: 0; display: flex; align-items: center;
          justify-content: center; font-size: 34px; color: #fff; opacity: 0;
          background: rgba(11,5,20,.55); transition: opacity .16s ease;
          text-shadow: 0 0 24px rgba(192,38,211,.9);
        }
        .game:hover .play { opacity: 1; }
        .title {
          display: block; margin-top: 9px; font-size: 12.5px; font-weight: 600;
          color: #9d8bc7; line-height: 1.35; overflow: hidden;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        }
        .game:hover .title { color: #e8dff5; }
        footer { text-align: center; padding: 26px 20px 34px; }
        footer p { color: #5f527f; font-size: 12px; line-height: 1.7; max-width: 640px; margin: 0 auto; }
      `}</style>
    </div>
  );
}
