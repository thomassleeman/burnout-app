//next
import Link from "next/link";
//Components
import OAuthUI from "../oAuth/OAuthUI";
import EmailSignInUI from "./EmailSignInUI";
import SetSessionCookie from "./SetSessionCookie";

export default async function SignIn() {
  return (
    <>
      <main className="mt-10">
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
                <Link
                  className="text-emerald-600 underline-offset-4 hover:underline"
                  href="/signup"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
