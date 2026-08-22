'use client';

import { useCatalogStore } from '@/lib/catalog-store';

export function Topbar() {
  const online = useCatalogStore((s) => s.onlineUsers);
  const openModal = useCatalogStore((s) => s.openModal);

  return (
    <div className="dm-topbar">
      <span className="tb-online" title="Usuarios conectados ahora mismo">
        <span className="tb-dot"></span>
        <b>{online}</b>
        <small>usuarios online</small>
      </span>
      <button
        className="tb-burger"
        onClick={() => {
          const nav = document.getElementById('tbNav');
          nav?.classList.toggle('open');
        }}
        aria-label="Abrir menú"
      >
        ☰
      </button>
      <nav className="tb-nav" id="tbNav">
        <button onClick={() => openModal('save')}>
          <span>💾</span> Gestionar partidas
        </button>
        <a
          href="https://dinamicmultimedia.es"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>⬇</span> Descargar juegos
        </a>
        <button onClick={() => openModal('help')}>
          <span>❓</span> Ayuda
        </button>
        <button onClick={() => openModal('legal')}>
          <span>⚖</span> Legal
        </button>
      </nav>
    </div>
  );
}
