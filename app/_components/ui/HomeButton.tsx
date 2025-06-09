"use client";

import { useState } from "react";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/auth/appConfig";
import Spinner from "@/components/design/Spinner";

export default function HomeButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    const currentUser = auth.currentUser;
    if (currentUser) {
      router.push(`/home/${currentUser.uid}`);
    } else {
      router.push("/signin");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="rounded-md bg-emerald-600 px-4 py-2 text-white"
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Spinner className="h-6 w-6" />
        </div>
      ) : (
        <HomeIcon className="h-6 w-6" />
      )}
    </button>
  );
}
