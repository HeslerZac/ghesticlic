import { ImageIcon, PlayCircle, ScanFace } from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/app/components/motion";

export const metadata = {
  title: "En acción",
  description:
    "Capturas y videos de SATGF en funcionamiento: control de la computadora usando solo gestos faciales.",
};

const VIDEOS = [
  { titulo: "Demostración completa del sistema", src: "/GHestiClic_DEMO.mp4" },
];

const CAPTURAS = [
  { titulo: "Instalación guiada", src: "/en-accion/1_instalacion.jpg" },
  { titulo: "Pantalla principal", src: "/en-accion/2_pantalla_principal.jpg" },
  { titulo: "Guía de gestos", src: "/en-accion/3_guia_gestos.jpg" },
  { titulo: "Calibración de gestos y umbrales", src: "/en-accion/4_calibracion.jpg" },
  { titulo: "Administración de perfiles", src: "/en-accion/5_perfiles.jpg" },
  { titulo: "Modo de prueba (simulación)", src: "/en-accion/6_modo_prueba.jpg" },
  { titulo: "Configuración del sistema", src: "/en-accion/7_configuracion.jpg" },
  { titulo: "Acceso administrativo seguro", src: "/en-accion/8_administracion.jpg" },
];

function Proximamente({ icono, texto, aspecto }: { icono: React.ReactNode; texto: string; aspecto: string }) {
  return (
    <div
      className={`flex ${aspecto} flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--bg-soft)] text-[var(--text-soft)]`}
    >
      {icono}
      <span className="px-4 text-center text-sm">{texto}</span>
      <span className="text-xs opacity-60">(próximamente)</span>
    </div>
  );
}

export default function EnAccion() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <FadeIn>
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex rounded-2xl bg-[var(--accent)]/10 p-3">
            <ScanFace className="h-8 w-8 text-[var(--accent)]" />
          </div>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">SATGF en acción</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--text-soft)]">
            Mirá cómo se controla la computadora usando únicamente gestos faciales
            y movimientos de la cabeza, sin tocar el ratón ni el teclado.
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="mt-14 flex items-center gap-2 text-2xl font-bold">
          <PlayCircle className="h-6 w-6 text-[var(--accent)]" /> Video
        </h2>
      </FadeIn>
      <StaggerGroup className="mt-6 grid gap-6">
        {VIDEOS.map((v, i) => (
          <StaggerItem key={i}>
            {v.src ? (
              <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
                <video
                  className="aspect-video w-full bg-black"
                  src={v.src}
                  controls
                  preload="metadata"
                  playsInline
                >
                  {v.titulo}
                </video>
              </div>
            ) : (
              <Proximamente icono={<PlayCircle className="h-8 w-8" />} texto={v.titulo} aspecto="aspect-video" />
            )}
          </StaggerItem>
        ))}
      </StaggerGroup>

      <FadeIn>
        <h2 className="mt-16 flex items-center gap-2 text-2xl font-bold">
          <ImageIcon className="h-6 w-6 text-[var(--accent)]" /> Funciones del sistema
        </h2>
      </FadeIn>
      <StaggerGroup className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CAPTURAS.map((c, i) => (
          <StaggerItem key={i}>
            <figure>
              {c.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.src}
                  alt={c.titulo}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] object-contain"
                />
              ) : (
                <Proximamente icono={<ImageIcon className="h-7 w-7" />} texto={c.titulo} aspecto="aspect-[4/3]" />
              )}
              {c.src && (
                <figcaption className="mt-2 text-center text-sm text-[var(--text-soft)]">{c.titulo}</figcaption>
              )}
            </figure>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
