"use client";

import { useState } from "react";

export default function ShareButton({ text, url }: { text: string; url?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareData = {
      title: "Parroquia Dei Verbum",
      text,
      url: url ?? window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${text}\n\n${shareData.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      className="text-primary hover:text-primary-container transition-colors relative"
      aria-label="Compartir"
    >
      <span className="material-symbols-outlined">{copied ? "check" : "share"}</span>
    </button>
  );
}
