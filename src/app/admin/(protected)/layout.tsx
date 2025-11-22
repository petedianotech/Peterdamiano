
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isUserLoading) {
      if (user && ADMIN_EMAILS.includes(user.email || '')) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        // Redirect non-admins after a short delay so they can see the message
        setTimeout(() => {
          router.replace('/admin');
        }, 2000);
      }
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || isAuthorized === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
       <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 text-center p-4">
          <h2 className="text-2xl font-bold text-destructive">Access Denied</h2>
          <p className="text-muted-foreground">You are not an admin for this website. Redirecting...</p>
        </div>
      </div>
    );
  }

  // If the user is authorized, render the main admin layout with the page content.
  return <AdminLayout pageTitle="Dashboard">{children}</AdminLayout>;
}
