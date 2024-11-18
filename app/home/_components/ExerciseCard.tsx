import { ArrowUpRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

function classNames(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

type Exercise = {
  iconBackground: string;
  iconForeground: string;
  name: string;
  href: string;
  progress?: {
    percentage: number;
    isComplete: boolean;
  };
};

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <div className="group relative rounded-lg bg-white p-4 shadow focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-600/75 hover:shadow-md">
      <div
        className={classNames(
          exercise.iconBackground,
          exercise.iconForeground,
          "inline-flex items-center gap-x-2 rounded-lg px-2 text-sm ring-4 ring-white"
        )}
      >
        <span>{exercise.name}</span>
        {/* <exercise.icon aria-hidden="true" className="h-5 w-5" /> */}
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium">
          <a href={exercise.href} className="focus:outline-none">
            {/* Extend touch target to entire panel */}
            <span aria-hidden="true" className="absolute inset-0" />
            {/* {exercise.name} */}
          </a>
        </h3>
        {/* Progress Indicator */}
        {exercise.progress && (
          <div className="mt-2 flex items-center">
            {exercise.progress.isComplete ? (
              <CheckCircleIcon
                className="h-6 w-6 text-green-500"
                aria-hidden="true"
              />
            ) : (
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{
                    width: `${exercise.progress.percentage}%`,
                  }}
                ></div>
              </div>
            )}
            {!exercise.progress.isComplete && (
              <span className="ml-2 text-sm text-gray-600">
                {exercise.progress.percentage}%
              </span>
            )}
          </div>
        )}
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
      >
        <ArrowUpRightIcon className="h-5 w-5" />
      </span>
    </div>
  );
}
