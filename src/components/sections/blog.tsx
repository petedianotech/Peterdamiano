'use client';
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedCard } from "../ui/animated-section";
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
  const articlesCollection = useMemoFirebase(() => collection(firestore, 'blog_articles'), [firestore]);
  const articlesQuery = useMemoFirebase(() => query(articlesCollection, orderBy('publicationDate', 'desc'), limit(3)), [articlesCollection]);
  const { data: blogPosts, isLoading, error } = useCollection<BlogArticle>(articlesQuery);

  const getSummary = (htmlContent: string) => {
    if (!htmlContent) return '';
    const text = htmlContent.replace(/<[^>]+>/g, '');
    return text.length > 100 ? text.substring(0, 97) + '...' : text;
  }

  return (
    <section id="blog" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          From My Blog
        </h2>
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
                <AnimatedCard 
                  key={post.id} 
                  index={index} 
                  className="bg-card border rounded-lg flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
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
                </AnimatedCard>
            ))}
            </div>
        )}
         {!isLoading && blogPosts?.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold">The Blog is Quiet... For Now</h3>
                <p className="text-muted-foreground mt-2">New articles are being drafted. Stay tuned!</p>
            </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
