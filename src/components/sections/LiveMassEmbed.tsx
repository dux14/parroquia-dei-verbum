"use client";

import { useSyncExternalStore } from "react";

// Misa en vivo: Lunes a Sábado 18:00–19:30, Domingo 12:00–13:30 (90 min),
// evaluado siempre en hora de Bogotá, no en la hora local del navegador.
function isWithinMassWindow(): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bogota",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const minutes = hour * 60 + minute;

  if (weekday === "Sun") {
    return minutes >= 12 * 60 && minutes < 13 * 60 + 30;
  }
  return minutes >= 18 * 60 && minutes < 19 * 60 + 30;
}

function subscribe(callback: () => void) {
  const id = setInterval(callback, 60_000);
  return () => clearInterval(id);
}

export default function LiveMassEmbed() {
  // Server snapshot siempre false; en cliente se evalúa la ventana y se
  // re-evalúa cada minuto para ocultarse solo al terminar la misa.
  const live = useSyncExternalStore(subscribe, isWithinMassWindow, () => false);

  if (!live) return null;

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
          src="https://www.youtube.com/embed/BDTFiat4pqM"
          title="Misa en vivo"
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
