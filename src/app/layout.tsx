import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "JuegosZ · SNES online",
  description:
    "Juega a clásicos de Super Nintendo directamente en tu navegador: emulación con EmulatorJS, sin descargas ni instalaciones.",
  keywords: [
    "JuegosZ",
    "SNES",
    "Super Nintendo",
    "emulador online",
    "retrogaming",
    "juegos clásicos",
  ],
  authors: [{ name: "JuegosZ" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>",
  },
  openGraph: {
    title: "JuegosZ · SNES online",
    description:
      "Juega a clásicos de Super Nintendo directamente en tu navegador.",
    siteName: "JuegosZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${lato.variable} antialiased`}
        style={{ fontFamily: "var(--font-lato), system-ui, sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
