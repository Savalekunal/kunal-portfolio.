import type { IconType } from "react-icons";
import {
  SiSelenium,
  SiCucumber,
  SiAppium,
  SiPytest,
  SiPython,
  SiPostman,
  SiJenkins,
  SiGit,
  SiGithub,
  SiKubernetes,
  SiMongodb,
  SiRobotframework,
  SiGooglecloud,
  SiLinux,
} from "react-icons/si";
import { FaJava, FaAws, FaMicrosoft } from "react-icons/fa6";
import {
  LuTestTubeDiagonal,
  LuTestTube,
  LuNetwork,
  LuRoute,
  LuWorkflow,
  LuContainer,
  LuDatabase,
  LuBoxes,
  LuBrainCircuit,
  LuBrain,
  LuRadar,
  LuChartNetwork,
  LuWaypoints,
  LuShieldCheck,
  LuBugOff,
  LuFingerprint,
  LuScrollText,
  LuLanguages,
  LuEyeOff,
  LuCode,
} from "react-icons/lu";

// Playwright, TestNG, and "CI/CD" have no official brand mark in the icon libraries
// available here (Simple Icons / Font Awesome) — they stay theme-adaptive generic icons
// rather than a fabricated logo. Java uses Font Awesome's coffee-cup mark (Simple Icons
// only has OpenJDK's duke/feather mark, not the classic Java logo). Azure has no available
// mark either; Microsoft's general logo is used as the closest real substitute.
export const skillIcons: Record<string, IconType> = {
  Playwright: LuTestTubeDiagonal,
  "Selenium WebDriver": SiSelenium,
  PyTest: SiPytest,
  "Cucumber (BDD)": SiCucumber,
  TestNG: LuTestTube,
  Appium: SiAppium,
  Python: SiPython,
  Java: FaJava,
  Postman: SiPostman,
  Requests: LuNetwork,
  "REST API Testing": LuRoute,
  Jenkins: SiJenkins,
  Git: SiGit,
  GitHub: SiGithub,
  "CI/CD Pipeline Integration": LuWorkflow,
  Kubernetes: SiKubernetes,
  kubectl: LuContainer,
  AWS: FaAws,
  Azure: FaMicrosoft,
  GCP: SiGooglecloud,
  Linux: SiLinux,
  "Robot Framework": SiRobotframework,
  SQL: LuDatabase,
  MongoDB: SiMongodb,
  Milvus: LuBoxes,
  "RAG Testing": LuBrainCircuit,
  "LLM Testing": LuBrain,
  "Semantic Retrieval": LuRadar,
  MCP: LuChartNetwork,
  "Query Routing": LuWaypoints,
  "Guardrail Testing": LuShieldCheck,
  "Hallucination Testing": LuBugOff,
  RBAC: LuFingerprint,
  "Audit Logging": LuScrollText,
  "Multilingual Testing": LuLanguages,
  "Redaction Testing": LuEyeOff,
};

export function getSkillIcon(name: string): IconType {
  return skillIcons[name] ?? LuCode;
}
