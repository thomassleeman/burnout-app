import { db } from "@/firebase/auth/appConfig";
import { User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default async function addToDbIfNewUser(user: User) {
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    const createdAt = new Date();
    const newUser = {
      uid: user.uid,
      email: user.email,
      providerData: user.providerData,
    };

    try {
      await setDoc(doc(db, "users", user.uid), {
        ...newUser,
        createdAt,
      }).catch((error) => {
        throw error;
      });

      return { newUser };
    } catch (error) {
      console.error("Error creating user document", error);
      return { error };
    }
  } else {
    console.log("user exists. userDoc: ", userDoc);
    return;
  }
}
