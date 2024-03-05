// import { app } from "@/firebase/auth/appConfig";
// import { getAuth, User, onAuthStateChanged, Unsubscribe } from "firebase/auth";

// const auth = getAuth(app);

// export default function authStatus(
//   callback: (user: User | null) => void
// ): Unsubscribe {
//   return onAuthStateChanged(auth, (user) => {
//     callback(user);
//   });
// }

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    return user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
