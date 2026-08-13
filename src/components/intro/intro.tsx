"use client";

import { useEffect, useState, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntroTimeline } from "@/three/useIntroTimeline";
import { useCanRun3D } from "@/three/useCanRun3D";
import { IntroOverlay } from "./intro-overlay";
import { IntroFallback } from "./intro-fallback";

const IntroScene = lazy(() => import("@/three/IntroScene").then((m) => ({ default: m.IntroScene })));

const SESSION_KEY = "kunal-portfolio-intro-seen";

export function Intro({ onComplete }: { onComplete: () => void }) {
  const [shouldPlay, setShouldPlay] = useState<boolean | null>(null);
  const [exiting, setExiting] = useState(false);
  const canRun3D = useCanRun3D();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    // ?intro=1 always (re)plays it — handy if you want to rewatch it, or preview it while
    // your OS has reduced-motion on.
    const forcePlay = new URLSearchParams(window.location.search).get("intro") === "1";
    // matchMedia/sessionStorage/URL params don't exist during SSR, so this can only be
    // resolved here, once, on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShouldPlay(forcePlay || (!reduceMotion && !alreadySeen));
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

  if (shouldPlay === null || canRun3D === null) return null;
  if (!shouldPlay) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#070c09]"
          role="dialog"
          aria-modal="true"
          aria-label="Introduction"
        >
          <div className="absolute inset-0">
            {canRun3D ? (
              <Suspense fallback={<div className="h-full w-full bg-[#070c09]" />}>
                <IntroScene stepName={timeline.stepName} stepProgress={timeline.stepProgress} />
              </Suspense>
            ) : (
              <IntroFallback stepName={timeline.stepName} caption={timeline.caption} />
            )}
          </div>
          {canRun3D && (
            <IntroOverlay caption={timeline.caption} progress={timeline.totalProgress} onSkip={handleSkip} />
          )}
          {!canRun3D && (
            <div className="absolute inset-x-0 bottom-6 flex justify-center gap-4">
              <div className="h-1 w-28 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#ff7a29]" style={{ width: `${timeline.totalProgress * 100}%` }} />
              </div>
              <button
                type="button"
                onClick={handleSkip}
                className="rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 font-display text-[12px] text-[#c7d8ce] cursor-pointer"
              >
                Skip intro
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
