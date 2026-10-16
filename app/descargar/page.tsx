import { Download, Monitor, Camera, Mic, HardDrive, CheckCircle2 } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/app/components/motion";

const ENLACE_DESCARGA = "#";

const REQUISITOS = [
  { icono: Monitor, texto: "Windows 10 u 11 (64 bits)" },
  { icono: Camera, texto: "Cámara web (integrada o USB)" },
  { icono: Mic, texto: "Micrófono (para el dictado por voz)" },
  { icono: HardDrive, texto: "500 MB de espacio libre" },
];

const PASOS = [
  "Descarga el instalador con el botón de arriba.",
  "Ejecuta el archivo descargado y sigue el asistente de instalación.",
  "Abre SATGF y crea tu perfil de usuario.",
  "Calibra tus gestos con la guía en pantalla.",
  "¡Listo! Ya puedes controlar tu computadora con el rostro.",
];

export default function Descargar() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <FadeIn>
        <h1 className="text-center text-4xl font-bold sm:text-5xl">
          Descargar SATGF
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-[var(--text-soft)]">
          Gratuito y sin registro. Descarga la aplicación e instálala en tu
          computadora.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-10 flex flex-col items-center rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-2)]/10 p-10 text-center">
          <a
            href={ENLACE_DESCARGA}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 text-lg font-semibold text-white transition-transform hover:scale-105"
          >
            <Download className="h-6 w-6" />
            Descargar para Windows
          </a>
          <p className="mt-4 text-sm text-[var(--text-soft)]">
            Versión 1.0 · Instalador .exe
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-16 text-2xl font-bold">Requisitos del sistema</h2>
      </FadeIn>
      <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2">
        {REQUISITOS.map((r) => (
          <StaggerItem
            key={r.texto}
            className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
          >
            <r.icono className="h-5 w-5 text-[var(--accent)]" />
            <span className="text-sm">{r.texto}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <FadeIn>
        <h2 className="mt-16 text-2xl font-bold">Instalación paso a paso</h2>
      </FadeIn>
      <StaggerGroup className="mt-6 space-y-3">
        {PASOS.map((paso, i) => (
          <StaggerItem
            key={i}
            className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--green)]" />
            <span>{paso}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
