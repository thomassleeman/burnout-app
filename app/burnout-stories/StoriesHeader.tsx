import Link from "next/link";
import { usePathname } from "next/navigation";
import Share from "./_components/Share";

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  FingerPrintIcon,
} from "@heroicons/react/20/solid";

export default function CourseHeadNav() {
  //   const { articles, slug, title } = course;

  //   const pathname = usePathname();
  //   const pathSlug = pathname.split("/").pop();
  return (
    <>
      <div>
        <Link href={``}>
          <div className="m-4 flex items-center space-x-6 text-slate-700">
            <FingerPrintIcon className="h-6 w-6" />
            <h3 className=" font-mono  md:text-lg lg:text-xl">
              Burnout Stories
            </h3>
          </div>
        </Link>

        <div className="">
          <div className="border-y border-gray-200">
            <nav
              className="-mb-px flex space-x-8 overflow-x-scroll "
              aria-label="Tabs"
            >
              {/* {articles.map((article) => (
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
              ))} */}
            </nav>
          </div>
          <Share />
        </div>
      </div>
    </>
  );
}
