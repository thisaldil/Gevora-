"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

/**
 * Put HD photos in /public/images/residences/<slug>.jpg  (min 2400x1400, landscape).
 * Use official press/media-kit photos from each developer, or your own licensed shots.
 */
const RESIDENCES = [
  {
    slug: "altair",
    name: "Altair Residencies",
    area: "Colombo 2",
    blurb:
      "An iconic high-rise with distinctive architecture, city views and premium residential facilities. A strong choice for luxury living.",
    bestFor: "Prestige and skyline views",
    href: "https://www.akaraapartments.lk/top-luxury-apartments-in-colombo-what-should-you-choose/",
    image: "/images/residences/altair.jpg",
  },
  {
    slug: "cinnamon-life",
    name: "The Residences at Cinnamon Life",
    area: "Colombo 2",
    blurb:
      "Premium residences inside a major integrated development with hotel, shopping and entertainment facilities.",
    bestFor: "Luxury and city-centre convenience",
    href: "https://www.cinnamonlife.com/",
    image: "/images/residences/cinnamon-life.jpg",
  },
  {
    slug: "capitol-twinpeaks",
    name: "Capitol TwinPeaks",
    area: "Union Place, Colombo 2",
    blurb:
      "Twin residential towers in a central location, suited to professionals who want easy access to Colombo's business district.",
    bestFor: "Urban living and investment",
    href: "https://www.akaraapartments.lk/top-luxury-apartments-in-colombo-what-should-you-choose/",
    image: "/images/residences/capitol-twinpeaks.jpg",
  },
  {
    slug: "tri-zen",
    name: "Tri-Zen",
    area: "Union Place, Colombo 2",
    blurb:
      "A modern apartment development with a central address and contemporary urban facilities.",
    bestFor: "City-centre living",
    href: "https://www.trizen.lk/",
    image: "/images/residences/tri-zen.jpg",
  },
  {
    slug: "colombo-city-centre",
    name: "Colombo City Centre Residences",
    area: "Colombo 2",
    blurb:
      "Apartments integrated with a shopping and lifestyle destination, putting dining, shopping and entertainment downstairs.",
    bestFor: "Convenience and an active city lifestyle",
    href: "https://www.colombocitycentre.lk/",
    image: "/images/residences/colombo-city-centre.jpg",
  },
  {
    slug: "havelock-city",
    name: "Havelock City",
    area: "Havelock Road, Colombo 5",
    blurb:
      "A large residential community with landscaped spaces, recreational facilities and access to a shopping complex.",
    bestFor: "Families and long-term residence",
    href: "https://www.havelockcity.lk/",
    image: "/images/residences/havelock-city.jpg",
  },
  {
    slug: "astoria",
    name: "Astoria Colombo",
    area: "Colombo 3",
    blurb:
      "A residential option in a well-connected part of Colombo, close to shopping, restaurants and the coast.",
    bestFor: "Central location and residential convenience",
    href: "https://www.akaraapartments.lk/top-luxury-apartments-in-colombo-what-should-you-choose/",
    image: "/images/residences/astoria.jpg",
  },
] as const;

type Residence = (typeof RESIDENCES)[number];

const EASE = [0.22, 1, 0.36, 1] as const;
const N = RESIDENCES.length;
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2400&auto=format&fit=crop";

