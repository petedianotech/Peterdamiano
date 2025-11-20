'use client';

import { useEffect, useState } from 'react';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export default function ClientSideProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // While the component is not yet mounted, we don't render the provider.
  // This prevents any Firebase initialization on the server.
  if (!isMounted) {
    return <>{children}</>;
  }

  // Once mounted on the client, we render the Firebase provider.
  return <FirebaseClientProvider>{children}</FirebaseClientProvider>;
}
