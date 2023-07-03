const {
  initializeApp,
  applicationDefault,
  cert,
} = require('firebase-admin/app');
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require('firebase-admin/firestore');

import { adminInit } from '@/firebase/auth/adminConfig';

adminInit();

const db = getFirestore();

export default function ProfilePage({ params }: { params: { uid: number } }) {
  const fetchUser = async (uid) => {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('uid', '==', uid).get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  };
  fetchUser(params.uid);

  return <h1>User Id is: {params.uid}</h1>;
}
