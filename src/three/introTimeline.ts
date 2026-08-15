export type IntroStepName =
  | "cameraIn"
  | "appAppear"
  | "robotEnter"
  | "robotReach"
  | "appClick"
  | "appBreak"
  | "bugAppear"
  | "spiderEnter"
  | "spiderCatch"
  | "spiderReturn"
  | "text1"
  | "text2"
  | "text3"
  | "text4"
  | "cameraOut"
  | "done";

export type IntroStep = { name: IntroStepName; duration: number; caption?: string };

// Durations in seconds. The first 5 steps are leftover step names from the original 3D
// camera choreography (now deleted) — IntroFallback doesn't render a distinct visual for
// any of them, so they're compressed to near-zero rather than removed, to avoid touching
// the step-name contracts in IntroFallback/useIntroTimeline. The 4 captions each hold for
// 1.3s so they're actually readable, not just glanceable.
export const INTRO_STEPS: IntroStep[] = [
  { name: "cameraIn", duration: 0.05 },
  { name: "appAppear", duration: 0.05 },
  { name: "robotEnter", duration: 0.05 },
  { name: "robotReach", duration: 0.05 },
  { name: "appClick", duration: 0.05 },
  { name: "appBreak", duration: 0.2 },
  { name: "bugAppear", duration: 0.25 },
  { name: "spiderEnter", duration: 0.15 },
  { name: "spiderCatch", duration: 0.25 },
  { name: "spiderReturn", duration: 0.15 },
  { name: "text1", duration: 1.3, caption: "Hi, I'm Kunal." },
  { name: "text2", duration: 1.3, caption: "I'm a QA Engineer." },
  { name: "text3", duration: 1.3, caption: "My job is to break software before users do." },
  { name: "text4", duration: 1.3, caption: "I find bugs, and make software more reliable." },
  { name: "cameraOut", duration: 0.2 },
  { name: "done", duration: 0 },
];

export const INTRO_TOTAL_DURATION = INTRO_STEPS.reduce((sum, s) => sum + s.duration, 0);
