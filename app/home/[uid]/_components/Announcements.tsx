import Link from "next/link";
import { MegaphoneIcon } from "@heroicons/react/24/outline";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { adminInit } from "@/firebase/auth/adminConfig";
import { Suspense } from "react";
import AnnouncementsList from "./AnnouncementsList";

// Define types
type Announcement = {
  id: string;
  createdAt: string | null; // ISO string format for dates
  href: string;
  title: string;
  content: string;
};

type UserData = {
  assessments?: {
    burnoutAssessment?: {
      createdAt?: {
        seconds: number;
        nanoseconds: number;
      };
    };
  };
};

// Fetch announcements from Firestore
async function getAnnouncements(): Promise<Announcement[]> {
  try {
    // Initialize Admin SDK for server component
    adminInit();
    const db = getFirestore();

    const announcementsRef = collection(db, "announcements");
    const q = query(announcementsRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);
    const announcementsArray: Announcement[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Convert 'createdAt' to a JavaScript Date object
      let createdAt = null;
      if (data.createdAt && typeof data.createdAt.toDate === "function") {
        createdAt = data.createdAt.toDate();
      } else if (data.createdAt && typeof data.createdAt.seconds === "number") {
        createdAt = new Date(data.createdAt.seconds * 1000);
      }

      // Convert Date object to ISO string for serialization between server and client
      const announcement: Announcement = {
        id: doc.id,
        createdAt: createdAt ? createdAt.toISOString() : null,
        href: data.href || "#", // Fallback to "#" if href is not available
        title: data.title || "Announcement: ", // Fallback if title is missing
        content: data.content || "", // Fallback to empty string if content is missing
      };

      announcementsArray.push(announcement);
    });

    return announcementsArray;
  } catch (error) {
    console.error("Error fetching announcements: ", error);
    return [];
  }
}

// Check if user needs a burnout assessment reminder
function checkAssessmentReminder(
  user: UserData | null,
  announcements: Announcement[]
): Announcement[] {
  if (!user) return announcements;

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

  // Create a new array to avoid mutating the original
  let updatedAnnouncements = [...announcements];

  if (!hasTakenAssessmentRecently && !existingAnnouncement) {
    // Add the announcement
    const newAnnouncement: Announcement = {
      id: "burnout-assessment-reminder",
      createdAt: new Date().toISOString(), // Convert to ISO string
      href: "/chatbot/burnout-assessment",
      title: "It's time to take the Burnout Assessment again.",
      content: "Click here to go to our chatbot.",
    };
    updatedAnnouncements = [newAnnouncement, ...updatedAnnouncements];
  } else if (hasTakenAssessmentRecently && existingAnnouncement) {
    // Remove the announcement if the user has taken the assessment
    updatedAnnouncements = updatedAnnouncements.filter(
      (a) => a.id !== "burnout-assessment-reminder"
    );
  }

  return updatedAnnouncements;
}

export default async function Announcements({
  user,
}: {
  user: UserData | null;
}) {
  // Fetch announcements
  const announcements = await getAnnouncements();

  // Check if user needs a reminder
  const updatedAnnouncements = checkAssessmentReminder(user, announcements);

  return (
    <section aria-labelledby="news-feed-title">
      <div className="mb-4 flex items-center gap-x-2 text-lg font-extralight text-gray-900">
        <h3 className="">News feed</h3>
        <MegaphoneIcon className="h-5 w-5 text-emerald-600" />
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <Suspense fallback={<AnnouncementSkeleton />}>
            <AnnouncementsList initialAnnouncements={updatedAnnouncements} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

// Loading skeleton component
function AnnouncementSkeleton() {
  return (
    <div className="flow-root">
      <ul role="list" className="-my-5 divide-y divide-gray-200">
        {[1, 2, 3].map((item) => (
          <li key={`skeleton-${item}`} className="py-5">
            <div className="animate-pulse space-y-3">
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="h-3 w-full rounded bg-gray-200"></div>
              <div className="h-3 w-5/6 rounded bg-gray-200"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
