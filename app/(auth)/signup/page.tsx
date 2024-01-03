//next
import Link from "next/link";
//components
import EmailSignUpUI from "./emailSignUp/EmailSignUpUI";
import OAuthUI from "../oAuth/OAuthUI";
import ErrorAlert from "@/components/ui/ErrorAlert";

export default async function SignUp() {
  // redirectSignedInUsers();

  return (
    <>
      <main className="min-h-screen">
        <div className="flex min-h-full flex-1">
          <ErrorAlert />
          <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 md:py-12  lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                {/* <p className="mb-6 text-sm text-gray-500">
                  Let&apos;s sign you up with a new account...
                </p> */}
                <h2 className="text-4xl font-bold leading-9 tracking-tight text-slate-600 md:mb-8">
                  Sign Up
                </h2>
              </div>

              <div className="mt-10">
                <EmailSignUpUI />
                <OAuthUI />
              </div>
              <div className="mt-12 w-full text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link className="text-blue-400" href="/signin">
                    Sign in
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
