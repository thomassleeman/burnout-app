//next
import Link from "next/link";
//components
import EmailSignUpUI from "./emailSignUp/EmailSignUpUI";
import OAuthUI from "../oAuth/OAuthUI";
import TermsOfUseModal from "./TermsOfUseModal";

export default async function SignUp() {
  // redirectSignedInUsers();

  return (
    <>
      <main className="mt-10">
        <TermsOfUseModal />
        <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 md:py-12  lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="text-4xl font-bold leading-9 tracking-tight text-slate-600 md:mb-8">
                Sign up
              </h2>
            </div>

            <div className="mt-10">
              <EmailSignUpUI />
              <OAuthUI />
            </div>
            <div className="mt-12 w-full text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  className="text-emerald-600 underline-offset-4 hover:underline"
                  href="/signin"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
