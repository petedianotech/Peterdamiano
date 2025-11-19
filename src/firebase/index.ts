'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (getApps().length > 0) {
    return getSdks(getApp());
  }

  // In a production environment (like Vercel), Firebase App Hosting provides
  // environment variables for auto-initialization. `initializeApp()` with no arguments
  // will use these. For local development, we fall back to the config object.
  try {
    // This will succeed on Vercel and other configured environments.
    const app = initializeApp();
    return getSdks(app);
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Automatic Firebase initialization failed, likely because this is a local development environment. Falling back to the firebaseConfig object. This is expected and safe.');
      const app = initializeApp(firebaseConfig);
      return getSdks(app);
    } else {
      console.error('CRITICAL: Firebase automatic initialization failed in a production environment. Check your hosting configuration and environment variables.', e);
      // In production, if auto-init fails, something is seriously wrong.
      // We'll still try to initialize with the config as a last resort,
      // but this usually indicates a misconfiguration.
      const app = initializeApp(firebaseConfig);
      return getSdks(app);
    }
  }
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
