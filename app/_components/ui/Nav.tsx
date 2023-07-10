"use client";
//react
import { Fragment, useEffect } from "react";
//next
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
//firebase
import { auth } from "@/firebase/auth/appConfig";
import { useAuthState } from "react-firebase-hooks/auth";
//jotai
import { useAtom } from "jotai";
import { isAdminAtom, testAtom } from "@/state/store";
//components
import Spinner from "@/components/design/Spinner";
import UserIcon from "@/components/design/icons/UserIcon";
//headlessui
import { Disclosure, Menu, Transition } from "@headlessui/react";
//design assets
import Logo from "../design/Logo";
//heroicons
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

const navigation = {
  registeredUser: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Chatbot", href: "/chatbot/0001" },
    { name: "Projects", href: "#" },
    { name: "Calendar", href: "#" },
  ],
  guest: [
    { name: "What is burnout?", href: "#" },
    { name: "page1", href: "#" },
    { name: "page2", href: "#" },
  ],
};

const pageIndicator = {
  lg: {
    current: "border-indigo-500 text-gray-900",
    default:
      "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
  },
  sm: {
    current: "bg-indigo-50 border-indigo-500 text-indigo-700",
    default:
      "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
  },
};

const UserIndicator = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading || error) {
    return (
      <div className="ml-6 flex h-3/4 w-auto items-center justify-center self-center  justify-self-end rounded-full p-3">
        <Spinner stroke="green" />
      </div>
    );
  }

  if (!user) return null;

  if (user.displayName) {
    const userName = user?.displayName.split(" ");
    const initials = userName[0][0] + userName[1][0];

    return (
      <div className="ml-6 flex h-3/4 w-auto items-center justify-center self-center  justify-self-end rounded-full bg-green-900 p-3">
        <div className="text-xl font-thin uppercase text-white">{initials}</div>
      </div>
    );
  }
  if (user && !user.displayName) {
    return (
      <div className="ml-6 flex h-3/4 w-auto items-center justify-center self-center  justify-self-end rounded-full bg-green-900 p-3">
        <div className="text-xl font-thin uppercase text-black">
          <UserIcon />
        </div>
      </div>
    );
  } else return null;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, loading, error] = useAuthState(auth);
  //This is linked to the signin page onAuthChanged callback and therefore will only return true for a session where a user has just signed in. This offers an additional layer of security but not a great user experience. Consider changing as admin user numbers grow.
  const [isAdmin] = useAtom(isAdminAtom);

  let content;
  if (loading) {
    content = (
      <nav className="mb-8 max-h-fit bg-white shadow lg:mb-16">
        <div className="mx-auto mb-3  px-2 sm:px-4 lg:mb-2 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex px-2 lg:px-0">
              <div className="flex flex-shrink-0 items-center">
                <Logo />
              </div>
              <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                {navigation.registeredUser.map((page, index) => {
                  return (
                    <div
                      key={index}
                      className="flex h-full animate-pulse flex-row items-center justify-center space-x-5"
                    >
                      <div className="h-6 w-36 rounded-md bg-gray-300 "></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="w-full max-w-lg lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Loading...
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className=" block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Loading..."
                    type="search"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  if (user && !loading && !error) {
    content = (
      <Disclosure as="nav" className="mb-8 max-h-fit bg-white shadow lg:mb-16">
        {({ open }) => (
          <>
            <div className="mx-auto mb-3  px-2 sm:px-4 lg:mb-2 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex px-2 lg:px-0">
                  <div className="flex flex-shrink-0 items-center">
                    <Logo />
                  </div>
                  <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                    {navigation.registeredUser.map((page) => {
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
                    })}
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                          pathname === "/admin"
                            ? pageIndicator.lg.current
                            : pageIndicator.lg.default
                        }`}
                      >
                        Admin
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                  <div className="w-full max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search Articles
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Search Articles"
                        type="search"
                      />
                    </div>
                  </div>
                </div>

                <div className="hidden lg:ml-4 lg:flex lg:items-center">
                  <button
                    type="button"
                    className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <AdjustmentsHorizontalIcon className="h-8 w-8 rounded-full text-gray-400 hover:text-gray-500" />
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
                      <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href={`/profile/${user?.uid}`}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/signout"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <UserIndicator />
                {/* Mobile menu button */}
                {
                  <div className="ml-3 flex items-center lg:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
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
                }
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigation.registeredUser.map((page) => {
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
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <AdjustmentsHorizontalIcon className="h-6 w-6 rounded-full text-gray-400" />
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href={`/profile/[${user?.uid}]/page.tsx`}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  } else {
    content = (
      <Disclosure as="nav" className="mb-8 max-h-fit bg-white shadow lg:mb-16">
        {({ open }) => (
          <>
            <div className="mx-auto mb-3 px-2 sm:px-4 lg:mb-2 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex px-2 lg:px-0">
                  <div className="flex flex-shrink-0 items-center">
                    <Logo />
                  </div>
                  <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                    <Link
                      className="inline-flex items-center justify-self-end px-1 pt-1 text-sm font-medium text-green-700"
                      href="/signup"
                    >
                      Sign up for a free account
                    </Link>
                    {navigation.guest.map((page) => {
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
                    })}
                  </div>
                </div>

                <div className="flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
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
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="flex items-center px-4">
                  <Link className="text-right text-sm text-green-700" href="#">
                    Sign up for a free account
                  </Link>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }

  return content;
}
