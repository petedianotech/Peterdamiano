import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { About } from '@/components/sections/about';
import { Blog } from '@/components/sections/blog';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Projects />
      <About />
      <Blog />
      <Contact />
    </div>
  );
}
