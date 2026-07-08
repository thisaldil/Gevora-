"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send } from "lucide-react";
import { aiSearch } from "@/lib/api";
import { getPropertyById } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  text: string;
  propertyIds?: string[];
}

const suggestions = [
  "Modern house near Colombo under 80 million with a swimming pool",
  "Apartments for rent in Kandy",
  "Beach front land in Galle",
];

export function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Ask me in plain language — e.g. \"3 bedroom house in Nugegoda under 40 million\".",
    },
  ]);

  async function send(query: string) {
    if (!query.trim() || loading) return;
    setMessages((m) => [...m, { role: "user", text: query }]);
    setInput("");
    setLoading(true);
    const res = await aiSearch(query);
    setMessages((m) => [...m, { role: "assistant", text: res.summary, propertyIds: res.propertyIds }]);
    setLoading(false);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="mb-3 flex h-[26rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-mist bg-paper shadow-2xl sm:w-96"
          >
            <div className="flex items-center justify-between border-b border-mist bg-teal px-4 py-3 text-paper">
              <span className="flex items-center gap-2 font-display text-sm font-semibold">
                <Sparkles size={16} /> Gevora AI Search
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : ""}>
                  <p
                    className={
                      m.role === "user"
                        ? "inline-block max-w-[85%] rounded-2xl rounded-tr-sm bg-teal px-3 py-2 text-sm text-paper"
                        : "inline-block max-w-[85%] rounded-2xl rounded-tl-sm bg-sand px-3 py-2 text-sm text-ink"
                    }
                  >
                    {m.text}
                  </p>
                  {m.propertyIds && m.propertyIds.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {m.propertyIds.map((id) => {
                        const p = getPropertyById(id);
                        if (!p) return null;
                        return (
                          <Link
                            key={id}
                            href={`/property/${id}`}
                            className="block rounded-lg border border-mist bg-paper px-3 py-2 text-left text-xs hover:border-teal"
                          >
                            <span className="font-medium text-ink">{p.title}</span>
                            <span className="ml-2 font-mono text-teal">{formatPrice(p.price)}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              {loading && <p className="text-xs text-ink/40">Searching listings…</p>}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-mist px-2.5 py-1 text-left text-xs text-ink/70 hover:border-teal"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-mist p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe what you're looking for…"
                className="flex-1 rounded-lg border border-mist bg-sand px-3 py-2 text-sm focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal text-paper"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-spice text-paper shadow-xl transition-transform hover:scale-105"
        aria-label="Open AI search assistant"
      >
        <Sparkles size={22} />
      </button>
    </div>
  );
}
