import { Fragment } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
//jotai
import { useAtom } from "jotai";
import { showSearchResultsAtom } from "@/state/store";
//components
import ContentCarousel from "../../../articles/_components/ContentCarousel";
//icons
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function SearchResults({
  articles,
}: {
  articles: Article[] | undefined;
}) {
  const [open, setOpen] = useAtom(showSearchResultsAtom);

  let content;

  if (!articles) return null;

  if (articles[0].title === "no results found")
    content = (
      <>
        <div
          aria-live="assertive"
          className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
          <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
            <Transition
              show={open}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        Nothing found
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Your search didn&apos;t return any articles.{" "}
                      </p>
                      <button>
                        <Link
                          className="mt-10 text-sm text-emerald-800"
                          href="/articles"
                        >
                          Go to library
                        </Link>
                      </button>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </>
    );
  else
    content = (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative z-10 my-8 flex w-auto transform flex-col overflow-x-scroll rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all md:mx-12">
                  <ContentCarousel
                    carouselTitle="Search Results"
                    carouselTagline="Here's what we found..."
                    articles={articles}
                  />
                  <div className="mt-5 place-self-end sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );

  return content;
}
