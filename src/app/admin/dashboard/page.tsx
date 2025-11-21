'use client';
import { useState, useEffect } from 'react';
import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { ADMIN_EMAILS } from '@/lib/admins';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        // If not logged in, redirect to login page
        router.push('/admin');
      } else {
        // User is logged in, check for authorization
        const userIsAdmin = ADMIN_EMAILS.includes(user.email || '');
        setIsAuthorized(userIsAdmin);
        setIsVerifying(false);
      }
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin');
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
              You are not authorized to access the admin portal. Please sign in with an authorized Google account.
            </p>
            <Button onClick={handleLogout}>Return to Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <div className="ml-auto">
            <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Manage Projects</CardTitle>
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
              <CardTitle>Manage Blog</CardTitle>
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
              <CardTitle>Timeline Events</CardTitle>
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
              <CardTitle>Contact Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View messages from your contact form.</p>
              <Button asChild className="mt-4">
                <Link href="/admin/messages">View Messages</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}