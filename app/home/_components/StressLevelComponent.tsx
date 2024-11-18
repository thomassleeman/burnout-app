"use client";
import React, { useState } from "react";
import { db } from "@/firebase/auth/appConfig"; // Adjust import based on your Firebase setup
import { doc, updateDoc, getDoc, Timestamp } from "firebase/firestore";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

type Rating = {
  createdAt: Timestamp;
  rating: number;
};

const StressLevelComponent = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState<string | null>(
    null
  );

  const handleSelectLevel = (level: number) => {
    setSelectedLevel(level);
  };

  const handleSubmit = async () => {
    if (selectedLevel === null) {
      // Optionally, show an error message here
      return;
    }

    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const stressRating: Rating[] = userDoc.data()?.stressRating || [];

    // Today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Remove any entries from today
    const updatedStressRating = stressRating.filter((rating: Rating) => {
      const ratingDate = rating.createdAt.toDate();
      ratingDate.setHours(0, 0, 0, 0);
      return ratingDate.getTime() !== today.getTime();
    });

    // Add the new rating
    updatedStressRating.push({
      createdAt: Timestamp.now(),
      rating: selectedLevel,
    });

    // Update the user document
    await updateDoc(userRef, {
      stressRating: updatedStressRating,
    });

    // Show submission message
    setSubmissionMessage("Your stress level has been recorded.");
  };

  const getColor = (level: number) => {
    const colors = [
      "bg-green-500",
      "bg-green-400",
      "bg-green-300",
      "bg-yellow-300",
      "bg-yellow-400",
      "bg-yellow-500",
      "bg-orange-400",
      "bg-orange-500",
      "bg-red-400",
      "bg-red-500",
    ];
    return colors[level - 1];
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Daily stress log
      </button>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedLevel(null);
          setSubmissionMessage(null);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="relative max-w-full space-y-4 bg-white p-6 shadow-lg sm:p-10">
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectedLevel(null);
                setSubmissionMessage(null);
              }}
              className="absolute right-3 top-3 text-gray-900"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-extralight text-gray-600">
                Rate Your Stress Level Today
              </DialogTitle>
              <Popover className="relative">
                <PopoverButton className="ml-4 text-gray-500 hover:text-gray-700">
                  <InformationCircleIcon className="h-6 w-6" />
                </PopoverButton>
                <PopoverPanel className="absolute z-10 w-64 rounded-md border border-gray-200 bg-white p-4 shadow-lg">
                  <Description className="text-sm text-gray-500">
                    Use this daily stress tool to easily keep a log of your
                    stress levels over time.
                    <br />
                    <br />
                    Need to update your rating for today? No problem, we will
                    store your last rating for each day.
                  </Description>
                </PopoverPanel>
              </Popover>
            </div>
            {submissionMessage ? (
              <div className="mt-6 text-center text-green-600">
                {submissionMessage}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="my-4 flex">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(
                    (level, index) => (
                      <div
                        key={level}
                        onClick={() => handleSelectLevel(level)}
                        className={`${
                          index !== 0 ? "ml-1 sm:ml-2 md:ml-3" : ""
                        } h-6 w-6 transform cursor-pointer rounded transition-all hover:scale-110 sm:h-7 sm:w-7 md:h-8 md:w-8 ${getColor(
                          level
                        )} ${
                          selectedLevel === level ? "ring-4 ring-blue-300" : ""
                        }`}
                      />
                    )
                  )}
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="flex items-center gap-x-1 text-sm font-semibold text-gray-500">
                    <ArrowLeftIcon className="h-4 w-4" />
                    <p>relaxed</p>
                  </span>
                  <span className="flex items-center gap-x-1 text-sm font-semibold text-gray-500">
                    <p>stressed</p>
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </div>
                <button
                  onClick={handleSubmit}
                  className="mt-12 w-full rounded-md bg-emerald-500 px-3 py-1 text-white hover:bg-emerald-600"
                >
                  Submit
                </button>
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default StressLevelComponent;
