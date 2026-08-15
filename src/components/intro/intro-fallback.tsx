"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LuBug, LuCheck } from "react-icons/lu";
import type { IntroStepName } from "@/three/introTimeline";

const BROKEN_STEPS: IntroStepName[] = ["appBreak", "bugAppear", "spiderEnter", "spiderCatch"];
const BUG_VISIBLE_STEPS: IntroStepName[] = ["bugAppear", "spiderEnter"];
const BUG_CAUGHT_STEPS: IntroStepName[] = ["spiderCatch"];
const PASSED_STEPS: IntroStepName[] = ["spiderReturn", "text1", "text2", "text3", "text4", "cameraOut"];

export function IntroFallback({ stepName, caption }: { stepName: IntroStepName; caption: string | null }) {
  const broken = BROKEN_STEPS.includes(stepName);
  const bugVisible = BUG_VISIBLE_STEPS.includes(stepName);
  const bugCaught = BUG_CAUGHT_STEPS.includes(stepName);
  const passed = PASSED_STEPS.includes(stepName);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-10 px-6">
      <motion.div
        animate={broken ? { x: [0, -4, 4, -3, 3, 0], transition: { duration: 0.4 } } : {}}
        className="relative w-full max-w-xs rounded-2xl border border-white/10 bg-[#0e0e12] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
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
            backgroundColor: broken ? "#3a1414" : passed ? "#0f3a24" : "#1a1a22",
            color: broken ? "#ff8f8f" : passed ? "#3fdd8f" : "#9a9aa4",
          }}
          className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 font-display text-[13px]"
        >
          {broken ? (
            <>Run Test — Failed ✕</>
          ) : passed ? (
            <>
              <LuCheck size={14} aria-hidden />
              Run Test — Passed
            </>
          ) : (
            <>Run Test</>
          )}
        </motion.div>

        <AnimatePresence>
          {bugVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4, x: 40, y: -10 }}
              animate={{ opacity: 1, scale: 1, x: 60, y: -14 }}
              exit={{ opacity: 0, scale: 0.3, x: 90, y: 40, transition: { duration: 0.3, ease: "easeIn" } }}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#ff6b6b] text-[#2a0a0a] shadow-[0_0_16px_rgba(255,107,107,0.6)]"
            >
              <LuBug size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        animate={bugCaught ? { scale: [1, 1.25, 1], rotate: [0, -8, 8, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="flex h-16 w-16 items-center justify-center rounded-full border transition-colors"
        style={{
          borderColor: passed ? "rgba(63, 221, 143, 0.4)" : "rgba(91, 140, 255, 0.4)",
          backgroundColor: passed ? "rgba(63, 221, 143, 0.1)" : "rgba(91, 140, 255, 0.1)",
        }}
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
              className="max-w-xs text-balance text-center font-display text-lg font-medium text-[#f5f5f7]"
            >
              {caption}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
