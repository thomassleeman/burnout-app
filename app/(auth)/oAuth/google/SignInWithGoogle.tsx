"use client";
//react
import { useEffect } from "react";
//firebase
import { auth } from "@/firebase/auth/appConfig";
//react firebase hooks
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

//errors
import { useErrors } from "@/hooks/useErrors";

//functions
import addToDbIfNewUser from "../../signup/addToDbIfNewUser";
//components
import GoogleButton from "./GoogleButton";

export default function SignInWithGoogle() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const { errors, addError } = useErrors();

  useEffect(() => {
    if (error) {
      addError(error.message);
    }
  }, [error, addError]);

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

  if (loading) {
    return (
      <button disabled type="button">
        <GoogleButton loading={true} />
      </button>
    );
  }

  return (
    <button type="button" onClick={handleSubmit}>
      <GoogleButton loading={false} />
    </button>
  );
}
