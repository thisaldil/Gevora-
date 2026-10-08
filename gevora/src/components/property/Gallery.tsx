"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  function go(dir: 1 | -1) {
    setActive((a) => (a + dir + images.length) % images.length);
  }

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-mist bg-mist/30 sm:aspect-[16/9]">
        <Image src={images[active]} alt={`${title} photo ${active + 1}`} fill className="object-cover" priority />
        <button
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 text-ink"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/85 text-ink"
        >
          <ChevronRight size={18} />
        </button>
        <button
          onClick={() => setLightbox(true)}
          aria-label="View full screen"
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-paper/85 px-3 py-1.5 text-xs font-medium text-ink"
        >
          <Expand size={14} /> {active + 1} / {images.length}
        </button>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
              i === active ? "border-teal" : "border-transparent"
            }`}
          >
            <Image src={src} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4"
          onClick={() => setLightbox(false)}
        >
          <div className="relative h-full max-h-[80vh] w-full max-w-4xl">
            <Image src={images[active]} alt="" fill className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
