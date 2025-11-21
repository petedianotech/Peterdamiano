'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import { getApps, initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { Auth, User, onAuthStateChanged, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

// Helper to robustly initialize Firebase on the client-side, once.
function initializeFirebaseClient(): { firebaseApp: FirebaseApp, auth: Auth, firestore: Firestore } | null {
  if (typeof window === "undefined") {
    return null;
  }

  // Hardcoded config to prevent env var loading issues.
  const firebaseConfig: FirebaseOptions = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
  };

  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY") {
      console.error("Firebase config is not set. Please replace placeholder values in src/firebase/provider.tsx");
      return null;
  }
  
  // Initialize only once
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  
  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app),
  };
}

// Combined state for the Firebase context
export interface FirebaseContextState {
  areServicesAvailable: boolean;
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<{ firebaseApp: FirebaseApp, auth: Auth, firestore: Firestore } | null>(null);
  const [userAuthState, setUserAuthState] = useState<{ user: User | null, isUserLoading: boolean, userError: Error | null }>({
    user: null,
    isUserLoading: true,
    userError: null,
  });

  // Effect for one-time initialization on the client
  useEffect(() => {
    const initializedServices = initializeFirebaseClient();
    setServices(initializedServices);
  }, []);

  // Effect to subscribe to auth state changes once services are available
  useEffect(() => {
    if (!services?.auth) {
      // If services are null after the initial attempt, it means config is missing.
      // We set loading to false to unblock the UI, and an error could be set here.
      if (document.readyState === 'complete' && !services) {
         setUserAuthState(prev => ({ ...prev, isUserLoading: false, userError: new Error("Firebase services could not be initialized. Check config.") }));
      }
      return;
    }

    const unsubscribe = onAuthStateChanged(
      services.auth,
      (firebaseUser) => {
        setUserAuthState({ user: firebaseUser, isUserLoading: false, userError: null });
      },
      (error) => {
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );
    return () => unsubscribe();
  }, [services]);

  const contextValue = useMemo((): FirebaseContextState => ({
    areServicesAvailable: !!services,
    firebaseApp: services?.firebaseApp || null,
    firestore: services?.firestore || null,
    auth: services?.auth || null,
    ...userAuthState,
  }), [services, userAuthState]);
  
  // Don't render children until we have services and we are done with the initial user loading.
  if (contextValue.isUserLoading) {
    return null;
  }

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};


export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }

  if (!context.areServicesAvailable) {
      throw new Error("Firebase core services not available. Check your Firebase setup.");
  }
  return context;
};

export const useAuth = (): Auth => {
  const { auth } = useFirebase();
  if (!auth) {
      throw new Error("Firebase Auth service is not available. Check your Firebase setup.");
  }
  return auth;
};

export const useFirestore = (): Firestore => {
  const { firestore } = useFirebase();
  if (!firestore) {
      throw new Error("Firebase Firestore service is not available. Check your Firebase setup.");
  }
  return firestore;
};

export const useFirebaseApp = (): FirebaseApp => {
  const { firebaseApp } = useFirebase();
   if (!firebaseApp) {
      throw new Error("Firebase App is not available. Check your Firebase setup.");
  }
  return firebaseApp;
};

export const useUser = () => {
  const context = useFirebase();
  return {
    user: context.user,
    isUserLoading: context.isUserLoading,
    userError: context.userError,
    areServicesAvailable: context.areServicesAvailable,
  };
};

type MemoFirebase <T> = T & {__memo?: boolean};

export function useMemoFirebase<T>(factory: () => T, deps: React.DependencyList): T | (MemoFirebase<T>) {
  const memoized = useMemo(factory, deps);
  
  if(typeof memoized !== 'object' || memoized === null) return memoized;
  (memoized as MemoFirebase<T>).__memo = true;
  
  return memoized;
}
