'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { getApps, initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { Auth, User, onAuthStateChanged, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

// Combined state for the Firebase context
export interface FirebaseContextState {
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

// --- Firebase Initialization (Client-Side) ---
let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

// This function will only run on the client, and only once.
function initializeFirebaseClient(): { firebaseApp: FirebaseApp, auth: Auth, firestore: Firestore } {
    if (getApps().length === 0) {
        const firebaseConfig: FirebaseOptions = {
            projectId: "studio-811311965-d6df0",
            appId: "1:362372110686:web:8cbd6414ec727ca71cd7cf",
            apiKey: "AIzaSyD4ZQP88VDMPVmYpH2h3D-dS42_J2hBpB0",
            authDomain: "studio-811311965-d6df0.firebaseapp.com",
            storageBucket: "studio-811311965-d6df0.appspot.com",
            messagingSenderId: "362372110686",
        };
        firebaseApp = initializeApp(firebaseConfig);
        auth = getAuth(firebaseApp);
        firestore = getFirestore(firebaseApp);
    } else {
        firebaseApp = getApps()[0];
        auth = getAuth(firebaseApp);
        firestore = getFirestore(firebaseApp);
    }
    return { firebaseApp, auth, firestore };
}

// Ensure Firebase is initialized on the client
if (typeof window !== 'undefined') {
  initializeFirebaseClient();
}


export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userError, setUserError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUser(firebaseUser);
        setIsUserLoading(false);
      },
      (error) => {
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setUser(null);
        setUserError(error);
        setIsUserLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const contextValue = useMemo(() => ({
    firebaseApp,
    firestore,
    auth,
    user,
    isUserLoading,
    userError,
  }), [user, isUserLoading, userError]);
  
  return (
    <FirebaseContext.Provider value={contextValue}>
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
  };
};

type MemoFirebase <T> = T & {__memo?: boolean};

export function useMemoFirebase<T>(factory: () => T, deps: React.DependencyList): T | (MemoFirebase<T>) {
  const memoized = useMemo(factory, deps);
  
  if(typeof memoized !== 'object' || memoized === null) return memoized;
  (memoized as MemoFirebase<T>).__memo = true;
  
  return memoized;
}
