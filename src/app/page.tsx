'use client';

import { useEffect } from 'react';
import { Topbar } from '@/components/catalog/topbar';
import { Header } from '@/components/catalog/header';
import { GameGrid } from '@/components/catalog/game-grid';
import { Footer } from '@/components/catalog/footer';
import { DonateBanner } from '@/components/catalog/donate-banner';
import { HelpModal } from '@/components/catalog/help-modal';
import { LegalModal } from '@/components/catalog/legal-modal';
import { SaveManagerModal } from '@/components/catalog/save-manager-modal';
import { KioskPlayer } from '@/components/player/kiosk-player';
import { useCatalogStore } from '@/lib/catalog-store';

export default function Home() {
  const setOnline = useCatalogStore((s) => s.setOnline);
  const initSaves = useCatalogStore((s) => s.initSavesFromStorage);

  useEffect(() => {
    // Cargar saves reales desde localStorage una vez montado el cliente.
    initSaves();
    // Empezar con un número aleatorio de "usuarios online" (ya en cliente).
    setOnline(20 + Math.floor(Math.random() * 22));
    // Y simular pequeños cambios cada 4 segundos como en el original.
    const t = setInterval(() => {
      const n = 20 + Math.floor(Math.random() * 22);
      setOnline(n);
    }, 4000);
    return () => clearInterval(t);
  }, [setOnline, initSaves]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Topbar />
      <Header />
      <main style={{ flex: 1 }}>
        <GameGrid />
      </main>
      <Footer />
      {/* Banner de donación / visita oficial */}
      <DonateBanner />
      {/* Modales */}
      <HelpModal />
      <LegalModal />
      <SaveManagerModal />
      {/* Reproductor estilo kiosk a pantalla completa (cuando se abre un juego) */}
      <KioskPlayer />
    </div>
  );
}
