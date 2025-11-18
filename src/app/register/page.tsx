'use client';

import { useEffect } from 'react';
import { doc, setDoc, getDoc, collection, getDocs, limit, query } from 'firebase/firestore';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function RegisterPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (isUserLoading || !auth || !firestore) {
      // Wait until firebase services and user state are ready
      return;
    }

    if (!user) {
      // If user is not logged in, they shouldn't be here.
      // Redirect them to login to start the auth flow.
      router.push('/login');
      return;
    }

    const checkAndSetAdmin = async () => {
      try {
        // 1. Check if ANY admin already exists.
        const adminRolesCollection = collection(firestore, 'roles_admin');
        const q = query(adminRolesCollection, limit(1));
        const existingAdminSnapshot = await getDocs(q);

        const userAdminRef = doc(firestore, 'roles_admin', user.uid);
        const userAdminDoc = await getDoc(userAdminRef);

        if (userAdminDoc.exists()) {
          // This user is already an admin.
          toast({
            title: 'Welcome Back, Admin!',
            description: 'Redirecting you to the dashboard.',
          });
          router.push('/admin');
          return;
        }

        if (!existingAdminSnapshot.empty) {
          // An admin already exists, and it's not the current user.
          toast({
            variant: 'destructive',
            title: 'Registration Closed',
            description: 'An administrator account already exists. Access denied.',
          });
          // Log them out and send to login page.
          await auth.signOut();
          router.push('/login');
          return;
        }

        // 3. No admins exist. This is the FIRST user. Make them the admin.
        await setDoc(userAdminRef, {}); // Create the admin role document
        toast({
          title: 'Administrator Account Created!',
          description: 'Welcome! You have been assigned as the site administrator.',
        });
        router.push('/admin');

      } catch (error: any) {
        console.error("Error in admin registration flow: ", error);
        toast({
          variant: "destructive",
          title: "Registration Error",
          description: "Could not set up your admin account. Please try signing in again.",
        });
        await auth.signOut();
        router.push('/login');
      }
    };

    checkAndSetAdmin();

  }, [user, isUserLoading, auth, firestore, router, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Setting Up Admin Account</CardTitle>
          <CardDescription>
            Please wait while we configure your administrator permissions.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <p className="text-sm text-muted-foreground">Do not close this window...</p>
        </CardContent>
      </Card>
    </div>
  );
}
