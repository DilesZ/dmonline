'use client';

import { useEffect, useRef, useState } from 'react';

type Color = 'w' | 'b';
type PieceType = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P';

interface Piece {
  type: PieceType;
  color: Color;
  x: number; // 0..7 col
  y: number; // 0..7 row (0 = top = black side)
}

const W = 540;
const H = 540;
const SQ = 60;

// Vistas: 1 = blanco (en PC) contra negras (IA). Blanco abajo.

function initialBoard(): Piece[] {
  const p: Piece[] = [];
  const back: PieceType[] = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
  for (let i = 0; i < 8; i++) {
    p.push({ type: back[i], color: 'b', x: i, y: 0 });
    p.push({ type: 'P', color: 'b', x: i, y: 1 });
    p.push({ type: 'P', color: 'w', x: i, y: 6 });
    p.push({ type: back[i], color: 'w', x: i, y: 7 });
  }
  return p;
}

const GLYPH: Record<PieceType, string> = {
  K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟',
};

function pieceAt(pieces: Piece[], x: number, y: number): Piece | undefined {
  return pieces.find((p) => p.x === x && p.y === y);
}

function clonePieces(pieces: Piece[]): Piece[] {
  return pieces.map((p) => ({ ...p }));
}

// Movimientos básicos (sin enroque ni al paso)
function legalMoves(piece: Piece, pieces: Piece[]): { x: number; y: number }[] {
  const moves: { x: number; y: number }[] = [];
  const isEmpty = (x: number, y: number) => !pieceAt(pieces, x, y);
  const isEnemy = (x: number, y: number) => {
    const t = pieceAt(pieces, x, y);
    return t !== undefined && t.color !== piece.color;
  };
  const inB = (x: number, y: number) => x >= 0 && x < 8 && y >= 0 && y < 8;

  const addRay = (dx: number, dy: number) => {
    let nx = piece.x + dx;
    let ny = piece.y + dy;
    while (inB(nx, ny)) {
      if (isEmpty(nx, ny)) moves.push({ x: nx, y: ny });
      else {
        if (isEnemy(nx, ny)) moves.push({ x: nx, y: ny });
        break;
      }
      nx += dx;
      ny += dy;
    }
  };

  switch (piece.type) {
    case 'P': {
      const dir = piece.color === 'w' ? -1 : 1;
      if (inB(piece.x, piece.y + dir) && isEmpty(piece.x, piece.y + dir)) {
        moves.push({ x: piece.x, y: piece.y + dir });
        const startRow = piece.color === 'w' ? 6 : 1;
        if (
          piece.y === startRow &&
          isEmpty(piece.x, piece.y + 2 * dir)
        ) {
          moves.push({ x: piece.x, y: piece.y + 2 * dir });
        }
      }
      [-1, 1].forEach((off) => {
        const nx = piece.x + off;
        const ny = piece.y + dir;
        if (inB(nx, ny) && isEnemy(nx, ny)) moves.push({ x: nx, y: ny });
      });
      break;
    }
    case 'R':
      addRay(1, 0); addRay(-1, 0); addRay(0, 1); addRay(0, -1);
      break;
    case 'B':
      addRay(1, 1); addRay(1, -1); addRay(-1, 1); addRay(-1, -1);
      break;
    case 'Q':
      addRay(1, 0); addRay(-1, 0); addRay(0, 1); addRay(0, -1);
      addRay(1, 1); addRay(1, -1); addRay(-1, 1); addRay(-1, -1);
      break;
    case 'N': {
      const offs = [
        [1, 2], [2, 1], [-1, 2], [-2, 1],
        [1, -2], [2, -1], [-1, -2], [-2, -1],
      ];
      offs.forEach(([dx, dy]) => {
        const nx = piece.x + dx;
        const ny = piece.y + dy;
        if (inB(nx, ny) && (isEmpty(nx, ny) || isEnemy(nx, ny))) {
          moves.push({ x: nx, y: ny });
        }
      });
      break;
    }
    case 'K': {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const nx = piece.x + dx;
          const ny = piece.y + dy;
          if (inB(nx, ny) && (isEmpty(nx, ny) || isEnemy(nx, ny))) {
            moves.push({ x: nx, y: ny });
          }
        }
      }
      break;
    }
  }
  return moves;
}

function findKing(pieces: Piece[], color: Color): Piece | undefined {
  return pieces.find((p) => p.type === 'K' && p.color === color);
}

