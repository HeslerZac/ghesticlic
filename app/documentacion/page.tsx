import {
  Download,
  UserPlus,
  SlidersHorizontal,
  Play,
  HelpCircle,
  Keyboard,
} from "lucide-react";
import { FadeIn } from "@/app/components/motion";

export const metadata = {
  title: "Documentación",
  description:
    "Manual de usuario de SATGF: instalación, creación de perfil, calibración de gestos, uso y solución de problemas.",
};

const SECCIONES = [
  {
    id: "instalacion",
    icono: Download,
    titulo: "1. Instalación",
    contenido: [
      "Descarga el instalador desde la página de Descargas.",
      "Ejecuta el archivo y sigue el asistente.",
      "Al abrir por primera vez, permite el acceso a la cámara y al micrófono.",
    ],
  },
  {
    id: "perfil",
    icono: UserPlus,
    titulo: "2. Crear tu perfil",
    contenido: [
      "Abre la aplicación e ingresa al panel de administración.",
      "Selecciona 'Nuevo perfil' y escribe tu nombre.",
      "Cada usuario tiene su propio perfil con sus gestos y umbrales.",
    ],
  },
  {
    id: "calibracion",
    icono: SlidersHorizontal,
    titulo: "3. Calibrar tus gestos",
    contenido: [
      "En la pantalla de calibración verás tu cámara y una barra por cada gesto.",
      "Pulsa 'Calibrar' junto a un gesto y realízalo durante 3 segundos.",
      "El sistema fija el umbral automáticamente; puedes afinarlo con el deslizante.",
      "Asigna cada función del mouse al gesto que mejor te funcione.",
    ],
  },
  {
    id: "uso",
    icono: Play,
    titulo: "4. Usar el sistema",
    contenido: [
      "Selecciona tu perfil e inicia el sistema.",
      "Mueve la cabeza para desplazar el cursor.",
      "Usa tus gestos calibrados para hacer clic, scroll y dictado.",
      "Presiona 'p' o F8 para pausar el control en cualquier momento.",
    ],
  },
];

const ATAJOS = [
  { tecla: "q", accion: "Cerrar el motor" },
  { tecla: "p", accion: "Pausar / reanudar el control" },
  { tecla: "F8", accion: "Pausa de emergencia (global)" },
];

const PROBLEMAS = [
  {
    p: "El cursor tiembla mucho",
    r: "Reduce la sensibilidad en el perfil o mejora la iluminación de la habitación.",
  },
  {
    p: "Un gesto se activa solo",
    r: "Sube el umbral de ese gesto en la calibración.",
  },
  {
    p: "No detecta mi voz",
    r: "Verifica que el micrófono correcto esté seleccionado en Windows y que las apps tengan permiso.",
  },
  {
    p: "La cámara no enciende",
    r: "Cierra otras aplicaciones que usen la cámara y revisa los permisos de Windows.",
  },
];

export default function Documentacion() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <FadeIn>
        <h1 className="text-center text-4xl font-bold sm:text-5xl">
          Documentación
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--text-soft)]">
          Manual de usuario para instalar, configurar y usar SATGF.
        </p>
        <div className="mt-6 flex justify-center">
          <a
            href="/Manual_de_Usuario_GHestiClic.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            <Download className="h-5 w-5" />
            Descargar manual (PDF)
          </a>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {SECCIONES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-1.5 text-sm text-[var(--text-soft)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {s.titulo}
            </a>
          ))}
        </div>
      </FadeIn>

      <div className="mt-12 space-y-8">
        {SECCIONES.map((s) => (
          <FadeIn key={s.id}>
            <section
              id={s.id}
              className="scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
            >
              <div className="flex items-center gap-3">
                <div className="inline-flex rounded-xl bg-[var(--accent)]/10 p-3">
                  <s.icono className="h-6 w-6 text-[var(--accent)]" />
                </div>
                <h2 className="text-xl font-bold">{s.titulo}</h2>
              </div>
              <ol className="mt-4 space-y-2">
                {s.contenido.map((linea, i) => (
                  <li key={i} className="flex gap-3 text-[var(--text-soft)]">
                    <span className="font-semibold text-[var(--accent)]">
                      {String.fromCharCode(97 + i)})
                    </span>
                    <span>{linea}</span>
                  </li>
                ))}
              </ol>
            </section>
          </FadeIn>
        ))}

        <FadeIn>
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex rounded-xl bg-[var(--accent)]/10 p-3">
                <Keyboard className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h2 className="text-xl font-bold">Atajos de teclado</h2>
            </div>
            <div className="mt-4 space-y-2">
              {ATAJOS.map((a) => (
                <div key={a.tecla} className="flex items-center gap-3">
                  <kbd className="rounded-md border border-[var(--border)] bg-[var(--bg-soft)] px-2.5 py-1 font-mono text-sm">
                    {a.tecla}
                  </kbd>
                  <span className="text-[var(--text-soft)]">{a.accion}</span>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex rounded-xl bg-[var(--accent)]/10 p-3">
                <HelpCircle className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h2 className="text-xl font-bold">Solución de problemas</h2>
            </div>
            <div className="mt-4 space-y-4">
              {PROBLEMAS.map((item) => (
                <div key={item.p}>
                  <p className="font-semibold">{item.p}</p>
                  <p className="mt-1 text-sm text-[var(--text-soft)]">{item.r}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
