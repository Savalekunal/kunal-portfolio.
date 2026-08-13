"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LuChevronRight } from "react-icons/lu";

export function IntroOverlay({
  caption,
  progress,
  onSkip,
}: {
  caption: string | null;
  progress: number;
  onSkip: () => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-[18vh] sm:pb-[20vh]">
      <AnimatePresence mode="wait">
        {caption && (
          <motion.p
            key={caption}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mx-6 max-w-lg text-balance text-center font-display text-2xl font-medium text-[#e8f3ec] sm:text-3xl"
          >
            {caption}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="pointer-events-auto absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4 sm:bottom-8">
        <div className="h-1 w-28 overflow-hidden rounded-full bg-white/10 sm:w-40">
          <motion.div
            className="h-full rounded-full bg-[#ff7a29]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <button
          type="button"
          onClick={onSkip}
          className="flex items-center gap-1 rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 font-display text-[12px] text-[#c7d8ce] backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white cursor-pointer"
        >
          Skip intro
          <LuChevronRight size={13} aria-hidden />
        </button>
      </div>
    </div>
  );
}
