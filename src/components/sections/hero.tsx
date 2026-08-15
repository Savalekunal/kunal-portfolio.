"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LuDownload, LuMouse } from "react-icons/lu";
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
      {/* backdrop: soft drifting aurora blobs on near-black, evokes the reference site's minimal glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="aurora-blob absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-[65%] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        />
        <div
          className="aurora-blob absolute -top-20 left-1/2 h-[520px] w-[520px] translate-x-[10%] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--signal) 0%, transparent 70%)", animationDelay: "-6s" }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--line-soft) 1px, transparent 1px), linear-gradient(90deg, var(--line-soft) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
            maskImage: "radial-gradient(ellipse 75% 60% at 50% 20%, #000 0%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 20%, #000 0%, transparent 75%)",
          }}
        />
      </div>

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
              <Image
                src={profile.photo}
                alt={profile.name}
                fill
                sizes="192px"
                quality={95}
                className="object-cover object-[center_18%]"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_20%,var(--accent-soft),transparent_60%)]">
                <span className="font-display text-5xl font-semibold text-ink-on-inset">{profile.initials}</span>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center">
          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p variants={item} className="mt-4 max-w-xl text-lg text-ink-muted sm:text-xl">
            {profile.tagline}
          </motion.p>

          <motion.p variants={item} className="mt-3 text-[15px] text-ink sm:text-base">
            🧪 · Open to QA Automation and SDET Roles
          </motion.p>

          <motion.p variants={item} className="mt-3 max-w-2xl text-[13px] leading-relaxed text-ink sm:text-[14px]">
            QA Automation Engineer | SDET | 4+ Years | GenAI Testing | Python & Java | Selenium & Playwright | API
            Automation | Web & Mobile | Database | Insurance & Salesforce | CI/CD | Building Scalable Test Automation
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <a
              href={profile.resumePdf}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg-elevated px-5 py-2.5 font-display text-sm font-medium text-ink transition-colors hover:border-accent-line hover:text-accent"
            >
              Download Resume
              <LuDownload size={15} aria-hidden />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        variants={item}
        initial="hidden"
        animate="show"
        onClick={() => scrollTo("about")}
        aria-label="Scroll to explore"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-faint transition-colors hover:text-ink cursor-pointer"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <LuMouse size={22} aria-hidden />
        </motion.span>
      </motion.button>
    </section>
  );
}
