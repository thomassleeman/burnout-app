/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from 'firebase-functions/v2/https';
// import * as logger from 'firebase-functions/logger';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();
// Firebase Admin SDK to access Firestore.
const db = admin.firestore();

/**
 * Create user in Firestore on user account creation through Firebase Auth.
 */
export const createUser = functions.auth.user().onCreate(async (user) => {
  /**
   * Cherry pick user data to only send
   * what we actually need to the client.
   */
  const newUser = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    providerData: user.providerData,
  };

  db.collection('users').doc(user.uid).set(newUser);
});

// /**
//  * Delete user in Firestore on user account deletion through Firebase Auth.
//  */
// export const deleteUserDocument = functions.auth
//   .user()
//   .onDelete(async (user) => {
//     db.collection('users').doc(user.uid).delete()
//   })
