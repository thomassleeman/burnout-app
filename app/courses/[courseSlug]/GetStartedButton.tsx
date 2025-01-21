"use client";

import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
// Firebase imports
import { app } from "@firebase/auth/appConfig";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
// Headless UI imports
import { Dialog, Transition } from "@headlessui/react";
// Types
import { CourseResource } from "@/types/sanity";
import { getResourcePathType } from "../functions";

interface GetStartedButtonProps {
  courseSlug: string;
  resources: CourseResource[];
}

export default function GetStartedButton({
  courseSlug,
  resources,
}: GetStartedButtonProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasProgress, setHasProgress] = useState(false);
  const [firstUncompletedResource, setFirstUncompletedResource] =
    useState<CourseResource | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch the user ID from your API
        const response = await fetch("/api/accessUserId", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const userID = result.userID;
        setUserID(userID);

        const db = getFirestore(app);
        const userRef = doc(db, "users", userID);

        // Fetch the existing user data
        const userDoc = await getDoc(userRef);
        // Use a safe default so courses is never undefined
        const existingCourses = userDoc.exists()
          ? userDoc.data().courses ?? {}
          : {};

        // Use optional chaining to avoid reading a property
        // of an undefined object
        const existingResourcesCompleted =
          existingCourses[courseSlug]?.resourcesCompleted ?? {};

        // Determine if user has progress
        const completedResources = Object.values(
          existingResourcesCompleted
        ).filter((completed) => completed);

        if (completedResources.length > 0) {
          setHasProgress(true);
        }

        // Merge new resources with existing ones without overwriting completed statuses
        const resourcesCompleted = { ...existingResourcesCompleted };
        resources.forEach((resource) => {
          if (!(resource.slug in resourcesCompleted)) {
            resourcesCompleted[resource.slug] = false;
          }
        });

        // Update the user's courses data in the database
        const courseData = {
          [courseSlug]: {
            resourcesCompleted: resourcesCompleted,
          },
        };

        await setDoc(
          userRef,
          {
            courses: courseData,
          },
          { merge: true }
        );

        // Determine the first uncompleted resource
        let firstUncompleted = null;
        for (let resource of resources) {
          if (!resourcesCompleted[resource.slug]) {
            firstUncompleted = resource;
            break;
          }
        }

        // If all resources are completed, set to last resource
        if (!firstUncompleted) {
          firstUncompleted = resources[resources.length - 1];
        }

        setFirstUncompletedResource(firstUncompleted);
      } catch (error) {
        console.error("Error:", (error as Error).message);
      }
    };

    fetchUserData();
  }, [courseSlug, resources]);

  useEffect(() => {
    if (hasProgress) {
      setShowModal(true);
    }
  }, [hasProgress]);

  const handleClick = async () => {
    setIsUpdating(true);

    try {
      if (!userID || !firstUncompletedResource) {
        alert("Failed to retrieve user data. Please try again.");
        return;
      }

      // Redirect to the first uncompleted resource
      const pathType = getResourcePathType(firstUncompletedResource.type);
      router.push(
        `/courses/${courseSlug}/${pathType}/${firstUncompletedResource.slug}`
      );
    } catch (error) {
      console.error("Error:", (error as Error).message);
      alert("Failed to proceed. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      {hasProgress ? (
        <>
          {/* Modal using Headless UI Dialog */}
          <Transition appear show={showModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setShowModal(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <div className="flex justify-end">
                        <button
                          onClick={() => setShowModal(false)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          ✕
                        </button>
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Continue where you left off
                      </Dialog.Title>
                      <div className="mt-4">
                        <button
                          onClick={handleClick}
                          disabled={isUpdating}
                          className="w-full rounded-md bg-emerald-800 px-4 py-2 text-xl text-white hover:bg-emerald-700"
                        >
                          {isUpdating ? "Continuing..." : "Continue"}
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          {/* When modal is closed, show the button */}
          {!showModal && (
            <button
              onClick={handleClick}
              disabled={isUpdating}
              className="mt-32 w-full rounded-md bg-emerald-800 px-4 py-2 text-xl text-white hover:bg-emerald-700"
            >
              {isUpdating ? "Continuing..." : "Continue where you left off"}
            </button>
          )}
        </>
      ) : (
        /* When hasProgress is false */
        <button
          onClick={handleClick}
          disabled={isUpdating}
          className="mt-32 w-full rounded-md bg-emerald-800 px-4 py-2 text-xl text-white hover:bg-emerald-700"
        >
          {isUpdating ? "Starting..." : "Get Started"}
        </button>
      )}
    </>
  );
}

// "use client";

// import { useState, useEffect, Fragment } from "react";
// import { useRouter } from "next/navigation";
// // Firebase imports
// import { app } from "@firebase/auth/appConfig";
// import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
// //jotai
// import { useAtomValue } from "jotai";
// import { userAtom } from "@/state/store";
// // Headless UI imports
// import { Dialog, Transition } from "@headlessui/react";
// // Types
// import { CourseResource } from "@/types/sanity";
// import { getResourcePathType } from "../functions";

// interface GetStartedButtonProps {
//   courseSlug: string;
//   resources: CourseResource[];
// }

// export default function GetStartedButton({
//   courseSlug,
//   resources,
// }: GetStartedButtonProps) {
//   const user = useAtomValue(userAtom);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [hasProgress, setHasProgress] = useState(false);
//   const [firstUncompletedResource, setFirstUncompletedResource] =
//     useState<CourseResource | null>(null);
//   const [userID, setUserID] = useState<string | null>(null);
//   console.log("userID", userID);
//   console.log("firstUncompletedResource", firstUncompletedResource);
//   const [showModal, setShowModal] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Fetch the user ID from your API
//         const response = await fetch("/api/accessUserId", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         const userID = result.userID;
//         setUserID(userID);

//         const db = getFirestore(app);
//         const userRef = doc(db, "users", userID);

//         // Fetch the existing user data
//         const userDoc = await getDoc(userRef);
//         const existingCourses = userDoc.exists() ? userDoc.data().courses : {};

//         // Get existing resourcesCompleted for the course or initialize it
//         const existingResourcesCompleted =
//           existingCourses[courseSlug]?.resourcesCompleted || {};

//         // Determine if user has progress
//         const completedResources = Object.values(
//           existingResourcesCompleted
//         ).filter((completed) => completed);

//         if (completedResources.length > 0) {
//           setHasProgress(true);
//         }

//         // Merge new resources with existing ones without overwriting completed statuses
//         const resourcesCompleted = { ...existingResourcesCompleted };
//         resources.forEach((resource) => {
//           if (!(resource.slug in resourcesCompleted)) {
//             resourcesCompleted[resource.slug] = false;
//           }
//         });

//         // Update the user's courses data in the database
//         const courseData = {
//           [courseSlug]: {
//             resourcesCompleted: resourcesCompleted,
//           },
//         };

//         await setDoc(
//           userRef,
//           {
//             courses: courseData,
//           },
//           { merge: true }
//         );

//         // Determine the first uncompleted resource
//         let firstUncompleted = null;
//         for (let resource of resources) {
//           if (!resourcesCompleted[resource.slug]) {
//             firstUncompleted = resource;
//             break;
//           }
//         }

//         // If all resources are completed, redirect to the last resource
//         if (!firstUncompleted) {
//           firstUncompleted = resources[resources.length - 1];
//         }

//         setFirstUncompletedResource(firstUncompleted);
//       } catch (error) {
//         console.error("Error:", (error as Error).message);
//       }
//     };

//     fetchUserData();
//   }, [courseSlug, resources]);

//   useEffect(() => {
//     if (hasProgress) {
//       setShowModal(true);
//     }
//   }, [hasProgress]);

//   const handleClick = async () => {
//     setIsUpdating(true);

//     try {
//       if (!userID || !firstUncompletedResource) {
//         alert("Failed to retrieve user data. Please try again.");
//         return;
//       }

//       // Redirect to the first uncompleted resource
//       const pathType = getResourcePathType(firstUncompletedResource.type);
//       router.push(
//         `/courses/${courseSlug}/${pathType}/${firstUncompletedResource.slug}`
//       );
//     } catch (error) {
//       console.error("Error:", (error as Error).message);
//       alert("Failed to proceed. Please try again.");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <>
//       {hasProgress ? (
//         <>
//           {/* Modal using Headless UI Dialog */}
//           <Transition appear show={showModal} as={Fragment}>
//             <Dialog
//               as="div"
//               className="relative z-10"
//               onClose={() => setShowModal(false)}
//             >
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0"
//                 enterTo="opacity-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100"
//                 leaveTo="opacity-0"
//               >
//                 <div className="fixed inset-0 bg-black bg-opacity-25" />
//               </Transition.Child>

//               <div className="fixed inset-0 overflow-y-auto">
//                 <div className="flex min-h-full items-center justify-center p-4 text-center">
//                   <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0 scale-95"
//                     enterTo="opacity-100 scale-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100 scale-100"
//                     leaveTo="opacity-0 scale-95"
//                   >
//                     <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
//                       <div className="flex justify-end">
//                         <button
//                           onClick={() => setShowModal(false)}
//                           className="text-gray-600 hover:text-gray-800"
//                         >
//                           ✕
//                         </button>
//                       </div>
//                       <Dialog.Title
//                         as="h3"
//                         className="text-lg font-medium leading-6 text-gray-900"
//                       >
//                         Continue where you left off
//                       </Dialog.Title>
//                       <div className="mt-4">
//                         <button
//                           onClick={handleClick}
//                           disabled={isUpdating}
//                           className="w-full rounded-md bg-emerald-800 px-4 py-2 text-xl text-white hover:bg-emerald-700"
//                         >
//                           {isUpdating ? "Continuing..." : "Continue"}
//                         </button>
//                       </div>
//                     </Dialog.Panel>
//                   </Transition.Child>
//                 </div>
//               </div>
//             </Dialog>
//           </Transition>

//           {/* When modal is closed, show the button */}
//           {!showModal && (
//             <button
//               onClick={handleClick}
//               disabled={isUpdating}
//               className="mt-32 w-full rounded-md bg-emerald-800 px-4 py-2 text-xl text-white hover:bg-emerald-700"
//             >
//               {isUpdating ? "Continuing..." : "Continue where you left off"}
//             </button>
//           )}
//         </>
//       ) : (
//         /* When hasProgress is false */
//         <button
//           onClick={handleClick}
//           disabled={isUpdating}
//           className="mt-32 w-full rounded-md bg-emerald-800 px-4 py-2 text-xl text-white hover:bg-emerald-700"
//         >
//           {isUpdating ? "Starting..." : "Get Started"}
//         </button>
//       )}
//     </>
//   );
// }
