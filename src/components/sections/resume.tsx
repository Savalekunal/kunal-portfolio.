import { LuFileText, LuDownload, LuExternalLink } from "react-icons/lu";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/lib/data";

export function ResumeSection() {
  return (
    <section id="resume" aria-labelledby="resume-heading" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <div className="flex flex-col items-center rounded-2xl border border-line bg-bg-elevated px-6 py-14 text-center sm:px-14">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
            <LuFileText size={24} aria-hidden />
          </div>
          <h2 id="resume-heading" className="font-display text-2xl font-semibold tracking-tight">
            Want the complete story?
          </h2>
          <p className="mt-3 max-w-md text-[14.5px] text-ink-muted">
            Every role, every metric, every tool — in one PDF you can forward to your team.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={profile.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line bg-bg px-5 py-2.5 font-display text-sm font-medium text-ink transition-colors hover:border-accent-line hover:text-accent"
            >
              View Resume
              <LuExternalLink size={15} aria-hidden />
            </a>
            <a
              href={profile.resumePdf}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-display text-sm font-medium text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              Download Resume
              <LuDownload size={15} aria-hidden />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
