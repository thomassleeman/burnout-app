// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// export default function WritingExercisesFooter({ slug, headings }) {
//   const pathname = usePathname();
//   const pathSlug = pathname.split("/").pop();

//   if (!headings) {
//     return null;
//   }

//   const tabIndex = () => {
//     return headings.findIndex((heading) => heading.slug === slug);
//   };
//   const prevTab = headings[tabIndex() - 1];

//   // additional check for next tab to prevent it from appearing on the course head page
//   let nextTab;
//   nextTab = headings[tabIndex() + 1];

//   if (tabIndex() < 0) {
//     nextTab = null;
//   }

//   console.log("headings: ", slug);

//   return (
//     <div className="mx-1 mt-6 flex justify-between text-sm md:mx-0 md:mt-12 lg:mt-16">
//       <div className="w-1/2">
//         {prevTab && (
//           <Link
//             href={`/courses/${slug}/${prevTab.type}/${prevTab.slug}`}
//             className="flex items-center space-x-2 text-emerald-800 no-underline"
//           >
//             <ArrowLeftIcon className="h-5 w-5 text-green-800" />
//             <span>{prevTab ? prevTab.title : null}</span>
//           </Link>
//         )}
//       </div>
//       <div className="flex w-1/2 justify-end">
//         {nextTab && (
//           <Link
//             href={`/courses/${slug}/${getResourcePathType(nextTab.type)}/${
//               nextTab.slug
//             }`}
//             className="flex items-center space-x-2 text-emerald-800 no-underline"
//           >
//             <span>{nextTab.title}</span>
//             <ArrowRightIcon className="h-5 w-5 text-green-800" />
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// }
