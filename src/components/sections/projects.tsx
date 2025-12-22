'use client';
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedCard } from "../ui/animated-section";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    projectUrl: string;
}

const Projects = () => {
    const firestore = useFirestore();
    const projectsCollection = useMemoFirebase(() => collection(firestore, 'projects'), [firestore]);
    const projectsQuery = useMemoFirebase(() => query(projectsCollection), [projectsCollection]);
    const { data: projects, isLoading, error } = useCollection<Project>(projectsQuery);


  return (
    <section id="projects" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Projects
        </h2>

        {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="bg-accent/50 p-8 rounded-lg shadow-md flex flex-col">
                        <Skeleton className="h-8 w-3/4 mb-4" />
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </div>
                        <Skeleton className="h-24 w-full mb-6" />
                        <Skeleton className="h-11 w-36" />
                    </div>
                ))}
            </div>
        )}

        {error && <p className="text-center text-destructive">Failed to load projects. Please try again later.</p>}
        
        {!isLoading && projects && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <AnimatedCard key={project.id} index={index} className="bg-accent/50 p-8 rounded-lg shadow-md flex flex-col">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                        <span key={tag} className="bg-primary/20 text-primary text-sm font-medium px-3 py-1 rounded-full">{tag}</span>
                    ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                    {project.description}
                    </p>
                    <div className="flex items-center gap-4">
                    <Button asChild>
                        <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                        View Live <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    </div>
                </AnimatedCard>
            ))}
            </div>
        )}
        
        {!isLoading && projects?.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold">No Projects Yet</h3>
                <p className="text-muted-foreground mt-2">Exciting projects are in the works. Check back soon!</p>
            </div>
        )}

      </div>
    </section>
  );
};

export default Projects;
