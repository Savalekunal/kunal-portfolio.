"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LuArrowRight, LuDownload, LuMail, LuGithub, LuLinkedin, LuInstagram } from "react-icons/lu";
import { profile } from "@/lib/data";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* backdrop: faint pipeline grid, evokes a dashboard/lab surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--line-soft) 1px, transparent 1px), linear-gradient(90deg, var(--line-soft) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage: "radial-gradient(ellipse 75% 60% at 50% 20%, #000 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 20%, #000 0%, transparent 75%)",
        }}
      />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-5 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-8 h-40 w-40 sm:h-48 sm:w-48"
        >
          <div
            aria-hidden
            className="absolute -inset-3 rounded-full opacity-90 blur-xl"
            style={{ background: "conic-gradient(from 90deg, var(--accent), var(--signal), var(--accent))" }}
          />
          <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-bg bg-bg-inset shadow-xl">
            {profile.photo ? (
              <Image src={profile.photo} alt={profile.name} fill sizes="192px" className="object-cover" priority />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_20%,var(--accent-soft),transparent_60%)]">
                <span className="font-display text-5xl font-semibold text-ink-on-inset">{profile.initials}</span>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center">
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-soft px-3 py-1.5 font-display text-[12px] text-accent"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            status: open to new SDET / QA automation roles
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p variants={item} className="mt-4 font-display text-lg text-ink-muted sm:text-xl">
            {profile.titleLine}
          </motion.p>

          <motion.p variants={item} className="mt-2 max-w-xl text-[16px] italic text-ink-faint sm:text-lg">
            &ldquo;{profile.tagline}&rdquo;
          </motion.p>

          <motion.p variants={item} className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-display text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              View My Work
              <LuArrowRight size={15} aria-hidden />
            </button>
            <a
              href={profile.resumePdf}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg-elevated px-5 py-2.5 font-display text-sm font-medium text-ink transition-colors hover:border-accent-line hover:text-accent"
            >
              Download Resume
              <LuDownload size={15} aria-hidden />
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg-elevated px-5 py-2.5 font-display text-sm font-medium text-ink transition-colors hover:border-accent-line hover:text-accent cursor-pointer"
            >
              Contact Me
              <LuMail size={15} aria-hidden />
            </button>
          </motion.div>

          <motion.div variants={item} className="mt-7 flex items-center gap-3">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kunal Savale on LinkedIn (opens in a new tab)"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg-elevated text-ink-muted transition-colors hover:text-accent hover:border-accent-line"
            >
              <LuLinkedin size={17} />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kunal Savale on GitHub (opens in a new tab)"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg-elevated text-ink-muted transition-colors hover:text-accent hover:border-accent-line"
            >
              <LuGithub size={17} />
            </a>
            <a
              href={profile.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kunal Savale on Instagram (opens in a new tab)"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg-elevated text-ink-muted transition-colors hover:text-accent hover:border-accent-line"
            >
              <LuInstagram size={17} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
