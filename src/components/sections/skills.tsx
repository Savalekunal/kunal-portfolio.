"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Tooltip } from "@/components/ui/tooltip";
import { skillCategories } from "@/lib/data";
import { getSkillIcon } from "@/lib/skill-icons";
import { skillDescriptions } from "@/lib/skill-descriptions";
import { skillColors } from "@/lib/skill-colors";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <SectionHeading
          title="Tech Stack"
          description="Every tool here is one I've actually used in production test suites — hover any tile for context."
        />
      </Reveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {skillCategories.map((group, gi) => (
          <Reveal key={group.category} delay={(gi % 2) * 0.1} direction={gi % 2 === 0 ? "left" : "right"}>
            <div className="h-full rounded-2xl border border-line bg-bg-elevated p-8">
              <div className="mb-6">
                <h3 className="font-display text-xl font-semibold text-accent">{group.category}</h3>
                <p className="mt-1.5 text-[15px] text-ink-faint">{group.description}</p>
              </div>
              <div className="flex flex-wrap gap-3.5">
                {group.items.map((itemName) => {
                  const Icon = getSkillIcon(itemName);
                  const desc = skillDescriptions[itemName] ?? group.description;
                  const brandColor = skillColors[itemName];
                  return (
                    <Tooltip key={itemName} label={desc}>
                      <motion.div
                        whileHover={{ y: -3 }}
                        className="flex items-center gap-3 rounded-xl border border-line bg-bg px-5 py-3 text-base font-medium text-ink transition-colors hover:border-accent-line hover:text-accent"
                        tabIndex={0}
                      >
                        <Icon size={22} aria-hidden color={brandColor} />
                        {itemName}
                      </motion.div>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
