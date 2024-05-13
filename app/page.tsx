"use client";
import { useEffect } from "react";
import { auth } from "@/firebase/auth/appConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import brainLogo from "@/components/design/brainLogo.png";

export default function Home() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      window.location.assign("/home");
    } else {
      window.location.assign("/signin");
    }
  }, [user, router]);
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
      <h1 className="mb-8 text-5xl text-green-900 dark:text-slate-200">
        Burnout Hub
      </h1>
      <Image
        className="h-72 w-auto animate-pulse rounded-2xl dark:animate-none dark:shadow-2xl dark:shadow-yellow-200"
        src={brainLogo}
        alt="Burnout Project Logo"
      />

      <h2 className="text-3xl text-green-900 dark:text-slate-200">
        Loading...
      </h2>
    </div>
  );
}
