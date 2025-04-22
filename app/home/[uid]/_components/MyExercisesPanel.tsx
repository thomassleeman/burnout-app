"use client";

import { useAtomValue } from "jotai";
import { userAtom } from "@/state/store";
import { getNamedCoursesData } from "@courses/getCoursesData";
import { getWritingExercisesData } from "@exercises/writing-exercises/getWritingExercisesData";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

import { Exercise } from "@/types/sanity";

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

function ExerciseCard({ exercise }: { exercise: Action }) {
  return (
    <Link
      href={exercise.href}
      className="group relative block h-72 w-full overflow-hidden rounded-lg bg-white shadow-sm outline-2 outline-offset-4 outline-emerald-600/50 transition-all hover:shadow-md hover:outline"
    >
      {/* Image Container */}
      <div className="absolute inset-0">
        {exercise.imageUrl ? (
          <Image
            src={exercise.imageUrl}
            alt={exercise.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-100" />
        )}
      </div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-500/50 p-4 backdrop-blur-sm">
        <h3 className="mb-2 text-lg font-medium text-white">{exercise.name}</h3>
        {exercise.progress && (
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-200">Progress</span>
              <span className="text-sm font-medium text-gray-200">
                {exercise.progress.percentage}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-600/50">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${exercise.progress.percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {exercise.progress?.isComplete && (
        <div className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2 py-1 text-xs font-medium text-white shadow-sm">
          Complete
        </div>
      )}
    </Link>
  );
}

function ExercisesSkeletonLoader() {
  return (
    <div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {Array(2)
          .fill(0)
          .map((_, idx) => (
            <div
              key={`exercise-skeleton-${idx}`}
              className="relative h-72 animate-pulse overflow-hidden rounded-lg bg-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-200 via-gray-100 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <div className="h-6 w-2/3 rounded bg-gray-300" />
                <div className="h-4 w-11/12 rounded bg-gray-300" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function MyExercisesPanel() {
  const user = useAtomValue(userAtom);
  const [exerciseActions, setExerciseActions] = useState<Action[]>([]);
  const [exercisesLoading, setExercisesLoading] = useState(true);

  useEffect(() => {
    async function fetchExerciseData() {
      try {
        const sanityExercisesData = await getWritingExercisesData();

        const combinedExerciseActions: Action[] = sanityExercisesData
          .map((exercise: any) => {
            const userProgress = user?.exercises?.[exercise.slug];
            let progress = undefined;

            // Only create an action if there's progress greater than 0
            if (userProgress && userProgress.completionPercentage > 0) {
              progress = {
                percentage: userProgress.completionPercentage,
                isComplete: userProgress.completionPercentage === 100,
              };

              const headerImageUrl = exercise.headerImage
                ? urlForImage(exercise.headerImage)
                : null;

              return {
                icon: CheckBadgeIcon,
                name: exercise.title,
                href: `/exercises/writing-exercises/${exercise.slug}`,
                iconForeground: "text-purple-700",
                iconBackground: "bg-purple-50",
                progress,
                imageUrl: headerImageUrl,
              };
            }
            return null;
          })
          .filter(
            (exercise: Action | null): exercise is Action => exercise !== null
          ); // Filter out null values and type assert

        setExerciseActions(combinedExerciseActions);
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
      setExercisesLoading(false);
    }

    fetchExerciseData();
  }, [user]);

  // useEffect(() => {
  //   async function fetchExerciseData() {
  //     try {
  //       // Fetch exercise data from Sanity
  //       const sanityExercisesData = await getWritingExercisesData();

  //       const combinedExerciseActions: Action[] = sanityExercisesData.map(
  //         (exercise: any) => {
  //           const userProgress = user?.exercises?.[exercise.slug];
  //           let progress = undefined;
  //           if (userProgress) {
  //             progress = {
  //               percentage: userProgress.completionPercentage,
  //               isComplete: userProgress.completionPercentage === 100,
  //             };
  //           }

  //           const headerImageUrl = exercise.headerImage
  //             ? urlForImage(exercise.headerImage)
  //             : null;

  //           return {
  //             icon: CheckBadgeIcon,
  //             name: exercise.title,
  //             href: `/exercises/writing-exercises/${exercise.slug}`,
  //             iconForeground: "text-purple-700",
  //             iconBackground: "bg-purple-50",
  //             progress,
  //             imageUrl: headerImageUrl,
  //           };
  //         }
  //       );

  //       setExerciseActions(combinedExerciseActions);
  //     } catch (error) {
  //       console.error("Error fetching exercise data:", error);
  //     }
  //     setExercisesLoading(false);
  //   }

  //   fetchExerciseData();
  // }, [user]);

  return (
    <>
      <div className="flex items-center gap-x-2 text-lg font-extralight text-gray-900">
        <h3>Exercises</h3>
        <CheckBadgeIcon className="h-5 w-5 text-emerald-600" />
      </div>
      {exercisesLoading ? (
        <ExercisesSkeletonLoader />
      ) : exerciseActions.length > 0 ? (
        <div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {exerciseActions.map((exercise) => (
              <ExerciseCard
                key={`exercise-${exercise.name}`}
                exercise={exercise}
              />
            ))}
          </div>
        </div>
      ) : null}

      {/* Fallback if both sections are not loading and have no content */}
      {!exercisesLoading && exerciseActions.length === 0 && (
        <div className="flex w-full flex-col items-center justify-center rounded-sm bg-gray-200 py-2">
          <p className="flex items-center gap-x-1 text-sm text-gray-500">
            No exercises in progress. Use the{" "}
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

export default MyExercisesPanel;
