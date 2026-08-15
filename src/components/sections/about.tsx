import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

// Kept intentionally short — tool names live in the Tech Stack section, contact details
// live in the Contact section. This is just the "who, where, currently" context.
const QUICK_FACTS = [
  { label: "Experience", value: "4+ years in QA automation" },
  { label: "Currently", value: "QA Automation Engineer at Cohesity (via Xpheno)" },
  { label: "Domains", value: "GenAI platforms · Salesforce · Insurance · Cloud · Web apps · Mobile · Database" },
];

// Traits, not metrics — each maps directly to language on the resume itself
// (analytical/communication skills, mentoring, cross-functional collaboration,
// driving reliable releases), not invented.
const TRAITS = ["Analytical", "Mentor", "Cross-Functional Collaborator", "Reliability-Driven"];

const BIO_PARAGRAPHS = [
  "Hi. I'm Kunal. I'm a QA Automation Engineer with 4+ years of experience in software testing, automation, and quality engineering.",
  "My interest in technology started during my engineering studies at R.C. Patel Institute of Technology, where I developed a strong interest in programming and software development. Over time, I started exploring Java, Python, automation testing, web technologies, and databases, which led me toward a career in QA Automation.",
  "Throughout my career, I've worked on different products and testing environments, gaining hands-on experience with Selenium, Playwright, PyTest, Java, Python, API testing, SQL, MongoDB, Git, Jenkins, Linux, and CI/CD. I've worked on both UI and API automation, framework development, regression testing, system testing, and end-to-end quality validation.",
  "Currently, I'm working as a QA Engineer on a cloud and AI-focused product, where I work on system testing, automation, dataset indexing, chatbot and Slack integrations, and AI-related workflows. I've also worked on large-scale automation and data validation, including automating document indexing and testing workflows involving thousands of queries and files.",
  "I'm particularly interested in the intersection of QA, automation, AI, and software engineering. I'm now looking to grow beyond traditional testing and build deeper expertise in AI-powered testing, GenAI applications, automation frameworks, and quality engineering.",
  "Outside of my day-to-day work, I enjoy learning new technologies, building automation solutions, and exploring ways to make software testing faster, smarter, and more reliable.",
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-4xl scroll-mt-24 px-5 py-12 md:px-8 md:py-14">
      <Reveal>
        <SectionHeading title="About" />
      </Reveal>

      <Reveal direction="left">
        <div className="space-y-4 text-[16px] leading-relaxed text-ink">
          {BIO_PARAGRAPHS.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
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

      <Reveal direction="right" delay={0.1} className="mt-8">
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {QUICK_FACTS.map((fact) => (
            <div key={fact.label} className="rounded-xl border border-line bg-bg-elevated p-4">
              <dt className="font-display text-[11px] uppercase tracking-wide text-ink-faint">{fact.label}</dt>
              <dd className="mt-1.5 text-[14px] text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
