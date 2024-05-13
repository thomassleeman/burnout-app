import Link from "next/link";

export default function CheckInPrompt() {
  // return (
  //   <div className="pattern-background flex flex-col space-y-6  rounded-xl border-2 border-slate-300/25 p-8 dark:border-sky-500/25 dark:bg-slate-700/50">
  //     <div className="font-extrabold">
  //       <h1 className=" animate-text bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 bg-clip-text text-5xl text-transparent">
  //         It&apos;s time to check in...
  //       </h1>
  //       {/* <h1 className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-5xl text-transparent">
  //         It&apos;s time to check in...
  //       </h1> */}
  //       <h2 className="mt-4 text-xl text-gray-600 dark:text-sky-300">
  //         Let our chatbot guide you to identify work stress points...
  //       </h2>
  //     </div>
  //     <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
  //       <Link
  //         href="/chatbot/burnout-assessment"
  //         className="rounded-md bg-emerald-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
  //       >
  //         Get started
  //       </Link>
  //       <Link
  //         href="#"
  //         className="text-sm font-semibold leading-6 text-gray-900 hover:underline dark:text-gray-50"
  //       >
  //         Learn more <span aria-hidden="true">→</span>
  //       </Link>
  //     </div>
  //   </div>
  // );
  return (
    <div className="pattern-background flex flex-col justify-between space-y-6 rounded-xl border-4 border-slate-300/25 px-8 py-5 dark:border-sky-500/25 dark:bg-slate-700/50 md:flex-row">
      <div className="font-extrabold">
        <h1 className=" animate-text bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 bg-clip-text text-5xl text-transparent">
          It&apos;s time to check in...
        </h1>
        <h2 className="mt-4 text-xl text-gray-600 dark:text-sky-300">
          Let our chatbot guide you to identify work stress points...
        </h2>
      </div>
      <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
        <Link
          href="/chatbot/burnout-assessment"
          className="rounded-md bg-emerald-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-900"
        >
          Get started
        </Link>
        <Link
          href="#"
          className="text-sm font-semibold leading-6 text-gray-900 hover:underline dark:text-gray-50"
        >
          Learn more
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
