"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { format, addDays, subDays, isBefore, isToday } from "date-fns";

import { app } from "@firebase/auth/appConfig";
import { SubmitButton } from "@/app/_components/ui/_components/Buttons";
import updateDatabase from "./updateDatabase";
import getFormattedDate from "@actions/getFormattedDate";
import logo from "@/components/design/brainLogoCompressed.png";
import journalingPrompts from "./journalingPrompts";
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
  // ArrowLongDownIcon,
} from "@heroicons/react/24/outline";
import { set } from "sanity";

interface DecryptedInputs {
  [key: string]: any;
}

interface PreviousInputData {
  decryptedUserInput?: DecryptedInputs;
  createdAt?: string;
}

interface UserInputs {
  [key: string]: string;
}

interface UserInputsWithIds {
  [key: string]: string | undefined;
}

export default function JournalTextAreaForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [userInputs, setUserInputs] = useState<UserInputs>({});
  console.log("userInputs: ", userInputs);
  const [previousInputData, setPreviousInputData] = useState<PreviousInputData>(
    {}
  );

  const formatDate = (date: Date) => {
    const day = `0${date.getDate()}`.slice(-2);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const today = formatDate(new Date());

  const [selectedDate, setSelectedDate] = useState(today);

  const handlePreviousDay = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() - 1);
    setSelectedDate(formatDate(currentDate));
    setSubmitted(false);
    console.log("selectedDateBtn: ", selectedDate);
  };

  const handleNextDay = () => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + 1);
    setSelectedDate(formatDate(currentDate));
    setSubmitted(false);
  };

  const formattedDate = format(selectedDate, "dd-MMM-yyyy").replace(
    "Sep",
    "Sept"
  );

  const setDateUI = (
    <div className="flex items-center gap-x-2">
      <button onClick={handlePreviousDay}>
        <ArrowLeftCircleIcon className="h-6 w-6" />
      </button>
      <h1 className="text-2xl">{formattedDate}</h1>
      {selectedDate !== today && (
        <button onClick={handleNextDay}>
          <ArrowRightCircleIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );

  // Load any previous input
  useEffect(() => {
    async function fetchSavedUserInput(selectedDate: string) {
      setLoading(true);

      try {
        const db = getFirestore(app);
        const response = await fetch("/api/accessUserId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          router.push("/signin");
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const userDoc = doc(db, "users", result.userID);
        const docSnap = await getDoc(userDoc);

        if (!docSnap.exists()) {
          setLoading(false);
          router.push("/signin");
        }

        const data = docSnap.data();
        if (!data) {
          setLoading(false);
          router.push("/signin");
        }

        // console.log("data: ", data); // Log the entire data object
        // console.log("data.journal: ", data.journal); // Log the journal object
        // console.log("selectedDate: ", selectedDate); // Log the selectedDate

        // if (!data.journal.hasOwnProperty(selectedDate)) {
        //   console.error(
        //     `selectedDate ${selectedDate} does not exist in data.journal`
        //   );
        //   setLoading(false);
        //   return;
        // }
        const previousInput = data?.journal?.[selectedDate];
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

        const decryptedInputs: DecryptedInputs = {};

        // Decrypt each encrypted user input
        for (const key in encryptedUserInputs) {
          if (encryptedUserInputs.hasOwnProperty(key)) {
            const { iv, encryptedData } = encryptedUserInputs[key];

            const decryptionResponse = await fetch("/api/decryptText", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ iv, encryptedData }),
            });

            if (!decryptionResponse.ok) {
              throw new Error(
                `Decryption error! status: ${decryptionResponse.status}`
              );
            }

            const decryptedData = await decryptionResponse.json();
            decryptedInputs[key] = decryptedData.decryptedData;
          }
        }

        const previousInputData: PreviousInputData = {
          decryptedUserInput: decryptedInputs,
          createdAt: previousInputDate,
        };

        setPreviousInputData(previousInputData);
        setUserInputs(decryptedInputs); // Load decrypted inputs into state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching or decrypting previous input:", error);
        setLoading(false);
      }
    }

    //   fetchSavedUserInput(selectedDate);
    // }, [selectedDate, router]);
    fetchSavedUserInput(
      format(selectedDate, "dd-MMM-yyyy").replace("Sep", "Sept")
    );
  }, [selectedDate, router]);

  const handleInputChange = (key: string, value: any) => {
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

      // Save the encrypted data under the selected date
      const databaseUpdated = await updateDatabase(
        encryptedUserInputs,
        selectedDate
      );

      if (!databaseUpdated) {
        console.error("Error updating the database");
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

  const prompts = journalingPrompts.general.concat(journalingPrompts.exhausted); // Use general prompts (adjust according to your logic)

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
    }

    if (!previousInputData.decryptedUserInput) {
      content = (
        <div>
          <form onSubmit={handleSubmit}>
            {prompts.map((prompt, index) => (
              <div key={prompt.id} className="flex flex-col items-center">
                <div className="my-6 w-full rounded-lg p-4">
                  <h5 className="font-semibold">{prompt.prompt}</h5>{" "}
                  {/* Access the `prompt` field */}
                  <textarea
                    id={`textarea-${prompt.id}`}
                    name={`userInput-${prompt.id}`}
                    className="my-6 h-40 w-full rounded-md"
                    value={userInputs[prompt.id] || ""}
                    onChange={(e) =>
                      handleInputChange(prompt.id, e.target.value)
                    } // Use prompt ID
                  ></textarea>
                </div>
              </div>
            ))}
            <SubmitButton classes="rounded-lg bg-emerald-700 px-4 py-2 mt-10 text-white disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-gray-100 w-full">
              Save my answers
            </SubmitButton>
          </form>
        </div>
      );
    }
  }

  if (loading) {
    content = (
      <h3 className="animate-pulse text-xl font-extralight text-emerald-700">
        Loading...
      </h3>
    );
  }

  return (
    <>
      {setDateUI}
      {submissionNotice}
      {content}
    </>
  );
}

