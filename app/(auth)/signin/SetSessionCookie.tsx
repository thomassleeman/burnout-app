"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { getIdToken } from "firebase/auth";
import { auth } from "@/firebase/auth/appConfig";

//jotai
import { useAtom } from "jotai";
import { isAdminAtom, usernameAtom, userIDAtom } from "@/state/store";
import { useErrors } from "@/hooks/useErrors";

import Spinner from "@/components/ui/_components/Spinner";

import { CheckIcon } from "@heroicons/react/20/solid";

export default function SetSessionCookie() {
  const router = useRouter();
  const { errors, addError } = useErrors();
  const [session, setSession] = useState(false);

  const [, setIsAdmin] = useAtom(isAdminAtom);
  const [, setUsername] = useAtom(usernameAtom);
  const [, setUserID] = useAtom(userIDAtom);
  const [authStateLoading, setAuthStateLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      setAuthStateLoading(true);
      if (user) {
        if (!user.emailVerified) {
          addError(
            'Please verify your email address before signing in. To receive another verification email select "forgot password".'
          );
          setAuthStateLoading(false);
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
            setUsername(data.decodedToken?.name);
            setUserID(data.decodedToken?.uid);
            setSession(true);
            setAuthStateLoading(false);
            console.log("router: ", router);
          } else {
            console.log("response.status: ", response.status);
          }
        } catch (err) {
          console.log("set token error from signin page: ", err);
          addError((err as { message: string }).message);
          setAuthStateLoading(false);
        }
      } else {
        setAuthStateLoading(false);
        return;
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [router, setUserID, setUsername, setIsAdmin, addError]);

  useEffect(() => {
    if (session) {
      window.location.assign("/home");
    }
  }, [session, router]);

  let content;
  if (session) {
    content = (
      <>
        <div className="flex gap-x-4 align-middle">
          <h2 className="text-4xl font-bold leading-9 tracking-tight text-slate-600 md:mb-8">
            Signed in
          </h2>
          <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        {/* Using a instead of link here as Link is not working is some scenarios. */}
        <a href="/home" className="text-emerald-700 hover:text-emerald-600">
          Go to home
        </a>
      </>
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

  // if (!session && authStateLoading) {
  if (authStateLoading) {
    content = (
      <div className="flex gap-x-4 align-middle">
        <h2 className="text-4xl font-bold leading-9 tracking-tight text-slate-600 md:mb-8">
          Signing in
        </h2>
        <Spinner size="medium" />
      </div>
    );
  }

  return content || null;
}
