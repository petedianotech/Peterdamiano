'use client';
import { useMemo } from 'react';
import { useCollection, useFirestore } from '@/firebase';
import { collection, orderBy, query, doc, deleteDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Book, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface BlogArticle {
  id: string;
  title: string;
  publicationDate: string;
}

export default function AdminBlogPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const articlesCollection = useMemo(() => collection(firestore, 'blog_articles'), [firestore]);
  const articlesQuery = useMemo(() => query(articlesCollection, orderBy('publicationDate', 'desc')), [articlesCollection]);
  const { data: articles, isLoading } = useCollection<BlogArticle>(articlesQuery);

  const handleDelete = async (articleId: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'blog_articles', articleId));
      toast({
        title: 'Success',
        description: 'Blog post deleted successfully.',
      });
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not delete the blog post. Please try again.',
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Blog Posts</CardTitle>
        <CardDescription>Here you can edit and delete blog posts.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
            <p>Loading posts...</p>
        ) : articles && articles.length > 0 ? (
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{new Date(article.publicationDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                     <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the blog post.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(article.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
             <Book className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Blog Posts Found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You haven't written any blog posts yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
