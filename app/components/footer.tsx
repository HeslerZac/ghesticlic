import Link from "next/link";
import { ScanFace } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-soft)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 font-bold text-lg">
              <ScanFace className="h-6 w-6 text-[var(--accent)]" />
              <span>SATGF</span>
            </div>
            <p className="mt-3 text-sm text-[var(--text-soft)]">
              Sistema de Asistencia Tecnológica por Gestos Faciales para la
              inclusión digital de personas con discapacidad motriz.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <p className="font-semibold text-[var(--text)]">Enlaces</p>
            <Link href="/como-funciona" className="text-[var(--text-soft)] hover:text-[var(--accent)]">
              Cómo funciona
            </Link>
            <Link href="/tecnologia" className="text-[var(--text-soft)] hover:text-[var(--accent)]">
              Tecnología
            </Link>
            <Link href="/descargar" className="text-[var(--text-soft)] hover:text-[var(--accent)]">
              Descargar
            </Link>
            <Link href="/documentacion" className="text-[var(--text-soft)] hover:text-[var(--accent)]">
              Documentación
            </Link>
            <Link href="/accesibilidad" className="text-[var(--text-soft)] hover:text-[var(--accent)]">
              Accesibilidad
            </Link>
          </div>

          <div className="text-sm text-[var(--text-soft)]">
            <p className="font-semibold text-[var(--text)]">Proyecto de graduación</p>
            <p className="mt-2">Universidad Mariano Gálvez de Guatemala</p>
            <p>Ingeniería en Sistemas</p>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--text-soft)]">
          © {new Date().getFullYear()} SATGF. Proyecto académico de inclusión digital.
        </div>
      </div>
    </footer>
  );
}
