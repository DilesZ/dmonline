// Store global del catálogo (juego activo, modales, contadores online simulados)
import { create } from 'zustand';

export type ModalKind = 'help' | 'legal' | 'save' | null;

interface CatalogState {
  activeGameId: string | null;
  modal: ModalKind;
  donateDismissed: boolean;
  onlineUsers: number;
  saveSlots: SaveSlot[];

  openGame: (id: string) => void;
  closeGame: () => void;
  openModal: (m: ModalKind) => void;
  closeModal: () => void;
  dismissDonate: () => void;
  setOnline: (n: number) => void;
  listSaves: () => SaveSlot[];
  addSave: (gameId: string, gameName: string) => void;
  removeSave: (id: string) => void;
  clearSaves: () => void;
  initSavesFromStorage: () => void;
}

export interface SaveSlot {
  id: string;
  gameId: string;
  gameName: string;
  savedAt: string;
  size: string;
}

const SAVE_KEY = 'dmclone_saves_v1';

function loadSaves(): SaveSlot[] {
  // En el servidor esto se ejecuta también al crear el store (module-load);
  // devolvemos [] siempre para no romper la hidratación. El cliente hidrata con []
  // y luego el effect de mount() carga los saves reales desde localStorage.
  if (typeof window === 'undefined') return [];
  // Comprobamos si ya estamos montados (no durante el render inicial).
  // Si el documento aún no está listo, es probable que estemos en SSR/pre-hydrate.
  if (typeof document === 'undefined' || document.readyState === 'loading') return [];
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function persistSaves(slots: SaveSlot[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(slots));
  } catch {
    // ignore quota errors
  }
}

function randomSize() {
  const kb = 20 + Math.floor(Math.random() * 380);
  return `${kb} KB`;
}

export const useCatalogStore = create<CatalogState>((set, get) => ({
  activeGameId: null,
  modal: null,
  donateDismissed: false,
  // Empezamos con un valor fijo para evitar mismatch de hidratación SSR/cliente.
  // El cliente lo randomiza en su useEffect (en page.tsx).
  onlineUsers: 28,
  saveSlots: loadSaves(),

  openGame: (id) => set({ activeGameId: id }),
  closeGame: () => set({ activeGameId: null }),
  openModal: (m) => set({ modal: m }),
  closeModal: () => set({ modal: null }),
  dismissDonate: () => set({ donateDismissed: true }),
  setOnline: (n) => set({ onlineUsers: n }),

  listSaves: () => get().saveSlots,

  addSave: (gameId, gameName) => {
    const slot: SaveSlot = {
      id: `${gameId}-${Date.now()}`,
      gameId,
      gameName,
      savedAt: new Date().toLocaleString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      }),
      size: randomSize(),
    };
    const next = [slot, ...get().saveSlots].slice(0, 50);
    persistSaves(next);
    set({ saveSlots: next });
  },

  removeSave: (id) => {
    const next = get().saveSlots.filter((s) => s.id !== id);
    persistSaves(next);
    set({ saveSlots: next });
  },

  clearSaves: () => {
    persistSaves([]);
    set({ saveSlots: [] });
  },

  // Llamada desde un useEffect en el cliente para cargar los saves reales tras la
  // hidratación. Evita mismatch SSR/cliente.
  initSavesFromStorage: () => {
    const current = get().saveSlots;
    if (current.length > 0) return; // ya hay datos
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (Array.isArray(data) && data.length > 0) {
        set({ saveSlots: data });
      }
    } catch {
      // ignore
    }
  },
}));
