import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedShapes } from "../ui/animated-shapes";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen bg-background text-center px-4"
    >
      <AnimatedShapes />
      <div className="z-10 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-headline font-semibold text-deep-navy mb-4">
          I build digital futures, innovate solutions, and tell the stories
          behind the code.
        </h1>
        <p className="text-lg md:text-xl text-charcoal mb-8 font-accent italic">
          Developer • Innovator • Content Creator • Author
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#projects">
              View My Work <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="#contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
