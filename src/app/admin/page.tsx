'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p>Redirecting to dashboard...</p>
    </div>
  );
}
