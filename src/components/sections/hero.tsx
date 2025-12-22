'use client';
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";
import TypingAnimation from "../ui/typing-animation";

interface SiteSettings {
  profileImageUrl?: string;
}

const Hero = () => {
  const firestore = useFirestore();
  const settingsRef = useMemoFirebase(() => firestore ? doc(firestore, 'site_settings', 'profile') : null, [firestore]);
  const { data: settings, isLoading } = useDoc<SiteSettings>(settingsRef);
  
  const profileImageUrl = settings?.profileImageUrl || "https://i.ibb.co/qFph6X9/IMG-3078.jpg";

  return (
    <section id="home" className="relative flex items-center justify-center h-screen bg-background text-foreground">
        {isLoading ? (
            <Skeleton className="absolute inset-0 w-full h-full" />
        ) : (
            <Image
                src={profileImageUrl}
                alt="Peter Damiano"
                fill
                className="object-cover"
                data-ai-hint="profile background"
                priority
            />
        )}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />

      <div className="relative z-10 text-center px-4 flex flex-col items-center max-w-3xl">
        <TypingAnimation />
        <p className="mx-auto text-lg md:text-xl text-primary-foreground/80 mb-8">
          Innovator, Author, Content Creator, and Software Engineer transforming complex problems into elegant digital experiences.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="#projects">
              View My Work <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
