'use client';
import { useState, useEffect } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { ADMIN_EMAILS } from '@/lib/admins';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Book, ArrowLeft, Plus, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';
import { collection, doc, addDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Book {
    id: string;
    title: string;
    description: string;
    coverImageUrl: string;
    purchaseUrl: string;
}

export default function AdminBooksPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  const booksCollection = useMemoFirebase(() => firestore ? collection(firestore, 'books') : null, [firestore]);
  const { data: books, isLoading: booksLoading, error } = useCollection<Book>(booksCollection);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Partial<Book> | null>(null);
  const [formState, setFormState] = useState({ title: '', description: '', coverImageUrl: '', purchaseUrl: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.push('/admin');
      } else {
        const userIsAdmin = ADMIN_EMAILS.includes(user.email || '');
        setIsAuthorized(userIsAdmin);
        setIsVerifying(false);
        if (!userIsAdmin) {
            router.push('/admin/dashboard');
        }
      }
    }
  }, [user, isUserLoading, router]);

  const openNewEditor = () => {
    setCurrentBook(null);
    setFormState({ title: '', description: '', coverImageUrl: '', purchaseUrl: '' });
    setIsEditorOpen(true);
  };

  const openEditEditor = (book: Book) => {
    setCurrentBook(book);
    setFormState({ ...book });
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setCurrentBook(null);
    setFormState({ title: '', description: '', coverImageUrl: '', purchaseUrl: '' });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState(prev => ({ ...prev, [name]: value }));
  }

  const handleSave = async () => {
    if (!firestore || !user?.email) return;
    if (!formState.title.trim() || !formState.description.trim() || !formState.coverImageUrl.trim() || !formState.purchaseUrl.trim()) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "All fields are required."
        });
        return;
    }

    setIsSaving(true);
    
    const bookData = {
        title: formState.title,
        description: formState.description,
        coverImageUrl: formState.coverImageUrl,
        purchaseUrl: formState.purchaseUrl,
    };

    try {
        if (currentBook && currentBook.id) {
            const bookRef = doc(firestore, 'books', currentBook.id);
            await setDoc(bookRef, bookData, { merge: true });
            toast({ title: "Success", description: "Book updated successfully." });
        } else {
            await addDoc(collection(firestore, 'books'), bookData);
            toast({ title: "Success", description: "Book added successfully." });
        }
        closeEditor();
    } catch (error) {
        console.error("Error saving book:", error);
        toast({ variant: "destructive", title: "Error", description: "Failed to save book." });
    } finally {
        setIsSaving(false);
    }
  };

  const handleDelete = async (bookId: string) => {
    if (!firestore) return;
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
        await deleteDoc(doc(firestore, 'books', bookId));
        toast({ title: "Success", description: "Book deleted." });
    } catch (error) {
        console.error("Error deleting book:", error);
        toast({ variant: "destructive", title: "Error", description: "Failed to delete book." });
    }
  };

  if (isVerifying || isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-4">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6 mb-4 rounded-lg">
            <h1 className="text-xl font-semibold flex items-center gap-2">
                <Book className="h-6 w-6 text-primary" />
                Manage Books
            </h1>
            <Button asChild variant="outline">
                <Link href="/admin/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
            </Button>
        </header>

        {isEditorOpen ? (
            <Card>
                <CardHeader>
                    <CardTitle>{currentBook ? 'Edit Book' : 'Add New Book'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">Book Title</label>
                        <Input id="title" name="title" value={formState.title} onChange={handleChange} placeholder="My Awesome Book"/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">Description</label>
                        <Textarea id="description" name="description" value={formState.description} onChange={handleChange} placeholder="A short summary of the book."/>
                    </div>
                     <div>
                        <label htmlFor="coverImageUrl" className="block text-sm font-medium text-foreground mb-1">Cover Image URL</label>
                        <Input id="coverImageUrl" name="coverImageUrl" value={formState.coverImageUrl} onChange={handleChange} placeholder="https://example.com/cover.jpg"/>
                    </div>
                     <div>
                        <label htmlFor="purchaseUrl" className="block text-sm font-medium text-foreground mb-1">Purchase/Download URL</label>
                        <Input id="purchaseUrl" name="purchaseUrl" value={formState.purchaseUrl} onChange={handleChange} placeholder="https://example.com/buy"/>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={closeEditor} disabled={isSaving}>Cancel</Button>
                        <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {isSaving ? 'Saving...' : 'Save Book'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ) : (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle>Your Books</CardTitle>
                        <CardDescription>Add, edit, or delete your published books.</CardDescription>
                    </div>
                    <Button onClick={openNewEditor}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Book
                    </Button>
                </CardHeader>
                <CardContent>
                   {booksLoading && <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin" /></div>}
                   {error && <p className="text-destructive text-center">Failed to load books.</p>}
                   <div className="space-y-4">
                        {books && books.map(book => (
                            <div key={book.id} className="flex items-center justify-between rounded-lg border p-3">
                                <p className="font-medium">{book.title}</p>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" onClick={() => openEditEditor(book)}><Edit className="h-4 w-4" /></Button>
                                    <Button variant="destructive" size="icon" onClick={() => handleDelete(book.id)}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        ))}
                        {!booksLoading && books?.length === 0 && (
                            <p className="text-center text-muted-foreground py-4">No books yet. Click "New Book" to get started.</p>
                        )}
                   </div>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
