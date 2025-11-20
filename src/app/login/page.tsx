'use client';

import { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser, FirebaseContext } from '@/firebase'; // Import FirebaseContext
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'; // Keep getAuth
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-6.627 0-12-5.373-12-12h-8c0 11.045 8.955 20 20 20z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C44.438 36.338 48 30.636 48 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

const ADMIN_EMAIL = "petedianotech@gmail.com";

const LoginCardSkeleton = () => (
    <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
                <Skeleton className="h-8 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-full mx-auto mt-2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
    </div>
);


export default function LoginPage() {
  const firebaseContext = useContext(FirebaseContext);
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'auth') {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'You are not authorized to access the admin portal.',
      });
      router.replace('/login');
    }
  }, [searchParams, toast, router]);


  useEffect(() => {
    if (isUserLoading || !firebaseContext?.auth) return;
    if (!user) return;

    if (user.email === ADMIN_EMAIL) {
      router.push('/admin');
    } else {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'This Google account is not authorized for admin access.',
      });
      firebaseContext.auth.signOut();
    }
  }, [user, isUserLoading, router, firebaseContext, toast]);

  const handleGoogleSignIn = async () => {
    if (!firebaseContext?.auth) {
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "Firebase services are not ready. Please wait a moment and try again.",
        });
        return;
    }

    setIsLoggingIn(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(firebaseContext.auth, provider);
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      let errorMessage = 'Could not sign in with Google. Please try again.';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in window was closed before completion.';
      } else if (error.code === 'auth/network-request-failed') {
          errorMessage = "Network error. Please check your connection and try again.";
      }
      toast({
        variant: 'destructive',
        title: 'Sign-In Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  // Show a skeleton while the user or provider is loading.
  if (isUserLoading || !firebaseContext?.isProviderReady) {
    return <LoginCardSkeleton />;
  }
  
  // If user is logged in, show a redirecting message.
  if (user) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-muted-foreground">Redirecting to dashboard...</p>
            </div>
        </div>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Portal</CardTitle>
          <CardDescription>
            Sign in with your designated Google account to manage your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              'Signing In...'
            ) : (
              <>
                <GoogleIcon />
                Sign in with Google
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
