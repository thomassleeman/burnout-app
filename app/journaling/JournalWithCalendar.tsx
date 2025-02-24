"use client";
//react
import React, { useState, useEffect } from "react";
//jotai
import { useAtomValue } from "jotai";
import { userAtom } from "@/state/store";
//components
import JournalTextAreaForm from "./JournalTextAreaForm";
import JournalCalendar from "./JournalCalendar";
//types
import { journalOutlineFromSanity, JournalData } from "@/types/journal";

export default function JournalWithCalendar({
  journalOutlineFromSanity,
}: {
  journalOutlineFromSanity: journalOutlineFromSanity;
}) {
  const user = useAtomValue(userAtom);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [journalData, setJournalData] = useState<JournalData | null>(null);
  const [fetchUserDataLoading, setFetchUserDataLoading] = useState(true);

  useEffect(() => {
    async function loadUserData() {
      try {
        setFetchUserDataLoading(true);

        // Create the proper structure for JournalData
        if (user?.journaling) {
          setJournalData({
            journaling: user.journaling,
          });
        } else {
          // Initialize with empty journaling object if user doesn't have data
          setJournalData({
            journaling: {},
          });
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setFetchUserDataLoading(false);
      }
    }

    loadUserData();
  }, [user]);

  // Validate journalOutlineFromSanity
  const isJournalOutlineValid =
    journalOutlineFromSanity && journalOutlineFromSanity.slug;

  if (!isJournalOutlineValid) {
    return (
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-20">
        <div className="lg:col-span-5 xl:col-span-4">
          <p>Loading calendar...</p>
        </div>
        <div className="mt-4 lg:col-span-7 xl:col-span-8">
          <h3 className="text-xl font-extralight text-emerald-700">
            Journal template not available. Please check the configuration.
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-20">
        {/* <JournalCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          journalData={journalData}
        /> */}
        <JournalCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          journalData={journalData}
          journalSlug={journalOutlineFromSanity.slug}
        />
        {fetchUserDataLoading ? (
          <div className="mt-4 lg:col-span-7 xl:col-span-8">
            <h3 className="animate-pulse text-xl font-extralight text-emerald-700">
              Loading your journal data...
            </h3>
          </div>
        ) : (
          <JournalTextAreaForm
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            journalData={journalData}
            setJournalData={setJournalData}
            fetchUserDataLoading={fetchUserDataLoading}
            journalOutlineFromSanity={journalOutlineFromSanity}
          />
        )}
      </div>
    </div>
  );
}
