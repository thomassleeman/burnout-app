"use client";
import Link from "next/link";
import Image from "next/image";

import { getCoursesData } from "@courses/getCoursesData";
import { useState, useEffect } from "react";

const searchApp = process.env.NEXT_PUBLIC_SEARCH_APP;
const searchKey = process.env.NEXT_PUBLIC_SEARCH_KEY;

import { PortableText } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import YoutubeIcon from "@/components/design/icons/Youtube";

import defaultImage from "@articles/defaultImage.jpeg";

//types
import { Course } from "@/types/sanity";

import {
  BookOpenIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  NewspaperIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  UsersIcon,
  VideoCameraIcon,
  ChatBubbleLeftEllipsisIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const engagement = [
  { name: "About", href: "#", icon: InformationCircleIcon },
  { name: "Contribute", href: "#", icon: PencilSquareIcon },
  { name: "Press", href: "#", icon: NewspaperIcon },
  { name: "Careers", href: "#", icon: BriefcaseIcon },
  { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];
const resources = [
  {
    name: "Check up",
    href: "/chatbot/burnout-assessment",
    icon: () => (
      <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-blue-400 group-hover:animate-bounce" />
    ),
  },
  {
    name: "Youtube",
    href: "#",
    icon: () => (
      <YoutubeIcon classes="h-6 w-6 text-red-400 fill-current group-hover:animate-bounce" />
    ),
  },
  { name: "Guides", href: "#", icon: BookOpenIcon },
];

import {
  ChevronDownIcon,
  ChevronUpIcon,
  AcademicCapIcon,
} from "@heroicons/react/20/solid";
import {
  BookmarkSquareIcon,
  CalendarDaysIcon,
  LifebuoyIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

export default function ResourcesNav() {
  const [courses, setCourses] = useState<Course[]>([]);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const cachedCourses = localStorage.getItem("courses");
  //     const cachedTime = localStorage.getItem("coursesTime");

  //     if (
  //       cachedCourses &&
  //       cachedTime &&
  //       new Date().getTime() - Number(cachedTime) < 1000 * 60 * 60 * 3
  //     ) {
  //       setCourses(JSON.parse(cachedCourses));
  //     } else {
  //       const data = await getCoursesData();
  //       setCourses(data);

  //       localStorage.setItem("courses", JSON.stringify(data));
  //       localStorage.setItem("coursesTime", new Date().getTime().toString());
  //     }
  //   };

  //   fetchCourses();
  // }, []);

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

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="inline-flex items-center p-2 text-sm font-semibold leading-6 text-sky-600 outline-none lg:mr-3">
            <span className="hidden lg:mr-1 lg:inline-block">Resources</span>{" "}
            <BriefcaseIcon className="h-5 w-5 lg:hidden" />
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
              <div className="w-screen flex-auto overflow-hidden overflow-y-scroll rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  <div>
                    <div
                      // style={{ height: "34rem" }}
                      className="overflow-y-scroll rounded-xl bg-gradient-to-r from-amber-50/75 to-amber-50 p-6"
                    >
                      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-4 lg:grid-cols-2 lg:px-8">
                        <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
                          <div>
                            <h3 className="text-sm font-medium leading-6 text-gray-500">
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
                            <h3 className="text-sm font-medium leading-6 text-gray-500">
                              Resources
                            </h3>
                            <div className="mt-6 flow-root">
                              <div className="-my-2 ">
                                {resources.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
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
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
                          <h3 className="sr-only">Courses</h3>
                          {courses.map((course: Course) => {
                            return (
                              <CourseCard key={course.title} course={course} />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

const CourseCard = ({ course }: { course: Course }) => {
  const { title, slug, headerImage, summary } = course;
  const headerImageUrl = headerImage ? urlForImage(headerImage) : null;
  return (
    <article
      key={title}
      className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
    >
      <div className="relative flex-none">
        <Image
          className="aspect-[2/1] w-full rounded-lg bg-gray-100 object-cover sm:aspect-[16/9] sm:h-32 lg:h-auto"
          width={250}
          height={250}
          src={headerImageUrl || defaultImage}
          alt={`header image for ${title}`}
        />
        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div>
        <div className="flex items-center gap-x-4">
          {/* <time
            dateTime={post.datetime}
            className="text-sm leading-6 text-gray-600"
          >
            {post.date}
          </time> */}
          {/* <a
            href={post.category.href}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
          >
            {post.category.title}
          </a> */}
        </div>
        <h4 className="mt-2 text-sm font-semibold leading-6 text-gray-900">
          <a href={`courses/${slug}`}>
            <span className="absolute inset-0" />
            {title}
          </a>
        </h4>
        <div className="mt-2 text-sm leading-6 text-gray-600">
          <PortableText value={summary} components={portableTextComponents} />
        </div>
      </div>
    </article>
  );
};
