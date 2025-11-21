'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { getApps, initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// This function robustly initializes Firebase on the CLIENT SIDE, ensuring it only happens once.
function initializeFirebaseClient(): { firebaseApp: FirebaseApp, auth: ReturnType<typeof getAuth>, firestore: ReturnType<typeof getFirestore> } | null {
  // Check if we are on the client and if credentials are available
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    return null;
  }

  // Construct the config object here, ensuring it's only done on the client
  const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  
  // Check if any Firebase app has been initialized.
  if (getApps().length === 0) {
    // If no app is initialized, create one using the explicit configuration.
    const app = initializeApp(firebaseConfig);
    return {
      firebaseApp: app,
      auth: getAuth(app),
      firestore: getFirestore(app),
    };
  } else {
    // If an app is already initialized, get the existing one.
    // This prevents re-initialization errors in development with hot-reloading.
    const app = getApps()[0]; // Get the first initialized app
    return {
      firebaseApp: app,
      auth: getAuth(app),
      firestore: getFirestore(app),
    };
  }
}

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  // useMemo ensures that Firebase is initialized only once per application lifecycle on the client.
  const firebaseServices = useMemo(() => initializeFirebaseClient(), []);

  // If firebaseServices is null (e.g., on the server or missing config),
  // we can render children without the provider, or a loading state.
  if (!firebaseServices) {
    // Render children directly, auth-protected routes will handle redirection.
    return <>{children}</>;
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
