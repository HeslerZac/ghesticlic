"use client";

import { useRef, useState, useEffect } from "react";
import { Camera, Loader2, Lock } from "lucide-react";

const GESTOS: Record<string, [string, string[], number]> = {
  boca: ["Boca abierta (clic izq)", ["jawOpen"], 0.25],
  cejas: ["Cejas arriba (clic der)", ["browInnerUp"], 0.45],
  sonrisa: ["Sonrisa (scroll)", ["mouthSmileLeft", "mouthSmileRight"], 0.6],
  labios: ["Labios fruncidos (dictado)", ["mouthPucker"], 0.7],
  ojoIzq: ["Guiño izquierdo", ["eyeBlinkLeft"], 0.45],
  ojoDer: ["Guiño derecho", ["eyeBlinkRight"], 0.45],
};

type Estado = "inicial" | "cargando" | "activo" | "error";

export function DemoCamara() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const landmarkerRef = useRef<unknown>(null);
  const rafRef = useRef<number | null>(null);
  const [estado, setEstado] = useState<Estado>("inicial");
  const [error, setError] = useState("");
  const [valores, setValores] = useState<Record<string, number>>({});

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const v = videoRef.current;
      if (v && v.srcObject) {
        (v.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

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

  function valorGesto(mapa: Record<string, number>, blend: string[]) {
    let suma = 0;
    for (const b of blend) suma += mapa[b] || 0;
    return suma / blend.length;
  }

  let ultimoTs = -1;
  function bucle() {
    const video = videoRef.current;
    const landmarker = landmarkerRef.current as {
      detectForVideo: (v: HTMLVideoElement, t: number) => {
        faceBlendshapes?: { categories: { categoryName: string; score: number }[] }[];
      };
    } | null;
    if (!video || !landmarker) return;

    if (video.currentTime !== ultimoTs) {
      ultimoTs = video.currentTime;
      const res = landmarker.detectForVideo(video, performance.now());
      const mapa: Record<string, number> = {};
      if (res.faceBlendshapes && res.faceBlendshapes.length > 0) {
        for (const c of res.faceBlendshapes[0].categories) {
          mapa[c.categoryName] = c.score;
        }
      }
      const nuevos: Record<string, number> = {};
      for (const [clave, [, blend]] of Object.entries(GESTOS)) {
        nuevos[clave] = valorGesto(mapa, blend);
      }
      setValores(nuevos);
    }
    rafRef.current = requestAnimationFrame(bucle);
  }

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
      {estado === "inicial" && (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="inline-flex rounded-2xl bg-[var(--accent)]/10 p-4">
            <Camera className="h-10 w-10 text-[var(--accent)]" />
          </div>
          <h3 className="mt-4 text-2xl font-bold">Pruébalo tú mismo</h3>
          <p className="mt-2 max-w-md text-[var(--text-soft)]">
            Activa tu cámara y mira cómo se detectan tus gestos en tiempo real.
            Todo corre en tu navegador.
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
          <p className="mt-4 text-[var(--text-soft)]">
            Cargando modelo de IA… (la primera vez tarda unos segundos)
          </p>
        </div>
      )}

      {estado === "error" && (
        <div className="flex flex-col items-center py-12 text-center">
          <p className="font-semibold text-red-500">No se pudo iniciar la demo</p>
          <p className="mt-2 max-w-md text-sm text-[var(--text-soft)]">{error}</p>
          <p className="mt-3 max-w-md text-xs text-[var(--text-soft)]">
            Revisa que diste permiso de cámara y que estás en una página segura
            (https o localhost).
          </p>
          <button
            onClick={iniciar}
            className="mt-5 rounded-xl border border-[var(--border)] px-5 py-2.5 font-semibold hover:border-[var(--accent)]"
          >
            Reintentar
          </button>
        </div>
      )}

      <div
        className={
          estado === "activo"
            ? "grid gap-6 md:grid-cols-2"
            : "pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        }
      >
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full -scale-x-100"
          />
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Tus gestos en vivo</h3>
          <div className="space-y-3">
            {Object.entries(GESTOS).map(([clave, [nombre, , umbral]]) => {
              const val = valores[clave] || 0;
              const activo = val >= umbral;
              return (
                <div key={clave}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">
                      {nombre}
                      {activo && (
                        <span className="ml-2 text-xs font-bold text-[var(--green)]">
                          ✓ ACTIVO
                        </span>
                      )}
                    </span>
                    <span className="tabular-nums text-[var(--text-soft)]">
                      {val.toFixed(2)}
                    </span>
                  </div>
                  <div className="relative mt-1 h-3 overflow-hidden rounded-full bg-[var(--bg-soft)]">
                    <div
                      className="h-full rounded-full transition-all duration-75"
                      style={{
                        width: `${Math.min(val * 100, 100)}%`,
                        background: activo ? "var(--green)" : "var(--accent)",
                      }}
                    />
                    <div
                      className="absolute top-[-2px] h-[16px] w-0.5 bg-[var(--text)] opacity-40"
                      style={{ left: `${umbral * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-[var(--text-soft)]">
            La línea marca el umbral de cada gesto. Al cruzarlo, se activaría en
            la aplicación real.
          </p>
        </div>
      </div>
    </div>
  );
}
