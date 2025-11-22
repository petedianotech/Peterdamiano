'use client';
import { useState, useEffect } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { ADMIN_EMAILS } from '@/lib/admins';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Newspaper, ArrowLeft, Plus, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';
import { collection, doc, addDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface BlogArticle {
    id: string;
    title: string;
    content: string;
    publicationDate: any; 
    author: string;
    imageUrl?: string;
}

export default function AdminBlogPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  const articlesCollection = useMemoFirebase(() => firestore ? collection(firestore, 'blog_articles') : null, [firestore]);
  const { data: articles, isLoading: articlesLoading, error } = useCollection<BlogArticle>(articlesCollection);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Partial<BlogArticle> | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
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
            router.push('/admin/dashboard')
        }
      }
    }
  }, [user, isUserLoading, router]);

  const openNewEditor = () => {
    setCurrentArticle(null);
    setTitle('');
    setContent('');
    setImageUrl('');
    setIsEditorOpen(true);
  };

  const openEditEditor = (article: BlogArticle) => {
    setCurrentArticle(article);
    setTitle(article.title);
    setContent(article.content);
    setImageUrl(article.imageUrl || '');
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setCurrentArticle(null);
    setTitle('');
    setContent('');
    setImageUrl('');
  };

  const handleSave = async () => {
    if (!firestore || !user?.email) return;
    if (!title.trim() || !content.trim()) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Title and content cannot be empty."
        });
        return;
    }

    setIsSaving(true);
    
    const articleData = {
        title,
        content,
        imageUrl: imageUrl.trim() || null,
        publicationDate: serverTimestamp(),
        author: user.displayName || user.email,
    };

    try {
        if (currentArticle && currentArticle.id) {
            // Update existing article
            const articleRef = doc(firestore, 'blog_articles', currentArticle.id);
            await setDoc(articleRef, articleData, { merge: true });
            toast({ title: "Success", description: "Article updated successfully." });
        } else {
            // Create new article
            await addDoc(collection(firestore, 'blog_articles'), articleData);
            toast({ title: "Success", description: "Article created successfully." });
        }
        closeEditor();
    } catch (error) {
        console.error("Error saving article:", error);
        toast({ variant: "destructive", title: "Error", description: "Failed to save article." });
    } finally {
        setIsSaving(false);
    }
  };

  const handleDelete = async (articleId: string) => {
    if (!firestore) return;
    if (!confirm('Are you sure you want to delete this article?')) return;

    try {
        await deleteDoc(doc(firestore, 'blog_articles', articleId));
        toast({ title: "Success", description: "Article deleted." });
    } catch (error) {
        console.error("Error deleting article:", error);
        toast({ variant: "destructive", title: "Error", description: "Failed to delete article." });
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
                <Newspaper className="h-6 w-6 text-primary" />
                Manage Blog
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
                    <CardTitle>{currentArticle ? 'Edit Article' : 'Create New Article'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">Article Title</label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="My Awesome Blog Post"
                        />
                    </div>
                     <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-foreground mb-1">Image URL (Optional)</label>
                        <Input
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Content</label>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your blog post here..."
                            className="min-h-[300px]"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={closeEditor} disabled={isSaving}>Cancel</Button>
                        <Button onClick={handleSave} disabled={isSaving}>
                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {isSaving ? 'Saving...' : 'Save Article'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ) : (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle>Blog Posts</CardTitle>
                        <CardDescription>Create, edit, or delete blog posts.</CardDescription>
                    </div>
                    <Button onClick={openNewEditor}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Button>
                </CardHeader>
                <CardContent>
                   {articlesLoading && <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin" /></div>}
                   {error && <p className="text-destructive text-center">Failed to load articles.</p>}
                   <div className="space-y-4">
                        {articles && articles.map(article => (
                            <div key={article.id} className="flex items-center justify-between rounded-lg border p-3">
                                <p className="font-medium">{article.title}</p>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" onClick={() => openEditEditor(article)}><Edit className="h-4 w-4" /></Button>
                                    <Button variant="destructive" size="icon" onClick={() => handleDelete(article.id)}><Trash2 className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        ))}
                        {!articlesLoading && articles?.length === 0 && (
                            <p className="text-center text-muted-foreground py-4">No blog posts yet. Click "New Post" to get started.</p>
                        )}
                   </div>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
