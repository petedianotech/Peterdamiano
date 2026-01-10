'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import AdminSidebar from '@/components/admin/admin-sidebar';

const ADMIN_EMAIL = 'petedianomedia@gmail.com';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait until the user's auth status is fully resolved
    if (isUserLoading) {
      return;
    }

    // If on the login page
    if (pathname === '/admin/login') {
      // If the user is already logged in as admin, redirect to the dashboard
      if (user && user.email === ADMIN_EMAIL) {
        router.replace('/admin');
      }
      return;
    }
    
    // For all other admin pages, if there's no user or the user is not the admin, redirect to login
    if (!user || user.email !== ADMIN_EMAIL) {
      router.replace('/admin/login');
      return;
    }

  }, [user, isUserLoading, router, pathname]);

  // If we are on the login page, just render the content without the admin layout
  // But also handle the case where auth is still loading.
  if (pathname === '/admin/login') {
     if(isUserLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-secondary">
                <div className="flex flex-col items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full bg-muted" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] bg-muted" />
                    <Skeleton className="h-4 w-[200px] bg-muted" />
                </div>
                </div>
            </div>
        );
     }
     return <>{children}</>;
  }

  // While loading, or if the user is not the authorized admin, show a loading screen.
  // This prevents a flash of content and handles the redirect state.
  if (isUserLoading || !user || user.email !== ADMIN_EMAIL) {
     return (
      <div className="flex h-screen w-full items-center justify-center bg-secondary">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full bg-muted" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-muted" />
            <Skeleton className="h-4 w-[200px] bg-muted" />
          </div>
        </div>
      </div>
    );
  }
  
  // If we have an authenticated admin, show the full dashboard layout
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
