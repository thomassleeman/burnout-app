"use client";

import { useState } from "react";
import Link from "next/link";
import { auth } from "@/firebase/auth/appConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import DeleteAccountAlert from "./DeleteAccountAlert";
import ResetAccountAlert from "./ResetAccountAlert";
import Spinner from "@/components/ui/_components/Spinner";
import ClearCustomerClaims from "./ClearCustomClaims";

import { useAtomValue } from "jotai";
import { userAtom } from "@/state/store";

export default function ProfilePage() {
  const user = useAtomValue(userAtom);
  const [authUser, AuthStateLoading, error] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showResetAlert, setShowResetAlert] = useState(false);

  const providerUser = authUser?.providerData[0];
  // const provider = providerUser?.providerId;
  // const passwordUser = provider === "password";

  //check if the user is an organisation Admin user. If so, they can see the organisation details.
  let organisationAdmin = false;
  if (user?.organisation) {
    if (user.organisation.role === "admin") {
      organisationAdmin = true;
    }
  }

  const daysSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.floor(diffInDays);
  };

  console.log("user: ", user);

  if (AuthStateLoading || loading) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
        <div className="flex items-center gap-x-6">
          <Spinner size="medium" />
          <h2 className="text-3xl text-emerald-700 dark:text-slate-200">
            Loading...
          </h2>
        </div>
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
        <section className="mb-12 ">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h3>
          </div>
          <div className="mt-6 rounded-2xl p-6 outline outline-1 outline-emerald-600">
            <dl className="divide-y divide-gray-100">
              {/* name */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Name
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">{providerUser.displayName}</span>
                  {/* <span
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
                  </span> */}
                </dd>
              </div>
              {/* email */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">{authUser.email}</span>
                  {/* <span
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
                  </span> */}
                </dd>
              </div>
              {/* account created */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Account created
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">
                    {authUser?.metadata.creationTime}
                  </span>
                </dd>
              </div>
              {/* days since account created */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Member for
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">
                    {authUser?.metadata.creationTime
                      ? daysSince(authUser.metadata.creationTime)
                      : "Loading..."}{" "}
                    days
                  </span>
                </dd>
              </div>
              {user?.organisation && organisationAdmin ? (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Organisation
                  </dt>
                  <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <Link
                      href={`/organisation/${user.organisation.organisationId}`}
                      className="flex-grow text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                    >
                      {user.organisation.name}
                    </Link>
                  </dd>
                </div>
              ) : null}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="font-medium leading-6 text-emerald-900 hover:text-emerald-700">
                  <Link
                    className="rounded-md border border-gray-400 px-3 py-2 text-emerald-500 hover:bg-emerald-50"
                    href="/signin/resetpassword"
                  >
                    Reset Password
                  </Link>
                </dt>
              </div>
              {/* ----- */}
            </dl>
          </div>
        </section>
        <section className="my-12 rounded-2xl p-6 outline outline-1 outline-red-400">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-red-400 ">
              Permanently delete data
            </h3>
            <p className="text-sm text-gray-500">
              Once you reset or delete your account, there is no going back.{" "}
              <span className="underline">Please be certain.</span>
            </p>
          </div>
          <div className="flex">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="font-medium leading-6 text-emerald-900 hover:text-emerald-700">
                <button
                  className="rounded-md border border-gray-400 px-2 py-1 text-red-500 hover:bg-red-50"
                  onClick={() => setShowResetAlert(true)}
                >
                  Reset my account
                </button>
              </dt>
              {showResetAlert && (
                <ResetAccountAlert
                  open={showResetAlert}
                  setOpen={setShowResetAlert}
                />
              )}
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="font-medium leading-6 text-emerald-900 hover:text-emerald-700">
                <button
                  className="rounded-md border border-gray-400 px-2 py-1 text-red-500 hover:bg-red-50"
                  onClick={() => setShowDeleteAlert(true)}
                >
                  Delete my account
                </button>
              </dt>
              {showDeleteAlert && (
                <DeleteAccountAlert
                  open={showDeleteAlert}
                  setOpen={setShowDeleteAlert}
                />
              )}
            </div>
          </div>
        </section>
        {/* <ClearCustomerClaims user={authUser} /> */}
      </main>
    );
  }
}
