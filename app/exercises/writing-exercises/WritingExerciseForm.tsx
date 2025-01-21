"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// Firebase
import { app } from "@firebase/auth/appConfig";
import { doc, getFirestore, getDoc } from "firebase/firestore";
// Sanity
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";
// Components
import { SubmitButton } from "@/app/_components/ui/_components/Buttons";
import GetStartedButton from "./GetStartedButton";
// Functions
import updateDatabase from "./updateDatabase";
// Actions
import getFormattedDate from "@actions/getFormattedDate";
// Icons
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import logo from "@/components/design/brainLogoCompressed.png";

/* ---------------------------- Type Definitions ---------------------------- */

type UserInputs = {
  [key: string]: string;
};

interface DecryptedInputs {
  [key: string]: any;
}

interface PreviousInputData {
  decryptedUserInput?: DecryptedInputs;
  createdAt?: string;
  // (Optional) If you want to read progress from Firestore, you could include:
  // completedPrompts?: number;
  // totalPrompts?: number;
  // completionPercentage?: number;
}

interface Prompt {
  _key: string;
  content: any;
}

interface PromptGroup {
  _key: string;
  heading?: string;
  prompts: Prompt[];
}

interface Section {
  _key: string;
  slug: string;
  sectionTitle: string;
  promptGroups: PromptGroup[];
}

/* ------------------------- Main Form Component ---------------------------- */

