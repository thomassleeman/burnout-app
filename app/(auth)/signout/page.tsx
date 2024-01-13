"use client";
//react
import { useState, useEffect } from "react";
//next
import { useRouter } from "next/navigation";
//firebase
import { auth } from "@/firebase/auth/appConfig";
import { useSignOut } from "react-firebase-hooks/auth";
import { useAuthState } from "react-firebase-hooks/auth";
//components
import ErrorAlert from "@/components/ui/ErrorAlert";
import Spinner from "@/components/design/Spinner";

export default function SignOut() {
  const [user] = useAuthState(auth);
  const [apiSignoutErr, setApiSignoutErr] = useState({});
  const router = useRouter();

  const [signOut, loading, fbError] = useSignOut(auth);

  const handleSignOut = async () => {
    const userSignedOut = await signOut();

    const response = await fetch("/api/signout", {
      method: "POST",
    });

    if (response.status === 200 && userSignedOut) {
      router.push("/signin");
    } else {
      setApiSignoutErr({ message: "Something went wrong. Please try again." });
    }
  };

  type CustomError = {
    message: string;
    [key: string]: any; // Optional additional properties
  };

  const anyError = (fbError || apiSignoutErr) as CustomError | null;

  return (
    <>
      {/* I have removed min-h-screen from this main tag. */}
      <main>
        <ErrorAlert />
        {/* I have removed min-h-full from this div */}
        {/* <div className="flex flex-1"> */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <h2 className="text-3xl font-bold leading-9 tracking-tight text-slate-600 md:mb-8">
              Sign Out
            </h2>
            <div className="mt-10">
              <div>
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="leading-6text-sm pb-7 text-base text-gray-500">
                      {user ? `Signed in as ${user.email}` : null}
                    </h3>

                    <button
                      onClick={handleSignOut}
                      // className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      className="flex w-full justify-center rounded-md bg-emerald-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-emerald-600 focus-visible:ring-2 focus-visible:ring-offset-2"
                    >
                      {!loading && user ? (
                        "Sign Out"
                      ) : (
                        // <CogIcon className="h-8 animate-spin" />
                        <Spinner className="h-6 w-6" />
                        // <Grid className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="relative hidden w-0 flex-1 md:block">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
              alt=""
            />
          </div>
        </div> */}
      </main>
    </>
  );
}
