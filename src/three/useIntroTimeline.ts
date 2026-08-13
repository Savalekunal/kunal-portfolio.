"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { INTRO_STEPS, type IntroStepName } from "./introTimeline";

export type IntroTimelineState = {
  stepName: IntroStepName;
  stepProgress: number; // 0..1 within current step
  totalProgress: number; // 0..1 across the whole intro
  caption: string | null;
  skip: () => void;
  done: boolean;
};

export function useIntroTimeline(autoplay: boolean): IntroTimelineState {
  const [stepIndex, setStepIndex] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const stepStartRef = useRef(0);
  const skippedRef = useRef(false);

  const totalDuration = INTRO_STEPS.reduce((s, step) => s + step.duration, 0);
  const elapsedBeforeStep = INTRO_STEPS.slice(0, stepIndex).reduce((s, step) => s + step.duration, 0);

  const skip = useCallback(() => {
    skippedRef.current = true;
    setStepIndex(INTRO_STEPS.length - 1);
    setStepProgress(1);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    stepStartRef.current = performance.now();
    // Use a local id for cleanup, not the shared rafRef — in React's dev-mode double-invoke
    // (mount → cleanup → mount), a shared ref can end up cancelling the *next* effect
    // instance's frame instead of this one's, letting a stray loop run unchecked.
    const myRafId = { current: null as number | null };

    const tick = (now: number) => {
      if (skippedRef.current) return;
      const step = INTRO_STEPS[stepIndex];
      if (!step || step.duration === 0) return;
      const elapsed = (now - stepStartRef.current) / 1000;
      const progress = Math.min(elapsed / step.duration, 1);
      setStepProgress(progress);

      if (progress >= 1) {
        setStepIndex((i) => Math.min(i + 1, INTRO_STEPS.length - 1));
        return;
      }
      myRafId.current = requestAnimationFrame(tick);
    };

    myRafId.current = requestAnimationFrame(tick);
    return () => {
      if (myRafId.current) cancelAnimationFrame(myRafId.current);
    };
  }, [autoplay, stepIndex]);

  const step = INTRO_STEPS[stepIndex];

  return {
    stepName: step.name,
    stepProgress,
    totalProgress: Math.min((elapsedBeforeStep + stepProgress * step.duration) / totalDuration, 1),
    caption: step.caption ?? null,
    skip,
    done: step.name === "done",
  };
}
