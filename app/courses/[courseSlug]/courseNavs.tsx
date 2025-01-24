"use client";

import { useState, useEffect } from "react";
// Next.js imports
import Link from "next/link";
import { usePathname } from "next/navigation";
// Functions
import { getResourcePathType } from "../functions";
// Components
import Share from "@/components/ui/Share";
// Icons
import { BookOpenIcon, PencilIcon } from "@heroicons/react/24/outline";

// //icons
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  AcademicCapIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
// Types
import { Course } from "@/types/sanity";
// Subscription function
import subscribeToCompletedResources from "./subscribeToCompletedResources";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function CourseHeadNav({ course }: { course: Course }) {
  const pathname = usePathname();
  const pathSlug = pathname.split("/").pop();

  const [completedModules, setCompletedModules] = useState<{
    [key: string]: boolean;
  }>({});

  const { resources, slug, title } = course;

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    (async () => {
      unsubscribe = await subscribeToCompletedResources(
        slug,
        setCompletedModules
      );
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [slug]);

  if (!course) {
    return null;
  }

  return (
    <div className="z-50 rounded-lg bg-white/95 px-6 py-2 shadow lg:py-4">
      <Link href={`/courses/${slug}`}>
        <div className="mx-2 mb-4 flex items-center space-x-6 text-slate-700 md:mx-0">
          <AcademicCapIcon className="h-6 w-6" />
          <h3 className="font-mono md:text-lg lg:text-2xl">{title}</h3>
        </div>
      </Link>

      <div className="border-y border-gray-200">
        <nav
          className="-mb-px flex space-x-8 overflow-x-scroll"
          aria-label="Tabs"
        >
          {resources?.map((resource) => (
            <div
              // href={`/courses/${slug}/${getResourcePathType(resource.type)}/${
              //   resource.slug
              // }`}
              key={resource.title}
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
              {completedModules[resource.slug] && (
                <CheckCircleIcon className="h-6 w-6 text-sky-600" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default CourseHeadNav;

// "use client";

// import { useState, useEffect } from "react";
// //next
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// //functions
// import { getResourcePathType } from "../functions";
// //components
// import Share from "@/components/ui/Share";

// import { BookOpenIcon, PencilIcon } from "@heroicons/react/24/outline";

// //types
// import { Course, CourseResource } from "@/types/sanity";

// import subscribeToCompletedResources from "./subscribeToCompletedResources";

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(" ");
// }

// function CourseHeadNav({ course }: { course: Course }) {
//   const pathname = usePathname();
//   const pathSlug = pathname.split("/").pop();
//   // const [completedModules, setCompletedModules] = useState<string[]>([]);

//   const [completedModules, setCompletedModules] = useState<{
//     [key: string]: boolean;
//   }>({});

//   const { resources, slug, title } = course;

//   useEffect(() => {
//     let unsubscribe: any;

//     (async () => {
//       unsubscribe = await subscribeToCompletedResources(
//         slug,
//         setCompletedModules
//       );
//     })();

//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, [slug]);

//   // useEffect(() => {
//   //   let unsubscribe: (() => void) | null = null;

//   //   const fetchAndSubscribe = async () => {
//   //     unsubscribe = await subscribeToCompletedResources(
//   //       course.slug,
//   //       setCompletedModules
//   //     );
//   //   };

//   //   fetchAndSubscribe();

//   //   // Cleanup subscription on component unmount
//   //   return () => {
//   //     if (unsubscribe) unsubscribe();
//   //   };
//   // }, [course.slug]);

//   if (!course) {
//     return null;
//   }

//   return (
//     <>
//       <div className="z-50 rounded-lg bg-white px-6 py-2 lg:py-4">
//         <Link href={`/courses/${slug}`}>
//           <div className="mx-2 mb-4 flex items-center space-x-6 text-slate-700 md:mx-0">
//             <AcademicCapIcon className="h-6 w-6" />
//             <h3 className=" font-mono  md:text-lg lg:text-xl">{title}</h3>
//           </div>
//         </Link>

//         <div className="">
//           <div className="border-y border-gray-200">
//             <nav
//               className="-mb-px flex space-x-8 overflow-x-scroll "
//               aria-label="Tabs"
//             >
//               {resources?.map((resource) => (
//                 <Link
//                   href={`/courses/${slug}/${getResourcePathType(
//                     resource.type
//                   )}/${resource.slug}`}
//                   key={resource.title}
//                   // id={article.lug}
//                   className={classNames(
//                     resource.slug === pathSlug
//                       ? "border-emerald-700 font-bold text-emerald-800"
//                       : "border-transparent font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
//                     "flex items-center space-x-2 whitespace-nowrap border-b-2 px-1 py-4 text-sm"
//                   )}
//                   aria-current={resource.slug === pathSlug ? "page" : undefined}
//                 >
//                   {resource.type === "article" && (
//                     <BookOpenIcon className="h-4 w-4" />
//                   )}
//                   {resource.type === "selfReflectionExercise" && (
//                     <PencilIcon className="h-4 w-4" />
//                   )}
//                   <span>{resource.title}</span>
//                   {completedModules?.includes(resource.slug) && (
//                     <CheckCircleIcon className="h-6 w-6 text-sky-600" />
//                   )}
//                 </Link>
//               ))}
//             </nav>
//           </div>
//         </div>
//       </div>
//     </>
//   );

//verticle component
// return (
//   <>
//     <div className="z-50 rounded-lg bg-white px-6 py-2 lg:py-4">
//       <Link href={`/courses/${slug}`}>
//         <div className="mx-2 mb-4 flex items-center space-x-6 text-slate-700 md:mx-0">
//           <AcademicCapIcon className="h-6 w-6" />
//           <h3 className="font-mono md:text-lg lg:text-xl">{title}</h3>
//         </div>
//       </Link>

//       <div>
//         <div className="border-y border-gray-200">
//           <nav
//             className="flex flex-col space-y-2 overflow-y-auto"
//             aria-label="Sidebar"
//           >
//             {resources?.map((resource) => (
//               <Link
//                 href={`/courses/${slug}/${getResourcePathType(
//                   resource.type
//                 )}/${resource.slug}`}
//                 key={resource.title}
//                 className={classNames(
//                   resource.slug === pathSlug
//                     ? "border-emerald-700 font-bold text-emerald-800"
//                     : "border-transparent font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
//                   "flex items-center space-x-2 whitespace-nowrap border-l-4 px-4 py-2 text-sm"
//                 )}
//                 aria-current={resource.slug === pathSlug ? "page" : undefined}
//               >
//                 {resource.type === "article" && (
//                   <BookOpenIcon className="h-4 w-4" />
//                 )}
//                 {resource.type === "selfReflectionExercise" && (
//                   <PencilIcon className="h-4 w-4" />
//                 )}
//                 <span>{resource.title}</span>
//                 {completedModules?.includes(resource.slug) && (
//                   <CheckCircleIcon className="h-6 w-6 text-sky-600" />
//                 )}
//               </Link>
//             ))}
//           </nav>
//         </div>
//       </div>
//     </div>
//   </>
// );
// }

function CourseFootNav({ course }: { course: Course }) {
  const pathname = usePathname();
  const pathSlug = pathname.split("/").pop();

  if (!course) {
    return null;
  }
  const { resources, slug } = course;

  if (!resources) {
    return null;
  }

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
