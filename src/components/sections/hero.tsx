'use client';
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section id="home" className="relative flex flex-col justify-center bg-background text-foreground pt-24 pb-20 md:pt-32 md:pb-24">
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        <div className="mb-8">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary via-primary/70 to-accent p-1 shadow-lg">
               <Image
                    src="https://picsum.photos/seed/profile/200/200"
                    alt="Peter Damiano"
                    data-ai-hint="profile picture"
                    width={160}
                    height={160}
                    className="rounded-full w-full h-full object-cover"
                    priority
                />
            </div>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-semibold mb-4 leading-tight tracking-tighter">
          I build digital futures, innovate solutions, and tell the stories behind the code.
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
          Innovator, Author, Content Creator, and Software Engineer transforming complex problems into elegant digital experiences.
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
