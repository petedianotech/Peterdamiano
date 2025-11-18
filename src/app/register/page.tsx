'use client';

import { useEffect, useState } from 'react';
import {
  doc,
  setDoc,
  getDocs,
  collection,
  limit,
  query,
} from 'firebase/firestore';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function RegisterPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [isAdminPresent, setIsAdminPresent] = useState(false);

  useEffect(() => {
    async function checkAdminExists() {
      if (!firestore) return;
      try {
        const adminRolesCollection = collection(firestore, 'roles_admin');
        const q = query(adminRolesCollection, limit(1));
        const adminSnapshot = await getDocs(q);
        if (!adminSnapshot.empty) {
          setIsAdminPresent(true);
        }
      } catch (error) {
        console.error('Error checking for existing admin:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not verify admin status. Please try again later.',
        });
      } finally {
        setIsCheckingAdmin(false);
      }
    }
    checkAdminExists();
  }, [firestore, toast]);
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isAdminPresent) {
      toast({
        variant: 'destructive',
        title: 'Registration Closed',
        description: 'An administrator account already exists.',
      });
      setIsLoading(false);
      return;
    }
    
    if (!auth || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Initialization Error',
        description: 'Firebase is not ready. Please try again in a moment.',
      });
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newAdmin = userCredential.user;

      // Create the admin role document
      const userAdminRef = doc(firestore, 'roles_admin', newAdmin.uid);
      await setDoc(userAdminRef, {});

      toast({
        title: 'Administrator Account Created!',
        description: 'Welcome! You have been assigned as the site administrator.',
      });
      
      // router.push('/admin') will be handled by the useEffect watching the user state
      
    } catch (error: any) {
      console.error('Registration error:', error);
      let errorMessage = 'Could not create your account. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak. Please use at least 6 characters.';
      }
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isUserLoading || isCheckingAdmin) {
    return (
       <div className="flex items-center justify-center min-h-screen bg-background">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Checking Server...</CardTitle>
              <CardDescription>
                Please wait while we verify the registration status.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
    );
  }

  if (isAdminPresent) {
      return (
         <div className="flex items-center justify-center min-h-screen bg-background">
          <Card className="w-full max-w-sm text-center">
            <CardHeader>
              <CardTitle className="text-2xl">Registration Closed</CardTitle>
              <CardDescription>
                An administrator account already exists for this application. Public registration is disabled for security.
              </CardDescription>
            </CardHeader>
            <CardFooter>
                 <Button asChild className="w-full">
                    <Link href="/login">Proceed to Login</Link>
                </Button>
            </CardFooter>
          </Card>
        </div>
      )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleRegister}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Admin Account</CardTitle>
            <CardDescription>
              This will create the first and only administrator account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Already an admin?{' '}
              <Link href="/login" className="underline hover:text-primary">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}