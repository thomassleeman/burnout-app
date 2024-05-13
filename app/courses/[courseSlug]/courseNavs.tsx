"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Share from "../_components/Share";

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  AcademicCapIcon,
} from "@heroicons/react/20/solid";

//types
import { Course } from "@/types/sanity";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function CourseHeadNav({ course }: { course: Course }) {
  const { articles, slug, title } = course;

  const pathname = usePathname();
  const pathSlug = pathname.split("/").pop();
  return (
    <>
      <div>
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
              {articles.map((article) => (
                <Link
                  href={`/courses/${slug}/${article.slug}`}
                  key={article.title}
                  // id={article.lug}
                  className={classNames(
                    article.slug === pathSlug
                      ? "border-emerald-700 font-bold text-emerald-800"
                      : "border-transparent font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 px-1 py-4 text-sm"
                  )}
                  aria-current={article.slug === pathSlug ? "page" : undefined}
                >
                  {article.title}
                </Link>
              ))}
            </nav>
          </div>
          <Share />
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
  const { articles, slug } = course;
  const pathname = usePathname();
  const pathSlug = pathname.split("/").pop();

  const tabIndex = () => {
    return articles.findIndex((article) => article.slug === pathSlug);
  };
  const prevTab = articles[tabIndex() - 1];

  // additional check for next tab to prevent it from appearing on the course head page
  let nextTab;
  nextTab = articles[tabIndex() + 1];

  if (tabIndex() < 0) {
    nextTab = null;
  }

  return (
    <div className="mx-1 mt-6 flex justify-between text-sm md:mx-0 md:mt-12 lg:mt-16">
      <div className="w-1/2">
        <Link
          href={prevTab ? `/courses/${slug}/${prevTab.slug}` : ""}
          className={`flex items-center space-x-2 text-emerald-800 no-underline ${
            prevTab ? "block" : "hidden"
          }`}
        >
          <ArrowLeftIcon className="h-5 w-5 text-green-800" />
          <span>{prevTab ? prevTab.title : null}</span>
        </Link>
      </div>
      <div className="flex w-1/2 justify-end">
        <Link
          href={nextTab ? `/courses/${slug}/${nextTab.slug}` : ""}
          className={`flex items-center space-x-2 text-emerald-800 no-underline ${
            nextTab ? "block" : "hidden"
          }`}
        >
          <span>{nextTab ? nextTab.title : null}</span>
          <ArrowRightIcon className="h-5 w-5 text-green-800" />
        </Link>
      </div>
    </div>
  );
}

export { CourseHeadNav, CourseFootNav };
