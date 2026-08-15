import { LuGraduationCap, LuBadgeCheck } from "react-icons/lu";
import type { IconType } from "react-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { education, certifications, type Credential } from "@/lib/data";

function CredGroup({
  title,
  icon: Icon,
  items,
  delay,
  direction,
}: {
  title: string;
  icon: IconType;
  items: Credential[];
  delay: number;
  direction: "left" | "right";
}) {
  return (
    <Reveal direction={direction} delay={delay}>
      <div className="h-full rounded-xl border border-line bg-bg-elevated p-5">
        <div className="mb-4 flex items-center gap-2">
          <Icon size={16} className="text-accent" aria-hidden />
          <h3 className="font-display text-[13px] font-semibold uppercase tracking-wide text-ink-faint">{title}</h3>
        </div>
        <ul className="space-y-3.5">
          {items.map((it) => (
            <li key={it.primary}>
              <p className="text-[14px] font-medium text-ink">{it.primary}</p>
              <p className="text-[12.5px] text-ink-muted">{it.secondary}</p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-heading" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <SectionHeading title="Education & Certifications" />
      </Reveal>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CredGroup title="Education" icon={LuGraduationCap} items={education} delay={0} direction="left" />
        <CredGroup title="Certifications" icon={LuBadgeCheck} items={certifications} delay={0.06} direction="right" />
      </div>
    </section>
  );
}
