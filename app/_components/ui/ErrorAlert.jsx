//Pass error?.message into this component to display an error alert
"use client";
//jotai
import { useAtom } from "jotai";
import { anyErrorAtom } from "@/state/store";
//icons
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/20/solid";

export default function ErrorAlert() {
  const [anyError, setAnyError] = useAtom(anyErrorAtom);

  //define error message with user-friendly text for common errors
  const errorMessage = () => {
    let message = anyError.message;
    if (message.includes("Firebase:")) {
      message = message.replace("Firebase:", "");
    }
    if (message.includes("invalid-login-credentials")) {
      message = "Invalid login credentials";
    }
    return message;
  };

  return (
    <div
      className={`fixed right-0 top-0 z-50 mb-10 rounded-md bg-red-50 p-4 ${
        !anyError.message ? `hidden` : `block`
      }`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-start text-sm font-medium text-red-800">
            {errorMessage()}
          </p>
        </div>
        <div className="ml-auto pl-3">
          {/* <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={() => setAnyError({ message: "" })}
              className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
