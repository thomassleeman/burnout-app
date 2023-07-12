"use client";
import { useEffect } from "react";
import { auth } from "@/firebase/auth/appConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Logo from "@/components/design/Logo";

export default function Home() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  }, [user, router]);
  return (
    <div className="flex h-52 flex-col items-center justify-center gap-y-7">
      <Logo className="animate-spin-slow grayscale" height="50px" />
      <h2 className="text-3xl text-slate-500">Loading...</h2>
    </div>
  );
}
