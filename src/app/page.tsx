'use client';

import { useCallback, useEffect, useState } from 'react';

interface DriveRom {
  id: string;
  name: string;
  size?: string;
}

const DRIVE_FOLDER_ID = process.env.NEXT_PUBLIC_DRIVE_FOLDER_ID;
const DRIVE_API_KEY = process.env.NEXT_PUBLIC_DRIVE_API_KEY;

function formatSize(bytes?: string): string {
  if (!bytes) return '';
  const n = Number(bytes);
  if (!Number.isFinite(n)) return '';
  if (n > 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.round(n / 1024)} KB`;
}

export default function Home() {
  const [roms, setRoms] = useState<DriveRom[]>([]);
  const [driveState, setDriveState] = useState<'idle' | 'ok' | 'error' | 'unconfigured'>('idle');

  const driveEnabled = Boolean(DRIVE_FOLDER_ID && DRIVE_API_KEY);

  const loadDrive = useCallback(async () => {
    if (!driveEnabled) {
      setDriveState('unconfigured');
      return;
    }
    try {
      const q = encodeURIComponent(`'${DRIVE_FOLDER_ID}' in parents and trashed=false`);
      const fields = encodeURIComponent('files(id,name,size,mimeType)');
      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=${q}&fields=${fields}&key=${DRIVE_API_KEY}`,
      );
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      const files: DriveRom[] = (data.files ?? [])
        .filter((f: { mimeType?: string; name: string }) =>
          /\.(smc|sfc|swc|fig|zip)$/i.test(f.name ?? ''),
        )
        .sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
      setRoms(files);
      setDriveState('ok');
    } catch {
      setDriveState('error');
    }
  }, [driveEnabled]);

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
        <section className="hero">
          <h2>JUEGA EN TU NAVEGADOR</h2>
          <p>
            Emulador de Super Nintendo integrado con EmulatorJS.
            Sin instalaciones, sin descargas de programas.
          </p>
        </section>

        <section className="cards">
          {/* Opción 1: ROM local */}
          <a className="card" href="/snes_uploader.html">
            <div className="icon">🎮</div>
            <h3>Cargar ROM local</h3>
            <p>Tu copia de seguridad desde el equipo. Se lee en el navegador y nunca se sube a ningún servidor.</p>
            <span className="cta">Abrir cargador →</span>
          </a>

          {/* Opción 2: biblioteca Drive */}
          <div className={`card ${driveState === 'ok' ? '' : 'disabled'}`}>
            <div className="icon">☁️</div>
            <h3>Biblioteca de Drive</h3>
            {driveState === 'ok' && (
              <>
                <p>{roms.length} ROM(s) disponibles en tu carpeta compartida:</p>
                <ul className="romlist">
                  {roms.map((r) => (
                    <li key={r.id}>
                      <a
                        href={`/snes_emulator.html?rom=${encodeURIComponent(
                          `https://www.googleapis.com/drive/v3/files/${r.id}?alt=media&key=${DRIVE_API_KEY}`,
                        )}&name=${encodeURIComponent(r.name)}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        ▸ {r.name.replace(/\.[^.]+$/, '')}
                        <em> {formatSize(r.size)}</em>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {driveState === 'unconfigured' && (
              <p>Pendiente de configurar la carpeta compartida y su clave de API.</p>
            )}
            {driveState === 'error' && (
              <>
                <p>No se pudo leer la carpeta de Drive.</p>
                <button className="retry" onClick={() => void loadDrive()}>Reintentar</button>
              </>
            )}
            {driveState === 'idle' && <p>Cargando biblioteca…</p>}
          </div>
        </section>

        <footer>
          <p>
            Las ROMs son responsabilidad de cada usuario: utiliza únicamente copias de
            seguridad de juegos que poseas. Este sitio no almacena ni distribuye juegos.
          </p>
        </footer>
      </main>

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
        main { flex: 1; width: 100%; max-width: 980px; margin: 0 auto; padding: 56px 20px; }
        .hero { text-align: center; margin-bottom: 48px; }
        .hero h2 {
          font-size: clamp(30px, 6vw, 54px); font-weight: 900; letter-spacing: 3px;
          color: #fff; text-shadow: 0 0 28px rgba(139,92,246,.7);
        }
        .hero p { color: #a78bfa; margin-top: 12px; font-size: 15.5px; line-height: 1.7; }
        .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 22px; }
        .card {
          display: block; padding: 30px 26px; border-radius: 18px; text-align: left;
          border: 1px solid #4c1d95; color: inherit; text-decoration: none;
          background: linear-gradient(180deg, rgba(26,15,46,.8), rgba(18,10,32,.8));
          transition: all .18s ease; position: relative; overflow: hidden;
        }
        a.card:hover { transform: translateY(-4px); border-color: #a78bfa;
          box-shadow: 0 12px 40px rgba(124,58,237,.35); }
        .card.disabled { opacity: .75; }
        .card .icon { font-size: 42px; filter: drop-shadow(0 0 12px rgba(167,139,250,.7)); }
        .card h3 { font-size: 19px; font-weight: 800; letter-spacing: .8px; margin: 14px 0 8px; color: #fff; }
        .card p { color: #9d8bc7; font-size: 13.5px; line-height: 1.65; }
        .cta {
          display: inline-block; margin-top: 18px; font-size: 13px; font-weight: 800;
          letter-spacing: 1px; color: #c4b5fd;
        }
        a.card:hover .cta { color: #fff; text-shadow: 0 0 10px rgba(196,181,253,.9); }
        .romlist { list-style: none; margin-top: 12px; max-height: 260px; overflow-y: auto; }
        .romlist li { border-bottom: 1px dashed #37265c; }
        .romlist a {
          display: block; padding: 9px 6px; color: #d8ccf4; text-decoration: none;
          font-size: 13.5px; transition: all .12s ease; border-radius: 6px;
        }
        .romlist a:hover { background: rgba(124,58,237,.18); color: #fff; }
        .romlist em { color: #77689f; font-style: normal; font-size: 11.5px; margin-left: 6px; }
        .retry {
          margin-top: 12px; padding: 7px 16px; border-radius: 8px; cursor: pointer;
          border: 1px solid #7c3aed; background: transparent; color: #c4b5fd; font-weight: 700;
        }
        footer { text-align: center; padding: 26px 20px 34px; }
        footer p { color: #5f527f; font-size: 12px; line-height: 1.7; max-width: 640px; margin: 0 auto; }
      `}</style>
    </div>
  );
}
