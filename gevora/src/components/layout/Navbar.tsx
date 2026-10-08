"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Scale, Moon, Sun, Home } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useUserStore } from "@/store/useUserStore";
import { Button, LinkButton } from "@/components/ui/Button";

const primaryLinks = [
  { href: "/buy", label: "Buy" },
  { href: "/rent", label: "Rent" },
  { href: "/land", label: "Land" },
  { href: "/commercial", label: "Commercial" },
  { href: "/projects", label: "Projects" },
  { href: "/agents", label: "Agents" },
  { href: "/insights", label: "Market insights" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const savedCount = useUserStore((s) => s.savedIds.length);
  const compareCount = useUserStore((s) => s.compareIds.length);

  return (
    <header className="sticky top-0 z-50 border-b border-mist bg-sand/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-paper">
            <Home size={18} strokeWidth={2.25} />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-ink">Gevora</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-ink/70 hover:bg-ink/5 sm:flex"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <Link
            href="/compare"
            aria-label="Compare properties"
            className="relative hidden h-9 w-9 items-center justify-center rounded-lg text-ink/70 hover:bg-ink/5 sm:flex"
          >
            <Scale size={18} />
            {compareCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-spice text-[10px] font-bold text-paper">
                {compareCount}
              </span>
            )}
          </Link>
          <Link
            href="/dashboard/saved"
            aria-label="Saved properties"
            className="relative hidden h-9 w-9 items-center justify-center rounded-lg text-ink/70 hover:bg-ink/5 sm:flex"
          >
            <Heart size={18} />
            {savedCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-lotus text-[10px] font-bold text-paper">
                {savedCount}
              </span>
            )}
          </Link>
          <LinkButton href="/login" variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </LinkButton>
          <LinkButton href="/sell" variant="primary" size="sm" className="hidden sm:inline-flex">
            List your property
          </LinkButton>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-mist bg-sand lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink/85 hover:bg-ink/5"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2 border-t border-mist pt-3">
                <LinkButton href="/login" variant="outline" size="sm" className="flex-1">
                  Sign in
                </LinkButton>
                <LinkButton href="/sell" variant="primary" size="sm" className="flex-1">
                  List property
                </LinkButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
