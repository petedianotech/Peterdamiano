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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser, useAuth } from '@/firebase'; 
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; 
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

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;


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
  const { user, isUserLoading, areServicesAvailable } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });


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
    if (isUserLoading) return;
    if (user) {
      router.push('/admin');
    }
  }, [user, isUserLoading, router]);

  const handleGoogleSignIn = async () => {
    if (!auth) {
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "Firebase services are not ready. Please wait a moment and try again.",
        });
        return;
    }

    setIsSubmitting(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
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
      setIsSubmitting(false);
    }
  };

  const handleEmailPasswordSignIn = async (data: LoginFormData) => {
    if (!auth) return;
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Sign-In Failed',
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailPasswordRegister = async (data: RegisterFormData) => {
    if (!auth) return;
    setIsSubmitting(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: 'Registration Successful',
        description: 'You can now sign in.',
      });
       router.push('/admin');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isUserLoading || !areServicesAvailable) {
    return <LoginCardSkeleton />;
  }
  
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
      <Tabs defaultValue="login" className="w-full max-w-sm">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the dashboard.
              </CardDescription>
            </CardHeader>
            <form onSubmit={loginForm.handleSubmit(handleEmailPasswordSignIn)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" placeholder="peter@example.com" {...loginForm.register('email')} />
                  {loginForm.formState.errors.email && <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" type="password" {...loginForm.register('password')} />
                  {loginForm.formState.errors.password && <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                        </span>
                    </div>
                </div>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting}
                >
                    <GoogleIcon />
                    Sign in with Google
                </Button>
              </CardContent>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register Admin</CardTitle>
              <CardDescription>
                Create a new administrator account.
              </CardDescription>
            </CardHeader>
            <form onSubmit={registerForm.handleSubmit(handleEmailPasswordRegister)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input id="register-email" type="email" placeholder="admin@example.com" {...registerForm.register('email')} />
                   {registerForm.formState.errors.email && <p className="text-sm text-destructive">{registerForm.formState.errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input id="register-password" type="password" {...registerForm.register('password')} />
                  {registerForm.formState.errors.password && <p className="text-sm text-destructive">{registerForm.formState.errors.password.message}</p>}
                </div>
                 <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Registering...' : 'Register'}
                </Button>
              </CardContent>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    