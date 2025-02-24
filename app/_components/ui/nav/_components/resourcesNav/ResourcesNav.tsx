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

const engagement: EngagementItem[] = [
  { name: "About", href: "/about", icon: InformationCircleIcon },
  // { name: "Contribute", href: "#", icon: PencilSquareIcon },
  // { name: "Press", href: "#", icon: NewspaperIcon },
  // { name: "Careers", href: "#", icon: BriefcaseIcon },
  { name: "Privacy", href: "/legal/privacy-policy", icon: ShieldCheckIcon },
];

const tools: ToolItem[] = [
  {
    name: "Check up",
    href: "/chatbot/burnout-assessment",
    target: "_self",
    icon: (props: CustomSVGProps) => (
      <ChatBubbleLeftEllipsisIcon
        className={props.classes}
        aria-hidden="true"
      />
    ),
    classes: "h-6 w-6 text-blue-400 group-hover:animate-bounce",
  },
  {
    name: "My Journal",
    href: "/my-journal",
    target: "_self",
    icon: (props: CustomSVGProps) => (
      <PencilIcon className={props.classes} aria-hidden="true" />
    ),
    classes: "h-6 w-6 text-emerald-600 group-hover:animate-bounce",
  },
  // {
  //   name: "Youtube",
  //   href: "https://www.youtube.com/channel/UCg_SVP7mDgBI4gEcY5mTt-A",
  //   target: "_blank",
  //   icon: (props: CustomSVGProps) => <YoutubeIcon classes={props.classes} />,
  //   classes: "h-6 w-6 text-red-400 fill-current group-hover:animate-bounce",
  // },
  // {
  //   name: "Instagram",
  //   href: "https://instagram.com/theburnout_hub",
  //   target: "_blank",
  //   icon: (props: CustomSVGProps) => <InstagramIcon classes={props.classes} />,
  //   classes: "h-6 w-6 text-pink-500 fill-current group-hover:animate-bounce",
  // },
];

