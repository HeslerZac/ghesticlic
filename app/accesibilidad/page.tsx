import { Keyboard, Eye, Volume2, MousePointer, Contrast, Type } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/app/components/motion";

export const metadata = {
  title: "Accesibilidad",
  description:
    "Compromiso de accesibilidad de SATGF: esta web es navegable por teclado, compatible con lectores de pantalla y respeta las preferencias del usuario.",
};

const CARACTERISTICAS = [
  {
    icono: Keyboard,
    titulo: "Navegación por teclado",
    texto:
      "Toda la web se puede recorrer con la tecla Tab. Usa el enlace 'Saltar al contenido' al inicio.",
  },
  {
    icono: Eye,
    titulo: "Foco visible",
    texto:
      "Cada elemento interactivo muestra un contorno claro cuando recibe el foco del teclado.",
  },
  {
    icono: Volume2,
    titulo: "Lectores de pantalla",
    texto:
      "Estructura semántica con encabezados, etiquetas y textos alternativos para tecnologías de asistencia.",
  },
  {
    icono: Contrast,
    titulo: "Modo claro y oscuro",
    texto:
      "Elige el tema que mejor se adapte a tu visión, con contraste de color adecuado.",
  },
  {
    icono: MousePointer,
    titulo: "Movimiento reducido",
    texto:
      "Si tu sistema pide reducir animaciones, la web respeta esa preferencia automáticamente.",
  },
  {
    icono: Type,
    titulo: "Texto legible",
    texto:
      "Tipografía clara y tamaños amplios que se adaptan al tamaño de tu pantalla.",
  },
];

export default function Accesibilidad() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <FadeIn>
        <h1 className="text-center text-4xl font-bold sm:text-5xl">
          Accesibilidad
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--text-soft)]">
          SATGF es un proyecto de inclusión digital, y creemos que esta misma
          web debe ser accesible para todas las personas.
        </p>
      </FadeIn>

      <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2">
        {CARACTERISTICAS.map((c) => (
          <StaggerItem
            key={c.titulo}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
          >
            <div className="inline-flex rounded-xl bg-[var(--accent)]/10 p-3">
              <c.icono className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{c.titulo}</h3>
            <p className="mt-2 text-sm text-[var(--text-soft)]">{c.texto}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <FadeIn>
        <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-6 text-center text-sm text-[var(--text-soft)]">
          Esta web sigue las pautas de accesibilidad WCAG como referencia de
          diseño. Si encuentras alguna barrera de accesibilidad, tu
          retroalimentación es bienvenida.
        </div>
      </FadeIn>
    </div>
  );
}
