'use client';

import { useEffect, useRef, useState } from 'react';

// Mini beat-em-up lateral. Avanza por la calle eliminando enemigos.

const W = 720;
const H = 360;

interface Player {
  x: number;
  y: number;
  vx: number;
  vy: number;
  facing: 1 | -1;
  hp: number;
  attacking: number; // frames restantes
  hitFlash: number;
}

interface Enemy {
  x: number;
  y: number;
  vx: number;
  hp: number;
  type: 'thug' | 'brute';
  hitFlash: number;
  attackCooldown: number;
}

interface GameState {
  player: Player;
  enemies: Enemy[];
  score: number;
  wave: number;
  message: string;
  won: boolean;
  gameOver: boolean;
  scrollX: number;
  comboCount: number;
  comboTimer: number;
}

function spawnWave(wave: number, baseX: number): Enemy[] {
  const out: Enemy[] = [];
  const count = 2 + wave;
  for (let i = 0; i < count; i++) {
    const type: 'thug' | 'brute' = Math.random() < 0.75 ? 'thug' : 'brute';
    out.push({
      x: baseX + 200 + i * 60 + Math.random() * 40,
      y: H - 80 - Math.random() * 40,
      vx: 0,
      hp: type === 'thug' ? 2 : 4,
      type,
      hitFlash: 0,
      attackCooldown: 30 + Math.floor(Math.random() * 60),
    });
  }
  return out;
}

