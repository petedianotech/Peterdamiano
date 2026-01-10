'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import AdminSidebar from '@/components/admin/admin-sidebar';

const ADMIN_EMAIL = 'peterleodamiano@gmail.com';

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
      return; // Wait until user status is resolved.
    }

    const isLoginPage = pathname === '/admin/login';
    const isAuthorized = user && user.email === ADMIN_EMAIL;

    // If logged in and on the login page, redirect to dashboard.
    if (isAuthorized && isLoginPage) {
      router.replace('/admin');
      return;
    }

    // If not logged in and not on the login page, redirect to login.
    if (!isAuthorized && !isLoginPage) {
      router.replace('/admin/login');
      return;
    }
  }, [user, isUserLoading, router, pathname]);

  // If on the login page, just render the content.
  // The effect above will redirect away if the user is already authenticated.
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  // For any other admin route, if we are loading or the user isn't the admin,
  // show a full-screen loader. This covers the time during redirection.
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

  // If we have an authenticated admin, show the full dashboard layout.
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
