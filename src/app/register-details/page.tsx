'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth, useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc, getDocs, collection, updatePassword } from 'firebase/firestore';
import { reauthenticateWithCredential, EmailAuthProvider, updateProfile } from "firebase/auth";

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  memorableNumber: z.string().length(2, { message: 'Must be exactly 2 digits.' }).regex(/^\d{2}$/, { message: 'Must be a 2-digit number.' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.'}),
});

export default function RegisterDetailsPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

   useEffect(() => {
    if (isUserLoading || !firestore || !auth) return;

    if (!user) {
      // Not authenticated, should not be on this page.
      router.push('/login');
      return;
    }

    const checkAdminStatus = async () => {
        const adminsCollectionRef = collection(firestore, 'roles_admin');
        const adminSnapshot = await getDocs(adminsCollectionRef);
        
        // If admins exist, this page is locked.
        if (!adminSnapshot.empty) {
             const adminDoc = await getDoc(doc(firestore, 'roles_admin', user.uid));
             if(!adminDoc.exists()) {
                toast({
                    title: 'Registration Closed',
                    description: 'An administrator account has already been created.',
                    variant: 'destructive',
                });
                router.push('/admin');
             }
        }
    };

    checkAdminStatus();
  }, [user, isUserLoading, firestore, auth, router, toast]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    if (!user || !auth || !firestore) {
      toast({ title: 'Error', description: 'User not authenticated.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    try {
        // This is a complex operation for a client, but necessary for this flow.
        // In a real-world app, this would be handled by a secure backend function.
        if(auth.currentUser) {
            // Firebase Auth doesn't let you directly set a password for a Google-signed-in user.
            // This is a workaround to associate the "password" concept without actually setting it on the Auth user.
            // The password would be stored (hashed) in the admin doc for custom verification if needed.
        }

        const adminData = {
            username: data.username,
            phoneNumber: data.phoneNumber,
            memorableNumber: data.memorableNumber,
            registeredAt: new Date().toISOString(),
            // Storing the password here would require hashing. For this example, we'll skip that
            // as client-side hashing is not secure. The presence of the doc is what grants admin rights.
        };

        const adminDocRef = doc(firestore, 'roles_admin', user.uid);
        await setDoc(adminDocRef, adminData);

        // Also update the Firebase Auth user profile with the new username
        await updateProfile(auth.currentUser!, { displayName: data.username });

        toast({
            title: 'Admin Account Created!',
            description: 'You have successfully set up your administrator account.',
        });

        router.push('/admin');

    } catch (error: any) {
        console.error("Admin setup error:", error);
        toast({
            title: 'Registration Failed',
            description: error.message || 'Could not complete admin registration.',
            variant: 'destructive',
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  if (isUserLoading || !user) {
     return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="text-muted-foreground">Loading...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create Your Admin Account</CardTitle>
          <CardDescription>
            This is a one-time setup. Please fill in your administrator details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={user.email || ''} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" {...register('username')} />
              {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
            </div>
             <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" type="tel" {...register('phoneNumber')} />
              {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="memorableNumber">2-Digit Memorable Number</Label>
              <Input id="memorableNumber" type="number" {...register('memorableNumber')} />
              {errors.memorableNumber && <p className="text-sm text-destructive">{errors.memorableNumber.message}</p>}
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type={showPassword ? 'text' : 'password'} {...register('password')} />
               <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-7 h-7 w-7"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
