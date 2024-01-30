import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  AcademicCapIcon,
} from "@heroicons/react/20/solid";

const tabs = [
  {
    name: "1.Defining burnout",
    articleSlug: "defining-burnout",
  },
  {
    name: "2.How to think about stress and anxiety",
    articleSlug: "how-to-think-about-stress-and-anxiety",
  },
  {
    name: "3.Stress vs Anxiety: what's the difference?",
    articleSlug: "stress-vs-anxiety-whats-the-difference",
  },
  {
    name: "4. What is it about work that leads to stress?",
    articleSlug: "what-is-it-about-workplaces-that-leads-to-stress-and-burnout",
  },
  {
    name: "5. Working on yourself vs working on the problem",
    articleSlug: "working-on-yourself-vs-working-on-the-problem",
  },
  // {
  //   name: "6. What is burnout?",
  //   articleSlug: "what-is-burnout",
  // },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface BurnoutCourseNavProps {
  slug: string;
}

function BurnoutCourseHeadNav({ slug }: BurnoutCourseNavProps) {
  return (
    <>
      <div>
        <div className="mx-2 mb-4 flex items-center space-x-6 text-slate-700 md:mx-0">
          <AcademicCapIcon className="h-6 w-6" />
          <h3 className=" font-mono  md:text-lg lg:text-xl">Burnout Course</h3>
        </div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-700 focus:outline-none focus:ring-emerald-700 sm:text-sm"
            // defaultValue={tabs.find((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-y border-gray-200">
            <nav
              className="-mb-px flex space-x-8 overflow-x-scroll "
              aria-label="Tabs"
            >
              {tabs.map((tab) => (
                <Link
                  href={`/articles/burnoutCourse/${tab.articleSlug}`}
                  key={tab.name}
                  id={tab.articleSlug}
                  className={classNames(
                    tab.articleSlug === slug
                      ? "border-emerald-700 font-bold text-emerald-800"
                      : "border-transparent font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 px-1 py-4 text-sm"
                  )}
                  aria-current={tab.articleSlug === slug ? "page" : undefined}
                >
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {/* Script to scroll nav bar to current page */}
      <script
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
      />
    </>
  );
}

function BurnoutCourseFootNav({ slug }: BurnoutCourseNavProps) {
  const tabIndex = (slug: string) => {
    return tabs.findIndex((tab) => tab.articleSlug === slug);
  };
  const prevTab = tabs[tabIndex(slug) - 1];
  const nextTab = tabs[tabIndex(slug) + 1];

  return (
    <div className="mx-1 mt-6 flex justify-between text-sm md:mx-0 md:mt-12 lg:mt-16">
      <div className="w-1/2">
        <Link
          href={prevTab ? `/articles/burnoutCourse/${prevTab.articleSlug}` : ""}
          className={`flex items-center space-x-2 text-emerald-800 no-underline ${
            prevTab ? "block" : "hidden"
          }`}
        >
          <ArrowLeftIcon className="h-5 w-5 text-green-800" />
          <span>{prevTab ? prevTab.name : null}</span>
        </Link>
      </div>
      <div className="flex w-1/2 justify-end">
        <Link
          href={nextTab ? `/articles/burnoutCourse/${nextTab.articleSlug}` : ""}
          className={`flex items-center space-x-2 text-emerald-800 no-underline ${
            nextTab ? "block" : "hidden"
          }`}
        >
          <span>{nextTab ? nextTab.name : null}</span>
          <ArrowRightIcon className="h-5 w-5 text-green-800" />
        </Link>
      </div>
    </div>
  );
}

export { BurnoutCourseHeadNav, BurnoutCourseFootNav };
