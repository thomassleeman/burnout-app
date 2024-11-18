"use client";
import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { app } from "@firebase/auth/appConfig";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import JournalTextAreaForm from "./JournalTextAreaForm";
import JournalCalendar from "./JournalCalendar";
import { set } from "sanity";

export default function CalendarWithMeetings() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userID, setUserID] = useState<string | null>(null);
  const [journalData, setJournalData] = useState<{ [key: string]: any } | null>(
    null
  );
  const [fetchUserDataLoading, setFetchUserDataLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserData() {
      setFetchUserDataLoading(true);

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
        setUserID(result.userID);

        const userDoc = doc(db, "users", result.userID);
        const docSnap = await getDoc(userDoc);

        if (!docSnap.exists()) {
          router.push("/signin");
          return;
        }

        const data = docSnap.data();
        if (!data) {
          router.push("/signin");
          return;
        }

        setJournalData(data.journal || {});
        setFetchUserDataLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setFetchUserDataLoading(false);
      }
    }

    fetchUserData();
  }, [router]);

  return (
    <div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-20">
        <JournalCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          journalData={journalData}
        />
        <JournalTextAreaForm
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          journalData={journalData}
          setJournalData={setJournalData}
          fetchUserDataLoading={fetchUserDataLoading}
        />
      </div>
    </div>
  );
}
