'use client';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  purchaseUrl: string;
}

export default function BooksPage() {
  const firestore = useFirestore();
  const booksCollection = useMemoFirebase(() => collection(firestore, 'books'), [firestore]);
  const { data: books, isLoading, error } = useCollection<Book>(booksCollection);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-24 md:pt-32">
        <section id="books" className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
                 <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                My Book Library
                </h2>
                <p className="text-lg text-muted-foreground">
                    Explore my published works. These books cover topics from financial literacy to creative thinking.
                </p>
            </div>
            
            {isLoading && (
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="bg-card p-6 rounded-lg shadow-md border flex flex-col items-center text-center">
                            <Skeleton className="h-64 w-48 mb-4" />
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-16 w-full mb-4" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    ))}
                 </div>
            )}
            
            {error && <p className="text-center text-destructive">Failed to load books. Please try again later.</p>}

            {!isLoading && books && books.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {books.map((book) => (
                        <div key={book.id} className="bg-card p-6 rounded-lg shadow-md border flex flex-col items-center text-center transition-transform transform hover:-translate-y-2">
                           <div className="relative mb-4 shadow-lg rounded-md w-48 h-64">
                             <Image 
                                src={book.coverImageUrl}
                                alt={book.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-md"
                                data-ai-hint="book cover"
                             />
                           </div>
                           <h3 className="text-xl font-bold mb-2">{book.title}</h3>
                           <p className="text-muted-foreground flex-grow mb-4">{book.description}</p>
                           <Button asChild size="lg">
                               <Link href={book.purchaseUrl} target="_blank" rel="noopener noreferrer">
                                   Get The Book <ArrowRight className="ml-2 h-4 w-4" />
                               </Link>
                           </Button>
                        </div>
                    ))}
                </div>
            )}
            
            {!isLoading && books?.length === 0 && (
                 <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">The Library is Currently Empty</h3>
                    <p className="text-muted-foreground mt-2">New books are being written. Check back soon!</p>
                </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
