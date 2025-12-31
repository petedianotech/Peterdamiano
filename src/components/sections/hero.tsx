
'use client';
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Book, Code } from "lucide-react";
import TypingAnimation from "../ui/typing-animation";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-24 bg-background text-foreground">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center items-start">
                <div className="inline-block bg-accent/10 text-accent text-sm font-semibold py-1.5 px-3 rounded-full mb-4">
                    AVAILABLE FOR NEW PROJECTS
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4 font-headline">Peter Damiano</h1>
                <TypingAnimation />

                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                    Building the intersection of technology and storytelling. I craft robust software solutions and write compelling narratives to help forward-thinking businesses innovate and grow.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-start gap-4 mb-8">
                    <Button size="lg" asChild>
                        <Link href="/projects">
                            View My Work <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="/blog">
                            Read the Blog
                        </Link>
                    </Button>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex -space-x-2">
                        <Image src="https://picsum.photos/seed/client1/40/40" width={32} height={32} alt="client" className="rounded-full border-2 border-background" />
                        <Image src="https://picsum.photos/seed/client2/40/40" width={32} height={32} alt="client" className="rounded-full border-2 border-background" />
                        <Image src="https://picsum.photos/seed/client3/40/40" width={32} height={32} alt="client" className="rounded-full border-2 border-background" />
                    </div>
                    <span>Trusted by 50+ clients worldwide</span>
                </div>
            </div>
            
            <motion.div 
              className="relative hidden md:flex justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="relative w-[380px] h-[500px] bg-card p-4 rounded-2xl shadow-xl border">
                    <Image 
                        src="/profile.jpg"
                        alt="Peter Damiano"
                        fill
                        className="object-cover rounded-xl"
                        priority
                        data-ai-hint="professional headshot"
                    />
                     <motion.div 
                        className="absolute bottom-6 -left-16 bg-card p-3 px-4 rounded-lg shadow-lg border flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                     >
                        <Code className="h-6 w-6 text-accent" />
                        <div>
                            <p className="text-sm text-muted-foreground">Experience</p>
                            <p className="font-bold">10+ Years Dev</p>
                        </div>
                    </motion.div>
                     <motion.div 
                        className="absolute top-6 -right-12 bg-card p-3 px-4 rounded-lg shadow-lg border flex items-center gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                     >
                        <Book className="h-6 w-6 text-accent" />
                        <div>
                            <p className="text-sm text-muted-foreground">Published</p>
                            <p className="font-bold">3 Books</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-muted-foreground text-sm hidden md:block">
            <p>SCROLL</p>
            <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mt-1">
                    <path d="M8 1V15M8 15L1 8M8 15L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </motion.div>
        </div>
    </section>
  );
};

export default Hero;
