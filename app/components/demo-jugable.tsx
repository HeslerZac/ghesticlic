"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  Camera,
  Loader2,
  Lock,
  Trophy,
  Timer,
  RotateCcw,
  Crosshair,
  MousePointerClick,
  MousePointer2,
  Move,
  ScrollText,
} from "lucide-react";

type Estado = "inicial" | "cargando" | "activo" | "error";
type Modo = "practica" | "juego";
type Reto = "clic" | "clicDer" | "arrastrar" | "scroll";

const UMBRAL_BOCA = 0.25;
const UMBRAL_CEJAS = 0.45;
const UMBRAL_SONRISA = 0.6;
const GANANCIA = 6.0;

const RETOS: Reto[] = ["clic", "clicDer", "arrastrar", "scroll"];
const INFO_RETO: Record<Reto, { titulo: string; instruccion: string; icono: React.ElementType }> = {
  clic: { titulo: "Clic izquierdo", instruccion: "Apunta al círculo y ABRE LA BOCA", icono: MousePointerClick },
  clicDer: { titulo: "Clic derecho", instruccion: "Apunta al cuadro y SUBE LAS CEJAS", icono: MousePointer2 },
  arrastrar: { titulo: "Arrastrar", instruccion: "Boca abierta sobre el objeto y llévalo a la meta", icono: Move },
  scroll: { titulo: "Scroll", instruccion: "SONRÍE y baja la cabeza para llegar al final", icono: ScrollText },
};

