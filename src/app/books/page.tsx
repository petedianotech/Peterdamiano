'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BookOpen, FileText, Download, Edit3, Mail } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Newsletter from '@/components/sections/newsletter';
import { format } from 'date-fns';

interface Book {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  purchaseUrl: string;
  excerptUrl?: string;
  publicationDate: string;
}

interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  publicationDate: string;
  tags: string[];
  imageUrl?: string;
}

interface TechnicalGuide {
    id: string;
    title: string;
    description: string;
    downloadUrl: string;
}

interface InProgressProject {
    id: string;
    title: string;
    description: string;
    status: string;
    progress: number;
}

const NewReleaseSection = () => {
    const firestore = useFirestore();
    const booksCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'books') : null), [firestore]);
    const bookQuery = useMemoFirebase(() => (booksCollection ? query(booksCollection, orderBy('publicationDate', 'desc'), limit(1)) : null), [booksCollection]);
    const { data: books, isLoading, error } = useCollection<Book>(bookQuery);
    const book = books?.[0];

    if (isLoading) return <Skeleton className="h-[250px] w-full" />;
    if (error) return <p className="text-destructive">Could not load the latest release.</p>;
    if (!book) return null;

    return (
        <div className="bg-card border border-border/80 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 mb-20">
            <div className="relative w-48 h-64 flex-shrink-0">
                <Image 
                    src={book.coverImageUrl}
                    alt={book.title}
                    fill
                    className="object-cover rounded-md shadow-lg"
                    data-ai-hint="book cover"
                />
            </div>
            <div className="flex-grow">
                <p className="text-sm font-semibold text-primary mb-1">
                    NEW RELEASE &bull; {format(new Date(book.publicationDate), 'MMMM yyyy')}
                </p>
                <h2 className="text-3xl font-bold mb-3">{book.title}</h2>
                <p className="text-muted-foreground mb-6 max-w-prose">{book.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild>
                        <Link href={book.purchaseUrl} target="_blank" rel="noopener noreferrer">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Buy on Amazon
                        </Link>
                    </Button>
                    {book.excerptUrl && (
                        <Button asChild variant="outline">
                            <Link href={book.excerptUrl} target="_blank" rel="noopener noreferrer">
                                Read Excerpt
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
};

const SelectedEssaysSection = () => {
    const firestore = useFirestore();
    const articlesCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'blog_articles') : null), [firestore]);
    const articlesQuery = useMemoFirebase(() => (articlesCollection ? query(articlesCollection, orderBy('publicationDate', 'desc'), limit(3)) : null), [articlesCollection]);
    const { data: articles, isLoading, error } = useCollection<BlogArticle>(articlesQuery);
    
    return (
        <div className="mb-20">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Selected Essays</h2>
                <Button variant="link" asChild>
                    <Link href="/blog">View Archive <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
            </div>
            {isLoading && (
                <div className="grid md:grid-cols-3 gap-8">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            )}
            {error && <p className="text-destructive">Could not load essays.</p>}
            <div className="grid md:grid-cols-3 gap-8">
                {articles?.map(article => (
                    <Link href={`/blog/${article.id}`} key={article.id} className="group">
                        <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4 border">
                            <Image 
                                src={article.imageUrl || `https://picsum.photos/seed/${article.id}/400/300`}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint="abstract design"
                            />
                        </div>
                        <p className="text-sm font-medium text-primary uppercase tracking-wide">
                            {article.tags[0] || 'General'} &bull; {format(new Date(article.publicationDate), 'MMM d, yyyy')}
                        </p>
                        <h3 className="text-xl font-bold mt-1 group-hover:underline">{article.title}</h3>
                        <p className="text-muted-foreground mt-2 text-sm">{article.summary}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

const TechnicalGuidesSection = () => {
    const firestore = useFirestore();
    const guidesCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'technical_guides') : null), [firestore]);
    const { data: guides, isLoading, error } = useCollection<TechnicalGuide>(guidesCollection);
    
    if (isLoading || !guides || guides.length === 0) return null;
    if (error) return <p className="text-destructive">Could not load technical guides.</p>;

    return (
        <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Technical Guides & Resources</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {guides.map(guide => (
                    <div key={guide.id} className="bg-card border border-border/80 rounded-2xl p-6 flex items-start gap-6">
                        <div className="bg-primary/10 p-3 rounded-lg mt-1">
                            <FileText className="h-6 w-6 text-primary"/>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">{guide.title}</h3>
                            <p className="text-muted-foreground mt-1 mb-4">{guide.description}</p>
                            <Button variant="link" asChild className="p-0 font-semibold">
                                <Link href={guide.downloadUrl} target="_blank" rel="noopener noreferrer">
                                    DOWNLOAD PDF <Download className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const InProgressSection = () => {
    const firestore = useFirestore();
    const projectsCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'in_progress_projects') : null), [firestore]);
    const { data: projects, isLoading, error } = useCollection<InProgressProject>(projectsCollection);
    
    if (isLoading || !projects || projects.length === 0) return null;
    if (error) return <p className="text-destructive">Could not load in-progress projects.</p>;
    const project = projects[0];

    return (
        <div className="mb-20">
             <h2 className="text-3xl font-bold mb-8">In Progress</h2>
             <div className="bg-card border border-border/80 rounded-2xl p-8">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <div className="flex items-center gap-2 bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1 rounded-full border border-border/80">
                        <Edit3 className="h-4 w-4" />
                        {project.status}
                    </div>
                </div>
                <p className="text-muted-foreground mb-4 max-w-prose">{project.description}</p>
                <Progress value={project.progress} className="w-full" />
                <p className="text-right text-sm text-muted-foreground mt-2">{project.progress}% Complete</p>
             </div>
        </div>
    )
}


export default function PublicationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-24 md:pt-32">
        <section id="publications" className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Publications</h1>
              <p className="text-lg text-muted-foreground">
                Exploring the intersection of technology, humanity, and design. A collection of books, essays, and technical guides crafted to clarify the complex.
              </p>
            </div>
            
            <NewReleaseSection />
            <SelectedEssaysSection />
            <TechnicalGuidesSection />
            <InProgressSection />

            <Newsletter />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
