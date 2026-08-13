"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Intro } from "@/components/intro/intro";
import { IntroActiveProvider } from "@/components/intro/intro-context";

export function PageShell({ children }: { children: ReactNode }) {
  const [introActive, setIntroActive] = useState(true);

  useEffect(() => {
    document.body.style.overflow = introActive ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introActive]);

  return (
    <IntroActiveProvider active={introActive}>
      {introActive && <div className="fixed inset-0 z-[99] bg-[#070c09]" aria-hidden />}
      <Intro onComplete={() => setIntroActive(false)} />
      {children}
    </IntroActiveProvider>
  );
}
