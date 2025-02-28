import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function InfoDialogue() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <InformationCircleIcon className="mb-4 h-5 w-5 text-sky-500 hover:text-sky-600" />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="relative max-w-lg space-y-4 rounded-2xl bg-white p-8 drop-shadow-md">
            {/* Close button in top right corner */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              aria-label="Close dialog"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <DialogTitle className="text-emerald-700">
              What is the AI Therapy Assistant?
            </DialogTitle>
            <Description>
              This is an AI-powered assistant designed to help you understand
              and manage workplace burnout. It uses advanced AI to provide
              personalised support and guidance.
            </Description>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