export function DemoJugable() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const landmarkerRef = useRef<unknown>(null);
  const rafRef = useRef<number | null>(null);

  const [estado, setEstado] = useState<Estado>("inicial");
  const [error, setError] = useState("");
  const [modo, setModo] = useState<Modo>("practica");
  const modoRef = useRef<Modo>("practica");

  const cursor = useRef({ x: 0.5, y: 0.5 });
  const centroNariz = useRef<{ x: number; y: number } | null>(null);
  const [cursorUI, setCursorUI] = useState({ x: 0.5, y: 0.5 });
  const [clicVisual, setClicVisual] = useState(false);

  const bocaPrev = useRef(false);
  const cejasPrev = useRef(false);

  const [botonActivo, setBotonActivo] = useState<number | null>(null);

  const jugandoRef = useRef(false);
  const [jugando, setJugando] = useState(false);
  const [puntos, setPuntos] = useState(0);
  const puntosRef = useRef(0);
  const [tiempo, setTiempo] = useState(30);
  const finJuego = useRef(0);

  const colaRetos = useRef<Reto[]>([]);
  const retoRef = useRef<Reto>("clic");
  const retoResuelto = useRef(false);
  const [retoUI, setRetoUI] = useState<Reto>("clic");

  const objetivo = useRef({ x: 0.5, y: 0.4 });
  const [objetivoUI, setObjetivoUI] = useState({ x: 0.5, y: 0.4 });
  const meta = useRef({ x: 0.5, y: 0.7 });
  const [metaUI, setMetaUI] = useState({ x: 0.5, y: 0.7 });
  const arrastrando = useRef(false);
  const [arrastrandoUI, setArrastrandoUI] = useState(false);

  const scrollProg = useRef(0);
  const [scrollProgUI, setScrollProgUI] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    modoRef.current = modo;
  }, [modo]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const v = videoRef.current;
      if (v && v.srcObject) {
        (v.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const pos = () => ({ x: 0.15 + Math.random() * 0.7, y: 0.15 + Math.random() * 0.6 });

  const siguienteReto = (): Reto => {
    if (colaRetos.current.length === 0) {
      const baraja = [...RETOS];
      for (let i = baraja.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [baraja[i], baraja[j]] = [baraja[j], baraja[i]];
      }
      if (baraja[0] === retoRef.current && baraja.length > 1) {
        [baraja[0], baraja[1]] = [baraja[1], baraja[0]];
      }
      colaRetos.current = baraja;
    }
    return colaRetos.current.shift()!;
  };

  const nuevoReto = useCallback(() => {
    const r = siguienteReto();
    retoResuelto.current = false;
    retoRef.current = r;
    setRetoUI(r);
    arrastrando.current = false;
    setArrastrandoUI(false);
    scrollProg.current = 0;
    setScrollProgUI(0);
    const o = pos();
    objetivo.current = o;
    setObjetivoUI({ ...o });
    if (r === "arrastrar") {
      const m = pos();
      meta.current = m;
      setMetaUI({ ...m });
    }
    setFeedback(INFO_RETO[r].instruccion);
  }, []);

  const completarReto = useCallback(() => {
    if (retoResuelto.current) return;
    retoResuelto.current = true;
    puntosRef.current += 1;
    setPuntos(puntosRef.current);
    setFeedback("¡Bien! 🎉");
    setTimeout(() => {
      if (jugandoRef.current) nuevoReto();
    }, 500);
  }, [nuevoReto]);

  function iniciarJuego() {
    puntosRef.current = 0;
    setPuntos(0);
    setTiempo(30);
    finJuego.current = performance.now() + 30000;
    colaRetos.current = [];
    jugandoRef.current = true;
    setJugando(true);
    nuevoReto();
  }

  const clicPractica = useCallback(() => {
    const col = Math.floor(cursor.current.x * 3);
    const fila = Math.floor(cursor.current.y * 3);
    const idx = Math.min(8, Math.max(0, fila * 3 + col));
    setBotonActivo(idx);
    setTimeout(() => setBotonActivo(null), 350);
  }, []);

  function flashClic() {
    setClicVisual(true);
    setTimeout(() => setClicVisual(false), 150);
  }

  const cerca = (a: { x: number; y: number }, r = 0.1) =>
    Math.hypot(cursor.current.x - a.x, cursor.current.y - a.y) < r;

  function onBocaAbre() {
    flashClic();
    if (modoRef.current === "practica") return clicPractica();
    if (!jugandoRef.current) return;
    const r = retoRef.current;
    if (r === "clic" && cerca(objetivo.current)) completarReto();
    if (r === "arrastrar" && cerca(objetivo.current)) {
      arrastrando.current = true;
      setArrastrandoUI(true);
      setFeedback("Llévalo a la meta y suelta (cierra la boca)");
    }
  }
  function onBocaCierra() {
    if (modoRef.current === "juego" && retoRef.current === "arrastrar" && arrastrando.current) {
      arrastrando.current = false;
      setArrastrandoUI(false);
      if (cerca(meta.current, 0.12)) completarReto();
      else setFeedback("Casi… vuelve a tomar el objeto");
    }
  }
  function onCejas() {
    flashClic();
    if (modoRef.current === "practica") return clicPractica();
    if (!jugandoRef.current) return;
    if (retoRef.current === "clicDer" && cerca(objetivo.current)) completarReto();
  }

  async function iniciar() {
    setEstado("cargando");
    setError("");
    try {
      const vision = await import("@mediapipe/tasks-vision");
      const { FaceLandmarker, FilesetResolver } = vision;
      const fileset = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm"
      );
      const landmarker = await FaceLandmarker.createFromOptions(fileset, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          delegate: "GPU",
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
        numFaces: 1,
      });
      landmarkerRef.current = landmarker;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });
      const video = videoRef.current!;
      video.srcObject = stream;
      await video.play();
      setEstado("activo");
      bucle();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
      setEstado("error");
    }
  }

  function recentrar() {
    centroNariz.current = null;
  }

  let ultimoTs = -1;
  function bucle() {
    const video = videoRef.current;
    const landmarker = landmarkerRef.current as {
      detectForVideo: (
        v: HTMLVideoElement,
        t: number
      ) => {
        faceBlendshapes?: { categories: { categoryName: string; score: number }[] }[];
        faceLandmarks?: { x: number; y: number }[][];
      };
    } | null;
    if (!video || !landmarker) return;

    if (video.currentTime !== ultimoTs) {
      ultimoTs = video.currentTime;
      const res = landmarker.detectForVideo(video, performance.now());

      if (res.faceLandmarks && res.faceLandmarks.length > 0) {
        const nariz = res.faceLandmarks[0][1];
        if (nariz) {
          if (centroNariz.current === null) centroNariz.current = { x: nariz.x, y: nariz.y };
          const dx = nariz.x - centroNariz.current.x;
          const dy = nariz.y - centroNariz.current.y;
          let x = 0.5 - dx * GANANCIA;
          let y = 0.5 + dy * GANANCIA;
          x = Math.max(0, Math.min(1, x));
          y = Math.max(0, Math.min(1, y));
          cursor.current.x += (x - cursor.current.x) * 0.4;
          cursor.current.y += (y - cursor.current.y) * 0.4;
          setCursorUI({ ...cursor.current });
        }
      }

      const mapa: Record<string, number> = {};
      if (res.faceBlendshapes && res.faceBlendshapes.length > 0) {
        for (const c of res.faceBlendshapes[0].categories) mapa[c.categoryName] = c.score;
      }
      const boca = (mapa["jawOpen"] || 0) > UMBRAL_BOCA;
      const cejas = (mapa["browInnerUp"] || 0) > UMBRAL_CEJAS;
      const sonrisa =
        ((mapa["mouthSmileLeft"] || 0) + (mapa["mouthSmileRight"] || 0)) / 2 > UMBRAL_SONRISA;

      if (boca && !bocaPrev.current) onBocaAbre();
      if (!boca && bocaPrev.current) onBocaCierra();
      bocaPrev.current = boca;

      if (cejas && !cejasPrev.current) onCejas();
      cejasPrev.current = cejas;

      if (arrastrando.current) {
        objetivo.current = { x: cursor.current.x, y: cursor.current.y };
        setObjetivoUI({ ...objetivo.current });
      }

      if (modoRef.current === "juego" && jugandoRef.current && retoRef.current === "scroll" && sonrisa) {
        if (!retoResuelto.current) {
          scrollProg.current = Math.min(1, scrollProg.current + Math.max(0, cursor.current.y - 0.5) * 0.05);
          setScrollProgUI(scrollProg.current);
          if (scrollProg.current >= 1) completarReto();
        }
      }

      if (jugandoRef.current) {
        const restante = Math.max(0, Math.ceil((finJuego.current - performance.now()) / 1000));
        setTiempo(restante);
        if (restante <= 0) {
          jugandoRef.current = false;
          setJugando(false);
          setFeedback(`¡Terminó! Lograste ${puntosRef.current} retos 🏆`);
        }
      }
    }
    rafRef.current = requestAnimationFrame(bucle);
  }

  const IconoReto = INFO_RETO[retoUI].icono;

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
      {estado === "inicial" && (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="inline-flex rounded-2xl bg-[var(--accent)]/10 p-4">
            <Camera className="h-10 w-10 text-[var(--accent)]" />
          </div>
          <h3 className="mt-4 text-2xl font-bold">Pruébalo tú mismo</h3>
          <p className="mt-2 max-w-md text-[var(--text-soft)]">
            Mueve el cursor con la cabeza y usa tus gestos: boca para clic, cejas
            para clic derecho, sonrisa para scroll. Todo en tu navegador.
          </p>
          <button
            onClick={iniciar}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3.5 font-semibold text-white transition-transform hover:scale-105"
          >
            <Camera className="h-5 w-5" />
            Activar cámara
          </button>
          <p className="mt-4 flex items-center gap-1.5 text-xs text-[var(--green)]">
            <Lock className="h-3.5 w-3.5" />
            Procesamiento 100% local. Tu video nunca sale de aquí.
          </p>
        </div>
      )}

      {estado === "cargando" && (
        <div className="flex flex-col items-center py-16 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-[var(--accent)]" />
          <p className="mt-4 text-[var(--text-soft)]">Cargando modelo de IA…</p>
        </div>
      )}

      {estado === "error" && (
        <div className="flex flex-col items-center py-12 text-center">
          <p className="font-semibold text-red-500">No se pudo iniciar la demo</p>
          <p className="mt-2 max-w-md text-sm text-[var(--text-soft)]">{error}</p>
          <button
            onClick={iniciar}
            className="mt-5 rounded-xl border border-[var(--border)] px-5 py-2.5 font-semibold hover:border-[var(--accent)]"
          >
            Reintentar
          </button>
        </div>
      )}

      <div className={estado === "activo" ? "" : "absolute h-0 w-0 overflow-hidden opacity-0"}>
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setModo("practica")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              modo === "practica" ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-soft)] text-[var(--text-soft)]"
            }`}
          >
            Práctica
          </button>
          <button
            onClick={() => setModo("juego")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              modo === "juego" ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-soft)] text-[var(--text-soft)]"
            }`}
          >
            Juego de retos
          </button>
          <button
            onClick={recentrar}
            title="Mira al frente y presiona para fijar el centro"
            className="flex items-center gap-1.5 rounded-lg bg-[var(--bg-soft)] px-4 py-2 text-sm font-semibold text-[var(--text-soft)] hover:text-[var(--accent)]"
          >
            <Crosshair className="h-4 w-4" /> Centrar
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
          <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)]">
              {modo === "practica" &&
                Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={`absolute flex items-center justify-center rounded-xl border transition-colors ${
                      botonActivo === i ? "border-[var(--green)] bg-[var(--green)]/30" : "border-[var(--border)] bg-[var(--card)]"
                    }`}
                    style={{
                      left: `${(i % 3) * 33.33 + 1}%`,
                      top: `${Math.floor(i / 3) * 33.33 + 1}%`,
                      width: "31.33%",
                      height: "31.33%",
                    }}
                  >
                    <span className="text-xs text-[var(--text-soft)]">{i + 1}</span>
                  </div>
                ))}

              {modo === "juego" && jugando && (
                <>
                  {retoUI === "arrastrar" && (
                    <div
                      className="absolute flex items-center justify-center rounded-xl border-2 border-dashed border-[var(--green)] text-[10px] text-[var(--green)]"
                      style={{
                        left: `${metaUI.x * 100}%`,
                        top: `${metaUI.y * 100}%`,
                        width: "16%",
                        height: "22%",
                        transform: "translate(-50%,-50%)",
                      }}
                    >
                      META
                    </div>
                  )}

                  {retoUI !== "scroll" && (
                    <div
                      className={`absolute ${retoUI === "clicDer" ? "rounded-md" : "rounded-full"} ${
                        arrastrandoUI ? "bg-[var(--green)]" : "bg-[var(--accent)]"
                      } ring-4 ring-[var(--accent)]/30`}
                      style={{
                        left: `${objetivoUI.x * 100}%`,
                        top: `${objetivoUI.y * 100}%`,
                        width: "11%",
                        height: "16%",
                        transform: "translate(-50%,-50%)",
                      }}
                    />
                  )}

                  {retoUI === "scroll" && (
                    <div className="absolute inset-x-8 top-1/2 -translate-y-1/2">
                      <div className="h-4 overflow-hidden rounded-full bg-[var(--card)]">
                        <div
                          className="h-full rounded-full bg-[var(--accent)] transition-all"
                          style={{ width: `${scrollProgUI * 100}%` }}
                        />
                      </div>
                      <p className="mt-2 text-center text-xs text-[var(--text-soft)]">
                        Sonríe y baja la cabeza para desplazar
                      </p>
                    </div>
                  )}
                </>
              )}

              <div
                className="pointer-events-none absolute z-10 rounded-full"
                style={{
                  left: `${cursorUI.x * 100}%`,
                  top: `${cursorUI.y * 100}%`,
                  width: clicVisual ? "26px" : "20px",
                  height: clicVisual ? "26px" : "20px",
                  transform: "translate(-50%,-50%)",
                  background: clicVisual ? "var(--green)" : "var(--accent)",
                  boxShadow: "0 0 12px rgba(0,0,0,0.4)",
                  border: "2px solid white",
                }}
              />
            </div>

            <div className="mt-3 flex justify-center">
              <video ref={videoRef} autoPlay playsInline muted className="w-40 -scale-x-100 rounded-lg opacity-70" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {modo === "practica" ? (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-4 text-sm">
                <h4 className="font-semibold">Cómo probar</h4>
                <ul className="mt-2 space-y-2 text-[var(--text-soft)]">
                  <li>🧭 Mueve la cabeza para mover el cursor.</li>
                  <li>👄 Abre la boca para clic izquierdo.</li>
                  <li>🤨 Sube las cejas para clic derecho.</li>
                </ul>
                <p className="mt-3 text-xs text-[var(--text-soft)]">Si el cursor se descuadra, presiona “Centrar”.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-[var(--text-soft)]">
                    <Trophy className="h-4 w-4" /> Retos
                  </span>
                  <span className="text-2xl font-bold text-[var(--accent)]">{puntos}</span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-sm text-[var(--text-soft)]">
                    <Timer className="h-4 w-4" /> Tiempo
                  </span>
                  <span className="text-2xl font-bold">{tiempo}s</span>
                </div>

                {jugando && (
                  <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
                    <div className="flex items-center gap-2 font-semibold text-[var(--accent)]">
                      <IconoReto className="h-5 w-5" />
                      {INFO_RETO[retoUI].titulo}
                    </div>
                    <p className="mt-1 text-xs text-[var(--text-soft)]">{feedback}</p>
                  </div>
                )}

                {!jugando && (
                  <button
                    onClick={iniciarJuego}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 font-semibold text-white"
                  >
                    {puntos === 0 && tiempo === 30 ? (
                      "Empezar"
                    ) : (
                      <>
                        <RotateCcw className="h-4 w-4" /> Jugar otra vez
                      </>
                    )}
                  </button>
                )}

                {!jugando && tiempo === 0 && (
                  <p className="mt-3 text-center text-sm font-semibold text-[var(--green)]">
                    ¡Lograste {puntos} retos! 🏆
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
