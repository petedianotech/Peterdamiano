'use client';
import ClientSideProvider from '@/firebase/client-side-provider';
import Dashboard from './dashboard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientSideProvider>
      <Dashboard>{children}</Dashboard>
    </ClientSideProvider>
  );
}
