"use client";

import { useAtomValue } from "jotai";
import { userAtom } from "@/state/store";
import { getNamedCoursesData } from "@courses/getCoursesData";

import CourseCard from "./CourseCard";
import ExerciseCard from "./ExerciseCard";

import {
  AcademicCapIcon,
  CheckBadgeIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

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
};

function ActionsPanel() {
  const user: UserData | null = useAtomValue(userAtom);

  // Initialize the action arrays
  const courseActions: Action[] = [];
  const exerciseActions: Action[] = [];

  // Generate actions for courses
  const courses = user?.courses;
  if (courses) {
    Object.keys(courses).forEach((courseSlug) => {
      const course = courses[courseSlug];
      const name = courseSlug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize words
      const href = `/courses/${courseSlug}`;

      // Use AcademicCapIcon for courses
      const icon = AcademicCapIcon;

      // Assign colors
      const iconForeground = "text-teal-700";
      const iconBackground = "bg-teal-50";

      // Calculate progress if resourcesCompleted is available
      let progress: { percentage: number; isComplete: boolean } | undefined =
        undefined; // Set to undefined initially
      if (course.resourcesCompleted) {
        const totalResources = Object.keys(course.resourcesCompleted).length;
        const completedResources = Object.values(
          course.resourcesCompleted
        ).filter((completed) => completed).length;
        const percentage = Math.round(
          (completedResources / totalResources) * 100
        );

        progress = {
          percentage,
          isComplete: percentage === 100,
        };
      }

      courseActions.push({
        icon,
        name,
        href,
        iconForeground,
        iconBackground,
        progress,
      });
    });
  }

  // Generate actions for exercises
  const exercises = user?.exercises;
  if (exercises) {
    Object.keys(exercises).forEach((exerciseSlug) => {
      const exercise = exercises[exerciseSlug];
      const name = exerciseSlug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      const href = `/exercises/${exerciseSlug}`;

      // Choose an icon for exercises
      const icon = CheckBadgeIcon;

      // Assign colors
      const iconForeground = "text-purple-700";
      const iconBackground = "bg-purple-50";

      // Calculate progress if resourcesCompleted is available
      let progress: { percentage: number; isComplete: boolean } | undefined =
        undefined; // Set to undefined initially
      // if (exercise.resourcesCompleted) {
      //   const totalResources = Object.keys(exercise.resourcesCompleted).length;
      //   const completedResources = Object.values(
      //     exercise.resourcesCompleted
      //   ).filter((completed) => completed).length;
      const percentage = exercise.completionPercentage;

      progress = {
        percentage,
        isComplete: percentage === 100,
      };

      exerciseActions.push({
        icon,
        name,
        href,
        iconForeground,
        iconBackground,
        progress,
      });
    });
  }

  // Render the content based on whether actions are present
  let content;
  if (courseActions.length > 0 || exerciseActions.length > 0) {
    content = (
      <section aria-labelledby="quick-links-title">
        <h2 id="quick-links-title" className="sr-only">
          Quick links
        </h2>
        <div className="space-y-8">
          {/* Render Course Actions */}
          {courseActions.length > 0 && (
            <div>
              <div className="flex items-center gap-x-2 text-lg font-extralight text-gray-900">
                <h3 className="">Courses</h3>
                <AcademicCapIcon className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {courseActions.map((course) => (
                  <CourseCard key={`course-${course.name}`} course={course} />
                ))}
              </div>
            </div>
          )}

          {/* Render Exercise Actions */}
          {exerciseActions.length > 0 && (
            <div>
              <div className="flex items-center gap-x-2 text-lg font-extralight text-gray-900">
                <h3 className="">Exercises</h3>
                <CheckBadgeIcon className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {exerciseActions.map((exercise) => (
                  <ExerciseCard
                    key={`exercise-${exercise.name}`}
                    exercise={exercise}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  } else {
    content = (
      <div className="flex h-32 w-full flex-col items-center justify-center border border-gray-200 sm:h-96">
        <p className="flex items-center gap-x-1 text-sm text-gray-400">
          Use the Resources{" "}
          <span className="inline-block">
            <BriefcaseIcon className="h-4 w-4" />
          </span>
          menu to get started...
        </p>
      </div>
    );
  }

  // Skeleton Loader
  const skeletonLoader = (
    <div className="py-4">
      <div className="space-y-8">
        {/* Skeleton for Courses */}
        <div>
          <div className="flex items-center gap-x-2 text-lg font-extralight text-gray-900">
            <h3 className="">Courses</h3>
            <AcademicCapIcon className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {Array(2)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={`course-skeleton-${idx}`}
                  className="animate-pulse rounded-lg bg-white p-4 shadow"
                >
                  <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="mb-4 h-3 w-1/2 rounded bg-gray-200"></div>
                  <div className="h-2 w-full rounded bg-gray-200"></div>
                </div>
              ))}
          </div>
        </div>

        {/* Skeleton for Exercises */}
        <div>
          <div className="flex items-center gap-x-2 text-lg font-extralight text-gray-900">
            <h3 className="">Exercises</h3>
            <CheckBadgeIcon className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {Array(2)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={`exercise-skeleton-${idx}`}
                  className="animate-pulse rounded-lg bg-white p-4 shadow"
                >
                  <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="mb-4 h-3 w-1/2 rounded bg-gray-200"></div>
                  <div className="h-2 w-full rounded bg-gray-200"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return skeletonLoader;
  } else {
    return content;
  }
}

export default ActionsPanel;
