import { XMarkIcon } from "@heroicons/react/24/outline";
import StudyModalContent from "./StudyModalContent";
import Link from "next/link";
import React, { lazy, Suspense } from "react";

// const StudyModalContent = lazy(() => import("./StudyModalContent")).then(
//   (module) => module.default
// );

export default function StudyModal({
  currentUrl,
  studyId,
}: {
  currentUrl: string;
  studyId: string;
}) {
  return (
    <>
      <div className="relative z-10">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className=" relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <Link
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
                href={`${currentUrl}#user-content-${studyId}`}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </Link>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <StudyModalContent studyId={studyId} />
            </Suspense>

            {/* <div className="absolute bottom-2 mt-3 block pr-4 pt-4 sm:hidden">
              <Link
                type="button"
                className="z-20 rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
                href={currentUrl}
              >
                <button className="rounded-md bg-green-600 px-3 py-1 font-sans text-white focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2">
                  Close
                </button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
