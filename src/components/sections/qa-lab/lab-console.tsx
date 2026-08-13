"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuMousePointerClick,
  LuNetwork,
  LuListChecks,
  LuGitBranch,
  LuBug,
  LuBrainCircuit,
  LuCheck,
  LuGitCommitHorizontal,
  LuHammer,
  LuFileText,
} from "react-icons/lu";

type ActionId = "ui" | "api" | "regression" | "cicd" | "bugs" | "ai";

const ACTIONS: { id: ActionId; label: string; icon: typeof LuMousePointerClick }[] = [
  { id: "ui", label: "Run UI Test", icon: LuMousePointerClick },
  { id: "api", label: "Run API Test", icon: LuNetwork },
  { id: "regression", label: "Run Regression", icon: LuListChecks },
  { id: "cicd", label: "Run CI/CD", icon: LuGitBranch },
  { id: "bugs", label: "Find Bugs", icon: LuBug },
  { id: "ai", label: "Run AI Test", icon: LuBrainCircuit },
];

function UiTestAnim() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="relative w-64 rounded-xl border border-line bg-bg p-4">
        <div className="mb-3 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-fail/60" />
          <span className="h-2 w-2 rounded-full bg-warn/60" />
          <span className="h-2 w-2 rounded-full bg-accent/60" />
        </div>
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 0.94, 1] }}
          transition={{ delay: 0.7, duration: 0.25 }}
          className="inline-flex rounded-lg bg-accent px-4 py-2 font-display text-[12px] text-accent-ink"
        >
          Submit
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.3, type: "spring" }}
          className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-pass text-pass-ink"
        >
          <LuCheck size={14} />
        </motion.div>
      </div>
      <span className="font-display text-[12px] text-pass">assert(button).isClickable() ✓</span>
    </div>
  );
}

function ApiTestAnim() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-6">
        <div className="rounded-lg border border-line bg-bg px-4 py-3 font-display text-[12px] text-ink">Client</div>
        <div className="relative h-px w-24 bg-line">
          <motion.span
            className="absolute -top-1.5 h-3 w-3 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]"
            animate={{ left: ["0%", "92%", "92%", "0%"] }}
            transition={{ duration: 1.6, times: [0, 0.45, 0.55, 1], ease: "easeInOut" }}
          />
        </div>
        <div className="rounded-lg border border-line bg-bg px-4 py-3 font-display text-[12px] text-ink">Server</div>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="rounded-full bg-pass-soft px-3 py-1 font-display text-[12px] text-pass"
      >
        GET /api/tests → 200 OK
      </motion.span>
    </div>
  );
}

function RegressionAnim() {
  const rows = ["Login flow", "Search filters", "Checkout API", "RBAC guard", "Audit log write"];
  return (
    <div className="flex h-full flex-col justify-center gap-2 px-6">
      {rows.map((r, i) => (
        <motion.div
          key={r}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.25 }}
          className="flex items-center gap-2.5 rounded-lg border border-line bg-bg px-3 py-2"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.25 + 0.1, type: "spring" }}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-pass text-pass-ink"
          >
            <LuCheck size={10} />
          </motion.span>
          <span className="font-display text-[12px] text-ink-muted">{r}</span>
        </motion.div>
      ))}
    </div>
  );
}

function NodeFlow({ stages }: { stages: { icon: typeof LuGitCommitHorizontal; label: string }[] }) {
  return (
    <div className="flex h-full items-center justify-center gap-2">
      {stages.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ borderColor: "var(--line)", color: "var(--ink-faint)" }}
              animate={{
                borderColor: ["var(--line)", "var(--pass)", "var(--pass)"],
                color: ["var(--ink-faint)", "var(--pass)", "var(--pass)"],
              }}
              transition={{ delay: i * 0.45, duration: 0.3 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 bg-bg"
            >
              <s.icon size={18} />
            </motion.div>
            <span className="font-display text-[10px] text-ink-faint">{s.label}</span>
          </div>
          {i < stages.length - 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: i * 0.45 + 0.2, duration: 0.25 }}
              style={{ originX: 0 }}
              className="mb-5 h-px w-8 bg-pass sm:w-12"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function BugsAnim() {
  const spots = [
    { top: "20%", left: "20%" },
    { top: "55%", left: "62%" },
    { top: "30%", left: "75%" },
  ];
  return (
    <div className="relative h-full w-full">
      {spots.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-fail-soft text-fail"
          style={pos}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ delay: 0.3 + i * 0.35, duration: 1.1, times: [0, 0.25, 0.7, 1] }}
        >
          <LuBug size={16} />
        </motion.div>
      ))}
      <div className="flex h-full items-center justify-center">
        <span className="font-display text-[12px] text-ink-muted">3 defects found → logged & triaged</span>
      </div>
    </div>
  );
}

const CICD_STAGES = [
  { icon: LuGitCommitHorizontal, label: "Git" },
  { icon: LuHammer, label: "Jenkins" },
  { icon: LuListChecks, label: "Tests" },
  { icon: LuFileText, label: "Report" },
];

const AI_STAGES = [
  { icon: LuMousePointerClick, label: "Query" },
  { icon: LuNetwork, label: "Retrieval" },
  { icon: LuBrainCircuit, label: "LLM" },
  { icon: LuCheck, label: "Response" },
];

const ANIMATIONS: Record<ActionId, () => React.ReactElement> = {
  ui: UiTestAnim,
  api: ApiTestAnim,
  regression: RegressionAnim,
  cicd: () => <NodeFlow stages={CICD_STAGES} />,
  bugs: BugsAnim,
  ai: () => <NodeFlow stages={AI_STAGES} />,
};

export function LabConsole() {
  const [active, setActive] = useState<ActionId | null>(null);
  const [runCount, setRunCount] = useState(0);

  const run = (id: ActionId) => {
    setActive(id);
    setRunCount((c) => c + 1);
  };

  const ActiveAnim = active ? ANIMATIONS[active] : null;

  return (
    <div>
      <p className="mb-6 max-w-2xl text-[14px] text-ink-muted">
        This is a small live test app — press an action and watch it run.
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {ACTIONS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => run(a.id)}
            aria-pressed={active === a.id}
            className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-3.5 font-display text-[11.5px] transition-colors cursor-pointer ${
              active === a.id
                ? "border-accent-line bg-accent-soft text-accent"
                : "border-line bg-bg-elevated text-ink-muted hover:border-accent-line hover:text-accent"
            }`}
          >
            <a.icon size={18} aria-hidden />
            {a.label}
          </button>
        ))}
      </div>

      <div className="relative mt-4 h-56 overflow-hidden rounded-xl border border-line bg-bg-elevated">
        <AnimatePresence mode="wait">
          {ActiveAnim ? (
            <motion.div
              key={`${active}-${runCount}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full"
            >
              <ActiveAnim />
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full items-center justify-center font-display text-[12.5px] text-ink-faint"
            >
              select an action above to run it
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
