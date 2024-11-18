// userListener.ts
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "@/firebase/auth/appConfig";
import { UserData } from "@/types/storeTypes"; // Ensure UserData type is imported

export const initUserListener = (
  userId: string,
  setUser: (userData: UserData | null) => void
) => {
  const userDocRef = doc(db, "users", userId);

  return onSnapshot(
    userDocRef,
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        setUser(docSnapshot.data() as UserData);
      } else {
        setUser(null);
      }
    },
    (error) => {
      console.error("Error fetching user data:", error);
      setUser(null);
    }
  );
};
