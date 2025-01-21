//next
import Link from "next/link";
//components
import ErrorAlert from "@/components/ui/ErrorAlert";
import {
  ExclamationTriangleIcon,
  EnvelopeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default async function SignUp() {
  // redirectSignedInUsers();

  return (
    <>
      <main className="mt-10">
        <ErrorAlert />
        <div className="flex flex-1 flex-col justify-center px-4 sm:px-6 md:py-12  lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="text-4xl font-bold leading-9 tracking-tight text-slate-600 md:mb-8">
                Sign up
              </h2>
            </div>

            <div className="mt-10">
              <>
                <div className="flex">
                  {/* <Spinner
                    className={`mr-2 ${authStateLoading ? `block` : `hidden`}`}
                  /> */}
                  <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Please check your email
                  </h2>
                </div>
                <div className="mt-8 flex gap-x-6">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <EnvelopeIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-gray-900">
                    We have sent you an email with a link to verify your
                    account.
                  </p>
                </div>
                <div className="mt-10 flex gap-x-6">
                  <p className=" font-extralight text-gray-900">
                    ...if you do not find the email in your inbox please check
                    your spam folder.
                  </p>
                </div>
              </>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
