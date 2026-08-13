export type HubNode = {
  id: string;
  label: string;
  targetId: string;
};

export const HUB_NODES: HubNode[] = [
  { id: "experience", label: "Experience", targetId: "experience" },
  { id: "skills", label: "Skills", targetId: "skills" },
  { id: "genai", label: "GenAI Testing", targetId: "genai-testing" },
  { id: "projects", label: "Projects", targetId: "projects" },
  { id: "qa-lab", label: "QA Lab", targetId: "qa-lab" },
  { id: "achievements", label: "Achievements", targetId: "achievements" },
  { id: "resume", label: "Resume", targetId: "resume" },
  { id: "contact", label: "Contact", targetId: "contact" },
];

export function scrollToNode(targetId: string) {
  const el = document.getElementById(targetId);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
  // If this target is a collapsed accordion item (e.g. QA Lab's "Testing AI Is Different"),
  // open it too — otherwise deep-linking here just scrolls to a closed panel.
  const trigger = el?.querySelector('button[aria-expanded="false"]');
  if (trigger instanceof HTMLButtonElement) trigger.click();
}
