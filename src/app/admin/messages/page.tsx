'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { ADMIN_EMAILS } from '@/lib/admins';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminMessagesPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.push('/admin');
      } else {
        const userIsAdmin = ADMIN_EMAILS.includes(user.email || '');
        setIsAuthorized(userIsAdmin);
        setIsVerifying(false);
        if (!userIsAdmin) {
            router.push('/admin/dashboard')
        }
      }
    }
  }, [user, isUserLoading, router]);

  if (isVerifying) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-4">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6 mb-4 rounded-lg">
            <h1 className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            Contact Messages
            </h1>
            <Button asChild variant="outline">
                <Link href="/admin/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
            </Button>
        </header>
        <Card>
            <CardHeader>
                <CardTitle>Received Messages</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Contact message viewing functionality will be implemented here.</p>
            </CardContent>
        </Card>
    </div>
  );
}
