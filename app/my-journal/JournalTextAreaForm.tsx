// JournalTextAreaForm.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { SubmitButton } from "@/app/_components/ui/_components/Buttons";
import getFormattedDate from "@actions/getFormattedDate";
import logo from "@/components/design/brainLogoCompressed.png";
import journalingPrompts from "./journalingPrompts";
import updateDatabase from "./updateDatabase";
import {
  DecryptedInputs,
  PreviousInputData,
  UserInputs,
  UserInputsWithIds,
  JournalTextAreaFormProps,
  ExistingEntryProps,
} from "@/types/journal"; // Import interfaces from journal.ts

export default function JournalTextAreaForm({
  selectedDate,
  setSelectedDate,
  journalData,
  setJournalData,
  fetchUserDataLoading,
}: JournalTextAreaFormProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [userInputs, setUserInputs] = useState<UserInputs>({});
  const [previousInputData, setPreviousInputData] = useState<PreviousInputData>(
    {}
  );

  const formattedDate = format(selectedDate, "dd-MMM-yyyy");

  // Load any previous input
  useEffect(() => {
    async function fetchSavedUserInput() {
      setLoading(true);

      try {
        const previousInput = journalData?.[formattedDate];
        if (!previousInput) {
          setLoading(false);
          setPreviousInputData({});
          setUserInputs({});
          return;
        }

        const previousInputDate = getFormattedDate(
          previousInput.createdAt.seconds
        );
        const encryptedUserInputs = previousInput.encryptedUserInput;

        // Collect all encrypted inputs into an array
        const encryptedInputsArray = Object.keys(encryptedUserInputs).map(
          (key) => ({
            key,
            iv: encryptedUserInputs[key].iv,
            encryptedData: encryptedUserInputs[key].encryptedData,
          })
        );

        // Make a single API call to decrypt all inputs
        const decryptionResponse = await fetch("/api/decryptText", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ encryptedInputs: encryptedInputsArray }),
        });

        if (!decryptionResponse.ok) {
          throw new Error(
            `Decryption error! status: ${decryptionResponse.status}`
          );
        }

        const { decryptedOutputs } = await decryptionResponse.json();

        // Map decrypted outputs back to their keys
        const decryptedInputs: DecryptedInputs = {};
        encryptedInputsArray.forEach((input, index) => {
          decryptedInputs[input.key] = decryptedOutputs[index];
        });

        const previousInputData: PreviousInputData = {
          decryptedUserInput: decryptedInputs,
          createdAt: previousInputDate,
        };

        setPreviousInputData(previousInputData);
        setUserInputs(decryptedInputs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching or decrypting previous input:", error);
        setLoading(false);
      }
    }

    fetchSavedUserInput();
  }, [selectedDate, formattedDate, journalData]);

  const handleInputChange = (key: string, value: string) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!userInputs) return;

    try {
      // Map prompt IDs to corresponding user inputs for better structure
      let userInputsWithIds: UserInputsWithIds = {};
      journalingPrompts.general.forEach((prompt) => {
        userInputsWithIds[prompt.id] = userInputs[prompt.id]; // Use prompt ID as key
      });

      journalingPrompts.exhausted.forEach((prompt) => {
        userInputsWithIds[prompt.id] = userInputs[prompt.id]; // Same for exhausted category
      });

      // Encrypt the userInputsWithIds object before saving
      const response = await fetch("/api/encryptText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInputs: userInputsWithIds }),
      });

      const encryptedUserInputs = await response.json();

      // Format selectedDate before passing it to updateDatabase
      const formattedDate = format(selectedDate, "dd-MMM-yyyy");

      // Save the encrypted data under the formatted date
      const databaseUpdated = await updateDatabase(
        encryptedUserInputs,
        formattedDate
      );

      if (!databaseUpdated) {
        console.error("Error updating the database");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const submissionNoticeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted && submissionNoticeRef.current) {
      submissionNoticeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [submitted]);

  let submissionNotice;
  let content;

  const prompts = journalingPrompts.general.concat(journalingPrompts.exhausted);

  if (submitted) {
    submissionNotice = (
      <div className="flex items-center gap-x-4" ref={submissionNoticeRef}>
        <div className="flex h-12 w-auto items-center justify-center rounded-full border border-emerald-700 p-1">
          <Image
            height={50}
            width={50}
            src={logo}
            alt="Burnout Hub logo"
            className="h-8 w-auto"
          />
        </div>
        <span className="my-16 text-xl font-extralight text-emerald-700">
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
        prompts={prompts}
      />
    );
  } else {
    submissionNotice = null;

    if (previousInputData.decryptedUserInput) {
      content = (
        <ExistingEntry
          previousInputData={previousInputData}
          setUserInputs={setUserInputs}
          setPreviousInputData={setPreviousInputData}
          setSubmitted={setSubmitted}
          prompts={prompts}
        />
      );
    } else {
      content = (
        <div>
          <form onSubmit={handleSubmit}>
            {prompts.map((prompt) => (
              <div key={prompt.id} className="flex flex-col items-center">
                <div className="my-2 w-full rounded-lg py-1">
                  <h5 className="text-lg font-light">{prompt.prompt}</h5>
                  <textarea
                    id={`textarea-${prompt.id}`}
                    name={`userInput-${prompt.id}`}
                    className="my-2 h-28 w-full rounded-md border-0 p-2 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-700"
                    value={userInputs[prompt.id] || ""}
                    onChange={(e) =>
                      handleInputChange(prompt.id, e.target.value)
                    }
                  ></textarea>
                </div>
              </div>
            ))}
            <SubmitButton classes="rounded-lg bg-emerald-700 px-4 text-lg py-2 mt-6 text-white disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-gray-100 w-full">
              Save my answers
            </SubmitButton>
          </form>
        </div>
      );
    }
  }

  if (fetchUserDataLoading || loading) {
    content = (
      <h3 className="animate-pulse text-xl font-extralight text-emerald-700">
        Loading...
      </h3>
    );
  }

  return (
    <div className="mt-4 text-sm leading-6 lg:col-span-7 xl:col-span-8">
      <h1 className="mb-4 text-2xl font-extralight">{formattedDate}</h1>
      {submissionNotice}
      {content}
    </div>
  );
}

