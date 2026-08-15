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
    <section id="skills" aria-labelledby="skills-heading" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-14 md:px-8 md:py-20">
      <Reveal>
        <SectionHeading
          title="Tech Stack"
          description="Every tool here is one I've actually used in production test suites — hover any tile for context."
        />
      </Reveal>

      <div className="flex flex-col gap-10">
        {skillCategories.map((group, gi) => (
          <Reveal key={group.category} delay={(gi % 2) * 0.06}>
            <h3 className="font-display text-lg font-semibold text-ink">{group.category}</h3>
            <p className="mt-1 text-[14px] text-ink-faint">{group.description}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {group.items.map((itemName) => {
                const Icon = getSkillIcon(itemName);
                const desc = skillDescriptions[itemName] ?? group.description;
                const brandColor = skillColors[itemName];
                return (
                  <Tooltip key={itemName} label={desc}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="flex items-center gap-2.5 rounded-full border border-line bg-bg-elevated px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:border-accent-line hover:text-accent"
                      tabIndex={0}
                    >
                      <Icon size={18} aria-hidden color={brandColor} />
                      {itemName}
                    </motion.div>
                  </Tooltip>
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
