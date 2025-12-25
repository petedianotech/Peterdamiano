
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
import { Search, Code, ExternalLink, ArrowRight, Star, FileText, ShoppingCart, Rocket, AppStore } from 'lucide-react';
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
  description: string;
  tags: string[];
  category: string;
  imageUrl: string;
  actions: ProjectAction[];
}

const ProjectCard = ({ project }: { project: Project }) => {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'code': return <Code className="ml-2 h-4 w-4" />;
      case 'star': return <Star className="ml-2 h-4 w-4" />;
      case 'file-text': return <FileText className="ml-2 h-4 w-4" />;
      case 'shopping-cart': return <ShoppingCart className="ml-2 h-4 w-4" />;
      case 'app-store': return <AppStore className="ml-2 h-4 w-4" />;
      case 'rocket': return <Rocket className="ml-2 h-4 w-4" />;
      case 'external-link':
      default:
        return <ExternalLink className="ml-2 h-4 w-4" />;
    }
  };

  return (
    <div className="bg-secondary border border-border rounded-lg flex flex-col group transition-all duration-300 hover:border-primary/50">
        <div className="relative w-full h-52 rounded-t-lg overflow-hidden">
            <Image 
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="dashboard analytics"
            />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                    <span key={tag} className="bg-primary/10 text-primary/80 text-xs font-semibold px-2 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            <div className="flex gap-2 flex-wrap">
                {project.actions.map((action, index) => (
                    <Button key={index} asChild variant={action.variant} size="sm">
                        <Link href={action.url} target="_blank" rel="noopener noreferrer">
                            {action.text}
                            {getIcon(action.icon)}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    </div>
  );
};


export default function ProjectsPage() {
  const firestore = useFirestore();
  const projectsCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'projects') : null), [firestore]);
  const projectsQuery = useMemoFirebase(() => (projectsCollection ? query(projectsCollection, orderBy('title')) : null), [projectsCollection]);
  const { data: allProjects, isLoading, error } = useCollection<Project>(projectsQuery);

  const [searchTerm, setSearchTerm] = useState('');
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
      const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
      const matchesSearch = searchTerm === '' || 
                            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [allProjects, searchTerm, activeFilter]);

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
            <div className="max-w-3xl mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Building the Future.<br /><span className="text-primary">One Project at a Time.</span></h1>
              <p className="text-lg text-muted-foreground">
                Explore my work as a developer, innovator, and content creator. From full-stack applications to AI integrations, here is a collection of my latest builds.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search by technology or keyword..."
                  className="pl-10 h-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap items-center bg-secondary p-1 rounded-lg">
                {filters.map(filter => (
                  <Button 
                    key={filter} 
                    variant={activeFilter === filter ? 'default' : 'ghost'}
                    onClick={() => setActiveFilter(filter)}
                    className="flex-grow md:flex-grow-0"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            {isLoading && (
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="bg-secondary border border-border rounded-lg p-1.5 flex flex-col">
                            <Skeleton className="w-full h-52 rounded-md mb-4" />
                            <div className="p-6 pt-0">
                                <Skeleton className="h-8 w-3/4 mb-2" />
                                <Skeleton className="h-16 w-full mb-4" />
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                    <Skeleton className="h-6 w-24 rounded-full" />
                                </div>
                                <div className="flex gap-2">
                                  <Skeleton className="h-9 w-24" />
                                  <Skeleton className="h-9 w-24" />
                                </div>
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
                    <p className="text-muted-foreground mt-2">Your search and filter combination did not return any results.</p>
                </div>
            )}
            
            {!isLoading && filteredProjects.length > visibleCount && (
              <div className="text-center mt-16">
                <Button onClick={loadMore} size="lg" variant="outline">
                  Load More Projects
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
