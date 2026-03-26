import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC364jP4wTONafmLhkdilCJl82Fzi9wtV0",
  authDomain: "rejection-collection.firebaseapp.com",
  projectId: "rejection-collection",
  storageBucket: "rejection-collection.firebasestorage.app",
  messagingSenderId: "632798225412",
  appId: "1:632798225412:web:ccf43dbf62820be1d54151",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
