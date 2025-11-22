'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ADMIN_EMAILS } from '@/lib/admins';

export default function Dashboard() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.push('/admin');
      } else {
        const isAuthorized = ADMIN_EMAILS.includes(user.email || '');
        if (!isAuthorized) {
          router.push('/');
        } else {
          setIsVerifying(false);
        }
      }
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || isVerifying) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2">Verifying access...</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
        <CardDescription>Welcome, {user?.displayName || 'Admin'}!</CardDescription>
      </CardHeader>
      <CardContent>
        <p>You can now manage your site from the links in the sidebar.</p>
      </CardContent>
    </Card>
  );
}
