'use client';

import { useAuth, useUser } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Chrome, Loader2 } from 'lucide-react';
import { ADMIN_EMAILS } from '@/lib/admins';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Redirect if user is already logged in and is an admin
  useEffect(() => {
    if (!isUserLoading && user) {
      const isAuthorized = ADMIN_EMAILS.includes(user.email || '');
      if (isAuthorized) {
        router.push('/admin/dashboard');
      }
    }
  }, [user, isUserLoading, router]);

  const handleGoogleSignIn = async () => {
    if (!auth) return;
    setIsSigningIn(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const isAuthorized = ADMIN_EMAILS.includes(result.user.email || '');
      if (!isAuthorized) {
        toast({
          variant: 'destructive',
          title: 'Authorization Failed',
          description: 'This Google account is not authorized to access the admin panel.',
        });
        await signOut(auth);
      }
      // The useEffect will handle the redirect on successful authorization
    } catch (error: any) {
      console.error('Error during Google sign-in:', error);
      toast({
        variant: 'destructive',
        title: 'Sign-In Error',
        description: error.message || 'An unexpected error occurred during sign-in.',
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If user is logged in but not an admin, they will see this page
  // and can choose to sign in with a different account.
  // The check for admin status is inside the dashboard page as a safeguard.
  
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Portal</CardTitle>
          <CardDescription>
            Please sign in with an authorized Google account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
              disabled={isSigningIn}
            >
              {isSigningIn ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Chrome className="mr-2 h-4 w-4" />
              )}
              {isSigningIn ? 'Signing In...' : 'Sign in with Google'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
