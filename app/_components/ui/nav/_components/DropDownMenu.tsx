// app/_components/ui/nav/DropdownMenu.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export default function DropdownMenu({
  // organisation,
  settingsNav,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
      >
        <span className="sr-only">Open user menu</span>
        <AdjustmentsHorizontalIcon className="h-8 w-8 rounded-full bg-inherit text-gray-400 hover:text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-40 mt-2 w-48 origin-top-right rounded-sm bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800">
          {/* {organisation.role === "admin" && (
            <Link
              href={`/organisation/${organisation.organisationId}`}
              className="block border-l-4 border-transparent px-4 py-2 text-slate-700 hover:border-green-600 hover:bg-green-800/25"
              onClick={() => setIsOpen(false)}
            >
              {organisation?.name}
            </Link>
          )} */}

          {settingsNav.map((page) => (
            <Link
              key={page.name}
              href={page.href}
              className="block border-l-4 border-transparent px-4 py-2 text-slate-700 hover:border-green-600 hover:bg-green-800/25"
              onClick={() => setIsOpen(false)}
            >
              {page.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
