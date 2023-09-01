"use client";
import { useEffect } from "react";
import { auth } from "@/firebase/auth/appConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import brushStrokeTree from "@/components/design/brushStrokeTree.png";

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
      <Image
        className="h-28 w-auto animate-pulse grayscale"
        src={brushStrokeTree}
        alt="Burnout Project Logo"
      />

      <h2 className="text-3xl text-slate-500">Loading...</h2>
    </div>
  );
}