export default function WritingExerciseForm({
  exerciseSlug,
  prompts,
}: {
  exerciseSlug: string;
  prompts: Section[];
}) {
  console.log("prompts:", prompts);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [userInputs, setUserInputs] = useState<UserInputs>({});
  const [previousInputData, setPreviousInputData] = useState<PreviousInputData>(
    {}
  );
  const [revealExercise, setRevealExercise] = useState(false);

  /* ------------------------------------------------------------------------
   * 1. Gather all prompt keys => We'll compute progress on the client
   * ----------------------------------------------------------------------*/
  const allPromptKeys = React.useMemo(() => {
    const keys: string[] = [];
    prompts.forEach((section) => {
      section.promptGroups.forEach((group) => {
        group.prompts.forEach((prompt, index) => {
          const key = `${section._key}-${group._key}-${prompt._key || index}`;
          keys.push(key);
        });
      });
    });
    return keys;
  }, [prompts]);

  const totalPrompts = allPromptKeys.length;

  // ------------------------------------------------------------------
  // 2. Count how many textareas have *non-empty* data => completed
  // ------------------------------------------------------------------
  const completedPrompts = allPromptKeys.filter((key) => {
    const val = userInputs[key]?.trim();
    return val && val.length > 0;
  }).length;

  // 3. Compute a percentage
  const completionPercentage =
    totalPrompts === 0
      ? 0
      : Math.round((completedPrompts / totalPrompts) * 100);

  // ---------------------- On mount: fetch user doc & decrypt ---------------
  useEffect(() => {
    async function fetchInitialData() {
      setLoading(true);
      try {
        // 1. Get user ID
        const response = await fetch("/api/accessUserId", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          router.push("/signin");
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { userID } = await response.json();

        // 2. Get Firestore doc
        const db = getFirestore(app);
        const userRef = doc(db, "users", userID);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          setLoading(false);
          return;
        }

        const data = userDoc.data() || {};
        const previousInput = data.exercises?.[exerciseSlug];
        if (!previousInput) {
          setLoading(false);
          return;
        }

        // 3. Decode date
        const previousInputDate = previousInput.createdAt
          ? getFormattedDate(previousInput.createdAt.seconds)
          : undefined;

        // 4. Decrypt user inputs
        if (previousInput.encryptedUserInput) {
          const encryptedUserInputs = previousInput.encryptedUserInput;
          const encryptedKeys = Object.keys(encryptedUserInputs);

          const encryptedInputsArray = encryptedKeys.map((key) => ({
            key,
            iv: encryptedUserInputs[key].iv,
            encryptedData: encryptedUserInputs[key].encryptedData,
          }));

          const decryptionResponse = await fetch("/api/decryptText", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ encryptedInputs: encryptedInputsArray }),
          });
          if (!decryptionResponse.ok) {
            throw new Error(
              `Decryption error! status: ${decryptionResponse.status}`
            );
          }

          const { decryptedOutputs } = await decryptionResponse.json();
          const decryptedInputs: DecryptedInputs = {};
          encryptedInputsArray.forEach((input, idx) => {
            decryptedInputs[input.key] = decryptedOutputs[idx];
          });

          setPreviousInputData({
            decryptedUserInput: decryptedInputs,
            createdAt: previousInputDate,
            // If storing progress in Firestore, you could read it here
            // completedPrompts: previousInput.completedPrompts,
            // totalPrompts: previousInput.totalPrompts,
            // completionPercentage: previousInput.completionPercentage,
          });
          setUserInputs(decryptedInputs);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching or decrypting data:", error);
        setLoading(false);
      }
    }

    fetchInitialData();
  }, [exerciseSlug, router]);

  // --------------------- handleInputChange & handleSubmit -------------------
  const handleInputChange = (key: string, value: string) => {
    setUserInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Encrypt userInputs
      const response = await fetch("/api/encryptText", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInputs }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error encrypting text: ${response.status}`);
      }
      const encryptedUserInputs = await response.json();

      // 2. Save to Firestore via your updated function, passing progress data
      const databaseUpdated = await updateDatabase(
        encryptedUserInputs,
        exerciseSlug,
        {
          completedPrompts,
          totalPrompts,
          completionPercentage,
        }
      );

      if (!databaseUpdated) {
        throw new Error("Error updating the database");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------- submissionNoticeRef logic ------------------------
  const submissionNoticeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (submitted && submissionNoticeRef.current) {
      submissionNoticeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [submitted]);

  // -------------------- Always show the progress note ----------------------
  // Even if user has previous input, or hasn't clicked "Get Started"
  // This ensures the user can always see their current completion percentage.
  const progressNote = (
    <div className="mb-4 flex items-center gap-x-3 pb-4">
      <CheckCircleIcon className="h-8 w-8 text-sky-600" />
      <p className="text-xl font-semibold text-sky-600">
        You&apos;ve completed {completedPrompts} of {totalPrompts} prompts in
        this exercise.
      </p>
    </div>
  );

  // --------------------------- Render logic ---------------------------------
  if (loading) {
    return (
      <h3 className="animate-pulse text-xl font-extralight text-emerald-700">
        Loading...
      </h3>
    );
  }

  let submissionNotice: JSX.Element | null = null;
  let content: JSX.Element | null = null;

  // (1) If just submitted, show success and read-only view
  if (submitted) {
    submissionNotice = (
      <div ref={submissionNoticeRef} className="my-4 flex items-center gap-x-4">
        <div className="flex h-12 w-auto items-center justify-center rounded-full border border-emerald-700 p-1">
          <Image
            height={50}
            width={50}
            src={logo}
            alt="Burnout Hub logo"
            className="h-8 w-auto"
          />
        </div>
        <span className="text-xl font-extralight text-emerald-700">
          Your submission has been saved.
        </span>
      </div>
    );
    content = (
      <ExistingEntry
        previousInputData={{
          decryptedUserInput: userInputs,
          createdAt: "Just now",
        }}
        setUserInputs={setUserInputs}
        setPreviousInputData={setPreviousInputData}
        setSubmitted={setSubmitted}
        setRevealExercise={setRevealExercise}
        prompts={prompts}
      />
    );
  }
  // (2) If there's previous input => read-only screen (unless they click Edit)
  else if (previousInputData.decryptedUserInput) {
    content = (
      <ExistingEntry
        previousInputData={previousInputData}
        setUserInputs={setUserInputs}
        setPreviousInputData={setPreviousInputData}
        setSubmitted={setSubmitted}
        setRevealExercise={setRevealExercise}
        prompts={prompts}
      />
    );
  }
  // (3) Otherwise => no previous input => form or get-started
  else {
    if (revealExercise) {
      content = (
        <form className="relative" onSubmit={handleSubmit}>
          {/*
            We already show progressNote above, but you can also show it 
            inline here if you prefer, or remove it to avoid duplication.
          */}
          {prompts.map((section) => (
            <div key={section._key} id={section.slug} className="mb-4">
              <h2 className="py-2 text-2xl font-thin">
                {section.sectionTitle}
              </h2>
              <div className="w-full rounded-lg border-2 border-emerald-700 p-4">
                {section.promptGroups.map((group) => (
                  <details key={group._key} className="group mb-4" open>
                    <summary className="flex cursor-pointer justify-between">
                      <h3 className="font-light">{group.heading}</h3>
                      <div className="flex items-center">
                        <ChevronDownIcon className="h-5 w-5 text-emerald-700 group-open:hidden" />
                        <ChevronUpIcon className="hidden h-5 w-5 text-emerald-700 group-open:inline" />
                      </div>
                    </summary>
                    <div className="mt-4 group-open:block">
                      {group.prompts.map((prompt, idx) => {
                        const textareaKey = `${section._key}-${group._key}-${
                          prompt._key || idx
                        }`;
                        return (
                          <div key={prompt._key || idx} className="mb-4">
                            <PortableText
                              value={prompt.content}
                              components={portableTextComponents}
                            />
                            <textarea
                              name={`userInput-${textareaKey}`}
                              className="mt-2 h-40 w-full rounded-md border-0 ring-2 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600"
                              value={userInputs[textareaKey] || ""}
                              onChange={(e) =>
                                handleInputChange(textareaKey, e.target.value)
                              }
                            ></textarea>
                          </div>
                        );
                      })}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
          <div className="fixed bottom-0 right-0 z-50 flex w-full content-center justify-center border-t border-gray-400/25 bg-white/75 py-2">
            <SubmitButton classes=" w-96  rounded-lg bg-emerald-700 px-4 py-2 text-white">
              Save my answers
            </SubmitButton>
          </div>
        </form>
      );
    } else {
      content = <GetStartedButton setRevealExercise={setRevealExercise} />;
    }
  }

  return (
    <>
      {/* progress note shown only if the user has actually started the exercise. */}
      {completedPrompts > 0 ? progressNote : null}

      {submissionNotice}
      {content}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                          ExistingEntry Component                           */
/* -------------------------------------------------------------------------- */

function ExistingEntry({
  previousInputData,
  setUserInputs,
  setPreviousInputData,
  setSubmitted,
  setRevealExercise,
  prompts,
}: {
  previousInputData: PreviousInputData;
  setUserInputs: React.Dispatch<React.SetStateAction<{}>>;
  setPreviousInputData: React.Dispatch<React.SetStateAction<PreviousInputData>>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setRevealExercise: React.Dispatch<React.SetStateAction<boolean>>;
  prompts: Section[];
}) {
  const handleClick = () => {
    setUserInputs(previousInputData.decryptedUserInput || {});
    setPreviousInputData({});
    setSubmitted(false);
    setRevealExercise(true);
  };

  return (
    <div>
      <div className="sticky top-0 z-20 flex items-center space-x-10 border-y border-gray-400 bg-white p-2">
        <span className="text-xl text-emerald-700">
          {`Your responses, last updated: ${
            previousInputData.createdAt || "No date"
          }`}
        </span>
        <button
          onClick={handleClick}
          className="w-36 rounded-md bg-emerald-700 px-4 py-1 text-white outline outline-2 outline-offset-4 outline-emerald-600/50 hover:bg-emerald-600"
        >
          <span className=" text-white ">Edit</span>
        </button>
      </div>

      <div>
        {prompts.map((section) => (
          <div key={section._key} id={section.slug} className="mb-4">
            <h2 className="py-2 text-2xl font-thin">{section.sectionTitle}</h2>
            <div className="w-full rounded-lg border-2 border-emerald-700 p-4">
              {section.promptGroups.map((group) => (
                <details key={group._key} className="group mb-4" open>
                  <summary className="flex cursor-pointer justify-between">
                    <h3 className="font-light">{group.heading}</h3>
                    <div className="flex items-center">
                      <ChevronDownIcon className="h-5 w-5 text-emerald-700 group-open:hidden" />
                      <ChevronUpIcon className="hidden h-5 w-5 text-emerald-700 group-open:inline" />
                    </div>
                  </summary>
                  <div className="mt-4 group-open:block">
                    {group.prompts.map((prompt, idx) => {
                      const textareaKey = `${section._key}-${group._key}-${
                        prompt._key || idx
                      }`;
                      const response =
                        previousInputData.decryptedUserInput?.[textareaKey] ||
                        "";

                      return (
                        <div key={prompt._key || idx} className="mb-4">
                          <PortableText
                            value={prompt.content}
                            components={portableTextComponents}
                          />
                          <p className="mt-2 whitespace-pre-wrap">
                            {response || (
                              <div className="relative rounded-lg border border-gray-500 bg-white px-6 text-gray-600">
                                {/* <div className="absolute -right-2 -top-2">
                                  <span className="relative flex h-4 w-4">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="relative inline-flex h-4 w-4 rounded-full bg-sky-500"></span>
                                  </span>
                                </div> */}
                                <p className="text-emerald-700">
                                  Click Edit to complete this field.
                                </p>

                                {/* <p className="text-sm">
                                  Click Edit to complete this field.
                                </p> */}
                              </div>
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
