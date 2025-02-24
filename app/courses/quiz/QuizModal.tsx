"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import logo from "@/components/design/brainLogoCompressed.png";
import Image from "next/image";
import { Radio, RadioGroup } from "@headlessui/react";
import updateDatabase from "./updateDatabase";

interface Answer {
  _key: string;
  text: string;
  correct?: boolean;
}

interface Question {
  _key: string;
  question: string;
  answers: Answer[];
}

interface QuizProps {
  quiz: Question[];
  articleSlug: string;
  courseSlug: string;
}

type Accumulator = {
  [key: string]: string | null;
};

export default function QuizModal({
  quiz,
  articleSlug,
  courseSlug,
}: QuizProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [allCorrect, setAllCorrect] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string | null;
  }>(
    quiz.reduce<Accumulator>((acc, question) => {
      acc[question._key] = null;
      return acc;
    }, {})
  );

  const handleAnswerChange = (questionKey: string, answerKey: string) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionKey]: answerKey,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    const allCorrect = quiz.every((question) => {
      const correctAnswer = question.answers.find((answer) => answer.correct);
      return (
        correctAnswer && selectedAnswers[question._key] === correctAnswer._key
      );
    });

    if (allCorrect) {
      setFeedbackMessage(
        "Congratulations! You answered all questions correctly."
      );
      setAllCorrect(true);
      updateDatabase(articleSlug, courseSlug);
      setLoading(false);
    } else {
      setFeedbackMessage("Some answers are incorrect. Please try again.");
      setLoading(false);
    }

    setSubmit(true);
  };

  const handleNextSection = () => {
    // router.push("/next-section");
    setOpen(false);
  };

  const getButtonProps = (allCorrect: boolean, loading: boolean) => {
    switch (allCorrect) {
      case true:
        return {
          text: loading ? "Loading..." : "Close",
          onClick: handleNextSection,
          disabled: loading,
        };
      case false:
        return {
          text: loading ? "Loading..." : "Submit",
          onClick: handleSubmit,
          disabled: loading,
        };
      default:
        return {
          text: "Submit",
          onClick: handleSubmit,
          disabled: loading,
        };
    }
  };

  const buttonProps = getButtonProps(allCorrect, loading);

  const handleOpenClick = () => {
    setOpen(true);
  };

  const handleAnswerChangeWrapper = (
    questionKey: string,
    answerKey: string | null
  ) => {
    if (answerKey !== null) {
      handleAnswerChange(questionKey, answerKey);
    } else {
      // Handle the null case, e.g., log an error or provide a default value
      console.error("Answer key is null");
      handleAnswerChange(questionKey, ""); // Replace with an appropriate default value if needed
    }
  };

  return (
    <>
      {!open && (
        <button
          className={
            "rounded-xl  p-3 " +
            (allCorrect
              ? " animate-pulse cursor-not-allowed bg-transparent text-lg text-gray-500"
              : "bg-emerald-600 text-white hover:bg-emerald-700 ")
          }
          disabled={allCorrect}
          onClick={handleOpenClick}
        >
          {allCorrect ? "Quiz completed" : "Open quiz to complete this section"}
        </button>
      )}
      <Transition show={open}>
        <Dialog
          className="relative z-10"
          onClose={() => {
            setOpen(false);
          }}
          open={open}
        >
          <TransitionChild
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  {/* close button */}
                  <div className="absolute right-0 top-0 pr-4 pt-4">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div>
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gray-400">
                      <Image
                        height={50}
                        width={50}
                        src={logo}
                        alt="Burnout Hub logo"
                        className="h-14 w-auto"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <DialogTitle
                        as="h3"
                        className="mb-6 text-base font-semibold leading-6 text-gray-900"
                      >
                        Answer the following questions to mark this section as
                        completed...
                      </DialogTitle>
                      <div className="mt-2">
                        <div>
                          {quiz.map((question) => (
                            <div
                              key={question._key}
                              style={{ marginBottom: "20px" }}
                            >
                              <h3 className="my-6 font-light">
                                {question.question}
                              </h3>
                              <fieldset aria-label="Quiz Answers">
                                <RadioGroup
                                  value={selectedAnswers[question._key]}
                                  onChange={(answerKey) =>
                                    handleAnswerChangeWrapper(
                                      question._key,
                                      answerKey
                                    )
                                  }
                                  className="space-y-4"
                                >
                                  {question.answers.map((answer) => (
                                    <Radio
                                      key={answer._key}
                                      value={answer._key}
                                      aria-label={answer.text}
                                      className={`group relative block cursor-pointer rounded-lg border px-6 py-4 shadow-sm focus:outline-none ${
                                        selectedAnswers[question._key] ===
                                        answer._key
                                          ? "border-2 border-emerald-600 bg-emerald-50"
                                          : "border-gray-300 bg-white"
                                      }`}
                                    >
                                      <span className="flex items-center">
                                        {answer.text}
                                      </span>
                                    </Radio>
                                  ))}
                                </RadioGroup>
                              </fieldset>
                            </div>
                          ))}
                        </div>
                      </div>
                      {feedbackMessage && (
                        <div className="mt-4">
                          <p className="mt-8 font-semibold text-gray-600 underline">
                            {feedbackMessage}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-emerald-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:col-start-2"
                      onClick={buttonProps.onClick}
                      disabled={buttonProps.disabled}
                    >
                      {buttonProps.text}
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
