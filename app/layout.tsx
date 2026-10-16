import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";
import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";

export const metadata: Metadata = {
  title: {
    default: "SATGF — Control por gestos faciales",
    template: "%s · SATGF",
  },
  description:
    "Sistema de Asistencia Tecnológica por Gestos Faciales para la inclusión digital de personas con discapacidad motriz. Controla la computadora con movimientos de la cara.",
  keywords: [
    "accesibilidad",
    "inclusión digital",
    "discapacidad motriz",
    "gestos faciales",
    "MediaPipe",
    "control por rostro",
  ],
  authors: [{ name: "Hesler" }],
  openGraph: {
    title: "SATGF — Control por gestos faciales",
    description:
      "Controla la computadora con movimientos de la cara. Software libre de inclusión digital.",
    type: "website",
    locale: "es_GT",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-white"
          >
            Saltar al contenido
          </a>
          <Navbar />
          <main id="contenido">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
