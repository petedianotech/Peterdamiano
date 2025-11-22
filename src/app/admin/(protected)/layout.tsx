
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/admin-layout';
import { ADMIN_EMAILS } from '@/lib/admins';

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If loading is finished and there is no user, redirect to login.
    if (!isUserLoading && !user) {
      router.replace('/admin');
    }
  }, [isUserLoading, user, router]);

  // While the user's authentication status is loading, show a loading screen.
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

  // Once loading is complete and we have a user, check for authorization.
  const isAuthorized = ADMIN_EMAILS.includes(user.email || '');

  if (!isAuthorized) {
    // If not authorized, redirect them away.
    router.replace('/admin');
    return (
       <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Access Denied. Redirecting...</p>
        </div>
      </div>
    );
  }

  // If the user is authorized, render the main admin layout with the page content.
  return <AdminLayout pageTitle="Dashboard">{children}</AdminLayout>;
}
