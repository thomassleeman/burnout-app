"use client";
import { useState } from "react";
import ContentSelectorCarousel from "./ContentSelectorCarousel";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
//types
import { Article } from "@/types/sanity";

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

interface ArticlesByCategory {
  [category: string]: Article[];
}

export default function ContentSelectorControl({
  articlesByCategory,
}: {
  articlesByCategory: ArticlesByCategory;
}) {
  const categoryKeys = Object.keys(articlesByCategory).map((key) =>
    key.replace("Burnout Signs: ", "")
  );

  const [selectedCategory, setSelectedCategory] = useState("Distracted");

  return (
    <div className="">
      <div className=" lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="mx-auto">
          <div className="mb-6 flex flex-col gap-y-2">
            <h2 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-50">
              Burnout Signs
            </h2>
            <div className="flex gap-x-3">
              <InformationCircleIcon className="h-5 w-5 text-emerald-800" />
              <span className="text-sm text-emerald-800">
                There are 4 key signs of Burnout. Select below to learn more.
              </span>
            </div>
          </div>
          {/* Dropdown for mobile */}
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full rounded-md border-amber-100 bg-white text-lg text-gray-600 focus:border-emerald-700 focus:ring-emerald-700"
              value={selectedCategory}
            >
              {categoryKeys.map((category, index) => (
                <option className="" key={index}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {/* ------------------------ */}
          <div className="hidden sm:block">
            <div className="border-b border-gray-100">
              <nav className="-mb-px flex" aria-label="Tabs">
                {categoryKeys.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={classNames(
                      selectedCategory === category
                        ? " border-emerald-700 text-emerald-700"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "w-1/4 cursor-pointer border-b-2 px-1 py-4 text-center font-medium"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          <ContentSelectorCarousel
            articles={articlesByCategory[`Burnout Signs: ${selectedCategory}`]}
          />
        </div>
      </div>
    </div>
  );
}
