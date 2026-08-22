'use client';

import { GameInfo, GAMES, SECTIONS } from '@/lib/games-data';
import { useCatalogStore } from '@/lib/catalog-store';

function initials(name: string): string {
  return name
    .split(/[\s·()]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

function GameCard({ game }: { game: GameInfo }) {
  const openGame = useCatalogStore((s) => s.openGame);
  const cover = `linear-gradient(135deg, ${game.color}, #3c096c)`;

  return (
    <div
      className="dm-card"
      onClick={() => openGame(game.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openGame(game.id);
        }
      }}
    >
      <div className="dm-cover" style={{ background: cover }}>
        <span style={{ fontSize: 36 }}>{initials(game.name)}</span>
      </div>
      <div className="dm-meta">
        <h2>{game.name}</h2>
        <small>
          {game.publisher} · {game.year}
        </small>
        <br />
        <span className="dm-play">▶ Jugar</span>
      </div>
      {game.badges?.includes('new') && (
        <span className="dm-new-badge">NUEVO</span>
      )}
      {game.badges?.includes('fixed') && (
        <span className="dm-fixed-badge">ARREGLADO</span>
      )}
    </div>
  );
}

export function GameGrid() {
  return (
    <div style={{ flex: 1 }}>
      {SECTIONS.map((section) => (
        <section className="dm-section" key={section.title}>
          <h2 className="dm-section-title">{section.title}</h2>
          <div className="dm-grid">
            {section.ids
              .map((id) => GAMES[id])
              .filter(Boolean)
              .map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
