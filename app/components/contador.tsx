"use client";

import { useEffect, useRef, useState } from "react";

export function Contador({
  valor,
  sufijo = "",
  duracion = 1500,
}: {
  valor: number;
  sufijo?: string;
  duracion?: number;
}) {
  const [actual, setActual] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const yaCorrio = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting && !yaCorrio.current) {
          yaCorrio.current = true;
          const inicio = performance.now();
          const animar = (t: number) => {
            const progreso = Math.min((t - inicio) / duracion, 1);
            const eased = 1 - Math.pow(1 - progreso, 3);
            setActual(Math.round(eased * valor));
            if (progreso < 1) requestAnimationFrame(animar);
          };
          requestAnimationFrame(animar);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [valor, duracion]);

  return (
    <span ref={ref}>
      {actual}
      {sufijo}
    </span>
  );
}
