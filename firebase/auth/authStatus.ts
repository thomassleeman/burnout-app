import { app } from '@/firebase/auth/appConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'firebase/app';

const auth = getAuth(app);

export default function authStatus(
  callback: (user: firebase.User | null) => void
): firebase.Unsubscribe {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
