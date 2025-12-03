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
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const buildProfilePayload = (data) => {
  const common = {
    role: data.role,
    fullName: data.fullName,
    email: data.email,
    university: data.university ?? "",
    college: data.college ?? "",
    course: data.courseDropdown ?? "", // Course from dropdown (applies to all roles)
  };

  if (data.role === "Student") {
    return {
      ...common,
      studentId: data.studentId ?? "",
    };
  }

  return {
    ...common,
    employeeId: data.employeeId ?? "",
    department: data.department ?? "",
  };
};

export const fetchUserProfile = async (uid) => {
  try {
    const profileRef = doc(db, "profiles", uid);
    const snapshot = await getDoc(profileRef);
    
    if (snapshot.exists()) {
      const data = snapshot.data();
      console.log('Fetched user profile:', { uid, role: data.role, email: data.email, data });
      return data;
    }
    
    console.warn('User profile not found in Firestore:', uid);
    return null;
  } catch (error) {
    // If permission denied, log it but return null (will be handled by login)
    if (error.code === 'permission-denied') {
      console.error('Permission denied fetching user profile. Check Firestore security rules:', error);
    } else {
      console.error('Error fetching user profile:', error);
    }
    return null;
  }
};

// Check if email exists with a specific role
export const checkEmailRoleExists = async (email, role) => {
  try {
    const emailLower = email.toLowerCase();
    const emailRoleRef = doc(db, "emailRoles", `${emailLower}_${role}`);
    const snapshot = await getDoc(emailRoleRef);
    return snapshot.exists();
  } catch (error) {
    // If permission denied, we'll skip the check and let Firebase Auth handle it
    if (error.code === 'permission-denied') {
      console.warn("Permission denied checking email role - will rely on Firebase Auth check:", error);
      return false; // Return false to allow signup attempt
    }
    console.error("Error checking email role:", error);
    return false;
  }
};

// Check if email exists with any role
export const checkEmailExists = async (email) => {
  try {
    // Check by document ID pattern (email_role)
    const emailLower = email.toLowerCase();
    const studentRef = doc(db, "emailRoles", `${emailLower}_Student`);
    const professorRef = doc(db, "emailRoles", `${emailLower}_Professor`);
    const [studentSnap, professorSnap] = await Promise.all([
      getDoc(studentRef),
      getDoc(professorRef),
    ]);
    return studentSnap.exists() || professorSnap.exists();
  } catch (error) {
    // If permission denied, we'll skip the check and let Firebase Auth handle it
    if (error.code === 'permission-denied') {
      console.warn("Permission denied checking email existence - will rely on Firebase Auth check:", error);
      return false; // Return false to allow signup attempt
    }
    console.error("Error checking email existence:", error);
    return false;
  }
};

export const createUserProfile = async (uid, profile) => {
  try {
    const timestamp = serverTimestamp();
    const profileData = {
      ...profile,
      updatedAt: timestamp,
      createdAt: timestamp,
    };
    
    // Ensure role is explicitly set
    if (!profileData.role) {
      throw new Error('Role is required in profile data');
    }
    
    console.log('Creating user profile:', { uid, profileData });
    
    await setDoc(
      doc(db, "profiles", uid),
      profileData,
      { merge: false } // Use merge: false to ensure we create a new document
    );
    
    console.log('User profile created successfully:', uid);
    
    // Verify the profile was created
    const verifySnapshot = await getDoc(doc(db, "profiles", uid));
    if (!verifySnapshot.exists()) {
      throw new Error('Profile was not created - verification failed');
    }
    
    const createdData = verifySnapshot.data();
    console.log('Verified profile data:', createdData);
    
    return createdData;
  } catch (error) {
    console.error('Error creating user profile:', error);
    // Re-throw with more context
    if (error.code === 'permission-denied') {
      const newError = new Error('Permission denied when creating profile. Please check Firestore security rules.');
      newError.code = 'permission-denied';
      throw newError;
    }
    throw error;
  }
};

export const updateUserProfile = async (uid, updates) => {
  const profileRef = doc(db, "profiles", uid);
  const payload = {
    ...updates,
    updatedAt: serverTimestamp(),
  };
  await setDoc(profileRef, payload, { merge: true });
  return payload;
};

