'use client';
import { Button } from "../ui/button";
import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
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
    <section id="projects" className="py-20 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
            <Briefcase className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold">
            Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
                A selection of projects that showcase my passion for building useful and innovative solutions.
            </p>
        </div>

        {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="bg-card border rounded-lg p-6 flex flex-col">
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
                <div key={project.id} className="bg-card border rounded-lg p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                        <span key={tag} className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
                    ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                    {project.description}
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                    <Button asChild>
                        <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                        View Project <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    </div>
                </div>
            ))}
            </div>
        )}
        
        {!isLoading && projects?.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold">No Projects Yet</h3>
                <p className="text-muted-foreground mt-2">Exciting projects are in the works. Check back soon!</p>
            </div>
        )}

      </div>
    </section>
  );
};

export default Projects;
