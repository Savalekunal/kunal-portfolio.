"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuChevronDown, LuBriefcase } from "react-icons/lu";
import type { ProjectDetail } from "@/lib/data";

export function ProjectCard({ project }: { project: ProjectDetail }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-line bg-bg-elevated">
      <div className="p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-display text-[16px] font-semibold text-ink">{project.name}</h3>
          <span className="flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-display text-[11px] text-ink-muted">
            <LuBriefcase size={11} aria-hidden />
            {project.org}
          </span>
        </div>
        <p className="mb-1 text-[12.5px] text-ink-faint">
          {project.domain} · {project.role}
        </p>

        <div className="mt-4 rounded-lg border border-accent-line bg-accent-soft px-3.5 py-2.5 text-[13px] text-accent">
          {project.keyResult}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.testing.map((t) => (
            <span key={t} className="rounded-full bg-bg-sunken px-2.5 py-0.5 font-display text-[11px] text-ink-muted">
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-4 flex items-center gap-1.5 font-display text-[12.5px] font-medium text-accent cursor-pointer"
        >
          {open ? "Show less" : "Expand details"}
          <motion.span animate={{ rotate: open ? 180 : 0 }}>
            <LuChevronDown size={14} />
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="border-t border-line-soft px-5 pb-6 pt-4 sm:px-6">
              <ul className="mb-4 space-y-2">
                {project.bullets.map((b, i) => (
                  <li key={i} className="text-[13.5px] leading-relaxed text-ink-muted">
                    <span className="mr-2 text-accent">▸</span>
                    {b}
                  </li>
                ))}
              </ul>
              <span className="mb-2 block font-display text-[11px] uppercase tracking-wide text-ink-faint">
                Technologies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-full border border-line px-2.5 py-0.5 font-display text-[11px] text-ink-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
