"use client";

import { Suspense, lazy } from "react";
import { useCanRun3D } from "@/three/useCanRun3D";
import { useIntroActive } from "@/components/intro/intro-context";
import { HubMobileGrid } from "./hub-mobile-grid";

const HubScene = lazy(() => import("@/three/HubScene").then((m) => ({ default: m.HubScene })));

export function Hub() {
  const canRun3D = useCanRun3D();
  const introActive = useIntroActive();

  if (canRun3D === null) {
    return <div className="mx-auto h-[480px] w-full max-w-[560px]" aria-hidden />;
  }

  if (!canRun3D) {
    return (
      <div className="mx-auto w-full max-w-lg">
        <HubMobileGrid />
      </div>
    );
  }

  return (
    <div className="mx-auto h-[480px] w-full max-w-[560px] sm:h-[560px] md:h-[620px] md:max-w-[640px]">
      {/* Deferred until the intro finishes — running two WebGL contexts at once is wasteful
          and can make the canvases' paint/stacking order misbehave. */}
      {!introActive && (
        <Suspense fallback={<div className="h-full w-full" aria-hidden />}>
          <HubScene />
        </Suspense>
      )}
    </div>
  );
}
