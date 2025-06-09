"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

type Announcement = {
  id: string;
  createdAt: string | null; // ISO string format
  href: string;
  title: string;
  content: string;
};

export default function AnnouncementsList({
  initialAnnouncements,
}: {
  initialAnnouncements: Announcement[];
}) {
  const [showAll, setShowAll] = useState(false);

  // Determine the announcements to display based on showAll state
  const displayedAnnouncements = showAll
    ? initialAnnouncements
    : initialAnnouncements.slice(0, 3);

  const hasMoreThanThree = initialAnnouncements.length > 3;

  if (initialAnnouncements.length === 0) {
    return (
      <div className="flow-root">
        <p className="text-sm text-gray-400">No announcements at the moment</p>
      </div>
    );
  }

  return (
    <div className="flow-root">
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
                    <span aria-hidden="true" className="absolute inset-0" />
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
              {/* Display the date and time with a consistent format that matches server rendering */}
              {announcement.createdAt && (
                <p className="mt-1 px-2 text-xs text-gray-500">
                  <span suppressHydrationWarning>
                    {new Date(announcement.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}{" "}
                    at{" "}
                    {new Date(announcement.createdAt).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                      }
                    )}
                  </span>
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Conditionally render the View All button */}
      {hasMoreThanThree && (
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
  );
}
