// ---------------------------------------------------------------------------
// Single source of truth for all resume-derived content on the site.
// Every fact here comes from Kunal_Savale-Resume.pdf. Nothing is invented.
// Fields marked PLACEHOLDER must be edited before the real values are known.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Kunal Savale",
  initials: "KS",
  titleLine: "QA Automation Engineer | SDET",
  tagline: "A good tester is a detective, and I am a detective.",
  intro:
    "4+ years of experience in QA automation, UI/API testing, CI/CD, and testing modern GenAI/RAG applications.",
  location: "India", // PLACEHOLDER — city not listed on resume
  phone: "+91-9767970641",
  email: "savalekunal07@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/kunal-savale07",
    linkedinLabel: "linkedin.com/in/kunal-savale07",
    github: "https://github.com/kunal-savale",
    githubLabel: "github.com/kunal-savale",
    instagram: "https://www.instagram.com/_kunalsavale_/?hl=en",
    instagramLabel: "@_kunalsavale_",
    instagramIsPlaceholder: false,
  },
  resumePdf: "/Kunal_Savale_Resume.pdf",
  photo: "/photo.jpg" as string | null,
};

export type Experience = {
  id: string;
  company: string;
  companyNote?: string;
  role: string;
  period: string;
  year: string;
  context: string;
  bullets: string[];
  tech: string[];
  /** Resume says "Offered Return" for this engagement. */
  offeredReturn?: boolean;
  /** Optional photos — drop files into public/experience/ and point here. */
  photos?: string[];
};

export const experience: Experience[] = [
  {
    id: "cohesity",
    company: "Cohesity",
    companyNote: "via Xpheno",
    role: "QA Automation Engineer",
    period: "Aug 2025 – Jul 2026",
    year: "2025",
    context:
      "Enterprise RAG-based GenAI platform testing across Metadata Filters, Context Aware, Conversation Threads, Permission Management, audit logging, RBAC, multilingual support, redaction, and Copilot/MCP integrations.",
    bullets: [
      "Designed and maintained Playwright-based UI and API automation to strengthen end-to-end test coverage for the enterprise GenAI platform, alongside functional, regression, API, and release testing cycles.",
      "Validated audit logging, RBAC, multilingual support, redaction, and Copilot/MCP integrations, ensuring compliance-critical features met release quality standards.",
      "Integrated automated test execution into Jenkins CI/CD pipelines with Git-based version control, improving release confidence and enabling faster feedback for development teams.",
      "Improved release confidence through defect analysis, test planning, test execution, automation support, and cross-functional collaboration with developers and product teams.",
      "Mentored team members on automation best practices and contributed to test strategy and framework design discussions.",
    ],
    tech: ["Playwright", "Jenkins", "Git", "Kubernetes", "RBAC", "MCP", "GenAI"],
  },
  {
    id: "nexvant",
    company: "Nexvant Solutions",
    role: "QE Analyst",
    period: "2023 – 2025",
    year: "2023",
    context: "Quality engineering for customer-facing digital platforms, including SAM+ and Digital.",
    bullets: [
      "Automated key test cases for SAM+ and Digital platforms using Selenium and Java, reducing manual testing effort by 60%.",
      "Built BDD-style automation coverage using Cucumber to create readable, maintainable, and CI-friendly test scenarios.",
      "Supported release readiness for web and Salesforce-connected platforms through functional testing, regression testing, defect tracking, and automation validation.",
    ],
    tech: ["Selenium", "Java", "Cucumber", "Salesforce"],
    offeredReturn: true,
  },
  {
    id: "atos-syntel",
    company: "Atos-Syntel",
    role: "Associate Consultant",
    period: "2022 – 2023",
    year: "2022",
    context: "API and automation testing for Allstate insurance applications and business workflows.",
    bullets: [
      "Designed and executed API test cases using PyTest, Python, Selenium, and Requests, improving test coverage by 90%.",
      "Automated end-to-end API and functional tests using Git and Jenkins-based CI/CD workflows, reducing manual QA effort by 70% and improving release quality.",
    ],
    tech: ["Python", "PyTest", "Selenium", "Jenkins", "Git"],
    offeredReturn: true,
  },
];

