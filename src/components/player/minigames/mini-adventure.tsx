'use client';

import { useEffect, useRef, useState } from 'react';

// Mini aventura: una habitación con llave y puerta cerrada.
// Recoge la llave, abre la puerta, ¡escapas!

const W = 720;
const H = 480;

interface GameState {
  player: { x: number; y: number };
  key: { x: number; y: number; taken: boolean };
  door: { x: number; y: number; open: boolean };
  message: string;
  won: boolean;
  hotspots: { x: number; y: number; r: number; msg: string; seen?: boolean }[];
}

export function MiniAdventure({ onScore }: { onScore?: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>({
    player: { x: 80, y: H - 100 },
    key: { x: 580, y: 380, taken: false },
    door: { x: 660, y: H - 160, open: false },
    message: 'Recoge la llave y escapa por la puerta',
    won: false,
    hotspots: [
      { x: 200, y: 320, r: 26, msg: 'Una mesa de laboratorio con cacharros extraños.' },
      { x: 360, y: 240, r: 28, msg: 'Una ventana: al otro lado, paisaje alienígena.' },
      { x: 520, y: 130, r: 26, msg: 'Un panel de control parpadeante. Idioma desconocido.' },
      { x: 130, y: 90, r: 22, msg: 'Una estantería con libros de hojas plateadas.' },
    ],
  });
  const [, forceRender] = useState(0);
  const rafRef = useRef<number>(0);
  const keysRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (s.won) return;
      keysRef.current[e.key.toLowerCase()] = true;
      if (e.key === ' ' || e.key === 'Enter') {
        // Interactuar
        const s = stateRef.current;
        const p = s.player;
        // ¿Cerca de la llave?
        if (
          !s.key.taken &&
          Math.hypot(p.x - s.key.x, p.y - s.key.y) < 40
        ) {
          s.key.taken = true;
          s.message = '¡Has cogido la llave!';
        }
        // ¿Cerca de la puerta?
        if (
          Math.abs(p.x - s.door.x) < 30 &&
          Math.abs(p.y - s.door.y) < 80
        ) {
          if (s.door.open) {
            s.won = true;
            s.message = '¡HAS ESCAPADO!';
            onScore?.(1);
          } else if (s.key.taken) {
            s.door.open = true;
            s.message = 'Has abierto la puerta con la llave. ¡Sal por ella!';
          } else {
            s.message = 'La puerta está cerrada. Necesitas la llave.';
          }
        }
        // ¿Hotspot?
        s.hotspots.forEach((h) => {
          if (Math.hypot(p.x - h.x, p.y - h.y) < h.r) {
            s.message = h.msg;
            h.seen = true;
          }
        });
      }
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const draw = () => {
      const s = stateRef.current;

      // Fondo: pared alienígena
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#2a0a4a');
      grad.addColorStop(1, '#1a0633');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Suelo
      ctx.fillStyle = '#0a3d1c';
      ctx.fillRect(0, H - 60, W, 60);

      // Estrellas en la pared
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      for (let i = 0; i < 40; i++) {
        const x = (i * 137) % W;
        const y = (i * 71) % (H - 80);
        ctx.fillRect(x, y, 2, 2);
      }

      // Hotspots dibujados como objetos
      ctx.fillStyle = '#5a8fbf';
      ctx.fillRect(180, 290, 40, 50);
      ctx.fillStyle = '#88a';
      ctx.fillRect(160, 320, 80, 10);
      ctx.fillStyle = '#2a4d6e';
      ctx.fillRect(340, 200, 40, 60);
      ctx.fillStyle = '#aef';
      ctx.fillRect(355, 215, 10, 10);
      ctx.fillStyle = '#3c0a4a';
      ctx.fillRect(500, 100, 40, 30);
      ctx.fillStyle = '#f0c846';
      ctx.beginPath();
      ctx.arc(520, 115, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#5c3a1a';
      ctx.fillRect(120, 60, 30, 60);
      ctx.fillStyle = '#7a4a22';
      ctx.fillRect(115, 60, 40, 6);

      // Puerta
      ctx.fillStyle = s.door.open ? '#1a4d2e' : '#5a1a1a';
      ctx.fillRect(s.door.x - 18, s.door.y - 50, 36, 100);
      if (!s.door.open) {
        ctx.fillStyle = '#f2c200';
        ctx.beginPath();
        ctx.arc(s.door.x + 10, s.door.y, 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = 'rgba(127,255,180,0.3)';
        ctx.fillRect(s.door.x - 18, s.door.y - 50, 36, 100);
      }

      // Llave
      if (!s.key.taken) {
        ctx.strokeStyle = '#f2c200';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(s.key.x, s.key.y, 8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s.key.x, s.key.y + 8);
        ctx.lineTo(s.key.x, s.key.y + 24);
        ctx.moveTo(s.key.x, s.key.y + 18);
        ctx.lineTo(s.key.x + 8, s.key.y + 18);
        ctx.moveTo(s.key.x, s.key.y + 24);
        ctx.lineTo(s.key.x + 8, s.key.y + 24);
        ctx.stroke();
      }

      // Indicador de interacción
      const p = s.player;
      const nearItem =
        (!s.key.taken && Math.hypot(p.x - s.key.x, p.y - s.key.y) < 40) ||
        (Math.abs(p.x - s.door.x) < 30 && Math.abs(p.y - s.door.y) < 80) ||
        s.hotspots.some((h) => Math.hypot(p.x - h.x, p.y - h.y) < h.r);

      if (nearItem && !s.won) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(p.x - 80, p.y - 50, 160, 22);
        ctx.fillStyle = '#7fffb4';
        ctx.font = 'bold 12px Lato, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Pulsa ESPACIO para interactuar', p.x, p.y - 34);
        ctx.textAlign = 'left';
      }

      // Personaje (Igor)
      ctx.fillStyle = '#1c2330';
      ctx.fillRect(p.x - 8, p.y - 12, 16, 24); // cuerpo
      ctx.beginPath();
      ctx.arc(p.x, p.y - 18, 9, 0, Math.PI * 2); // cabeza
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(p.x - 3, p.y - 19, 2, 0, Math.PI * 2);
      ctx.arc(p.x + 3, p.y - 19, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#5a8fbf'; // pantalón
      ctx.fillRect(p.x - 8, p.y + 4, 16, 6);

      // HUD
      ctx.fillStyle = '#0008';
      ctx.fillRect(10, 10, W - 20, 32);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Lato, sans-serif';
      ctx.fillText(s.message, 18, 31);

      // Inventario
      if (s.key.taken && !s.won) {
        ctx.fillStyle = '#0008';
        ctx.fillRect(W - 60, H - 60, 50, 50);
        ctx.strokeStyle = '#f2c200';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(W - 35, H - 38, 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(W - 35, H - 32);
        ctx.lineTo(W - 35, H - 18);
        ctx.moveTo(W - 35, H - 22);
        ctx.lineTo(W - 28, H - 22);
        ctx.stroke();
      }

      if (s.won) {
        ctx.fillStyle = 'rgba(0,0,0,0.75)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#7fffb4';
        ctx.textAlign = 'center';
        ctx.font = 'bold 44px Lato, sans-serif';
        ctx.fillText('¡HAS ESCAPADO!', W / 2, H / 2 - 20);
        ctx.font = 'bold 20px Lato, sans-serif';
        ctx.fillStyle = '#fff';
        ctx.fillText('Has completado la misión en Uikokahonia', W / 2, H / 2 + 18);
        ctx.textAlign = 'left';
      }
    };

    const step = () => {
      const s = stateRef.current;
      if (!s.won) {
        const speed = 3.5;
        if (keysRef.current['arrowleft'] || keysRef.current['a']) s.player.x -= speed;
        if (keysRef.current['arrowright'] || keysRef.current['d']) s.player.x += speed;
        if (keysRef.current['arrowup'] || keysRef.current['w']) s.player.y -= speed;
        if (keysRef.current['arrowdown'] || keysRef.current['s']) s.player.y += speed;
        // Limites
        s.player.x = Math.max(20, Math.min(W - 20, s.player.x));
        s.player.y = Math.max(H - 240, Math.min(H - 30, s.player.y));
      }
      draw();
      forceRender((n) => n + 1);
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    const restart = () => {
      const s = stateRef.current;
      s.player = { x: 80, y: H - 100 };
      s.key = { x: 580, y: 380, taken: false };
      s.door = { x: 660, y: H - 160, open: false };
      s.won = false;
      s.message = 'Recoge la llave y escapa por la puerta';
      s.hotspots = s.hotspots.map((h) => ({ ...h, seen: false }));
      keysRef.current = {};
    };
    (canvas as HTMLCanvasElement & { __restart?: () => void }).__restart = restart;

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
     
  }, []);

  const restart = () => {
    const c = canvasRef.current as HTMLCanvasElement & { __restart?: () => void };
    c?.__restart?.();
  };

  return (
    <div className="dm-minigame" style={{ outline: 'none' }}>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        tabIndex={0}
        style={{
          width: 'min(100%, 720px)',
          height: 'auto',
          aspectRatio: '3 / 2',
          outline: 'none',
        }}
      />
      <button className="restart-btn" onClick={restart}>
        ↻ Reiniciar aventura
      </button>
    </div>
  );
}
