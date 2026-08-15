import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/data";
import { ProjectCard } from "./project-card";
import { GaiaArchitecture } from "./gaia-architecture";

const gaia = projects.find((p) => p.featured)!;
const others = projects.filter((p) => !p.featured);

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <SectionHeading
          title="Featured Work"
          description="From a full GenAI platform down to insurance API suites — here's what shipped, and how it was tested."
        />
      </Reveal>

      {/* GAIA — centerpiece */}
      <Reveal>
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-full bg-signal-soft px-3 py-1 font-display text-[11px] text-signal">
            centerpiece project
          </span>
        </div>
      </Reveal>
      <div className="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr] lg:items-stretch">
        <Reveal direction="left">
          <ProjectCard project={gaia} />
        </Reveal>
        <Reveal direction="right" delay={0.1}>
          <GaiaArchitecture />
        </Reveal>
      </div>

      {/* remaining projects */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {others.map((p, i) => (
          <Reveal key={p.id} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.06}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
