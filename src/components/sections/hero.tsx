import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center bg-background text-foreground pt-20">
      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-semibold mb-4 leading-tight tracking-tighter">
          I build digital futures, innovate solutions, and tell the stories behind the code.
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
          A passionate software engineer transforming complex problems into elegant digital experiences.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="#projects">
              View My Work <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="secondary">
            <Download className="mr-2 h-5 w-5" />
            Download CV
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
