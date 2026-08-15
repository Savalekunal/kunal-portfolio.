"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Intro } from "@/components/intro/intro";

export function PageShell({ children }: { children: ReactNode }) {
  const [introActive, setIntroActive] = useState(true);

  useEffect(() => {
    document.body.style.overflow = introActive ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introActive]);

  return (
    <>
      {introActive && <div className="fixed inset-0 z-[99] bg-[#050505]" aria-hidden />}
      <Intro onComplete={() => setIntroActive(false)} />
      {children}
    </>
  );
}
