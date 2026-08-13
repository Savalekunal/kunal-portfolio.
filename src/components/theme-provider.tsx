"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";
type ThemeContextValue = { theme: Theme; setTheme: (t: Theme) => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "kunal-portfolio-theme";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "dark" || stored === "light" ? stored : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Matches the server-rendered markup (no override class) until the effect below
  // runs — the CSS media query already handles the correct look on first paint.
  const [theme, setThemeState] = useState<Theme>("dark");

  useLayoutEffect(() => {
    const stored = getStoredTheme();
    const resolved = stored ?? getSystemTheme();
    // localStorage/matchMedia don't exist during SSR, so the resolved theme can only be
    // read here, once, on mount — this is the sanctioned "sync from an external system" case.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(resolved);
    if (stored) {
      document.documentElement.classList.toggle("dark", stored === "dark");
      document.documentElement.classList.toggle("light", stored === "light");
    }
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.classList.toggle("light", next === "light");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable — theme just won't persist
    }
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
