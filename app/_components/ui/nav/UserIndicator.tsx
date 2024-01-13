//jotai
import { useAtom } from "jotai";
import { usernameAtom, userIDAtom } from "@/state/store";

//components
// import UserIcon from "@/components/design/icons/UserIcon";

//heroicons
import { UserIcon } from "@heroicons/react/20/solid";

export default function UserIndicator() {
  const [username] = useAtom(usernameAtom);
  const [userID] = useAtom(userIDAtom);

  //   if (!userID) return null;

  if (username) {
    const usernameArray = username.split(" ");
    const initials = usernameArray[0][0] + usernameArray[1][0];

    return (
      <div className="ml-6 flex h-3/4 w-auto items-center justify-center self-center  justify-self-end rounded-full bg-green-900 p-3">
        <div className="text-xl font-thin uppercase text-white">{initials}</div>
      </div>
    );
  } else {
    return (
      <div className="ml-6 flex h-10 w-10 items-center justify-center self-center  justify-self-end rounded-full bg-green-900 p-3">
        <div className="text-xl font-thin uppercase text-black">
          <UserIcon className="h-8 w-auto text-white" />
        </div>
      </div>
    );
  }
}
