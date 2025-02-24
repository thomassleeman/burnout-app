"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { userAtom } from "@/state/store";

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  startOfDay,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isAfter,
  format,
  subMonths,
  addMonths,
  parse,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Day, PreviousEntry } from "@/types/journal";

function classNames(
  ...classes: (string | boolean | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export default function Calendar() {
  const user = useAtomValue(userAtom);

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [days, setDays] = useState<Day[]>([]);
  const [previousEntries, setPreviousEntries] = useState<PreviousEntry[]>([]);

  useEffect(() => {
    function generateCalendarDays(
      date: Date,
      previousEntries: PreviousEntry[]
    ) {
      const startMonth = startOfMonth(date);
      const endMonth = endOfMonth(date);

      const startDate = startOfWeek(startMonth, { weekStartsOn: 1 });
      const endDate = endOfWeek(endMonth, { weekStartsOn: 1 });

      const today = startOfDay(new Date());

      // Extract dates from previousEntries in "yyyy-MM-dd" format
      const journalDates = previousEntries.map((entry) => entry.date);

      const dates: Day[] = [];
      let current = startDate;

      while (current <= endDate) {
        const dateString = format(current, "yyyy-MM-dd");

        dates.push({
          date: current,
          dateString,
          dayNumber: format(current, "d"),
          isCurrentMonth: isSameMonth(current, date),
          isToday: isSameDay(current, today),
          isSelected: false,
          isFuture: isAfter(current, today),
          hasJournalEntry: journalDates.includes(dateString),
        });
        current = addDays(current, 1);
      }

      setDays(dates);
    }
    generateCalendarDays(currentDate, previousEntries);
  }, [currentDate, previousEntries]);

  function handlePrevMonth() {
    setCurrentDate(subMonths(currentDate, 1));
  }

  function handleNextMonth() {
    const nextMonth = addMonths(currentDate, 1);
    const today = new Date();

    if (isAfter(startOfMonth(nextMonth), startOfMonth(today))) {
      // Do not allow navigating to months after the current month
      return;
    }

    setCurrentDate(nextMonth);
  }

  const isAtCurrentMonth = isSameMonth(currentDate, new Date());

  useEffect(() => {
    async function fetchPreviousEntries() {
      try {
        if (user?.journaling) {
          // Get all journals and their entries
          const allEntries: PreviousEntry[] = [];

          // Iterate through each journal
          Object.values(user.journaling).forEach((journalEntries) => {
            // For each journal, process its entries
            Object.entries(journalEntries).forEach(([dateKey, entry]) => {
              if (typeof dateKey === "string") {
                try {
                  // Parse the date
                  const parsedDate = parse(dateKey, "dd-MMM-yyyy", new Date());

                  if (!isNaN(parsedDate.getTime())) {
                    const formattedDate = format(parsedDate, "yyyy-MM-dd");
                    allEntries.push({
                      date: formattedDate,
                      encryptedUserInput: entry.encryptedUserInput,
                      createdAt: entry.createdAt,
                    });
                  }
                } catch (error) {
                  console.error(`Error processing date: ${dateKey}`, error);
                }
              }
            });
          });

          setPreviousEntries(allEntries);
        } else {
          setPreviousEntries([]);
        }
      } catch (error) {
        console.error("Error processing journal entries:", error);
        setPreviousEntries([]);
      }
    }

    fetchPreviousEntries();
  }, [user]);

  // Loading Skeleton
  if (!user) {
    return (
      <div className="text-center">
        <div className="mb-4 flex items-center gap-x-2 text-left font-extralight">
          <p className="">Journaling record</p>
          <PencilIcon className="h-5 w-5 text-emerald-600" />
        </div>

        {/* Month Navigation Skeleton */}
        <div className="flex items-center justify-between text-gray-900">
          <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200"></div>
          <div className="mx-4 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
          <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200"></div>
        </div>

        {/* Days of the Week Skeleton */}
        <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
            <div
              key={`skeleton-day-${idx}`}
              className="mx-auto h-4 w-4 animate-pulse rounded-full bg-gray-200"
            ></div>
          ))}
        </div>

        {/* Calendar Grid Skeleton */}
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
          {Array(35)
            .fill(0)
            .map((_, idx) => (
              <div
                key={`skeleton-cell-${idx}`}
                className="h-10 animate-pulse bg-gray-100"
              ></div>
            ))}
        </div>

        {/* Button Skeleton */}
        <div className="mt-8 h-10 w-full animate-pulse rounded-md bg-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mb-4 flex items-center gap-x-2 text-left font-extralight">
        <p className="">Journaling record</p>
        <PencilIcon className="h-5 w-5 text-emerald-600" />
      </div>

      <div className="flex items-center text-gray-900">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex-auto text-sm font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </div>
        <button
          type="button"
          onClick={handleNextMonth}
          disabled={isAtCurrentMonth}
          className={classNames(
            "-m-1.5 flex flex-none items-center justify-center p-1.5",
            isAtCurrentMonth ? "hidden" : "text-gray-400 hover:text-gray-500"
          )}
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Days of the Week */}
      <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
          <div key={`day-${idx}`}>{day}</div>
        ))}
      </div>

      <div className="isolate grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {days.map((day, dayIdx) => (
          <div
            key={day.dateString}
            className={classNames(
              "py-1.5 focus:z-10",
              day.hasJournalEntry ? "bg-white" : "bg-gray-100",
              !day.isCurrentMonth && "bg-gray-300",
              (day.isSelected || day.isToday) && "font-semibold",
              day.isSelected && "text-white",
              !day.isSelected &&
                day.isCurrentMonth &&
                !day.isToday &&
                !day.isFuture &&
                "text-gray-900",
              !day.isSelected &&
                !day.isCurrentMonth &&
                !day.isToday &&
                "text-gray-400",
              day.isToday && !day.isSelected && "text-sky-600",
              dayIdx === 0 && "rounded-tl-lg",
              dayIdx === 6 && "rounded-tr-lg",
              dayIdx === days.length - 7 && "rounded-bl-lg",
              dayIdx === days.length - 1 && "rounded-br-lg",
              day.hasJournalEntry && "drop-shadow-xl"
            )}
          >
            <time
              dateTime={day.dateString}
              className={classNames(
                "relative mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                day.isSelected && "bg-emerald-600"
              )}
            >
              {day.dayNumber}
            </time>
          </div>
        ))}
      </div>
      <Link href="/journaling">
        <button
          type="button"
          className="mt-8 w-full rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-500"
        >
          Go to journals
        </button>
      </Link>
    </div>
  );
}

// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useAtomValue } from "jotai";
// import { userAtom } from "@/state/store";

// import {
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   startOfDay,
//   endOfWeek,
//   addDays,
//   isSameMonth,
//   isSameDay,
//   isAfter,
//   format,
//   subMonths,
//   addMonths,
//   parse,
// } from "date-fns";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
// import { PencilIcon } from "@heroicons/react/24/outline";
// import { Day, PreviousEntry } from "@/types/journal"; // Adjust the import path as needed

// function classNames(
//   ...classes: (string | boolean | null | undefined)[]
// ): string {
//   return classes.filter(Boolean).join(" ");
// }

// interface JournalCalendarProps {
//   selectedDate: Date;
//   setSelectedDate: (date: Date) => void;
// }

// export default function JournalCalendar() {
//   const user = useAtomValue(userAtom);

//   const [currentDate, setCurrentDate] = useState<Date>(new Date());
//   const [days, setDays] = useState<Day[]>([]);
//   const [previousEntries, setPreviousEntries] = useState<PreviousEntry[]>([]);

//   useEffect(() => {
//     function generateCalendarDays(
//       date: Date,
//       previousEntries: PreviousEntry[]
//     ) {
//       const startMonth = startOfMonth(date);
//       const endMonth = endOfMonth(date);

//       const startDate = startOfWeek(startMonth, { weekStartsOn: 1 });
//       const endDate = endOfWeek(endMonth, { weekStartsOn: 1 });

