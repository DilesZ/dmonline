'use client';

import { useEffect, useRef, useState } from 'react';

type Phase = 'aim' | 'shoot' | 'result' | 'over';

interface GameState {
  phase: Phase;
  ball: { x: number; y: number; vx: number; vy: number };
  keeper: { x: number; vx: number };
  score: number;
  attempts: number;
  maxAttempts: number;
  lastResult: 'goal' | 'save' | null;
  message: string;
  aimX: number;
  aimY: number;
  charging: boolean;
  power: number;
}

const W = 720;
const H = 480;

export function PenaltyShootout({ onScore }: { onScore?: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>({
    phase: 'aim',
    ball: { x: W / 2, y: H - 60, vx: 0, vy: 0 },
    keeper: { x: W / 2, vx: 3 },
    score: 0,
    attempts: 0,
    maxAttempts: 5,
    lastResult: null,
    message: '',
    aimX: W / 2,
    aimY: H / 2 - 60,
    charging: false,
    power: 0,
  });
  const [, forceRender] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resetRound = () => {
      const s = stateRef.current;
      s.ball = { x: W / 2, y: H - 60, vx: 0, vy: 0 };
      s.keeper = { x: W / 2, vx: 3 + Math.random() * 3 };
      s.phase = 'aim';
      s.lastResult = null;
      s.message = '';
      s.charging = false;
      s.power = 0;
    };

    const startGame = () => {
      const s = stateRef.current;
      s.score = 0;
      s.attempts = 0;
      resetRound();
    };

    const rectToCanvas = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      let cx: number, cy: number;
      if ('touches' in e) {
        const t = e.touches[0] || (e.changedTouches?.[0] as Touch);
        cx = t.clientX;
        cy = t.clientY;
      } else {
        cx = (e as MouseEvent).clientX;
        cy = (e as MouseEvent).clientY;
      }
      return { x: (cx - rect.left) * scaleX, y: (cy - rect.top) * scaleY };
    };

    const onMove = (e: MouseEvent) => {
      const s = stateRef.current;
      if (s.phase !== 'aim') return;
      const p = rectToCanvas(e);
      s.aimX = Math.max(60, Math.min(W - 60, p.x));
      s.aimY = Math.max(80, Math.min(H - 120, p.y));
    };

    const onDown = (e: MouseEvent) => {
      const s = stateRef.current;
      if (s.phase !== 'aim') return;
      s.charging = true;
      s.power = 0;
      e.preventDefault();
    };

    const onUp = (e: MouseEvent) => {
      const s = stateRef.current;
      if (s.phase !== 'aim' || !s.charging) return;
      s.charging = false;
      const p = rectToCanvas(e);
      s.aimX = Math.max(60, Math.min(W - 60, p.x));
      s.aimY = Math.max(80, Math.min(H - 120, p.y));
      // Disparar
      const dx = s.aimX - s.ball.x;
      const dy = s.aimY - s.ball.y;
      const dist = Math.hypot(dx, dy) || 1;
      const speed = 8 + Math.min(s.power, 1) * 8;
      s.ball.vx = (dx / dist) * speed;
      s.ball.vy = (dy / dist) * speed;
      s.phase = 'shoot';
      e.preventDefault();
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const drawField = () => {
      // Fondo: gradiente verde (campo)
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#2a6c2f');
      grad.addColorStop(1, '#1b4d20');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Líneas del campo
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, H - 90);
      ctx.lineTo(W, H - 90);
      ctx.stroke();

      // Portería (vista frontal)
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(80, 80);
      ctx.lineTo(W - 80, 80);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(80, 80);
      ctx.lineTo(80, 30);
      ctx.moveTo(W - 80, 80);
      ctx.lineTo(W - 80, 30);
      ctx.stroke();
      // Red con líneas diagonales
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 24; i++) {
        const x = 80 + (i / 24) * (W - 160);
        ctx.beginPath();
        ctx.moveTo(x, 80);
        ctx.lineTo(x, 30);
        ctx.stroke();
      }
      for (let i = 0; i < 5; i++) {
        const y = 30 + (i / 4) * 50;
        ctx.beginPath();
        ctx.moveTo(80, y);
        ctx.lineTo(W - 80, y);
        ctx.stroke();
      }

      // Área
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth = 3;
      ctx.strokeRect(W / 2 - 200, H - 90, 400, 90);
    };

    const drawKeeper = (x: number) => {
      const y = 70;
      ctx.fillStyle = '#f2c200';
      ctx.strokeStyle = '#1c2330';
      ctx.lineWidth = 2;
      // Cuerpo
      ctx.beginPath();
      ctx.ellipse(x, y - 6, 14, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Cabeza
      ctx.beginPath();
      ctx.arc(x, y - 28, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Brazos
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(x - 12, y - 6);
      ctx.lineTo(x - 28, y - 18);
      ctx.moveTo(x + 12, y - 6);
      ctx.lineTo(x + 28, y - 18);
      ctx.stroke();
    };

    const drawBall = (x: number, y: number) => {
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#1c2330';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Pentágono central
      ctx.fillStyle = '#1c2330';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawAim = () => {
      const s = stateRef.current;
      if (s.phase !== 'aim') return;
      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(s.ball.x, s.ball.y);
      ctx.lineTo(s.aimX, s.aimY);
      ctx.stroke();
      ctx.setLineDash([]);
      // Dianita
      ctx.strokeStyle = '#f2c200';
      ctx.beginPath();
      ctx.arc(s.aimX, s.aimY, 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(s.aimX - 18, s.aimY);
      ctx.lineTo(s.aimX + 18, s.aimY);
      ctx.moveTo(s.aimX, s.aimY - 18);
      ctx.lineTo(s.aimX, s.aimY + 18);
      ctx.stroke();
      // Barra de potencia
      if (s.charging) {
        const barW = 200;
        const barH = 14;
        const bx = s.ball.x - barW / 2;
        const by = s.ball.y + 30;
        ctx.fillStyle = '#0006';
        ctx.fillRect(bx - 2, by - 2, barW + 4, barH + 4);
        ctx.fillStyle = '#fff';
        ctx.fillRect(bx, by, barW, barH);
        const color = s.power < 0.4 ? '#22c55e' : s.power < 0.7 ? '#f2c200' : '#ef4444';
        ctx.fillStyle = color;
        ctx.fillRect(bx, by, barW * s.power, barH);
      }
    };

    const drawHUD = () => {
      const s = stateRef.current;
      ctx.fillStyle = '#0008';
      ctx.fillRect(10, 10, 200, 56);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Lato, sans-serif';
      ctx.fillText(`Marcador: ${s.score}/${s.attempts}`, 20, 30);
      ctx.fillText(
        `Intentos: ${s.maxAttempts - s.attempts}`,
        20,
        50
      );
      if (s.message) {
        ctx.fillStyle = '#0008';
        const w = ctx.measureText(s.message).width + 40;
        ctx.fillRect(W / 2 - w / 2, H - 90, w, 40);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 22px Lato, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(s.message, W / 2, H - 62);
        ctx.textAlign = 'left';
      }
    };

    const step = () => {
      const s = stateRef.current;

      // Carga de potencia
      if (s.charging) {
        s.power = Math.min(1, s.power + 0.025);
      }

      // Portero
      s.keeper.x += s.keeper.vx;
      if (s.keeper.x < 130) {
        s.keeper.x = 130;
        s.keeper.vx = Math.abs(s.keeper.vx);
      } else if (s.keeper.x > W - 130) {
        s.keeper.x = W - 130;
        s.keeper.vx = -Math.abs(s.keeper.vx);
      }

      // Bola
      if (s.phase === 'shoot') {
        s.ball.x += s.ball.vx;
        s.ball.y += s.ball.vy;
        // Comprobar GOL (cruza la línea de portería)
        if (s.ball.y <= 80) {
          const inGoal = s.ball.x > 90 && s.ball.x < W - 90;
          const keeperSaves =
            Math.abs(s.ball.x - s.keeper.x) < 26 && s.ball.y < 95;
          if (!inGoal) {
            // Fuera
            s.lastResult = 'save';
            s.message = '¡FUERA!';
          } else if (keeperSaves) {
            s.lastResult = 'save';
            s.message = '¡PARADA!';
          } else {
            s.lastResult = 'goal';
            s.score += 1;
            s.message = '¡GOOOL!';
          }
          s.attempts += 1;
          onScore?.(s.score);
          s.phase = 'result';
          setTimeout(() => {
            const st = stateRef.current;
            if (st.attempts >= st.maxAttempts) {
              st.phase = 'over';
              st.message = `Tanda finalizada: ${st.score}/${st.maxAttempts}`;
            } else {
              resetRound();
            }
          }, 1300);
        }
      }

      if (s.phase === 'result' || s.phase === 'aim' || s.phase === 'shoot' || s.phase === 'over') {
        forceRender((n) => n + 1);
      }

      // Dibujar
      ctx.clearRect(0, 0, W, H);
      drawField();
      drawKeeper(s.keeper.x);
      drawBall(s.ball.x, s.ball.y);
      drawAim();
      drawHUD();

      if (s.phase === 'over') {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.font = 'bold 48px Lato, sans-serif';
        ctx.fillText('TANDA FINALIZADA', W / 2, H / 2 - 20);
        ctx.font = 'bold 28px Lato, sans-serif';
        ctx.fillStyle = '#7fffb4';
        ctx.fillText(
          `${s.score} goles de ${s.maxAttempts}`,
          W / 2,
          H / 2 + 20
        );
        ctx.textAlign = 'left';
      }

      rafRef.current = requestAnimationFrame(step);
    };

    // Initial reset (the stateRef already defaults)
    rafRef.current = requestAnimationFrame(step);

    // Click "Restart" handler is attached via React onClick
    (canvas as HTMLCanvasElement & { __restart?: () => void }).__restart = startGame;

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
     
  }, []);

  const restart = () => {
    const c = canvasRef.current as HTMLCanvasElement & { __restart?: () => void };
    c?.__restart?.();
  };

  return (
    <div className="dm-minigame">
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        style={{ width: 'min(100%, 720px)', height: 'auto', aspectRatio: '3 / 2' }}
      />
      <button className="restart-btn" onClick={restart}>
        ↻ Reiniciar tanda
      </button>
    </div>
  );
}
