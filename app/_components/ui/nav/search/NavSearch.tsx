"use client";
import Link from "next/link";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch";

import HitComponent from "./Hit";

const searchApp = process.env.NEXT_PUBLIC_SEARCH_APP;
const searchKey = process.env.NEXT_PUBLIC_SEARCH_KEY;

if (!searchApp || !searchKey) {
  throw new Error("Search app and key must be defined");
}

const searchClient = algoliasearch(searchApp, searchKey);

import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  BookmarkSquareIcon,
  CalendarDaysIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";

export default function NavSearch() {
  return (
    <Popover className="relative">
      <Popover.Button className="mr-2 inline-flex items-center gap-x-1 p-2 text-sm font-semibold leading-6 text-sky-600">
        {/* <span className="hidden lg:block">Resources</span> */}
        <MagnifyingGlassIcon className="h-5 w-5" />
        <ChevronDownIcon className=" h-5 w-5 text-sky-600" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        {/* need to play around with -translate-x values to position this correctly. Maybe it shouldn't be absolute on mobile.  */}
        {/* <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 lg:-translate-x-1/2"> */}
        <Popover.Panel className="fixed right-0 z-10 mt-5 flex w-screen max-w-max lg:px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden overflow-y-scroll rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              <InstantSearch searchClient={searchClient} indexName="articles">
                <div>
                  <SearchBox
                    autoFocus={true}
                    placeholder="Search articles..."
                    classNames={{
                      root: "flex items-center mb-4",
                      form: "flex items-center",
                      input:
                        "border-2 border-gray-200 rounded-md p-2 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none w-full",
                      submit: "hidden",
                      reset: "hidden",
                      loadingIndicator: "",
                    }}
                  />
                  <div
                    style={{ height: "34rem" }}
                    className="overflow-y-scroll rounded-xl bg-slate-50 p-6"
                  >
                    <div className="flex justify-between">
                      <h3 className="text-sm font-semibold leading-6 text-gray-500">
                        Search results
                      </h3>
                      <Link
                        href="/articles"
                        className="text-sm font-semibold leading-6 text-sky-600"
                      >
                        See all <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                    <ul className="mt-6 space-y-6">
                      <Hits hitComponent={HitComponent} />
                    </ul>
                  </div>
                </div>
              </InstantSearch>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
