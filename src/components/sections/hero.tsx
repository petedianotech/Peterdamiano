'use client';
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

// A placeholder user ID, assuming only one admin.
// In a real multi-user system, this would come from the authenticated user's session.
const ADMIN_USER_ID = "gHZ9n7s2b9X8fJ2kP3s5t8YxVOE2"; // This should be the UID of the first admin.

interface AdminProfile {
    profileImageUrl?: string;
}

const Hero = () => {
  const firestore = useFirestore();
  
  // This is a simplified way to get the admin's profile. 
  // We assume a single admin and need a way to identify their document.
  // The first user who registers gets their UID stored, and we'd use that here.
  // For this example, we'll need to find a reliable way to get the admin's UID.
  // Let's assume we can get it, for now.
  // A better approach might be to query the roles_admin collection and get the first (and only) doc.
  // For now, let's assume we can get the admin doc to fetch the URL.
  // The user will need to provide their actual admin UID or we query for it.
  
  // Let's just create a dummy path for now, as we don't have the UID.
  // This will be updated once we fetch the actual admin doc.
  // We will need to query the collection to get the single admin document.
  // This is a simplification. A more robust solution would be to get the admin user's UID.

  return (
    <section id="home" className="relative flex flex-col justify-center bg-background text-foreground pt-32 pb-20 md:pt-40 md:pb-24">
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        <div className="mb-8">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary via-primary/70 to-accent p-1 shadow-lg">
               <Image
                    src="https://picsum.photos/seed/profile/200/200"
                    alt="Peter Damiano"
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
