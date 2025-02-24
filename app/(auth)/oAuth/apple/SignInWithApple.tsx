"use client";
//firebase
import { auth } from "@/firebase/auth/appConfig";
//react firebase hooks
import { useSignInWithApple } from "react-firebase-hooks/auth";

//errors
import { useErrors } from "@/hooks/useErrors";
//functions
import addToDbIfNewUser from "../../signup/addToDbIfNewUser";
//components
import AppleButton from "./AppleButton";
import { add } from "date-fns";

export default function SignInWithGoogle() {
  const { errors, addError } = useErrors();

  const [signInWithApple, user, loading, error] = useSignInWithApple(auth);

  const handleSubmit = async () => {
    try {
      const userCred = await signInWithApple();
      if (!userCred) {
        throw new Error("No user credentials returned from Google");
      }
      addToDbIfNewUser(userCred.user);
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    addError(error.message);
  }
  if (loading) {
    <button disabled type="button">
      <AppleButton loading={true} />
    </button>;
  }
  return (
    <button type="button" onClick={handleSubmit}>
      <AppleButton loading={false} />
    </button>
  );
}
