// app/_components/ui/nav/MobileMenuToggle.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import UserIndicator from "./UserIndicator";

export default function MobileMenuToggle({
  navigation,
  pageIndicator,
  pathname,
  user,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="flex items-center">
        {/* Your ResourcesNav component here if needed */}
      </div>
      <div className="ml-3 flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
          ) : (
            <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-20 bg-white lg:hidden">
          <div className="space-y-1 pb-3 pt-2">
            <div className="flex flex-row-reverse bg-slate-200/25 p-4">
              <UserIndicator user={user} />
            </div>
            {navigation.mainNav.map((page) => (
              <Link
                key={page.id}
                href={page.href}
                className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                  pathname === page.href
                    ? pageIndicator.sm.current
                    : pageIndicator.sm.default
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {page.icon === "home" ? "Home" : page.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            <div className="mt-3 space-y-1">
              {navigation.settingsNav.map((page) => (
                <Link
                  key={page.name}
                  href={page.href}
                  className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                    pathname === page.href
                      ? pageIndicator.sm.current
                      : pageIndicator.sm.default
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
