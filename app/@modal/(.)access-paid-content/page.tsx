"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SubscribeCoursesCta from "./SubscribeCoursesCta";
import SubscribeJFICta from "./SubscribeJFICta";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";

type ModalContentType = {
  [key: string]: {
    name: string;
    component: JSX.Element;
  };
};

const modalContent: ModalContentType = {
  courses: { name: "Courses", component: <SubscribeCoursesCta /> },
  exercises: {
    name: "Journaling for insight exercises",
    component: <SubscribeJFICta />,
  },
};

export default function AccessPaidContentModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const action = searchParams.get("action") as keyof typeof modalContent | null;

  // (Optional) Prevent background scroll
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Handle invalid action param
  if (!action || !(action in modalContent)) {
    router.back();
    return null;
  }

  // Always render: no local state or “open/closed” check
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      // Clicking backdrop closes modal
      onClick={() => router.back()}
    >
      <div
        className="relative w-full max-w-md rounded bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          onClick={() => router.back()}
        >
          ✕
        </button>
        <h1 className="text-center text-lg font-semibold text-gray-900">
          {modalContent[action].name}
        </h1>
        {modalContent[action].component}
        <p className="mt-2 text-gray-700">
          <span className="font-semibold underline underline-offset-4">
            Upgrade your account
          </span>{" "}
          to unlock courses, exercises, and more!
        </p>
        <div className="mt-4 flex justify-end">
          <a
            // onClick={() => router.push("/subscribe")}
            href="/subscribe"
            className="flex items-center gap-x-2 rounded bg-gradient-to-r from-purple-500/75 to-pink-500/75 px-4 py-2 text-sm font-semibold text-white"
          >
            <RocketLaunchIcon className="h-6 w-6" />
            <span>Upgrade account</span>
          </a>
        </div>
      </div>
    </div>
  );
}
