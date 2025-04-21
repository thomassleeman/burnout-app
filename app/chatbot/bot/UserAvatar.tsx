"use client";

//jotai
import { useAtomValue } from "jotai";
import { userAtom } from "@/state/store";

//heroicons
import { UserIcon } from "@heroicons/react/24/outline";

/* -------------- USER INDICATOR -------------------- */
export default function UserIndicator() {
  const user = useAtomValue(userAtom);
  const userName = user?.providerData[0]?.displayName || "";

  let content;

  if (userName) {
    const usernameArray = userName.split(" ");
    const initials = usernameArray[0][0] + usernameArray[1][0];

    content = (
      <div className="text-xl font-thin uppercase text-white">{initials}</div>
    );
  } else {
    content = <UserIcon className="h-8 w-8 text-white" />;
  }

  return (
    <div className="ml-4 flex h-12 w-12 items-center justify-center self-center justify-self-end rounded-full bg-gradient-to-r from-purple-500/75 to-pink-500/75 p-3 drop-shadow-lg hover:outline hover:outline-2 hover:outline-sky-500">
      {content}
    </div>
  );
}

//check link is working.