function inCheck(pieces: Piece[], color: Color): boolean {
  const king = findKing(pieces, color);
  if (!king) return false;
  for (const p of pieces) {
    if (p.color !== color) {
      const m = legalMoves(p, pieces);
      if (m.some((mv) => mv.x === king.x && mv.y === king.y)) return true;
    }
  }
  return false;
}

// Movimiento simulando que deja al propio rey en jaque? Lo filtramos
function filterSafeMoves(piece: Piece, pieces: Piece[]): { x: number; y: number }[] {
  const all = legalMoves(piece, pieces);
  return all.filter((mv) => {
    const np = clonePieces(pieces);
    const pi = np.find((q) => q.x === piece.x && q.y === piece.y);
    if (!pi) return false;
    // Captura
    const cap = np.findIndex((q) => q.x === mv.x && q.y === mv.y);
    if (cap !== -1) np.splice(cap, 1);
    pi.x = mv.x;
    pi.y = mv.y;
    return !inCheck(np, piece.color);
  });
}

function isMate(pieces: Piece[], color: Color): boolean {
  for (const p of pieces) {
    if (p.color === color) {
      if (filterSafeMoves(p, pieces).length > 0) return false;
    }
  }
  return true;
}

// IA: greedy simple. Heurística: maximiza material capturado + pequeño ruido aleatorio.
const VALUE: Record<PieceType, number> = {
  P: 1, N: 3, B: 3, R: 5, Q: 9, K: 1000,
};

function aiMove(pieces: Piece[]): { piece: Piece; to: { x: number; y: number } } | null {
  const candidates: { piece: Piece; to: { x: number; y: number }; score: number }[] = [];
  for (const p of pieces) {
    if (p.color !== 'b') continue;
    const moves = filterSafeMoves(p, pieces);
    for (const mv of moves) {
      const target = pieceAt(pieces, mv.x, mv.y);
      const captureValue = target ? VALUE[target.type] : 0;
      const score = captureValue + Math.random() * 0.5;
      candidates.push({ piece: p, to: mv, score });
    }
  }
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => b.score - a.score);
  // Toma uno de los 3 mejores al azar para algo de variedad
  const top = candidates.slice(0, Math.min(3, candidates.length));
  return top[Math.floor(Math.random() * top.length)];
}

interface GameState {
  pieces: Piece[];
  selected: Piece | null;
  turn: Color;
  highlightMoves: { x: number; y: number }[];
  message: string;
  gameOver: boolean;
}

