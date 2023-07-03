import { app } from '@/firebase/auth/appConfig';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(app);

export default async function emailSignIn(email: string, password: string) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);

    return user;
  } catch (error) {
    const errorCode = error.code;
    return errorCode;
    // const errorMessage = error.message;
    // console.log(error);
    // throw new Error(errorCode);
  }
}
