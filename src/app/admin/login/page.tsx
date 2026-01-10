'use client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Chrome, Code2 } from 'lucide-react';

export default function AdminLoginPage() {
  const auth = useAuth();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'Login Successful',
        description: "Welcome back! Redirecting to the dashboard...",
      });
      // Force a redirect to the dashboard.
      window.location.href = '/admin';
    } catch (error) {
      console.error('Error signing in with Google: ', error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Could not sign in with Google. Please try again.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <div className="w-full max-w-sm p-8 space-y-8 bg-card rounded-2xl shadow-lg border">
        <div className="text-center">
            <div className="flex justify-center mb-4">
                 <div className="bg-primary/10 p-3 rounded-md inline-block">
                    <Code2 className="h-7 w-7 text-primary" />
                </div>
            </div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage your portfolio.</p>
        </div>
        <Button onClick={handleGoogleSignIn} className="w-full" size="lg">
          <Chrome className="mr-2 h-5 w-5" />
          Sign in with Google
        </Button>
         <p className="text-xs text-muted-foreground text-center pt-4">
            Access is restricted to authorized administrators only.
        </p>
      </div>
    </div>
  );
}
