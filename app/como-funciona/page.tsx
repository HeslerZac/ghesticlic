import {
  MousePointerClick,
  MousePointer2,
  Move,
  ScrollText,
  Mic,
  Camera,
  Cpu,
  MousePointer,
} from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/app/components/motion";

const GESTOS = [
  {
    gesto: "Levantar las cejas",
    accion: "Clic izquierdo",
    detalle: "Una subida corta hace clic; dos seguidas, doble clic.",
    icono: MousePointerClick,
  },
  {
    gesto: "Cejas sostenidas",
    accion: "Arrastrar y seleccionar",
    detalle: "Mantén las cejas levantadas y mueve la cabeza para arrastrar.",
    icono: Move,
  },
  {
    gesto: "Abrir la boca",
    accion: "Clic derecho",
    detalle: "Abre el menú contextual, igual que el botón derecho del mouse.",
    icono: MousePointer2,
  },
  {
    gesto: "Sonreír",
    accion: "Modo scroll",
    detalle: "Activa el desplazamiento; mueve la cabeza para hacer scroll.",
    icono: ScrollText,
  },
  {
    gesto: "Fruncir los labios",
    accion: "Dictado por voz",
    detalle: "Enciende o apaga el dictado para escribir hablando.",
    icono: Mic,
  },
  {
    gesto: "Mover la cabeza (nariz)",
    accion: "Mover el cursor",
    detalle: "La posición de la nariz controla el puntero, con suavizado anti-temblor.",
    icono: MousePointer,
  },
];

const PASOS = [
  {
    icono: Camera,
    titulo: "1. La cámara te observa",
    texto:
      "La cámara web capta tu rostro en tiempo real, sin enviar nada a internet.",
  },
  {
    icono: Cpu,
    titulo: "2. La IA reconoce tus gestos",
    texto:
      "MediaPipe analiza 468 puntos del rostro y detecta cada gesto según tu calibración.",
  },
  {
    icono: MousePointer,
    titulo: "3. Se ejecuta la acción",
    texto:
      "Cada gesto se traduce en una acción del mouse o del teclado en tu computadora.",
  },
];

export default function ComoFunciona() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <FadeIn>
        <h1 className="text-center text-4xl font-bold sm:text-5xl">
          Cómo funciona
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--text-soft)]">
          SATGF traduce los gestos de tu cara en acciones de la computadora, en
          tres pasos.
        </p>
      </FadeIn>

      <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-3">
        {PASOS.map((p) => (
          <StaggerItem
            key={p.titulo}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 text-center"
          >
            <div className="mx-auto inline-flex rounded-xl bg-[var(--accent)]/10 p-3">
              <p.icono className="h-7 w-7 text-[var(--accent)]" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{p.titulo}</h3>
            <p className="mt-2 text-sm text-[var(--text-soft)]">{p.texto}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <FadeIn>
        <h2 className="mt-20 text-center text-3xl font-bold">
          Los gestos y sus acciones
        </h2>
      </FadeIn>

      <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2">
        {GESTOS.map((g) => (
          <StaggerItem
            key={g.gesto}
            className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"
          >
            <div className="mt-1 inline-flex shrink-0 rounded-xl bg-[var(--accent)]/10 p-3">
              <g.icono className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">{g.gesto}</span>
                <span className="text-[var(--text-soft)]">→</span>
                <span className="font-semibold text-[var(--accent)]">
                  {g.accion}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--text-soft)]">{g.detalle}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
