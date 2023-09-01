"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { getIdToken, User } from "firebase/auth";
import { auth } from "@/firebase/auth/appConfig";

import { useAuthState } from "react-firebase-hooks/auth";
//jotai
import { useAtom } from "jotai";
import { isAdminAtom } from "@/state/store";
import { anyErrorAtom } from "@/state/store";

import Spinner from "@/components/design/Spinner";

import { CheckIcon } from "@heroicons/react/20/solid";

export default function SetSessionCookie() {
  const router = useRouter();
  const [session, setSession] = useState(false);
  const [, setAnyError] = useAtom(anyErrorAtom);
  const [tokenError, setTokenError] = useState({});
  const [, setIsAdmin] = useAtom(isAdminAtom);
  const [authStateUser, authStateLoading, authStateError] = useAuthState(auth, {
    onUserChanged: async (user): Promise<void> => {
      if (!user) {
        console.log("user is null");
        return;
      }
      if (user && !user.emailVerified) {
        setAnyError({
          message:
            'Please verify your email address before signing in. To receive another verification email select "forgot password".',
        });
        return;
      }
      const token = await getIdToken(user);
      try {
        const response = await fetch("/api/signin", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setIsAdmin(data.decodedToken?.admin);
          setSession(true);
          router.push("/dashboard");
          return;
        }
      } catch (err) {
        console.log("set token error from signin page: ", err);
      }
    },
  });

  let content;
  if (session) {
    content = (
      <div className="flex gap-x-4 align-middle">
        <h2 className="text-4xl font-bold leading-9 tracking-tight text-slate-600 md:mb-8">
          Signed in
        </h2>
        <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
      </div>
    );
  }
  if (!session && !authStateLoading) {
    content = (
      <div className="flex align-middle">
        <h2 className="text-4xl font-bold leading-9 tracking-tight text-slate-600 md:mb-8">
          Sign in
        </h2>
      </div>
    );
  }

  if (!session && authStateLoading) {
    content = (
      <div className="flex gap-x-4 align-middle">
        <h2 className="text-4xl font-bold leading-9 tracking-tight text-slate-600 md:mb-8">
          Signing in
        </h2>
        <Spinner stroke="green" />
      </div>
    );
  }

  return content || null;
}
