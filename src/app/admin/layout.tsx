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
    if (isUserLoading) {
      return; // Wait until user status is resolved
    }

    const isLoginPage = pathname === '/admin/login';

    // If user is logged in as admin and is on the login page, redirect to dashboard
    if (user && user.email === ADMIN_EMAIL && isLoginPage) {
      router.replace('/admin');
      return;
    }

    // If user is NOT logged in (or not admin) and is NOT on the login page, redirect to login
    if ((!user || user.email !== ADMIN_EMAIL) && !isLoginPage) {
      router.replace('/admin/login');
      return;
    }
  }, [user, isUserLoading, router, pathname]);

  // If on the login page, render children directly.
  // The useEffect above will handle redirecting away if already logged in.
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // While loading, or if the user is not yet authenticated for a protected page, show a loading screen.
  // This prevents content flash and covers the time during redirection.
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

  // If we have an authenticated admin for a protected page, show the full dashboard layout
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
