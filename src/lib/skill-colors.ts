// Official brand colors for tools that have a genuine, recognizable brand color.
// Deliberately excluded: GitHub, whose real brand mark is near-black and would be
// invisible or wrong-looking on a dark card — stays theme-adaptive instead of being
// forced into a color that isn't actually theirs. Azure/Microsoft is also excluded since
// its icon here is the general four-color Microsoft mark, not a single-color Azure brand.
export const skillColors: Record<string, string> = {
  "Selenium WebDriver": "#43B02A",
  Python: "#3776AB",
  Postman: "#FF6C37",
  Jenkins: "#D24939",
  Git: "#F03C2E",
  Kubernetes: "#326CE5",
  MongoDB: "#47A248",
  "Cucumber (BDD)": "#23D96C",
  Appium: "#EE376D",
  PyTest: "#0A9EDC",
  GCP: "#4285F4",
  Linux: "#FCC624",
  Java: "#ED8B00",
  AWS: "#FF9900",
};
