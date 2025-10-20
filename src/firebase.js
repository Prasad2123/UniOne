import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig.js';

// Initialize Firebase
console.log('Initializing Firebase with config:', firebaseConfig);
const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized:', app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
console.log('Firebase Auth initialized:', auth);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Auth functions
export const createUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store additional user data in Firestore
    if (userData) {
      await setDoc(doc(db, 'users', user.uid), {
        ...userData,
        createdAt: new Date().toISOString(),
        email: user.email,
        uid: user.uid
      });
    }
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Phone Authentication Functions
export const setupRecaptcha = () => {
  if (window.recaptchaVerifier) {
    return window.recaptchaVerifier;
  }
  
  window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "invisible",
    callback: (response) => {
      console.log("Recaptcha verified");
    },
    'expired-callback': () => {
      console.log("Recaptcha expired");
    }
  });
  
  return window.recaptchaVerifier;
};

export const sendPhoneOTP = async (phoneNumber) => {
  try {
    const appVerifier = setupRecaptcha();
    const fullPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    
    const confirmationResult = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    
    // Display OTP details for development
    console.log("🔥 OTP SENT SUCCESSFULLY!");
    console.log("📱 Phone Number:", fullPhoneNumber);
    console.log("🔑 Confirmation Result:", confirmationResult);
    
    // For Firebase test numbers, show the verification code
    if (fullPhoneNumber.includes('+1-555-')) {
      console.log("🧪 TEST NUMBER DETECTED - OTP will be visible in Firebase Console");
    }
    
    return { success: true, confirmationResult };
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    console.error("Error details:", error.message);
    throw error;
  }
};

export const verifyPhoneOTP = async (otp) => {
  try {
    if (!window.confirmationResult) {
      throw new Error("No confirmation result found");
    }
    
    const result = await window.confirmationResult.confirm(otp);
    const user = result.user;
    
    console.log("Phone number verified successfully:", user);
    return { success: true, user };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export const createPhoneUser = async (user, userData) => {
  try {
    await setDoc(doc(db, 'users', user.uid), {
      ...userData,
      phoneNumber: user.phoneNumber,
      createdAt: new Date().toISOString(),
      uid: user.uid,
      authMethod: 'phone'
    });
    
    return user;
  } catch (error) {
    console.error('Error creating phone user:', error);
    throw error;
  }
};

export default app;


