"use client";
//firebase
import { auth } from "@/firebase/auth/appConfig";
//react firebase hooks
import { useSignInWithApple } from "react-firebase-hooks/auth";
//jotai
import { useAtom } from "jotai";
import { anyErrorAtom } from "@/state/store";
//functions
import addToDbIfNewUser from "../../signup/addToDbIfNewUser";
//components
import AppleButton from "./AppleButton";

export default function SignInWithGoogle() {
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

  const [, setAnyError] = useAtom(anyErrorAtom);

  if (error) {
    setAnyError(error);
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
