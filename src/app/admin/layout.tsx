'use client';

import { usePathname, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import { FirebaseProvider, useUser } from '@/firebase/provider';
import { useEffect, useState } from 'react';
import { ADMIN_EMAILS } from '@/lib/admins';
import { Loader2 } from 'lucide-react';

function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        // Not logged in, redirect to the admin login page
        router.push('/admin');
      } else {
        // User is logged in, check if they are an admin
        const isAuthorized = ADMIN_EMAILS.includes(user.email || '');
        if (!isAuthorized) {
          // Not an admin, redirect to the home page
          router.push('/');
        } else {
          // User is authorized, stop verifying
          setIsVerifying(false);
        }
      }
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || isVerifying) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Verifying access...</p>
      </div>
    );
  }

  // If authorized, render the main admin layout with the page content
  return <AdminLayout>{children}</AdminLayout>;
}


export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // The login page is standalone and doesn't need the auth wrapper or sidebar.
  if (pathname === '/admin') {
    return (
      <FirebaseProvider>
        <section>{children}</section>
      </FirebaseProvider>
    );
  }

  // All other admin pages are wrapped by the Firebase provider and the
  // auth wrapper, which handles authentication and renders the AdminLayout.
  return (
    <FirebaseProvider>
      <AdminAuthWrapper>{children}</AdminAuthWrapper>
    </FirebaseProvider>
  );
}
