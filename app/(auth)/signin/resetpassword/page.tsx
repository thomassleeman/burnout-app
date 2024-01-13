"use client";
//react
import { useState } from "react";
//next
import Link from "next/link";

//firebase
import { auth } from "@/firebase/auth/appConfig";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
//components
//jotai
import { useAtom } from "jotai";
import { anyErrorAtom } from "@/state/store";

interface ResetTextProps {
  sent: boolean;
}

const ResetText = ({ sent }: ResetTextProps) => {
  console.log("sent: ", sent);
  let content;

  if (!sent) {
    content = (
      <>
        <div>
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgotten your password?
          </h2>
        </div>
        <div>
          <p className="mt-8 text-gray-900">
            We&apos;ll send a recovery email to:{" "}
          </p>
        </div>
      </>
    );
  } else {
    content = (
      <>
        <div>
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Check your email
          </h2>
        </div>
        <div>
          <p className="mt-8 text-gray-900">
            We have sent you an email with a link to reset your password.
          </p>
        </div>
      </>
    );
  }

  return content;
};

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const [, setAnyError] = useAtom(anyErrorAtom);

  let origin: String | undefined;
  if (process.env.NODE_ENV === "development") {
    origin = process.env.NEXT_PUBLIC_DEV_ORIGIN;
  } else {
    origin = process.env.NEXT_PUBLIC_PROD_ORIGIN;
  }

  /* TODO: This is working, however, 
  1. The email link revels NEXT_PUBLIC_FIREBASE_API_KEY - Is that normal?
  2. Link refers to "burnout project" and "project-941881196808"  */
  const handleSubmit = async () => {
    const actionCodeSettings = {
      //TODO: change this to the correct url
      url: `${origin}/signin/resetpassword/confirm`,
      // iOS: {
      //   bundleId: 'com.example.ios',
      // },
      // android: {
      //   packageName: 'com.example.android',
      //   installApp: true,
      //   minimumVersion: '12',
      // },
      // handleCodeInApp: true,
    };
    try {
      const success = await sendPasswordResetEmail(email, actionCodeSettings);
      if (success) {
        setSent(true);
        console.log("success: ", success);
      } else {
        console.log("success(not): ", success);
      }
    } catch (err) {
      console.error("error: ", err);
    }
  };

  if (error) {
    setAnyError(error);
  }

  return (
    <>
      <main className="min-h-screen">
        <div className="flex min-h-full flex-1">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <ResetText sent={sent} />
              <div className="mt-10">
                <div>
                  <form className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={handleSubmit}
                        type="button"
                        disabled={sending || sent}
                        className="disabled:opacity-500 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                      >
                        {sent ? "sent" : !sending ? "Send" : "Sending..."}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="mt-12 w-full text-center">
                <p className="text-sm text-gray-400 ">
                  Return to{" "}
                  <Link className="text-blue-400" href="/signin">
                    Sign in{" "}
                  </Link>
                  page
                </p>
              </div>
            </div>
          </div>
          <div className="relative hidden w-0 flex-1 lg:block">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
              alt=""
            />
          </div>
        </div>
      </main>
    </>
  );
}
