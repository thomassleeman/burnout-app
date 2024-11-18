"use client";
import React from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/state/store";
import DynamicGreeting from "./DynamicGreeting";
import { differenceInDays, parse } from "date-fns";
import StressLevelComponent from "./StressLevelComponent";

export default function WelcomePanel() {
  const user = useAtomValue(userAtom);
  console.log("user welcome panel: ", user);

  // Show loading skeleton while user data is not yet available
  if (!user) {
    return (
      <section aria-labelledby="profile-overview-title">
        <div className="overflow-hidden rounded-lg bg-transparent sm:bg-white sm:shadow">
          <h2 id="profile-overview-title" className="sr-only">
            Profile Overview
          </h2>
          <div className="bg-transparent sm:bg-white sm:p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="flex flex-col gap-y-4">
                {/* Skeleton for Dynamic Greeting */}
                <div className="h-3 w-32 animate-pulse rounded-md bg-gray-200"></div>
                <div className="h-6 w-64 animate-pulse rounded-md bg-gray-200"></div>
                <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200 sm:hidden"></div>
              </div>
            </div>
          </div>
          {/* Skeleton for stats (visible on larger screens) */}
          <div className="hidden grid-cols-1 divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="my-1 px-3 py-1 text-sm font-medium sm:py-3 sm:text-center"
              >
                <div className="mx-auto h-4 w-24 animate-pulse rounded-md bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const userDetails = user.providerData[0];
  const firstName = userDetails.displayName.split(" ")[0];
  const currentDate = new Date();

  // Calculate "Member Since"
  const accountCreationDate = new Date(user.createdAt.seconds * 1000);
  const memberSinceDays = differenceInDays(currentDate, accountCreationDate);

  // Calculate "Last Journal Entry"
  const journalEntries = Object.keys(user.journal || {});
  let lastJournalEntry = "No journal entries";

  if (journalEntries.length > 0) {
    // Convert journal entry dates to Date objects
    const journalDates = journalEntries.map((entry) =>
      parse(entry, "dd-MMM-yyyy", new Date())
    );

    // Find the most recent journal entry date
    const lastJournalTimestamp = Math.max(
      ...journalDates.map((date) => date.getTime())
    );
    const lastJournalDate = new Date(lastJournalTimestamp);

    const daysSinceLastJournal = differenceInDays(currentDate, lastJournalDate);

    // Check if there is a journal entry for today
    const isJournalToday = daysSinceLastJournal === 0;

    lastJournalEntry = isJournalToday
      ? "today"
      : `${daysSinceLastJournal} days ago`;
  }

  // Calculate "Last Check-in"
  const burnoutAssessment = user.assessments?.burnoutAssessment;
  let lastCheckin = "No check-ins";

  if (
    burnoutAssessment &&
    burnoutAssessment.createdAt &&
    typeof burnoutAssessment.createdAt === "object" &&
    "seconds" in burnoutAssessment.createdAt &&
    "nanoseconds" in burnoutAssessment.createdAt
  ) {
    const lastAssessmentDate = new Date(
      burnoutAssessment.createdAt.seconds * 1000 +
        burnoutAssessment.createdAt.nanoseconds / 1e6
    );
    const daysSinceLastCheckin = differenceInDays(
      currentDate,
      lastAssessmentDate
    );

    lastCheckin =
      daysSinceLastCheckin === 0 ? "today" : `${daysSinceLastCheckin} days ago`;
  }

  // Update the stats object
  const stats = [
    { label: "Member for", value: `${memberSinceDays} days` },
    { label: "Last journal entry", value: lastJournalEntry },
    { label: "Last assessment", value: lastCheckin },
  ];

  return (
    <section aria-labelledby="profile-overview-title">
      <div className="overflow-hidden rounded-lg bg-transparent sm:bg-white sm:shadow">
        <h2 id="profile-overview-title" className="sr-only">
          Profile Overview
        </h2>
        <div className="bg-transparent sm:bg-white sm:p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <DynamicGreeting userName={firstName} />
            </div>
            <div className="mt-3 justify-center sm:mt-0">
              <StressLevelComponent userId={user.uid} />
            </div>
          </div>
        </div>
        <div className="hidden grid-cols-1 divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="px-3 py-1 text-sm font-medium sm:py-3 sm:text-center"
            >
              <span className="mr-2 text-xs text-gray-600">{stat.label}</span>
              <span className="text-sm text-gray-900">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
