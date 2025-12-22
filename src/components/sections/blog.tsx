'use client';
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, BookText } from "lucide-react";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";
import { format } from 'date-fns';

interface BlogArticle {
  id: string;
  title: string;
  content: string;
  publicationDate: string;
  slug: string; // Assuming slug is part of the data
}

const Blog = () => {
  const firestore = useFirestore();
  const articlesCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'blog_articles') : null), [firestore]);
  const articlesQuery = useMemoFirebase(() => (articlesCollection ? query(articlesCollection, orderBy('publicationDate', 'desc'), limit(3)) : null), [articlesCollection]);
  const { data: blogPosts, isLoading, error } = useCollection<BlogArticle>(articlesQuery);

  const getSummary = (htmlContent: string) => {
    if (!htmlContent) return '';
    const text = htmlContent.replace(/<[^>]+>/g, '');
    return text.length > 100 ? text.substring(0, 97) + '...' : text;
  }

  return (
    <section id="blog" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
            <BookText className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold">
            From My Blog
            </h2>
             <p className="text-lg text-muted-foreground mt-2">
                I write about technology, innovation, and creative pursuits. Here are some of my latest articles.
            </p>
        </div>
        
        {isLoading && (
            <div className="grid md:grid-cols-3 gap-8">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="bg-card border rounded-lg p-6 flex flex-col">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-6 w-full mb-3" />
                        <Skeleton className="h-16 w-full mb-4" />
                        <Skeleton className="h-6 w-28 mt-auto" />
                    </div>
                ))}
            </div>
        )}
        {error && <p className="text-center text-destructive">Failed to load blog posts. Please try again later.</p>}
        {!isLoading && blogPosts && (
            <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="bg-card border rounded-lg flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2"
                >
                  <div className="p-6 flex-grow flex flex-col">
                      <p className="text-sm text-muted-foreground mb-2">{format(new Date(post.publicationDate), 'PPP')}</p>
                      <h3 className="font-bold text-xl mb-3 flex-grow">{post.title}</h3>
                      <p className="text-muted-foreground mb-4 text-sm">{getSummary(post.content)}</p>
                      <Button variant="link" asChild className="p-0 self-start mt-auto">
                        <Link href={`/blog/${post.id}`}>
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                  </div>
                </div>
            ))}
            </div>
        )}
         {!isLoading && blogPosts?.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <BookText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold">The Blog is Quiet... For Now</h3>
                <p className="text-muted-foreground mt-2">New articles are being drafted. Stay tuned!</p>
            </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
