"use client";

import { Suspense } from "react";
import Spinner from "@/app/_components/ui/_components/Spinner";
import JoinPageContent from "./JoinPageContent";

export default function JoinPage() {
  return (
    <Suspense
      fallback={
        <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
          <div className="flex items-center gap-x-6">
            <Spinner size="medium" />
            <h2 className="text-3xl text-emerald-700 dark:text-slate-200">
              Loading join page...
            </h2>
          </div>
        </div>
      }
    >
      <JoinPageContent />
    </Suspense>
  );
}

// "use client";

// import { useState, useEffect, Suspense } from "react";
// import { useSearchParams, useRouter, useParams } from "next/navigation";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/firebase/auth/appConfig";

// import Spinner from "@/app/_components/ui/_components/Spinner";
// import { InformationCircleIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";

// export default function JoinPage() {
//   const searchParams = useSearchParams();
//   const orgId = searchParams.get("org");
//   const token = searchParams.get("token");
//   // const adminToken = searchParams.get("admin-token");

//   // (A) Auth state with react-firebase-hooks/auth
//   const [user, loadingUser, errorAuth] = useAuthState(auth);

//   // (B) Additional UI states
//   const [urlOk, setUrlOk] = useState(true);
//   const [joining, setJoining] = useState(false);
//   const [joined, setJoined] = useState(false);
//   const [joinError, setJoinError] = useState<string | null>(null);

//   // (C) Check URL on mount
//   useEffect(() => {
//     if (!orgId || !token) {
//       setUrlOk(false);
//     }
//   }, [orgId, token]);

//   // (D) Once we have user (or not), and if URL is valid, attempt joining
//   useEffect(() => {
//     // If URL is invalid or we haven't finished checking auth, do nothing
//     if (!urlOk || loadingUser) return;

//     // If user not logged in, do nothing yet (the UI will show "You need an account")
//     if (!user) return;

//     // We have a logged-in user, and a valid URL => Attempt to join org
//     async function joinOrg() {
//       setJoining(true);
//       setJoinError(null);
//       try {
//         const response = await fetch("/api/join-organisation", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             orgId,
//             token,
//             uid: user?.uid,
//             role: "standard",
//           }),
//         });
//         const data = await response.json();
//         if (data.success) {
//           console.log("User joined organisation successfully");
//           setJoined(true);
//         } else {
//           console.error("Join error:", data.error);
//           setJoinError(data.error || "Unknown error");
//         }
//       } catch (err: any) {
//         console.error("Failed to join org:", err);
//         setJoinError(err.message || "Unknown error");
//       } finally {
//         setJoining(false);
//       }
//     }

//     joinOrg();
//   }, [user, loadingUser, urlOk, orgId, token]);

//   // (E) 1. Check if we’re still verifying auth state
//   if (loadingUser) {
//     return (
//       <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
//         <div className="flex items-center gap-x-6">
//           <Spinner size="medium" />
//           <h2 className="text-3xl text-emerald-700 dark:text-slate-200">
//             Checking your login...
//           </h2>
//         </div>
//       </div>
//     );
//   }

//   // (F) 2. Check if URL is invalid
//   if (!urlOk) {
//     return (
//       <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
//         <div className="flex items-center gap-x-6">
//           <InformationCircleIcon className="h-8 w-8 text-emerald-700 dark:text-emerald-500" />
//           <h2 className="text-3xl text-emerald-700 dark:text-slate-200">
//             Invalid URL
//           </h2>
//         </div>
//         <p className="text-lg text-slate-700 dark:text-slate-200">
//           There is a problem with the invitation url you have entered. Please
//           contact your organisation&apos;s admin user and ask for a new url.
//         </p>
//       </div>
//     );
//   }

//   // (G) 3. Check if user is not logged in => "Need an account"
//   if (!user) {
//     return (
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto mt-16 max-w-3xl">
//           <InformationCircleIcon className="mx-auto mb-4 h-8 w-8 text-emerald-700 dark:text-emerald-500" />
//           <div className="flex flex-col items-center justify-center gap-y-7">
//             <h2 className="mb-6 text-2xl text-emerald-700 dark:text-white">
//               You need an account to use an invitation code.
//             </h2>
//             <p>
//               If you already have an account, please{" "}
//               <Link
//                 className="text-emerald-600 underline underline-offset-2"
//                 href="/signin"
//               >
//                 sign in here
//               </Link>
//               . <br />
//               <br />
//               If you do not have an account,{" "}
//               <Link
//                 className="text-emerald-600 underline underline-offset-2"
//                 href="/signup"
//               >
//                 create one here
//               </Link>
//               .
//             </p>
//             <h2 className="mt-8 text-xl text-emerald-700 dark:text-white">
//               ...once you have created your account, use the invitation link
//               again to join your organisation.
//             </h2>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // (H) 4. If user is logged in, we either show "Joining" or "Joined" or an error
//   if (joining) {
//     return (
//       <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
//         <div className="flex items-center gap-x-6">
//           <Spinner size="medium" />
//           <h2 className="text-3xl text-emerald-700 dark:text-slate-200">
//             Joining organisation...
//           </h2>
//         </div>
//       </div>
//     );
//   }

//   // (I) 5. If user is done joining
//   if (joined && !joinError) {
//     return (
//       <div className="mx-auto mt-16 max-w-3xl text-center">
//         <h2 className="mb-6 text-2xl text-emerald-700 dark:text-white">
//           You have joined the organisation successfully!
//         </h2>
//         <Link
//           className="text-emerald-600 underline underline-offset-2"
//           href="/home" // or wherever you want to send them next
//         >
//           Go to Home
//         </Link>
//       </div>
//     );
//   }

//   // (J) 6. If there's an error joining
//   if (joinError) {
//     return (
//       <div className="mx-auto mt-16 max-w-3xl text-center">
//         <InformationCircleIcon className="mx-auto mb-4 h-8 w-8 text-red-500" />
//         <h2 className="mb-6 text-2xl text-red-600 dark:text-white">
//           Failed to join organisation
//         </h2>
//         <p className="mb-8 text-slate-700 dark:text-slate-300">{joinError}</p>
//         <Link
//           className="text-emerald-600 underline underline-offset-2"
//           href="/home" // or /dashboard, etc.
//         >
//           Go to Home
//         </Link>
//       </div>
//     );
//   }

//   // Fallback
//   return null;
// }
