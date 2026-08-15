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

// Durations in seconds. Total ≈ 10s — short enough that both first-time visitors and
// repeat ones (via ?intro=1) aren't stuck waiting to see the actual site.
export const INTRO_STEPS: IntroStep[] = [
  { name: "cameraIn", duration: 0.6 },
  { name: "appAppear", duration: 0.4 },
  { name: "robotEnter", duration: 0.5 },
  { name: "robotReach", duration: 0.4 },
  { name: "appClick", duration: 0.3 },
  { name: "appBreak", duration: 0.5 },
  { name: "bugAppear", duration: 0.4 },
  { name: "spiderEnter", duration: 0.5 },
  { name: "spiderCatch", duration: 0.5 },
  { name: "spiderReturn", duration: 0.5 },
  { name: "text1", duration: 1.1, caption: "Hi, I'm Kunal." },
  { name: "text2", duration: 1.1, caption: "I'm a QA Engineer." },
  { name: "text3", duration: 1.4, caption: "My job is to break software before users do." },
  { name: "text4", duration: 1.4, caption: "I find bugs, and make software more reliable." },
  { name: "cameraOut", duration: 0.6 },
  { name: "done", duration: 0 },
];

export const INTRO_TOTAL_DURATION = INTRO_STEPS.reduce((sum, s) => sum + s.duration, 0);
