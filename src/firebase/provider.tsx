'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { getApps, initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { Auth, User, onAuthStateChanged, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

// Helper to robustly initialize Firebase on the client-side, once.
function initializeFirebaseClient(): { firebaseApp: FirebaseApp, auth: Auth, firestore: Firestore } | null {
  if (typeof window === "undefined") {
    return null;
  }

  const firebaseConfig: FirebaseOptions = {
    projectId: "studio-811311965-d6df0",
    appId: "1:362372110686:web:8cbd6414ec727ca71cd7cf",
    apiKey: "AIzaSyD4ZQP88VDMPVmYpH2h3D-dS42_J2hBpB0",
    authDomain: "studio-811311965-d6df0.firebaseapp.com",
    storageBucket: "studio-811311965-d6df0.appspot.com",
    messagingSenderId: "362372110686",
  };
  
  if (!firebaseConfig.apiKey) {
      console.error("Firebase API key is missing.");
      return null;
  }
  
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  
  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app),
  };
}

// Combined state for the Firebase context
export interface FirebaseContextState {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
  areServicesAvailable: boolean;
}

export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contextValue, setContextValue] = useState<FirebaseContextState | undefined>(undefined);

  useEffect(() => {
    const services = initializeFirebaseClient();

    if (!services) {
      // Handle server-side or uninitialized case
      return;
    }

    const { firebaseApp, auth, firestore } = services;
    
    // Set initial state with services, but user is loading
    setContextValue({
      firebaseApp,
      auth,
      firestore,
      user: null,
      isUserLoading: true,
      userError: null,
      areServicesAvailable: true,
    });

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setContextValue((prev) => ({
          ...prev!,
          user: firebaseUser,
          isUserLoading: false,
          userError: null,
        }));
      },
      (error) => {
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setContextValue((prev) => ({
          ...prev!,
          user: null,
          isUserLoading: false,
          userError: error,
        }));
      }
    );

    return () => unsubscribe();
  }, []);

  if (!contextValue) {
    // Render nothing until services are initialized
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
  return context;
};

export const useAuth = (): Auth => {
  const { auth } = useFirebase();
  return auth;
};

export const useFirestore = (): Firestore => {
  const { firestore } = useFirebase();
  return firestore;
};

export const useFirebaseApp = (): FirebaseApp => {
  const { firebaseApp } = useFirebase();
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
