// JournalTextAreaForm.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { format } from "date-fns";
import { app } from "@firebase/auth/appConfig";
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
}: JournalTextAreaFormProps) {
  const router = useRouter();
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
          return;
        }

        const data = docSnap.data();
        if (!data) {
          setLoading(false);
          router.push("/signin");
          return;
        }

        const previousInput = data?.journal?.[formattedDate];
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

    fetchSavedUserInput();
  }, [selectedDate, router, formattedDate]);

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
                  <h5 className="font-light">{prompt.prompt}</h5>
                  <textarea
                    id={`textarea-${prompt.id}`}
                    name={`userInput-${prompt.id}`}
                    className="my-2 h-28 w-full rounded-md border border-gray-100 p-2"
                    value={userInputs[prompt.id] || ""}
                    onChange={(e) =>
                      handleInputChange(prompt.id, e.target.value)
                    }
                  ></textarea>
                </div>
              </div>
            ))}
            <SubmitButton classes="rounded-lg bg-emerald-700 px-4 py-2 mt-6 text-white disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-gray-100 w-full">
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

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { doc, getFirestore, getDoc } from "firebase/firestore";
// import { format } from "date-fns";

// import { app } from "@firebase/auth/appConfig";
// import { SubmitButton } from "@/app/_components/ui/_components/Buttons";
// import getFormattedDate from "@actions/getFormattedDate";
// import logo from "@/components/design/brainLogoCompressed.png";
// import journalingPrompts from "./journalingPrompts";
// import {
//   ArrowRightCircleIcon,
//   ArrowLeftCircleIcon,
// } from "@heroicons/react/24/outline";
// import updateDatabase from "./updateDatabase";

// interface DecryptedInputs {
//   [key: string]: any;
// }

// interface PreviousInputData {
//   decryptedUserInput?: DecryptedInputs;
//   createdAt?: string;
// }

// interface UserInputs {
//   [key: string]: string;
// }

// interface UserInputsWithIds {
//   [key: string]: string | undefined;
// }

// interface JournalTextAreaFormProps {
//   selectedDate: Date;
//   setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
// }

// export default function JournalTextAreaForm({
//   selectedDate,
//   setSelectedDate,
// }: JournalTextAreaFormProps) {
//   const router = useRouter();
//   const [loading, setLoading] = useState<boolean>(true);
//   const [submitted, setSubmitted] = useState<boolean>(false);
//   const [userInputs, setUserInputs] = useState<UserInputs>({});
//   const [previousInputData, setPreviousInputData] = useState<PreviousInputData>(
//     {}
//   );

//   const formattedDate = format(selectedDate, "dd-MMM-yyyy");

//   // Load any previous input
//   useEffect(() => {
//     async function fetchSavedUserInput() {
//       setLoading(true);

//       try {
//         const db = getFirestore(app);
//         const response = await fetch("/api/accessUserId", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           router.push("/signin");
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         const userDoc = doc(db, "users", result.userID);
//         const docSnap = await getDoc(userDoc);

//         if (!docSnap.exists()) {
//           setLoading(false);
//           router.push("/signin");
//           return;
//         }

//         const data = docSnap.data();
//         if (!data) {
//           setLoading(false);
//           router.push("/signin");
//           return;
//         }

//         const previousInput = data?.journal?.[formattedDate];
//         if (!previousInput) {
//           setLoading(false);
//           setPreviousInputData({});
//           setUserInputs({});
//           return;
//         }

//         const previousInputDate = getFormattedDate(
//           previousInput.createdAt.seconds
//         );
//         const encryptedUserInputs = previousInput.encryptedUserInput;

//         const decryptedInputs: DecryptedInputs = {};

//         // Decrypt each encrypted user input
//         for (const key in encryptedUserInputs) {
//           if (encryptedUserInputs.hasOwnProperty(key)) {
//             const { iv, encryptedData } = encryptedUserInputs[key];

//             const decryptionResponse = await fetch("/api/decryptText", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ iv, encryptedData }),
//             });

//             if (!decryptionResponse.ok) {
//               throw new Error(
//                 `Decryption error! status: ${decryptionResponse.status}`
//               );
//             }

//             const decryptedData = await decryptionResponse.json();
//             decryptedInputs[key] = decryptedData.decryptedData;
//           }
//         }

//         const previousInputData: PreviousInputData = {
//           decryptedUserInput: decryptedInputs,
//           createdAt: previousInputDate,
//         };

//         setPreviousInputData(previousInputData);
//         setUserInputs(decryptedInputs); // Load decrypted inputs into state
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching or decrypting previous input:", error);
//         setLoading(false);
//       }
//     }

//     fetchSavedUserInput();
//   }, [selectedDate, router, formattedDate]);

//   const handleInputChange = (key: string, value: any) => {
//     setUserInputs((prevInputs) => ({
//       ...prevInputs,
//       [key]: value,
//     }));
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!userInputs) return;

//     try {
//       // Map prompt IDs to corresponding user inputs for better structure
//       let userInputsWithIds: UserInputsWithIds = {};
//       journalingPrompts.general.forEach((prompt) => {
//         userInputsWithIds[prompt.id] = userInputs[prompt.id]; // Use prompt ID as key
//       });

//       journalingPrompts.exhausted.forEach((prompt) => {
//         userInputsWithIds[prompt.id] = userInputs[prompt.id]; // Same for exhausted category
//       });

//       // Encrypt the userInputsWithIds object before saving
//       const response = await fetch("/api/encryptText", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userInputs: userInputsWithIds }),
//       });

