'use client';
import { useState, useEffect } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { ADMIN_EMAILS } from '@/lib/admins';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { doc, setDoc } from 'firebase/firestore';

interface SiteSettings {
  profileImageUrl?: string;
}

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const [isVerifying, setIsVerifying] = useState(true);
  
  const settingsRef = useMemoFirebase(() => firestore ? doc(firestore, 'site_settings', 'profile') : null, [firestore]);
  const { data: settings, isLoading: isSettingsLoading } = useDoc<SiteSettings>(settingsRef);
  
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.push('/admin');
      } else {
        const userIsAdmin = ADMIN_EMAILS.includes(user.email || '');
        if (!userIsAdmin) {
            router.push('/');
        }
        setIsVerifying(false);
      }
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (settings) {
      setProfileImageUrl(settings.profileImageUrl || '');
    }
  }, [settings]);


  const handleProfileImageSave = async () => {
    if (!settingsRef) return;
    setIsSaving(true);
    try {
      await setDoc(settingsRef, { profileImageUrl: profileImageUrl }, { merge: true });
      toast({
        title: 'Success!',
        description: 'Your profile picture has been updated.',
      });
    } catch (error) {
      console.error('Error saving profile image:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save the profile picture URL.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isVerifying || isUserLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="max-w-2xl">
        <CardHeader>
            <CardTitle className='flex items-center gap-2'><User className='h-5 w-5'/>Profile Settings</CardTitle>
            <CardDescription>Manage your public-facing profile details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
            <label htmlFor="profile-image-url" className="block text-sm font-medium text-foreground mb-1">Profile Picture URL</label>
            {isSettingsLoading ? <Loader2 className='h-5 w-5 animate-spin' /> : (
                <Input
                    id="profile-image-url"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={profileImageUrl}
                    onChange={(e) => setProfileImageUrl(e.target.value)}
                />
            )}
            </div>
            <Button onClick={handleProfileImageSave} disabled={isSaving || isSettingsLoading}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isSaving ? 'Saving...' : 'Save Profile Picture'}
            </Button>
        </CardContent>
    </Card>
  );
}
