import { app } from '@/firebase/auth/appConfig';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(app);

export default async function emailSignUp(email: string, password: string) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
}
