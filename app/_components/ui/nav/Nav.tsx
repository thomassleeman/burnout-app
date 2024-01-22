"use client";
//react
import { Fragment, useEffect, useState, useCallback } from "react";
//next
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
//firebase
import { auth } from "@/firebase/auth/appConfig";
import { onAuthStateChanged } from "firebase/auth";

import { db } from "@/firebase/auth/appConfig";
//firestore
import { collection, getDocs } from "firebase/firestore";
//jotai
import { useAtom } from "jotai";
import {
  isAdminAtom,
  showSearchResultsAtom,
  usernameAtom,
  userIDAtom,
} from "@/state/store";
//components
import Spinner from "@/components/design/Spinner";
import UserIcon from "@/components/design/icons/UserIcon";
import SearchResults from "@/app/_components/ui/nav/SearchResults";
//functions
//headlessui
import { Disclosure, Menu, Transition } from "@headlessui/react";
//design assets
import brainLogo from "@/components/design/brainLogo.png";
import brainLogoWithText from "@/components/design/brainLogoWithText.png";
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
    { name: "Library", href: "/articles" },
  ],
  guest: [
    { name: "What is burnout?", href: "#" },
    { name: "Articles", href: "/articles" },
  ],
};

const pageIndicator = {
  lg: {
    current:
      "border-green-700 text-gray-900 dark:text-slate-50 dark:border-emerald-300 ",
    default:
      "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700 dark:text-slate-50 ",
  },
  sm: {
    current:
      "bg-indigo-50 border-indigo-500 text-indigo-700 dark:text-slate-50",
    default:
      "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:text-slate-50",
  },
};

/* -------------- USER INDICATOR -------------------- */
const UserIndicator = () => {
  const [username, setUsername] = useAtom(usernameAtom);
  const [userID, setUserID] = useAtom(userIDAtom);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      setUsername(user.displayName || "");
    });
  }, []);

  // if (!userID) return null;

  if (username) {
    const usernameArray = username.split(" ");
    const initials = usernameArray[0][0] + usernameArray[1][0];

    return (
      <div className="ml-6 flex h-3/4 w-auto items-center justify-center self-center  justify-self-end rounded-full bg-green-900 p-3">
        <div className="text-xl font-thin uppercase text-white">{initials}</div>
      </div>
    );
  }
  if (userID && !username) {
    return (
      <div className="ml-6 flex h-3/4 w-auto items-center justify-center self-center  justify-self-end rounded-full bg-green-900 p-3">
        <div className="text-xl font-thin uppercase text-black">
          <UserIcon />
        </div>
      </div>
    );
  } else return null;
};
/* -------------------------------------------------------------- */
/* -------------------------------------------------------------- */
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const pathname = usePathname();
  const [userID] = useAtom(userIDAtom);

  /* --------------------------------------------------------- */
  //--------------------- SEARCH FUNCTION ---------------------//
  /* --------------------------------------------------------- */

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState<Article[]>([
    // { title: "no search", id: "0", content: "", slug: "" },
  ]);

  const [showSearchResults, setShowSearchResults] = useAtom(
    showSearchResultsAtom
  );

  const getArticles = useCallback(async () => {
    const articlesRef = collection(db, "articles");
    const articlesSnapshot = await getDocs(articlesRef);
    const articlesList = articlesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        date: data.date.toDate(),
        slug: data.slug,
        content: data.content,
        headerImage: data.headerImage,
        headerImageAlt: data.headerImageAlt,
        category: data.category,
        summary: data.summary,
        author: data.author,
      };
    });
    return articlesList;
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      getArticles();
    });
  }, [getArticles]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
    });
  }, []);

  const navSearch = async (searchTerm: string) => {
    const articles = await getArticles();
    const results = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (results.length === 0) {
      setSearchResults([
        { title: "no results found", id: "0", content: "", slug: "" },
      ]);
    } else {
      setSearchResults(results);
    }
  };

  useEffect(() => {
    setShowSearchResults(searchResults.length > 0);
  }, [searchResults, setShowSearchResults]);

  //--------------------- END SEARCH FUNCTION ---------------------//
  /* ------------------------------------------------------------- */
  /* ------------------------------------------------------------- */

  //This is linked to the signin page onAuthChanged callback and therefore will only return true for a session where a user has just signed in. This offers an additional layer of security but not a great user experience. Consider changing as admin user numbers grow.
  const [isAdmin] = useAtom(isAdminAtom);

  let content;

  //Nav margins: mb-8 lg:mb-16 in both Disclosure tags lines 177 and 407.
  if (!pathname.includes("/signin") && !pathname.includes("/signup")) {
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
                <div className="flex px-2 lg:px-0">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/dashboard" className="h-full">
                      <Image
                        className="h-full w-auto pr-12"
                        // src={brushStrokeTree}
                        src={brainLogoWithText}
                        alt="MindHub Logo"
                      />{" "}
                    </Link>
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

                {/* ------- NAV SEARCH ----------*/}
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
                        className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Search Articles"
                        type="search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && searchTerm !== "") {
                            navSearch(searchTerm);
                          }
                        }}
                      />
                    </div>
                  </div>
                  {showSearchResults ? (
                    <SearchResults articles={searchResults} />
                  ) : null}
                </div>
                {/* ------------------- */}

                <div className="hidden lg:ml-4 lg:flex lg:items-center">
                  <button
                    type="button"
                    className="flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon
                      className="h-6 w-6 bg-inherit"
                      aria-hidden="true"
                    />
                  </button>

                  {/* Profile dropdown */}
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
                      <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-slate-50 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-700">
                        {/* Reinstate this when profile page is built */}
                        {/* <Menu.Item>
                          {({ active }) => (
                            <a
                              // if userID is known, link to profile page, else link to signin page
                              href={`${
                                userID ? `/profile/${userID}` : "/signin"
                              }`}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              My Profile
                            </a>
                          )}
                        </Menu.Item> */}
                        {/* Reinstate this once settings page is built. */}
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/signin/resetpassword"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Reset password
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/settings"
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
                            <Link
                              href="/signout"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 dark:text-slate-50 dark:hover:bg-slate-700"
                              )}
                            >
                              Sign out
                            </Link>
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
                <div className="mt-3 space-y-1">
                  {/* Reinstate once profile and settings have been completed. */}
                  {/* <Disclosure.Button
                    as="a"
                    href={`/profile/[${userID}]/page.tsx`}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Your Profile
                  </Disclosure.Button>*/}
                  <Disclosure.Button
                    as="a"
                    href="/settings"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/signout"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-slate-50 dark:hover:bg-slate-700"
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
      <Disclosure as="nav" className="max-h-fit shadow">
        {({ open }) => (
          <>
            <div className="mx-auto my-1 px-2 sm:px-4 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex px-2 lg:px-0">
                  <div className="flex flex-shrink-0 items-center">
                    <Image
                      className="h-5/6 w-auto pr-12"
                      // src={brushStrokeTree}
                      src={brainLogoWithText}
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
              {/* <div className=" pb-3 pt-4"> */}
              {/* <div className="flex items-center px-4">
                <Link className="text-right text-sm text-green-700" href="#">
                  Sign up for a free account
                </Link>
              </div> */}
              <Disclosure.Button
                as="a"
                href="/signup"
                className={
                  "mb-4 block py-2 pl-3 pr-4 text-base font-medium text-green-700"
                }
              >
                Sign up for a free account
              </Disclosure.Button>

              {/* </div> */}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }

  return content;
}
