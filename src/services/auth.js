import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const buildProfilePayload = (data) => {
  const common = {
    role: data.role,
    fullName: data.fullName,
    email: data.email,
  };

  if (data.role === "Student") {
    return {
      ...common,
      studentId: data.studentId ?? "",
      course: data.course ?? "",
    };
  }

  return {
    ...common,
    employeeId: data.employeeId ?? "",
    department: data.department ?? "",
  };
};

export const fetchUserProfile = async (uid) => {
  const snapshot = await getDoc(doc(db, "profiles", uid));
  return snapshot.exists() ? snapshot.data() : null;
};

export const createUserProfile = async (uid, profile) => {
  const timestamp = serverTimestamp();
  await setDoc(
    doc(db, "profiles", uid),
    {
      ...profile,
      updatedAt: timestamp,
      createdAt: timestamp,
    },
    { merge: true }
  );
};

export const signup = async (payload) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    payload.email,
    payload.password
  );

  if (payload.fullName) {
    await updateProfile(userCredential.user, {
      displayName: payload.fullName,
    });
  }

  await createUserProfile(
    userCredential.user.uid,
    buildProfilePayload(payload)
  );

  return userCredential.user;
};

export const login = async (email, password, rememberMe = false) => {
  await setPersistence(
    auth,
    rememberMe ? browserLocalPersistence : browserSessionPersistence
  );
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return credentials.user;
};

export const logout = () => signOut(auth);

export const requestPasswordReset = (email) =>
  sendPasswordResetEmail(auth, email);

