"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

interface SidebarNavProps {
  sections: {
    id: string;
    title: string;
    prompts?: { id: string; title: string }[];
  }[];
}

const SidebarNav: React.FC<SidebarNavProps> = ({ sections }) => {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 my-10 hidden overflow-y-auto border-l border-gray-200 p-4 dark:border-slate-800 lg:block">
      <nav className="space-y-4">
        <h2 className="text-sm font-semibold text-emerald-700">On This Page</h2>
        <ul className="space-y-4">
          {sections.map((section) => (
            <li key={section.id} className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <ChevronRightIcon className="h-5 w-5 text-emerald-800 dark:text-sky-300" />
                <Link
                  href={`#${section.id}`}
                  className={`text-gray-600 hover:underline dark:text-sky-300 ${
                    pathname.includes(section.id) ? "text-emerald-800" : ""
                  }`}
                >
                  {section.title}
                </Link>
              </div>
              {/* {section.prompts && (
                <ul className="ml-6 space-y-1">
                  {section.prompts.map((prompt) => (
                    <li
                      key={prompt.id}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <span className="text-sky-500 dark:text-sky-200">
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
