'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

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
import { Eye, EyeOff, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .regex(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/(?=.*[0-9])/, { message: 'Password must contain at least one number.' })
    .regex(/(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character.' }),
  memorableNumber: z.string().length(2, { message: 'Must be exactly 2 digits.' }).regex(/^\d{2}$/, { message: 'Must be a 2-digit number.' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.'}),
});

type PasswordValidation = {
  rule: 'length' | 'lowercase' | 'uppercase' | 'number' | 'special';
  regex: RegExp;
  message: string;
};

const passwordValidations: PasswordValidation[] = [
    { rule: 'length', regex: /.{8,}/, message: 'At least 8 characters' },
    { rule: 'lowercase', regex: /[a-z]/, message: 'A lowercase letter' },
    { rule: 'uppercase', regex: /[A-Z]/, message: 'An uppercase letter' },
    { rule: 'number', regex: /[0-9]/, message: 'A number' },
    { rule: 'special', regex: /[!@#$%^&*]/, message: 'A special character' },
];


export default function RegisterDetailsPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched'
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
                auth.signOut();
                router.push('/login');
             }
        }
    };

    checkAdminStatus();
  }, [user, isUserLoading, firestore, auth, router, toast]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    if (!user || !auth || !firestore || !auth.currentUser) {
      toast({ title: 'Error', description: 'User not authenticated.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    try {
        const adminData = {
            username: data.username,
            phoneNumber: data.phoneNumber,
            memorableNumber: data.memorableNumber,
            registeredAt: new Date().toISOString(),
            // Storing the password here would require hashing. For this example, we'll skip that
            // as client-side hashing is not secure. The presence of the doc is what grants admin rights.
            // The password is for a conceptual second factor, not for direct Firebase auth.
        };

        const adminDocRef = doc(firestore, 'roles_admin', user.uid);
        await setDoc(adminDocRef, adminData);

        // Also update the Firebase Auth user profile with the new username
        await updateProfile(auth.currentUser, { displayName: data.username });

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
            This is a one-time setup to secure your admin account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address (from Google)</Label>
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
            <div className="space-y-2">
                <div className="relative">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type={showPassword ? 'text' : 'password'} 
                    {...register('password', {
                        onChange: (e) => setPasswordValue(e.target.value),
                    })}
                  />
                   <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-7 h-7 w-7"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mt-2">
                    {passwordValidations.map(({ rule, regex, message }) => {
                        const isValid = regex.test(passwordValue);
                        return (
                            <div key={rule} className={cn("flex items-center gap-2", isValid ? 'text-green-600' : 'text-muted-foreground')}>
                                {isValid ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                                <span>{message}</span>
                            </div>
                        )
                    })}
                </div>
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
