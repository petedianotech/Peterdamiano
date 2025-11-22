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

  // The login page doesn't use the main admin layout
  if (pathname === '/admin') {
    return <section>{children}</section>;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
