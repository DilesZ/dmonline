'use client';

import { useEffect, useRef } from 'react';
import { GAMES } from '@/lib/games-data';
import { useCatalogStore } from '@/lib/catalog-store';
import { PenaltyShootout } from '@/components/player/minigames/penalty-shootout';
import { BasketShootout } from '@/components/player/minigames/basket-shootout';
import { ChessGame } from '@/components/player/minigames/chess-game';
import { MiniAdventure } from '@/components/player/minigames/mini-adventure';
import { BeatEmUp } from '@/components/player/minigames/beat-em-up';

export function KioskPlayer() {
  const activeGameId = useCatalogStore((s) => s.activeGameId);
  const closeGame = useCatalogStore((s) => s.closeGame);
  const addSave = useCatalogStore((s) => s.addSave);
  const game = activeGameId ? GAMES[activeGameId] : null;
  const savedFlagRef = useRef<string | null>(null);

  // Crear un "save" automático al iniciar una partida (como en el original)
  useEffect(() => {
    if (game && savedFlagRef.current !== game.id) {
      savedFlagRef.current = game.id;
      // Pequeño retraso para no pelear con el overlay inicial
      const t = setTimeout(() => addSave(game.id, game.name), 1500);
      return () => clearTimeout(t);
    }
    if (!game) {
      savedFlagRef.current = null;
    }
  }, [game, addSave]);

  // Cerrar con ESC
  useEffect(() => {
    if (!game) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeGame();
    };
    window.addEventListener('keydown', onKey);
    // Bloquear scroll de fondo
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [game, closeGame]);

  if (!game) return null;

  const cover = `linear-gradient(135deg, ${game.color}, #3c096c)`;

  const renderMiniGame = () => {
    switch (game.miniGame) {
      case 'penalty':
        return <PenaltyShootout />;
      case 'basket':
        return <BasketShootout />;
      case 'chess':
        return <ChessGame />;
      case 'adventure':
        return <MiniAdventure />;
      case 'beatemup':
        return <BeatEmUp />;
      default:
        return null;
    }
  };

  return (
    <div className="dm-kiosk" role="dialog" aria-modal="true" aria-label={game.name}>
      <div className="dm-kiosk-topbar">
        <div className="info">
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: cover,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 900,
              fontSize: 12,
              letterSpacing: 1,
            }}
          >
            {game.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
          </div>
          <div style={{ minWidth: 0 }}>
            <h2>{game.name}</h2>
            <small>
              {game.publisher} · {game.year} · {game.player === 'dosbox' ? 'DOSBox' : 'Kiosk'} · Clon
            </small>
          </div>
        </div>
        <div className="dm-kiosk-actions">
          <button className="dm-kiosk-btn" onClick={closeGame}>
            ✕ Cerrar
          </button>
        </div>
      </div>
      <div className="dm-kiosk-body">
        <div className="dm-kiosk-crt">{renderMiniGame()}</div>
        <aside className="dm-kiosk-side">
          <h3>{game.name}</h3>
          <p className="pub">
            {game.publisher} · {game.year}
          </p>
          {game.desc.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
          <div className="controls-box">
            <strong>Controles:</strong> {game.controls}
          </div>
          <div
            className="controls-box"
            style={{ marginTop: 8 }}
          >
            <strong>Pulsa ESC</strong> para liberar el cursor y volver al catálogo.
            Tu partida se guardará automáticamente en tu navegador.
          </div>
        </aside>
      </div>
    </div>
  );
}
