"use client";

import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";
import { Reveal } from "@/components/ui/reveal";
import { genAiDimensions } from "@/lib/data";

function FlowRow({ steps, tone }: { steps: string[]; tone: "muted" | "signal" }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2">
          <span
            className={`rounded-lg border px-3 py-1.5 font-display text-[12px] ${
              tone === "signal"
                ? "border-signal-line bg-signal-soft text-signal"
                : "border-line bg-bg text-ink-muted"
            }`}
          >
            {step}
          </span>
          {i < steps.length - 1 && <LuArrowRight size={13} className="text-ink-faint" aria-hidden />}
        </span>
      ))}
    </div>
  );
}

export function GenAiTesting() {
  return (
    <div>
      <p className="mb-8 max-w-2xl text-[14px] text-ink-muted">
        Traditional testing checks one function. AI testing has to validate an entire reasoning chain — and every
        link can fail differently.
      </p>

      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-xl border border-line bg-bg-elevated p-5">
            <span className="font-display text-[11px] uppercase tracking-wide text-ink-faint">
              Traditional testing
            </span>
            <div className="mt-3">
              <FlowRow steps={["Input", "Expected Output"]} tone="muted" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-xl border border-signal-line bg-bg-elevated p-5">
            <motion.div
              aria-hidden
              className="decorative-motion pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--signal-soft), transparent)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPositionX: ["0%", "200%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative font-display text-[11px] uppercase tracking-wide text-signal">
              AI / RAG testing
            </span>
            <div className="relative mt-3">
              <FlowRow steps={["Input", "Retrieval", "Context", "Model", "Response", "Validation"]} tone="signal" />
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.12}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {genAiDimensions.map((dim) => (
            <div
              key={dim.name}
              className="rounded-lg border border-line bg-bg-elevated p-4 transition-colors hover:border-signal-line"
            >
              <span className="font-display text-[12.5px] font-medium text-signal">{dim.name}</span>
              <p className="mt-1.5 text-[12.5px] leading-snug text-ink-muted">{dim.description}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
