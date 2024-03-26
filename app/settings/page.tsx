// use https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth to power this page
"use client";
import Link from "next/link";
import { auth } from "@/firebase/auth/appConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SettingsPage() {
  const [user, loading, error] = useAuthState(auth);

  const providerUser = user?.providerData[0];
  const provider = providerUser?.providerId;
  const passwordUser = provider === "password";

  console.log("user", user);

  const daysSince = (dateString: string) => {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Get the current date
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffInMilliseconds = now.getTime() - date.getTime();

    // Convert milliseconds to days
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    // Return the difference, rounded down to the nearest whole number
    return Math.floor(diffInDays);
  };

  if (loading) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
        <h2 className="text-3xl text-green-900 dark:text-slate-200">
          Loading...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
        <h2 className="text-3xl text-green-900 dark:text-slate-200">
          Error: {error.message}
        </h2>
      </div>
    );
  }

  if (providerUser) {
    return (
      <main className="mt-8 md:mt-12">
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            {/* name */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Name
              </dt>
              <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{providerUser.displayName}</span>
                <span
                  className={`ml-4 flex-shrink-0 ${
                    passwordUser ? "inline-block" : "hidden"
                  }`}
                >
                  <button
                    type="button"
                    className="rounded-md font-medium text-emerald-600 hover:text-emerald-500"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            {/* email */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{user.email}</span>
                <span
                  className={`ml-4 flex-shrink-0 ${
                    passwordUser ? "inline-block" : "hidden"
                  }`}
                >
                  <button
                    type="button"
                    className="rounded-md font-medium text-emerald-600 hover:text-emerald-500"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>
            {/* account created */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Account created
              </dt>
              <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{user?.metadata.creationTime}</span>
              </dd>
            </div>
            {/* days since account created */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Member for
              </dt>
              <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">
                  {user?.metadata.creationTime
                    ? daysSince(user.metadata.creationTime)
                    : "Loading..."}{" "}
                  days
                </span>
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="font-medium leading-6 text-emerald-900 hover:text-emerald-700">
                <Link className="" href="/signin/resetpassword">
                  Reset Password
                </Link>
              </dt>
            </div>
            {/* ----- */}
          </dl>
        </div>
      </main>
    );
  }
}
