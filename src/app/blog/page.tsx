'use client';
import { useState, useMemo } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlogSidebar from '@/components/sections/blog-sidebar';

interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  publicationDate: string;
  author: string;
  tags: string[];
  imageUrl?: string;
  readTimeInMinutes?: number;
}

const FeaturedArticleCard = ({ article }: { article: BlogArticle }) => (
  <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden mb-12">
    <div className="relative h-64 md:h-80 w-full">
      <Image
        src={article.imageUrl || 'https://picsum.photos/seed/future-code/1200/600'}
        alt={article.title}
        fill
        className="object-cover"
        data-ai-hint="women working on laptop"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <span className="text-xs font-bold uppercase tracking-wider bg-accent/80 text-accent-foreground px-2 py-1 rounded mb-2 inline-block">
          {article.tags?.[0] || 'Development'}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
          <Link href={`/blog/${article.id}`} className="hover:underline">
            Featured Article: {article.title}
          </Link>
        </h2>
        <p className="text-primary-foreground/80 mt-2 max-w-2xl hidden md:block">{article.summary}</p>
      </div>
    </div>
    <div className="p-6 bg-card flex justify-between items-center">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(article.publicationDate), 'MMM d, yyyy')}</span>
        </div>
        {article.readTimeInMinutes && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{article.readTimeInMinutes} min read</span>
          </div>
        )}
      </div>
      <Link href={`/blog/${article.id}`} className="text-primary font-semibold flex items-center gap-2 text-sm">
        Read Article <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </div>
);

const ArticleCard = ({ article }: { article: BlogArticle }) => (
  <div className="py-8 border-b border-border">
    <div className="flex items-center gap-4 text-sm mb-2">
      <span className="text-primary font-semibold uppercase tracking-wider">{article.tags?.[0] || 'General'}</span>
      <span className="text-muted-foreground">{format(new Date(article.publicationDate), 'MMM d, yyyy').toUpperCase()}</span>
    </div>
    <h3 className="text-2xl font-bold mb-2">
      <Link href={`/blog/${article.id}`} className="hover:text-primary transition-colors">
        {article.title}
      </Link>
    </h3>
    <p className="text-muted-foreground mb-4">{article.summary}</p>
    <div className="flex justify-between items-center">
       {article.readTimeInMinutes && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{article.readTimeInMinutes} min read</span>
          </div>
        )}
      <Link href={`/blog/${article.id}`} className="text-primary font-semibold text-sm hover:underline">
        Read full story
      </Link>
    </div>
  </div>
);


export default function BlogPage() {
  const firestore = useFirestore();
  const articlesCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'blog_articles') : null), [firestore]);
  const articlesQuery = useMemoFirebase(() => (articlesCollection ? query(articlesCollection, orderBy('publicationDate', 'desc')) : null), [articlesCollection]);
  const { data: articles, isLoading, error } = useCollection<BlogArticle>(articlesQuery);
  
  const [visibleCount, setVisibleCount] = useState(5); // 1 featured + 4 standard

  const featuredArticle = articles?.[0];
  const remainingArticles = articles?.slice(1);
  
  const articlesToShow = remainingArticles?.slice(0, visibleCount -1);

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-24 md:pt-32">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-left mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">Thoughts & Insights</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Exploring the intersection of technology, creativity, and efficient living.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {isLoading && (
                <div>
                  <Skeleton className="h-96 w-full mb-12" />
                  <Skeleton className="h-32 w-full mb-8" />
                  <Skeleton className="h-32 w-full mb-8" />
                </div>
              )}
              {error && <p className="text-destructive text-center">Failed to load articles.</p>}
              
              {featuredArticle && <FeaturedArticleCard article={featuredArticle} />}

              {articlesToShow?.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}

              {!isLoading && articles && articles.length === 0 && (
                <p className="text-muted-foreground text-center py-16">No articles published yet. Stay tuned!</p>
              )}
              
              {!isLoading && remainingArticles && remainingArticles.length > (visibleCount - 1) && (
                <div className="text-center mt-12">
                    <Button variant="outline" onClick={loadMore}>Load More Articles</Button>
                </div>
              )}

            </div>
            <aside className="lg:col-span-1">
              <BlogSidebar />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
