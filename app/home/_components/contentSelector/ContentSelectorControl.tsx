"use client";
import { useState } from "react";
import ContentSelectorCarousel from "./ContentSelectorCarousel";
const tabs = [
  { name: "My Account", href: "#", current: false },
  { name: "Company", href: "#", current: false },
  { name: "Team Members", href: "#", current: true },
  { name: "Billing", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ContentSelectorControl({ articlesByCategory }) {
  const categoryKeys = Object.keys(articlesByCategory).map((key) =>
    key.replace("Burnout Signs: ", "")
  );

  const [selectedCategory, setSelectedCategory] = useState("Distracted");
  console.log("selectedCategory: ", selectedCategory);
  console.log("articles: ", articlesByCategory.selectedCategory);
  return (
    <div>
      <div className="lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="mx-auto">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-50">
            Burnout Signs
          </h2>
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
            <div className="border-b border-amber-100">
              <nav className="-mb-px flex" aria-label="Tabs">
                {categoryKeys.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={classNames(
                      selectedCategory === category
                        ? "cursor-pointer border-emerald-700 text-emerald-700"
                        : "cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium"
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
