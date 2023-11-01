"use client";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

export default function CheckInPrompt() {
  return (
    <div className="grid h-full grid-cols-1 place-content-around border p-8">
      <div className="font-extrabold">
        <h1 className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-5xl text-transparent">
          It&apos;s time to check in...
        </h1>
        <h2 className="mt-4 text-xl text-gray-600">
          <TypeAnimation
            sequence={[
              "How are you feeling about work?",
              8000,
              "Let our chatbot guide you through some basic questions..",
              6000,
              "...and we'll make some suggestions about content that you might find helpful.",
              6000,
              "It will take around 5 minutes :)",
            ]}
          />
        </h2>
      </div>
      <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
        <Link
          href="/chatbot"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get started
        </Link>
        <Link
          href="#"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Learn more <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

export function CheckInPromptSkeleton() {
  return (
    <div className="grid h-full animate-pulse grid-cols-1 place-content-around border p-8">
      <div>
        <div className="lg: h-12 w-5/6 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="mt-4 h-8 w-4/6 bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
        <div className="h-10 w-20 rounded-md bg-gray-200  text-white shadow-sm dark:bg-gray-700" />
      </div>
    </div>
  );
}
