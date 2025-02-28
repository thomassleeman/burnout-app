"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import logo from "@/components/design/brainLogoCompressed.png";

interface NoticeBase {
  title: string;
  body: JSX.Element;
  buttonText?: string;
  href?: string;
}

type Notices = {
  auth: NoticeBase;
  accountRequired: Required<NoticeBase>;
  subscriptionRequired: Required<NoticeBase>;
};

const notices: Notices = {
  auth: {
    title: "Sign in Required",
    body: (
      <p>
        Please <Link href="/sign-in">Sign in</Link> to access this content.
      </p>
    ),
  },
  accountRequired: {
    title: "Account Required",
    body: (
      <p>
        You will need to create an account to access this content. <br />
        <br />
        If you already have an account please{" "}
        <Link className="text-sky-500" href="/signin">
          Sign in
        </Link>
        .
      </p>
    ),
    buttonText: "Sign up",
    href: "/signup",
  },
  subscriptionRequired: {
    title: "Account Required",
    body: (
      <p>
        You will need to create an account to access this content. <br />
        <br />
        If you already have an account please{" "}
        <Link className="text-sky-500" href="/signin">
          Sign in
        </Link>
        .
      </p>
    ),
    buttonText: "Sign up",
    href: "/signup",
  },
};

type NoticeType = keyof typeof notices;

export default function AuthNoticeModal({ notice }: { notice: NoticeType }) {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 z-50 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gray-400">
                <Image
                  height={50}
                  width={50}
                  src={logo}
                  alt="PASU logo"
                  className="h-10 w-auto"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  {notices[notice]?.title}
                </DialogTitle>
                <div className="mt-2">
                  <div className="text-sm text-gray-500">
                    {notices[notice]?.body}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <Link href={notices[notice]?.href || "/"} passHref>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  {notices[notice]?.buttonText || "Close"}
                </button>
              </Link>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
