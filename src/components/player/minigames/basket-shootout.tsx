'use client';

import { useEffect, useRef, useState } from 'react';

type Phase = 'aim' | 'fly' | 'result' | 'over';

interface GameState {
  phase: Phase;
  ball: { x: number; y: number; vx: number; vy: number };
  score: number;
  attempts: number;
  maxAttempts: number;
  message: string;
  // Potencia y ángulo controlados por ratón
  aimX: number;
  aimY: number;
  charging: boolean;
  power: number;
}

const W = 720;
const H = 480;
const GRAVITY = 0.42;

export function BasketShootout({ onScore }: { onScore?: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>({
    phase: 'aim',
    ball: { x: 100, y: H - 80, vx: 0, vy: 0 },
    score: 0,
    attempts: 0,
    maxAttempts: 5,
    message: '',
    aimX: W - 200,
    aimY: 200,
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

    const startGame = () => {
      const s = stateRef.current;
      s.score = 0;
      s.attempts = 0;
      s.ball = { x: 100, y: H - 80, vx: 0, vy: 0 };
      s.phase = 'aim';
      s.message = '';
      s.charging = false;
      s.power = 0;
    };

    const resetRound = () => {
      const s = stateRef.current;
      s.ball = { x: 100, y: H - 80, vx: 0, vy: 0 };
      s.phase = 'aim';
      s.message = '';
      s.charging = false;
      s.power = 0;
    };

    const rectToCanvas = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const onMove = (e: MouseEvent) => {
      const s = stateRef.current;
      if (s.phase !== 'aim') return;
      const p = rectToCanvas(e);
      s.aimX = Math.max(40, Math.min(W - 40, p.x));
      s.aimY = Math.max(40, Math.min(H - 40, p.y));
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
      s.aimX = Math.max(40, Math.min(W - 40, p.x));
      s.aimY = Math.max(40, Math.min(H - 40, p.y));
      const dx = s.aimX - s.ball.x;
      const dy = s.aimY - s.ball.y;
      const dist = Math.hypot(dx, dy) || 1;
      const speed = 6 + Math.min(s.power, 1) * 9;
      s.ball.vx = (dx / dist) * speed;
      s.ball.vy = (dy / dist) * speed - 4; // un poco hacia arriba por defecto
      s.phase = 'fly';
      e.preventDefault();
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const drawCourt = () => {
      // Suelo
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#1a4d2e');
      grad.addColorStop(1, '#0d2e1c');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
      // Línea de fondo y 3 puntos
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, H - 60);
      ctx.lineTo(W, H - 60);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(W - 200, H - 60, 90, Math.PI, 2 * Math.PI);
      ctx.stroke();
    };

    const drawHoop = () => {
      const x = W - 130;
      const y = 160;
      // Tablero
      ctx.fillStyle = '#e7ebf2';
      ctx.fillRect(x - 6, y - 70, 6, 90);
      ctx.strokeStyle = '#1c2330';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 6, y - 70, 6, 90);
      // Aro
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.ellipse(x + 14, y, 22, 8, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Red
      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const px = x - 6 + (i / 7) * 40;
        ctx.beginPath();
        ctx.moveTo(px, y);
        ctx.lineTo(x - 6 + (i / 7) * 40 + (i - 4), y + 22);
        ctx.stroke();
      }
      for (let i = 0; i < 3; i++) {
        const py = y + (i + 1) * 7;
        ctx.beginPath();
        ctx.moveTo(x - 4, py);
        ctx.lineTo(x + 32, py);
        ctx.stroke();
      }
    };

    const drawBall = (x: number, y: number) => {
      ctx.fillStyle = '#d35400';
      ctx.strokeStyle = '#1c2330';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = '#1c2330';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x - 14, y);
      ctx.lineTo(x + 14, y);
      ctx.moveTo(x, y - 14);
      ctx.lineTo(x, y + 14);
      ctx.stroke();
    };

    const drawAim = () => {
      const s = stateRef.current;
      if (s.phase !== 'aim') return;
      // Trayectoria predicha (parábola)
      ctx.strokeStyle = 'rgba(255,255,255,0.45)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      const dx = s.aimX - s.ball.x;
      const dy = s.aimY - s.ball.y;
      const dist = Math.hypot(dx, dy) || 1;
      const speed = 6 + Math.min(s.power, 1) * 9;
      let vx = (dx / dist) * speed;
      let vy = (dy / dist) * speed - 4;
      let bx = s.ball.x;
      let by = s.ball.y;
      ctx.moveTo(bx, by);
      for (let i = 0; i < 60; i++) {
        bx += vx;
        by += vy;
        vy += GRAVITY;
        if (by > H || bx > W) break;
        ctx.lineTo(bx, by);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      // Mira
      ctx.strokeStyle = '#f2c200';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(s.aimX, s.aimY, 12, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(s.aimX - 16, s.aimY);
      ctx.lineTo(s.aimX + 16, s.aimY);
      ctx.moveTo(s.aimX, s.aimY - 16);
      ctx.lineTo(s.aimX, s.aimY + 16);
      ctx.stroke();
      // Barra de potencia
      if (s.charging) {
        const barW = 200;
        const barH = 14;
        const bx = s.ball.x - barW / 2;
        const by = s.ball.y + 30;
        ctx.fillStyle = '#0008';
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
      ctx.fillText(`Tiros restantes: ${s.maxAttempts - s.attempts}`, 20, 50);
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

      if (s.charging) {
        s.power = Math.min(1, s.power + 0.025);
      }

      if (s.phase === 'fly') {
        s.ball.x += s.ball.vx;
        s.ball.y += s.ball.vy;
        s.ball.vy += GRAVITY;
        // Detección de canasta: pasa por el centro del aro
        const hoopX = W - 116;
        const hoopY = 160;
        if (
          s.ball.vy > 0 &&
          Math.abs(s.ball.x - hoopX) < 18 &&
          Math.abs(s.ball.y - hoopY) < 12
        ) {
          s.score += 1;
          s.attempts += 1;
          s.message = '¡TRIPLE!';
          onScore?.(s.score);
          s.phase = 'result';
          setTimeout(() => {
            const st = stateRef.current;
            if (st.attempts >= st.maxAttempts) {
              st.phase = 'over';
              st.message = `Final: ${st.score}/${st.maxAttempts}`;
            } else {
              resetRound();
            }
          }, 1200);
        } else if (s.ball.x > W + 30 || s.ball.x < -30 || s.ball.y > H + 30) {
          s.attempts += 1;
          s.message = '¡FALLO!';
          s.phase = 'result';
          setTimeout(() => {
            const st = stateRef.current;
            if (st.attempts >= st.maxAttempts) {
              st.phase = 'over';
              st.message = `Final: ${st.score}/${st.maxAttempts}`;
            } else {
              resetRound();
            }
          }, 1200);
        }
      }

      forceRender((n) => n + 1);

      ctx.clearRect(0, 0, W, H);
      drawCourt();
      drawHoop();
      drawBall(s.ball.x, s.ball.y);
      drawAim();
      drawHUD();

      if (s.phase === 'over') {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.font = 'bold 44px Lato, sans-serif';
        ctx.fillText('TIRO FINALIZADO', W / 2, H / 2 - 20);
        ctx.font = 'bold 28px Lato, sans-serif';
        ctx.fillStyle = '#7fffb4';
        ctx.fillText(
          `${s.score} canastas de ${s.maxAttempts}`,
          W / 2,
          H / 2 + 20
        );
        ctx.textAlign = 'left';
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
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
        ↻ Reiniciar ronda
      </button>
    </div>
  );
}