export const signup = async (payload) => {
  let userCredential = null;
  const emailLower = payload.email.toLowerCase();
  
  try {
    // Step 0: Check if email already exists with this role (optional check)
    // If permission denied, we'll skip and let Firebase Auth handle it
    try {
      const emailRoleExists = await checkEmailRoleExists(emailLower, payload.role);
      if (emailRoleExists) {
        const error = new Error("Email already registered with this role.");
        error.code = "auth/email-already-in-use";
        throw error;
      }

      // Step 0.5: Check if email exists with different role
      const emailExists = await checkEmailExists(emailLower);
      if (emailExists) {
        const error = new Error("This email is already registered with a different role. Please use the correct role or a different email.");
        error.code = "auth/email-already-in-use";
        throw error;
      }
    } catch (checkError) {
      // If it's a permission error from our checks, continue (Firebase Auth will catch duplicates)
      if (checkError.code === 'auth/email-already-in-use') {
        throw checkError; // Re-throw our custom errors
      }
      // Otherwise, continue with signup (Firebase Auth will handle email duplicates)
      console.warn("Email check failed, continuing with signup:", checkError);
    }

    // Step 1: Create the user account
    try {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
    } catch (authError) {
      // If Firebase Auth rejects due to email already existing, check if it's a role mismatch
      if (authError.code === 'auth/email-already-in-use') {
        const emailExists = await checkEmailExists(emailLower);
        if (emailExists) {
          // Email exists with different role or same role - provide helpful message
          const studentExists = await checkEmailRoleExists(emailLower, 'Student');
          const professorExists = await checkEmailRoleExists(emailLower, 'Professor');
          
          if (studentExists && payload.role === 'Student') {
            const error = new Error("This email is already registered as a Student.");
            error.code = "auth/email-already-in-use";
            throw error;
          } else if (professorExists && payload.role === 'Professor') {
            const error = new Error("This email is already registered as a Professor.");
            error.code = "auth/email-already-in-use";
            throw error;
          } else {
            // Email exists but we don't know the role from emailRoles collection
            // This might be an old account - provide generic message
            const error = new Error("This email is already registered. Please use a different email or log in with your existing account.");
            error.code = "auth/email-already-in-use";
            throw error;
          }
        }
      }
      // Re-throw the original error if it's not email-already-in-use or if checks didn't help
      throw authError;
    }

    // Step 2: Update profile (non-critical, continue on error)
    if (payload.fullName) {
      try {
        await updateProfile(userCredential.user, {
          displayName: payload.fullName,
        });
      } catch (profileError) {
        // Log but don't fail - profile update is not critical
        console.warn('Failed to update user profile:', profileError);
      }
    }

    // Step 3: Create user profile in Firestore (REQUIRED for role-based auth)
    const profilePayload = buildProfilePayload(payload);
    // Ensure role is explicitly set
    if (!profilePayload.role || !payload.role) {
      const error = new Error('Role is required for signup.');
      error.code = 'auth/role-required';
      throw error;
    }
    
    // Ensure role is set in profile payload
    profilePayload.role = payload.role;
    
    // Create profile - this is CRITICAL for role-based auth
    try {
      const createdProfile = await createUserProfile(
        userCredential.user.uid,
        profilePayload
      );
      console.log('Profile created successfully:', { 
        uid: userCredential.user.uid, 
        role: profilePayload.role,
        profileData: createdProfile 
      });
    } catch (profileError) {
      console.error('Failed to create user profile in Firestore:', profileError);
      
      // If permission denied, provide clear instructions
      if (profileError.code === 'permission-denied' || profileError.message?.includes('permission')) {
        const error = new Error('Permission denied. Please update Firestore security rules. See firestore.rules file in the project.');
        error.code = 'auth/permission-denied';
        error.details = 'The Firestore security rules need to allow authenticated users to create profiles.';
        throw error;
      }
      
      // For other errors, throw with context
      const error = new Error(`Failed to create user profile: ${profileError.message || 'Unknown error'}`);
      error.code = 'auth/profile-creation-failed';
      error.originalError = profileError;
      throw error;
    }

    // Step 4: Create email-role mapping to prevent duplicates
    try {
      const emailRoleRef = doc(db, "emailRoles", `${emailLower}_${payload.role}`);
      await setDoc(emailRoleRef, {
        email: emailLower,
        role: payload.role,
        uid: userCredential.user.uid,
        createdAt: serverTimestamp(),
      });
      console.log('Email-role mapping created successfully:', { email: emailLower, role: payload.role });
    } catch (emailRoleError) {
      console.error('Failed to create email-role mapping:', emailRoleError);
      // This is less critical - don't fail signup, but log the error
      // Role checking might be affected, but profile is the source of truth
    }

    return userCredential.user;
  } catch (error) {
    // If account creation failed, throw the error
    // This will be caught by the SignupPage and shown to the user
    throw error;
  }
};

export const login = async (email, password, selectedRole, rememberMe = false) => {
  await setPersistence(
    auth,
    rememberMe ? browserLocalPersistence : browserSessionPersistence
  );
  
  // Step 1: Authenticate with Firebase
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  
  // Step 2: Fetch user profile to verify role (with retry logic)
  let profile = null;
  let retries = 3;
  
  while (retries > 0 && !profile) {
    profile = await fetchUserProfile(credentials.user.uid);
    if (!profile && retries > 1) {
      // Wait a bit before retrying (profile might still be creating)
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    retries--;
  }
  
  if (!profile) {
    // Profile doesn't exist - sign out and show error
    await signOut(auth);
    const error = new Error("User profile not found. Please contact support or try signing up again.");
    error.code = "auth/profile-not-found";
    throw error;
  }
  
  // Step 3: Verify the selected role matches the user's actual role
  // Normalize roles for comparison (handle case sensitivity and whitespace)
  const userRole = (profile.role?.trim() || profile.role || '').toString();
  const selectedRoleNormalized = (selectedRole?.trim() || selectedRole || '').toString();
  
  // Debug logging
  console.log('Login role check:', {
    userRole,
    selectedRoleNormalized,
    profileRole: profile.role,
    profileData: profile,
    match: userRole.toLowerCase() === selectedRoleNormalized.toLowerCase(),
    exactMatch: userRole === selectedRoleNormalized
  });
  
  if (!userRole || userRole === '') {
    // Role is missing from profile - sign out and show error
    await signOut(auth);
    const error = new Error("User role not found in profile. Please contact support.");
    error.code = "auth/role-not-found";
    throw error;
  }
  
  // Case-insensitive comparison for robustness
  const rolesMatch = userRole.toLowerCase() === selectedRoleNormalized.toLowerCase();
  
  if (!rolesMatch) {
    // Sign out the user since role doesn't match
    await signOut(auth);
    // Pass the actual role in the error for the UI to display
    const error = new Error(`Role mismatch! You signed up as ${userRole}. Please select the correct role.`);
    error.code = "auth/role-mismatch";
    error.actualRole = userRole; // Store actual role for UI display
    throw error;
  }
  
  console.log('Login successful with role verification:', { email, role: userRole });
  return credentials.user;
};

export const logout = () => signOut(auth);

export const requestPasswordReset = (email) =>
  sendPasswordResetEmail(auth, email);
