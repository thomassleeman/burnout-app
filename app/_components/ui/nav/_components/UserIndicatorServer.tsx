//next.js
import Link from "next/link";
//heroicons
import { UserIcon } from "@heroicons/react/24/outline";

export default function UserIndicatorServer({ user }) {
  if (!user) {
    return null;
  }

  let content;
  if (user.displayName) {
    const usernameArray = user.displayName.split(" ");
    const initials = usernameArray[0][0] + usernameArray[1][0];

    content = (
      <div className="text-xl font-thin uppercase text-white">{initials}</div>
    );
  } else {
    content = <UserIcon className="h-8 w-8 text-white" />;
  }

  return (
    <Link href={`/profile/${user.uid}`} className="flex">
      <div className="flex h-12 w-12 items-center justify-center self-center justify-self-end rounded-full bg-gradient-to-r from-purple-500/75 to-pink-500/75 p-3 drop-shadow-lg hover:outline hover:outline-2 hover:outline-sky-500">
        {content}
      </div>
    </Link>
  );
}
