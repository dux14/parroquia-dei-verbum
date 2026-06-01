"use client";

import { useEffect, useState } from "react";

const SCALE = [1, 1.15, 1.3] as const;

/**
 * Control de tamaño de fuente de 3 niveles, persistido en localStorage.
 * Compartido por la página de Lecturas y la de Oraciones.
 */
export function useFontScale(storageKey: string) {
  const [tier, setTier] = useState(0);

  useEffect(() => {
    const saved = Number(localStorage.getItem(storageKey));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === 0 || saved === 1 || saved === 2) setTier(saved);
  }, [storageKey]);

  function changeTier(next: number) {
    setTier(next);
    localStorage.setItem(storageKey, String(next));
  }

  return { tier, changeTier, factor: SCALE[tier] };
}

export default function FontSizeControl({
  tier,
  onChange,
  label = "Tamaño",
}: {
  tier: number;
  onChange: (lvl: number) => void;
  label?: string;
}) {
  return (
    <div className="flex items-center justify-end gap-2">
      <span className="text-[13px] text-on-surface-variant mr-1">{label}</span>
      {[0, 1, 2].map((lvl) => (
        <button
          key={lvl}
          type="button"
          onClick={() => onChange(lvl)}
          aria-label={`${label} ${lvl + 1}`}
          aria-pressed={tier === lvl}
          className={`rounded-md border px-2 py-1 leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            tier === lvl
              ? "border-primary bg-primary text-on-primary"
              : "border-outline-variant text-on-surface-variant hover:border-primary"
          }`}
          style={{ fontSize: `${12 + lvl * 3}px` }}
        >
          A
        </button>
      ))}
    </div>
  );
}
