"use client";
//react
import { useState, useEffect } from "react";
//next
import Image from "next/image";
import { useRouter } from "next/navigation";
//firebase
import { app } from "@firebase/auth/appConfig";
import { doc, getFirestore, getDoc } from "firebase/firestore";
//components
import { SubmitButton } from "@/app/_components/ui/_components/Buttons";
//functions
import updateDatabase from "@exercises/selfReflectionExercises/updateDatabase";
//actions
import getFormattedDate from "@actions/getFormattedDate";
//Image
import logo from "@/components/design/brainLogoCompressed.png";

interface PreviousInputData {
  decryptedUserInput?: string;
  createdAt?: string;
}
export default function TextAreaForm({
  exerciseSlug,
}: {
  exerciseSlug: string;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [userInput, setUserInput] = useState("");

  const [previousInputData, setPreviousInputData] = useState<PreviousInputData>(
    {}
  );

  ///Load up any previous input
  useEffect(() => {
    async function fetchSavedUserInput() {
      // setLoading(true);
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
      const user = doc(db, "users", result.userID);
      const docSnap = await getDoc(user);
      if (!docSnap.exists()) {
        setLoading(false);
        return;
      }
      const data = docSnap.data();
      if (!data) {
        setLoading(false);
      }

      const previousInput = data.exercises[exerciseSlug];
      if (!previousInput) {
        setLoading(false);
        return;
      }

      const previousInputDate = getFormattedDate(
        previousInput.createdAt.seconds
      );

      const previousInputEncryptionData = previousInput.encryptedUserInput;

      try {
        const response = await fetch("/api/decryptText", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(previousInputEncryptionData),
        });

        const decryptedUserInput = await response.json();

        const prevUserInput = {
          decryptedUserInput: decryptedUserInput.decryptedData,
          createdAt: previousInputDate,
        };

        setPreviousInputData(prevUserInput);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching previous input:", error);
        setLoading(false);
      }
    }

    fetchSavedUserInput();
  }, [exerciseSlug]);
  ////////////////////////////////////////

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!userInput) return;

    try {
      const response = await fetch("/api/encryptText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      const encryptedUserInput = await response.json();

      const databaseUpdated = await updateDatabase(
        encryptedUserInput,
        exerciseSlug
      );

      if (!databaseUpdated) {
        console.error("Error updating the database");
        return;
      }

      setSubmitted(true); // Update the submitted state based on the response
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  let submissionNotice;
  let content;
  if (submitted) {
    submissionNotice = (
      <div className="flex items-center gap-x-4">
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
          decryptedUserInput: userInput,
          createdAt: "Just now",
        }}
        setUserInput={setUserInput}
        setPreviousInputData={setPreviousInputData}
        setSubmitted={setSubmitted}
      />
    );
  } else {
    submissionNotice = null;

    if (previousInputData.decryptedUserInput) {
      content = (
        <ExistingEntry
          previousInputData={previousInputData}
          setUserInput={setUserInput}
          setPreviousInputData={setPreviousInputData}
          setSubmitted={setSubmitted}
        />
      );
    }

    if (!previousInputData.decryptedUserInput) {
      content = (
        <div>
          <form onSubmit={handleSubmit}>
            <textarea
              name="userInput"
              className="my-6 h-96 w-full rounded-md"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
            <SubmitButton classes="rounded-lg bg-emerald-700 px-4 py-2 text-white disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-gray-100">
              Submit
            </SubmitButton>
          </form>
        </div>
      );
    }
  }

  if (loading) {
    content = (
      <h3 className="text-xl font-extralight text-emerald-700">Loading...</h3>
    );
  }

  return (
    <>
      {submissionNotice}
      {content}
    </>
  );
}

const ExistingEntry = ({
  previousInputData,
  setUserInput,
  setPreviousInputData,
  setSubmitted,
}: {
  previousInputData: PreviousInputData;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  setPreviousInputData: React.Dispatch<React.SetStateAction<PreviousInputData>>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClick = () => {
    setUserInput(previousInputData.decryptedUserInput || "");
    setPreviousInputData({});
    setSubmitted(false);
  };
  return (
    <div className="my-6 rounded-lg border-2 border-emerald-700 px-4">
      <h4 className="text-xl text-emerald-700">
        {`Your response, last updated: ${previousInputData.createdAt}`}
      </h4>
      <p>{previousInputData.decryptedUserInput}</p>
      <button
        onClick={handleClick}
        className="my-2 rounded-lg bg-emerald-700 px-4 py-1 text-white hover:bg-emerald-600"
      >
        Edit
      </button>
    </div>
  );
};
