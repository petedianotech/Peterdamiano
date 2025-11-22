'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { ADMIN_EMAILS } from '@/lib/admins';
import AdminLayout from '@/components/admin/admin-layout';

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there's no user, redirect to login
    if (!isUserLoading && !user) {
      router.replace('/admin');
      return;
    }
    // If loading is finished and user is not an admin, redirect to login
    if (!isUserLoading && user) {
      const isAuthorized = ADMIN_EMAILS.includes(user.email || '');
      if (!isAuthorized) {
        // You might want to sign them out or just redirect
        router.replace('/admin');
      }
    }
  }, [user, isUserLoading, router]);

  // While checking, show a loading screen
  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }
  
  // If we reach here, user is loaded and is an admin
  return <AdminLayout pageTitle="Dashboard">{children}</AdminLayout>;
}
