"use client";
import { useEffect } from "react";
import { auth } from "@/firebase/auth/appConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import brushStrokeTree from "@/components/design/brushStrokeTree.png";
import brainLogoWithText from "@/components/design/brainLogoWithText.png";

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
    <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
      <Image
        className="h-72 w-auto animate-pulse"
        src={brainLogoWithText}
        alt="Burnout Project Logo"
      />

      <h2 className="text-3xl text-green-900">Loading...</h2>
    </div>
  );
}
