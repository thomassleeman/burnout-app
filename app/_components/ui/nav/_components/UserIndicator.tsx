"use client";

import { useAtomValue } from "jotai";
import { userIDAtom, usernameAtom } from "@/state/store";
import { UserIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

/**
 * UserIndicator displays a circular avatar with the user's initials or a generic icon
 * Only renders when a user is logged in and navigates to their profile when clicked
 */
export default function UserIndicator() {
  const router = useRouter();
  const userId = useAtomValue(userIDAtom);
  const username = useAtomValue(usernameAtom);

  console.log("UserId: ", userId);

  // Don't render anything if no user is logged in
  if (!userId) {
    return null;
  }

  // Generate initials from username if available
  let initials = "";
  if (username) {
    initials = username
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2); // Limit to 2 characters for visual consistency
  }

  // Navigate to profile when clicked
  const handleClick = () => {
    router.push(`/profile/${userId}`);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Go to your profile"
      title="View your profile"
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-emerald-700 text-white transition-colors hover:bg-emerald-600"
    >
      {initials ? (
        <span className="text-sm font-semibold">{initials}</span>
      ) : (
        <UserIcon className="h-5 w-5" />
      )}
    </div>
  );
}

// "use client";

// // react
// import { useEffect, useState } from "react";

// // next.js
// import { useRouter } from "next/navigation";

// // firebase
// import { auth } from "@/firebase/auth/appConfig";
// import { onAuthStateChanged } from "firebase/auth";

// // jotai
// import { useAtom } from "jotai";
// import { usernameAtom, userIDAtom } from "@/state/store";

// // heroicons
// import { UserIcon } from "@heroicons/react/24/outline";

// /* -------------- USER INDICATOR -------------------- */
// export default function UserIndicator() {
//   const [username, setUsername] = useAtom(usernameAtom);
//   const [userID, setUserID] = useState(userIDAtom);
//   const [initials, setInitials] = useState<string>("");
//   const [authChecked, setAuthChecked] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setAuthChecked(true);

//       if (!user) return;

//       setUsername(user.displayName || "");
//       setUserID(user.uid);

//       // Calculate initials when username changes
//       if (user.displayName) {
//         const nameParts = user.displayName.split(" ");
//         if (nameParts.length >= 2) {
//           setInitials(nameParts[0][0] + nameParts[1][0]);
//         } else if (nameParts.length === 1 && nameParts[0].length > 0) {
//           setInitials(nameParts[0][0]);
//         }
//       }
//     });

//     // Clean up subscription
//     return () => unsubscribe();
//   }, [setUsername, setUserID]);

//   // Don't render until auth state is checked
//   if (!authChecked) return null;

//   // Prevent rendering without a user ID
//   if (!userID) return null;

//   console.log("User ID:", userID);

//   const handleClick = () => {
//     if (userID) {
//       router.push(`/profile/${userID}`);
//       console.log("Navigating to:", `/profile/${userID}`);
//     } else {
//       console.log("User ID not available yet");
//       // Maybe redirect to login page or show a message
//     }
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className="flex h-12 w-12 cursor-pointer items-center justify-center self-center justify-self-end rounded-full bg-gradient-to-r from-purple-500/75 to-pink-500/75 p-3 drop-shadow-lg hover:outline hover:outline-2 hover:outline-sky-500"
//     >
//       {username && initials ? (
//         <div className="text-xl font-thin uppercase text-white">{initials}</div>
//       ) : (
//         <UserIcon className="h-8 w-8 text-white" />
//       )}
//     </div>
//   );
// }

// "use client";

// //react
// import { useEffect } from "react";

// //next.js
// import Link from "next/link";

// //firebase
// import { auth } from "@/firebase/auth/appConfig";
// import { onAuthStateChanged } from "firebase/auth";

// //jotai
// import { useAtom } from "jotai";
// import { usernameAtom, userIDAtom } from "@/state/store";

// //heroicons
// import { UserIcon } from "@heroicons/react/24/outline";

// /* -------------- USER INDICATOR -------------------- */
// export default function UserIndicator() {
//   const [username, setUsername] = useAtom(usernameAtom);
//   // const [userID, setUserID] = useAtom(userIDAtom);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (!user) return;
//       setUsername(user.displayName || "");
//     });
//   }, [setUsername]);

//   // if (!userID) return null;

//   let content;

//   if (username) {
//     const usernameArray = username.split(" ");
//     const initials = usernameArray[0][0] + usernameArray[1][0];

//     content = (
//       <div className="text-xl font-thin uppercase text-white">{initials}</div>
//     );
//   } else {
//     content = <UserIcon className="h-8 w-8 text-white" />;
//   }

//   return (
//     <Link href={`/profile/${auth.currentUser?.uid}`} className="flex">
//       <div className="flex h-12 w-12 items-center justify-center self-center justify-self-end rounded-full bg-gradient-to-r from-purple-500/75 to-pink-500/75 p-3 drop-shadow-lg hover:outline hover:outline-2 hover:outline-sky-500">
//         {content}
//       </div>
//     </Link>
//   );
// }

//check link is working.
