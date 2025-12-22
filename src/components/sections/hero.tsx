'use client';
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import TypingAnimation from "../ui/typing-animation";

const Hero = () => {
  const profileImageUrl = "https://i.ibb.co/qFph6X9/IMG-3078.jpg";

  return (
    <section id="home" className="h-screen bg-background text-foreground grid md:grid-cols-2">
      <div className="flex flex-col justify-center items-start p-8 md:p-16">
        <div className="max-w-xl">
            <TypingAnimation />
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Innovator, Author, Content Creator, and Software Engineer transforming complex problems into elegant digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-start gap-4">
              <Button size="lg" asChild>
                  <Link href="#projects">
                    View My Work <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                  {/* Note: Update this href to your actual resume file */}
                  <a href="/peter-damiano-cv.pdf" download>
                    Download CV <Download className="ml-2 h-5 w-5" />
                  </a>
              </Button>
            </div>
        </div>
      </div>
      <div className="relative hidden md:block">
        <Image
            src={profileImageUrl}
            alt="Peter Damiano"
            fill
            className="object-cover"
            data-ai-hint="profile background"
            priority
        />
      </div>
    </section>
  );
};

export default Hero;
