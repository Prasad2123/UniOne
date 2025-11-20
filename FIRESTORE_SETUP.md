# Firestore Security Rules Setup Guide

## ⚠️ IMPORTANT: You MUST set up Firestore security rules for the app to work!

The app is currently showing "Permission denied" errors because Firestore security rules are not configured.

## Steps to Fix:

### 1. Go to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project (UniOne)
3. Click on **Firestore Database** in the left sidebar
4. Click on the **Rules** tab

### 2. Copy and Paste These Rules

Replace the existing rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if user owns the document
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Profiles collection - users can read/write their own profile
    match /profiles/{userId} {
      // Allow read if authenticated (users can read their own profile)
      allow read: if isAuthenticated();
      
      // Allow create/update if user is creating/updating their own profile
      allow create: if isAuthenticated() && request.auth.uid == userId 
                    && request.resource.data.keys().hasAll(['role', 'email', 'fullName'])
                    && request.resource.data.role is string
                    && request.resource.data.email is string;
      
      allow update: if isOwner(userId);
      allow delete: if isOwner(userId);
    }
    
    // EmailRoles collection - for tracking email-role combinations
    match /emailRoles/{emailRoleId} {
      // Allow read if authenticated
      allow read: if isAuthenticated();
      
      // Allow create if authenticated (during signup)
      allow create: if isAuthenticated() 
                    && request.resource.data.keys().hasAll(['email', 'role', 'uid'])
                    && request.resource.data.uid == request.auth.uid;
      
      // Allow update/delete only by the owner
      allow update, delete: if isAuthenticated() 
                            && resource.data.uid == request.auth.uid;
    }
    
    // Default deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 3. Publish the Rules
1. Click the **Publish** button at the top
2. Wait for confirmation that rules are published

### 4. Test the App
1. Try signing up a new user
2. Check Firestore Database → Data tab to see if:
   - A document was created in `profiles` collection with the user's UID
   - A document was created in `emailRoles` collection with format `email_role`

## What These Rules Do:

1. **Profiles Collection:**
   - Authenticated users can read any profile (for role checking)
   - Users can only create/update their own profile
   - Ensures required fields (role, email, fullName) are present

2. **EmailRoles Collection:**
   - Authenticated users can read email-role mappings
   - Users can create their own email-role mapping during signup
   - Users can only update/delete their own mappings

3. **Security:**
   - All operations require authentication
   - Users can only modify their own data
   - Default deny for all other collections

## Troubleshooting:

### If you still get permission errors:
1. Make sure you're logged in (check Firebase Auth)
2. Verify the rules were published (check Rules tab shows your new rules)
3. Check browser console for specific error messages
4. Ensure the user UID matches between Auth and Firestore operations

### For Development/Testing:
If you want to allow all operations during development (NOT RECOMMENDED FOR PRODUCTION):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

⚠️ **WARNING:** The above rules allow any authenticated user to read/write any document. Only use for testing!

## After Setup:

Once rules are configured:
1. Sign up should work and save data to Firestore
2. Login should fetch role from Firestore and verify it matches
3. Role-based authentication will work correctly