const ExistingEntry = ({
  previousInputData,
  setUserInputs,
  setPreviousInputData,
  setSubmitted,
  prompts = [],
}: ExistingEntryProps) => {
  const handleClick = () => {
    setUserInputs(previousInputData.decryptedUserInput || {});
    setPreviousInputData({});
    setSubmitted(false);
  };

  return (
    <div>
      <div>
        {prompts.map((prompt) => {
          const response = previousInputData.decryptedUserInput
            ? previousInputData.decryptedUserInput[prompt.id]
            : "";

          return (
            <div key={prompt.id} className="flex flex-col items-center">
              <div className="my-4 w-full rounded-lg py-1">
                <h5 className=" font-light">{prompt.prompt}</h5>
                <div>
                  {response ? (
                    <p className="mt-1 text-gray-800">{response}</p>
                  ) : (
                    <div className="relative rounded-lg border border-gray-100 bg-white px-6 py-4 text-gray-600">
                      <div className="absolute -right-2 -top-3">
                        <span className="relative flex h-5 w-5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex h-5 w-5 rounded-full bg-red-500"></span>
                        </span>
                      </div>
                      <p className="text-sm">
                        Select Edit below to complete this field.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="not-prose flex items-center space-x-10">
        <button
          onClick={handleClick}
          className="w-36 rounded-md bg-emerald-700 px-4 py-1 text-white hover:bg-emerald-600"
        >
          Edit entries
        </button>
      </div>
    </div>
  );
};
