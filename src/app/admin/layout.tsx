'use client';

import { usePathname } from 'next/navigation';
import AdminLayout from '@/components/admin/admin-layout';

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't show the main admin layout on the login page
  if (pathname === '/admin') {
    return <section>{children}</section>;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
