'use client';
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {

  return (
    <section id="home" className="py-32 md:py-40 bg-background text-foreground">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center items-start">
                <div className="inline-block bg-primary/10 text-primary text-sm font-semibold py-1 px-3 rounded-full mb-4">
                    Available for Hire
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Peter Damiano</h1>
                <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-6">
                    Developer • Innovator • Creator • Author
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                    I bridge the gap between technical execution and creative storytelling. With a passion for innovation, I build robust software solutions while sharing knowledge through content creation and writing.
                </p>
                <div className="flex flex-col sm:flex-row justify-start gap-4">
                <Button size="lg" asChild>
                    <Link href="#projects">
                        Explore My Work
                    </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <a href="/peter-damiano-cv.pdf" download>
                        View Resume
                    </a>
                </Button>
                </div>
            </div>
            <div className="relative hidden md:flex justify-center items-center">
                <div className="w-[350px] h-[450px] bg-gradient-to-br from-gray-700/20 via-gray-800/20 to-cyan-500/10 p-2 rounded-2xl shadow-2xl">
                    <div className="w-full h-full bg-background rounded-xl">
                        {/* Placeholder for image */}
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero;