export default function ResourcesNav() {
  const [courses, setCourses] = useState<CourseSanity[]>([]);
  const [exercises, setExercises] = useState<WritingExercise[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [journals, setJournals] = useState<journalOutlineFromSanity[]>([]);

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

  return (
    <Popover className="relative">
      {({ open, close }) => {
        //prevent the background page from scrolling when open.
        if (typeof document !== "undefined") {
          document.body.style.overflow = open ? "hidden" : "auto";
        }
        return (
          <>
            <Popover.Button className="inline-flex items-center p-2 text-sm font-semibold leading-6 text-sky-600 outline-none lg:mr-3">
              <span className="hidden lg:mr-2 lg:inline-block">Resources</span>{" "}
              <BriefcaseIcon className="h-5 w-5 lg:h-4 lg:w-4" />
              <ChevronDownIcon
                className={`h-6 w-6 ${open ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="fixed right-0 z-10 mt-5 flex w-screen max-w-max lg:px-4">
                <button onClick={close}>
                  <XMarkIcon className="fixed right-0 top-0 h-10 w-10 rounded-full bg-slate-300 p-2 text-gray-900" />
                </button>
                <div className="w-screen flex-auto overflow-hidden overflow-y-scroll rounded-xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    <div>
                      <div
                        style={{ height: "36rem" }}
                        className="overflow-y-scroll rounded-xl bg-gradient-to-r from-amber-50/75 to-amber-50 p-6"
                      >
                        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 overflow-y-scroll px-6 py-4 lg:grid-cols-2 lg:px-8">
                          <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
                            <div>
                              <h3 className="font-medium leading-6 text-gray-500">
                                Engagement
                              </h3>
                              <div className="mt-6 flow-root">
                                <div className="-my-2">
                                  {engagement.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900"
                                    >
                                      <item.icon
                                        className="h-6 w-6 flex-none text-gray-400"
                                        aria-hidden="true"
                                      />
                                      {item.name}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-medium leading-6 text-gray-500">
                                Tools
                              </h3>
                              <div className="mt-6 flow-root">
                                <div className="-my-2 ">
                                  {tools.map((item) => (
                                    <a
                                      key={item.name}
                                      href={item.href}
                                      target={item.target}
                                      className="group flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
                                    >
                                      {item.icon({
                                        classes: item.classes,
                                      })}
                                      {item.name}
                                    </a>
                                  ))}
                                </div>
                              </div>

                              {/* <div className="mt-6 flow-root">
                              <div className="-my-2 ">
                                {tools.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    target={item.target}
                                    className="group flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
                                  >
                                    <item.icon
                                      className="h-6 w-6 flex-none text-gray-400 group-hover:animate-bounce"
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </a>
                                ))}
                              </div>
                            </div> */}
                            </div>
                          </div>
                          {/* Courses */}
                          <div>
                            <button onClick={close}>
                              <Link href="/courses" className="">
                                <div className="mb-4 flex w-fit items-center gap-x-6 rounded-lg border border-gray-300 px-4 py-3 text-gray-500 outline-2 outline-offset-4 outline-sky-400/25 hover:outline">
                                  <h3 className="text-xl font-medium leading-6 ">
                                    Courses
                                  </h3>
                                  <AcademicCapIcon className="h-6 w-6" />
                                </div>
                              </Link>
                            </button>
                            <div className="grid grid-cols-1 gap-1 sm:gap-8 lg:grid-cols-2">
                              {courses.map((course: CourseSanity) => {
                                return (
                                  <CourseCard
                                    key={course.title}
                                    course={course}
                                    closeResourcesNav={close}
                                  />
                                );
                              })}
                            </div>
                          </div>
                          {/* Therapeutic writing */}
                          <div>
                            <div className="mb-4 flex flex-col gap-y-1">
                              <button onClick={close}>
                                <Link
                                  href="/exercises/writing-exercises"
                                  className=""
                                >
                                  <div className="mb-4 flex w-fit items-center gap-x-6 rounded-lg border border-gray-300 px-4 py-3 text-gray-500 outline-2 outline-offset-4 outline-sky-400/25 hover:outline">
                                    <h3 className="text-xl font-medium leading-6 ">
                                      Therapeutic writing
                                    </h3>
                                    <EyeIcon className="h-6 w-6" />
                                  </div>
                                </Link>
                              </button>
                              <span className="text-sm text-emerald-800">
                                Explore your thoughts and feelings through
                                guided writing exercises.
                              </span>
                            </div>
                            <div className="grid grid-cols-1 gap-1 sm:gap-8 lg:grid-cols-2">
                              {exercises.map((exercise: WritingExercise) => {
                                return (
                                  <ExerciseCard
                                    key={exercise.title}
                                    exercise={exercise}
                                    closeResourcesNav={close}
                                  />
                                );
                              })}
                            </div>
                          </div>
                          {/* Journals */}
                          <div>
                            <div className="mb-4 flex flex-col gap-y-1">
                              <button onClick={close}>
                                <Link href="/journaling" className="">
                                  <div className="mb-4 flex w-fit items-center gap-x-6 rounded-lg border border-gray-300 px-4 py-3 text-gray-500 outline-2 outline-offset-4 outline-sky-400/25 hover:outline">
                                    <h3 className="text-xl font-medium leading-6 ">
                                      Journaling for insight
                                    </h3>
                                    <EyeIcon className="h-6 w-6" />
                                  </div>
                                </Link>
                              </button>
                              <span className="text-sm text-emerald-800">
                                Take some time to write about your day.
                              </span>
                            </div>
                            <div className="grid grid-cols-1 gap-1 sm:gap-8 lg:grid-cols-2">
                              {journals.map((journal) => {
                                return (
                                  <JournalCard
                                    key={journal.slug}
                                    journal={journal}
                                    closeResourcesNav={close}
                                  />
                                );
                              })}
                            </div>
                          </div>
                          {/* Stories */}
                          {/* TODO This is temporarily removed. Put back in as appropriate.  */}
                          {/* <div>
                          <div className="mb-4 flex items-center gap-x-4 text-gray-500">
                            <FingerPrintIcon className="h-6 w-6" />
                            <h3 className="text-lg font-medium leading-6 ">
                              Burnout Stories
                            </h3>
                          </div>
                          <div className="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
                            {stories.map((story: Course, index: number) => {
                              const colors = [
                                "sky",
                                "rose",
                                "lime",
                                "orange",
                                "violet",
                              ];

                              function getColor(
                                index: number,
                                colors: string[]
                              ): string {
                                return colors[index % colors.length];
                              }

                              return (
                                <StoryCard
                                  key={story.title}
                                  story={story}
                                  color={getColor(index, colors)}
                                  closeResourcesNav={close}
                                />
                              );
                            })}
                          </div>
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        );
      }}
    </Popover>
  );
}
