'use client';
import Dashboard from './dashboard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Dashboard>{children}</Dashboard>;
}
