import { Layers, Eye, Filter, Save } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/app/components/motion";

const STACK = [
  {
    icono: Eye,
    titulo: "MediaPipe Face Landmarker",
    texto:
      "Modelo de IA de Google que detecta 52 blendshapes faciales (Blendshape V2), el mismo enfoque que usa la industria para reconocimiento de gestos.",
  },
  {
    icono: Filter,
    titulo: "Filtro One Euro",
    texto:
      "Algoritmo de suavizado adaptativo que reduce el temblor del cursor sin agregar retraso perceptible.",
  },
  {
    icono: Layers,
    titulo: "Arquitectura en capas",
    texto:
      "Presentación, lógica de negocio y acceso a datos separados, para un código mantenible y escalable.",
  },
  {
    icono: Save,
    titulo: "100% offline",
    texto:
      "Reconocimiento de voz (Whisper) y de gestos corren localmente. Ningún dato sale del equipo del usuario.",
  },
];

export default function Tecnologia() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <FadeIn>
        <h1 className="text-center text-4xl font-bold sm:text-5xl">Tecnología</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--text-soft)]">
          Construido con herramientas modernas de visión por computadora e
          inteligencia artificial.
        </p>
      </FadeIn>

      <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2">
        {STACK.map((s) => (
          <StaggerItem
            key={s.titulo}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
          >
            <div className="inline-flex rounded-xl bg-[var(--accent)]/10 p-3">
              <s.icono className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{s.titulo}</h3>
            <p className="mt-2 text-[var(--text-soft)]">{s.texto}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
