"use client";
import React, { useState, useEffect } from "react";

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
import { Day, PreviousEntry, JournalCalendarProps } from "@/types/journal";

function classNames(
  ...classes: (string | boolean | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export default function JournalCalendar({
  selectedDate,
  setSelectedDate,
  journalData,
}: JournalCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [days, setDays] = useState<Day[]>([
    {
      dateString: "0",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "1",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "2",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "3",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "4",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "5",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "6",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "7",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "8",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "9",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "10",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "11",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "12",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "13",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "14",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "15",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "16",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "17",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "18",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "19",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "20",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "21",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "22",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "23",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "24",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "25",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "26",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "27",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "28",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "29",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "30",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "31",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "32",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "33",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "34",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "35",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "36",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "37",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "38",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "39",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "40",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
    {
      dateString: "41",
      date: new Date(),
      dayNumber: "",
      isCurrentMonth: true,
      isToday: false,
      isSelected: false,
      isFuture: false,
      hasJournalEntry: false,
    },
  ]);
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
          isSelected: isSameDay(current, selectedDate),
          isFuture: isAfter(current, today),
          hasJournalEntry: journalDates.includes(dateString),
        });
        current = addDays(current, 1);
      }

      setDays(dates);
    }
    generateCalendarDays(currentDate, previousEntries);
  }, [currentDate, previousEntries, selectedDate]);

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

  function handleDateClick(day: Day) {
    if (day.isFuture) {
      // Do not allow selecting future dates
      return;
    }
    setSelectedDate(day.date); // Set selectedDate to a Date object
    setDays((prevDays) =>
      prevDays.map((d) => ({
        ...d,
        isSelected: isSameDay(d.date, day.date),
      }))
    );
  }

  function handleToday() {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  }

  const isAtCurrentMonth = isSameMonth(currentDate, new Date());

  useEffect(() => {
    async function fetchPreviousEntries() {
      try {
        // Map of non-standard to standard month abbreviations
        const monthAbbreviationMap: { [key: string]: string } = {
          Jan: "Jan",
          Feb: "Feb",
          Mar: "Mar",
          Apr: "Apr",
          May: "May",
          Jun: "Jun",
          Jul: "Jul",
          Aug: "Aug",
          Sept: "Sep",
          Sep: "Sep",
          Oct: "Oct",
          Nov: "Nov",
          Dec: "Dec",
        };

        // Extract dates in "yyyy-MM-dd" format
        const previousEntries: PreviousEntry[] = journalData
          ? Object.entries(journalData)
              .map(([dateKey, entry]) => {
                const adjustedDateKey = dateKey.replace(
                  /(\d{1,2})-(\w+)-(\d{4})/,
                  (match, day, monthAbbr, year) => {
                    const standardizedMonthAbbr =
                      monthAbbreviationMap[monthAbbr] || monthAbbr;
                    return `${day}-${standardizedMonthAbbr}-${year}`;
                  }
                );

                const parsedDate = parse(
                  adjustedDateKey,
                  "dd-MMM-yyyy",
                  new Date()
                );

                if (isNaN(parsedDate.getTime())) {
                  console.error(
                    `Invalid date after adjustment: ${adjustedDateKey}`
                  );
                  return null; // Skip invalid dates
                }

                const formattedDate = format(parsedDate, "yyyy-MM-dd");
                return {
                  date: formattedDate,
                  encryptedUserInput: (entry as any).encryptedUserInput,
                  createdAt: (entry as any).createdAt,
                };
              })
              .filter((entry): entry is PreviousEntry => entry !== null) // Remove null entries
          : [];

        setPreviousEntries(previousEntries);
      } catch (error) {
        console.error("Error fetching or decrypting previous input:", error);
      }
    }

    fetchPreviousEntries();
  }, [journalData]);

  return (
    <div className="mb-12 mt-4 text-center md:mt-8 lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-10 xl:col-start-9">
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
      <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {days.map((day, dayIdx) => (
          <button
            key={day.dateString}
            type="button"
            onClick={() => handleDateClick(day)}
            disabled={day.isFuture || !day.hasJournalEntry}
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
              day.hasJournalEntry && "drop-shadow-xl hover:bg-emerald-500/25"
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
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={handleToday}
        className="mt-8 w-full rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600"
      >
        Today
      </button>
    </div>
  );
}
