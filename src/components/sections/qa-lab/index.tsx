import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { LabConsole } from "./lab-console";
import { TestPipeline } from "./test-pipeline";
import { GenAiTesting } from "./genai-testing";
import { BugBoard } from "./bug-board";
import { TestingProcess } from "./testing-process";

const ACCORDION_ITEMS: AccordionItem[] = [
  { id: "process-steps", eyebrow: "process.steps", title: "My Testing Approach", content: <TestingProcess /> },
  { id: "pipeline-animate", eyebrow: "pipeline.animate", title: "How I Automate Testing", content: <TestPipeline /> },
  { id: "defects-board", eyebrow: "defects.board", title: "I Find Bugs Before Users Do", content: <BugBoard /> },
  { id: "genai-testing", eyebrow: "genai.compare", title: "Testing AI Is Different", content: <GenAiTesting /> },
];

export function QaLab() {
  return (
    <section
      id="qa-lab"
      aria-labelledby="qa-lab-heading"
      className="scroll-mt-24 border-y border-line bg-bg-sunken/60 px-5 py-14 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            title="QA Lab"
            description="Where requirements become test cases, test cases become automation, and automation becomes release confidence."
          />
        </Reveal>

        <Reveal direction="left" delay={0.1}>
          <div className="mb-6 flex items-center gap-3">
            <h3 className="font-display text-lg font-semibold text-ink">Try It — Run the Lab</h3>
            <span className="rounded bg-bg-sunken px-2 py-0.5 font-display text-[10.5px] text-ink-faint">
              lab.console
            </span>
          </div>
          <LabConsole />
        </Reveal>

        <Reveal direction="right" delay={0.15} className="mt-12">
          <Accordion items={ACCORDION_ITEMS} />
        </Reveal>
      </div>
    </section>
  );
}
