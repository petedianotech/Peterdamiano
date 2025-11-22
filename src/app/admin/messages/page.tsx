'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { ADMIN_EMAILS } from '@/lib/admins';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function AdminMessagesPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.push('/admin');
      } else {
        const userIsAdmin = ADMIN_EMAILS.includes(user.email || '');
        if (!userIsAdmin) {
            router.push('/admin/dashboard')
        }
        setIsVerifying(false);
      }
    }
  }, [user, isUserLoading, router]);

  if (isVerifying) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Received Messages</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Contact message viewing functionality will be implemented here.</p>
        </CardContent>
    </Card>
  );
}