export type SkillCategory = {
  category: string;
  description: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Automation",
    description: "UI & framework-level automation",
    items: ["Playwright", "Selenium WebDriver", "PyTest", "Cucumber (BDD)", "TestNG", "Appium", "Robot Framework"],
  },
  {
    category: "Programming",
    description: "Languages used day to day",
    items: ["Python", "Java"],
  },
  {
    category: "API",
    description: "Backend & service-layer testing",
    items: ["Postman"],
  },
  {
    category: "CI/CD",
    description: "Pipelines & release workflows",
    items: ["Jenkins", "Git", "GitHub", "CI/CD Pipeline Integration"],
  },
  {
    category: "DevOps",
    description: "Deployment, cloud & cluster validation",
    items: ["Kubernetes", "AWS", "Azure", "GCP", "Linux"],
  },
  {
    category: "Database",
    description: "Data & vector store validation",
    items: ["SQL", "MongoDB", "Milvus"],
  },
  {
    category: "GenAI Testing",
    description: "Testing RAG & LLM systems",
    items: [
      "RAG Testing",
      "LLM Testing",
      "Semantic Retrieval",
      "MCP",
      "Query Routing",
      "Guardrail Testing",
      "Hallucination Testing",
      "RBAC",
      "Audit Logging",
      "Multilingual Testing",
      "Redaction Testing",
    ],
  },
];

export type ProjectDetail = {
  id: string;
  name: string;
  domain: string;
  org: string;
  role: string;
  tech: string[];
  testing: string[];
  bullets: string[];
  keyResult: string;
  featured?: boolean;
  /** Short emoji-tagged label shown on the card cover, e.g. "🚀 Enterprise GenAI". */
  badge?: string;
  /** Optional cover image — drop a file into public/projects/ and point here. */
  image?: string;
  /** Optional cover video (muted, loops on hover) — takes priority over `image` when set. */
  video?: string;
};

