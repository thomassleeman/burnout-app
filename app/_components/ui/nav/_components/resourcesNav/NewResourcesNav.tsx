"use client";
//react
import { useState, useEffect } from "react";
import { Fragment } from "react";
//Next
import Link from "next/link";
//headless ui
import { Popover, Transition } from "@headlessui/react";
//data fetching
import { getCoursesData } from "@courses/getCoursesData";
import { getBurnoutStoriesData } from "@stories/getStoriesData";
import { getWritingExercisesData } from "@exercises/writing-exercises/getWritingExercisesData";
import { getJournalsData } from "@/app/journaling/getJournalsData";
//components
import CourseCard from "./CourseCard";
import ExerciseCard from "./ExerciseCard";
import StoryCard from "./StoryCard";
import JournalCard from "./JournalCard";
//icon components
import YoutubeIcon from "@/components/design/icons/Youtube";
import InstagramIcon from "@/app/_components/design/icons/Instagram";
import defaultImage from "@articles/defaultImage.jpeg";
//icons
import {
  FingerPrintIcon,
  EyeIcon,
  AcademicCapIcon,
  InformationCircleIcon,
  NewspaperIcon,
  ShieldCheckIcon,
  ChatBubbleLeftEllipsisIcon,
  PencilSquareIcon,
  XMarkIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
//types
import { CourseSanity, WritingExercise } from "@/types/sanity";

interface CustomSVGProps {
  classes: string;
}

import { journalOutlineFromSanity } from "@/types/journal";
import { Tool } from "sanity";

interface Story {
  title: string;
  // Add other story properties as needed
}

interface EngagementItem {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}

interface ToolItem {
  name: string;
  href: string;
  target: string;
  icon: (props: CustomSVGProps) => JSX.Element;
  classes: string;
}

const tools = [
  {
    name: "Check up",
    href: "/chatbot/burnout-assessment",
    target: "_self",
    icon: ChatBubbleLeftEllipsisIcon,
    description: "Assess your current burnout status",
    color: "text-blue-600 bg-blue-50",
  },
  {
    name: "Courses home",
    href: "/courses",
    target: "_self",
    icon: AcademicCapIcon,
    description: "Access all courses",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    name: "Journaling for insight home",
    href: "/journaling",
    target: "_self",
    icon: PencilSquareIcon,
    description: "Access all guided journals",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    name: "Therepeutic writing home",
    href: "/exercises/writing-exercises",
    target: "_self",
    icon: PencilIcon,
    description: "Access all Therepeutic writing exercises",
    color: "text-emerald-600 bg-emerald-50",
  },
];

const engagement = [
  {
    name: "About",
    href: "/about",
    icon: InformationCircleIcon,
    description: "Learn more about our mission",
    color: "text-purple-600 bg-purple-50",
  },
  {
    name: "Privacy",
    href: "/legal/privacy-policy",
    icon: ShieldCheckIcon,
    description: "View our privacy policy",
    color: "text-gray-600 bg-gray-50",
  },
];

const tabs = [
  { id: "courses", label: "Courses", icon: AcademicCapIcon },
  { id: "exercises", label: "Writing Exercises", icon: PencilIcon },
  { id: "journals", label: "Journals", icon: PencilSquareIcon },
];

export default function ResourcesNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("courses");
  const [courses, setCourses] = useState<CourseSanity[]>([]);
  const [exercises, setExercises] = useState<WritingExercise[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [journals, setJournals] = useState<journalOutlineFromSanity[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const cachedCourses = localStorage.getItem("courses");
        const cachedTime = localStorage.getItem("coursesTime");

        // Check if data is cached and less than a few hours old
        if (
          cachedCourses &&
          cachedTime &&
          new Date().getTime() - Number(cachedTime) < 1000 * 60 * 60 * 3
        ) {
          //Using cached courses data
          const parsedCourses = JSON.parse(cachedCourses);

          if (!Array.isArray(parsedCourses)) {
            throw new Error("Cached courses data is not an array");
          }

          setCourses(parsedCourses);
        } else {
          //Fetching new courses data
          const data = await getCoursesData();

          if (!Array.isArray(data)) {
            throw new Error("Fetched courses data is not an array");
          }

          setCourses(data);

          // Cache the data
          localStorage.setItem("courses", JSON.stringify(data));
          localStorage.setItem("coursesTime", new Date().getTime().toString());
        }
      } catch (error) {
        console.error("Error fetching or parsing courses data:", error);
        // Optionally set courses to an empty array on error
        setCourses([]);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array to ensure this runs only once

  useEffect(() => {
    const fetchWritingExercises = async () => {
      try {
        const cachedExercises = localStorage.getItem("writingExercises");
        const cachedTime = localStorage.getItem("writingExercisesTime");

        // Check if data is cached and less than a few hours old
        if (
          cachedExercises &&
          cachedTime &&
          // new Date().getTime() - Number(cachedTime) < 1000 * 60 * 60 * 3
          new Date().getTime() - Number(cachedTime) < 1
        ) {
          //Using cached courses data
          const parsedExercises = JSON.parse(cachedExercises);

          if (!Array.isArray(parsedExercises)) {
            throw new Error("Cached exercises data is not an array");
          }

          setExercises(parsedExercises);
        } else {
          //Fetching new courses data
          const data = await getWritingExercisesData();

          if (!Array.isArray(data)) {
            throw new Error("Fetched exercises data is not an array");
          }

          setExercises(data);

          // Cache the data
          localStorage.setItem("writingExercises", JSON.stringify(data));
          localStorage.setItem(
            "writingExercisesTime",
            new Date().getTime().toString()
          );
        }
      } catch (error) {
        console.error("Error fetching or parsing exercises data:", error);
        // Optionally set courses to an empty array on error
        setCourses([]);
      }
    };

    fetchWritingExercises();
  }, []); // Empty dependency array to ensure this runs only once

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const cachedStories = localStorage.getItem("stories");
        const cachedTime = localStorage.getItem("storiesTime");

        // Check if data is cached and less than a few hours old
        if (
          cachedStories &&
          cachedTime &&
          new Date().getTime() - Number(cachedTime) < 1000 * 60 * 60 * 3
        ) {
          //Using cached courses data
          const parsedStories = JSON.parse(cachedStories);

          if (!Array.isArray(parsedStories)) {
            throw new Error("Cached courses data is not an array");
          }

          setStories(parsedStories);
        } else {
          //Fetching new courses data
          const data = await getBurnoutStoriesData();

          if (!Array.isArray(data)) {
            throw new Error("Fetched Burnout Stories data is not an array");
          }

          setStories(data);

          // Cache the data
          localStorage.setItem("stories", JSON.stringify(data));
          localStorage.setItem("storiesTime", new Date().getTime().toString());
        }
      } catch (error) {
        console.error("Error fetching or parsing stories data:", error);
        // Optionally set courses to an empty array on error
        setCourses([]);
      }
    };

    fetchStories();
  }, []); // Empty dependency array to ensure this runs only once

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const cachedJournals = localStorage.getItem("journals");
        const cachedTime = localStorage.getItem("journalsTime");

        // Check if data is cached and less than a few hours old
        if (
          cachedJournals &&
          cachedTime &&
          new Date().getTime() - Number(cachedTime) < 1000 * 60 * 60 * 3
        ) {
          //Using cached courses data
          const parsedJournals = JSON.parse(cachedJournals);

          if (!Array.isArray(parsedJournals)) {
            throw new Error("Cached journals data is not an array");
          }

          setJournals(parsedJournals);
        } else {
          //Fetching new courses data
          const data = await getJournalsData();

          if (!Array.isArray(data)) {
            throw new Error("Fetched Journals data is not an array");
          }

          setJournals(data);

          // Cache the data
          localStorage.setItem("journals", JSON.stringify(data));
          localStorage.setItem("journalsTime", new Date().getTime().toString());
        }
      } catch (error) {
        console.error("Error fetching or parsing journals data:", error);
        // Optionally set courses to an empty array on error
        setJournals([]);
      }
    };

    fetchJournals();
  }, []); // Empty dependency array to ensure this runs only once
  const closeNav = () => setIsOpen(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        // variant="ghost"
        className="group inline-flex items-center gap-x-1 rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-sky-600 hover:bg-sky-50"
      >
        <span>Resources</span>
        <BriefcaseIcon className="h-5 w-5 text-sky-600 group-hover:text-sky-700" />
        <ChevronDownIcon
          className={`h-5 w-5 text-sky-600 transition duration-150 ease-in-out group-hover:text-sky-700 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-7xl overflow-hidden rounded-xl bg-white shadow-2xl">
                <div className="flex flex-col md:flex-row">
                  {/* Sidebar */}
                  <div className="w-full border-b border-gray-200 bg-gray-50 p-4 md:w-64 md:border-r md:p-6 ">
                    <div className="space-y-2 md:space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Quick Tools
                        </h3>
                        <div className="mt-3 space-y-2">
                          {tools.map((tool) => (
                            <Link
                              key={tool.name}
                              href={tool.href}
                              target={tool.target}
                              className="group flex items-center rounded-lg p-2 hover:bg-gray-100"
                              onClick={closeNav}
                            >
                              <div
                                className={`mr-3 rounded-lg p-2 ${tool.color}`}
                              >
                                <tool.icon className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-md font-medium text-gray-900 md:text-sm">
                                  {tool.name}
                                </p>
                                <p className="hidden text-xs text-gray-500 lg:inline-block">
                                  {tool.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          About Us
                        </h3>
                        <div className="mt-1 space-y-2 md:mt-3">
                          {engagement.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="group flex items-center rounded-lg p-2 hover:bg-gray-100"
                              onClick={closeNav}
                            >
                              <div
                                className={`mr-3 rounded-lg p-2 ${item.color}`}
                              >
                                <item.icon className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-md font-medium text-gray-900 md:text-sm">
                                  {item.name}
                                </p>
                                <p className="hidden text-xs text-gray-500 lg:inline-block">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 p-6">
                    {/* Tabs */}
                    <div>
                      <div className="grid grid-cols-1 sm:hidden">
                        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                        <select
                          value={activeTab}
                          onChange={(e) => setActiveTab(e.target.value)}
                          aria-label="Select a tab"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600"
                        >
                          {tabs.map((tab) => (
                            <option key={tab.id} value={tab.id}>
                              {tab.label}
                            </option>
                          ))}
                        </select>
                        {/* <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 h-5 w-5 self-center justify-self-end fill-gray-500"
                        /> */}
                      </div>
                      <div className="hidden border-b border-gray-200 sm:block">
                        <div className="flex space-x-4">
                          {tabs.map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`flex items-center space-x-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                activeTab === tab.id
                                  ? "border-sky-500 text-sky-600"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                              }`}
                            >
                              <tab.icon className="hidden h-5 w-5 md:inline-block" />
                              <span>{tab.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mt-6 flex justify-center">
                      {/* <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"> */}
                      <div className="flex flex-wrap justify-center gap-8">
                        {activeTab === "courses" &&
                          courses.map((course) => (
                            <CourseCard
                              key={course.title}
                              course={course}
                              closeResourcesNav={closeNav}
                            />
                          ))}
                        {activeTab === "exercises" &&
                          exercises.map((exercise) => (
                            <ExerciseCard
                              key={exercise.title}
                              exercise={exercise}
                              closeResourcesNav={closeNav}
                            />
                          ))}
                        {activeTab === "journals" &&
                          journals.map((journal) => (
                            <JournalCard
                              key={journal.slug}
                              journal={journal}
                              closeResourcesNav={closeNav}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={closeNav}
                  className="absolute right-4 top-4 rounded-full bg-gray-50 p-2 hover:bg-gray-100"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
