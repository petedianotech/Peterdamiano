'use client';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import AdminSidebar from '@/components/admin/admin-sidebar';

const ADMIN_EMAIL = 'petedianotech@gmail.com';

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isUserLoading) {
      return;
    }
    if (!user) {
      router.replace('/admin/login');
      return;
    }
    if (user.email !== ADMIN_EMAIL) {
      router.replace('/');
      return;
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user || user.email !== ADMIN_EMAIL) {
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

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
