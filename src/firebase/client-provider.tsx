'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { getApps, initializeApp, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

// This function robustly initializes Firebase, ensuring it only happens once.
// It's safe for both client-side and server-side rendering environments like Vercel.
function initializeFirebaseClient(): { firebaseApp: FirebaseApp, auth: ReturnType<typeof getAuth>, firestore: ReturnType<typeof getFirestore> } {
  if (getApps().length === 0) {
    // If no app is initialized, create one using the configuration.
    const app = initializeApp(firebaseConfig);
    return {
      firebaseApp: app,
      auth: getAuth(app),
      firestore: getFirestore(app),
    };
  } else {
    // If an app is already initialized, get the existing one.
    const app = getApp();
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
  // useMemo ensures that Firebase is initialized only once per application lifecycle.
  const firebaseServices = useMemo(() => initializeFirebaseClient(), []);

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