//       const today = startOfDay(new Date());

//       // Extract dates from previousEntries in "yyyy-MM-dd" format
//       const journalDates = previousEntries.map((entry) => entry.date);

//       const dates: Day[] = [];
//       let current = startDate;

//       while (current <= endDate) {
//         const dateString = format(current, "yyyy-MM-dd");

//         dates.push({
//           date: current,
//           dateString,
//           dayNumber: format(current, "d"),
//           isCurrentMonth: isSameMonth(current, date),
//           isToday: isSameDay(current, today),
//           isSelected: false,
//           isFuture: isAfter(current, today),
//           hasJournalEntry: journalDates.includes(dateString),
//         });
//         current = addDays(current, 1);
//       }

//       setDays(dates);
//     }
//     generateCalendarDays(currentDate, previousEntries);
//   }, [currentDate, previousEntries]);

//   function handlePrevMonth() {
//     setCurrentDate(subMonths(currentDate, 1));
//   }

//   function handleNextMonth() {
//     const nextMonth = addMonths(currentDate, 1);
//     const today = new Date();

//     if (isAfter(startOfMonth(nextMonth), startOfMonth(today))) {
//       // Do not allow navigating to months after the current month
//       return;
//     }

//     setCurrentDate(nextMonth);
//   }

//   // function handleDateClick(day: Day) {
//   //   if (day.isFuture) {
//   //     // Do not allow selecting future dates
//   //     return;
//   //   }
//   //   setSelectedDate(day.date); // Set selectedDate to a Date object
//   //   setDays((prevDays) =>
//   //     prevDays.map((d) => ({
//   //       ...d,
//   //       isSelected: isSameDay(d.date, day.date),
//   //     }))
//   //   );
//   // }

//   const isAtCurrentMonth = isSameMonth(currentDate, new Date());

//   useEffect(() => {
//     async function fetchPreviousEntries() {
//       try {
//         if (user && user.journaling) {
//           const journalData = user.journaling;

//           // Map of non-standard to standard month abbreviations
//           const monthAbbreviationMap: { [key: string]: string } = {
//             Jan: "Jan",
//             Feb: "Feb",
//             Mar: "Mar",
//             Apr: "Apr",
//             May: "May",
//             Jun: "Jun",
//             Jul: "Jul",
//             Aug: "Aug",
//             Sept: "Sep",
//             Sep: "Sep",
//             Oct: "Oct",
//             Nov: "Nov",
//             Dec: "Dec",
//           };

//           // Extract dates in "yyyy-MM-dd" format
//           const previousEntries: PreviousEntry[] = Object.entries(journalData)
//             .map(([dateKey, entry]) => {
//               const adjustedDateKey = dateKey.replace(
//                 /(\d{1,2})-(\w+)-(\d{4})/,
//                 (match, day, monthAbbr, year) => {
//                   const standardizedMonthAbbr =
//                     monthAbbreviationMap[monthAbbr] || monthAbbr;
//                   return `${day}-${standardizedMonthAbbr}-${year}`;
//                 }
//               );

//               const parsedDate = parse(
//                 adjustedDateKey,
//                 "dd-MMM-yyyy",
//                 new Date()
//               );

//               if (isNaN(parsedDate.getTime())) {
//                 console.error(
//                   `Invalid date after adjustment: ${adjustedDateKey}`
//                 );
//                 return null; // Skip invalid dates
//               }

//               const formattedDate = format(parsedDate, "yyyy-MM-dd");
//               return {
//                 date: formattedDate,
//                 encryptedUserInput: (entry as any).encryptedUserInput,
//                 createdAt: (entry as any).createdAt,
//               };
//             })
//             .filter((entry): entry is PreviousEntry => entry !== null); // Remove null entries

//           setPreviousEntries(previousEntries);
//         } else {
//           setPreviousEntries([]);
//         }
//       } catch (error) {
//         console.error("Error processing journal entries:", error);
//       }
//     }

//     fetchPreviousEntries();
//   }, [user]);

