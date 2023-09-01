//next
import Link from "next/link";
//functions
// import redirectSignedInUsers from "../redirectSignedInUsers";
//Components
import OAuthUI from "../oAuth/OAuthUI";
import EmailSignInUI from "./EmailSignInUI";
import ErrorAlert from "@/components/ui/ErrorAlert";

import SetSessionCookie from "./SetSessionCookie";

export default async function SignIn() {
  // redirectSignedInUsers();

  /* NEED TO DEAL WITH ERRORS */
  // type CustomError = {
  //   message: string;
  //   [key: string]: any; // Optional additional properties
  // };

  // const anyError = (error ||
  //   authStateError ||
  //   tokenError) as CustomError | null;

  return (
    <>
      <main className="min-h-screen">
        <div className="flex min-h-full flex-1">
          <div className="flex flex-1 flex-col justify-center px-4 py-1 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <SetSessionCookie />
              <div className="mt-10">
                <EmailSignInUI />
                <OAuthUI />
              </div>
              <div className="mt-12 w-full text-center">
                <p className="text-sm text-gray-400 ">
                  Don&apos;t have an account yet?{" "}
                  <Link className="text-blue-400" href="/signup">
                    Sign up
                  </Link>
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
