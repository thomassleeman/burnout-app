import { app } from "@/firebase/auth/appConfig";
import { getAuth, User, onAuthStateChanged, Unsubscribe } from "firebase/auth";

const auth = getAuth(app);

export default function authStatus(
  callback: (user: User | null) => void
): Unsubscribe {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
