import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    import.meta.env?.VITE_FIREBASE_API_KEY ??
    "AIzaSyB9S--c4snHOm46AGnpwBU6kENm82cAMYw",
  authDomain:
    import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN ??
    "unione-9fd98.firebaseapp.com",
  projectId:
    import.meta.env?.VITE_FIREBASE_PROJECT_ID ?? "unione-9fd98",
  storageBucket:
    import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET ??
    "unione-9fd98.firebasestorage.app",
  messagingSenderId:
    import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "713283225262",
  appId:
    import.meta.env?.VITE_FIREBASE_APP_ID ??
    "1:713283225262:web:c2c69c83870e247c984f3f",
  measurementId:
    import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID ?? "G-4LT2V0B6KM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics = null;
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {
      analytics = null;
    });
}

export { app, auth, db, analytics };