//       const encryptedUserInputs = await response.json();

//       // Format selectedDate before passing it to updateDatabase
//       const formattedDate = format(selectedDate, "dd-MMM-yyyy");

//       // Save the encrypted data under the formatted date
//       const databaseUpdated = await updateDatabase(
//         encryptedUserInputs,
//         formattedDate
//       );

//       if (!databaseUpdated) {
//         console.error("Error updating the database");
//         setLoading(false);
//         return;
//       }

//       setSubmitted(true);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setLoading(false);
//     }
//   };

//   const submissionNoticeRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (submitted && submissionNoticeRef.current) {
//       submissionNoticeRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [submitted]);

//   let submissionNotice;
//   let content;

//   const prompts = journalingPrompts.general.concat(journalingPrompts.exhausted);

//   if (submitted) {
//     submissionNotice = (
//       <div className="flex items-center gap-x-4" ref={submissionNoticeRef}>
//         <div className="flex h-12 w-auto items-center justify-center rounded-full border border-emerald-700 p-1">
//           <Image
//             height={50}
//             width={50}
//             src={logo}
//             alt="Burnout Hub logo"
//             className="h-8 w-auto"
//           />
//         </div>
//         <span className="my-16 text-xl font-extralight text-emerald-700">
//           Your submission has been saved.
//         </span>
//       </div>
//     );
//     content = (
//       <ExistingEntry
//         previousInputData={{
//           decryptedUserInput: userInputs,
//           createdAt: "Just now",
//         }}
//         setUserInputs={setUserInputs}
//         setPreviousInputData={setPreviousInputData}
//         setSubmitted={setSubmitted}
//         prompts={prompts}
//       />
//     );
//   } else {
//     submissionNotice = null;

//     if (previousInputData.decryptedUserInput) {
//       content = (
//         <ExistingEntry
//           previousInputData={previousInputData}
//           setUserInputs={setUserInputs}
//           setPreviousInputData={setPreviousInputData}
//           setSubmitted={setSubmitted}
//           prompts={prompts}
//         />
//       );
//     } else {
//       content = (
//         <div>
//           <form onSubmit={handleSubmit}>
//             {prompts.map((prompt) => (
//               <div key={prompt.id} className="flex flex-col items-center">
//                 <div className="my-2 w-full rounded-lg py-1">
//                   <h5 className="font-light">{prompt.prompt}</h5>
//                   <textarea
//                     id={`textarea-${prompt.id}`}
//                     name={`userInput-${prompt.id}`}
//                     className="my-2 h-28 w-full rounded-md border border-gray-100 p-2"
//                     value={userInputs[prompt.id] || ""}
//                     onChange={(e) =>
//                       handleInputChange(prompt.id, e.target.value)
//                     }
//                   ></textarea>
//                 </div>
//               </div>
//             ))}
//             <SubmitButton classes="rounded-lg bg-emerald-700 px-4 py-2 mt-6 text-white disabled:bg-gray-500 disabled:cursor-not-allowed disabled:text-gray-100 w-full">
//               Save my answers
//             </SubmitButton>
//           </form>
//         </div>
//       );
//     }
//   }

//   if (loading) {
//     content = (
//       <h3 className="animate-pulse text-xl font-extralight text-emerald-700">
//         Loading...
//       </h3>
//     );
//   }

//   return (
//     <div className="mt-4 text-sm leading-6 lg:col-span-7 xl:col-span-8">
//       <h1 className="mb-4 text-2xl font-extralight">{formattedDate}</h1>
//       {submissionNotice}
//       {content}
//     </div>
//   );
// }

// interface ExistingEntryProps {
//   previousInputData: PreviousInputData;
//   setUserInputs: React.Dispatch<React.SetStateAction<UserInputs>>;
//   setPreviousInputData: React.Dispatch<React.SetStateAction<PreviousInputData>>;
//   setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
//   prompts: { id: string; prompt: string }[];
// }

// const ExistingEntry = ({
//   previousInputData,
//   setUserInputs,
//   setPreviousInputData,
//   setSubmitted,
//   prompts = [],
// }: ExistingEntryProps) => {
//   const handleClick = () => {
//     setUserInputs(previousInputData.decryptedUserInput || {});
//     setPreviousInputData({});
//     setSubmitted(false);
//   };

//   return (
//     <div>
//       <div>
//         {prompts.map((prompt) => {
//           const response = previousInputData.decryptedUserInput
//             ? previousInputData.decryptedUserInput[prompt.id]
//             : "";

//           return (
//             <div key={prompt.id} className="flex flex-col items-center">
//               <div className="my-4 w-full rounded-lg py-1">
//                 <h5 className=" font-light">{prompt.prompt}</h5>
//                 <div>
//                   {response ? (
//                     <p className="mt-1 text-gray-800">{response}</p>
//                   ) : (
//                     <div className="relative rounded-lg border border-gray-100 bg-white px-6 py-4 text-gray-600">
//                       <div className="absolute -right-2 -top-3">
//                         <span className="relative flex h-5 w-5">
//                           <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
//                           <span className="relative inline-flex h-5 w-5 rounded-full bg-red-500"></span>
//                         </span>
//                       </div>
//                       <p className="text-sm">
//                         Select Edit below to complete this field.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="not-prose flex items-center space-x-10">
//         <button
//           onClick={handleClick}
//           className="w-36 rounded-md bg-emerald-700 px-4 py-1 text-white hover:bg-emerald-600"
//         >
//           Edit entries
//         </button>
//       </div>
//     </div>
//   );
// };
