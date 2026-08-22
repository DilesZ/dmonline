'use client';

import { FOOTER_VERSION } from '@/lib/games-data';

export function Footer() {
  return <footer className="dm-footer">{FOOTER_VERSION}</footer>;
}
