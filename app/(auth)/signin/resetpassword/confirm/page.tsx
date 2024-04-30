import Link from "next/link";

export default function ResetPasswordConfirmation() {
  return (
    <>
      <main className="min-h-screen">
        <div className="flex min-h-full flex-1 items-center justify-center">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Password updated
                </h2>
              </div>
              <div>
                <p className="mt-8 text-gray-900">
                  Success! You can now sign in with your new password.
                </p>
              </div>
            </div>
            <div>
              <button
                type="button"
                className="mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <Link href="/signin">Sign in</Link>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