export function BeatEmUp({ onScore }: { onScore?: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>({
    player: {
      x: 120,
      y: H - 80,
      vx: 0,
      vy: 0,
      facing: 1,
      hp: 5,
      attacking: 0,
      hitFlash: 0,
    },
    enemies: [],
    score: 0,
    wave: 0,
    message: 'Elimina a todos los enemigos de la calle',
    won: false,
    gameOver: false,
    scrollX: 0,
    comboCount: 0,
    comboTimer: 0,
  });
  const keysRef = useRef<Record<string, boolean>>({});
  const [, forceRender] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    stateRef.current.enemies = spawnWave(0, 600);

    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;
      if (e.key === ' ') {
        const s = stateRef.current;
        if (!s.gameOver && !s.won && s.player.attacking <= 0) {
          s.player.attacking = 14;
        }
        e.preventDefault();
      }
      if (
        ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)
      ) {
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const drawStreet = () => {
      const s = stateRef.current;
      // Cielo
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, '#0a0c12');
      sky.addColorStop(1, '#2a1a3a');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H - 60);
      // Suelo
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, H - 60, W, 60);
      ctx.strokeStyle = '#3a3a3a';
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        const x = ((i * 90 - s.scrollX * 0.5) % W + W) % W;
        ctx.beginPath();
        ctx.moveTo(x, H - 60);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      // Faroles
      ctx.fillStyle = '#2a2a2a';
      for (let i = 0; i < 6; i++) {
        const x = ((i * 200 - s.scrollX) % (W + 200) + W + 200) % (W + 200) - 100;
        ctx.fillRect(x, H - 120, 6, 60);
        ctx.fillStyle = '#f2c200';
        ctx.beginPath();
        ctx.arc(x + 3, H - 122, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#2a2a2a';
      }
      // Edificios fondo
      ctx.fillStyle = '#0008';
      for (let i = 0; i < 10; i++) {
        const x = ((i * 120 - s.scrollX * 0.3) % (W + 200) + W + 200) % (W + 200) - 100;
        const h = 100 + ((i * 37) % 80);
        ctx.fillRect(x, H - 60 - h, 100, h);
        // Ventanas
        ctx.fillStyle = '#f2c20055';
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 4; c++) {
            if ((i + r + c) % 3 === 0) {
              ctx.fillRect(x + 10 + c * 22, H - 60 - h + 12 + r * 18, 14, 12);
            }
          }
        }
        ctx.fillStyle = '#0008';
      }
    };

    const drawPlayer = () => {
      const s = stateRef.current;
      const p = s.player;
      const flash = p.hitFlash > 0;
      // Cuerpo
      ctx.fillStyle = flash ? '#fff' : '#1f8a4c';
      ctx.fillRect(p.x - 12, p.y - 30, 24, 32);
      // Cabeza
      ctx.fillStyle = flash ? '#fff' : '#e7d6b5';
      ctx.beginPath();
      ctx.arc(p.x, p.y - 38, 10, 0, Math.PI * 2);
      ctx.fill();
      // Brazo atacando
      if (p.attacking > 0) {
        const reach = 24 + (14 - p.attacking) * 2;
        ctx.fillStyle = '#1f8a4c';
        ctx.fillRect(p.x + p.facing * 12, p.y - 22, p.facing * reach, 12);
        // Puño
        ctx.fillStyle = flash ? '#fff' : '#e7d6b5';
        ctx.beginPath();
        ctx.arc(p.x + p.facing * (12 + reach), p.y - 16, 7, 0, Math.PI * 2);
        ctx.fill();
      }
      // Piernas
      ctx.fillStyle = '#1c2330';
      ctx.fillRect(p.x - 12, p.y + 2, 10, 12);
      ctx.fillRect(p.x + 2, p.y + 2, 10, 12);
      // HP
      ctx.fillStyle = '#0008';
      ctx.fillRect(p.x - 22, p.y - 56, 44, 6);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(p.x - 22, p.y - 56, 44, 6);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(p.x - 22, p.y - 56, 44 * Math.max(0, p.hp / 5), 6);
    };

    const drawEnemy = (e: Enemy) => {
      const flash = e.hitFlash > 0;
      const baseColor = e.type === 'brute' ? '#7a1620' : '#5a4a22';
      // Cuerpo
      ctx.fillStyle = flash ? '#fff' : baseColor;
      ctx.fillRect(e.x - 12, e.y - 28, 24, 30);
      // Cabeza
      ctx.fillStyle = flash ? '#fff' : '#a08070';
      ctx.beginPath();
      ctx.arc(e.x, e.y - 34, 9, 0, Math.PI * 2);
      ctx.fill();
      // Piernas
      ctx.fillStyle = '#1c2330';
      ctx.fillRect(e.x - 12, e.y + 2, 10, 12);
      ctx.fillRect(e.x + 2, e.y + 2, 10, 12);
      // HP
      const max = e.type === 'brute' ? 4 : 2;
      ctx.fillStyle = '#0008';
      ctx.fillRect(e.x - 16, e.y - 50, 32, 4);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(e.x - 16, e.y - 50, 32 * Math.max(0, e.hp / max), 4);
    };

    const drawHUD = () => {
      const s = stateRef.current;
      ctx.fillStyle = '#0008';
      ctx.fillRect(10, 10, 220, 36);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Lato, sans-serif';
      ctx.fillText(`Oleada: ${s.wave + 1} · Enemigos: ${s.enemies.length}`, 18, 31);
      if (s.comboCount > 1 && s.comboTimer > 0) {
        ctx.fillStyle = '#f2c200';
        ctx.font = 'bold 20px Lato, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`COMBO x${s.comboCount}!`, W - 18, 28);
        ctx.textAlign = 'left';
      }
      if (s.message) {
        ctx.fillStyle = '#0008';
        const w = ctx.measureText(s.message).width + 30;
        ctx.fillRect(W / 2 - w / 2, H - 32, w, 24);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 13px Lato, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(s.message, W / 2, H - 14);
        ctx.textAlign = 'left';
      }
    };

    const step = () => {
      const s = stateRef.current;

      if (!s.gameOver && !s.won) {
        const p = s.player;
        // Movimiento
        const speed = 3.5;
        let mx = 0;
        let my = 0;
        if (keysRef.current['arrowleft'] || keysRef.current['a']) mx -= 1;
        if (keysRef.current['arrowright'] || keysRef.current['d']) mx += 1;
        if (keysRef.current['arrowup'] || keysRef.current['w']) my -= 1;
        if (keysRef.current['arrowdown'] || keysRef.current['s']) my += 1;
        p.vx = mx * speed;
        p.vy = my * speed;
        if (mx !== 0) p.facing = mx > 0 ? 1 : -1;
        p.x = Math.max(20, Math.min(W - 20, p.x + p.vx));
        p.y = Math.max(H - 160, Math.min(H - 30, p.y + p.vy));
        if (p.attacking > 0) p.attacking -= 1;
        if (p.hitFlash > 0) p.hitFlash -= 1;

        // Enemigos
        s.enemies.forEach((e) => {
          if (e.hitFlash > 0) e.hitFlash -= 1;
          if (e.attackCooldown > 0) e.attackCooldown -= 1;
          // Acercarse al jugador
          const dx = p.x - e.x;
          const dy = p.y - e.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist > 30) {
            e.x += (dx / dist) * 1.3;
            e.y += (dy / dist) * 0.8;
          } else if (e.attackCooldown <= 0 && p.hitFlash <= 0) {
            // Atacar al jugador
            p.hp -= 1;
            p.hitFlash = 10;
            e.attackCooldown = 80;
            if (p.hp <= 0) {
              s.gameOver = true;
              s.message = 'Has sido derrotado';
            }
          }
        });

        // Colisión con puño del jugador
        if (p.attacking > 0 && p.attacking > 6) {
          const reach = 24 + (14 - p.attacking) * 2;
          const fx = p.x + p.facing * (12 + reach);
          s.enemies.forEach((e) => {
            if (Math.abs(fx - e.x) < 16 && Math.abs(p.y - e.y) < 28 && e.hitFlash <= 0) {
              e.hp -= 1;
              e.hitFlash = 10;
              // Empuje
              e.x += p.facing * 14;
              if (e.hp <= 0) {
                s.score += 1;
                s.comboCount += 1;
                s.comboTimer = 90;
              }
            }
          });
        }

        if (s.comboTimer > 0) s.comboTimer -= 1;
        if (s.comboTimer <= 0) s.comboCount = 0;

        // Eliminar muertos
        s.enemies = s.enemies.filter((e) => e.hp > 0);

        // Siguiente oleada
        if (s.enemies.length === 0) {
          s.wave += 1;
          if (s.wave >= 3) {
            s.won = true;
            s.message = '¡CALLE LIMPIA! Has eliminado a todos los Justicieros rivales.';
            onScore?.(s.score);
          } else {
            s.message = `Oleada ${s.wave + 1}: refuerzos enemigos`;
            s.enemies = spawnWave(s.wave, p.x + 300);
          }
        }
      }

      // Draw
      ctx.clearRect(0, 0, W, H);
      drawStreet();
      drawPlayer();
      s.enemies.forEach(drawEnemy);
      drawHUD();

      if (s.won) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#7fffb4';
        ctx.textAlign = 'center';
        ctx.font = 'bold 40px Lato, sans-serif';
        ctx.fillText('¡VICTORIA!', W / 2, H / 2 - 10);
        ctx.font = 'bold 22px Lato, sans-serif';
        ctx.fillStyle = '#fff';
        ctx.fillText(`Enemigos derrotados: ${s.score}`, W / 2, H / 2 + 25);
        ctx.textAlign = 'left';
      } else if (s.gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#ef4444';
        ctx.textAlign = 'center';
        ctx.font = 'bold 40px Lato, sans-serif';
        ctx.fillText('GAME OVER', W / 2, H / 2 - 10);
        ctx.font = 'bold 22px Lato, sans-serif';
        ctx.fillStyle = '#fff';
        ctx.fillText(`Eliminaste a ${s.score} enemigos`, W / 2, H / 2 + 25);
        ctx.textAlign = 'left';
      }

      forceRender((n) => n + 1);
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    const restart = () => {
      const s = stateRef.current;
      s.player = {
        x: 120,
        y: H - 80,
        vx: 0,
        vy: 0,
        facing: 1,
        hp: 5,
        attacking: 0,
        hitFlash: 0,
      };
      s.enemies = spawnWave(0, 600);
      s.score = 0;
      s.wave = 0;
      s.won = false;
      s.gameOver = false;
      s.message = 'Elimina a todos los enemigos de la calle';
      s.comboCount = 0;
      s.comboTimer = 0;
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
          aspectRatio: '2 / 1',
          outline: 'none',
        }}
      />
      <button className="restart-btn" onClick={restart}>
        ↻ Reiniciar partida
      </button>
    </div>
  );
}
