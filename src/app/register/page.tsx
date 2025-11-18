'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, useFirestore, useMemoFirebase } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistrationDisabled, setRegistrationDisabled] = useState(true);

  const registrationControlRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'app-config', 'registration') : null),
    [firestore]
  );

  useEffect(() => {
    async function checkRegistrationStatus() {
      if (registrationControlRef) {
        try {
          const docSnap = await getDoc(registrationControlRef);
          if (docSnap.exists() && docSnap.data().adminCreated) {
            setRegistrationDisabled(true);
          } else {
            setRegistrationDisabled(false);
          }
        } catch (error) {
          console.error("Error checking registration status:", error);
          // Default to disabled for security
          setRegistrationDisabled(true);
        }
      }
    }
    checkRegistrationStatus();
  }, [registrationControlRef]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
     if (isRegistrationDisabled) {
      toast({
        variant: 'destructive',
        title: 'Registration Closed',
        description: 'An admin account already exists for this application.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      // After successful creation, immediately mark registration as complete
      if (registrationControlRef) {
        await setDoc(registrationControlRef, { adminCreated: true });
        setRegistrationDisabled(true); // Disable form immediately
      }
      
      toast({
        title: 'Registration Successful',
        description: "Your admin account has been created.",
      });
      router.push('/admin');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isRegistrationDisabled) {
     return (
       <div className="flex items-center justify-center min-h-screen bg-background">
         <Alert variant="destructive" className="max-w-sm">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Registration Closed</AlertTitle>
            <AlertDescription>
              An administrator account already exists for this application. Public registration is disabled for security.
            </AlertDescription>
         </Alert>
       </div>
     );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create Admin Account</CardTitle>
          <CardDescription>
            Enter your details to create the single administrator account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                {...register('email')}
              />
              {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={isLoading || isRegistrationDisabled}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
