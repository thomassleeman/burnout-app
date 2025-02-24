"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { PortableTextBlock } from "@portabletext/types";

// Define types based on your Sanity schema
interface Prompt {
  _key?: string;
  prompt: PortableTextBlock[];
}

interface PromptCategory {
  _key?: string;
  name: string;
  prompts?: Prompt[];
}

interface SidebarNavProps {
  promptCategories: PromptCategory[];
  currentCategory?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  promptCategories,
  currentCategory,
}) => {
  const pathname = usePathname();

  // Create formatted data for the sidebar from prompt categories
  const sidebarSections = promptCategories.map((category) => ({
    id: category.name.toLowerCase().replace(/\s+/g, "-"),
    title: category.name,
    prompts: category.prompts?.map((prompt, index) => ({
      id: `prompt-${index}`,
      // Since prompt.prompt is a Portable Text array, we'll use a placeholder title
      // You might want to extract the actual text in a real implementation
      title: `Prompt ${index + 1}`,
    })),
  }));

  return (
    <aside className="sticky top-0 my-10 hidden overflow-y-auto border-l border-gray-200 p-4 dark:border-slate-800 lg:block">
      <nav className="space-y-4">
        <h2 className="text-sm text-emerald-700">Journal Prompts</h2>
        <ul className="space-y-4">
          {sidebarSections.map((section) => (
            <li key={section.id} className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <ChevronRightIcon className="h-5 w-5 text-emerald-800 dark:text-sky-300" />
                <Link
                  href={`#${section.id}`}
                  className={`text-gray-600 hover:underline dark:text-sky-300 ${
                    currentCategory === section.id ||
                    pathname.includes(section.id)
                      ? "font-medium text-emerald-800"
                      : ""
                  }`}
                >
                  {section.title}
                </Link>
              </div>
              {/* {section.prompts && section.prompts.length > 0 && (
                <ul className="ml-6 space-y-1">
                  {section.prompts.map((prompt) => (
                    <li
                      key={prompt.id}
                      className="flex items-center space-x-2 text-xs"
                    >
                      <ChevronDoubleRightIcon className="h-3 w-3 text-emerald-600 dark:text-sky-200" />
                      <span className="text-gray-500 dark:text-sky-200">
                        {prompt.title}
                      </span>
                    </li>
                  ))}
                </ul>
              )} */}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarNav;

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   ChevronRightIcon,
//   ChevronDoubleRightIcon,
// } from "@heroicons/react/24/outline";

// interface SidebarNavProps {
//   sections: {
//     id: string;
//     title: string;
//     prompts?: { id: string; title: string }[];
//   }[];
// }

// const SidebarNav: React.FC<SidebarNavProps> = ({ sections }) => {
//   const pathname = usePathname();

//   return (
//     <aside className="sticky top-0 my-10 hidden overflow-y-auto border-l border-gray-200 p-4 dark:border-slate-800 lg:block">
//       <nav className="space-y-4">
//         <h2 className="text-sm font-semibold text-emerald-700">On This Page</h2>
//         <ul className="space-y-4">
//           {sections.map((section) => (
//             <li key={section.id} className="space-y-2">
//               <div className="flex items-center space-x-2 text-sm">
//                 <ChevronRightIcon className="h-5 w-5 text-emerald-800 dark:text-sky-300" />
//                 <Link
//                   href={`#${section.id}`}
//                   className={`text-gray-600 hover:underline dark:text-sky-300 ${
//                     pathname.includes(section.id) ? "text-emerald-800" : ""
//                   }`}
//                 >
//                   {section.title}
//                 </Link>
//               </div>
//               {/* {section.prompts && (
//                 <ul className="ml-6 space-y-1">
//                   {section.prompts.map((prompt) => (
//                     <li
//                       key={prompt.id}
//                       className="flex items-center space-x-2 text-sm"
//                     >
//                       <span className="text-sky-500 dark:text-sky-200">
//                         {prompt.title}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               )} */}
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default SidebarNav;
