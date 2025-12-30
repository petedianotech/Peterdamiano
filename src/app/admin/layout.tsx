'use client';

import { useUser } from '@/firebase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isUserLoading } = useUser();

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-[250px] animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-[200px] animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
