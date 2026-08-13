"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuPlus } from "react-icons/lu";
import { Reveal } from "@/components/ui/reveal";
import { testingProcess } from "@/lib/data";

export function TestingProcess() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <p className="mb-6 max-w-2xl text-[14px] text-ink-muted">My testing approach, start to finish. Tap a step to expand it.</p>
      <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {testingProcess.map((step, i) => {
          const open = openIndex === i;
          return (
            <Reveal key={step.step} delay={i * 0.03}>
              <li className="h-full rounded-xl border border-line bg-bg-elevated">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left cursor-pointer"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-[11px] text-accent">
                    {i + 1}
                  </span>
                  <span className="flex-1 font-display text-[13px] font-medium text-ink">{step.step}</span>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    className="shrink-0 text-ink-faint"
                  >
                    <LuPlus size={14} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-line-soft px-4 py-3.5 text-[13px] leading-relaxed text-ink-muted">
                        {step.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