//   // Loading Skeleton
//   if (!user) {
//     return (
//       <div className="text-center">
//         <div className="mb-4 flex items-center gap-x-2 text-left font-extralight">
//           <p className="">Journaling record</p>
//           <PencilIcon className="h-5 w-5 text-emerald-600" />
//         </div>

//         {/* Month Navigation Skeleton */}
//         <div className="flex items-center justify-between text-gray-900">
//           <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200"></div>
//           <div className="mx-4 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
//           <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200"></div>
//         </div>

//         {/* Days of the Week Skeleton */}
//         <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
//           {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
//             <div
//               key={`skeleton-day-${idx}`}
//               className="mx-auto h-4 w-4 animate-pulse rounded-full bg-gray-200"
//             ></div>
//           ))}
//         </div>

//         {/* Calendar Grid Skeleton */}
//         <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
//           {Array(35)
//             .fill(0)
//             .map((_, idx) => (
//               <div
//                 key={`skeleton-cell-${idx}`}
//                 className="h-10 animate-pulse bg-gray-100"
//               ></div>
//             ))}
//         </div>

//         {/* Button Skeleton */}
//         <div className="mt-8 h-10 w-full animate-pulse rounded-md bg-gray-200"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="text-center">
//       <div className="mb-4 flex items-center gap-x-2 text-left font-extralight">
//         <p className="">Journaling record</p>
//         <PencilIcon className="h-5 w-5 text-emerald-600" />
//       </div>

//       <div className="flex items-center text-gray-900">
//         <button
//           type="button"
//           onClick={handlePrevMonth}
//           className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
//         >
//           <span className="sr-only">Previous month</span>
//           <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//         </button>
//         <div className="flex-auto text-sm font-semibold">
//           {format(currentDate, "MMMM yyyy")}
//         </div>
//         <button
//           type="button"
//           onClick={handleNextMonth}
//           disabled={isAtCurrentMonth}
//           className={classNames(
//             "-m-1.5 flex flex-none items-center justify-center p-1.5",
//             isAtCurrentMonth ? "hidden" : "text-gray-400 hover:text-gray-500"
//           )}
//         >
//           <span className="sr-only">Next month</span>
//           <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//         </button>
//       </div>

//       {/* Days of the Week */}
//       <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
//         {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
//           <div key={`day-${idx}`}>{day}</div>
//         ))}
//       </div>

//       <div className="isolate grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
//         {days.map((day, dayIdx) => (
//           <div
//             key={day.dateString}
//             className={classNames(
//               "py-1.5 focus:z-10",
//               day.hasJournalEntry ? "bg-white" : "bg-gray-100",
//               !day.isCurrentMonth && "bg-gray-300",
//               (day.isSelected || day.isToday) && "font-semibold",
//               day.isSelected && "text-white",
//               !day.isSelected &&
//                 day.isCurrentMonth &&
//                 !day.isToday &&
//                 !day.isFuture &&
//                 "text-gray-900",
//               !day.isSelected &&
//                 !day.isCurrentMonth &&
//                 !day.isToday &&
//                 "text-gray-400",
//               day.isToday && !day.isSelected && "text-sky-600",
//               dayIdx === 0 && "rounded-tl-lg",
//               dayIdx === 6 && "rounded-tr-lg",
//               dayIdx === days.length - 7 && "rounded-bl-lg",
//               dayIdx === days.length - 1 && "rounded-br-lg",
//               day.hasJournalEntry && "drop-shadow-xl"
//             )}
//           >
//             <time
//               dateTime={day.dateString}
//               className={classNames(
//                 "relative mx-auto flex h-7 w-7 items-center justify-center rounded-full",
//                 day.isSelected && "bg-emerald-600"
//               )}
//             >
//               {day.dayNumber}
//             </time>
//           </div>
//         ))}
//       </div>
//       <Link href="/my-journal">
//         <button
//           type="button"
//           className="mt-8 w-full rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-500"
//         >
//           Go to journal
//         </button>
//       </Link>
//     </div>
//   );
// }
