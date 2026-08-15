"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntroTimeline } from "@/three/useIntroTimeline";
import { IntroFallback } from "./intro-fallback";

const SESSION_KEY = "kunal-portfolio-intro-seen";

export function Intro({ onComplete }: { onComplete: () => void }) {
  const [shouldPlay, setShouldPlay] = useState<boolean | null>(null);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    // ?intro=1 always (re)plays it — handy if you want to rewatch it.
    // This intro deliberately plays regardless of prefers-reduced-motion: it's a short,
    // central showcase piece the site is built around, and a manual "Skip intro" control
    // is always on screen for anyone who wants out immediately.
    const forcePlay = new URLSearchParams(window.location.search).get("intro") === "1";
    // sessionStorage/URL params don't exist during SSR, so this can only be resolved
    // here, once, on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShouldPlay(forcePlay || !alreadySeen);
  }, []);

  const timeline = useIntroTimeline(shouldPlay === true);

  // If we're not going to play the intro at all (reduced motion, or already seen this
  // session), the site behind it must still be revealed — otherwise the cover div in
  // PageShell stays up forever.
  useEffect(() => {
    if (shouldPlay === false) {
      onComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldPlay]);

  useEffect(() => {
    if (timeline.done) {
      sessionStorage.setItem(SESSION_KEY, "1");
      // Reacting to the rAF-driven timeline reaching "done" — starts the fade-out
      // immediately and schedules onComplete after the transition finishes.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExiting(true);
      const t = setTimeout(onComplete, 550);
      return () => clearTimeout(t);
    }
  }, [timeline.done, onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    timeline.skip();
  };

  if (shouldPlay === null) return null;
  if (!shouldPlay) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#050505]"
          role="dialog"
          aria-modal="true"
          aria-label="Introduction"
        >
          <div className="absolute inset-0">
            <IntroFallback stepName={timeline.stepName} caption={timeline.caption} />
          </div>
          <div className="absolute inset-x-0 bottom-6 flex justify-center gap-4 sm:bottom-8">
            <div className="h-1 w-28 overflow-hidden rounded-full bg-white/10 sm:w-40">
              <div className="h-full rounded-full bg-[#5b8cff]" style={{ width: `${timeline.totalProgress * 100}%` }} />
            </div>
            <button
              type="button"
              onClick={handleSkip}
              className="rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 font-display text-[12px] text-[#c7d8ce] cursor-pointer"
            >
              Skip intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