const ExistingEntry = ({
  previousInputData,
  setUserInputs,
  setPreviousInputData,
  setSubmitted,
  prompts = [], // Pass the prompts array to the component
}: {
  previousInputData: PreviousInputData;
  setUserInputs: React.Dispatch<React.SetStateAction<{}>>;
  setPreviousInputData: React.Dispatch<React.SetStateAction<PreviousInputData>>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  prompts: { id: string; prompt: string }[]; // Update prompts type
}) => {
  const handleClick = () => {
    setUserInputs(previousInputData.decryptedUserInput || {});
    setPreviousInputData({});
    setSubmitted(false);
  };

  return (
    <div>
      <div className="not-prose flex items-center space-x-10">
        <button
          onClick={handleClick}
          className="w-36 rounded-md bg-emerald-700 px-4 py-1 text-white hover:bg-emerald-600"
        >
          Edit
        </button>
      </div>
      <div>
        {prompts.map((prompt) => {
          const response = previousInputData.decryptedUserInput
            ? previousInputData.decryptedUserInput[prompt.id]
            : "";

          return (
            <div key={prompt.id} className="flex flex-col items-center">
              <div className="my-6 w-full rounded-lg p-4">
                <h5 className="font-semibold">{prompt.prompt}</h5>{" "}
                {/* Display the prompt text */}
                <p>
                  {response || (
                    <div className="relative rounded-lg border border-gray-500 bg-white px-6 text-gray-600">
                      <div className="absolute -right-3 -top-3">
                        <span className="relative flex h-5 w-5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex h-5 w-5 rounded-full bg-sky-500"></span>
                        </span>{" "}
                      </div>
                      <p className="text-sm">
                        Click Edit at the top of the page to complete this
                        field.
                      </p>
                    </div>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
