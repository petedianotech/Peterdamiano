import About from "@/components/sections/about";
import Blog from "@/components/sections/blog";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Roles from "@/components/sections/roles";

export default function Home() {
  return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Hero />
          <Roles />
          <Projects />
          <Blog />
          {/* The About and Contact sections from your previous design are not present in the new design.
              They are still available if you wish to re-integrate them later.
          <About />
          <Contact />
          */}
        </main>
        <Footer />
      </div>
  );
}
