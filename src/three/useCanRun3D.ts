"use client";

import { useEffect, useState } from "react";

/**
 * Decides whether it's worth paying for a WebGL/R3F scene: wide viewport, enough
 * CPU cores, and WebGL actually available. Supports ?force3d=1|0 for testing.
 */
export function useCanRun3D() {
  const [canRun3D, setCanRun3D] = useState<boolean | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forced = params.get("force3d");
    // Viewport width, CPU cores, and WebGL support are all only knowable client-side,
    // on mount — this is the sanctioned "sync from an external system" case.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (forced === "1") {
      setCanRun3D(true);
      return;
    }
    if (forced === "0") {
      setCanRun3D(false);
      return;
    }

    const isWideEnough = window.innerWidth >= 768;
    const cores = navigator.hardwareConcurrency ?? 4;
    let hasWebGL = false;
    try {
      const c = document.createElement("canvas");
      hasWebGL = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      hasWebGL = false;
    }
    setCanRun3D(isWideEnough && cores >= 4 && hasWebGL);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  return canRun3D;
}
