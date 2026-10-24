"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, ScanFace } from "lucide-react";

const ENLACES = [
  { href: "/", texto: "Inicio" },
  { href: "/como-funciona", texto: "Cómo funciona" },
  { href: "/tecnologia", texto: "Tecnología" },
  { href: "/en-accion", texto: "En acción" },
  { href: "/documentacion", texto: "Manual" },
  { href: "/descargar", texto: "Descargar" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [montado, setMontado] = useState(false);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => setMontado(true), []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <ScanFace className="h-6 w-6 text-[var(--accent)]" />
          <span>SATGF</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {ENLACES.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="text-sm text-[var(--text-soft)] transition-colors hover:text-[var(--accent)]"
            >
              {e.texto}
            </Link>
          ))}
          <BotonTema montado={montado} theme={theme} setTheme={setTheme} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <BotonTema montado={montado} theme={theme} setTheme={setTheme} />
          <button
            onClick={() => setAbierto(!abierto)}
            aria-label="Abrir menú"
            className="rounded-lg p-2 hover:bg-[var(--bg-soft)]"
          >
            {abierto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {abierto && (
        <div className="border-t border-[var(--border)] md:hidden">
          <div className="flex flex-col px-4 py-2">
            {ENLACES.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                onClick={() => setAbierto(false)}
                className="py-2 text-sm text-[var(--text-soft)] hover:text-[var(--accent)]"
              >
                {e.texto}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function BotonTema({
  montado,
  theme,
  setTheme,
}: {
  montado: boolean;
  theme?: string;
  setTheme: (t: string) => void;
}) {
  if (!montado) return <div className="h-9 w-9" />;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Cambiar tema claro/oscuro"
      className="rounded-lg p-2 hover:bg-[var(--bg-soft)]"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
