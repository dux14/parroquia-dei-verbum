// src/components/readings/ReadingsView.tsx
"use client";

import { type CSSProperties } from "react";
import type { ReadingBlock } from "@/lib/reading-parser";
import FontSizeControl, { useFontScale } from "@/components/ui/FontSizeControl";

export interface ReadingSectionData {
  label: string;
  title: string;
  blocks: ReadingBlock[];
}

interface ReadingsViewProps {
  gospel: ReadingSectionData;
  first: ReadingSectionData;
  psalm: ReadingSectionData;
  second: ReadingSectionData | null;
}

function renderBlocks(blocks: ReadingBlock[]) {
  return blocks.map((block, i) => {
    switch (block.kind) {
      case "citation":
        if (block.isTitleDuplicate) return null;
        return (
          <h4 key={`${block.kind}-${i}`} className="font-headline text-primary font-semibold mt-2 mb-1">
            {block.text}
          </h4>
        );
      case "comment":
        return (
          <p key={`${block.kind}-${i}`} className="italic text-outline mb-3 whitespace-pre-line">
            {block.text}
          </p>
        );
      case "intro":
        return (
          <p key={`${block.kind}-${i}`} className="text-secondary font-semibold mb-3">
            {block.text}
          </p>
        );
      case "closing":
        return (
          <p key={`${block.kind}-${i}`} className="mt-3">
            <span className="bg-sky-pastel/50 text-primary font-semibold rounded px-2 py-0.5">
              {block.text}
            </span>
          </p>
        );
      case "alternate":
        return (
          <div
            key={`${block.kind}-${i}`}
            className="border-t border-outline-variant/40 mt-5 pt-3 mb-3 text-outline text-[0.85em] uppercase tracking-[0.08em]"
          >
            O bien
          </div>
        );
      case "psalmResponse":
        return (
          <p key={`${block.kind}-${i}`} className="text-primary mb-2 whitespace-pre-line">
            <span className="font-bold text-on-primary bg-primary rounded px-1.5 py-0.5 mr-1 text-[0.8em] align-middle">
              {block.marker}
            </span>
            {block.text}
          </p>
        );
      case "psalmVerse":
        return (
          <p key={`${block.kind}-${i}`} className="text-on-surface-variant mb-2 whitespace-pre-line">
            <span className="font-bold text-secondary mr-1">{block.marker}</span>
            {block.text}
            {block.repeatCue && <span className="font-bold text-primary ml-1">R.</span>}
          </p>
        );
      case "body":
      default:
        return (
          <p key={`${block.kind}-${i}`} className="text-on-surface-variant mb-3 whitespace-pre-line">
            {block.text}
          </p>
        );
    }
  });
}

function ReadingCard({ data, style }: { data: ReadingSectionData; style: CSSProperties }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 soft-shadow border-l-2 border-pew-oak flex flex-col">
      <div className="mb-4">
        <span className="text-altar-gold text-[14px] tracking-[0.05em] font-semibold uppercase block mb-1">
          {data.label}
        </span>
        <h3 className="font-headline text-[20px] leading-[28px] font-semibold text-primary">
          {data.title}
        </h3>
      </div>
      <div style={style}>{renderBlocks(data.blocks)}</div>
    </div>
  );
}

export default function ReadingsView({ gospel, first, psalm, second }: ReadingsViewProps) {
  const { tier, changeTier, factor } = useFontScale("dv-reading-size");

  const gospelStyle: CSSProperties = { fontSize: `${16 * factor}px`, lineHeight: 1.65 };
  const gridStyle: CSSProperties = { fontSize: `${15 * factor}px`, lineHeight: 1.6 };

  return (
    <>
      {/* Font-size control — only scales reading text */}
      <div className="mb-4">
        <FontSizeControl tier={tier} onChange={changeTier} />
      </div>

      {/* Featured Gospel */}
      <section className="mb-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-mist to-surface-container-low rounded-xl -z-10" />
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-8 md:p-12 soft-shadow relative overflow-hidden">
          <span aria-hidden="true" className="material-symbols-outlined absolute -top-10 -right-10 text-[200px] text-surface-container/30 rotate-12 pointer-events-none select-none">
            swords
          </span>
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-sky-pastel text-on-primary-fixed text-[14px] tracking-[0.05em] font-semibold px-3 py-1 rounded-full">
              {gospel.label}
            </span>
            <span className="text-on-surface-variant text-[14px] tracking-[0.05em] font-semibold uppercase">
              {gospel.title}
            </span>
          </div>
          <div className="max-w-none" style={gospelStyle}>
            {renderBlocks(gospel.blocks)}
          </div>
        </div>
      </section>

      {/* Readings Grid */}
      <section className={`grid grid-cols-1 ${second ? "md:grid-cols-3" : "md:grid-cols-2"} gap-6 mb-20`}>
        <ReadingCard data={first} style={gridStyle} />
        <ReadingCard data={psalm} style={gridStyle} />
        {second && <ReadingCard data={second} style={gridStyle} />}
      </section>
    </>
  );
}
