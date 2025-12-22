'use client';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Calendar, User } from 'lucide-react';
import { notFound } from 'next/navigation';


interface BlogArticle {
  id: string;
  title: string;
  content: string;
  publicationDate: string;
  author: string;
  imageUrl?: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const firestore = useFirestore();
  const articleRef = useMemoFirebase(() => (firestore && slug ? doc(firestore, 'blog_articles', slug) : null), [firestore, slug]);
  const { data: article, isLoading, error } = useDoc<BlogArticle>(articleRef);
  
  if (!isLoading && !article && slug) {
    notFound();
  }


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-24 md:pt-32">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {isLoading && (
                <div>
                  <Skeleton className="h-12 w-3/4 mb-4" />
                  <div className="flex items-center gap-4 mb-8">
                     <Skeleton className="h-5 w-48" />
                     <Skeleton className="h-5 w-32" />
                  </div>
                  <Skeleton className="h-96 w-full" />
                </div>
              )}

              {error && <p className="text-center text-destructive">Could not load the article. Please try again.</p>}

              {article && (
                <article>
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{article.title}</h1>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground mb-8 text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Published on {format(new Date(article.publicationDate), 'PPP')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>By {article.author}</span>
                    </div>
                  </div>
                  
                  {/* Using dangerouslySetInnerHTML because content is trusted HTML from Firestore */}
                  <div 
                    className="prose dark:prose-invert max-w-none text-foreground text-lg leading-relaxed" 
                    dangerouslySetInnerHTML={{ __html: article.content }} 
                   />
                </article>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
