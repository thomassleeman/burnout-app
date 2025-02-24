"use client";
import Image from "next/image";
import { useErrors } from "@/hooks/useErrors";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import logo from "@/components/design/brainLogoCompressed.png";

export default function ErrorAlert() {
  const { errors, removeError, clearErrors } = useErrors();

  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-0 top-0 z-50 mb-10 w-96">
      <div className="flex items-start p-2">
        <div className="mt-1 flex flex-shrink-0 items-center gap-x-2 rounded-md bg-white p-2">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gray-400">
            <Image
              height={50}
              width={50}
              src={logo}
              alt="Burnout Hub logo"
              className="h-8 w-auto"
            />
          </div>
          <span className="font-semibold text-gray-800">
            There is an issue. Please see below:
          </span>
        </div>

        <div className="ml-auto pl-3">
          {/* <button
                type="button"
                onClick={() => removeError(error.id)}
                className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button> */}
        </div>
      </div>
      {/* <button
          onClick={clearErrors}
          className="rounded-full bg-red-600/25 px-2 py-1 text-sm text-red-700 outline outline-red-700"
        >
          Clear All
        </button> */}
      {/* </div> */}
      <div className="m-1 space-y-2">
        {errors.map((error) => (
          <div
            key={error.id}
            className="flex items-start rounded-md bg-red-50 p-4 shadow-md"
          >
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-red-800">
                {error.message}
              </p>
            </div>
            <div className="ml-auto pl-3">
              {/* <button
                type="button"
                onClick={() => removeError(error.id)}
                className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
