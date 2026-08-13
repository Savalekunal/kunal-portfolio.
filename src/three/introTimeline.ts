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

// Durations in seconds. Total ≈ 19s — within the requested ~15-20s window.
export const INTRO_STEPS: IntroStep[] = [
  { name: "cameraIn", duration: 1.5 },
  { name: "appAppear", duration: 1.0 },
  { name: "robotEnter", duration: 1.2 },
  { name: "robotReach", duration: 1.0 },
  { name: "appClick", duration: 0.5 },
  { name: "appBreak", duration: 1.0 },
  { name: "bugAppear", duration: 0.6 },
  { name: "spiderEnter", duration: 1.0 },
  { name: "spiderCatch", duration: 1.0 },
  { name: "spiderReturn", duration: 1.2 },
  { name: "text1", duration: 1.8, caption: "Hi, I'm Kunal." },
  { name: "text2", duration: 1.8, caption: "I'm a QA Engineer." },
  { name: "text3", duration: 2.2, caption: "My job is to break software before users do." },
  { name: "text4", duration: 2.2, caption: "I find bugs, and make software more reliable." },
  { name: "cameraOut", duration: 1.5 },
  { name: "done", duration: 0 },
];

export const INTRO_TOTAL_DURATION = INTRO_STEPS.reduce((sum, s) => sum + s.duration, 0);
