"use client";
// React
import React, { useState, useEffect, useRef } from "react";
// Next.js
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
// Image
import logo from "@/components/design/brainLogoCompressed.png";
// Icons
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

type UserInputs = {
  [key: string]: string;
};

interface DecryptedInputs {
  [key: string]: any;
}

interface PreviousInputData {
  decryptedUserInput?: DecryptedInputs;
  createdAt?: string;
}

// Define the Prompt type
interface Prompt {
  _key: string;
  content: any; // You can replace 'any' with the actual type if available
}

// Define the PromptGroup type
interface PromptGroup {
  _key: string;
  heading?: string;
  prompts: Prompt[];
}

// Define the Section type
interface Section {
  _key: string;
  slug: string;
  sectionTitle: string;
  promptGroups: PromptGroup[];
}

export default function WritingExerciseForm({
  exerciseSlug,
  prompts,
}: {
  exerciseSlug: string;
  prompts: Section[];
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [userInputs, setUserInputs] = useState<UserInputs>({});

  const [previousInputData, setPreviousInputData] = useState<PreviousInputData>(
    {}
  );
  const [revealExercise, setRevealExercise] = useState(false);

  const headings: string[] = [];

  prompts.forEach((section: Section) => {
    section.promptGroups.forEach((promptGroup: PromptGroup) => {
      if (promptGroup.heading) {
        headings.push(promptGroup.heading);
      }
    });
  });

  // Load up any previous input
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
          return;
        }

        const data = docSnap.data();
        if (!data) {
          setLoading(false);
          return;
        }

        const previousInput = data.exercises[exerciseSlug];
        if (!previousInput) {
          setLoading(false);
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

        // Set the decrypted inputs and other state
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
  }, [exerciseSlug, router]);

  ////////////////////////////////////////

  const handleInputChange = (key: string, value: any) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [key]: value,
    }));
  };

  /////////////////////////////////////////

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!userInputs) return;

    try {
      // Encrypt the userInputs object before saving, if necessary
      const response = await fetch("/api/encryptText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInputs }),
      });

      const encryptedUserInputs = await response.json();

      // Assuming updateDatabase is a function that updates Firestore with the encrypted data
      const databaseUpdated = await updateDatabase(
        encryptedUserInputs,
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
  ////////////////////////////////////////

  // Scroll to the submission notice if the form has been submitted
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

    // UI if no previous input
    if (!previousInputData.decryptedUserInput) {
      if (revealExercise) {
        content = (
          <div>
            <form onSubmit={handleSubmit}>
              {prompts.map((section: Section) => (
                <div
                  id={section.slug}
                  key={section._key}
                  className="mb-4 flex flex-col"
                >
                  <h2 className="py-2 text-2xl font-thin">
                    {section.sectionTitle}
                  </h2>
                  <div className="w-full rounded-lg border-2 border-emerald-700 p-4">
                    <div className="text-gray-800">
                      {section.promptGroups.map((group: PromptGroup) => (
                        <details key={group._key} className="group mb-4">
                          <summary className="flex cursor-pointer justify-between">
                            <h3 className="font-light">{group.heading}</h3>
                            <div className="flex items-center">
                              <ChevronDownIcon className="h-5 w-5 text-emerald-700 group-open:hidden" />
                              <ChevronUpIcon className="hidden h-5 w-5 text-emerald-700 group-open:inline" />
                            </div>
                          </summary>
                          <div className="mt-4 group-open:block">
                            {group.prompts.map(
                              (prompt: Prompt, index: number) => {
                                const textareaKey = `${section._key}-${
                                  group._key
                                }-${prompt._key || index}`;
                                return (
                                  <div
                                    key={prompt._key || index}
                                    className="mb-4"
                                  >
                                    <PortableText
                                      value={prompt.content}
                                      components={portableTextComponents}
                                    />
                                    <textarea
                                      id={`textarea-${textareaKey}`}
                                      name={`userInput-${textareaKey}`}
                                      className="mt-2 h-40 w-full rounded-md"
                                      value={userInputs[textareaKey] || ""}
                                      onChange={(e) => {
                                        handleInputChange(
                                          textareaKey,
                                          e.target.value
                                        );
                                      }}
                                    ></textarea>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <SubmitButton classes="mt-10 w-full rounded-lg bg-emerald-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-100">
                Save my answers
              </SubmitButton>
            </form>
          </div>
        );
      } else {
        content = (
          <GetStartedButton
            setRevealExercise={setRevealExercise}
            exerciseSlug={exerciseSlug}
            headings={headings}
          />
        );
      }
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
      {submissionNotice}
      {content}
    </>
  );
}

// Updated ExistingEntry component
const ExistingEntry = ({
  previousInputData,
  setUserInputs,
  setPreviousInputData,
  setSubmitted,
  prompts = [],
}: {
  previousInputData: PreviousInputData;
  setUserInputs: React.Dispatch<React.SetStateAction<{}>>;
  setPreviousInputData: React.Dispatch<React.SetStateAction<PreviousInputData>>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  prompts: Section[];
}) => {
  const handleClick = () => {
    setUserInputs(previousInputData.decryptedUserInput || {});
    setPreviousInputData({});
    setSubmitted(false);
  };

  return (
    <div className="">
      <div className="background-amber sticky top-0 z-20 flex items-center space-x-10 border-y border-gray-400 bg-white p-2">
        {/* <div className="sticky top-0 z-20 flex items-center  space-x-10 rounded-lg p-2 backdrop-blur-xl"> */}
        <span className="text-xl text-emerald-700">
          {`Your responses, last updated: ${previousInputData.createdAt}`}
        </span>
        <button
          onClick={handleClick}
          className="w-36 rounded-md bg-emerald-700 px-4 py-1 text-white hover:bg-emerald-600"
        >
          Edit
        </button>
      </div>
      <div>
        {prompts.map((section: Section) => (
          <div
            id={section.slug}
            key={section._key}
            className="mb-4 flex flex-col"
          >
            <h2 className="py-2 text-2xl font-thin">{section.sectionTitle}</h2>
            <div className="w-full rounded-lg border-2 border-emerald-700 p-4">
              <div className="text-gray-800">
                {section.promptGroups.map((group: PromptGroup) => (
                  <details key={group._key} className="group mb-4" open>
                    <summary className="flex cursor-pointer justify-between">
                      <h3 className="font-light">{group.heading}</h3>
                      <div className="flex items-center">
                        <ChevronDownIcon className="h-5 w-5 text-emerald-700 group-open:hidden" />
                        <ChevronUpIcon className="hidden h-5 w-5 text-emerald-700 group-open:inline" />
                      </div>
                    </summary>
                    <div className="mt-4 group-open:block">
                      {group.prompts.map((prompt: Prompt, index: number) => {
                        const textareaKey = `${section._key}-${group._key}-${
                          prompt._key || index
                        }`;
                        const response = previousInputData.decryptedUserInput
                          ? previousInputData.decryptedUserInput[textareaKey]
                          : "";

                        return (
                          <div key={prompt._key || index} className="mb-4">
                            <PortableText
                              value={prompt.content}
                              components={portableTextComponents}
                            />
                            <p className="mt-2 whitespace-pre-wrap">
                              {response || (
                                <div className="relative rounded-lg border border-gray-500 bg-white px-6 text-gray-600">
                                  <div className="absolute -right-3 -top-3">
                                    <span className="relative flex h-5 w-5">
                                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                      <span className="relative inline-flex h-5 w-5 rounded-full bg-sky-500"></span>
                                    </span>{" "}
                                  </div>
                                  {/* <p className="underline decoration-sky-400 decoration-1 underline-offset-4"> */}
                                  <p className="">
                                    You haven&apos;t written anything here
                                    yet...
                                  </p>{" "}
                                  <p className="text-sm">
                                    Click Edit to complete this field.
                                  </p>
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
          </div>
        ))}
      </div>
    </div>
  );
};

// "use client";
// // React
// import React, { useState, useEffect, useRef } from "react";
// // Next.js
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// // Firebase
// import { app } from "@firebase/auth/appConfig";
// import { doc, getFirestore, getDoc } from "firebase/firestore";
// // Sanity
// import { PortableText } from "@portabletext/react";
// import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";
// // Components
// import { SubmitButton } from "@/app/_components/ui/_components/Buttons";
// import GetStartedButton from "./GetStartedButton";
// // Functions
// import updateDatabase from "./updateDatabase";
// // Actions
// import getFormattedDate from "@actions/getFormattedDate";
// // Image
// import logo from "@/components/design/brainLogoCompressed.png";
// // Types
// import { Prompt } from "@/types/sanity";
// // Icons
// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

// type UserInputs = {
//   [key: string]: string;
// };

// interface DecryptedInputs {
//   [key: string]: any;
// }

// interface PreviousInputData {
//   decryptedUserInput?: DecryptedInputs;
//   createdAt?: string;
// }

// export default function WritingExerciseForm({
//   exerciseSlug,
//   prompts,
// }: {
//   exerciseSlug: string;
//   prompts: Prompt[];
// }) {
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [submitted, setSubmitted] = useState(false);
//   const [userInputs, setUserInputs] = useState<UserInputs>({});

//   const [previousInputData, setPreviousInputData] = useState<PreviousInputData>(
//     {}
//   );
//   const [revealExercise, setRevealExercise] = useState(false);

//   const headings = [];

//   prompts.forEach((section) => {
//     section.promptGroups.forEach((promptGroup) => {
//       if (promptGroup.heading) {
//         headings.push(promptGroup.heading);
//       }
//     });
//   });

//   // Load up any previous input
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
//           return;
//         }

//         const data = docSnap.data();
//         if (!data) {
//           setLoading(false);
//           return;
//         }

//         const previousInput = data.exercises[exerciseSlug];
//         if (!previousInput) {
//           setLoading(false);
//           return;
//         }

//         const previousInputDate = getFormattedDate(
//           previousInput.createdAt.seconds
//         );
//         const encryptedUserInputs = previousInput.encryptedUserInput;

//         // Collect all encrypted inputs into an array
//         const encryptedInputsArray = Object.keys(encryptedUserInputs).map(
//           (key) => ({
//             key,
//             iv: encryptedUserInputs[key].iv,
//             encryptedData: encryptedUserInputs[key].encryptedData,
//           })
//         );

//         // Make a single API call to decrypt all inputs
//         const decryptionResponse = await fetch("/api/decryptText", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ encryptedInputs: encryptedInputsArray }),
//         });

//         if (!decryptionResponse.ok) {
//           throw new Error(
//             `Decryption error! status: ${decryptionResponse.status}`
//           );
//         }

//         const { decryptedOutputs } = await decryptionResponse.json();

//         // Map decrypted outputs back to their keys
//         const decryptedInputs: DecryptedInputs = {};
//         encryptedInputsArray.forEach((input, index) => {
//           decryptedInputs[input.key] = decryptedOutputs[index];
//         });

//         // Set the decrypted inputs and other state
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
//   }, [exerciseSlug, router]);

//   ////////////////////////////////////////

//   const handleInputChange = (key: string, value: any) => {
//     setUserInputs((prevInputs) => ({
//       ...prevInputs,
//       [key]: value,
//     }));
//   };

//   /////////////////////////////////////////

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!userInputs) return;

//     try {
//       // Encrypt the userInputs object before saving, if necessary
//       const response = await fetch("/api/encryptText", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userInputs }),
//       });

//       const encryptedUserInputs = await response.json();

//       // Assuming updateDatabase is a function that updates Firestore with the encrypted data
//       const databaseUpdated = await updateDatabase(
//         encryptedUserInputs,
//         exerciseSlug
//       );

//       if (!databaseUpdated) {
//         console.error("Error updating the database");
//         return;
//       }

//       setSubmitted(true); // Update the submitted state based on the response
//       setLoading(false);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setLoading(false);
//     }
//   };
//   ////////////////////////////////////////

//   // Scroll to the submission notice if the form has been submitted
//   const submissionNoticeRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (submitted && submissionNoticeRef.current) {
//       submissionNoticeRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [submitted]);

//   let submissionNotice;
//   let content;

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
//     }

//     // UI if no previous input
//     if (!previousInputData.decryptedUserInput) {
//       if (revealExercise) {
//         content = (
//           <div>
//             <form onSubmit={handleSubmit}>
//               {prompts.map((section) => (
//                 <div
//                   id={section.slug}
//                   key={section._key}
//                   className="mb-4 flex flex-col"
//                 >
//                   <h2 className="py-2 text-2xl font-thin">
//                     {section.sectionTitle}
//                   </h2>
//                   <div className="w-full rounded-lg border-2 border-emerald-700 p-4">
//                     <div className="text-gray-800">
//                       {section.promptGroups.map((group) => (
//                         <details key={group._key} className="group mb-4">
//                           <summary className="flex cursor-pointer justify-between">
//                             <h3 className="font-light">{group.heading}</h3>
//                             <div className="flex items-center">
//                               <ChevronDownIcon className="h-5 w-5 text-emerald-700 group-open:hidden" />
//                               <ChevronUpIcon className="hidden h-5 w-5 text-emerald-700 group-open:inline" />
//                             </div>
//                           </summary>
//                           <div className="mt-4 group-open:block">
//                             {group.prompts.map((prompt, index) => {
//                               const textareaKey = `${section._key}-${
//                                 group._key
//                               }-${prompt._key || index}`;
//                               return (
//                                 <div
//                                   key={prompt._key || index}
//                                   className="mb-4"
//                                 >
//                                   <PortableText
//                                     value={prompt.content}
//                                     components={portableTextComponents}
//                                   />
//                                   <textarea
//                                     id={`textarea-${textareaKey}`}
//                                     name={`userInput-${textareaKey}`}
//                                     className="mt-2 h-40 w-full rounded-md"
//                                     value={userInputs[textareaKey] || ""}
//                                     onChange={(e) => {
//                                       handleInputChange(
//                                         textareaKey,
//                                         e.target.value
//                                       );
//                                     }}
//                                   ></textarea>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </details>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <SubmitButton className="mt-10 w-full rounded-lg bg-emerald-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-100">
//                 Save my answers
//               </SubmitButton>
//             </form>
//           </div>
//         );
//       } else {
//         content = (
//           <GetStartedButton
//             setRevealExercise={setRevealExercise}
//             exerciseSlug={exerciseSlug}
//             headings={headings}
//           />
//         );
//       }
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
//     <>
//       {submissionNotice}
//       {content}
//     </>
//   );
// }

// // Updated ExistingEntry component
// const ExistingEntry = ({
//   previousInputData,
//   setUserInputs,
//   setPreviousInputData,
//   setSubmitted,
//   prompts = [],
// }: {
//   previousInputData: PreviousInputData;
//   setUserInputs: React.Dispatch<React.SetStateAction<{}>>;
//   setPreviousInputData: React.Dispatch<React.SetStateAction<PreviousInputData>>;
//   setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
//   prompts: Prompt[];
// }) => {
//   const handleClick = () => {
//     setUserInputs(previousInputData.decryptedUserInput || {});
//     setPreviousInputData({});
//     setSubmitted(false);
//   };

//   return (
//     <div className="">
//       <div className="background-amber sticky top-0 z-20 flex items-center space-x-10 border-y border-gray-400 bg-white p-2">
//         {/* <div className="sticky top-0 z-20 flex items-center  space-x-10 rounded-lg p-2 backdrop-blur-xl"> */}
//         <span className="text-xl text-emerald-700">
//           {`Your responses, last updated: ${previousInputData.createdAt}`}
//         </span>
//         <button
//           onClick={handleClick}
//           className="w-36 rounded-md bg-emerald-700 px-4 py-1 text-white hover:bg-emerald-600"
//         >
//           Edit
//         </button>
//       </div>
//       <div>
//         {prompts.map((section) => (
//           <div
//             id={section.slug}
//             key={section._key}
//             className="mb-4 flex flex-col"
//           >
//             <h2 className="py-2 text-2xl font-thin">{section.sectionTitle}</h2>
//             <div className="w-full rounded-lg border-2 border-emerald-700 p-4">
//               <div className="text-gray-800">
//                 {section.promptGroups.map((group) => (
//                   <details key={group._key} className="group mb-4" open>
//                     <summary className="flex cursor-pointer justify-between">
//                       <h3 className="font-light">{group.heading}</h3>
//                       <div className="flex items-center">
//                         <ChevronDownIcon className="h-5 w-5 text-emerald-700 group-open:hidden" />
//                         <ChevronUpIcon className="hidden h-5 w-5 text-emerald-700 group-open:inline" />
//                       </div>
//                     </summary>
//                     <div className="mt-4 group-open:block">
//                       {group.prompts.map((prompt, index) => {
//                         const textareaKey = `${section._key}-${group._key}-${
//                           prompt._key || index
//                         }`;
//                         const response = previousInputData.decryptedUserInput
//                           ? previousInputData.decryptedUserInput[textareaKey]
//                           : "";

//                         return (
//                           <div key={prompt._key || index} className="mb-4">
//                             <PortableText
//                               value={prompt.content}
//                               components={portableTextComponents}
//                             />
//                             <p className="mt-2 whitespace-pre-wrap">
//                               {response || (
//                                 <div className="relative rounded-lg border border-gray-500 bg-white px-6 text-gray-600">
//                                   <div className="absolute -right-3 -top-3">
//                                     <span className="relative flex h-5 w-5">
//                                       <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
//                                       <span className="relative inline-flex h-5 w-5 rounded-full bg-sky-500"></span>
//                                     </span>{" "}
//                                   </div>
//                                   {/* <p className="underline decoration-sky-400 decoration-1 underline-offset-4"> */}
//                                   <p className="">
//                                     You haven&apos;t written anything here
//                                     yet...
//                                   </p>{" "}
//                                   <p className="text-sm">
//                                     Click Edit to complete this field.
//                                   </p>
//                                 </div>
//                               )}
//                             </p>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </details>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
