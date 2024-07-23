"use client";

//next
import Link from "next/link";
import { usePathname } from "next/navigation";
//functions
import { getResourcePathType } from "../functions";
//components
import Share from "@/components/ui/Share";

//icons
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  AcademicCapIcon,
} from "@heroicons/react/20/solid";

import { BookOpenIcon, PencilIcon } from "@heroicons/react/24/outline";

//types
import { Course, CourseResource } from "@/types/sanity";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function CourseHeadNav({ course }: { course: Course }) {
  const { resources, slug, title } = course;

  console.log("resources: ", resources);

  const pathname = usePathname();
  const pathSlug = pathname.split("/").pop();
  return (
    <>
      <div className="z-50 bg-amber-50">
        <Link href={`/courses/${slug}`}>
          <div className="mx-2 mb-4 flex items-center space-x-6 text-slate-700 md:mx-0">
            <AcademicCapIcon className="h-6 w-6" />
            <h3 className=" font-mono  md:text-lg lg:text-xl">{title}</h3>
          </div>
        </Link>

        <div className="">
          <div className="border-y border-gray-200">
            <nav
              className="-mb-px flex space-x-8 overflow-x-scroll "
              aria-label="Tabs"
            >
              {resources.map((resource) => (
                <Link
                  href={`/courses/${slug}/${getResourcePathType(
                    resource.type
                  )}/${resource.slug}`}
                  key={resource.title}
                  // id={article.lug}
                  className={classNames(
                    resource.slug === pathSlug
                      ? "border-emerald-700 font-bold text-emerald-800"
                      : "border-transparent font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "flex items-center space-x-2 whitespace-nowrap border-b-2 px-1 py-4 text-sm"
                  )}
                  aria-current={resource.slug === pathSlug ? "page" : undefined}
                >
                  {resource.type === "article" && (
                    <BookOpenIcon className="h-4 w-4" />
                  )}
                  {resource.type === "selfReflectionExercise" && (
                    <PencilIcon className="h-4 w-4" />
                  )}
                  <span>{resource.title}</span>
                </Link>
              ))}
            </nav>
          </div>
          {/* <Share title={title} articleType="course" /> */}
        </div>
      </div>
      {/* Script to scroll nav bar to current page */}
      {/* <script
        dangerouslySetInnerHTML={{
          __html: `
        document.addEventListener('DOMContentLoaded', function() {
          const currentItem = document.getElementById("${slug}");
          if (currentItem) {
            console.log("currentItem: ", currentItem);
            currentItem.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'start'
            });
          }
        });
      `,
        }}
      /> */}
    </>
  );
}

function CourseFootNav({ course }: { course: Course }) {
  const { resources, slug } = course;
  const pathname = usePathname();
  const pathSlug = pathname.split("/").pop();

  const tabIndex = () => {
    return resources.findIndex((resource) => resource.slug === pathSlug);
  };
  const prevTab = resources[tabIndex() - 1];

  // additional check for next tab to prevent it from appearing on the course head page
  let nextTab;
  nextTab = resources[tabIndex() + 1];

  if (tabIndex() < 0) {
    nextTab = null;
  }

  return (
    <div className="mx-1 mt-6 flex justify-between text-sm md:mx-0 md:mt-12 lg:mt-16">
      <div className="w-1/2">
        {prevTab && (
          <Link
            href={`/courses/${slug}/${getResourcePathType(prevTab.type)}/${
              prevTab.slug
            }`}
            className="flex items-center space-x-2 text-emerald-800 no-underline"
          >
            <ArrowLeftIcon className="h-5 w-5 text-green-800" />
            <span>{prevTab ? prevTab.title : null}</span>
          </Link>
        )}
      </div>
      <div className="flex w-1/2 justify-end">
        {nextTab && (
          <Link
            href={`/courses/${slug}/${getResourcePathType(nextTab.type)}/${
              nextTab.slug
            }`}
            className="flex items-center space-x-2 text-emerald-800 no-underline"
          >
            <span>{nextTab.title}</span>
            <ArrowRightIcon className="h-5 w-5 text-green-800" />
          </Link>
        )}
      </div>
    </div>
  );
}

export { CourseHeadNav, CourseFootNav };
