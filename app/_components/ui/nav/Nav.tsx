"use client";
//react
import { Fragment } from "react";
//next
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

//components
import UserIndicator from "./_components/UserIndicator";
import ResourcesNav from "./_components/resourcesNav/ResourcesNav";
// import NavSearch from "./search/NavSearch";
//functions
//headlessui
import { Disclosure, Menu, Transition } from "@headlessui/react";
//design assets
import brainLogo from "@/components/design/brainLogo.png";
//heroicons

import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

/* -------------- NAVIGATION ARRAY -------------------- */

const navigation = {
  registeredUser: {
    mainNav: [
      { id: "home", name: <HomeIcon className="h-6 w-6" />, href: "/home" },
      { id: "library", name: "Library", href: "/articles" },
    ],
    settingsNav: [
      // { id: "settings", name: "Settings", href: "/settings" },
      { id: "signout", name: "Sign Out", href: "/signout" },
    ],
  },

  guest: [
    // { id: "whatisburnout", name: "What is burnout?", href: "#" },
    // { id: "articles", name: "Articles", href: "/articles" },
  ],
};
/* -------------------------------------------------------------- */

/* -------------- PAGE INDICATOR -------------------- */

const pageIndicator = {
  lg: {
    current:
      "border-green-700 text-gray-900 dark:text-slate-50 dark:border-emerald-300 drop-shadow-lg",
    default:
      "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700 dark:text-slate-50 ",
  },
  sm: {
    current:
      "bg-emerald-700/25 border-emerald-800 text-green-800 dark:text-slate-50",
    default:
      "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-slate-50",
  },
};
/* -------------------------------------------------------------- */

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
/* -------------------------------------------------------------- */

