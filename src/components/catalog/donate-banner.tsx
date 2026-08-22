'use client';

import { useCatalogStore } from '@/lib/catalog-store';

export function DonateBanner() {
  const dismissed = useCatalogStore((s) => s.donateDismissed);
  const dismiss = useCatalogStore((s) => s.dismissDonate);

  if (dismissed) return null;

  return (
    <div className="dm-donate show" id="donate">
      <p>
        🎮 Esta web es un <strong>clon no oficial</strong> hecho con cariño como
        homenaje a los clásicos de Dinamic Multimedia. Si te divierte, compártela
        con otros nostalgias del retrogaming.
      </p>
      <div className="donate-actions">
        <a
          href="https://dinamicmultimedia.es"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-donate"
        >
          ⬇ Visitar web oficial
        </a>
        <button className="btn btn-accept" onClick={dismiss}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
