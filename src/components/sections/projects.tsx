'use client';
import { Button } from "../ui/button";
import { ArrowRight, Briefcase, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, limit } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import placeholderImages from '@/lib/placeholder-images.json';

interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    projectUrl: string;
    imageUrl: string;
}

const Projects = () => {
    const firestore = useFirestore();
    const projectsCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'projects') : null), [firestore]);
    const projectsQuery = useMemoFirebase(() => (projectsCollection ? query(projectsCollection, limit(2)) : null), [projectsCollection]);
    const { data: projects, isLoading, error } = useCollection<Project>(projectsQuery);

    const projectPlaceholders = placeholderImages.projects;

  return (
    <section id="projects" className="py-20 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold">
                Featured Projects
                </h2>
                <p className="text-lg text-muted-foreground mt-2">
                    A selection of my recent technical work.
                </p>
            </div>
            <Button variant="link" asChild>
                <Link href="/projects">
                    View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>

        {isLoading && (
            <div className="grid md:grid-cols-2 gap-8">
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="bg-card border border-border rounded-lg p-1.5 flex flex-col">
                        <Skeleton className="w-full h-60 rounded-md mb-4" />
                        <div className="p-4 pt-0">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-24 rounded-full" />
                            </div>
                            <Skeleton className="h-8 w-3/4 mb-2" />
                            <Skeleton className="h-12 w-full mb-4" />
                            <Skeleton className="h-6 w-28" />
                        </div>
                    </div>
                ))}
            </div>
        )}

        {error && <p className="text-center text-destructive">Failed to load projects. Please try again later.</p>}
        
        {!isLoading && projects && (
            <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
                <div key={project.id} className="bg-card border border-border rounded-lg p-1.5 flex flex-col group transition-all duration-300 hover:border-primary/50">
                    <div className="relative w-full h-60 rounded-md overflow-hidden mb-4">
                        <Image 
                            src={project.imageUrl || (projectPlaceholders[index] ? projectPlaceholders[index].url : placeholderImages.default.url)}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={projectPlaceholders[index] ? projectPlaceholders[index].hint : placeholderImages.default.hint}
                        />
                    </div>
                    <div className="p-4 pt-0 flex flex-col flex-grow">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-primary/80 text-xs font-semibold">{tag}</span>
                            ))}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                            {project.description}
                        </p>
                        <Button variant="link" asChild className="p-0 self-start text-foreground hover:text-primary">
                            <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                                View Source <ExternalLink className="ml-2 h-4 w-4" />
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
