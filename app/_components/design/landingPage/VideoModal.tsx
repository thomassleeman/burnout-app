"use client";

import { useState } from "react";
import {
  Dialog,
  //   DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function VideoModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  console.log("VideoModal open: ", open);
  let content;
  if (!open) {
    content = null;
  } else {
    content = (
      <Dialog className="relative z-10" open={open} onClose={setOpen}>
        {/* <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      /> */}

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <DialogPanel
              // transition
              className="relative min-h-fit w-screen min-w-fit transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <iframe
                width="560"
                height="315"
                className=" hidden sm:block"
                src="https://www.youtube.com/embed/4hBpSN1nB_U?si=Lj0MuHVIC5m6U7nE"
                title="YouTube video player"
                // frameborder="0"
                style={{ border: "0" }} // Updated here
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>

              <iframe
                // width="560"
                // height="315"
                className="block sm:hidden"
                src="https://www.youtube.com/embed/4hBpSN1nB_U?si=Lj0MuHVIC5m6U7nE"
                title="YouTube video player"
                // frameborder="0"
                style={{ border: "0" }} // Updated here
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  }
  return content;
}
