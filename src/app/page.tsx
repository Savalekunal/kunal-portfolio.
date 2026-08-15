import { Nav } from "@/components/nav";
import { PageShell } from "@/components/page-shell";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { QaLab } from "@/components/sections/qa-lab";
import { Credentials } from "@/components/sections/credentials";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <PageShell>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <ExperienceSection />
        <Skills />
        <Projects />
        <QaLab />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </PageShell>
  );
}
