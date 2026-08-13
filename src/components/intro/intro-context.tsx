"use client";

import { createContext, useContext } from "react";

// Lets other components (like the 3D Hub) know the intro overlay is still up, so they can
// defer mounting their own WebGL canvas — running two Three.js contexts at once is wasteful
// and can cause canvas compositing/z-index to misbehave.
const IntroActiveContext = createContext(false);

export function IntroActiveProvider({ active, children }: { active: boolean; children: React.ReactNode }) {
  return <IntroActiveContext.Provider value={active}>{children}</IntroActiveContext.Provider>;
}

export function useIntroActive() {
  return useContext(IntroActiveContext);
}
