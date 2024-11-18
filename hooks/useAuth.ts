// hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/auth/appConfig";
import { useRouter } from "next/navigation";

export default function useAuth(redirectTo = "/login") {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push(redirectTo);
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router, redirectTo]);

  return user;
}
