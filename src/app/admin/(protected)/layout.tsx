
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
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

  // 1. While the user's authentication status is loading, show a loading screen.
  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // 2. Once loading is complete, check for authorization.
  const isAuthorized = user && ADMIN_EMAILS.includes(user.email || '');

  // 3. If the user is not authorized, redirect them to the login page.
  //    We use a `useEffect` here because navigation should happen as a side effect
  //    after the initial render has determined the user is not authorized.
  if (!isAuthorized) {
    router.replace('/admin');
    // Return a loading state while the redirect happens to prevent any content flash.
     return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  // 4. If the user is authorized, render the main admin layout with the page content.
  //    The pageTitle is derived from the current URL path.
  return <AdminLayout pageTitle="Dashboard">{children}</AdminLayout>;
}
