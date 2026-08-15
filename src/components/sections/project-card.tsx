"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LuChevronDown, LuBriefcase, LuLayoutTemplate } from "react-icons/lu";
import type { ProjectDetail } from "@/lib/data";

export function ProjectCard({ project }: { project: ProjectDetail }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group overflow-hidden rounded-xl border border-line bg-bg-elevated transition-colors hover:border-accent-line">
      <div className="relative aspect-video w-full overflow-hidden bg-bg-sunken">
        {project.video ? (
          <video
            src={project.video}
            muted
            loop
            playsInline
            autoPlay
            className="h-full w-full object-cover"
          />
        ) : project.image ? (
          <Image src={project.image} alt={project.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--accent-soft), var(--signal-soft))" }}
          >
            <LuLayoutTemplate size={30} className="text-ink-faint" aria-hidden />
          </div>
        )}
        {project.badge && (
          <span className="absolute left-3 top-3 rounded-full border border-line bg-bg/85 px-2.5 py-1 font-display text-[11px] text-ink backdrop-blur-sm">
            {project.badge}
          </span>
        )}
      </div>

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
