"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Share from "@/components/ui/Share";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  AcademicCapIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import {
  BookOpenIcon,
  PencilIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { WritingExercise, JournalingSection } from "@/types/sanity";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function HeadNav({ exercise }: { exercise: WritingExercise }) {
  const pathname = usePathname();
  const pathSlug = pathname.split("/").pop();

  const { slug, title, journalingSections } = exercise;

  if (!exercise) {
    return null;
  }

  return (
    <>
      <div className="z-50 rounded-lg border-y border-gray-200 bg-transparent py-2">
        <Link href={`/exercises/writing-exercises/${slug.current}`}>
          <div className="mx-2 my-2 flex items-center space-x-6 text-slate-700 md:mx-0">
            <PencilSquareIcon className="h-6 w-6" />
            <h3 className="font-mono md:text-lg lg:text-xl">{title}</h3>
          </div>
        </Link>

        {/* <div className="">
          <div className="border-y border-gray-200">
            <nav
              className="-mb-px flex items-center space-x-8 overflow-x-scroll "
              aria-label="Tabs"
            >
              <h4 className="font-mono">Exercise sections:</h4>
              {journalingSections?.map((section) => (
                <Link
                  href={`/exercises/writing-exercises/${slug.current}/${section.slug}`}
                  key={section._key}
                  className={classNames(
                    section.slug === pathSlug
                      ? "border-emerald-700 font-bold text-emerald-800"
                      : "border-transparent font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "flex items-center space-x-2 whitespace-nowrap border-b-2 px-1 py-4 text-sm"
                  )}
                  aria-current={section.slug === pathSlug ? "page" : undefined}
                >
                  <span>{section.sectionTitle}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div> */}
      </div>
    </>
  );
}

function FootNav({ exercise }: { exercise: WritingExercise }) {
  const pathname = usePathname();
  const pathSlug = pathname.split("/").pop();

  if (!exercise) {
    return null;
  }

  const { journalingSections, slug } = exercise;

  if (!journalingSections) {
    return null;
  }

  // const tabIndex = () => {
  //   return journalingSections.findIndex((section) => section.slug === pathSlug);
  // };

  const tabIndex = () => {
    return journalingSections.findIndex(
      (section: JournalingSection) => section.slug === pathSlug
    );
  };
  const prevTab = journalingSections[tabIndex() - 1];

  let nextTab;
  nextTab = journalingSections[tabIndex() + 1];

  if (tabIndex() < 0) {
    nextTab = null;
  }

  return (
    <div className="mx-1 mt-6 flex justify-between text-sm md:mx-0 md:mt-12 lg:mt-16">
      <div className="w-1/2">
        {prevTab && (
          <Link
            href={`/exercises/writing-exercises/${slug.current}/${prevTab.slug}`}
            className="flex items-center space-x-2 text-emerald-800 no-underline"
          >
            <ArrowLeftIcon className="h-5 w-5 text-green-800" />
            <span>{prevTab ? prevTab.sectionTitle : null}</span>
          </Link>
        )}
      </div>
      <div className="flex w-1/2 justify-end">
        {nextTab && (
          <Link
            href={`/exercises/writing-exercises/${slug.current}/${nextTab.slug}`}
            className="flex items-center space-x-2 text-emerald-800 no-underline"
          >
            <span>{nextTab.sectionTitle}</span>
            <ArrowRightIcon className="h-5 w-5 text-green-800" />
          </Link>
        )}
      </div>
    </div>
  );
}

export { HeadNav, FootNav };
