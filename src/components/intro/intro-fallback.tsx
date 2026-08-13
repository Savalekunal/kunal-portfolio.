"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LuBug } from "react-icons/lu";
import type { IntroStepName } from "@/three/introTimeline";

const BROKEN_STEPS: IntroStepName[] = [
  "appBreak",
  "bugAppear",
  "spiderEnter",
  "spiderCatch",
  "spiderReturn",
  "text1",
  "text2",
  "text3",
  "text4",
  "cameraOut",
];

const BUG_VISIBLE_STEPS: IntroStepName[] = ["bugAppear", "spiderEnter"];
const BUG_CAUGHT_STEPS: IntroStepName[] = ["spiderCatch", "spiderReturn", "text1", "text2", "text3", "text4"];

export function IntroFallback({ stepName, caption }: { stepName: IntroStepName; caption: string | null }) {
  const broken = BROKEN_STEPS.includes(stepName);
  const bugVisible = BUG_VISIBLE_STEPS.includes(stepName);
  const bugCaught = BUG_CAUGHT_STEPS.includes(stepName);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 px-6">
      <motion.div
        animate={broken ? { x: [0, -4, 4, -3, 3, 0], transition: { duration: 0.4 } } : {}}
        className="relative w-full max-w-xs rounded-2xl border border-white/10 bg-[#0e1712] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      >
        <div className="mb-4 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f2b73f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3fdd8f]" />
        </div>
        <div className="mb-2 h-2.5 w-3/5 rounded bg-white/15" />
        <div className="mb-4 h-2.5 w-2/5 rounded bg-white/15" />
        <motion.div
          animate={{
            backgroundColor: broken ? "#3a1414" : "#c94a0a",
            color: broken ? "#ff8f8f" : "#fff3ea",
          }}
          className="inline-flex items-center rounded-lg px-4 py-2 font-display text-[13px]"
        >
          {broken ? "Run Test — Failed ✕" : "Run Test"}
        </motion.div>

        <AnimatePresence>
          {bugVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4, x: 40, y: -10 }}
              animate={{ opacity: 1, scale: 1, x: 60, y: -14 }}
              exit={{ opacity: 0 }}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#ff6b6b] text-[#2a0a0a] shadow-[0_0_16px_rgba(255,107,107,0.6)]"
            >
              <LuBug size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        animate={bugCaught ? { scale: [1, 1.15, 1] } : {}}
        className="flex h-16 w-16 items-center justify-center rounded-full border border-[#ff7a29]/40 bg-[#ff7a29]/10"
      >
        <span className="font-display text-2xl">🤖</span>
      </motion.div>

      <div className="h-9">
        <AnimatePresence mode="wait">
          {caption && (
            <motion.p
              key={caption}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="max-w-xs text-balance text-center font-display text-lg font-medium text-[#e8f3ec]"
            >
              {caption}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