export default function Nav() {
  const pathname = usePathname();
  console.log("pathname: ", pathname);

  let content;

  if (pathname === "/" || pathname === "/signup" || pathname === "/signin") {
    content = (
      <Disclosure as="nav" className="max-h-fit shadow">
        {({ open }) => (
          <>
            <div className="mx-auto my-1 px-2 sm:px-4 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex px-2 lg:px-0">
                  <div className="flex flex-shrink-0 items-center">
                    <Image
                      className="h-5/6 w-auto pr-12 drop-shadow-lg"
                      src={brainLogo}
                      alt="MindHub Logo"
                    />{" "}
                  </div>
                  <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                    <Link
                      className="inline-flex items-center justify-self-end px-1 pt-1 text-sm font-medium text-green-700 hover:text-green-900"
                      href="/signup"
                    >
                      Sign up for a free account
                    </Link>
                    {/* {navigation.guest.map((page) => {
                      return (
                        <Link
                          key={page.name}
                          href={page.href}
                          className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                            pathname === page.href
                              ? pageIndicator.lg.current
                              : pageIndicator.lg.default
                          }`}
                        >
                          {page.name}
                        </Link>
                      );
                    })} */}
                  </div>
                </div>

                <Link
                  href="/signin"
                  className="mx-2 self-center justify-self-end rounded-lg border border-slate-600 bg-transparent px-2 py-1 text-slate-600"
                >
                  Sign in
                </Link>
                {/* Mobile menu button */}
                {/* <div className="flex items-center gap-x-6 lg:hidden">
                  <Link
                    href="/signin"
                    className="text-nowrap self-center justify-self-end rounded-lg border border-slate-600 bg-transparent px-2 py-1 text-sm text-slate-600"
                  >
                    Sign in
                  </Link>
                  <div className="flex items-center lg:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div> */}
              </div>
            </div>

            {/*  -------------------------------------------------------------------------------------------------------------- */}

            {/* <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigation.guest.map((page) => {
                  return (
                    <Disclosure.Button
                      key={page.name}
                      as="a"
                      href={page.href}
                      className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                        pathname === page.href
                          ? pageIndicator.sm.current
                          : pageIndicator.sm.default
                      }`}
                    >
                      {page.name}
                    </Disclosure.Button>
                  );
                })}
              </div>
              <Disclosure.Button
                as="a"
                href="/signup"
                className={
                  "mb-4 block py-2 pl-3 pr-4 text-base font-medium text-green-700"
                }
              >
                Sign up for a free account
              </Disclosure.Button>
            </Disclosure.Panel> */}
          </>
        )}
      </Disclosure>
    );
  } else {
    content = (
      <Disclosure
        as="nav"
        className="max-h-fit bg-transparent shadow dark:border-pink-700 dark:text-slate-50"
      >
        {/* <Disclosure as="nav" className="h-16 shadow"> */}
        {({ open }) => (
          <>
            <div className="mx-auto my-1 px-2 sm:px-4 lg:px-8">
              <div className="flex h-16 justify-between">
                {/* Logo and page links */}
                <div className="flex lg:px-0">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/home" className="m-2 h-12 lg:h-14">
                      <Image
                        className="h-full w-auto pr-4 drop-shadow-lg md:pr-12"
                        src={brainLogo}
                        alt="MindHub Logo"
                      />{" "}
                    </Link>
                  </div>
                  <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                    {navigation.registeredUser.mainNav.map((page) => {
                      return (
                        <Link
                          key={page.id}
                          href={page.href}
                          className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                            pathname === page.href
                              ? pageIndicator.lg.current
                              : pageIndicator.lg.default
                          }`}
                        >
                          {page.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                {/* ----------------------------------------- */}

                {/* Search, notifications, options and user indicator */}
                <div className="hidden lg:ml-4 lg:flex lg:items-center">
                  <ResourcesNav />
                  {/* <NavSearch /> */}
                  {/* <button
                    type="button"
                    className="flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon
                      className="h-6 w-6 bg-inherit"
                      aria-hidden="true"
                    />
                  </button> */}
                  {/* Dropdown Options */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <AdjustmentsHorizontalIcon className="h-8 w-8 rounded-full bg-inherit text-gray-400 hover:text-gray-500" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-sm bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-700">
                        {navigation.registeredUser.settingsNav.map((page) => (
                          <Menu.Item key={page.name}>
                            {({ active }) => (
                              <Link
                                href={page.href}
                                className={classNames(
                                  active
                                    ? "border-green-600 bg-green-800/25"
                                    : "border-transparent",
                                  "block border-l-4 px-4 py-2 text-slate-700"
                                )}
                              >
                                {page.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <div className="ml-6">
                    <UserIndicator />
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* ------------------------ Mobile Nav Search -------------------------- */}
                  <div className="flex items-center">
                    <ResourcesNav />
                    {/* <NavSearch /> */}
                  </div>
                  {/* -------------------------------------------------------------------- */}
                  {/*------------------------- Mobile hamburger / x icon -------------------------*/}
                  <div className="ml-3 flex items-center">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-8 w-8"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-8 w-8"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  {/*----------------------------------------------------------------------*/}
                </div>
              </div>
            </div>
            {/*-------------- MOBILE MENU ----------------*/}
            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 pb-3 pt-2">
                <div className="flex flex-row-reverse bg-slate-200/25 p-4">
                  <UserIndicator />
                </div>
                {navigation.registeredUser.mainNav.map((page) => {
                  return (
                    <Disclosure.Button
                      key={page.id}
                      as="a"
                      href={page.href}
                      className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                        pathname === page.href
                          ? pageIndicator.sm.current
                          : pageIndicator.sm.default
                      }`}
                    >
                      {page.name}
                    </Disclosure.Button>
                  );
                })}
              </div>
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="mt-3 space-y-1">
                  {navigation.registeredUser.settingsNav.map((page) => (
                    <Disclosure.Button
                      key={page.name}
                      as="a"
                      href={page.href}
                      className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                        pathname === page.href
                          ? pageIndicator.sm.current
                          : pageIndicator.sm.default
                      }`}
                    >
                      {page.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
            {/* ------------------------------ */}
          </>
        )}
      </Disclosure>
    );
  }

  return content;
}
