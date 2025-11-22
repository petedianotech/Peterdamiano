'use client';

import { usePathname } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';
import { FirebaseProvider } from '@/firebase/provider';

// This layout component is responsible for the admin section
// It ensures that all admin pages are wrapped with the AdminLayout component,
// which provides the sidebar and other shared UI elements.
// The main admin login page is handled separately to not show the sidebar.

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // The login page is a standalone page and should not have the admin sidebar.
  // By checking the pathname, we can conditionally render the main AdminLayout.
  if (pathname === '/admin') {
    // For the login page, we only need the FirebaseProvider and the page content.
    return (
        <FirebaseProvider>
            <section>{children}</section>
        </FirebaseProvider>
    );
  }

  // For all other admin pages (like /admin/dashboard, /admin/blog, etc.),
  // we wrap them in the AdminLayout. This provides the consistent admin UI
  // with the sidebar, header, and main content area.
  return (
    <FirebaseProvider>
        <AdminLayout>{children}</AdminLayout>
    </FirebaseProvider>
  );
}