/* ------------------------------------------------------------------ */
/* Shared photo (hides itself if the file is missing)                  */
/* ------------------------------------------------------------------ */
function Photo({
  r,
  priority,
  sizes,
  className = "",
}: {
  r: Residence;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  const [src, setSrc] = useState<string>(r.image);

  return (
    <Image
      src={src}
      alt={`${r.name}, ${r.area}`}
      fill
      priority={priority}
      sizes={sizes}
      quality={90}
      onError={() => {
        if (src !== FALLBACK_IMAGE) {
          setSrc(FALLBACK_IMAGE);
        }
      }}
      className={`object-cover ${className}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: sticky stage, mouse-wheel scroll drives the active slide   */
/* ------------------------------------------------------------------ */
function DesktopStage() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N))));
  });

  const jumpTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + i * window.innerHeight + 2, behavior: "smooth" });
  };


const scrollToNextSection = () => {
  const heroSection = trackRef.current?.closest("section");

  if (!heroSection) return;

  const categoryGrid = heroSection.nextElementSibling;

  if (categoryGrid) {
    categoryGrid.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};


  const r = RESIDENCES[active];

  return (
    <div
      ref={trackRef}
      className="relative hidden md:block"
      style={{ height: `${N * 100}dvh` }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden bg-teal">
        {/* Photos, cross-faded */}
        {RESIDENCES.map((res, i) => (
          <motion.div
            key={res.slug}
            aria-hidden={i !== active}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: i === active ? 1 : 0,
              scale: reduce ? 1 : i === active ? 1.04 : 1,
            }}
            transition={{
              opacity: { duration: 0.8, ease: EASE },
              scale: { duration: 6, ease: "linear" },
            }}
          >
            <Photo r={res} priority={i === 0} sizes="100vw" />
          </motion.div>
        ))}

        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Copy */}
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={r.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="max-w-xl"
            >
              <p className="font-mono text-sm text-paper/70">
                {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                <span className="mx-3 text-paper/30">|</span>
                {r.area}
              </p>
              <h2 className="mt-4 font-display text-5xl font-medium leading-[1.05] text-paper lg:text-6xl">
                {r.name}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-paper/85">{r.blurb}</p>
              <p className="mt-5 text-sm text-paper/70">
                Best for: <span className="text-spice-light">{r.bestFor}</span>
              </p>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-11 items-center rounded-full bg-paper px-6 py-3 text-sm font-medium text-teal transition hover:bg-spice-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
              >
                Explore {r.name}
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress rail */}
        <nav
          aria-label="Residences"
          className="absolute right-8 top-1/2 flex -translate-y-1/2 flex-col items-end gap-3"
        >
          {RESIDENCES.map((res, i) => (
            <button
              key={res.slug}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Go to ${res.name}`}
              aria-current={i === active}
              className="group flex min-h-11 items-center gap-3 focus-visible:outline-2 focus-visible:outline-paper"
            >
              <span
                className={`text-xs text-paper transition-opacity ${
                  i === active ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                }`}
              >
                {res.name}
              </span>
              <span
                className={`block h-0.5 rounded-full bg-paper transition-all duration-300 ${
                  i === active ? "w-10 opacity-100" : "w-5 opacity-40 group-hover:opacity-70"
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Scroll to next section */}
<motion.button
  type="button"
  onClick={scrollToNextSection}
  aria-label="Scroll to next section"
  initial={{ opacity: 0, y: -6 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.2 }}
  whileHover={{ y: 4, scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="absolute bottom-7 left-1/2 z-20 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white hover:text-teal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23"
    height="23"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
</motion.button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: horizontal finger-swipe carousel with snap                  */
/* ------------------------------------------------------------------ */
function MobileCarousel() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || !el.children.length) return;
    const first = el.children[0] as HTMLElement;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = first.offsetWidth + gap;
    setActive(Math.min(N - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  }, []);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[i] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div className="bg-paper py-12 md:hidden">
      <div className="px-4">
        <h2 className="font-display text-3xl font-medium leading-tight text-teal">
          Top 7 Colombo residences
        </h2>
        <p className="mt-2 text-sm text-teal/70">Swipe to browse</p>
      </div>

      <ul
        ref={scrollerRef}
        onScroll={onScroll}
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollPaddingInline: "1rem", WebkitOverflowScrolling: "touch" }}
        aria-label="Top residences carousel"
      >
        {RESIDENCES.map((r, i) => (
          <li
            key={r.slug}
            className="relative aspect-[4/5] w-[84%] shrink-0 snap-center overflow-hidden rounded-2xl bg-teal"
          >
            <Photo r={r} priority={i === 0} sizes="84vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-mono text-xs text-paper/70">
                {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")} · {r.area}
              </p>
              <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-paper">
                {r.name}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-paper/85">{r.blurb}</p>
              <p className="mt-2 text-xs text-spice-light">Best for: {r.bestFor}</p>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center rounded-full bg-paper px-5 text-sm font-medium text-teal"
              >
                Explore
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex justify-center" role="tablist" aria-label="Carousel position">
        {RESIDENCES.map((r, i) => (
          <button
            key={r.slug}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show ${r.name}`}
            onClick={() => goTo(i)}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span
              className={`block h-2 rounded-full bg-teal transition-all duration-300 ${
                i === active ? "w-6 opacity-100" : "w-2 opacity-25"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function FeaturedResidences() {
  return (
    <section aria-labelledby="featured-residences-heading">
      <h2 id="featured-residences-heading" className="sr-only">
        Top 7 Colombo residences
      </h2>
      <DesktopStage />
      <MobileCarousel />
    </section>
  );
}

export const Hero = FeaturedResidences;