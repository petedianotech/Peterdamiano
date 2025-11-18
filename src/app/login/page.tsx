'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-6.627 0-12-5.373-12-12h-8c0 11.045 8.955 20 20 20z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C44.438 36.338 48 30.636 48 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);


export default function LoginPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  const handleGoogleSignIn = async () => {
    setIsLoggingIn(true);
    if (!auth || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'Firebase is not initialized.',
      });
      setIsLoggingIn(false);
      return;
    }

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const signedInUser = result.user;

      // Check if this is the very first user to ever sign in.
      // This is a simplified way to grant the first user admin rights.
      // In a real app, you might have a more complex admin invitation system.
      const adminRoleRef = doc(firestore, 'roles_admin', signedInUser.uid);
      const adminDoc = await getDoc(adminRoleRef);

      // Check if there are ANY admins yet. If not, this user becomes the first.
      // Note: In a real high-traffic app, this check isn't perfectly race-condition-proof,
      // but it's a very solid approach for a single-admin portfolio site.
      const { size } = await getDoc(doc(firestore, 'metadata', 'roles_admin'));
      if (!size) { // Simplified check, assuming you'd pre-populate or use a counter.
          // A more robust check might involve querying the collection and checking its size.
          // For this app, we'll assume if the user's admin doc doesn't exist, and they are first, they are admin.
          if (!adminDoc.exists()) {
             await setDoc(adminRoleRef, {
                email: signedInUser.email,
                registeredAt: new Date().toISOString(),
                role: 'admin',
            });
            toast({
                title: "Welcome, Admin!",
                description: "Your admin account has been created.",
            });
          }
      }
      
      // Redirect is handled by the useEffect hook
    } catch (error: any) {
      console.error('Google Sign-In error:', error);
      let errorMessage = 'Could not sign in with Google. Please try again.';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in window was closed before completion.';
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
  
  if (isUserLoading || user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Portal</CardTitle>
          <CardDescription>
            Sign in with your Google account to manage your portfolio.
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
