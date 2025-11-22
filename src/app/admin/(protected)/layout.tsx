
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
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

  const isAuthorized = user && ADMIN_EMAILS.includes(user.email || '');

  if (!isAuthorized) {
    // Redirect them to the login page if not authorized.
    // Using router.replace in the render body is the modern Next.js way for server components,
    // but here in a client component, we should trigger it as a side-effect for clarity, 
    // or handle it like this to avoid rendering anything further.
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
