"use client";
//react
import { useEffect } from "react";
//next
import { useRouter } from "next/navigation";
//firebase
import { auth } from "@/firebase/auth/appConfig";
import { useSignOut } from "react-firebase-hooks/auth";
import { useAuthState } from "react-firebase-hooks/auth";
//errors
import { useErrors } from "@/hooks/useErrors";

//components
import Spinner from "@/components/ui/_components/Spinner";

export default function SignOut() {
  const { errors, addError } = useErrors();

  const [user] = useAuthState(auth);

  const router = useRouter();

  const [signOut, useSignOutLoading, useSignOutError] = useSignOut(auth);

  const handleSignOut = async () => {
    try {
      const userSignedOut = await signOut();
      const response = await fetch("/api/signout", {
        method: "POST",
      });
      if (response.status === 200 && userSignedOut) {
        router.push("/");
      } else {
        addError("Something went wrong. Please try again.");
      }
    } catch (useSignOutError) {
      if (
        typeof useSignOutError === "object" &&
        useSignOutError !== null &&
        "message" in useSignOutError &&
        typeof useSignOutError.message === "string"
      ) {
        addError(useSignOutError.message);
      } else {
        // If signInError does not match the expected structure, set a default error message
        addError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    if (useSignOutError) {
      addError(useSignOutError.message);
    }
  }, [useSignOutError, addError]);

  return (
    <>
      <main>
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <h2 className="text-3xl font-bold leading-9 tracking-tight text-slate-600 md:mb-8">
              Sign Out
            </h2>
            <div className="mt-10">
              <div>
                <div className=" sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="leading-6text-sm pb-7 text-base text-gray-500">
                      {user ? `Signed in as ${user.email}` : null}
                    </h3>

                    <button
                      onClick={handleSignOut}
                      disabled={useSignOutLoading || errors.length > 0}
                      className="flex w-full justify-center rounded-md bg-emerald-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-emerald-600 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:opacity-50"
                    >
                      {useSignOutLoading || !user ? (
                        <Spinner size="medium" />
                      ) : (
                        "Sign Out"
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
