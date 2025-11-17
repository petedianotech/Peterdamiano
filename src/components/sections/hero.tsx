import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white pt-20">
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-50"
          data-ai-hint="futuristic abstract background"
        />
      </div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-semibold text-white mb-4 leading-tight tracking-tighter">
          I build digital futures, innovate solutions, and tell the stories behind the code.
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-200 mb-8">
          A passionate software engineer transforming complex problems into elegant digital experiences.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="#projects">
              View My Work <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-deep-navy">
            <Download className="mr-2 h-5 w-5" />
            Download CV
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
