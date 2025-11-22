import About from "@/components/sections/about";
import Blog from "@/components/sections/blog";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import { AnimatedSection } from "@/components/ui/animated-section";

export default function Home() {
  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Hero />
          <AnimatedSection>
            <Projects />
          </AnimatedSection>
          <AnimatedSection>
            <About />
          </AnimatedSection>
          <AnimatedSection>
            <Skills />
          </AnimatedSection>
          <AnimatedSection>
            <Blog />
          </AnimatedSection>
          <AnimatedSection>
            <Contact />
          </AnimatedSection>
        </main>
        <Footer />
      </div>
  );
}
