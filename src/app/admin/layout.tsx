'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import AdminSidebar from '@/components/admin/admin-sidebar';

const ADMIN_EMAIL = 'petedianotech@gmail.com';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If we're on the login page, don't run any checks
    if (pathname === '/admin/login') {
      return;
    }
    
    // Wait until user status is resolved
    if (isUserLoading) {
      return;
    }

    // If no user, redirect to login
    if (!user) {
      router.replace('/admin/login');
      return;
    }

    // If user is not the admin, redirect to homepage
    if (user.email !== ADMIN_EMAIL) {
      router.replace('/');
      return;
    }
  }, [user, isUserLoading, router, pathname]);

  // Show a loading skeleton while checking auth state, unless it's the login page
  if (pathname !== '/admin/login' && (isUserLoading || !user || user.email !== ADMIN_EMAIL)) {
     return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }
  
  // If on the login page, just render children without the sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If authenticated admin, show the dashboard layout
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
