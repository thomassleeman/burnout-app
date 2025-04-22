"use client";

import { useAtomValue } from "jotai";
import { userAtom } from "@/state/store";
import { getNamedCoursesData } from "@courses/getCoursesData";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

type SanityImage = {
  asset: {
    _ref: string;
    _type: string;
  };
};

type CourseData = {
  title: string;
  slug: string;
  headerImage: SanityImage;
  summary: any[];
};

type UserCourseProgress = {
  resourcesCompleted: Record<string, boolean>;
};

type Action = {
  icon: React.ElementType;
  name: string;
  href: string;
  iconForeground: string;
  iconBackground: string;
  progress?: {
    percentage: number;
    isComplete: boolean;
  };
  imageUrl?: string | null;
  description?: any[];
};

function CourseCard({ course }: { course: Action }) {
  return (
    <Link
      href={course.href}
      className="group relative block h-72 w-full overflow-hidden rounded-lg bg-white shadow-sm outline-2 outline-offset-4 outline-emerald-600/50 transition-all hover:shadow-md hover:outline"
    >
      {/* Image Container */}
      <div className="absolute inset-0">
        {course.imageUrl ? (
          <Image
            src={course.imageUrl}
            alt={course.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-100" />
        )}
      </div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-500/50 p-4 backdrop-blur-sm">
        <h3 className="mb-2 text-lg font-medium text-white">{course.name}</h3>
        {course.progress && (
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-200">Progress</span>
              <span className="text-sm font-medium text-gray-200">
                {course.progress.percentage}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-600/50">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${course.progress.percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {course.progress?.isComplete && (
        <div className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2 py-1 text-xs font-medium text-white shadow-sm">
          Complete
        </div>
      )}
    </Link>
  );
}

function CoursesSkeletonLoader() {
  return (
    <div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {Array(2)
          .fill(0)
          .map((_, idx) => (
            <div
              key={`course-skeleton-${idx}`}
              className="relative h-72 animate-pulse overflow-hidden rounded-lg bg-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-200 via-gray-100 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 w-full space-y-2">
                <div className="h-6 w-2/3 rounded bg-gray-300" />
                <div className="h-4 w-11/12 rounded bg-gray-300" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function MyCoursesPanel() {
  const user = useAtomValue(userAtom);
  const [courseActions, setCourseActions] = useState<Action[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    async function fetchCourseData() {
      if (user && !user?.courses) {
        setCoursesLoading(false);
        return;
      }

      try {
        // Get the slugs of courses the user is enrolled in
        if (!user?.courses) return;
        const coursesSlugs = Object.keys(user.courses);

        // Fetch course data from Sanity for these slugs
        const sanityCoursesData: CourseData[] = await getNamedCoursesData(
          coursesSlugs
        );

        // Combine Sanity data with user progress
        const combinedCourseActions = sanityCoursesData
          .map((course) => {
            const userProgress = user?.courses?.[
              course.slug
            ] as UserCourseProgress;

            let progress:
              | { percentage: number; isComplete: boolean }
              | undefined;

            if (userProgress?.resourcesCompleted) {
              const totalResources = Object.keys(
                userProgress.resourcesCompleted
              ).length;
              const completedResources = Object.values(
                userProgress.resourcesCompleted
              ).filter(Boolean).length;
              const percentage = Math.round(
                (completedResources / totalResources) * 100
              );

              // Only create an action if there's progress greater than 0
              if (percentage > 0) {
                progress = {
                  percentage,
                  isComplete: percentage === 100,
                };

                const headerImageUrl = course.headerImage
                  ? urlForImage(course.headerImage)
                  : null;

                return {
                  icon: AcademicCapIcon,
                  name: course.title,
                  href: `/courses/${course.slug}`,
                  iconForeground: "text-teal-700",
                  iconBackground: "bg-teal-50",
                  progress,
                  imageUrl: headerImageUrl,
                  description: course.summary,
                } as Action;
              }
            }
            return null;
          })
          .filter((course): course is Action => course !== null);

        setCourseActions(combinedCourseActions);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
      setCoursesLoading(false);
    }

    fetchCourseData();
  }, [user]);

  return (
    <>
      <div className="flex items-center gap-x-2 text-lg font-extralight text-gray-900">
        <h3>Courses</h3>
        <AcademicCapIcon className="h-5 w-5 text-emerald-600" />
      </div>
      {coursesLoading ? (
        <CoursesSkeletonLoader />
      ) : courseActions.length > 0 ? (
        <div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {courseActions.map((course) => (
              <CourseCard key={`course-${course.name}`} course={course} />
            ))}
          </div>
        </div>
      ) : null}

      {/* Fallback if both sections are not loading and have no content */}
      {!coursesLoading && courseActions.length === 0 && (
        <div className="flex w-full flex-col items-center justify-center rounded-sm bg-gray-200 py-2">
          <p className="flex items-center gap-x-1 text-sm text-gray-500">
            No courses in progress. Use the{" "}
            <span className="mx-1 flex items-center gap-x-1 font-mono text-gray-600">
              Resources{" "}
              <span className="inline-block">
                <BriefcaseIcon className="h-4 w-4" />
              </span>{" "}
            </span>
            menu to get started.
          </p>
        </div>
      )}
    </>
  );
}

export default MyCoursesPanel;
