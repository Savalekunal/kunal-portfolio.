"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";

export type AccordionItem = {
  id: string;
  eyebrow: string;
  title: string;
  content: ReactNode;
};

export function Accordion({ items, defaultOpenId }: { items: AccordionItem[]; defaultOpenId?: string }) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? items[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((it) => {
        const open = openId === it.id;
        return (
          <div key={it.id} id={it.id} className="scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-bg-elevated">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : it.id)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-3 px-6 py-5 text-left cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <span className="font-display text-lg font-semibold text-ink">{it.title}</span>
                <span className="hidden rounded bg-bg-sunken px-2 py-0.5 font-display text-[10.5px] text-ink-faint sm:inline">
                  {it.eyebrow}
                </span>
              </span>
              <motion.span animate={{ rotate: open ? 180 : 0 }} className="shrink-0 text-ink-faint">
                <LuChevronDown size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-line-soft px-6 pb-7 pt-6">{it.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
