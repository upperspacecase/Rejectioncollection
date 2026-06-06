import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_API_KEY, FIREBASE_PROJECT_ID } from './firebaseConfig';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "www.brazen.click",
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: "rejection-collection.firebasestorage.app",
  messagingSenderId: "632798225412",
  appId: "1:632798225412:web:ccf43dbf62820be1d54151",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
