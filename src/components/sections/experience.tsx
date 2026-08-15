"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { LuChevronDown, LuCircleCheck, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { experience, type Experience as ExperienceType } from "@/lib/data";

function PhotoCarousel({ photos, alt }: { photos: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Deliberately plays regardless of prefers-reduced-motion — this is a requested
  // always-on showcase feature, not a scroll-triggered animation.
  useEffect(() => {
    if (photos.length <= 1 || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % photos.length), 3000);
    return () => clearInterval(id);
  }, [photos.length, paused]);

  if (photos.length === 0) return null;
  return (
    <div
      className="relative mt-4 mx-auto aspect-[4/3] w-[60%] min-w-[220px] overflow-hidden rounded-lg bg-bg-sunken"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <Image
            src={photos[index]}
            alt={`${alt} — photo ${index + 1}`}
            fill
            sizes="(max-width: 768px) 60vw, 380px"
            quality={95}
            className="object-contain"
          />
        </motion.div>
      </AnimatePresence>
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i - 1 + photos.length) % photos.length);
            }}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-bg/80 text-ink backdrop-blur-sm cursor-pointer"
          >
            <LuChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i + 1) % photos.length);
            }}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-bg/80 text-ink backdrop-blur-sm cursor-pointer"
          >
            <LuChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {photos.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${i === index ? "bg-accent" : "bg-bg/70"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CompanyBadge({ name }: { name: string }) {
  const initials = name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-bg font-display text-sm font-semibold text-ink">
      {initials}
    </div>
  );
}

function ExperienceCard({ item, defaultOpen }: { item: ExperienceType; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-line bg-bg-elevated">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-4 text-left cursor-pointer"
      >
        <CompanyBadge name={item.company} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-display text-[15px] font-semibold text-ink">{item.role}</span>
          </div>
          <p className="truncate text-[13.5px] text-ink-muted">
            {item.company}
            {item.companyNote && <span className="text-ink-faint"> · {item.companyNote}</span>}
          </p>
        </div>
        <span className="hidden shrink-0 font-display text-[12px] text-ink-faint sm:block">{item.period}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="shrink-0 text-ink-faint">
          <LuChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-line-soft px-5 pb-5 pt-4">
              <p className="text-[13px] text-ink-muted sm:hidden mb-3 font-display">{item.period}</p>
              <p className="mb-4 text-[13.5px] text-ink-muted">{item.context}</p>
              <ul className="mb-4 space-y-2.5">
                {item.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2.5 text-[14px] text-ink">
                    <LuCircleCheck size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-1.5">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-bg px-2.5 py-0.5 font-display text-[11px] text-ink-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {item.photos && <PhotoCarousel photos={item.photos} alt={item.company} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ExperienceSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.75", "end 0.4"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" aria-labelledby="experience-heading" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <SectionHeading
          title="Experience"
          description="Read top to bottom like a build log — most recent run first."
        />
      </Reveal>

      <div ref={trackRef} className="relative">
        {/* rail */}
        <div className="absolute left-[21px] top-2 bottom-2 w-px bg-line" aria-hidden />
        <motion.div
          className="absolute left-[21px] top-2 w-px origin-top bg-accent"
          style={{ scaleY: lineScale, height: "calc(100% - 16px)" }}
          aria-hidden
        />

        <ol className="space-y-8">
          {experience.map((item, i) => (
            <li key={item.id} className="relative pl-14">
              <div className="absolute left-0 top-4 flex h-11 w-11 items-center justify-center">
                <span className="relative flex h-3 w-3">
                  <span
                    className={`relative inline-flex h-3 w-3 rounded-full border-2 border-bg ${
                      i === 0 ? "bg-accent" : "bg-ink-faint"
                    }`}
                  />
                </span>
              </div>
              <Reveal direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.05}>
                <div className="mb-2 font-display text-[12px] text-ink-faint">{item.year}</div>
                <ExperienceCard item={item} defaultOpen={i === 0} />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
