import { redirect } from "next/navigation";
export default function SignUpConfirmation() {
  redirect("/dashboard");
  return (
    <>
      <main className="min-h-screen">
        <div className="flex min-h-full flex-1 items-center justify-center">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Email verified
                </h2>
              </div>
              <div>
                <p className="mt-8 text-gray-900">
                  Thanks for confirming your email address. You will now be
                  redirected to your home page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
