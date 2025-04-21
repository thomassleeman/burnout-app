"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-y-7">
      <h2 className="text-3xl text-red-600">Something went wrong!</h2>
      <p className="max-w-md text-center text-gray-700">
        {error.message ||
          "An unexpected error occurred while loading your profile."}
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
      >
        Try again
      </button>
    </div>
  );
}
