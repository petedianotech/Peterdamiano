'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    // The protected layout will handle rendering the dashboard.
    // This page's purpose is to be the entry point for /admin.
    // If we land here, the (protected) layout should take over.
    // A hard reload might be needed if caching is aggressive.
    // We can also try to push again to trigger the layout.
    router.replace('/admin');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p>Redirecting to dashboard...</p>
    </div>
  );
}
