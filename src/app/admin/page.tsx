'use client';
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  CreditCard,
  DollarSign,
  Menu,
  MessageCircle,
  Package2,
  Search,
  Users,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SiteTrafficChart from '@/components/site-traffic-chart';
import { useCollection, useFirestore, useMemoFirebase, useUser, setDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, limit, doc, getDocs, updateDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';


const settingsSchema = z.object({
  profileImageUrl: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});


interface ContactInquiry {
    id: string;
    name: string;
    email: string;
    message: string;
    submissionDate: string; 
  }
  
interface BlogArticle {
    id: string;
}

interface AdminProfile {
    profileImageUrl?: string;
}

export default function AdminDashboard() {
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  
  const [adminDocId, setAdminDocId] = useState<string | null>(null);

  const messagesCollection = useMemoFirebase(() => collection(firestore, 'contact_inquiries'), [firestore]);
  const recentMessagesQuery = useMemoFirebase(() => query(messagesCollection, orderBy('submissionDate', 'desc'), limit(3)), [messagesCollection]);
  const blogCollection = useMemoFirebase(() => collection(firestore, 'blog_articles'), [firestore]);
  
  const { data: messages, isLoading: isLoadingMessages } = useCollection<ContactInquiry>(messagesCollection);
  const { data: recentMessages, isLoading: isLoadingRecent } = useCollection<ContactInquiry>(recentMessagesQuery);
  const { data: blogPosts, isLoading: isLoadingBlogs } = useCollection<BlogArticle>(blogCollection);
  
  const { control, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(settingsSchema),
  });

  // Effect to find the single admin document ID
  useEffect(() => {
    const findAdminDoc = async () => {
      if (!firestore) return;
      const adminCollectionRef = collection(firestore, 'roles_admin');
      const adminSnapshot = await getDocs(adminCollectionRef);
      if (!adminSnapshot.empty) {
        // Assuming there is only one admin document
        const adminDoc = adminSnapshot.docs[0];
        setAdminDocId(adminDoc.id);
        const adminData = adminDoc.data() as AdminProfile;
        if(adminData.profileImageUrl) {
            setValue('profileImageUrl', adminData.profileImageUrl);
        }
      }
    };
    findAdminDoc();
  }, [firestore, setValue]);

  const onSettingsSubmit = async (data: z.infer<typeof settingsSchema>) => {
    if (!adminDocId) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not find admin profile to update.",
        });
        return;
    }

    try {
        const adminDocRef = doc(firestore, 'roles_admin', adminDocId);
        // Using `updateDoc` as `setDoc` with merge is also an option
        await updateDoc(adminDocRef, {
            profileImageUrl: data.profileImageUrl,
        });
        toast({
            title: "Settings Saved",
            description: "Your profile image URL has been updated.",
        });
    } catch (error: any) {
        console.error("Failed to save settings:", error);
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: "Could not save your settings. Please try again.",
        });
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Messages
              </CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            {isLoadingMessages ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold">{messages?.length || 0}</div>}
              <p className="text-xs text-muted-foreground">
                Total messages received from the contact form.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoadingBlogs ? <Skeleton className="h-8 w-1/4" /> : <div className="text-2xl font-bold">{blogPosts?.length || 0}</div>}
              <p className="text-xs text-muted-foreground">
                Total number of blog articles published.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>
                  Most recent messages from your contact form.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/admin/messages">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {isLoadingRecent && (
                    <>
                      <TableRow>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                      </TableRow>
                       <TableRow>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-5 w-16 ml-auto" /></TableCell>
                      </TableRow>
                    </>
                )}
                {!isLoadingRecent && recentMessages?.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>
                      <div className="font-medium">{message.name}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {message.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{new Date(message.submissionDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
                 {!isLoadingRecent && recentMessages?.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={2} className="text-center">No messages yet.</TableCell>
                    </TableRow>
                 )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="space-y-4">
             <Card>
                <CardHeader>
                    <CardTitle>Site Settings</CardTitle>
                    <CardDescription>Manage your public profile information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSettingsSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="profileImageUrl">Profile Image URL</Label>
                            <Controller
                                name="profileImageUrl"
                                control={control}
                                render={({ field }) => (
                                    <Input 
                                        id="profileImageUrl" 
                                        placeholder="https://example.com/your-image.png"
                                        {...field} 
                                    />
                                )}
                            />
                            {errors.profileImageUrl && <p className="text-sm text-destructive">{errors.profileImageUrl.message}</p>}
                        </div>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Settings'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Site Traffic</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent>
                <SiteTrafficChart />
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
