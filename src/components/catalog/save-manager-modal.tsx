'use client';

import { useCatalogStore } from '@/lib/catalog-store';

export function SaveManagerModal() {
  const modal = useCatalogStore((s) => s.modal);
  const close = useCatalogStore((s) => s.closeModal);
  const slots = useCatalogStore((s) => s.saveSlots);
  const removeSave = useCatalogStore((s) => s.removeSave);
  const clearSaves = useCatalogStore((s) => s.clearSaves);
  if (modal !== 'save') return null;

  return (
    <div
      className="dm-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="dm-modal">
        <div className="dm-modal-head">
          <h3>💾 Gestionar partidas</h3>
          <button className="dm-modal-x" onClick={close} aria-label="Cerrar">
            ×
          </button>
        </div>
        <div className="dm-modal-body">
          <p className="dm-save-sub">
            Tus partidas se guardan en este navegador. Desde aquí puedes revisarlas,
            eliminarlas o borrarlas todas a la vez.
          </p>
          <div className="dm-save-note">
            ℹ️ Las partidas se crean automáticamente al jugar a cualquier
            mini-juego. Próximamente se añadirá exportación/importación real de
            ficheros.
          </div>

          {slots.length === 0 ? (
            <div className="dm-save-empty">
              No tienes partidas guardadas todavía. ¡Juega a cualquier juego y se
              creará una automáticamente!
            </div>
          ) : (
            <div className="dm-save-list">
              {slots.map((slot) => (
                <div className="dm-save-row" key={slot.id}>
                  <div className="meta">
                    <strong>{slot.gameName}</strong>
                    <small>
                      Guardado el {slot.savedAt} · {slot.size}
                    </small>
                  </div>
                  <div className="dm-save-actions">
                    <button className="danger" onClick={() => removeSave(slot.id)}>
                      🗑 Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="dm-save-foot">
            <button className="dm-save-restore" onClick={close}>
              ✓ Hecho
            </button>
            <span className="dm-save-total">
              {slots.length} partida{slots.length === 1 ? '' : 's'}
            </span>
            {slots.length > 0 && (
              <button className="dm-save-clear" onClick={clearSaves}>
                🗑 Borrar todas
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
