"use client";
//firebase
import { auth } from "@/firebase/auth/appConfig";
//react firebase hooks
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
//jotai
import { useAtom } from "jotai";
import { anyErrorAtom } from "@/state/store";
//functions
import addToDbIfNewUser from "../../signup/addToDbIfNewUser";
//components
import GoogleButton from "./GoogleButton";

export default function SignInWithGoogle() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleSubmit = async () => {
    try {
      const userCred = await signInWithGoogle();
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
      <GoogleButton loading={true} />
    </button>;
  }
  return (
    <button type="button" onClick={handleSubmit}>
      <GoogleButton loading={false} />
    </button>
  );
}
