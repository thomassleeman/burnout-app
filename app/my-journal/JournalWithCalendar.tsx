"use client";
import { useState } from "react";
import JournalTextAreaForm from "./JournalTextAreaForm";
import JournalCalendar from "./JournalCalendar";

export default function CalendarWithMeetings() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-20">
        <JournalCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <JournalTextAreaForm
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
}
