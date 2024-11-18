"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/firebase/auth/appConfig";
import { useAtomValue } from "jotai";
import { userAtom } from "@/state/store";
import { MegaphoneIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

type Announcement = {
  id: string;
  createdAt: Date | null;
  href: string;
  title: string;
  content: string;
};

export default function Announcements() {
  const user = useAtomValue(userAtom);
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const q = query(
          collection(db, "announcements"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const announcementsArray: Announcement[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // Convert 'createdAt' to a JavaScript Date object
          let createdAt = null;
          if (data.createdAt && typeof data.createdAt.toDate === "function") {
            createdAt = data.createdAt.toDate();
          } else if (
            data.createdAt &&
            typeof data.createdAt.seconds === "number"
          ) {
            createdAt = new Date(data.createdAt.seconds * 1000);
          }

          const announcement: Announcement = {
            id: doc.id,
            createdAt,
            href: data.href || "#", // Fallback to "#" if href is not available
            title: data.title || "Announcement: ", // Fallback if title is missing
            content: data.content || "", // Fallback to empty string if content is missing
          };

          announcementsArray.push(announcement);
        });
        setAnnouncements(announcementsArray);
      } catch (error) {
        console.log("Error fetching announcements: ", error);
      } finally {
        setLoading(false);
      }
    };

    getAnnouncements();
  }, []);

  // New useEffect to check the time since the last assessment
  useEffect(() => {
    if (!user || loading) return;

    const burnoutAssessment = user?.assessments?.burnoutAssessment;
    const lastAssessmentTimestamp = burnoutAssessment?.createdAt;

    let lastAssessmentDate: Date | null = null;

    // Check the shape of `lastAssessmentTimestamp`
    if (
      lastAssessmentTimestamp &&
      typeof lastAssessmentTimestamp === "object" &&
      "seconds" in lastAssessmentTimestamp
    ) {
      lastAssessmentDate = new Date(lastAssessmentTimestamp.seconds * 1000);
    }

    const now = new Date();
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    const hasTakenAssessmentRecently =
      lastAssessmentDate && lastAssessmentDate > twoWeeksAgo;

    const existingAnnouncement = announcements.find(
      (announcement) => announcement.id === "burnout-assessment-reminder"
    );

    if (!hasTakenAssessmentRecently && !existingAnnouncement) {
      // Add the announcement
      const newAnnouncement: Announcement = {
        id: "burnout-assessment-reminder",
        createdAt: new Date(),
        href: "/chatbot/burnout-assessment",
        title: "It's time to take the Burnout Assessment again.",
        content: "Click here to go to our chatbot.",
      };
      setAnnouncements((prev) => [newAnnouncement, ...prev]);
    } else if (hasTakenAssessmentRecently && existingAnnouncement) {
      // Remove the announcement if the user has taken the assessment
      setAnnouncements((prev) =>
        prev.filter((a) => a.id !== "burnout-assessment-reminder")
      );
    }
  }, [user, loading, announcements]);

  // Determine the announcements to display based on showAll state
  const displayedAnnouncements = showAll
    ? announcements
    : announcements.slice(0, 3);

  const hasMoreThanThree = announcements.length > 3;

  return (
    <section aria-labelledby="news-feed-title">
      <div className="mb-4 flex items-center gap-x-2 text-lg font-extralight text-gray-900">
        <h3 className="">News feed</h3>
        <MegaphoneIcon className="h-5 w-5 text-emerald-600" />
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <div className="flow-root">
            {loading ? (
              // Loading skeleton
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {[1, 2, 3].map((_, index) => (
                  <li key={index} className="py-5">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                      <div className="h-3 w-full rounded bg-gray-200"></div>
                      <div className="h-3 w-5/6 rounded bg-gray-200"></div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : announcements.length > 0 ? (
              <ul role="list" className="-my-5 divide-y divide-gray-200">
                {displayedAnnouncements.map((announcement) => (
                  <li key={announcement.id} className="py-5">
                    <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                      <div className="flex items-center justify-between rounded-lg bg-slate-100 px-2 py-1">
                        <h3 className="text-sm font-semibold text-gray-800">
                          <Link
                            href={announcement.href}
                            className="hover:underline focus:outline-none"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {announcement.title}
                          </Link>
                        </h3>
                        <ArrowTopRightOnSquareIcon className="ml-3 h-4 w-4 text-gray-600" />
                      </div>
                      {/* Display the preview if available */}
                      {announcement.content && (
                        <p className="mt-1 line-clamp-2 px-2 text-sm text-gray-600">
                          {announcement.content}
                        </p>
                      )}
                      {/* Display the date and time */}
                      {announcement.createdAt && (
                        <p className="mt-1 px-2 text-xs text-gray-500">
                          {announcement.createdAt.toLocaleString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">
                No announcements at the moment
              </p>
            )}
          </div>
          {/* Conditionally render the View All button */}
          {hasMoreThanThree && !loading && (
            <div className="mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                {showAll ? "Hide" : "View all"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { collection, query, orderBy, getDocs } from "firebase/firestore";
// import { db } from "@/firebase/auth/appConfig";
// import { useAtomValue } from "jotai";
// import { userAtom } from "@/state/store";
// import { MegaphoneIcon } from "@heroicons/react/24/outline";
// import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

// type Announcement = {
//   id: string;
//   createdAt: Date | null;
//   href: string;
//   title: string;
//   content: string;
// };

// export default function Announcements() {
//   const user = useAtomValue(userAtom);
//   const [loading, setLoading] = useState(true);
//   const [announcements, setAnnouncements] = useState<Announcement[]>([]);

//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     const getAnnouncements = async () => {
//       try {
//         const q = query(
//           collection(db, "announcements"),
//           orderBy("createdAt", "desc")
//         );
//         const querySnapshot = await getDocs(q);
//         const announcementsArray: Announcement[] = [];
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();

//           // Convert 'createdAt' to a JavaScript Date object
//           let createdAt = null;
//           if (data.createdAt) {
//             if (data.createdAt.toDate) {
//               // Firestore Timestamp object
//               createdAt = data.createdAt.toDate();
//             } else if (data.createdAt.seconds) {
//               // Object with seconds and nanoseconds
//               createdAt = new Date(data.createdAt.seconds * 1000);
//             }
//           }

//           const announcement: Announcement = {
//             id: doc.id,
//             createdAt,
//             href: data.href || "#", // Fallback to "#" if href is not available
//             title: data.title || "Announcement: ", // Fallback if title is missing
//             content: data.content || "", // Fallback to empty string if content is missing
//           };

//           announcementsArray.push(announcement);
//         });
//         setAnnouncements(announcementsArray);
//       } catch (error) {
//         console.log("Error fetching announcements: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getAnnouncements();
//   }, []);

//   // New useEffect to check the time since the last assessment
//   useEffect(() => {
//     if (!user || loading) return;

//     const burnoutAssessment = user?.assessments?.burnoutAssessment;
//     const lastAssessmentTimestamp = burnoutAssessment?.createdAt;

//     let lastAssessmentDate = null;
//     if (lastAssessmentTimestamp) {
//       if (lastAssessmentTimestamp.toDate) {
//         lastAssessmentDate = lastAssessmentTimestamp.toDate();
//       } else if (lastAssessmentTimestamp.seconds) {
//         lastAssessmentDate = new Date(lastAssessmentTimestamp.seconds * 1000);
//       }
//     }

//     const now = new Date();
//     const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

//     const hasTakenAssessmentRecently =
//       lastAssessmentDate && lastAssessmentDate > twoWeeksAgo;

//     const existingAnnouncement = announcements.find(
//       (announcement) => announcement.id === "burnout-assessment-reminder"
//     );

//     if (!hasTakenAssessmentRecently && !existingAnnouncement) {
//       // Add the announcement
//       const newAnnouncement: Announcement = {
//         id: "burnout-assessment-reminder",
//         createdAt: new Date(),
//         href: "/chatbot/burnout-assessment",
//         title: "It's time to take the Burnout Assessment again.",
//         content: "Click here to go to our chatbot.",
//       };
//       setAnnouncements((prev) => [newAnnouncement, ...prev]);
//     } else if (hasTakenAssessmentRecently && existingAnnouncement) {
//       // Remove the announcement if the user has taken the assessment
//       setAnnouncements((prev) =>
//         prev.filter((a) => a.id !== "burnout-assessment-reminder")
//       );
//     }
//   }, [user, loading, announcements]);

//   // Determine the announcements to display based on showAll state
//   const displayedAnnouncements = showAll
//     ? announcements
//     : announcements.slice(0, 3);

//   const hasMoreThanThree = announcements.length > 3;

//   return (
//     <section aria-labelledby="news-feed-title">
//       <div className="mb-4 flex items-center gap-x-2 text-lg font-extralight text-gray-900">
//         <h3 className="">News feed</h3>
//         <MegaphoneIcon className="h-5 w-5 text-emerald-600" />
//       </div>
//       <div className="overflow-hidden rounded-lg bg-white shadow">
//         <div className="p-6">
//           <div className="flow-root">
//             {loading ? (
//               // Loading skeleton
//               <ul role="list" className="-my-5 divide-y divide-gray-200">
//                 {[1, 2, 3].map((_, index) => (
//                   <li key={index} className="py-5">
//                     <div className="animate-pulse space-y-3">
//                       <div className="h-4 w-3/4 rounded bg-gray-200"></div>
//                       <div className="h-3 w-full rounded bg-gray-200"></div>
//                       <div className="h-3 w-5/6 rounded bg-gray-200"></div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             ) : announcements.length > 0 ? (
//               <ul role="list" className="-my-5 divide-y divide-gray-200">
//                 {displayedAnnouncements.map((announcement) => (
//                   <li key={announcement.id} className="py-5">
//                     <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
//                       <div className="flex items-center justify-between rounded-lg bg-slate-100 px-2 py-1">
//                         <h3 className="text-sm font-semibold text-gray-800">
//                           <Link
//                             href={announcement.href}
//                             className="hover:underline focus:outline-none"
//                           >
//                             <span
//                               aria-hidden="true"
//                               className="absolute inset-0"
//                             />
//                             {announcement.title}
//                           </Link>
//                         </h3>
//                         <ArrowTopRightOnSquareIcon className="ml-3 h-4 w-4 text-gray-600" />
//                       </div>
//                       {/* Display the preview if available */}
//                       {announcement.content && (
//                         <p className="mt-1 line-clamp-2 px-2 text-sm text-gray-600">
//                           {announcement.content}
//                         </p>
//                       )}
//                       {/* Display the date and time */}
//                       {announcement.createdAt && (
//                         <p className="mt-1 px-2 text-xs text-gray-500">
//                           {announcement.createdAt.toLocaleString(undefined, {
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                             hour: "numeric",
//                             minute: "2-digit",
//                           })}
//                         </p>
//                       )}
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-sm text-gray-400">
//                 No announcements at the moment
//               </p>
//             )}
//           </div>
//           {/* Conditionally render the View All button */}
//           {hasMoreThanThree && !loading && (
//             <div className="mt-6">
//               <button
//                 onClick={() => setShowAll(!showAll)}
//                 className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//               >
//                 {showAll ? "Hide" : "View all"}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
