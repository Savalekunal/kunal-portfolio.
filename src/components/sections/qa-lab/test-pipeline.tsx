"use client";

import { motion } from "framer-motion";
import {
  LuFileText,
  LuTestTubeDiagonal,
  LuNetwork,
  LuFlaskConical,
  LuGitBranch,
  LuWorkflow,
  LuClipboardList,
  LuBug,
  LuRocket,
} from "react-icons/lu";
import { Reveal } from "@/components/ui/reveal";
import { StatusBadge } from "@/components/ui/status-badge";
import { testPipelineStages } from "@/lib/data";

const ICONS = [
  LuFileText,
  LuTestTubeDiagonal,
  LuNetwork,
  LuFlaskConical,
  LuGitBranch,
  LuWorkflow,
  LuClipboardList,
  LuBug,
  LuRocket,
];

export function TestPipeline() {
  return (
    <div>
      <p className="mb-6 max-w-2xl text-[14px] text-ink-muted">
        A single test case travels through the same pipeline every time — automated, versioned, and reported before
        anything reaches release.
      </p>

      <div className="relative overflow-x-auto pb-4">
        <div className="relative flex min-w-[860px] items-start gap-0 px-2 pt-6">
          {/* connecting line */}
          <div className="absolute left-8 right-8 top-[38px] h-px bg-line" aria-hidden />
          <motion.div
            className="decorative-motion absolute top-[36px] h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]"
            style={{ left: "2rem" }}
            animate={{ left: ["2rem", "calc(100% - 2rem)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />

          {testPipelineStages.map((stage, i) => {
            const Icon = ICONS[i] ?? LuFileText;
            return (
              <Reveal key={stage.label} delay={i * 0.05} className="relative z-10 flex flex-1 flex-col items-center px-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-bg-elevated text-accent shadow-[0_6px_18px_var(--shadow)]">
                  <Icon size={22} aria-hidden />
                </div>
                <span className="mt-3 font-display text-[12px] font-medium text-ink">{stage.label}</span>
                <span className="mt-1 max-w-[110px] text-[11px] leading-snug text-ink-faint">{stage.detail}</span>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-wrap items-center gap-4 rounded-lg border border-line bg-bg-elevated px-4 py-3">
          <span className="font-display text-[11px] uppercase tracking-wide text-ink-faint">Reading the pipeline:</span>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-[12.5px] text-ink-muted">
              <StatusBadge status="passed" /> suite is green, safe to release
            </div>
            <div className="flex items-center gap-2 text-[12.5px] text-ink-muted">
              <StatusBadge status="failed" /> defect logged, release held
            </div>
            <div className="flex items-center gap-2 text-[12.5px] text-ink-muted">
              <StatusBadge status="blocked" /> environment or dependency issue
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
