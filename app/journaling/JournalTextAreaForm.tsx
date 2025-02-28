// JournalTextAreaForm.tsx - Modified version
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { serverTimestamp, Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import { SubmitButton } from "@/app/_components/ui/_components/Buttons";
import getFormattedDate from "@actions/getFormattedDate";
import logo from "@/components/design/brainLogoCompressed.png";
import updateDatabase from "./updateDatabase";
import {
  DecryptedInputs,
  PreviousInputData,
  UserInputs,
  UserInputsWithIds,
  JournalTextAreaFormProps,
  ExistingEntryProps,
} from "@/types/journal";

import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";

export default function JournalTextAreaForm({
  selectedDate,
  setSelectedDate,
  journalData,
  setJournalData,
  fetchUserDataLoading,
  journalOutlineFromSanity,
}: JournalTextAreaFormProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [userInputs, setUserInputs] = useState<UserInputs>({});
  const [previousInputData, setPreviousInputData] = useState<PreviousInputData>(
    {}
  );

  const formattedDate = format(selectedDate, "dd-MMM-yyyy");
  const journalSlug = journalOutlineFromSanity?.slug;

  // If journalSlug is undefined, we can't proceed with loading data
  useEffect(() => {
    if (!journalSlug) {
      console.error("Journal outline not available - slug is missing");
      setLoading(false);
    }
  }, [journalSlug]);

  /* Load previous input */
  useEffect(() => {
    async function fetchSavedUserInput() {
      setLoading(true);

      // Don't proceed if we don't have a valid journal slug
      if (!journalSlug) {
        console.error("Journal outline not available - slug is missing");
        setLoading(false);
        setPreviousInputData({});
        setUserInputs({});
        return;
      }

      try {
        // Log data structure for debugging
        console.log("Journal data structure:", journalData);
        console.log(
          "Accessing path:",
          `journalData?.journaling?.${journalSlug}?.${formattedDate}`
        );

        // Access with the correct nested structure:
        // journalData.journaling.{journalSlug}.{formattedDate}
        const previousInput =
          journalData?.journaling?.[journalSlug]?.[formattedDate];

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
  }, [selectedDate, formattedDate, journalData, journalSlug]);

  /* Handle input change */
  const handleInputChange = (key: string, value: string) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  /* Handle Submit */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!userInputs || !journalSlug) {
      setLoading(false);
      return;
    }

    try {
      let userInputsWithIds: UserInputsWithIds = {};
      // Use promptCategories from Sanity
      journalOutlineFromSanity.promptCategories.forEach((category) => {
        category.prompts.forEach((prompt) => {
          userInputsWithIds[prompt._key] = userInputs[prompt._key];
        });
      });

      const response = await fetch("/api/encryptText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInputs: userInputsWithIds }),
      });

      const encryptedUserInputs = await response.json();
      const formattedDate = format(selectedDate, "dd-MMM-yyyy");

      const databaseUpdated = await updateDatabase(
        encryptedUserInputs,
        formattedDate,
        journalSlug // Using the slug we safely accessed earlier
      );

      if (!databaseUpdated) {
        console.error("Error updating the database");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setLoading(false);

      // Update the local journalData state to reflect the new entry
      // with the correct nested structure
      if (setJournalData && journalData) {
        const now = Timestamp.now();
        setJournalData({
          ...journalData,
          journaling: {
            ...(journalData.journaling || {}),
            [journalSlug]: {
              ...(journalData.journaling?.[journalSlug] || {}),
              [formattedDate]: {
                encryptedUserInput: encryptedUserInputs,
                createdAt: now,
              },
            },
          },
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  /* scroll on submission */
  const submissionNoticeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted && submissionNoticeRef.current) {
      submissionNoticeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [submitted]);

  let submissionNotice;
  let content;

  if (submitted) {
    submissionNotice = (
      <div className="flex items-center gap-x-4" ref={submissionNoticeRef}>
        <div className="flex h-12 w-auto items-center justify-center rounded-full border border-emerald-700 p-1">
          <Image
            height={50}
            width={50}
            src={logo}
            alt="PASU logo"
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
        journalOutlineFromSanity={journalOutlineFromSanity}
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
          journalOutlineFromSanity={journalOutlineFromSanity}
        />
      );
    } else {
      content = (
        <div>
          <form onSubmit={handleSubmit}>
            {journalOutlineFromSanity.promptCategories.map((category) => (
              <div
                key={category.name}
                id={category.name.toLowerCase().replace(/\s+/g, "-")}
              >
                <h4 className="mb-4 text-xl font-light">{category.name}</h4>
                {category.prompts.map((prompt) => (
                  <div key={prompt._key} className="flex flex-col items-center">
                    <div className="my-2 w-full rounded-lg py-1">
                      <h5 className="text-lg font-light">
                        <PortableText value={prompt.prompt} />
                      </h5>
                      <textarea
                        id={`textarea-${prompt._key}`}
                        name={`userInput-${prompt._key}`}
                        className="my-2 h-28 w-full rounded-md border-0 p-2 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-700"
                        value={userInputs[prompt._key] || ""}
                        onChange={(e) =>
                          handleInputChange(prompt._key, e.target.value)
                        }
                      ></textarea>
                    </div>
                  </div>
                ))}
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
        {!journalSlug ? "Journal data not available..." : "Loading..."}
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
  journalOutlineFromSanity,
}: ExistingEntryProps) => {
  const handleClick = () => {
    setUserInputs(previousInputData.decryptedUserInput || {});
    setPreviousInputData({});
    setSubmitted(false);
  };

  return (
    <div>
      <div>
        {journalOutlineFromSanity.promptCategories.map((category) => (
          <div key={category.name}>
            <h4 className="mb-4 text-xl font-light">{category.name}</h4>
            {category.prompts.map((prompt) => {
              const response = previousInputData.decryptedUserInput
                ? previousInputData.decryptedUserInput[prompt._key]
                : "";

              return (
                <div key={prompt._key} className="flex flex-col items-center">
                  <div className="my-4 w-full rounded-lg py-1">
                    <h5 className="font-light">
                      <PortableText
                        value={prompt.prompt}
                        components={portableTextComponents}
                      />
                    </h5>
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
        ))}
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
