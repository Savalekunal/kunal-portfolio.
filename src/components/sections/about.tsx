import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { summary } from "@/lib/data";

// Kept intentionally short — tool names live in the Tech Stack section, contact details
// live in the Contact section. This is just the "who, where, currently" context.
const QUICK_FACTS = [
  { label: "Experience", value: "4+ years in QA automation" },
  { label: "Currently", value: "QA Automation Engineer at Cohesity (via Xpheno)" },
  { label: "Domains", value: "GenAI platforms · Salesforce · Insurance · Web apps" },
];

// Traits, not metrics — each maps directly to language on the resume itself
// (analytical/communication skills, mentoring, cross-functional collaboration,
// driving reliable releases), not invented.
const TRAITS = ["Analytical", "Mentor", "Cross-Functional Collaborator", "Reliability-Driven"];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <SectionHeading title="About" />
      </Reveal>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr]">
        <Reveal direction="left">
          <div className="space-y-4 text-[16px] leading-relaxed text-ink">
            <p>{summary}</p>
            <p className="text-ink-muted">
              I think about quality the way a good pipeline does: nothing ships without evidence. That means
              automating the repeatable, designing for the risky paths, and treating GenAI systems as software that
              still has to prove grounding, guardrails, and access control — not just fluent answers.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {TRAITS.map((trait) => (
                <span
                  key={trait}
                  className="rounded-full border border-accent-line bg-accent-soft px-3 py-1 font-display text-[11px] uppercase tracking-wide text-accent"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
            {QUICK_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-line bg-bg-elevated p-4"
              >
                <dt className="font-display text-[11px] uppercase tracking-wide text-ink-faint">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-[14px] text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
