'use client';
import { useState, useEffect } from 'react';
import { useUser, useAuth, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { ADMIN_EMAILS } from '@/lib/admins';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { Loader2, User, Paintbrush, Newspaper, Briefcase, MessageSquare, LogOut, Calendar, Book, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { doc, setDoc } from 'firebase/firestore';
import SiteTrafficChart from '@/components/site-traffic-chart';

interface SiteSettings {
  profileImageUrl?: string;
}

export default function Dashboard() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  
  const settingsRef = useMemoFirebase(() => firestore ? doc(firestore, 'site_settings', 'profile') : null, [firestore]);
  const { data: settings, isLoading: isSettingsLoading } = useDoc<SiteSettings>(settingsRef);
  
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.push('/admin');
      } else {
        const userIsAdmin = ADMIN_EMAILS.includes(user.email || '');
        setIsAuthorized(userIsAdmin);
        setIsVerifying(false);
      }
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (settings) {
      setProfileImageUrl(settings.profileImageUrl || '');
    }
  }, [settings]);

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/admin');
  };

  const handleProfileImageSave = async () => {
    if (!settingsRef) return;
    setIsSaving(true);
    try {
      await setDoc(settingsRef, { profileImageUrl: profileImageUrl }, { merge: true });
      toast({
        title: 'Success!',
        description: 'Your profile picture has been updated.',
      });
    } catch (error) {
      console.error('Error saving profile image:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save the profile picture URL.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isVerifying || isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying your access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background p-4">
        <Card className="max-w-md text-center">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              You are not authorized to access this admin portal.
            </p>
            <Button onClick={handleLogout}>Return to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <Paintbrush className="h-6 w-6 text-primary" />
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-4">
            <div className='text-sm text-right'>
                <p className='font-semibold'>{user?.displayName}</p>
                <p className='text-muted-foreground'>{user?.email}</p>
            </div>
          <Button onClick={handleLogout} variant="outline" size="icon">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-6 md:gap-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className='flex items-center gap-2'><User className='h-5 w-5'/>Profile Settings</CardTitle>
              <CardDescription>Manage your public-facing profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                <label htmlFor="profile-image-url" className="block text-sm font-medium text-foreground mb-1">Profile Picture URL</label>
                {isSettingsLoading ? <Loader2 className='h-5 w-5 animate-spin' /> : (
                    <Input
                        id="profile-image-url"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={profileImageUrl}
                        onChange={(e) => setProfileImageUrl(e.target.value)}
                    />
                )}
              </div>
              <Button onClick={handleProfileImageSave} disabled={isSaving || isSettingsLoading}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isSaving ? 'Saving...' : 'Save Profile Picture'}
              </Button>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className='flex items-center gap-2'><BarChart3 className='h-5 w-5'/>Site Traffic</CardTitle>
              <CardDescription>A chart of page views. Currently shows placeholder data.</CardDescription>
            </CardHeader>
            <CardContent>
               <SiteTrafficChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'><Briefcase className='h-5 w-5' />Manage Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Add, edit, or delete portfolio projects.</p>
              <Button asChild className="mt-4">
                <Link href="/admin/projects">Go to Projects</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'><Newspaper className='h-5 w-5'/>Manage Blog</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Create and manage blog articles.</p>
              <Button asChild className="mt-4">
                <Link href="/admin/blog">Go to Blog</Link>
              </Button>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'><Calendar className='h-5 w-5'/>Timeline Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage your career timeline events.</p>
               <Button asChild className="mt-4">
                <Link href="/admin/timeline">Go to Timeline</Link>
              </Button>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'><MessageSquare className='h-5 w-5'/>Contact Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View messages from your contact form.</p>
              <Button asChild className="mt-4">
                <Link href="/admin/messages">View Messages</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'><Book className='h-5 w-5'/>Manage Books</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Add and edit your published books.</p>
              <Button asChild className="mt-4">
                <Link href="/admin/books">Go to Books</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
