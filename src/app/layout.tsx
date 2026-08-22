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
  title: "Dinamic Multimedia · Clon Retro",
  description:
    "Clon no oficial de online.dinamicmultimedia.es: juega a los clásicos de Dinamic Multimedia (PC Fútbol, PC Basket, Premier Manager, Igor, Combat Chess) directamente en tu navegador.",
  keywords: [
    "Dinamic Multimedia",
    "PC Fútbol",
    "PC Basket",
    "Premier Manager",
    "Igor",
    "Combat Chess",
    "retrogaming",
    "juegos clásicos",
  ],
  authors: [{ name: "Clon no oficial" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Dinamic Multimedia · Clon Retro",
    description:
      "Juega a los clásicos de Dinamic Multimedia en tu navegador. Clon no oficial.",
    url: "https://online.dinamicmultimedia.es",
    siteName: "Dinamic Multimedia (clon)",
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
