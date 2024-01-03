"use client";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

export default function CheckInPrompt() {
  return (
    // <div className="grid h-full grid-cols-1 place-content-around rounded-sm border border-emerald-500 p-8 dark:bg-slate-800 ">
    <div className="pattern-background flex flex-col space-y-6 rounded-sm p-8 dark:border dark:border-sky-500/25 dark:bg-slate-700/50">
      <div className="font-extrabold">
        <h1 className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-5xl text-transparent">
          It&apos;s time to check in...
        </h1>
        <h2 className="mt-4 text-xl text-gray-600 dark:text-sky-300">
          {/* <TypeAnimation
            // style={{ height: "90px", display: "inline-block" }}
            sequence={[
              "How are you feeling about work?",
              8000,
              "Let our chatbot guide you through some basic questions..",
              6000,
              "...and we'll make some suggestions about content that you might find helpful.",
              6000,
              "It will take around 5 minutes :)",
            ]}
          /> */}
          Let our chatbot guide you to identify work stress points...
        </h2>
      </div>
      <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
        <Link
          href="/chatbot"
          className="rounded-md bg-emerald-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
        >
          Get started
        </Link>
        <Link
          href="#"
          className="text-sm font-semibold leading-6 text-gray-900 hover:underline dark:text-gray-50"
        >
          Learn more <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

export function CheckInPromptSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-y-6 border p-8">
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
