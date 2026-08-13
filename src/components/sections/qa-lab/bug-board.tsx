"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuBug, LuChevronDown } from "react-icons/lu";
import { Reveal } from "@/components/ui/reveal";
import { bugBoard, type BugCard } from "@/lib/data";

const SEVERITY_STYLE: Record<BugCard["severity"], string> = {
  Critical: "text-fail bg-fail-soft",
  High: "text-warn bg-warn-soft",
  Medium: "text-signal bg-signal-soft",
};

function Card({ bug }: { bug: BugCard }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-line bg-bg-elevated">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 px-4 py-4 text-left cursor-pointer"
      >
        <LuBug size={18} className="mt-0.5 shrink-0 text-fail" aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-medium text-ink">{bug.title}</span>
          <span className="mt-1 block text-[12px] text-ink-faint">{bug.source}</span>
        </span>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 font-display text-[10.5px] ${SEVERITY_STYLE[bug.severity]}`}
        >
          {bug.severity}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="shrink-0 text-ink-faint mt-0.5">
          <LuChevronDown size={15} />
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
            <div className="border-t border-line-soft px-4 py-4">
              <p className="mb-3 text-[13.5px] text-ink-muted">{bug.description}</p>
              <dl className="grid grid-cols-2 gap-3 text-[12px] sm:grid-cols-4">
                <div>
                  <dt className="text-ink-faint">Severity</dt>
                  <dd className="mt-0.5 font-medium text-ink">{bug.severity}</dd>
                </div>
                <div>
                  <dt className="text-ink-faint">Area</dt>
                  <dd className="mt-0.5 font-medium text-ink">{bug.area}</dd>
                </div>
                <div>
                  <dt className="text-ink-faint">Testing type</dt>
                  <dd className="mt-0.5 font-medium text-ink">{bug.testingType}</dd>
                </div>
                <div>
                  <dt className="text-ink-faint">Status</dt>
                  <dd className="mt-0.5 font-medium text-accent">{bug.status}</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BugBoard() {
  return (
    <div>
      <p className="mb-6 max-w-2xl text-[14px] text-ink-muted">
        A sample of real defects surfaced while testing GAIA, Cohesity&apos;s enterprise GenAI platform. Click a card
        for detail.
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {bugBoard.map((bug) => (
          <Reveal key={bug.id}>
            <Card bug={bug} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
