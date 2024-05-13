"use client";

//react
import { useEffect } from "react";

//firebase
import { auth } from "@/firebase/auth/appConfig";
import { onAuthStateChanged } from "firebase/auth";

//jotai
import { useAtom } from "jotai";
import { usernameAtom, userIDAtom } from "@/state/store";

//heroicons
import { UserIcon } from "@heroicons/react/24/outline";

/* -------------- USER INDICATOR -------------------- */
export default function UserIndicator() {
  const [username, setUsername] = useAtom(usernameAtom);
  const [userID, setUserID] = useAtom(userIDAtom);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      setUsername(user.displayName || "");
    });
  }, [setUsername]);

  // if (!userID) return null;

  if (username) {
    const usernameArray = username.split(" ");
    const initials = usernameArray[0][0] + usernameArray[1][0];

    return (
      <div className="ml-6 flex h-12 w-12 items-center justify-center self-center justify-self-end rounded-full bg-gradient-to-r from-purple-500/75 to-pink-500/75 p-3 drop-shadow-lg">
        <div className="text-xl font-thin uppercase text-white">{initials}</div>
      </div>
    );
  } else {
    return (
      <div className="ml-6 flex h-12 w-12 items-center justify-center self-center justify-self-end rounded-full bg-gradient-to-r from-purple-500/75 to-pink-500/75 p-3 drop-shadow-lg">
        <div className="">
          <UserIcon className="h-8 w-8 text-white" />
        </div>
      </div>
    );
  }
}

// h-3/4 w-auto
