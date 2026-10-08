"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SearchBar } from "@/components/search/SearchBar";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-teal">
      <div className="louvre-lines-light absolute inset-0" aria-hidden />
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1706174146606-aaab2da26107?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          fill
          priority
          className="object-cover opacity-75 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal via-teal/70 to-teal/40" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-7xl flex-col items-start px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:px-8"
      >
        <motion.span variants={item} className="rounded-full border border-paper/25 px-3 py-1 font-mono text-xs uppercase tracking-widest text-paper/80">
          Sri Lanka&rsquo;s property index
        </motion.span>
        <motion.h1
          variants={item}
          className="mt-5 max-w-2xl font-display text-4xl font-medium leading-[1.08] text-paper sm:text-5xl lg:text-6xl"
        >
          Find your next home,{" "}
          <span className="italic text-spice-light">island-wide.</span>
        </motion.h1>
        <motion.p variants={item} className="mt-4 max-w-lg text-base text-paper/80 sm:text-lg">
          Verified listings, real suburb price data, and licensed agents — from Colombo apartments to Galle
          beachfront land.
        </motion.p>

        <motion.div variants={item} className="mt-8 w-full max-w-3xl">
          <SearchBar />
        </motion.div>

        <motion.div variants={item} className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-paper/75">
          <span><strong className="font-mono text-paper">4,200+</strong> active listings</span>
          <span><strong className="font-mono text-paper">380</strong> licensed agents</span>
          <span><strong className="font-mono text-paper">25</strong> districts covered</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
