"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";

interface PageExamplesProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  image?: StaticImageData;
  imageAlt?: string;
}

export default function PageExamples({
  open,
  setOpen,
  image,
  imageAlt,
}: PageExamplesProps) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} className="relative z-30 pb-96">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-500/75" aria-hidden="true" />
      {/* Dialog Panel */}
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6">
            {/* Close Button */}
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onClick={handleClose}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon
                  className="h-8 w-8 rounded-full bg-gray-600/30 p-1 text-white"
                  aria-hidden="true"
                />
              </button>
            </div>
            {/* Image Display */}
            {image && (
              <div>
                <Image src={image} alt={imageAlt ?? "Page example"} />
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
