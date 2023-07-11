import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@firebase/auth/appConfig";

interface SignUpState {
  loading: boolean;
  error: Error | null;
}

const useAddNewUserToDB = (user: User | null): SignUpState => {
  const [state, setState] = useState<SignUpState>({
    loading: false,
    error: null,
  });

  useEffect(() => {
    const createUserDocument = async () => {
      if (user) {
        setState({ loading: true, error: null });
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          const createdAt = new Date();

          try {
            await setDoc(userRef, {
              email: user.email,
              createdAt,
              // ...any other fields to be included
            });
          } catch (error) {
            console.error("Error creating user document", error);
            setState({ loading: false, error: error as Error });
          }
        }
        setState({ loading: false, error: null });
      }
    };

    createUserDocument();
  }, [user]);

  return state;
};

export default useAddNewUserToDB;
