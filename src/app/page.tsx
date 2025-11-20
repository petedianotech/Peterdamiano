import About from "@/components/sections/about";
import Blog from "@/components/sections/blog";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import ClientSideProvider from "@/firebase/client-side-provider";

export default function Home() {
  return (
    <ClientSideProvider>
      <div className="flex flex-col min-h-screen bg-light-ivory">
        <Header />
        <main className="flex-1">
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </ClientSideProvider>
  );
}
