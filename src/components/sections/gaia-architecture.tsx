"use client";

import { motion } from "framer-motion";
import {
  LuUser,
  LuWaypoints,
  LuRadar,
  LuBrainCircuit,
  LuBrain,
  LuMessageSquare,
  LuShieldCheck,
} from "react-icons/lu";
import { gaiaArchitecture } from "@/lib/data";

const NODE_ICONS = [LuUser, LuWaypoints, LuRadar, LuBrainCircuit, LuBrain, LuMessageSquare, LuShieldCheck];

export function GaiaArchitecture() {
  return (
    <div className="rounded-2xl border border-signal-line bg-bg-inset p-5 sm:p-7">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-display text-[11px] uppercase tracking-wide text-ink-on-inset/60">
          System architecture — request lifecycle
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-signal-soft px-2.5 py-1 font-display text-[10.5px] text-signal">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" /> live query flow
        </span>
      </div>

      <div className="relative overflow-x-auto pb-2">
        <div className="relative flex min-w-[760px] items-center justify-between gap-1 px-2">
          <div className="absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-white/10" aria-hidden />
          <motion.div
            className="decorative-motion absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_12px_var(--signal)]"
            style={{ left: "1.5rem" }}
            animate={{ left: ["1.5rem", "calc(100% - 1.5rem)"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />
          {gaiaArchitecture.flow.map((stepName, i) => {
            const Icon = NODE_ICONS[i] ?? LuBrain;
            return (
              <div key={stepName} className="relative z-10 flex flex-col items-center gap-2 px-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-bg-inset text-signal shadow-[0_0_0_4px_rgba(0,0,0,0.15)]">
                  <Icon size={18} aria-hidden />
                </div>
                <span className="w-20 text-center font-display text-[10.5px] leading-tight text-ink-on-inset/85">
                  {stepName}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-5">
        <span className="mb-3 block font-display text-[11px] uppercase tracking-wide text-ink-on-inset/60">
          Tested at every layer
        </span>
        <div className="flex flex-wrap gap-2">
          {gaiaArchitecture.testingLayers.map((layer) => (
            <span
              key={layer}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-display text-[11px] text-ink-on-inset"
            >
              {layer}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
