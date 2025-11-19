'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { getApps, initializeApp, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

// This function robustly initializes Firebase, ensuring it only happens once.
// It is safe for all environments, including Vercel.
function initializeFirebaseClient(): { firebaseApp: FirebaseApp, auth: ReturnType<typeof getAuth>, firestore: ReturnType<typeof getFirestore> } {
  // Check if any Firebase app has been initialized.
  if (getApps().length === 0) {
    // If no app is initialized, create one using the explicit configuration.
    // This is crucial for environments like Vercel where auto-detection fails.
    const app = initializeApp(firebaseConfig);
    return {
      firebaseApp: app,
      auth: getAuth(app),
      firestore: getFirestore(app),
    };
  } else {
    // If an app is already initialized, get the existing one.
    // This prevents re-initialization errors in development with hot-reloading.
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