export const projects: ProjectDetail[] = [
  {
    id: "gaia",
    name: "GAIA — Enterprise RAG-Based GenAI Platform",
    domain: "GenAI / RAG Platform",
    org: "Cohesity",
    role: "QA Automation Engineer",
    tech: ["Playwright", "Go", "Python", "PyTest", "YAML", "JSON", "Jenkins", "Kubernetes", "kubectl", "MobaXterm"],
    testing: ["UI Testing", "API Testing", "RAG Testing", "Guardrail Testing", "Audit Testing", "RBAC Testing", "MCP Testing"],
    bullets: [
      "Worked on GAIA, an enterprise RAG-based GenAI platform enabling natural-language queries over enterprise backup data using semantic indexing, semantic retrieval, and LLM-based response generation.",
      "Built and maintained Playwright automation scripts alongside Go, Python, PyTest, Watchmen, YAML-based suites, JSON, and VanillaGinkgo for regression and scale-test validation, supporting release readiness.",
      "Integrated automated regression suites into Jenkins CI/CD pipelines with Git version control for continuous validation across releases.",
      "Identified and documented 10+ high-impact defects in guardrails, hallucination handling, metadata filters, and audit logging, including UI/backend log-count mismatches, rolling-window data loss, and incorrect modified-entry behavior.",
      "Executed manual, functional, regression, and API testing across dataset creation, document indexing, semantic retrieval, and answer-generation workflows.",
      "Improved Copilot and MCP query-routing accuracy from 46% to 100% across 81 structured test queries through targeted validation and defect analysis.",
      "Performed deployment and upgrade validation on multi-node Kubernetes clusters using kubectl, iris_cli, and MobaXterm.",
      "Prepared a framework-agnostic test plan for scale, performance, stress, and resiliency testing of compliance-critical audit logging features.",
    ],
    keyResult: "MCP query-routing accuracy improved from 46% to 100% across 81 structured test queries.",
    featured: true,
    badge: "🚀 Enterprise GenAI",
  },
  {
    id: "sam-digital",
    name: "SAM+ / Digital",
    domain: "Web / Salesforce / AI Chatbot",
    org: "Nexvant Solutions",
    role: "QE Analyst",
    tech: ["Selenium", "Java", "Cucumber", "Salesforce"],
    testing: ["Functional", "Regression", "Integration", "UAT"],
    bullets: [
      "Supported QA for a digital platform covering product details, Salesforce integration, usage tracking, and AI chatbot workflows.",
      "Executed functional, regression, integration, and user acceptance testing across key business modules.",
      "Built BDD-based automation support using Selenium, Java, and Cucumber to create readable and maintainable test scenarios.",
      "Validated 20+ features and UI fixes, contributing to a 40% drop in UAT rework and smoother releases.",
    ],
    keyResult: "40% drop in UAT rework after validating 20+ features and UI fixes.",
    badge: "💼 Digital Platform",
  },
  {
    id: "allstate",
    name: "Allstate Insurance",
    domain: "Insurance / Automation / API Testing",
    org: "Atos-Syntel",
    role: "Associate Consultant",
    tech: ["Python", "PyTest", "Selenium", "Git", "Jenkins", "Postman", "Requests"],
    testing: ["API Testing", "Functional Testing", "Regression"],
    bullets: [
      "Worked on insurance applications used by agents and policyholders in the car insurance domain.",
      "Built and enhanced automation coverage for end-to-end functional and API testing using Python, PyTest, Selenium, Git, CI/CD, Jenkins, Postman, and Requests.",
      "Developed an automation framework, test scripts, test cases, and test data for insurance application workflows and release cycles.",
      "Applied SDLC and STLC knowledge to test planning, execution, bug reporting, and release support.",
    ],
    keyResult: "90% improvement in API test coverage.",
    badge: "🚗 Insurance Domain",
  },
];

export type BugCard = {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium";
  area: string;
  testingType: string;
  status: "Found & Documented";
  description: string;
  source: string;
};

// Sourced from real GAIA defect findings on the resume — no fabricated incidents.
export const bugBoard: BugCard[] = [
  {
    id: "log-mismatch",
    title: "UI / backend log-count mismatch",
    severity: "High",
    area: "Audit Logging",
    testingType: "Audit Testing",
    status: "Found & Documented",
    description: "Audit log counts shown in the UI did not match the underlying backend record counts.",
    source: "GAIA — Cohesity",
  },
  {
    id: "rolling-window",
    title: "Rolling-window data loss",
    severity: "Critical",
    area: "Audit Logging",
    testingType: "Audit Testing",
    status: "Found & Documented",
    description: "Older audit entries were silently dropped once the rolling window advanced, losing compliance-relevant data.",
    source: "GAIA — Cohesity",
  },
  {
    id: "modified-entry",
    title: "Incorrect modified-entry behavior",
    severity: "Medium",
    area: "Metadata Filters",
    testingType: "Functional / Regression",
    status: "Found & Documented",
    description: "Modified entries were not reflected correctly through the metadata filter layer after an update.",
    source: "GAIA — Cohesity",
  },
  {
    id: "guardrail",
    title: "Guardrail handling gap",
    severity: "Critical",
    area: "Guardrails",
    testingType: "Guardrail Testing",
    status: "Found & Documented",
    description: "One of 10+ high-impact defects identified in guardrail and hallucination-handling behavior during GAIA validation.",
    source: "GAIA — Cohesity",
  },
  {
    id: "query-routing",
    title: "MCP query-routing misroutes",
    severity: "High",
    area: "Query Routing",
    testingType: "MCP Testing",
    status: "Found & Documented",
    description: "Structured test queries surfaced routing failures later fixed, taking Copilot/MCP accuracy from 46% to 100% across 81 queries.",
    source: "GAIA — Cohesity",
  },
];

