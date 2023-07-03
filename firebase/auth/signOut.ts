import { app } from '@/firebase/auth/appConfig';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(app);

export default async function signUserOut() {
  try {
    await signOut(auth);
    console.log('sign out successful');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
