"use client";

import { useEffect, useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Deliberately only known once mounted on the client — avoids rendering an icon that
  // could mismatch the eventual resolved theme during hydration.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-md border border-line bg-bg-elevated text-ink-muted transition-colors hover:text-accent hover:border-accent-line cursor-pointer"
    >
      {mounted && (isDark ? <LuSun size={16} /> : <LuMoon size={16} />)}
    </button>
  );
}
