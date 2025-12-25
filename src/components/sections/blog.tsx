'use client';
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, BookText, Newspaper } from "lucide-react";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { Skeleton } from "../ui/skeleton";
import { format } from 'date-fns';
import Image from "next/image";
import placeholderImages from '@/lib/placeholder-images.json';

interface Book {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  purchaseUrl: string;
}

const Blog = () => {
  const firestore = useFirestore();
  const booksCollection = useMemoFirebase(() => (firestore ? collection(firestore, 'books') : null), [firestore]);
  const booksQuery = useMemoFirebase(() => (booksCollection ? query(booksCollection, limit(1)) : null), [booksCollection]);
  const { data: books, isLoading, error } = useCollection<Book>(booksQuery);

  const book = books?.[0];

  return (
    <section id="blog" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {isLoading && (
            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                    <Skeleton className="h-4 w-48 mb-4" />
                    <Skeleton className="h-10 w-full mb-4" />
                    <Skeleton className="h-20 w-full mb-6" />
                    <Skeleton className="h-8 w-40" />
                </div>
                <div className="w-full md:w-1/3 flex justify-center">
                    <Skeleton className="h-80 w-60" />
                </div>
            </div>
        )}
        
        {error && <p className="text-center text-destructive">Failed to load publication. Please try again later.</p>}

        {!isLoading && book && (
             <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-4">
                        <Newspaper className="h-4 w-4" />
                        LATEST PUBLICATION
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{book.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6 max-w-prose">{book.description}</p>
                    <Button variant="link" asChild className="p-0 text-lg text-primary">
                        <Link href={book.purchaseUrl} target="_blank" rel="noopener noreferrer">
                            Read Chapter One <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
                <div className="w-full md:w-1/3 flex justify-center">
                    <div className="relative w-60 h-80 shadow-2xl rounded-lg">
                        <Image
                            src={book.coverImageUrl || placeholderImages.book.url}
                            alt={book.title}
                            fill
                            className="object-cover rounded-lg"
                            data-ai-hint={placeholderImages.book.hint}
                        />
                    </div>
                </div>
            </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
