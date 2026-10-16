import Link from "next/link";
import {
  MousePointerClick,
  Mic,
  ScrollText,
  UserCog,
  Download,
  ArrowRight,
  ScanFace,
} from "lucide-react";
import { FadeIn, StaggerGroup, StaggerItem } from "@/app/components/motion";
import { Contador } from "@/app/components/contador";
import { DemoJugable } from "@/app/components/demo-jugable";

const ESTADISTICAS = [
  { valor: 6, sufijo: "", texto: "Gestos faciales" },
  { valor: 52, sufijo: "", texto: "Blendshapes detectados" },
  { valor: 4, sufijo: "", texto: "Acciones del mouse" },
  { valor: 100, sufijo: "%", texto: "Funciona sin internet" },
];

const CARACTERISTICAS = [
  {
    icono: MousePointerClick,
    titulo: "Control del mouse",
    texto:
      "Mueve el cursor con la cabeza y haz clic, doble clic y arrastra con gestos de la cara. Sin manos.",
  },
  {
    icono: ScrollText,
    titulo: "Scroll por gestos",
    texto:
      "Desplázate vertical y horizontalmente con una sonrisa y el movimiento de tu cabeza.",
  },
  {
    icono: Mic,
    titulo: "Dictado por voz",
    texto:
      "Escribe hablando, sin tocar el teclado. Reconocimiento de voz que funciona completamente offline.",
  },
  {
    icono: UserCog,
    titulo: "Perfiles personalizados",
    texto:
      "Cada usuario calibra sus propios gestos y umbrales. El sistema se adapta a cada rostro.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:py-32">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-1.5 text-sm text-[var(--text-soft)]">
              <ScanFace className="h-4 w-4 text-[var(--accent)]" />
              Tecnología de inclusión digital
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
              Controla tu computadora
              <br />
              <span className="text-[var(--accent)]">con tu rostro</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-soft)]">
              SATGF permite a personas con discapacidad motriz usar la
              computadora mediante gestos faciales y voz, sin necesidad de las
              manos. Software libre, offline y adaptable a cada persona.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/descargar"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3.5 font-semibold text-white transition-transform hover:scale-105"
              >
                <Download className="h-5 w-5" />
                Descargar gratis
              </Link>
              <Link
                href="/como-funciona"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-7 py-3.5 font-semibold transition-colors hover:border-[var(--accent)]"
              >
                Cómo funciona
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--bg-soft)]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 py-14 sm:grid-cols-4">
          {ESTADISTICAS.map((e) => (
            <div key={e.texto} className="text-center">
              <div className="text-4xl font-bold text-[var(--accent)] sm:text-5xl">
                <Contador valor={e.valor} sufijo={e.sufijo} />
              </div>
              <div className="mt-2 text-sm text-[var(--text-soft)]">
                {e.texto}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            Demo interactiva
          </h2>
          <p className="mx-auto mb-10 mt-3 max-w-xl text-center text-[var(--text-soft)]">
            Prueba los gestos aquí mismo, sin instalar nada. Usa el mismo modelo
            de IA que la aplicación de escritorio.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <DemoJugable />
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <FadeIn>
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            Todo lo que puedes hacer
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[var(--text-soft)]">
            Un sistema completo de accesibilidad, controlado por la cara y la
            voz.
          </p>
        </FadeIn>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2">
          {CARACTERISTICAS.map((c) => (
            <StaggerItem
              key={c.titulo}
              className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-shadow hover:shadow-lg"
            >
              <div className="inline-flex rounded-xl bg-[var(--accent)]/10 p-3">
                <c.icono className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{c.titulo}</h3>
              <p className="mt-2 text-[var(--text-soft)]">{c.texto}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24">
        <FadeIn>
          <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-2)]/10 p-10 text-center sm:p-14">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Pruébalo tú mismo
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[var(--text-soft)]">
              Descarga la aplicación y dale independencia digital a quien más lo
              necesita.
            </p>
            <Link
              href="/descargar"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3.5 font-semibold text-white transition-transform hover:scale-105"
            >
              <Download className="h-5 w-5" />
              Descargar SATGF
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
