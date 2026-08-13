import { LuMail, LuLinkedin, LuGithub, LuInstagram, LuArrowUp } from "react-icons/lu";
import { profile } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-[13px] text-ink">{profile.name}</p>
          <p className="mt-1 text-[12px] text-ink-faint">{profile.titleLine}</p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:text-accent hover:border-accent-line"
          >
            <LuMail size={15} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in a new tab)"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:text-accent hover:border-accent-line"
          >
            <LuLinkedin size={15} />
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in a new tab)"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:text-accent hover:border-accent-line"
          >
            <LuGithub size={15} />
          </a>
          <a
            href={profile.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram (opens in a new tab)"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:text-accent hover:border-accent-line"
          >
            <LuInstagram size={15} />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-line bg-accent-soft px-2.5 py-1 font-display text-[10.5px] text-accent">
            QA Tested ✓
          </span>
          <a
            href="#home"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:text-accent hover:border-accent-line"
            aria-label="Back to top"
          >
            <LuArrowUp size={15} />
          </a>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-6xl text-[11.5px] text-ink-faint">
        © {year} {profile.name}. Built with Next.js, TypeScript, Tailwind CSS & Framer Motion.
      </p>
    </footer>
  );
}