export function ChessGame({ onScore }: { onScore?: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef<GameState>({
    pieces: initialBoard(),
    selected: null,
    turn: 'w',
    highlightMoves: [],
    message: 'Tu turno: mueve las blancas',
    gameOver: false,
  });
  const [, forceRender] = useState(0);
  const aiThinkingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawBoard = () => {
      const s = stateRef.current;
      // Cuadrícula
      for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
          ctx.fillStyle = (x + y) % 2 === 0 ? '#e7d6b5' : '#8a5a2b';
          ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
        }
      }
      // Resaltado selección
      if (s.selected) {
        ctx.fillStyle = 'rgba(31, 138, 76, 0.45)';
        ctx.fillRect(s.selected.x * SQ, s.selected.y * SQ, SQ, SQ);
      }
      // Movimientos válidos
      s.highlightMoves.forEach((m) => {
        ctx.fillStyle = 'rgba(31, 138, 76, 0.6)';
        ctx.beginPath();
        ctx.arc(m.x * SQ + SQ / 2, m.y * SQ + SQ / 2, 12, 0, Math.PI * 2);
        ctx.fill();
      });
      // Piezas
      ctx.font = '42px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      s.pieces.forEach((p) => {
        const px = p.x * SQ + SQ / 2;
        const py = p.y * SQ + SQ / 2 + 2;
        ctx.fillStyle = p.color === 'w' ? '#fff' : '#1c2330';
        ctx.strokeStyle = p.color === 'w' ? '#1c2330' : '#fff';
        ctx.lineWidth = 1;
        ctx.fillText(GLYPH[p.type], px, py);
        ctx.strokeText(GLYPH[p.type], px, py);
      });
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';

      // HUD
      ctx.fillStyle = '#0008';
      ctx.fillRect(10, H - 32, W - 20, 22);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Lato, sans-serif';
      ctx.fillText(s.message, 16, H - 14);
    };

    const step = () => {
      ctx.clearRect(0, 0, W, H);
      drawBoard();
      forceRender((n) => n + 1);
      rafRef.current = requestAnimationFrame(step);
    };

    const restart = () => {
      const s = stateRef.current;
      s.pieces = initialBoard();
      s.selected = null;
      s.turn = 'w';
      s.highlightMoves = [];
      s.message = 'Tu turno: mueve las blancas';
      s.gameOver = false;
      aiThinkingRef.current = false;
    };

    const onCanvasClick = (e: MouseEvent) => {
      const s = stateRef.current;
      if (s.gameOver || s.turn !== 'w' || aiThinkingRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      const cx = (e.clientX - rect.left) * scaleX;
      const cy = (e.clientY - rect.top) * scaleY;
      const gx = Math.floor(cx / SQ);
      const gy = Math.floor(cy / SQ);
      if (gx < 0 || gx > 7 || gy < 0 || gy > 7) return;

      const clicked = pieceAt(s.pieces, gx, gy);

      if (s.selected) {
        // Si es un movimiento válido
        const valid = s.highlightMoves.find((m) => m.x === gx && m.y === gy);
        if (valid) {
          // Mover
          const np = clonePieces(s.pieces);
          const piece = np.find((p) => p.x === s.selected!.x && p.y === s.selected!.y);
          if (piece) {
            // Captura
            const idx = np.findIndex((q) => q.x === gx && q.y === gy);
            if (idx !== -1) {
              const cap = np[idx];
              if (cap.type === 'K') {
                np.splice(idx, 1);
              } else {
                np.splice(idx, 1);
              }
            }
            piece.x = gx;
            piece.y = gy;
            // Promoción de peón a dama
            if (piece.type === 'P' && (piece.y === 0 || piece.y === 7)) {
              piece.type = 'Q';
            }
            s.pieces = np;
            s.selected = null;
            s.highlightMoves = [];
            s.turn = 'b';
            s.message = 'IA pensando…';
            // Comprobar fin
            if (isMate(np, 'b')) {
              s.gameOver = true;
              s.message = '¡JAQUE MATE! Has ganado.';
              onScore?.(1);
              return;
            }
            // IA mueve tras 600ms
            aiThinkingRef.current = true;
            setTimeout(() => {
              const st = stateRef.current;
              const mv = aiMove(st.pieces);
              aiThinkingRef.current = false;
              if (!mv) {
                st.gameOver = true;
                st.message = '¡JAQUE MATE! Has ganado.';
                onScore?.(1);
                return;
              }
              const np2 = clonePieces(st.pieces);
              const piece = np2.find((p) => p.x === mv.piece.x && p.y === mv.piece.y);
              if (piece) {
                const idx = np2.findIndex((q) => q.x === mv.to.x && q.y === mv.to.y);
                if (idx !== -1) np2.splice(idx, 1);
                piece.x = mv.to.x;
                piece.y = mv.to.y;
                if (piece.type === 'P' && (piece.y === 0 || piece.y === 7)) {
                  piece.type = 'Q';
                }
              }
              st.pieces = np2;
              st.turn = 'w';
              if (isMate(np2, 'w')) {
                st.gameOver = true;
                st.message = '¡JAQUE MATE! Te ha ganado la IA.';
                onScore?.(0);
              } else if (inCheck(np2, 'w')) {
                st.message = '¡Jaque! Tu turno.';
              } else {
                st.message = 'Tu turno: mueve las blancas';
              }
            }, 600);
          }
          return;
        }
        // Si clic en otra pieza blanca, cambiar selección
        if (clicked && clicked.color === 'w') {
          s.selected = clicked;
          s.highlightMoves = filterSafeMoves(clicked, s.pieces);
          return;
        }
        // Deselect
        s.selected = null;
        s.highlightMoves = [];
        return;
      }
      // Seleccionar
      if (clicked && clicked.color === 'w') {
        s.selected = clicked;
        s.highlightMoves = filterSafeMoves(clicked, s.pieces);
      }
    };

    canvas.addEventListener('click', onCanvasClick);
    rafRef.current = requestAnimationFrame(step);
    (canvas as HTMLCanvasElement & { __restart?: () => void }).__restart = restart;

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('click', onCanvasClick);
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
        style={{ width: 'min(100%, 540px)', height: 'auto', aspectRatio: '1 / 1' }}
      />
      <button className="restart-btn" onClick={restart}>
        ↻ Nueva partida
      </button>
    </div>
  );
}
