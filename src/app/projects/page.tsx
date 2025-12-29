
'use client';
import { useState, useMemo } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Search, Lightbulb, Target, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProjectAction {
  text: string;
  url: string;
  variant: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  icon?: string;
}

interface Project {
  id: string;
  title: string;
  problem: string;
  outcome: string;
  tags: string[];
  category: string;
  imageUrl: string;
  actions: ProjectAction[];
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="bg-card border border-border/80 rounded-2xl flex flex-col group transition-all duration-300 overflow-hidden shadow-sm">
        <div className="relative w-full h-56">
            <Image 
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                data-ai-hint="dashboard analytics"
            />
            <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {project.category}
            </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
            
            <div className="space-y-4 mb-6 flex-grow">
                <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-semibold text-sm">Problem</p>
                        <p className="text-muted-foreground text-sm">{project.problem}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-semibold text-sm">Outcome</p>
                        <p className="text-muted-foreground text-sm">{project.outcome}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                    <span key={tag} className="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-full border border-border/80">{tag}</span>
                ))}
            </div>

            {project.actions.length > 0 && (
                <Button asChild variant={project.actions[0].variant} size="lg" className="w-full mt-auto">
                    <Link href={project.actions[0].url} target="_blank" rel="noopener noreferrer">
                        {project.actions[0].text}
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            )}
        </div>
    </div>
  );
};


export default function ProjectsPage() {
  const firestore = useFirestore();
  const projectsCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'projects') : null), [firestore]);
  const projectsQuery = useMemoFirebase(() => (projectsCollection ? query(projectsCollection, orderBy('title')) : null), [projectsCollection]);
  const { data: allProjects, isLoading, error } = useCollection<Project>(projectsQuery);

  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const filters = useMemo(() => {
    if (!allProjects) return ['All'];
    const categories = new Set(allProjects.map(p => p.category));
    return ['All', ...Array.from(categories)];
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    if (!allProjects) return [];
    return allProjects.filter(project => {
      return activeFilter === 'All' || project.category === activeFilter;
    });
  }, [allProjects, activeFilter]);

  const projectsToShow = filteredProjects.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-24 md:pt-32">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Featured Work</h1>
              <p className="text-lg text-muted-foreground">
                A collection of my projects, from full-stack applications to content creation. Each piece is a story of a problem solved and a goal achieved.
              </p>
            </div>

            <div className="flex justify-center gap-2 flex-wrap items-center mb-12">
                {filters.map(filter => (
                  <Button 
                    key={filter} 
                    variant={activeFilter === filter ? 'default' : 'outline'}
                    onClick={() => setActiveFilter(filter)}
                    className="capitalize"
                  >
                    {filter}
                  </Button>
                ))}
            </div>

            {isLoading && (
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="bg-card border border-border/80 rounded-2xl flex flex-col shadow-sm">
                            <Skeleton className="w-full h-56 rounded-t-2xl" />
                            <div className="p-6">
                                <Skeleton className="h-8 w-3/4 mb-4" />
                                <div className="space-y-4 mb-6">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                    <Skeleton className="h-6 w-24 rounded-full" />
                                </div>
                                <Skeleton className="h-12 w-full" />
                            </div>
                        </div>
                    ))}
                 </div>
            )}
            
            {error && <p className="text-center text-destructive">Failed to load projects. Please try again later.</p>}

            {!isLoading && filteredProjects.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsToShow.map((project) => (
                       <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
            
            {!isLoading && filteredProjects.length === 0 && (
                 <div className="text-center py-20 border-2 border-dashed rounded-lg">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">No Projects Found</h3>
                    <p className="text-muted-foreground mt-2">Your filter combination did not return any results.</p>
                </div>
            )}
            
            {!isLoading && filteredProjects.length > visibleCount && (
              <div className="text-center mt-16">
                <Button onClick={loadMore} size="lg">
                  Load More Work
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
