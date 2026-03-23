
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

export function initializeFirebase(): { app: FirebaseApp; firestore: Firestore; auth: Auth } {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  
  return { app, firestore, auth };
}

export { FirebaseProvider, useFirebase } from './provider';
export { FirebaseClientProvider } from './client-provider';
export { errorEmitter } from './error-emitter';
export { FirestorePermissionError } from './errors';
