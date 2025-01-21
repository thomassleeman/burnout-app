"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import errorImage from "@/components/design/error.png";
import Image from "next/image";
import Link from "next/link";

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
    <div className="mt-24 flex flex-col items-center justify-center space-y-4">
      <h2 className="mb-16 text-3xl font-extralight text-emerald-700">
        Hmmm, something&apos;s gone wrong here...
      </h2>
      <Image src={errorImage} alt="Error" width={400} height={400} />
      <div className="mt-8 flex items-center justify-center space-x-4">
        <button
          className="rounded-md border border-gray-400 bg-transparent px-4 py-2 text-emerald-700"
          onClick={() => reset()}
        >
          Try again
        </button>
        <button className="rounded-md bg-emerald-600 px-4 py-2 text-white">
          <Link href="/home">Home</Link>
        </button>
      </div>
    </div>
  );
}
