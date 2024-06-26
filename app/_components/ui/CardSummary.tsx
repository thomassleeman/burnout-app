"use client";
//react
import { useState } from "react";
//sanity
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/sanity/schemas/portableText/portableTextComponents";

//Icons
import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

import type {
  PortableTextBlock,
  PortableTextSpan,
  PortableTextLink,
} from "@portabletext/types";

interface SummaryProps {
  summary: PortableTextBlock | PortableTextBlock[];
  title: string;
}

const CardSummary = ({ summary, title }: SummaryProps) => {
  const [view, setView] = useState(false);
  let content;
  //   if (!summary || typeof summary !== "string") return null;

  if (!view) {
    content = (
      <span
        onClick={() => setView(true)}
        className="absolute right-0 top-0 h-10 w-10 cursor-pointer rounded-bl-lg rounded-tr-lg bg-white p-3 text-sm text-slate-900 hover:bg-slate-50"
      >
        <InformationCircleIcon className="absolute bottom-2 right-2 h-6 w-6" />
      </span>
    );
  } else {
    content = (
      <>
        <div className="absolute right-0 top-0 h-full w-full cursor-default overflow-y-scroll rounded-xl bg-slate-800 p-5 opacity-95">
          <h2 className="mb-3 text-lg font-semibold text-slate-200 dark:text-slate-50">
            {title}
          </h2>
          {/* <p className=" font-serif text-sm text-gray-100">{summary}</p> */}
          <div className="p-1 text-sm font-light leading-6 text-white">
            <PortableText value={summary} components={portableTextComponents} />
          </div>
        </div>
        <span
          onClick={() => setView(false)}
          className="absolute right-0 top-0 h-10 w-10 cursor-pointer rounded-bl-lg rounded-tr-lg bg-white px-3 py-1.5 text-sm text-slate-900 hover:bg-slate-50"
        >
          <XMarkIcon className="absolute bottom-2 right-2 h-6 w-6" />
        </span>
      </>
    );
  }
  return content;
};

export default CardSummary;
