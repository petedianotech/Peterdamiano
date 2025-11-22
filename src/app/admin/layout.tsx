'use client';

import { usePathname } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import { FirebaseProvider } from '@/firebase/provider';

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If the user is on the main admin login page, don't use the AdminLayout
  // The login page is a standalone page.
  if (pathname === '/admin') {
    return (
        <FirebaseProvider>
            <section>{children}</section>
        </FirebaseProvider>
    );
  }

  // For all other admin pages (dashboard, blog, etc.), wrap them
  // in the AdminLayout which provides the sidebar and main content area.
  return (
    <FirebaseProvider>
        <AdminLayout>{children}</AdminLayout>
    </FirebaseProvider>
  );
}
