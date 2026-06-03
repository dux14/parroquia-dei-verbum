"use client";

import { useEffect, useState } from "react";
import { buildEmbedUrl } from "@/lib/youtube";
import type { LiveStreamStatus } from "@/lib/youtube-live";

// El temporizador no excede 15 min: pestañas dormidas / ventanas lejanas se
// re-arman por tramos sin pedir red hasta que toca el nextCheck del servidor.
const MAX_TIMER_MS = 15 * 60 * 1000;

export default function LiveMassEmbed() {
  const [status, setStatus] = useState<LiveStreamStatus | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let nextCheckMs = 0;

    function arm() {
      const delay = Math.min(
        Math.max(nextCheckMs - Date.now(), 0),
        MAX_TIMER_MS
      );
      timer = setTimeout(onWake, delay);
    }

    async function load() {
      try {
        const res = await fetch("/api/live-status");
        if (!res.ok) throw new Error(String(res.status));
        const data: LiveStreamStatus = await res.json();
        if (cancelled) return;
        setStatus(data);
        nextCheckMs = new Date(data.nextCheck).getTime();
      } catch {
        // Red caída: reintentar en el próximo ciclo máximo.
        nextCheckMs = Date.now() + MAX_TIMER_MS;
      }
      if (!cancelled) arm();
    }

    function onWake() {
      if (cancelled) return;
      // El servidor manda el horario: si aún no toca, re-armar sin pedir red.
      if (Date.now() < nextCheckMs) {
        arm();
        return;
      }
      load();
    }

    load();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!status?.isLive || !status.videoId) return null;

  return (
    <section className="py-12 px-4 md:px-6 max-w-[1200px] mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-4">
          Misa en vivo
        </h2>
        <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-2xl mx-auto">
          Acompáñanos en la celebración de la Eucaristía de hoy.
        </p>
      </div>
      <div className="relative w-full overflow-hidden rounded-2xl soft-shadow aspect-video">
        <iframe
          src={buildEmbedUrl(status.videoId)}
          title="Misa en vivo"
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