export const genAiDimensions = [
  { name: "Grounding", description: "Is the response actually backed by retrieved source data?" },
  { name: "Retrieval quality", description: "Did semantic retrieval surface the right context for the query?" },
  { name: "Citation accuracy", description: "Do citations point to the correct underlying documents?" },
  { name: "Hallucination", description: "Does the model state anything not supported by context?" },
  { name: "Guardrails", description: "Do safety and policy guardrails hold under adversarial input?" },
  { name: "Query routing", description: "Is the query routed to the right tool via MCP / Copilot?" },
  { name: "RBAC", description: "Does the response respect the requesting user's permissions?" },
  { name: "Multilingual responses", description: "Does quality hold across supported languages?" },
  { name: "Audit logging", description: "Is every query and response reliably logged for compliance?" },
];

export type ProcessStep = { step: string; detail: string };

export const testingProcess: ProcessStep[] = [
  { step: "Requirement", detail: "Understand the feature, its user flows, and compliance constraints before writing a single test." },
  { step: "Risk Analysis", detail: "Identify the highest-risk paths — compliance-critical features get priority coverage." },
  { step: "Test Design", detail: "Design functional, regression, integration, and edge-case scenarios, BDD-style where it aids readability." },
  { step: "Automation", detail: "Build Playwright / Selenium automation and PyTest suites for repeatable, CI-friendly coverage." },
  { step: "UI/API Validation", detail: "Validate both the interface and the underlying API/data layer, not just the happy path." },
  { step: "Regression", detail: "Run full regression suites to catch breakage introduced by unrelated changes." },
  { step: "CI/CD", detail: "Wire automated execution into Jenkins pipelines with Git-based version control for fast feedback." },
  { step: "Defect Analysis", detail: "Document, triage, and track defects through to resolution, mentoring on RCA where useful." },
  { step: "Release", detail: "Sign off release readiness with test evidence, improving confidence for every deploy." },
];

export type TestPipelineStage = { label: string; detail: string };

export const testPipelineStages: TestPipelineStage[] = [
  { label: "Test Case", detail: "Scenario written from requirements & risk analysis" },
  { label: "Playwright / Selenium", detail: "UI automation executes the scenario across browsers" },
  { label: "API Validation", detail: "Requests / Postman confirm the service layer independently" },
  { label: "PyTest", detail: "Assertions run and results are collected" },
  { label: "Git", detail: "Test code is versioned and reviewed" },
  { label: "Jenkins", detail: "CI/CD pipeline executes the suite automatically" },
  { label: "Test Report", detail: "Results are published for the team" },
  { label: "Defect", detail: "Failures are logged with repro steps" },
  { label: "Release", detail: "Green pipeline supports a confident release" },
];

export const gaiaArchitecture = {
  flow: ["User Query", "Query Routing", "Semantic Retrieval", "RAG", "LLM", "Response", "Validation"],
  testingLayers: ["UI Testing", "API Testing", "RAG Testing", "Guardrail Testing", "Audit Testing", "RBAC Testing", "MCP Testing"],
};

export type Credential = { primary: string; secondary: string };

export const education: Credential[] = [
  { primary: "Bachelor of Technology (B.Tech)", secondary: "R. C. Patel Institute of Technology · 2021 · CGPA 7.1" },
];

export const certifications: Credential[] = [
  { primary: "Selenium WebDriver with Java Framework", secondary: "Udemy" },
  { primary: "Selenium WebDriver with Python Framework", secondary: "Udemy" },
  { primary: "Azure Fundamentals", secondary: "Microsoft" },
];

export const achievements: Credential[] = [
  { primary: "Best Improved Performer of the Year", secondary: "Nexvant Solutions" },
  { primary: "SAM+ Digital Platform delivered with zero major defects", secondary: "in production" },
];

export const navSections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "qa-lab", label: "QA Lab" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
