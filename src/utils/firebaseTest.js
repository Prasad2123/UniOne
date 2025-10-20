// Firebase connection test utility
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig.js';

// Test Firebase initialization
export const testFirebaseConnection = () => {
  try {
    console.log('Testing Firebase connection...');
    console.log('Firebase Config:', firebaseConfig);
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log('✅ Firebase app initialized successfully');
    
    // Initialize Auth
    const auth = getAuth(app);
    console.log('✅ Firebase Auth initialized successfully');
    
    // Initialize Firestore
    const db = getFirestore(app);
    console.log('✅ Firestore initialized successfully');
    
    return { app, auth, db };
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    throw error;
  }
};

// Test authentication
export const testAuth = async () => {
  try {
    const { auth } = testFirebaseConnection();
    console.log('Auth instance:', auth);
    console.log('Auth config:', auth.config);
    return true;
  } catch (error) {
    console.error('Auth test failed:', error);
    return false;
  }
};
