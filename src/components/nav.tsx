"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { LuMenu, LuX } from "react-icons/lu";
import { navSections, profile } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navSections.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <motion.div className="h-[2px] bg-accent origin-left" style={{ scaleX: progress }} />
      <div
        className={`transition-colors duration-200 ${
          scrolled ? "bg-bg/85 backdrop-blur-md border-b border-line" : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8"
        >
          <button
            onClick={() => goTo("home")}
            className="font-display text-[17px] font-semibold tracking-tight cursor-pointer text-ink"
            aria-label="Go to top"
          >
            {profile.name}
          </button>

          <ul className="hidden lg:flex items-center gap-7 font-display text-[14px]">
            {navSections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => goTo(s.id)}
                  aria-current={active === s.id ? "true" : undefined}
                  className={`relative py-1.5 transition-colors cursor-pointer ${
                    active === s.id ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {s.label}
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-bg-elevated text-ink-muted lg:hidden cursor-pointer"
            >
              {mobileOpen ? <LuX size={16} /> : <LuMenu size={16} />}
            </button>
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-b border-line bg-bg px-5 pb-4">
          <ul className="flex flex-col gap-1 font-display text-sm">
            {navSections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => goTo(s.id)}
                  className={`block w-full rounded-md px-3 py-2 text-left transition-colors cursor-pointer ${
                    active === s.id ? "text-accent bg-accent-soft" : "text-ink-muted"
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
