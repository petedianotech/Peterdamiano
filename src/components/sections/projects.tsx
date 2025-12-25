
'use client';
import { Button } from "../ui/button";
import { ArrowRight, Briefcase, ExternalLink, Code } from "lucide-react";
import Link from "next/link";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, limit, orderBy } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import placeholderImages from '@/lib/placeholder-images.json';

interface ProjectAction {
    text: string;
    url: string;
    variant: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
    icon?: string;
}
  
interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    actions: ProjectAction[];
}

const Projects = () => {
    const firestore = useFirestore();
    const projectsCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'projects') : null), [firestore]);
    const projectsQuery = useMemoFirebase(() => (projectsCollection ? query(projectsCollection, orderBy('title'), limit(2)) : null), [projectsCollection]);
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
                             <Skeleton className="h-8 w-3/4 mb-2" />
                            <Skeleton className="h-12 w-full mb-4" />
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-24 rounded-full" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-9 w-28" />
                                <Skeleton className="h-9 w-28" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {error && <p className="text-center text-destructive">Failed to load projects. Please try again later.</p>}
        
        {!isLoading && projects && projects.length > 0 && (
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
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map(tag => (
                                <span key={tag} className="bg-primary/10 text-primary/80 text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                        <div className="flex gap-2 flex-wrap mt-auto">
                            {project.actions.map((action, idx) => (
                                <Button key={idx} asChild variant={action.variant} size="sm">
                                    <Link href={action.url} target="_blank" rel="noopener noreferrer">
                                        {action.text}
                                        {action.icon === 'code' ? <Code className="ml-2 h-4 w-4" /> : <ExternalLink className="ml-2 h-4 w-4" />}
                                    </Link>
                                </Button>
                            ))}
                        </div>
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
