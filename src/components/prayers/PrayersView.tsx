"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import FontSizeControl, { useFontScale } from "@/components/ui/FontSizeControl";
import type { LocalizedPrayer } from "@/data/prayers";

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export default function PrayersView({ prayers }: { prayers: LocalizedPrayer[] }) {
  const t = useTranslations("Prayers");
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const { tier, changeTier, factor } = useFontScale("dv-prayer-size");

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return prayers;
    return prayers.filter(
      (p) => normalize(p.title).includes(q) || normalize(p.body).includes(q),
    );
  }, [prayers, query]);

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const bodyStyle: CSSProperties = { fontSize: `${16 * factor}px`, lineHeight: 1.75 };

  return (
    <>
      {/* Controls: search + font size, sticky below the fixed header */}
      <div className="sticky top-[104px] z-30 -mx-4 md:-mx-6 px-4 md:px-6 py-3 mb-8 bg-surface/90 backdrop-blur-md border-b border-outline-variant/20">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <span
              aria-hidden="true"
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
            >
              search
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              className="w-full rounded-full border border-outline-variant/50 bg-surface-container-lowest pl-11 pr-4 py-2.5 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <FontSizeControl tier={tier} onChange={changeTier} label={t("sizeLabel")} />
        </div>
      </div>

      {/* Prayer list */}
      {filtered.length === 0 ? (
        <p className="text-center text-on-surface-variant py-16">
          {t("noResults", { query: query.trim() })}
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((prayer) => {
            const open = openIds.has(prayer.id);
            return (
              <div
                key={prayer.id}
                className="bg-surface-container-lowest rounded-xl soft-shadow border-l-2 border-pew-oak overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(prayer.id)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer transition-colors hover:bg-surface-container-low/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <h2 className="font-headline text-[20px] leading-[28px] font-semibold text-primary">
                    {prayer.title}
                  </h2>
                  <span
                    aria-hidden="true"
                    className={`material-symbols-outlined text-primary transition-transform duration-200 motion-reduce:transition-none ${
                      open ? "rotate-180" : ""
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {open && (
                  <div
                    className="px-5 pb-5 text-on-surface-variant whitespace-pre-line"
                    style={bodyStyle}
                  >
                    {prayer.body}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
